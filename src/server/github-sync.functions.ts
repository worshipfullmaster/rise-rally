import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { encryptPat, decryptPat } from "@/server/crypto.server";

function adminClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function assertAdmin(supabase: ReturnType<typeof createClient<Database>>, userId: string) {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Admin role required");
}

export const saveGithubConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      repo_url: z.string().url().max(300),
      branch: z.string().min(1).max(80).default("main"),
      pat: z.string().min(10).max(500),
      folders: z.array(z.string().min(1).max(200)).max(20),
      enabled: z.boolean().default(true),
    }).parse(d)
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as unknown as ReturnType<typeof createClient<Database>>, context.userId);
    const admin = adminClient();
    const enc = encryptPat(data.pat);
    const { error } = await admin.from("github_config").upsert({
      id: "00000000-0000-0000-0000-000000000001",
      repo_url: data.repo_url, branch: data.branch, pat_encrypted: enc,
      folders: data.folders, enabled: data.enabled, updated_at: new Date().toISOString(),
    }, { onConflict: "id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

type GhItem = { name: string; path: string; type: "file" | "dir"; download_url: string | null };

async function ghList(repo: string, path: string, branch: string, token: string): Promise<GhItem[]> {
  const url = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "genz-hub-sync" } });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub list ${path}: ${res.status} ${await res.text()}`);
  return await res.json() as GhItem[];
}

async function ghFetch(url: string, token: string): Promise<string> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, "User-Agent": "genz-hub-sync" } });
  if (!res.ok) throw new Error(`GitHub fetch: ${res.status}`);
  return await res.text();
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data: Record<string, unknown> = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    let v: unknown = line.slice(idx + 1).trim();
    if (typeof v === "string" && v.startsWith("{") && v.endsWith("}")) {
      try { v = JSON.parse(v); } catch {}
    }
    data[k] = v;
  }
  return { data, body };
}

function repoFromUrl(url: string): string {
  const m = url.match(/github\.com[/:]([^/]+\/[^/.]+)/);
  if (!m) throw new Error("Invalid GitHub repo URL");
  return m[1];
}

export const runGithubSync = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as unknown as ReturnType<typeof createClient<Database>>, context.userId);
    const admin = adminClient();
    const { data: cfg, error: cfgErr } = await admin.from("github_config").select("*").maybeSingle();
    if (cfgErr) throw new Error(cfgErr.message);
    if (!cfg) throw new Error("Configure GitHub first");

    const { data: logRow } = await admin.from("sync_logs").insert({ status: "running", message: "Sync started" }).select("id").single();
    const logId = logRow?.id;

    const detail: Array<{ path: string; ok: boolean; msg?: string }> = [];
    let updated = 0, failed = 0;

    try {
      const token = decryptPat(cfg.pat_encrypted);
      const repo = repoFromUrl(cfg.repo_url);
      const folders = (cfg.folders as string[]) ?? [];

      for (const folder of folders) {
        try {
          const items = await ghList(repo, folder, cfg.branch, token);
          for (const it of items) {
            if (it.type !== "file" || !it.download_url) continue;
            try {
              const raw = await ghFetch(it.download_url, token);
              const { data: meta, body } = parseFrontmatter(raw);
              const slug = (meta.slug as string) ?? it.name.replace(/\.[^.]+$/, "");
              const title = (meta.title as Record<string, string>) ?? { en: slug, fr: slug, mg: slug };

              if (folder.includes("news")) {
                const excerpt = (meta.excerpt as Record<string, string>) ?? { en: "", fr: "", mg: "" };
                await admin.from("news").upsert({
                  slug, title, excerpt, body: { en: body, fr: body, mg: body },
                  source: "github", published: true,
                }, { onConflict: "slug" });
              } else if (folder.includes("event")) {
                const description = (meta.description as Record<string, string>) ?? { en: body, fr: body, mg: body };
                await admin.from("events").upsert({
                  slug, title, description,
                  starts_at: (meta.starts_at as string) ?? new Date().toISOString(),
                  location: (meta.location as string) ?? null,
                  source: "github", published: true,
                }, { onConflict: "slug" });
              } else {
                const summary = (meta.summary as Record<string, string>) ?? { en: "", fr: "", mg: "" };
                await admin.from("resources").upsert({
                  slug, title, summary, body: { en: body, fr: body, mg: body },
                  category: (meta.category as Database["public"]["Enums"]["resource_category"]) ?? "general",
                  source: "github", published: true,
                }, { onConflict: "slug" });
              }
              updated++;
              detail.push({ path: it.path, ok: true });
            } catch (e) {
              failed++;
              detail.push({ path: it.path, ok: false, msg: (e as Error).message });
            }
          }
        } catch (e) {
          failed++;
          detail.push({ path: folder, ok: false, msg: (e as Error).message });
        }
      }

      const status = failed === 0 ? "success" : updated > 0 ? "partial" : "failed";
      await admin.from("sync_logs").update({
        status, items_updated: updated, items_failed: failed,
        message: `Updated ${updated}, failed ${failed}`,
        details: detail, finished_at: new Date().toISOString(),
      }).eq("id", logId!);
      await admin.from("github_config").update({ last_synced_at: new Date().toISOString() }).eq("id", cfg.id);
      return { ok: true, updated, failed };
    } catch (e) {
      await admin.from("sync_logs").update({
        status: "failed", message: (e as Error).message, items_updated: updated, items_failed: failed,
        details: detail, finished_at: new Date().toISOString(),
      }).eq("id", logId!);
      throw e;
    }
  });

export const getGithubStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as unknown as ReturnType<typeof createClient<Database>>, context.userId);
    const admin = adminClient();
    const [{ data: cfg }, { data: logs }] = await Promise.all([
      admin.from("github_config").select("repo_url,branch,folders,enabled,last_synced_at").maybeSingle(),
      admin.from("sync_logs").select("*").order("started_at", { ascending: false }).limit(20),
    ]);
    return { cfg, logs: logs ?? [] };
  });
