import { Send, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { TELEGRAM_URL } from "@/lib/constants";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-primary-foreground">GZ</span>
            <span className="font-display text-lg">GEN Z Movement Hub</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("hero.tagline")}
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-muted-foreground">Telegram</h4>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-primary hover:underline">
            <Send className="h-4 w-4" /> {t("nav.donate") /* placeholder unused */}
            <span className="font-medium">{t("hero.cta.telegram")}</span>
          </a>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-muted-foreground">Security</h4>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Zero-knowledge by design. Metadata stripped server-side.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GEN Z Movement Hub · Strictly non-violent civic engagement.
      </div>
    </footer>
  );
}
