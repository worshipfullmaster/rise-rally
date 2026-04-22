import { Send, ShieldCheck, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageProvider";
import { TELEGRAM_URL } from "@/lib/constants";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo size={40} />
            <span className="font-display text-lg">GEN Z Hub <span className="text-primary">·</span> MG</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("hero.tagline")}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">PEACEFUL</span>
            <span className="rounded-full bg-sun/15 px-2.5 py-1 font-semibold text-sun">DECENTRALIZED</span>
            <span className="rounded-full bg-success/15 px-2.5 py-1 font-semibold text-success">RESILIENT</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</h4>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-primary hover:underline">
            <Send className="h-4 w-4" /> {t("hero.cta.telegram")}
          </a>
          <Link to="/donate" className="mt-2 flex items-center gap-2 text-sun hover:underline">
            <Heart className="h-4 w-4" /> {t("nav.donate")}
          </Link>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Security</h4>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Zero-knowledge by design.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GEN Z Movement Hub · {t("footer.tagline") || "Strictly non-violent civic engagement."}
      </div>
    </footer>
  );
}
