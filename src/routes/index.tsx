import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Calendar, Send, ShieldCheck, Sparkles, Heart, BookOpen,
  Users, Globe2, Megaphone, Stethoscope, Scale, Brain, Flame, ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLang } from "@/i18n/LanguageProvider";
import { pickLang } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { TELEGRAM_URL } from "@/lib/constants";
import { format } from "date-fns";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Home,
});

type News = { id: string; slug: string; title: Record<string, string>; excerpt: Record<string, string>; published_at: string };
type EventRow = { id: string; slug: string; title: Record<string, string>; description: Record<string, string>; starts_at: string; location: string | null };
type Resource = { id: string; slug: string; title: Record<string, string>; summary: Record<string, string>; category: string; read_minutes: number };

const STORIES = [
  { key: "cat.digital_safety", to: "/academy", color: "from-primary to-hot", icon: ShieldCheck },
  { key: "cat.organizing", to: "/academy", color: "from-sun to-warning", icon: Users },
  { key: "cat.street_safety", to: "/academy", color: "from-success to-info", icon: Stethoscope },
  { key: "cat.know_your_rights", to: "/academy", color: "from-info to-primary", icon: Scale },
  { key: "cat.narrative", to: "/academy", color: "from-hot to-sun", icon: Megaphone },
  { key: "cat.general", to: "/academy", color: "from-secondary to-muted", icon: Brain },
] as const;

