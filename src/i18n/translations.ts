export type Lang = "en" | "fr" | "mg";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "mg", label: "Malagasy", native: "Malagasy" },
  { code: "fr", label: "French", native: "Français" },
  { code: "en", label: "English", native: "English" },
];

export const DEFAULT_LANG: Lang = "mg";

type Dict = Record<string, { en: string; fr: string; mg: string }>;

export const t: Dict = {
  // Nav
  "nav.home": { en: "Home", fr: "Accueil", mg: "Fandraisana" },
  "nav.news": { en: "News", fr: "Actualités", mg: "Vaovao" },
  "nav.events": { en: "Events", fr: "Événements", mg: "Hetsika" },
  "nav.academy": { en: "Field Academy", fr: "Académie de terrain", mg: "Akademia eny an-toerana" },
  "nav.media": { en: "Media Vault", fr: "Coffre Média", mg: "Tahirin-tsary" },
  "nav.donate": { en: "Donate", fr: "Faire un don", mg: "Manolotra" },
  "nav.admin": { en: "Admin", fr: "Admin", mg: "Admin" },
  "nav.signin": { en: "Sign in", fr: "Connexion", mg: "Hiditra" },
  "nav.signout": { en: "Sign out", fr: "Déconnexion", mg: "Hivoaka" },

  // Hero
  "hero.tagline": {
    en: "A youth movement, organized peacefully and protected digitally.",
    fr: "Un mouvement de jeunesse, organisé pacifiquement et protégé numériquement.",
    mg: "Hetsiky ny tanora, voalamina am-pilaminana sy voaaro an-tserasera.",
  },
  "hero.title": {
    en: "GEN Z Movement Hub",
    fr: "GEN Z Movement Hub",
    mg: "GEN Z Movement Hub",
  },
  "hero.cta.join": { en: "Join the movement", fr: "Rejoindre le mouvement", mg: "Hiditra amin''ny hetsika" },
  "hero.cta.events": { en: "See events", fr: "Voir les événements", mg: "Hijery ny hetsika" },
  "hero.cta.telegram": { en: "Official Telegram", fr: "Telegram officiel", mg: "Telegram ofisialy" },
  "hero.cta.donate": { en: "Donate", fr: "Faire un don", mg: "Manolotra" },

  "home.latest_news": { en: "Latest news", fr: "Dernières actualités", mg: "Vaovao farany" },
  "home.upcoming_events": { en: "Upcoming events", fr: "Événements à venir", mg: "Hetsika ho avy" },
  "home.mvv": { en: "Mission · Vision · Values", fr: "Mission · Vision · Valeurs", mg: "Iraka · Vina · Soatoavina" },
  "home.featured_training": { en: "Featured training", fr: "Formation à la une", mg: "Fiofanana manan-danja" },

  // Common
  "common.read_more": { en: "Read more", fr: "Lire la suite", mg: "Hamaky bebe kokoa" },
  "common.learn_more": { en: "Learn more", fr: "En savoir plus", mg: "Hianatra bebe kokoa" },
  "common.rsvp": { en: "RSVP", fr: "Confirmer ma présence", mg: "Hanamafy ny fanatrehana" },
  "common.cancel_rsvp": { en: "Cancel RSVP", fr: "Annuler", mg: "Hanafoana" },
  "common.back": { en: "Back", fr: "Retour", mg: "Hiverina" },
  "common.loading": { en: "Loading…", fr: "Chargement…", mg: "Mametaka…" },
  "common.empty": { en: "Nothing here yet.", fr: "Rien pour le moment.", mg: "Mbola tsy misy." },
  "common.minutes": { en: "min read", fr: "min de lecture", mg: "min famakiana" },

  // Categories
  "cat.digital_safety": { en: "Digital Safety", fr: "Sécurité numérique", mg: "Fiarovana an-tserasera" },
  "cat.organizing": { en: "Organizing", fr: "Organisation", mg: "Fandaminana" },
  "cat.street_safety": { en: "Street Safety", fr: "Sécurité de rue", mg: "Fiarovana an-dalambe" },
  "cat.narrative": { en: "Narrative", fr: "Narratif", mg: "Tantara" },
  "cat.know_your_rights": { en: "Know Your Rights", fr: "Vos droits", mg: "Fantaro ny zonao" },
  "cat.general": { en: "General", fr: "Général", mg: "Ankapobe" },

  // Panic
  "panic.button": { en: "Quick exit", fr: "Sortie rapide", mg: "Hivoaka haingana" },
  "panic.tooltip": {
    en: "Clears your local session and redirects to a neutral site.",
    fr: "Efface votre session locale et redirige vers un site neutre.",
    mg: "Mamafa ny fipetrahanao eo an-toerana ary mampihodina mankany amin''ny pejy tsy miangatra.",
  },

  // Donate
  "donate.title": { en: "Support the movement", fr: "Soutenir le mouvement", mg: "Hanohana ny hetsika" },
  "donate.body": {
    en: "Donations fund training, materials, legal support and digital security.",
    fr: "Les dons financent la formation, le matériel, le soutien juridique et la sécurité numérique.",
    mg: "Ny fanomezana dia mamatsy ny fiofanana, ny fitaovana, ny fanampiana ara-dalàna ary ny fiarovana an-tserasera.",
  },
  "donate.cta": { en: "Donate via Stripe", fr: "Faire un don via Stripe", mg: "Manolotra amin''ny Stripe" },

  // Auth
  "auth.signin": { en: "Sign in", fr: "Connexion", mg: "Hiditra" },
  "auth.signup": { en: "Create account", fr: "Créer un compte", mg: "Hamorona kaonty" },
  "auth.email": { en: "Email", fr: "Email", mg: "Mailaka" },
  "auth.password": { en: "Password", fr: "Mot de passe", mg: "Teny miafina" },
  "auth.have_account": { en: "Already have an account?", fr: "Vous avez déjà un compte ?", mg: "Manana kaonty efa?" },
  "auth.no_account": { en: "Need an account?", fr: "Pas de compte ?", mg: "Mila kaonty?" },

  // Field academy
  "academy.title": { en: "Field Academy", fr: "Académie de terrain", mg: "Akademia eny an-toerana" },
  "academy.subtitle": {
    en: "Practical training for safe, peaceful and effective civic action.",
    fr: "Formation pratique pour une action civique sûre, pacifique et efficace.",
    mg: "Fiofanana azo ampiharina ho an''ny hetsika sivily milamina, am-pilaminana ary mahomby.",
  },

  // Media
  "media.title": { en: "Media Vault", fr: "Coffre Média", mg: "Tahirin-tsary" },
  "media.subtitle": {
    en: "Verified, moderated archive. All uploads have metadata stripped server-side.",
    fr: "Archive vérifiée et modérée. Toutes les images sont nettoyées de leurs métadonnées côté serveur.",
    mg: "Tahiry voamarina sy voafehy. Voaesotra ny metadata amin''ny sary rehetra alefa.",
  },
  "media.upload": { en: "Upload", fr: "Téléverser", mg: "Halefa" },

  // Admin
  "admin.title": { en: "Admin Console", fr: "Console d''admin", mg: "Console admin" },
  "admin.github": { en: "GitHub Configuration", fr: "Configuration GitHub", mg: "Fanamboarana GitHub" },
  "admin.sync_now": { en: "Sync now", fr: "Synchroniser", mg: "Ampifanaraho izao" },
  "admin.sync_logs": { en: "Sync logs", fr: "Journaux de synchro", mg: "Tatitra fampifanarahana" },
};

export function tr(key: string, lang: Lang): string {
  const entry = t[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}

export function pickLang<T extends Record<string, string> | null | undefined>(
  obj: T,
  lang: Lang
): string {
  if (!obj) return "";
  return (obj as Record<string, string>)[lang] || (obj as Record<string, string>).en || (obj as Record<string, string>).fr || (obj as Record<string, string>).mg || "";
}
