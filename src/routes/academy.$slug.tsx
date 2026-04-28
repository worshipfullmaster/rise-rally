import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { findAcademy } from "@/content/loader";

export const Route = createFileRoute("/academy/$slug")({
  component: AcademyDetail,
});

function AcademyDetail() {
  const { slug } = Route.useParams();
  const { lang, t } = useLang();
  const r = findAcademy(slug);

  return (
    <AppLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Link to="/academy"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{t("common.back")}</Button></Link>
        {r ? (
          <>
            <span className="mt-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
              {t(`cat.${r.category}`)}
            </span>
            <h1 className="mt-3 text-4xl">{pickLang(r.title, lang)}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{pickLang(r.summary, lang)}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {r.read_minutes} {t("common.minutes")}
            </div>
            <div className="mt-8 whitespace-pre-line text-foreground/90 leading-relaxed">{r.body}</div>
          </>
        ) : (
          <p className="mt-12 text-muted-foreground">{t("common.empty")}</p>
        )}
      </article>
    </AppLayout>
  );
}
