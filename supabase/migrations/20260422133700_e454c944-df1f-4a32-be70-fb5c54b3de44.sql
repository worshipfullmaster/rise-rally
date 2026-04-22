INSERT INTO resources (slug, title, summary, body, category, read_minutes, published) VALUES
('doxxing-defense',
 '{"en":"Defending Against Doxxing","fr":"Se défendre contre le doxxing","mg":"Fiarovan-tena amin''ny doxxing"}'::jsonb,
 '{"en":"Reduce your public footprint and respond if your private info is exposed.","fr":"Réduisez votre empreinte publique et réagissez si vos infos privées sont exposées.","mg":"Ahenoy ny dian-tongotrao ampahibemaso."}'::jsonb,
 '{"en":"# Doxxing defense\n\nAudit search engines monthly. Use unique aliases per platform. Lock down old accounts.","fr":"# Défense contre le doxxing\n\nAuditez les moteurs de recherche chaque mois.","mg":"# Fiarovana amin''ny doxxing\n\nHamarino isam-bolana ny moteur de recherche."}'::jsonb,
 'digital_safety', 7, true),
('phone-seizure-protocol',
 '{"en":"If Your Phone Is Seized","fr":"Si votre téléphone est saisi","mg":"Raha alaina ny finday-nao"}'::jsonb,
 '{"en":"Pre-event setup and post-incident steps to protect your data.","fr":"Préparation avant événement et démarches après incident.","mg":"Fanomanana mialoha sy dingana aorian''izay."}'::jsonb,
 '{"en":"# Phone seizure\n\n**Before:** disable biometrics, 8+ digit PIN. **During:** power off. **After:** rotate passwords + 2FA.","fr":"# Saisie téléphone\n\n**Avant :** biométrie désactivée, PIN 8+. **Pendant :** éteignez. **Après :** changez tout.","mg":"# Finday alaina\n\n**Mialoha:** esory biometrika. **Mandritra:** vonoy. **Aoriana:** ovay teny miafina."}'::jsonb,
 'digital_safety', 6, true),
('first-aid-protest',
 '{"en":"Street First Aid Basics","fr":"Premiers secours en manifestation","mg":"Vonjy aina an-dalambe"}'::jsonb,
 '{"en":"Treat tear gas, dehydration, scrapes and panic attacks safely.","fr":"Soigner gaz, déshydratation, éraflures, panique.","mg":"Mitsabo ny voan''ny gazy, hetaheta, tahotra."}'::jsonb,
 '{"en":"# First aid\n\n- Tear gas: rinse eyes, face the wind. - Dehydration: small sips. - Panic: 4-7-8 breathing. - Bleeding: direct pressure.","fr":"# Secours\n\n- Gaz: rincer. - Déshydratation: petites gorgées. - Panique: 4-7-8.","mg":"# Vonjy aina\n\n- Gazy: sasao maso. - Hetaheta: sotroy tsikelikely. - Tahotra: 4-7-8."}'::jsonb,
 'street_safety', 8, true),
('crowd-safety-tactics',
 '{"en":"Crowd Safety Tactics","fr":"Sécurité en foule","mg":"Fiarovana eo amin''ny vahoaka"}'::jsonb,
 '{"en":"Read a crowd, find exits, avoid crushes, stay with your buddy.","fr":"Lire la foule, trouver des sorties, éviter bousculades.","mg":"Mahay ny vahoaka, mitady fivoahana."}'::jsonb,
 '{"en":"# Crowd safety\n\nArrive with a buddy. Map exits. Move sideways. Keep arms boxed at chest.","fr":"# Foule\n\nVenez en binôme. Repérez sorties. Déplacement latéral.","mg":"# Vahoaka\n\nMiaraka amin''ny mpiara-dia. Hamarino fivoahana."}'::jsonb,
 'street_safety', 5, true),
