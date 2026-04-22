import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, ExternalLink } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageProvider";
import { STRIPE_DONATION_URL } from "@/lib/constants";

export const Route = createFileRoute("/donate/")({
  head: () => ({ meta: [{ title: "Donate — GEN Z Movement Hub" }] }),
  component: Donate,
});

function Donate() {
  const { t } = useLang();
  return (
    <AppLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <Heart className="h-10 w-10 text-warning" />
        <h1 className="mt-3 text-4xl">{t("donate.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("donate.body")}</p>

        <Card className="mt-8 p-8">
          <div className="text-xs uppercase tracking-widest text-primary">Stripe Payment Link</div>
          <p className="mt-2 text-muted-foreground">
            Donations are processed securely by Stripe. You can pay by card, Apple Pay, Google Pay, or Link.
            We do not store card information.
          </p>
          <a href={STRIPE_DONATION_URL} target="_blank" rel="noreferrer">
            <Button size="lg" className="mt-6">{t("donate.cta")} <ExternalLink className="ml-2 h-4 w-4" /></Button>
          </a>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Powered by Stripe · PCI-DSS Level 1
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}
