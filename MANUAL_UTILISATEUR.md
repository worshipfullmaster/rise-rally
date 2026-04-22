# Manuel d'utilisation - GEN Z Movement Hub

## Vue d'ensemble

GEN Z Movement Hub est une plateforme jeunesse dédiée à l'engagement civique non-violent à Madagascar. La plateforme offre des ressources de formation, des informations sur les événements, des actualités, et des outils pour une action civique sûre et efficace.

La plateforme est disponible en trois langues : Anglais, Français et Malagasy.

## Premiers pas

### Accès à la plateforme

1. Ouvrez votre navigateur web
2. Accédez à l'URL de la plateforme GEN Z Movement Hub
3. La page d'accueil se charge automatiquement

### Changement de langue

- Cliquez sur le sélecteur de langue dans l'en-tête (EN/FR/MG)
- La plateforme se met à jour automatiquement dans la langue sélectionnée

## Fonctionnalités principales

### 1. Page d'accueil

La page d'accueil présente :
- **Section héros** : Présentation du mouvement avec boutons d'action
- **Dernières actualités** : Articles récents publiés
- **Événements à venir** : Prochains événements programmés
- **Formations en vedette** : Ressources de formation mises en avant

Actions disponibles :
- **Rejoindre le mouvement** : Accès à la page d'inscription
- **Telegram officiel** : Lien vers le canal Telegram
- **Faire un don** : Accès à la page de dons

### 2. Académie de terrain (Field Academy)

L'Académie de terrain propose des formations pratiques pour l'action civique.

#### Catégories de formation :
- **Sécurité numérique** : Protection des données et vie privée en ligne
- **Organisation** : Techniques d'organisation pacifique
- **Sécurité de rue** : Sécurité lors de manifestations
- **Narratif** : Communication et storytelling
- **Vos droits** : Connaissance des droits civiques
- **Général** : Ressources générales

#### Navigation :
1. Cliquez sur "Académie de terrain" dans le menu
2. Utilisez les filtres pour naviguer par catégorie
3. Cliquez sur une ressource pour la lire
4. Chaque ressource indique le temps de lecture estimé

### 3. Événements

La section événements liste tous les événements à venir.

#### Fonctionnalités :
- **Liste des événements** : Titre, description, date et lieu
- **Détails d'événement** : Page détaillée pour chaque événement
- **RSVP** : Confirmation de participation (nécessite un compte)

#### Comment participer :
1. Cliquez sur "Événements" dans le menu
2. Parcourez la liste des événements
3. Cliquez sur un événement pour voir les détails
4. Utilisez le bouton "Confirmer ma présence" si connecté

### 4. Actualités

La section actualités présente les dernières nouvelles et mises à jour.

#### Fonctionnalités :
- **Articles récents** : Liste chronologique des publications
- **Recherche** : Navigation par titre et extrait
- **Lecture complète** : Accès aux articles détaillés

### 5. Coffre média (Media Vault)

Le coffre média est un archive vérifiée et modérée de contenus multimédias.

#### Fonctionnalités :
- **Galerie approuvée** : Médias vérifiés uniquement
- **Téléchargement sécurisé** : Métadonnées supprimées automatiquement
- **Upload** : Pour utilisateurs authentifiés (modération requise)

#### Upload de média :
1. Connectez-vous à votre compte
2. Accédez au "Coffre média"
3. Cliquez sur le bouton d'upload
4. Sélectionnez votre fichier image
5. Ajoutez une légende si souhaité
6. Le média sera modéré avant publication

### 6. Dons

La plateforme accepte les dons pour soutenir le mouvement.

#### Processus de don :
1. Cliquez sur "Faire un don" dans le menu ou la page d'accueil
2. Cliquez sur "Faire un don via Stripe"
3. Vous serez redirigé vers Stripe (sécurisé)
4. Choisissez votre méthode de paiement :
   - Carte bancaire
   - Apple Pay
   - Google Pay
   - Link

**Note** : Les informations de carte ne sont pas stockées sur la plateforme.

## Gestion du compte

### Inscription

