import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { Megaphone, X } from "lucide-react";

type Notif = { id: string; title: Record<string, string>; body: Record<string, string>; level: string };

export function NotificationBanner() {
  const { lang } = useLang();
  const [n, setN] = useState<Notif | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    supabase.from("notifications").select("*").eq("active", true).order("created_at", { ascending: false }).limit(1)
      .then(({ data }) => {
        if (data && data[0]) setN(data[0] as unknown as Notif);
      });
    try { setDismissed(sessionStorage.getItem("gz_notif_dismissed") === "1"); } catch {}
  }, []);

  if (!n || dismissed) return null;
  return (
    <div className="border-b border-border bg-info/10">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2.5 md:px-6">
        <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-info" />
        <div className="flex-1 text-sm">
          <span className="font-semibold text-foreground">{pickLang(n.title, lang)}</span>{" "}
          <span className="text-muted-foreground">{pickLang(n.body, lang)}</span>
        </div>
        <button
          aria-label="Dismiss"
          onClick={() => { setDismissed(true); try { sessionStorage.setItem("gz_notif_dismissed", "1"); } catch {} }}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
