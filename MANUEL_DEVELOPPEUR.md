# Manuel Développeur - GEN Z Movement Hub

## Vue d'ensemble de l'architecture

GEN Z Movement Hub est une application web moderne construite avec une architecture full-stack utilisant des technologies JavaScript/TypeScript. L'application est conçue pour être déployée sur Cloudflare Workers avec Supabase comme backend.

### Technologies principales

- **Frontend Framework** : React 18 avec TanStack Router
- **Build Tool** : Vite
- **Styling** : Tailwind CSS avec shadcn/ui
- **Backend** : Supabase (PostgreSQL + Auth + Storage)
- **Déploiement** : Cloudflare Workers
- **Langage** : TypeScript
- **State Management** : React Context + TanStack Query
- **Internationalisation** : Système personnalisé (EN/FR/MG)

## Structure du projet

```
src/
├── auth/                    # Authentification et autorisation
│   └── AuthProvider.tsx     # Context d'authentification
├── components/              # Composants React
│   ├── ui/                  # Composants shadcn/ui
│   ├── AppLayout.tsx        # Layout principal
│   ├── Header.tsx           # En-tête de navigation
│   └── ...
├── hooks/                   # Hooks React personnalisés
├── i18n/                    # Internationalisation
│   ├── LanguageProvider.tsx # Context de langue
│   └── translations.ts      # Fichiers de traduction
├── integrations/            # Intégrations externes
│   └── supabase/            # Client Supabase + types
├── lib/                     # Utilitaires et constantes
├── routes/                  # Pages et routes (TanStack Router)
├── server/                  # Fonctions serveur (API routes)
└── styles.css               # Styles globaux
```

## Architecture technique

### 1. Routing (TanStack Router)

L'application utilise TanStack Router pour le routing côté client avec génération automatique des routes :

```typescript
// src/routes/__root.tsx - Route racine
export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({ /* SEO meta tags */ }),
});

// src/routes/index.tsx - Page d'accueil
export const Route = createFileRoute("/")({
  component: HomePage,
});
```

**Génération automatique** : Le fichier `routeTree.gen.ts` est généré automatiquement.

### 2. Authentification et autorisation

#### Système de rôles
- **member** : Utilisateur standard
- **moderator** : Peut gérer le contenu
- **admin** : Accès complet au système

#### Provider d'authentification
```typescript
const { user, roles, isAdmin, signIn, signOut } = useAuth();
```

#### Middleware de sécurité
```typescript
// Vérification côté serveur
export const requireSupabaseAuth = createMiddleware()
  .middleware([/* auth checks */])
  .handler(/* protected logic */);
```

### 3. Base de données (Supabase)

#### Tables principales
- `profiles` : Profils utilisateur
- `user_roles` : Système de rôles
- `news` : Articles d'actualité
- `events` : Événements
- `resources` : Ressources d'académie
- `event_rsvps` : Inscriptions aux événements
- `media_items` : Médias uploadés
- `notifications` : Bannières de notification

#### Row Level Security (RLS)
Toutes les tables utilisent RLS pour la sécurité :
```sql
-- Exemple pour les news
CREATE POLICY "Public read published news" ON public.news
FOR SELECT USING (published = true);
```

### 4. Internationalisation

#### Structure des traductions
```typescript
type Dict = Record<string, { en: string; fr: string; mg: string }>;

export const t: Dict = {
  "nav.home": { en: "Home", fr: "Accueil", mg: "Fandraisana" },
  // ...
};
```

#### Utilisation
```typescript
const { t, lang } = useLang();
return <h1>{t("hero.title")}</h1>;
```

## Développement

### Prérequis

- Node.js ≥ 18
- npm ou bun
- Git
- Compte Supabase
- Compte Cloudflare (pour le déploiement)

### Installation

```bash
git clone <repository-url>
cd rise-rally
npm install
```

### Configuration

1. **Variables d'environnement** :
```bash
cp .env.example .env
# Éditer .env avec vos clés Supabase
```

2. **Supabase** :
```bash
npm install -g supabase
supabase login
supabase link --project-ref <your-project-id>
supabase db push  # Appliquer les migrations
```

### Scripts disponibles

```bash
npm run dev          # Développement local
npm run build        # Build de production
npm run build:dev    # Build de développement
npm run preview      # Prévisualisation du build
npm run lint         # Linting ESLint
npm run format       # Formatage Prettier
```

## API et intégrations

### 1. Supabase Client

```typescript
import { supabase } from "@/integrations/supabase/client";

// Authentification
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

// Base de données
const { data: news } = await supabase
  .from("news")
  .select("*")
  .eq("published", true)
  .order("published_at", { ascending: false });
```

### 2. Fonctions serveur (TanStack Start)

```typescript
export const getUserProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("profiles")
      .select("*")
      .eq("id", context.userId)
      .single();
    return data;
  });
```

### 3. Synchronisation GitHub

L'application peut synchroniser automatiquement le contenu depuis un dépôt GitHub :

```typescript
// Configuration
await saveGithubConfig({
  repo_url: "https://github.com/user/repo",
  branch: "main",
  pat: "github_token",
  folders: ["content/news", "content/events"],
  enabled: true
});

// Synchronisation manuelle
await runGithubSync();
```

## Sécurité

### 1. Authentification
- Supabase Auth avec JWT
- Sessions persistantes
- Auto-refresh des tokens

### 2. Autorisation
- Rôles utilisateur (member/moderator/admin)
- Vérifications côté serveur
- Row Level Security (RLS)

### 3. Sécurité des données
- Chiffrement des tokens GitHub
- Métadonnées supprimées des images
- Validation des entrées avec Zod

## Déploiement

### 1. Cloudflare Workers

```bash
# Installation Wrangler
npm install -g wrangler
wrangler login

# Déploiement
npm run build
wrangler deploy
```

### 2. Variables d'environnement Cloudflare

```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

## Bonnes pratiques de développement

### 1. Code style

- **TypeScript strict** : Types explicites partout
- **ESLint + Prettier** : Formatage automatique
- **Imports absolus** : `@/components/...`

### 2. Performance

```typescript
// Lazy loading des routes
const Route = createFileRoute("/heavy-page")({
  component: lazy(() => import("./HeavyPage")),
});

// Optimisation des images
import image from "./image.jpg?url";
<img src={image} loading="lazy" />
```

### 3. Accessibilité

```typescript
// Labels ARIA
<input aria-label={t("form.email")} />

// Navigation clavier
<button onClick={handleClick} onKeyDown={handleKeyDown}>
```

### 4. SEO

```typescript
export const Route = createFileRoute("/page")({
  head: () => ({
    meta: [
      { title: "Page Title" },
      { name: "description", content: "Page description" },
      { property: "og:image", content: imageUrl },
    ],
  }),
});
```

## Ressources supplémentaires

### Documentation externe

- [TanStack Router](https://tanstack.com/router)
- [Supabase Docs](https://supabase.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Note** : Ce manuel est maintenu à jour avec l'évolution de l'application.