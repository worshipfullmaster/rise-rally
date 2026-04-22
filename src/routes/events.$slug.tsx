import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, MapPin, Check, X } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { useAuth } from "@/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const Route = createFileRoute("/events/$slug")({
  component: EventDetail,
});

type EventRow = { id: string; title: Record<string, string>; description: Record<string, string>; starts_at: string; ends_at: string | null; location: string | null; rsvp_enabled: boolean };

function EventDetail() {
  const { slug } = Route.useParams();
  const { lang, t } = useLang();
  const { user } = useAuth();
  const [e, setE] = useState<EventRow | null>(null);
  const [rsvpId, setRsvpId] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("events").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => setE((data ?? null) as unknown as EventRow | null));
  }, [slug]);

  useEffect(() => {
    if (!e || !user) return;
    supabase.from("event_rsvps").select("id").eq("event_id", e.id).eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setRsvpId(data?.id ?? null));
  }, [e, user]);

  const toggleRsvp = async () => {
    if (!user) { toast.error("Sign in required"); return; }
    if (!e) return;
    if (rsvpId) {
      const { error } = await supabase.from("event_rsvps").delete().eq("id", rsvpId);
      if (error) toast.error(error.message); else { setRsvpId(null); toast.success("RSVP cancelled"); }
    } else {
      const { data, error } = await supabase.from("event_rsvps").insert({ event_id: e.id, user_id: user.id }).select("id").single();
      if (error) toast.error(error.message); else { setRsvpId(data.id); toast.success("See you there!"); }
    }
  };

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
            <p className="mt-6 whitespace-pre-line text-foreground/90">{pickLang(e.description, lang)}</p>
            {e.rsvp_enabled && (
              <div className="mt-8">
                <Button onClick={toggleRsvp} variant={rsvpId ? "outline" : "default"}>
                  {rsvpId ? <><X className="mr-2 h-4 w-4" />{t("common.cancel_rsvp")}</> : <><Check className="mr-2 h-4 w-4" />{t("common.rsvp")}</>}
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="mt-12 text-muted-foreground">{t("common.loading")}</p>
        )}
      </article>
    </AppLayout>
  );
}
