import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const Route = createFileRoute("/events/")({
  head: () => ({ meta: [{ title: "Events — GEN Z Movement Hub" }] }),
  component: EventsList,
});

type EventRow = { id: string; slug: string; title: Record<string, string>; description: Record<string, string>; starts_at: string; location: string | null };

function EventsList() {
  const { lang, t } = useLang();
  const [items, setItems] = useState<EventRow[]>([]);
  useEffect(() => {
    supabase.from("events").select("*").eq("published", true).order("starts_at")
      .then(({ data }) => setItems((data ?? []) as unknown as EventRow[]));
  }, []);
  return (
    <AppLayout>
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <h1 className="text-4xl">{t("nav.events")}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((e) => (
            <Link key={e.id} to="/events/$slug" params={{ slug: e.slug }}>
              <Card className="p-6 transition hover:border-primary/40 hover:bg-surface-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(e.starts_at), "PPp")}
                </div>
                <h3 className="mt-2 text-xl">{pickLang(e.title, lang)}</h3>
                <p className="mt-2 line-clamp-3 text-muted-foreground">{pickLang(e.description, lang)}</p>
                {e.location && <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {e.location}</p>}
              </Card>
            </Link>
          ))}
          {items.length === 0 && <p className="text-muted-foreground">{t("common.empty")}</p>}
        </div>
      </section>
    </AppLayout>
  );
}
