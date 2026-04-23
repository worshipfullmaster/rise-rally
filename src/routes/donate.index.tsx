import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, ExternalLink, QrCode, Check } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageProvider";
import { STRIPE_DONATION_URL } from "@/lib/constants";
import donateQr from "@/assets/donate-qr.png";

export const Route = createFileRoute("/donate/")({
  head: () => ({ meta: [{ title: "Donate — GEN Z Movement Hub" }] }),
  component: Donate,
});

function Donate() {
  const { t } = useLang();
  const impact = [
    { amount: "5 €", label: t("donate.impact_5") },
    { amount: "20 €", label: t("donate.impact_20") },
    { amount: "50 €", label: t("donate.impact_50") },
    { amount: "100 €", label: t("donate.impact_100") },
  ];
  return (
    <AppLayout>
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          <Heart className="h-3.5 w-3.5" /> {t("donate.title")}
        </div>
        <h1 className="mt-3 text-4xl md:text-5xl">{t("donate.headline")}</h1>
        <p className="mt-3 text-muted-foreground">{t("donate.body")}</p>

        <Card className="mt-8 overflow-hidden p-0">
          <div className="grid gap-0 md:grid-cols-[1fr,auto]">
            <div className="p-8">
              <div className="text-xs uppercase tracking-widest text-primary">{t("donate.secure")}</div>
              <p className="mt-2 text-muted-foreground">{t("donate.secure_desc")}</p>
              <a href={STRIPE_DONATION_URL} target="_blank" rel="noreferrer">
                <Button size="lg" className="mt-6">
                  {t("donate.cta")} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Powered by Stripe · PCI-DSS Level 1
              </div>
            </div>
            <a
              href={STRIPE_DONATION_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-center justify-center gap-2 border-t border-border bg-muted/30 p-6 md:border-l md:border-t-0"
            >
              <img
                src={donateQr}
                alt="Scan to donate via Stripe"
                className="h-44 w-44 rounded-2xl shadow-glow transition-transform group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground">
                <QrCode className="h-3.5 w-3.5" /> {t("donate.scan")}
              </div>
            </a>
          </div>
        </Card>

        <h2 className="mt-12 text-2xl">{t("donate.impact_title")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {impact.map((i) => (
            <Card key={i.amount} className="flex items-start gap-3 p-5">
              <div className="rounded-xl bg-primary/15 p-2 text-primary">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold">{i.amount}</div>
                <p className="text-sm text-muted-foreground">{i.label}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6">
          <h3 className="text-lg">{t("donate.transparency_title")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("donate.transparency_body")}</p>
        </Card>
      </section>
    </AppLayout>
  );
}
