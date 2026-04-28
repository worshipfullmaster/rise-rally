# Content folders

Every piece of content on the public site lives here as a Markdown (`.md`)
or plain text (`.txt`) file. There is **no database**.

## Folders

- `news/` — Articles shown on the News page
- `events/` — Events shown on the Events page
- `academy/` — Field Academy training resources

## File format

Each file starts with a frontmatter block, then the body in Markdown:

```
---
slug: my-article
title: English title
title_fr: Titre français
title_mg: Lohatenin'ny Malagasy
excerpt: Short English summary
excerpt_fr: Court résumé français
excerpt_mg: Famintinana fohy malagasy
published_at: 2026-04-15        # for news
starts_at: 2026-05-18T09:00:00Z # for events
location: Antananarivo          # for events
category: announcements
read_minutes: 6                 # for academy resources
---

The body of the article in Markdown.
Multiple paragraphs are supported.
```

## Adding new content

1. Create a new `.md` file in the matching folder.
2. Fill the frontmatter fields above (only `_fr` / `_mg` are optional —
   they fall back to the English value).
3. Commit. The site picks it up at the next build. No deploy hooks, no
   server, no database to update.

## Why no upload form?

A "drive-like" upload requires a writable backend. This site is fully
static and decentralization-ready (deployable to IPFS / Arweave), so
content is only added by editing files in the repo.