1. Cliquez sur "Rejoindre le mouvement" ou "Connexion"
2. Sélectionnez "Créer un compte"
3. Remplissez :
   - Email
   - Mot de passe
   - Nom (optionnel)
4. Cliquez sur "Créer un compte"

### Connexion

1. Cliquez sur "Connexion" dans le menu
2. Entrez votre email et mot de passe
3. Cliquez sur "Connexion"

### Déconnexion

- Cliquez sur "Déconnexion" dans le menu utilisateur

## Fonctionnalités de sécurité

### Bouton de sortie rapide (Panic Button)

En cas d'urgence, le bouton de sortie rapide :
- Efface votre session locale
- Redirige vers un site neutre (weather.com)
- Préserve votre sécurité

**Localisation** : Bouton rouge dans l'en-tête

### Sécurité des données

- **Médias** : Métadonnées supprimées automatiquement
- **Paiements** : Traités par Stripe (PCI-DSS Level 1)
- **Authentification** : Sécurisée via Supabase

## Support et contact

### Canal Telegram officiel

Rejoignez la communauté sur Telegram pour :
- Mises à jour en temps réel
- Discussion avec d'autres membres
- Support de la communauté

**Lien** : https://t.me/genzmovementhub

### Signalement de problèmes

Pour signaler un problème technique :
1. Vérifiez que vous utilisez un navigateur moderne
2. Essayez de rafraîchir la page
3. Contactez le support via Telegram si le problème persiste

## Accessibilité

La plateforme est conçue pour être accessible :
- **Navigation clavier** : Tous les éléments sont accessibles au clavier
- **Lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Responsive** : Fonctionne sur mobile et desktop
- **Multilingue** : Support pour l'anglais, français et malagasy

## Confidentialité et sécurité

- **Données personnelles** : Minimisées et sécurisées
- **Communications** : Chiffrées en transit
- **Modération** : Tous les contenus sont modérés
- **Transparence** : Code source ouvert et auditable

## Mise à jour de ce manuel

Ce manuel est mis à jour régulièrement. Pour la dernière version, consultez la documentation officielle de la plateforme.

---

**GEN Z Movement Hub** - Engagement civique, organisé pacifiquement.

## Installation et configuration du serveur

### Prérequis système

Avant d'installer l'application, assurez-vous que votre serveur dispose des éléments suivants :

- **Node.js** : Version 18 ou supérieure
- **npm** ou **bun** : Gestionnaire de paquets
- **Git** : Pour cloner le dépôt
- **Accès Cloudflare** : Compte Cloudflare avec Wrangler CLI installé
- **Accès Supabase** : Projet Supabase configuré

### 1. Clonage du dépôt

```bash
git clone https://github.com/worshipfullmaster/rise-rally.git
cd rise-rally
```

### 2. Installation des dépendances

```bash
# Avec npm
npm install

# Ou avec bun (recommandé pour les performances)
bun install
```

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Clés Supabase (à obtenir depuis votre projet Supabase)
SUPABASE_URL="https://votre-projet.supabase.co"
SUPABASE_PUBLISHABLE_KEY="votre-cle-publisable"
VITE_SUPABASE_URL="https://votre-projet.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="votre-cle-publisable"
VITE_SUPABASE_PROJECT_ID="id-de-votre-projet"

# URL de don Stripe (optionnel)
STRIPE_DONATION_URL="https://donate.stripe.com/test_..."

# URL Telegram (optionnel)
TELEGRAM_URL="https://t.me/votre-canal"

# URL de redirection du bouton panique
PANIC_REDIRECT_URL="https://www.weather.com/"
```

### 4. Configuration de Supabase

#### Création d'un nouveau projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL du projet et les clés API

#### Migration de la base de données

Exécutez les migrations pour créer la structure de la base de données :

```bash
# Installation de Supabase CLI si nécessaire
npm install -g supabase

# Connexion à votre projet
supabase login
supabase link --project-ref votre-project-id

