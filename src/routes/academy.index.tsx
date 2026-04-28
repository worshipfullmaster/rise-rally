import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Filter } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { ACADEMY } from "@/content/loader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/academy/")({
  head: () => ({ meta: [{ title: "Field Academy — GEN Z Movement Hub" }] }),
  component: AcademyList,
});

const CATS = ["all", "digital_safety", "organizing", "street_safety", "narrative", "know_your_rights", "general"] as const;

function AcademyList() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(
    () => (cat === "all" ? ACADEMY : ACADEMY.filter((i) => i.category === cat)),
    [cat],
  );

  return (
    <AppLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-primary">{t("academy.title")}</span>
          <h1 className="mt-2 text-4xl">{t("academy.title")}</h1>
          <p className="mt-3 text-muted-foreground">{t("academy.subtitle")}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {CATS.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={cat === c ? "default" : "outline"}
              onClick={() => setCat(c)}
              className={cn("text-xs")}
            >
              {c === "all" ? "All" : t(`cat.${c}`)}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Link key={r.slug} to="/academy/$slug" params={{ slug: r.slug }}>
              <Card className="h-full p-6 transition hover:border-primary/40 hover:bg-surface-2">
                <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {t(`cat.${r.category}`)}
                </span>
                <h3 className="mt-3 text-lg leading-tight">{pickLang(r.title, lang)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pickLang(r.summary, lang)}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {r.read_minutes} {t("common.minutes")}
                </div>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground">{t("common.empty")}</p>}
        </div>
      </section>
    </AppLayout>
  );
}