('media-team-roles',
 '{"en":"Media Team Roles","fr":"Rôles équipe média","mg":"Andraikitra media"}'::jsonb,
 '{"en":"Staff a 4-person media unit: shooter, runner, verifier, publisher.","fr":"Unité média 4 personnes.","mg":"Ekipa media 4 olona."}'::jsonb,
 '{"en":"# Media roles\n\nShooter, runner, verifier, publisher. Pre-approved templates only.","fr":"# Média\n\nCaméra, coursier, vérificateur, publieur.","mg":"# Andraikitra\n\nMpaka sary, mpitatitra, mpanamarina, mpamoaka."}'::jsonb,
 'narrative', 6, true),
('counter-disinfo',
 '{"en":"Counter-Disinformation Toolkit","fr":"Anti-désinformation","mg":"Hiadiana amin''ny vaovao diso"}'::jsonb,
 '{"en":"Spot manipulated images, fake quotes and AI-generated audio.","fr":"Détecter manipulations.","mg":"Mahay mamantatra sary novaina."}'::jsonb,
 '{"en":"# Counter-disinfo\n\nReverse-image search. Verify quotes. Publish corrections within 2 hours.","fr":"# Anti-désinfo\n\nRecherche inversée.","mg":"# Vaovao diso\n\nKaroka mifamadika."}'::jsonb,
 'narrative', 7, true),
('legal-rights-arrest',
 '{"en":"Your Rights If Arrested","fr":"Vos droits en cas d''arrestation","mg":"Ny zonao raha voasambotra"}'::jsonb,
 '{"en":"Stay silent except for your name. Ask for a lawyer.","fr":"Silence sauf votre nom. Avocat.","mg":"Mangina afa-tsy anarana. Mangataha mpisolovava."}'::jsonb,
 '{"en":"# If arrested\n\n1. Name + ID only. 2. Request lawyer. 3. Sign nothing. 4. Note officer numbers.","fr":"# Arrestation\n\n1. Nom + pièce. 2. Avocat. 3. Ne signez pas.","mg":"# Voasambotra\n\n1. Anarana sy karatra. 2. Mpisolovava. 3. Aza manao sonia."}'::jsonb,
 'know_your_rights', 6, true),