# Application des migrations
supabase db push
```

Les migrations incluent :
- Tables utilisateurs et profils
- Système de rôles (admin, moderator, member)
- Tables pour les actualités, événements, ressources
- Tables pour les médias et les RSVP
- Données de démonstration

#### Configuration de l'authentification

Dans le tableau de bord Supabase :
1. Allez dans **Authentication > Settings**
2. Configurez les fournisseurs d'authentification (Email, Google, etc.)
3. Définissez les URLs de redirection
4. Activez la confirmation par email si souhaité

### 5. Configuration Cloudflare

#### Installation de Wrangler

```bash
npm install -g wrangler
wrangler login
```

#### Configuration du déploiement

1. Créez un compte Cloudflare si nécessaire
2. Installez Wrangler CLI
3. Connectez-vous : `wrangler login`

Le fichier `wrangler.jsonc` est déjà configuré pour le déploiement.

### 6. Build et déploiement

#### Build de développement

```bash
# Build pour développement
npm run build:dev

# Prévisualisation locale
npm run preview
```

#### Build de production

```bash
# Build pour production
npm run build
```

#### Déploiement sur Cloudflare

```bash
# Déploiement
wrangler deploy

# Ou pour un environnement spécifique
wrangler deploy --env production
```

### 7. Configuration post-déploiement

#### Variables d'environnement Cloudflare

Définissez les variables d'environnement dans Cloudflare :

```bash
# Via Wrangler
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_PUBLISHABLE_KEY
# ... autres variables sensibles
```

#### Domaines personnalisés

1. Dans le tableau de bord Cloudflare, allez dans **Workers**
2. Sélectionnez votre worker
3. Ajoutez un domaine personnalisé
4. Configurez les DNS si nécessaire

### 8. Administration initiale

#### Création du premier administrateur

Après le déploiement, créez le premier compte administrateur :

1. Inscrivez-vous normalement sur l'application
2. Via Supabase, attribuez le rôle 'admin' à votre utilisateur :

```sql
-- Dans l'éditeur SQL de Supabase
INSERT INTO user_roles (user_id, role) 
VALUES ('votre-user-id', 'admin');
```

#### Configuration GitHub Sync (optionnel)

Pour synchroniser automatiquement le contenu depuis un dépôt GitHub :

1. Créez un Personal Access Token GitHub avec les permissions `repo`
2. Dans la section Admin de l'application, configurez :
   - URL du dépôt
   - Branche
   - Dossiers à synchroniser
   - Token PAT

### 9. Maintenance et monitoring

#### Logs et monitoring

- **Cloudflare** : Utilisez le tableau de bord pour voir les logs
- **Supabase** : Monitorer l'utilisation et les erreurs dans le tableau de bord

#### Mises à jour

```bash
# Récupérer les dernières modifications
git pull origin main

# Rebuild et redéployer
npm run build
wrangler deploy
```

#### Sauvegarde

- **Base de données** : Supabase gère automatiquement les sauvegardes
- **Médias** : Stockés dans Supabase Storage avec versioning

### 10. Dépannage

#### Problèmes courants

**Erreur de build :**
- Vérifiez Node.js version ≥18
- Supprimez `node_modules` et `bun.lockb` puis réinstallez

**Erreur Supabase :**
- Vérifiez les clés API
- Assurez-vous que les migrations sont appliquées
- Vérifiez les permissions RLS

**Erreur de déploiement Cloudflare :**
- Vérifiez `wrangler login`
- Assurez-vous que le compte a les droits de déploiement

#### Support

- Consultez les logs Cloudflare : `wrangler tail`
- Vérifiez les erreurs Supabase dans le tableau de bord
- Pour les problèmes de code, consultez les issues GitHub

### 11. Sécurité

#### Recommandations

- **Clés API** : Stockez dans les secrets Cloudflare, jamais en dur
- **Authentification** : Activez 2FA pour les comptes admin
- **Mises à jour** : Gardez les dépendances à jour
- **Monitoring** : Surveillez les logs pour les tentatives d'accès suspectes

#### Conformité

L'application respecte :
- RGPD pour la protection des données
- PCI-DSS pour les paiements Stripe
- Bonnes pratiques de sécurité web</content>
<parameter name="filePath">/workspaces/rise-rally/MANUAL_UTILISATEUR.md