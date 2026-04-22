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

  // Home enrichments
  "home.kicker": { en: "Movement · Madagascar", fr: "Mouvement · Madagascar", mg: "Hetsika · Madagasikara" },
  "home.cta.discover": { en: "Discover", fr: "Découvrir", mg: "Hahalala bebe kokoa" },
  "home.stats.cells": { en: "Local cells", fr: "Cellules locales", mg: "Vondrona an-toerana" },
  "home.stats.cities": { en: "Cities active", fr: "Villes actives", mg: "Tanàna mavitrika" },
  "home.stats.modules": { en: "Free trainings", fr: "Formations libres", mg: "Fiofanana maimaim-poana" },
  "home.stats.languages": { en: "Languages", fr: "Langues", mg: "Fiteny" },

  "home.pillars": { en: "Our pillars", fr: "Nos piliers", mg: "Ny andry"},
  "pillar.peace.title": { en: "Strictly non-violent", fr: "Strictement non-violent", mg: "Tsy misy herisetra mihitsy" },
  "pillar.peace.body": { en: "Civic action, dialogue, art and presence — never violence.", fr: "Action civique, dialogue, art, présence — jamais la violence.", mg: "Hetsika sivily, fifanakalozana, kanto, fisiana — tsy herisetra mihitsy." },
  "pillar.security.title": { en: "Digital protection", fr: "Protection numérique", mg: "Fiarovana an-tserasera" },
  "pillar.security.body": { en: "Encrypted comms, metadata stripping, panic exit, anti-doxxing.", fr: "Comms chiffrées, suppression de métadonnées, sortie d''urgence.", mg: "Serasera voaaro, fanafoanana metadata, fivoahana haingana." },
  "pillar.education.title": { en: "Free education", fr: "Éducation libre", mg: "Fanabeazana maimaim-poana" },
  "pillar.education.body": { en: "Trainings on rights, organizing, media literacy and care.", fr: "Formations droits, organisation, info, soin.", mg: "Fiofanana zo, fandaminana, vaovao, fikarakarana." },
  "pillar.solidarity.title": { en: "Solidarity & care", fr: "Solidarité & soin", mg: "Firaisan-kina sy fikarakarana" },
  "pillar.solidarity.body": { en: "Peer circles, legal observers, medical support, mutual aid.", fr: "Cercles de pairs, observateurs, secours, entraide.", mg: "Vondrona, mpanara-maso, vonjy aina, fifanampiana." },

  "home.hotlines": { en: "Emergency hotlines", fr: "Lignes d''urgence", mg: "Laharana vonjy maika" },
  "hotline.legal": { en: "Legal aid", fr: "Aide juridique", mg: "Fanampiana ara-dalàna" },
  "hotline.medic": { en: "Street medics", fr: "Secouristes", mg: "Mpitsabo an-dalambe" },
  "hotline.mental": { en: "Mental support", fr: "Soutien psy", mg: "Fanohanana ara-tsaina" },

  "home.faq": { en: "Frequently asked", fr: "Questions fréquentes", mg: "Fanontaniana matetika" },
  "faq.q1": { en: "Is the movement violent?", fr: "Le mouvement est-il violent ?", mg: "Mampiasa herisetra ve ny hetsika ?" },
  "faq.a1": { en: "No. We are strictly non-violent. Civic action only.", fr: "Non. Nous sommes strictement non-violents. Action civique uniquement.", mg: "Tsia. Tsy mampiasa herisetra mihitsy izahay." },
  "faq.q2": { en: "Is my data safe here?", fr: "Mes données sont-elles protégées ?", mg: "Voaaro ve ny angonako ?" },
  "faq.a2": { en: "Photos are stripped of metadata. The Quick Exit clears your local data instantly.", fr: "Les photos sont nettoyées. La Sortie rapide efface tout localement.", mg: "Voaesotra ny metadata. Mamafa avy hatrany ny Hivoaka haingana." },
  "faq.q3": { en: "How can I join a local cell?", fr: "Comment rejoindre une cellule ?", mg: "Ahoana no hidirana amin''ny vondrona ?" },
  "faq.a3": { en: "Sign up, attend an event, then ask a coordinator on Telegram.", fr: "Créez un compte, venez à un événement, demandez à un coordinateur.", mg: "Misoratra, manatreha hetsika, manontania amin''ny mpandrindra." },
  "faq.q4": { en: "Where does the funding go?", fr: "Où va l''argent ?", mg: "Aiza no andehanan''ny vola ?" },
  "faq.a4": { en: "Trainings, legal aid, materials, medical kits and digital security.", fr: "Formations, aide juridique, matériel, kits médicaux, sécurité.", mg: "Fiofanana, mpisolovava, fitaovana, kit medika, fiarovana." },

  "home.join": { en: "Ready to act?", fr: "Prêt·e à agir ?", mg: "Vonona hihetsika ?" },
  "home.join_body": { en: "Join thousands of young Malagasy organizing peacefully and safely.", fr: "Rejoins des milliers de jeunes Malgaches qui s''organisent.", mg: "Mirosoa amin''ireo tanora maro miaraka am-pilaminana." },

  "footer.tagline": { en: "Strictly non-violent civic engagement.", fr: "Engagement civique strictement non-violent.", mg: "Fandraisana anjara sivily, tsy misy herisetra." },
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
