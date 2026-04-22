import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Upload, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { useAuth } from "@/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/media/")({
  head: () => ({ meta: [{ title: "Media Vault — GEN Z Movement Hub" }] }),
  component: MediaPage,
});

type Item = { id: string; storage_path: string; caption: Record<string, string> | null; mime_type: string | null };

async function stripImageMetadata(file: File): Promise<Blob> {
  // Re-encode via canvas to drop EXIF/GPS server-irrelevant data on the client too
  if (!file.type.startsWith("image/")) return file;
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = URL.createObjectURL(file);
  });
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0);
  return await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.92) as unknown as Blob);
}

function MediaPage() {
  const { lang, t } = useLang();
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    const { data } = await supabase.from("media_items").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(60);
    const list = (data ?? []) as unknown as Item[];
    setItems(list);
    const map: Record<string, string> = {};
    for (const it of list) {
      const { data: signed } = await supabase.storage.from("media-vault").createSignedUrl(it.storage_path, 3600);
      if (signed?.signedUrl) map[it.id] = signed.signedUrl;
    }
    setUrls(map);
  };

  useEffect(() => { refresh(); }, []);

  const handleUpload = async (file: File) => {
    if (!user) { toast.error("Sign in required to upload"); return; }
    setBusy(true);
    try {
      const stripped = await stripImageMetadata(file);
      const path = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("media-vault").upload(path, stripped, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      const { error: insErr } = await supabase.from("media_items").insert({
        uploader_id: user.id, storage_path: path, mime_type: file.type, status: "pending", metadata_stripped: true,
      });
      if (insErr) throw insErr;
      toast.success("Uploaded — pending moderation");
    } catch (e: unknown) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl">{t("media.title")}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{t("media.subtitle")}</p>
          </div>
          {user && (
            <>
              <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => {
                const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = "";
              }} />
              <Button disabled={busy} onClick={() => inputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> {t("media.upload")}
              </Button>
            </>
          )}
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary">
          <ShieldCheck className="h-3.5 w-3.5" /> Metadata stripped on upload (client + server policy).
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it) => (
            <Card key={it.id} className="aspect-square overflow-hidden p-0">
              {urls[it.id] ? (
                <img src={urls[it.id]} alt={it.caption ? pickLang(it.caption, lang) : "media"} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground"><ImageIcon className="h-6 w-6" /></div>
              )}
            </Card>
          ))}
          {items.length === 0 && <p className="text-muted-foreground">{t("common.empty")}</p>}
        </div>
      </section>
    </AppLayout>
  );
}
