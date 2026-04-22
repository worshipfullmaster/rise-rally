import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const Route = createFileRoute("/news/$slug")({
  component: NewsDetail,
});

type News = { title: Record<string, string>; excerpt: Record<string, string>; body: Record<string, string>; published_at: string };

function NewsDetail() {
  const { slug } = Route.useParams();
  const { lang, t } = useLang();
  const [n, setN] = useState<News | null>(null);
  useEffect(() => {
    supabase.from("news").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => setN((data ?? null) as unknown as News | null));
  }, [slug]);
  return (
    <AppLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Link to="/news"><Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />{t("common.back")}</Button></Link>
        {n ? (
          <>
            <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{format(new Date(n.published_at), "PPP")}</div>
            <h1 className="mt-2 text-4xl">{pickLang(n.title, lang)}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{pickLang(n.excerpt, lang)}</p>
            <div className="prose-invert mt-8 whitespace-pre-line text-foreground/90">{pickLang(n.body, lang)}</div>
          </>
        ) : (
          <p className="mt-12 text-muted-foreground">{t("common.loading")}</p>
        )}
      </article>
    </AppLayout>
  );
}