function Home() {
  const { t, lang } = useLang();
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    supabase.from("news").select("id,slug,title,excerpt,published_at").eq("published", true).order("published_at", { ascending: false }).limit(4)
      .then(({ data }) => setNews((data ?? []) as unknown as News[]));
    supabase.from("events").select("id,slug,title,description,starts_at,location").eq("published", true).gte("starts_at", new Date().toISOString()).order("starts_at").limit(3)
      .then(({ data }) => setEvents((data ?? []) as unknown as EventRow[]));
    supabase.from("resources").select("id,slug,title,summary,category,read_minutes").eq("published", true).order("created_at", { ascending: false }).limit(4)
      .then(({ data }) => setResources((data ?? []) as unknown as Resource[]));
  }, []);

  return (
    <AppLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="blob-sun absolute -top-32 -left-20 h-80 w-80 rounded-full blur-2xl" />
        <div className="blob-hot absolute -top-20 right-0 h-96 w-96 rounded-full blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-10 md:px-6 md:pt-16 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Logo size={48} className="md:hidden" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sun/40 bg-sun/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sun">
              <Sparkles className="h-3 w-3" /> {t("home.kicker")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }}
            className="mt-4 text-[42px] leading-[0.95] sm:text-6xl md:text-7xl"
          >
            <span className="text-foreground">GEN Z</span>
            <br />
            <span className="text-gradient-primary">MADAGASCAR</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.55 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-lg"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.55 }}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            <Link to="/auth">
              <Button size="lg" className="tap-scale h-12 rounded-full px-6 font-bold shadow-glow">
                {t("hero.cta.join")} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="tap-scale h-12 rounded-full border-sun/40 bg-sun/5 px-5 font-bold text-sun hover:bg-sun/15 hover:text-sun">
                <Send className="mr-1.5 h-4 w-4" /> Telegram
              </Button>
            </a>
            <Link to="/donate">
              <Button size="lg" variant="ghost" className="tap-scale h-12 rounded-full px-5 font-bold text-foreground hover:bg-secondary">
                <Heart className="mr-1.5 h-4 w-4 text-hot" /> {t("hero.cta.donate")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            {[
              { n: "120+", l: t("home.stats.cells"), c: "text-primary" },
              { n: "42", l: t("home.stats.cities"), c: "text-sun" },
              { n: "19", l: t("home.stats.modules"), c: "text-success" },
              { n: "3", l: t("home.stats.languages"), c: "text-info" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card/60 p-3 backdrop-blur md:p-4">
                <div className={`font-display text-2xl md:text-4xl ${s.c}`}>{s.n}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground md:text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY STORIES — horizontal scroll */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">
          <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:px-0">
            {STORIES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link key={i} to={s.to} className="tap-scale shrink-0">
                  <div className="flex w-[88px] flex-col items-center gap-2 md:w-24">
                    <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-background shadow-soft md:h-20 md:w-20`}>
                      <Icon className="h-7 w-7" strokeWidth={2.4} />
                    </div>
                    <span className="text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-muted-foreground md:text-xs">
                      {t(s.key)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-4xl">{t("home.pillars")}</h2>
          <Flame className="h-6 w-6 text-hot" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: ShieldCheck, k: "pillar.peace", color: "bg-sun text-sun-foreground" },
            { i: Globe2, k: "pillar.security", color: "bg-primary text-primary-foreground" },
            { i: BookOpen, k: "pillar.education", color: "bg-success text-success-foreground" },
            { i: Heart, k: "pillar.solidarity", color: "bg-info text-info-foreground" },
          ].map(({ i: Icon, k, color }) => (
            <Card key={k} className="overflow-hidden rounded-3xl border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
              <div className={`mb-4 grid h-11 w-11 place-items-center rounded-2xl ${color}`}>
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <h3 className="text-lg leading-tight">{t(`${k}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`${k}.body`)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-4xl">{t("home.latest_news")}</h2>
          <Link to="/news" className="text-sm font-semibold text-primary">
            {t("common.read_more")} <ChevronRight className="ml-0.5 inline h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {(news || []).map((n, idx) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="tap-scale">
              <Card className={`relative h-full overflow-hidden rounded-3xl p-5 transition hover:border-primary/50 ${idx === 0 ? "border-sun/40 bg-gradient-to-br from-sun/10 to-transparent" : ""}`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {format(new Date(n.published_at), "PP")}
                </div>
                <h3 className="mt-2 text-base leading-tight">{pickLang(n.title, lang)}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{pickLang(n.excerpt, lang)}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  {t("common.read_more")} <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-4xl">{t("home.upcoming_events")}</h2>
            <Link to="/events" className="text-sm font-semibold text-primary">
              {t("common.read_more")} <ChevronRight className="ml-0.5 inline h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {events.map((e) => {
              const d = new Date(e.starts_at);
              return (
                <Link key={e.id} to="/events/$slug" params={{ slug: e.slug }} className="tap-scale">
                  <Card className="flex h-full items-start gap-4 rounded-3xl p-5 transition hover:border-primary/40">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-hot text-primary-foreground shadow-glow">
                      <div className="text-center">
                        <div className="font-display text-xl leading-none">{format(d, "dd")}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">{format(d, "MMM")}</div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base leading-tight">{pickLang(e.title, lang)}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{pickLang(e.description, lang)}</p>
                      {e.location && <p className="mt-1.5 truncate text-xs text-sun">📍 {e.location}</p>}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FIELD ACADEMY PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-4xl">{t("academy.title")}</h2>
          <Link to="/academy" className="text-sm font-semibold text-primary">
            {t("common.read_more")} <ChevronRight className="ml-0.5 inline h-3.5 w-3.5" />
          </Link>
        </div>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">{t("academy.subtitle")}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r) => (
            <Link key={r.id} to="/academy/$slug" params={{ slug: r.slug }} className="tap-scale">
              <Card className="h-full rounded-3xl border-border p-5 transition hover:border-primary/40 hover:bg-surface-2">
                <span className="inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {t(`cat.${r.category}`)}
                </span>
                <h3 className="mt-3 text-base leading-tight">{pickLang(r.title, lang)}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{pickLang(r.summary, lang)}</p>
                <div className="mt-3 text-xs text-muted-foreground">⏱ {r.read_minutes} {t("common.minutes")}</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* HOTLINES */}
      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 md:pb-14">
        <h2 className="text-2xl md:text-4xl">{t("home.hotlines")}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { i: Scale, label: t("hotline.legal"), num: "+261 34 00 LEGAL", color: "border-info/40 bg-info/10 text-info" },
            { i: Stethoscope, label: t("hotline.medic"), num: "+261 34 00 MEDIC", color: "border-success/40 bg-success/10 text-success" },
            { i: Brain, label: t("hotline.mental"), num: "+261 34 00 CARE", color: "border-sun/40 bg-sun/10 text-sun" },
          ].map(({ i: Icon, label, num, color }) => (
            <div key={label} className={`flex items-center gap-4 rounded-3xl border p-5 ${color}`}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-background/30">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">{label}</div>
                <div className="font-display text-lg">{num}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-10 md:px-6 md:pb-14">
        <h2 className="text-2xl md:text-4xl">{t("home.faq")}</h2>
        <Accordion type="single" collapsible className="mt-5 rounded-3xl border border-border bg-card px-2">
          {[1, 2, 3, 4].map((i) => (
            <AccordionItem key={i} value={`q${i}`} className="border-border">
              <AccordionTrigger className="px-3 text-left text-base font-semibold hover:no-underline">
                {t(`faq.q${i}`)}
              </AccordionTrigger>
              <AccordionContent className="px-3 text-sm text-muted-foreground">
                {t(`faq.a${i}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* JOIN CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-to-br from-primary/20 via-background to-sun/15 p-7 md:p-12">
          <div className="blob-sun absolute -right-10 -top-10 h-60 w-60 rounded-full blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl">
              <span className="text-foreground">{t("home.join")}</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("home.join_body")}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/auth">
                <Button size="lg" className="tap-scale h-12 rounded-full px-6 font-bold shadow-glow">
                  {t("hero.cta.join")} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="tap-scale h-12 rounded-full px-5 font-bold">
                  <Calendar className="mr-1.5 h-4 w-4" /> {t("hero.cta.events")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
