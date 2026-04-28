import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { findEvent } from "@/content/loader";
import { format } from "date-fns";

export const Route = createFileRoute("/events/$slug")({
  component: EventDetail,
});

function EventDetail() {
  const { slug } = Route.useParams();
  const { lang, t } = useLang();
  const e = findEvent(slug);

  return (
    <AppLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Link to="/events"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{t("common.back")}</Button></Link>
        {e ? (
          <>
            <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
              <Calendar className="h-3 w-3" /> {format(new Date(e.starts_at), "PPpp")}
            </div>
            <h1 className="mt-2 text-4xl">{pickLang(e.title, lang)}</h1>
            {e.location && <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" /> {e.location}</p>}
            <p className="mt-6 text-lg text-muted-foreground">{pickLang(e.description, lang)}</p>
            <div className="mt-6 whitespace-pre-line text-foreground/90">{e.body}</div>
          </>
        ) : (
          <p className="mt-12 text-muted-foreground">{t("common.empty")}</p>
        )}
      </article>
    </AppLayout>
  );
}
