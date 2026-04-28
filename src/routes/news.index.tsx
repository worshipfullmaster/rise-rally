import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { NEWS } from "@/content/loader";
import { format } from "date-fns";

export const Route = createFileRoute("/news/")({
  head: () => ({ meta: [{ title: "News — GEN Z Movement Hub" }] }),
  component: NewsList,
});

function NewsList() {
  const { lang, t } = useLang();
  return (
    <AppLayout>
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <h1 className="text-4xl">{t("nav.news")}</h1>
        <div className="mt-8 grid gap-4">
          {NEWS.map((n) => (
            <Link key={n.slug} to="/news/$slug" params={{ slug: n.slug }}>
              <Card className="p-6 transition hover:border-primary/40 hover:bg-surface-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{format(new Date(n.published_at), "PPP")}</div>
                <h2 className="mt-2 text-xl">{pickLang(n.title, lang)}</h2>
                <p className="mt-2 text-muted-foreground">{pickLang(n.excerpt, lang)}</p>
              </Card>
            </Link>
          ))}
          {NEWS.length === 0 && <p className="text-muted-foreground">{t("common.empty")}</p>}
        </div>
      </section>
    </AppLayout>
  );
}
