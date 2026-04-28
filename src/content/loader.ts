import type { Lang } from "@/i18n/translations";

// Eagerly bundle all content as raw strings at build time.
// No database, no runtime fetch — fully static.
const NEWS_FILES = import.meta.glob("/src/content/news/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const EVENT_FILES = import.meta.glob("/src/content/events/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const ACADEMY_FILES = import.meta.glob("/src/content/academy/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

type Frontmatter = Record<string, string>;

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Frontmatter = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

function localized(data: Frontmatter, key: string): Record<Lang, string> {
  return {
    en: data[key] ?? "",
    fr: data[`${key}_fr`] ?? data[key] ?? "",
    mg: data[`${key}_mg`] ?? data[key] ?? "",
  };
}

export type NewsItem = {
  slug: string;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  body: string;
  published_at: string;
  category: string;
};

export type EventItem = {
  slug: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  body: string;
  starts_at: string;
  location: string;
  category: string;
};

export type AcademyItem = {
  slug: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  body: string;
  category: string;
  read_minutes: number;
};

function loadNews(): NewsItem[] {
  return Object.entries(NEWS_FILES)
    .map(([path, raw]) => {
      const { data, body } = parseFrontmatter(raw);
      const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");
      return {
        slug: data.slug || fallbackSlug,
        title: localized(data, "title"),
        excerpt: localized(data, "excerpt"),
        body: body.trim(),
        published_at: data.published_at || "1970-01-01",
        category: data.category || "general",
      };
    })
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
}

function loadEvents(): EventItem[] {
  return Object.entries(EVENT_FILES)
    .map(([path, raw]) => {
      const { data, body } = parseFrontmatter(raw);
      const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");
      return {
        slug: data.slug || fallbackSlug,
        title: localized(data, "title"),
        description: localized(data, "description"),
        body: body.trim(),
        starts_at: data.starts_at || new Date().toISOString(),
        location: data.location || "",
        category: data.category || "general",
      };
    })
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}

function loadAcademy(): AcademyItem[] {
  return Object.entries(ACADEMY_FILES)
    .map(([path, raw]) => {
      const { data, body } = parseFrontmatter(raw);
      const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");
      return {
        slug: data.slug || fallbackSlug,
        title: localized(data, "title"),
        summary: localized(data, "summary"),
        body: body.trim(),
        category: data.category || "general",
        read_minutes: parseInt(data.read_minutes || "5", 10),
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export const NEWS: NewsItem[] = loadNews();
export const EVENTS: EventItem[] = loadEvents();
export const ACADEMY: AcademyItem[] = loadAcademy();

export const findNews = (slug: string) => NEWS.find((n) => n.slug === slug) ?? null;
export const findEvent = (slug: string) => EVENTS.find((e) => e.slug === slug) ?? null;
export const findAcademy = (slug: string) => ACADEMY.find((a) => a.slug === slug) ?? null;

export const upcomingEvents = () => {
  const now = Date.now();
  return EVENTS.filter((e) => new Date(e.starts_at).getTime() >= now);
};