('mental-health-resilience',
 '{"en":"Mental Health & Resilience","fr":"Santé mentale","mg":"Fahasalamana ara-tsaina"}'::jsonb,
 '{"en":"Burnout signs, peer support circles and recovery rituals.","fr":"Burn-out, soutien, récupération.","mg":"Haboboka, fifanampiana, fanasitranana."}'::jsonb,
 '{"en":"# Mental health\n\nRotate roles every 2 weeks. Weekly peer circles. Sleep 7+ hours.","fr":"# Santé mentale\n\nRotation 2 semaines. 7h+ sommeil.","mg":"# Saina\n\nMifamadika 2 herinandro. Matory 7 ora."}'::jsonb,
 'general', 5, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO news (slug, title, excerpt, body, published, published_at) VALUES
('field-academy-launch',
 '{"en":"Field Academy adds 8 new modules","fr":"L''Académie ajoute 8 modules","mg":"Manampy modely 8 ny Akademia"}'::jsonb,
 '{"en":"From phone-seizure protocols to mental health, the curriculum now covers 19 essentials.","fr":"De la saisie de téléphone à la santé mentale, 19 essentiels.","mg":"Manomboka amin''ny finday ka hatramin''ny saina, 19 lohahevitra."}'::jsonb,
 '{"en":"All modules are free, peer-reviewed and available offline as PDF.","fr":"Tous gratuits, relus, hors ligne en PDF.","mg":"Maimaim-poana sy azo amin''ny tsy aterineto."}'::jsonb,
 true, NOW() - INTERVAL '1 day'),
('volunteer-medic-network',
 '{"en":"Volunteer medic network grows to 42 cities","fr":"Le réseau de secouristes atteint 42 villes","mg":"Mahatratra tanàna 42 ny mpitsabo"}'::jsonb,
 '{"en":"Trained street medics now coordinate via encrypted channels nationwide.","fr":"Coordination via canaux chiffrés à l''échelle nationale.","mg":"Mifandrindra amin''ny serasera voaaro manerana ny firenena."}'::jsonb,
 '{"en":"Apply via the Field Academy first-aid track.","fr":"Postulez via le parcours premiers secours.","mg":"Mandefasa fangatahana amin''ny lalana vonjy aina."}'::jsonb,
 true, NOW() - INTERVAL '4 days'),
('multilingual-rollout',
 '{"en":"Platform now fully trilingual","fr":"Plateforme entièrement trilingue","mg":"Sehatra amin''ny fiteny telo"}'::jsonb,
 '{"en":"Every resource, news article and event ships in Malagasy, French and English.","fr":"Tout est disponible en malgache, français, anglais.","mg":"Ny zavatra rehetra dia amin''ny teny telo."}'::jsonb,
 '{"en":"Translation contributors welcome.","fr":"Traducteurs bienvenus.","mg":"Raisina ny mpandika teny."}'::jsonb,
 true, NOW() - INTERVAL '7 days')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (slug, title, description, starts_at, ends_at, location, published, rsvp_enabled) VALUES
('legal-observer-training',
 '{"en":"Legal Observer Training","fr":"Formation observateurs juridiques","mg":"Fiofanana mpanara-maso ara-dalàna"}'::jsonb,
 '{"en":"Half-day training to document rights violations safely and credibly. Bring notebook, pen, phone with offline maps.","fr":"Demi-journée pour documenter les violations. Apportez carnet, stylo, téléphone hors ligne.","mg":"Antsasak''andro hanoratana ny fanitsakitsahana. Mitondrà kahie, penina, finday."}'::jsonb,
 NOW() + INTERVAL '12 days', NOW() + INTERVAL '12 days 4 hours', 'Antsirabe, Mada House', true, true),
('community-cleanup-day',
 '{"en":"Community Clean-Up & Mural Day","fr":"Journée nettoyage et fresque","mg":"Andro fanadiovana sy hosodoko"}'::jsonb,
 '{"en":"Civic action through neighborhood care: clean a park, paint a mural, share a meal. Family-friendly.","fr":"Action civique par le soin du quartier. Adapté aux familles.","mg":"Hetsika sivily amin''ny manodidina. Mety amin''ny ankizy."}'::jsonb,
 NOW() + INTERVAL '20 days', NOW() + INTERVAL '20 days 6 hours', 'Antananarivo, Parc Tsimbazaza', true, true),
('youth-assembly-toamasina',
 '{"en":"Youth Assembly — Toamasina","fr":"Assemblée des jeunes — Toamasina","mg":"Fivoriamben''ny Tanora — Toamasina"}'::jsonb,
 '{"en":"Open mic, working groups on transport, education, digital rights. Doors 8:30. Live trilingual interpretation.","fr":"Micro ouvert, groupes transport, éducation, droits numériques. Portes 8h30.","mg":"Mikrôfaona misokatra. Sokafana 8:30."}'::jsonb,
 NOW() + INTERVAL '32 days', NOW() + INTERVAL '32 days 8 hours', 'Toamasina, Maison de la Culture', true, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO notifications (title, body, level, active) VALUES
('{"en":"New: 19 Field Academy modules online","fr":"Nouveau : 19 modules en ligne","mg":"Vaovao: 19 modely an-tserasera"}'::jsonb,
 '{"en":"Free, offline-ready, peer-reviewed.","fr":"Gratuit, hors ligne, relu.","mg":"Maimaim-poana sy azo amin''ny tsy aterineto."}'::jsonb,
 'info', true);

UPDATE notifications SET active = false WHERE id NOT IN (SELECT id FROM notifications WHERE active = true ORDER BY created_at DESC LIMIT 1);