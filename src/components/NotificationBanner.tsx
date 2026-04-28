// Static notification banner — no backend.
// Edit the message below to push a one-time announcement to the site.
import { useState } from "react";
import { Megaphone, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/translations";

const NOTIF: { title: Record<Lang, string>; body: Record<Lang, string> } | null = null;

export function NotificationBanner() {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try { return sessionStorage.getItem("gz_notif_dismissed") === "1"; } catch { return false; }
  });

  if (!NOTIF || dismissed) return null;

  return (
    <div className="border-b border-border bg-info/10">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2.5 md:px-6">
        <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-info" />
        <div className="flex-1 text-sm">
          <span className="font-semibold text-foreground">{NOTIF.title[lang]}</span>{" "}
          <span className="text-muted-foreground">{NOTIF.body[lang]}</span>
        </div>
        <button
          aria-label="Dismiss"
          onClick={() => { setDismissed(true); try { sessionStorage.setItem("gz_notif_dismissed", "1"); } catch { /* noop */ } }}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
