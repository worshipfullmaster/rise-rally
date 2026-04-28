# Decentralized deployment

This site is a **fully static** SPA. Every page, every article, every event
is bundled at build time from `.md` files in `src/content/`. There is no
database, no API server, no auth, no required cloud service at runtime.

That makes it trivial to mirror, censor-resist, and pin to decentralized
storage networks.

## 1. Build a static bundle

```bash
bun install
bun run build
```

The output lands in `dist/` (client assets only when the project is configured
for SPA / SSG output — see `vite.config.ts`).

## 2. Pin to IPFS

```bash
# Using Kubo (go-ipfs)
ipfs add -r dist/
# → returns a CID (Qm... or bafy...)

# Optional: pin via a remote service
ipfs pin remote add --service=web3-storage --name=genz dist/
```

Then access via:
- `https://ipfs.io/ipfs/<CID>`
- `https://<CID>.ipfs.dweb.link`
- ENS name like `genzmadagascar.eth` (link the CID via the ENS contenthash)

## 3. Mirror to Arweave (permanent)

```bash
npx arkb deploy ./dist --wallet wallet.json
```

Each deploy creates an immutable, permanently-funded copy.

## 4. Other resilient hosts

The same `dist/` works on Cloudflare Pages, GitHub Pages, Netlify, Vercel,
or any plain Nginx — pick several, point DNS round-robin or a fallback list.

## Why this works

- **No backend calls**: the app reads all data from JS bundles (built from
  `.md` files in `src/content/`), so it works offline after first load.
- **No environment variables required at runtime** for content.
- **Routing**: TanStack Router resolves routes client-side. Configure your
  host to fall back to `index.html` for unknown paths so deep links work.

## What is NOT decentralized

- The donation link (`donate.stripe.com/...`) — payments still flow through
  Stripe. For fully decentralized donations, swap for a crypto address.
- The Telegram channel (`t.me/genzhubmadagascar`) — Telegram is centralized.
  Consider also publishing to a Matrix room or Nostr relay for redundancy.
