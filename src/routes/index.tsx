import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Send, ShieldCheck, Sparkles, Heart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { TELEGRAM_URL } from "@/lib/constants";
import { format } from "date-fns";

export const Route = createFileRoute("/")({
  component: Home,
});

type News = { id: string; slug: string; title: Record<string, string>; excerpt: Record<string, string>; published_at: string };
type EventRow = { id: string; slug: string; title: Record<string, string>; description: Record<string, string>; starts_at: string; location: string | null };
type Resource = { id: string; slug: string; title: Record<string, string>; summary: Record<string, string>; category: string; read_minutes: number };

function Home() {
  const { t, lang } = useLang();
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [mvv, setMvv] = useState<Resource | null>(null);
  const [featured, setFeatured] = useState<Resource | null>(null);

  useEffect(() => {
    supabase.from("news").select("id,slug,title,excerpt,published_at").eq("published", true).order("published_at", { ascending: false }).limit(3)
      .then(({ data }) => setNews((data ?? []) as unknown as News[]));
    supabase.from("events").select("id,slug,title,description,starts_at,location").eq("published", true).gte("starts_at", new Date().toISOString()).order("starts_at").limit(3)
      .then(({ data }) => setEvents((data ?? []) as unknown as EventRow[]));
    supabase.from("resources").select("id,slug,title,summary,category,read_minutes").eq("slug", "mission-vision-values").maybeSingle()
      .then(({ data }) => setMvv((data ?? null) as unknown as Resource | null));
    supabase.from("resources").select("id,slug,title,summary,category,read_minutes").eq("category", "digital_safety").limit(1).maybeSingle()
      .then(({ data }) => setFeatured((data ?? null) as unknown as Resource | null));
  }, []);

  return (
    <AppLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" /> Peaceful · Decentralized · Resilient
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-6xl md:text-7xl"
          >
            <span className="text-foreground">GEN Z </span>
            <span className="text-gradient-primary">MOVEMENT</span>
            <br />
            <span className="text-foreground">HUB</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            {t("hero.tagline")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/auth"><Button size="lg" className="font-semibold">{t("hero.cta.join")}</Button></Link>
            <Link to="/events"><Button size="lg" variant="outline">{t("hero.cta.events")}</Button></Link>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              <Button size="lg" variant="secondary"><Send className="mr-2 h-4 w-4" />{t("hero.cta.telegram")}</Button>
            </a>
            <Link to="/donate">
              <Button size="lg" variant="ghost" className="text-warning hover:bg-warning/10 hover:text-warning">
                <Heart className="mr-2 h-4 w-4" />{t("hero.cta.donate")}
              </Button>
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Metadata stripped on every upload" },
              { icon: BookOpen, label: "Field Academy: 5+ free trainings" },
              { icon: Calendar, label: "Live, peaceful event coordination" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl">{t("home.latest_news")}</h2>
          <Link to="/news" className="text-sm text-primary hover:underline">{t("common.read_more")} <ArrowRight className="ml-1 inline h-3 w-3" /></Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {news.map((n) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }}>
              <Card className="h-full overflow-hidden p-6 transition hover:border-primary/40 hover:bg-surface-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {format(new Date(n.published_at), "PP")}
                </div>
                <h3 className="mt-2 text-lg leading-tight">{pickLang(n.title, lang)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pickLang(n.excerpt, lang)}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl">{t("home.upcoming_events")}</h2>
            <Link to="/events" className="text-sm text-primary hover:underline">{t("common.read_more")} <ArrowRight className="ml-1 inline h-3 w-3" /></Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {events.map((e) => (
              <Link key={e.id} to="/events/$slug" params={{ slug: e.slug }}>
                <Card className="flex items-start gap-4 p-6 transition hover:border-primary/40 hover:bg-surface-2">
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-primary">
                      {format(new Date(e.starts_at), "PPp")}
                    </div>
                    <h3 className="mt-1 text-lg leading-tight">{pickLang(e.title, lang)}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{pickLang(e.description, lang)}</p>
                    {e.location && <p className="mt-1 text-xs text-muted-foreground">📍 {e.location}</p>}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6">
        {mvv && (
          <Card className="p-8">
            <div className="text-xs uppercase tracking-widest text-primary">{t("home.mvv")}</div>
            <h3 className="mt-2 text-2xl">{pickLang(mvv.title, lang)}</h3>
            <p className="mt-3 whitespace-pre-line text-muted-foreground">{pickLang(mvv.summary, lang)}</p>
            <Link to="/academy/$slug" params={{ slug: mvv.slug }}><Button variant="outline" className="mt-5">{t("common.learn_more")}</Button></Link>
          </Card>
        )}
        {featured && (
          <Card className="relative overflow-hidden p-8">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="text-xs uppercase tracking-widest text-primary">{t("home.featured_training")}</div>
            <h3 className="mt-2 text-2xl">{pickLang(featured.title, lang)}</h3>
            <p className="mt-3 text-muted-foreground">{pickLang(featured.summary, lang)}</p>
            <Link to="/academy/$slug" params={{ slug: featured.slug }}><Button className="mt-5">{t("common.learn_more")}</Button></Link>
          </Card>
        )}
      </section>
    </AppLayout>
  );
}
