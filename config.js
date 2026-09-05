const config = {

    site: {
        name:       "Lumen Docs",
        tagline:    "Documentation des ressources lumen",
        version:    "v1.2",
        githubUrl:  "",
        discordUrl: "",
        logoUrl:    "https://media.discordapp.net/attachments/895755090521104434/1479228439755231232/LPv2.png?ex=69b13516&is=69afe396&hm=5d0b5dd2e0cb3665306d46ceab3720e37fccb467a1aee2c48872e6ced2bb6912&=&format=webp&quality=lossless&width=1521&height=856"
    },

    resources: [

        // ══════════════════════════════════════════
        // ║  LUMEN-GRANT                           ║
        // ══════════════════════════════════════════
        {
            id:          "lumen-grant",
            name:        "lumen-grant",
            version:     "v1.2.0",
            description: "Système de gestion des permissions FiveM — sécurisé, basé sur MySQL/oxmysql, avec presets, sélection multiple, panel web Discord OAuth2 et panel NUI in-game.",
            icon:        "🔐",
            color:       "#8b5cf6",
            status:      "stable",

            categories: [
                {
                    title: "Démarrage",
                    items: ["introduction", "installation", "configuration", "migration"]
                },
                {
                    title: "Panels d'administration",
                    items: ["panel-nui", "panel-web", "presets-guide", "multi-selection", "sync"]
                },
                {
                    title: "Exports — Permissions",
                    items: ["RegisterPermission", "HasPermission", "GrantPermission", "RevokePermission", "GetPlayerPermissions", "DeletePermission", "ReloadPermissionRegistry"]
                },
                {
                    title: "Exports — Actions groupées",
                    items: ["GrantPermissions", "RevokePermissions"]
                },
                {
                    title: "Exports — Presets",
                    items: ["GetPresets", "GetPresetPermissions", "SavePreset", "ApplyPreset", "RemovePreset", "DeletePreset"]
                },
                {
                    title: "Exports — Joueurs",
                    items: ["GetIdentifier", "GetDiscordId", "IsAdmin"]
                },
                {
                    title: "Exports client",
                    items: ["HasPermissionUI", "RequestPermissionCheck"]
                },
                {
                    title: "Référence",
                    items: ["events", "commands", "database", "web-api"]
                },
                {
                    title: "Guides",
                    items: ["integration-guide", "security", "troubleshooting"]
                }
            ],

            sections: {

                // ══════════════════════════════════════════════════════
                //  DÉMARRAGE
                // ══════════════════════════════════════════════════════

                introduction: {
                    title: "Introduction",
                    description: "lumen-grant est un système de gestion des permissions standalone et sécurisé pour FiveM. N'importe quelle ressource peut déclarer, vérifier, accorder ou révoquer des permissions par joueur. Les données sont persistées en MySQL via oxmysql. L'administration se fait depuis un panel web (Discord OAuth2), un panel NUI in-game, ou la console serveur.",
                    features: [
                        { icon: "🔒", title: "100% sécurisé côté serveur", desc: "Toutes les vérifications sont serveur-side. Le client ne peut jamais se déclarer lui-même autorisé." },
                        { icon: "📦", title: "Presets de permissions",     desc: "Regroupez plusieurs permissions sous un nom et appliquez-les à un joueur en un clic, au lieu de les cocher une par une." },
                        { icon: "☑️", title: "Sélection multiple",         desc: "Accordez ou révoquez plusieurs permissions d'un coup, avec recherche et sélection par ressource entière." },
                        { icon: "⚡", title: "Cache serveur (30s TTL)",     desc: "Les vérifications fréquentes sont mises en cache. Le cache est invalidé immédiatement après un grant/revoke." },
                        { icon: "🌐", title: "Panel web Discord OAuth2",   desc: "Interface d'administration accessible depuis n'importe quel navigateur, protégée par Discord OAuth2." },
                        { icon: "🎮", title: "Panel NUI in-game",          desc: "Même interface directement en jeu via /lumen-panel, réservée aux super-admins." },
                        { icon: "👤", title: "Pseudos mémorisés",          desc: "Le pseudo de chaque joueur est stocké et affiché dans les panels, même lorsqu'il est hors ligne." },
                        { icon: "🔄", title: "Synchronisation centralisée", desc: "Chaque action redessine l'ensemble de l'interface et pousse les permissions à jour vers le client concerné." },
                        { icon: "⏱️", title: "Permissions temporaires",    desc: "Accordez une permission ou un preset pour N jours. Expiration gérée automatiquement côté serveur." },
                        { icon: "📋", title: "Journal d'audit complet",    desc: "Grant, revoke, presets, suppressions et violations sont enregistrés avec horodatage et auteur." }
                    ],
                    alerts: [
                        { type: "info", title: "Nouveautés v1.2.0", text: "Presets de permissions, sélection multiple, mémorisation des pseudos joueurs, synchronisation centralisée des panels, et hydratation automatique du registre de permissions depuis la base." }
                    ]
                },

                installation: {
                    title: "Installation",
                    requirements: [
                        { name: "FiveM Server",  version: "build récent", required: true },
                        { name: "oxmysql",       version: "latest",       required: true },
                        { name: "MySQL/MariaDB", version: "5.7+",         required: true }
                    ],
                    steps: [
                        {
                            title: "1. Déposer la ressource",
                            description: "Copier le dossier lumen-grant dans votre répertoire de ressources.",
                            code: { lang: "bash", content: `resources/\n└── lumen-grant/\n    ├── fxmanifest.lua\n    ├── sql/\n    │   └── install.sql\n    ├── config_client.lua       ← envoyé aux joueurs\n    ├── config_server.lua       ← secrets, serveur uniquement\n    ├── server/\n    │   ├── database.lua        ← couche DB (oxmysql await)\n    │   ├── permissions.lua     ← logique, presets, actions groupées\n    │   ├── events.lua          ← events sécurisés\n    │   ├── commands.lua        ← commandes admin\n    │   ├── nui_server.lua      ← autorisation d'ouverture du panel\n    │   └── nui_callbacks.lua   ← handlers serveur du panel NUI\n    ├── client/\n    │   ├── main.lua            ← cache UI (non sécurisé)\n    │   └── nui.lua             ← pont NUI\n    ├── nui/\n    │   └── index.html          ← panel in-game\n    └── web/\n        ├── server_web.lua      ← API HTTP + Discord OAuth2\n        └── public/\n            └── index.html      ← panel web` }
                        },
                        {
                            title: "2. Importer la base de données",
                            description: "Exécuter le fichier SQL. Les 7 tables sont également créées automatiquement au démarrage de la ressource, cette étape est donc facultative.",
                            code: { lang: "bash", content: `mysql -u root -p ma_base < resources/lumen-grant/sql/install.sql` }
                        },
                        {
                            title: "3. Déclarer dans server.cfg",
                            description: "lumen-grant DOIT démarrer APRÈS oxmysql et AVANT toute ressource qui l'utilise.",
                            code: { lang: "cfg", content: `ensure oxmysql\nensure lumen-grant\nensure ma-ressource   # après lumen-grant` }
                        },
                        {
                            title: "4. Ajouter votre premier super-admin",
                            description: "Depuis la console serveur uniquement. Nécessite le Discord ID (Paramètres Discord → Avancé → Mode développeur → clic droit sur profil → Copier l'identifiant).",
                            code: { lang: "bash", content: `# Dans la console serveur FiveM\nlumen-grant admin add discord:123456789012345678 MonPseudo\nlumen-grant admin list` }
                        },
                        {
                            title: "5. Ouvrir un panel",
                            description: "Le panel NUI s'ouvre en jeu avec /lumen-panel. Le panel web est accessible à l'adresse configurée dans Config.Web.RedirectUri (sans /auth/callback).",
                            code: { lang: "bash", content: `# En jeu (super-admin uniquement)\n/lumen-panel\n\n# Navigateur\nhttp://VOTRE_IP:VOTRE_PORT/lumen-grant/` }
                        }
                    ],
                    alerts: [
                        { type: "danger",  title: "oxmysql requis",     text: "lumen-grant dépend de oxmysql. Assurez-vous qu'il est installé et démarré en premier dans server.cfg." },
                        { type: "warning", title: "Ordre de démarrage", text: "lumen-grant doit démarrer AVANT les ressources qui l'utilisent, sinon les exports seront nil à leur chargement." },
                        { type: "info",    title: "Panel web optionnel", text: "Si vous n'utilisez pas le panel web, mettez Config.Web.Enabled = false dans config_server.lua." }
                    ]
                },

                configuration: {
                    title: "Configuration",
                    description: "La configuration est scindée en deux fichiers. config_client.lua est envoyé aux joueurs et ne contient rien de sensible ; config_server.lua reste côté serveur et porte tous les secrets. Les super-admins ne sont dans aucun des deux : ils sont gérés en base via la console serveur.",
                    filePath: "config_server.lua",
                    options: [
                        { name: "Config.Debug",                        type: "boolean", default: "false",    desc: "Active les prints de debug dans la console serveur (grants, presets, pseudos mémorisés, hydratation du registre)." },
                        { name: "Config.Logs.Enabled",                 type: "boolean", default: "true",     desc: "Active l'enregistrement des actions en base." },
                        { name: "Config.Logs.KeepDays",                type: "number",  default: "30",       desc: "Durée de conservation des logs en jours. Nettoyage automatique toutes les 24 h." },
                        { name: "Config.RateLimit.Enabled",            type: "boolean", default: "true",     desc: "Active la limitation du nombre de vérifications par joueur." },
                        { name: "Config.RateLimit.MaxChecksPerSecond", type: "number",  default: "30",       desc: "Nombre maximum de vérifications par seconde et par joueur." },
                        { name: "Config.Cache.TTL",                    type: "number",  default: "30",       desc: "Durée de vie du cache serveur en secondes. Invalidé immédiatement après grant/revoke." },
                        { name: "Config.Web.Enabled",                  type: "boolean", default: "true",     desc: "Active le panel web d'administration." },
                        { name: "Config.Web.DiscordClientId",          type: "string",  default: '""',       desc: "Client ID de votre application Discord OAuth2." },
                        { name: "Config.Web.DiscordClientSecret",      type: "string",  default: '""',       desc: "Client Secret de votre application Discord OAuth2." },
                        { name: "Config.Web.RedirectUri",              type: "string",  default: '""',       desc: "URI de callback OAuth2. Doit correspondre EXACTEMENT à celle déclarée dans Discord Developer." },
                        { name: "Config.Web.SessionTTL",               type: "number",  default: "300",      desc: "Durée de vie des sessions web en secondes." },
                        { name: "Config.NUI.Enabled",                  type: "boolean", default: "true",     desc: "Active le panel NUI in-game." },
                        { name: "Config.NUI.CloseKey",                 type: "string",  default: '"ESCAPE"', desc: "Touche de fermeture du panel NUI." }
                    ],
                    example: {
                        lang: "lua",
                        content: `Config.Debug = false\n\nConfig.Logs = {\n    Enabled  = true,\n    KeepDays = 30\n}\n\nConfig.Cache = { TTL = 30 }\n\nConfig.RateLimit = {\n    Enabled            = true,\n    MaxChecksPerSecond = 30\n}\n\nConfig.Web = {\n    Enabled             = true,\n    DiscordClientId     = '123456789012345678',\n    DiscordClientSecret = 'votre_secret_ici',\n    RedirectUri         = 'http://mon-ip:30120/lumen-grant/auth/callback',\n    SessionTTL          = 300\n}\n\nConfig.NUI = {\n    Enabled  = true,\n    CloseKey = 'ESCAPE'\n}`
                    },
                    alerts: [
                        { type: "warning", title: "Application Discord",   text: "Créez une application sur https://discord.com/developers/applications, puis ajoutez l'URI de callback dans OAuth2 → Redirects AVANT de renseigner Config.Web." },
                        { type: "danger",  title: "Secret en clair",       text: "Config.DiscordClientSecret est stocké en clair dans config_server.lua. Ce fichier ne doit JAMAIS être ajouté à client_scripts ni à files{}. Ne le versionnez pas publiquement et régénérez le secret s'il a fuité." },
                        { type: "info",    title: "Admins hors config",    text: "Les super-admins ne se déclarent dans aucun fichier de config mais en base, via lumen-grant admin add depuis la console serveur." }
                    ]
                },

                migration: {
                    title: "Mise à jour depuis la v1.1.0",
                    description: "La migration ne demande aucune action manuelle sur la base de données.",
                    functions: [
                        {
                            name: "Procédure",
                            syntax: "— guide",
                            description: "Remplacez les fichiers de la ressource et redémarrez-la. Les trois nouvelles tables (presets, liaisons de presets, pseudos joueurs) sont créées automatiquement au démarrage.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Redémarrage",
                                    code: { lang: "bash", content: `# Console serveur\nrefresh\nrestart lumen-grant\n\n# Vérifier que le registre s'est bien hydraté (Config.Debug = true)\n# [lumen-grant] Registre permissions hydraté depuis la DB : 42 permission(s)` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Aucune migration SQL",      text: "Les tables lumen_grant_presets, lumen_grant_preset_permissions et lumen_grant_players sont créées au premier lancement. Vos permissions et assignations existantes sont conservées telles quelles." },
                                { type: "warning", title: "Pseudos rétroactifs",       text: "Les pseudos ne peuvent pas être reconstruits pour le passé. Les joueurs déjà connus apparaissent comme « Pseudo inconnu » jusqu'à leur prochaine connexion." },
                                { type: "info",    title: "Changement de comportement", text: "En v1.1.0, redémarrer lumen-grant seul vidait le registre mémoire et faisait échouer tous les grants. La v1.2.0 hydrate le registre depuis la base au démarrage — voir Dépannage." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  PANELS
                // ══════════════════════════════════════════════════════

                "panel-nui": {
                    title: "Panel NUI in-game",
                    description: "Interface d'administration accessible en jeu via la commande /lumen-panel. Réservée aux super-admins déclarés en base — toute tentative non autorisée est journalisée (UNAUTHORIZED_NUI).",
                    functions: [
                        {
                            name: "Onglets disponibles",
                            syntax: "/lumen-panel",
                            description: "Le panel comporte six onglets. Il se ferme avec la touche configurée dans Config.NUI.CloseKey (ÉCHAP par défaut) — si une modale est ouverte, ÉCHAP ferme d'abord la modale.",
                            parameters: [
                                { name: "Aperçu",      type: "onglet", desc: "Compteurs (joueurs en ligne, assignations, permissions, logs 24 h), liste des joueurs connectés et 10 derniers logs." },
                                { name: "Joueurs",     type: "onglet", desc: "Tous les joueurs possédant au moins une permission, avec pseudo mémorisé et identifiant. Recherche par pseudo, identifiant ou permission." },
                                { name: "Gérer accès", type: "onglet", desc: "Sélection d'un joueur, application/retrait de preset, et panneaux Accorder / Révoquer en sélection multiple." },
                                { name: "Permissions", type: "onglet", desc: "Toutes les permissions déclarées, groupées en dossiers repliables par ressource propriétaire, avec suppression." },
                                { name: "Presets",     type: "onglet", desc: "Création, modification, suppression et application des groupes de permissions." },
                                { name: "Journaux",    type: "onglet", desc: "Journal d'audit filtrable par type d'action." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Ouvrir le panel",
                                    code: { lang: "lua", content: `-- En jeu\n/lumen-panel\n\n-- Assigner une touche (facultatif, dans votre propre ressource)\nRegisterKeyMapping('lumen-panel', 'Ouvrir le panel permissions', 'keyboard', 'F7')` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Accès super-admin",  text: "L'ouverture du panel est validée côté serveur. Un joueur non-admin qui déclenche l'event ne reçoit rien et l'incident est enregistré dans les logs." },
                                { type: "info",    title: "Retrait d'admin",    text: "Retirer un super-admin via la console ferme immédiatement son panel NUI s'il est connecté et invalide ses sessions web." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "panel-web": {
                    title: "Panel web",
                    description: "Interface d'administration accessible depuis un navigateur, protégée par Discord OAuth2. Elle expose exactement les mêmes fonctionnalités que le panel NUI.",
                    functions: [
                        {
                            name: "Accès et authentification",
                            syntax: "http://VOTRE_IP:VOTRE_PORT/lumen-grant/",
                            description: "Le joueur se connecte avec Discord. Son Discord ID est comparé à la table des super-admins. Les connexions réussies et échouées sont journalisées (WEB_LOGIN, WEB_LOGIN_FAIL).",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Configuration Discord Developer",
                                    code: { lang: "bash", content: `# 1. https://discord.com/developers/applications → New Application\n# 2. Onglet OAuth2 → Redirects → ajouter EXACTEMENT :\nhttp://VOTRE_IP:VOTRE_PORT/lumen-grant/auth/callback\n\n# 3. Copier Client ID et Client Secret dans config_server.lua\n# 4. Le panel est ensuite accessible sur :\nhttp://VOTRE_IP:VOTRE_PORT/lumen-grant/` }
                                }
                            ],
                            alerts: [
                                { type: "danger",  title: "URI exacte",        text: "RedirectUri doit correspondre au caractère près à ce qui est déclaré dans Discord Developer, port compris. La moindre différence provoque un échec d'authentification." },
                                { type: "warning", title: "Durée de session",  text: "Config.Web.SessionTTL vaut 300 secondes par défaut, ce qui est volontairement court. Augmentez cette valeur si vous trouvez les reconnexions trop fréquentes." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "presets-guide": {
                    title: "Presets — groupes de permissions",
                    description: "Un preset regroupe plusieurs permissions sous un seul nom. Au lieu de cocher les permissions une par une pour chaque joueur, vous appliquez le preset entier en un clic. La création et l'édition se font dans l'onglet « Presets » des deux panels.",
                    functions: [
                        {
                            name: "Créer un preset",
                            syntax: "Onglet Presets → ＋ Nouveau preset",
                            description: "Renseignez un nom, une description facultative, une couleur, puis cochez les permissions à inclure via le sélecteur multiple. Le nom accepte les accents (2 à 64 caractères) ; les guillemets et antislashs sont refusés.",
                            parameters: [
                                { name: "Nom",         type: "string", required: true,  desc: "2 à 64 caractères. Accents autorisés. Doit être unique." },
                                { name: "Description", type: "string", required: false, desc: "Jusqu'à 255 caractères, affichée sur la carte du preset." },
                                { name: "Couleur",     type: "string", required: false, desc: "purple (défaut), green, blue, orange ou red." },
                                { name: "Permissions", type: "table",  required: true,  desc: "Jusqu'à 200 permissions. Seules celles existant en base sont conservées." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Appliquer / retirer depuis l'onglet Gérer accès",
                                    code: { lang: "bash", content: `1. Sélectionner le joueur (en ligne, connu, ou identifiant collé)\n2. Choisir le preset dans la liste déroulante\n3. Optionnel : définir une date d'expiration\n4. ＋ Appliquer   → accorde toutes les permissions du preset\n   － Retirer      → révoque toutes les permissions du preset` }
                                },
                                {
                                    title: "Depuis la console serveur",
                                    code: { lang: "bash", content: `lumen-grant preset list\nlumen-grant preset apply  3 "Staff Modérateur"\nlumen-grant preset apply  3 "Staff Modérateur" 30   # expire dans 30 jours\nlumen-grant preset remove 3 "Staff Modérateur"\nlumen-grant preset delete "Staff Modérateur"` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Retirer un preset révoque tout",   text: "Le retrait révoque TOUTES les permissions du preset, y compris celles qui avaient été accordées séparément au joueur avant l'application du preset." },
                                { type: "info",    title: "Supprimer ≠ retirer",              text: "Supprimer un preset ne retire rien aux joueurs : les permissions déjà accordées restent en place, seul le groupe disparaît." },
                                { type: "info",    title: "Permissions inconnues ignorées",   text: "À l'enregistrement, seules les permissions existant réellement en base sont conservées. La validation se fait contre la DB et non contre le registre mémoire, afin qu'un preset ne perde pas ses permissions quand la ressource propriétaire est arrêtée." },
                                { type: "info",    title: "Compteur de porteurs",             text: "Chaque carte affiche le nombre de joueurs possédant l'INTÉGRALITÉ du preset. Un joueur ayant 4 permissions sur 5 n'est pas compté." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "multi-selection": {
                    title: "Sélection multiple",
                    description: "Les panneaux Accorder et Révoquer utilisent un sélecteur à cases à cocher qui remplace les anciennes listes déroulantes à choix unique. Il permet de traiter plusieurs permissions en une seule opération.",
                    functions: [
                        {
                            name: "Fonctionnement du sélecteur",
                            syntax: "Onglet Gérer accès",
                            description: "Les permissions sont groupées par ressource propriétaire. Un clic sur l'en-tête d'un groupe coche ou décoche toute la ressource. Le compteur indique le nombre d'éléments sélectionnés.",
                            parameters: [
                                { name: "Recherche",     type: "champ",  desc: "Filtre sur le nom, la ressource ou la description." },
                                { name: "Tout / Aucun",  type: "bouton", desc: "S'applique uniquement aux éléments actuellement visibles, donc au résultat du filtre en cours." },
                                { name: "En-tête groupe",type: "clic",   desc: "Coche ou décoche toutes les permissions de la ressource." },
                                { name: "Compteur",      type: "info",   desc: "Nombre de permissions cochées." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Comportement des listes",
                                    code: { lang: "bash", content: `Panneau « Accorder »  → uniquement les permissions que le joueur N'A PAS\nPanneau « Révoquer »  → uniquement les permissions que le joueur POSSÈDE\n\nAprès un grant réussi, la permission bascule automatiquement\nd'un panneau à l'autre et est décochée.` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "État préservé",  text: "Les recherches en cours, la position de défilement et les permissions cochées survivent aux rafraîchissements automatiques. Seules les permissions qui ont réellement disparu de la liste sont décochées." },
                                { type: "warning", title: "Limite par appel", text: "Une opération groupée est plafonnée à 100 permissions. Au-delà, l'appel est rejeté sans rien modifier." }
                            ]
                        }
                    ],
                    alerts: []
                },

                sync: {
                    title: "Synchronisation des panels",
                    description: "Les deux panels partagent une fonction interne unique appelée après chaque action : accorder, révoquer, appliquer ou retirer un preset, créer/modifier/supprimer un preset, supprimer une permission.",
                    functions: [
                        {
                            name: "Ce qui est rafraîchi",
                            syntax: "— comportement interne",
                            description: "L'état serveur est rechargé une seule fois, puis toutes les vues visibles sont redessinées : compteurs, table joueurs, dossiers de permissions, presets, listes de la page Gérer accès, modale ouverte et journaux. Les appels concurrents sont ignorés pour éviter les rechargements en cascade.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "État conservé pendant un rafraîchissement",
                                    code: { lang: "bash", content: `✔ Recherches en cours\n✔ Dossiers de ressources repliés\n✔ Position de défilement des listes\n✔ Sélection des menus déroulants\n✔ Permissions cochées encore valides` }
                                },
                                {
                                    title: "Propagation vers le client concerné",
                                    code: { lang: "lua", content: `-- Quand un admin modifie les permissions d'un joueur connecté,\n-- la liste à jour lui est poussée automatiquement :\nAddEventHandler('lumen-grant:permissionsLoaded', function(perms)\n    -- déclenché aussi bien au spawn qu'après une action admin\n    RefreshMyUI(perms)\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Rafraîchissement automatique", text: "Un cycle tourne toutes les 20 secondes pendant que le panel est ouvert. Il est SAUTÉ si une modale est ouverte ou si des permissions sont cochées, pour ne pas rafraîchir sous les doigts de l'utilisateur." },
                                { type: "info",    title: "Envois regroupés",             text: "Les actions groupées et les presets déclenchent un seul envoi vers le client concerné, grâce à une fenêtre de regroupement de 250 ms." },
                                { type: "warning", title: "Entre deux admins",            text: "Si deux administrateurs travaillent simultanément, la propagation d'un panel à l'autre dépend du cycle de 20 secondes. Il n'y a pas de push serveur → panels ouverts." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  EXPORTS — PERMISSIONS
                // ══════════════════════════════════════════════════════

                RegisterPermission: {
                    title: "RegisterPermission()",
                    description: "Déclare une permission dans le système. À appeler au démarrage de votre ressource. Une permission doit être enregistrée avant de pouvoir être accordée.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:RegisterPermission",
                            syntax: "exports['lumen-grant']:RegisterPermission(name, description, resourceOwner)",
                            description: "",
                            parameters: [
                                { name: "name",          type: "string", required: true,  desc: "Nom unique. Lettres, chiffres, points, tirets, underscores. 3 à 128 caractères. Ex : \"elevator.create\"." },
                                { name: "description",   type: "string", required: false, desc: "Description lisible affichée dans les panels." },
                                { name: "resourceOwner", type: "string", required: false, desc: "Ressource propriétaire. Détectée via GetInvokingResource() si absente." }
                            ],
                            returns: "boolean — true si enregistrée.",
                            examples: [
                                {
                                    title: "Enregistrement au démarrage (recommandé)",
                                    code: { lang: "lua", content: `-- server.lua de votre ressource\nCreateThread(function()\n    Wait(500) -- laisser lumen-grant démarrer\n    local perm = exports['lumen-grant']\n    perm:RegisterPermission('elevator.create', 'Créer un ascenseur',    GetCurrentResourceName())\n    perm:RegisterPermission('elevator.edit',   'Modifier un ascenseur', GetCurrentResourceName())\n    perm:RegisterPermission('elevator.delete', 'Supprimer un ascenseur',GetCurrentResourceName())\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Enregistrement idempotent", text: "Réenregistrer une permission existante met simplement à jour sa description et sa ressource propriétaire. Les assignations joueurs ne sont pas affectées." }
                            ]
                        }
                    ],
                    alerts: []
                },

                HasPermission: {
                    title: "HasPermission()",
                    description: "Vérifie si un joueur possède une permission. Utilise le cache serveur (TTL 30 s) pour éviter les requêtes DB répétées. C'est LA fonction à appeler avant toute action sensible.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:HasPermission",
                            syntax: "local hasIt = exports['lumen-grant']:HasPermission(identifier, permissionName)",
                            description: "",
                            parameters: [
                                { name: "identifier",     type: "string", required: true, desc: "Identifiant du joueur (license:xxx ou discord:xxx), obtenu via GetIdentifier()." },
                                { name: "permissionName", type: "string", required: true, desc: "Nom de la permission à vérifier." }
                            ],
                            returns: "boolean — true si le joueur possède la permission et qu'elle n'est pas expirée.",
                            examples: [
                                {
                                    title: "Vérification serveur avant action",
                                    code: { lang: "lua", content: `RegisterNetEvent('elevator:server:create')\nAddEventHandler('elevator:server:create', function(data)\n    local src        = source\n    local identifier = exports['lumen-grant']:GetIdentifier(src)\n\n    -- Toujours vérifier côté serveur\n    if not exports['lumen-grant']:HasPermission(identifier, 'elevator.create') then\n        TriggerClientEvent('elevator:client:denied', src, 'Permission refusée')\n        return\n    end\n\n    CreateElevator(data)\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "danger", title: "Serveur uniquement", text: "Ne jamais se fier au cache client (HasPermissionUI) pour autoriser une action. Toujours appeler HasPermission() côté serveur." }
                            ]
                        }
                    ],
                    alerts: []
                },

                GrantPermission: {
                    title: "GrantPermission()",
                    description: "Accorde une permission à un joueur, de façon permanente ou temporaire. Invalide le cache serveur et pousse la liste à jour au client concerné s'il est connecté.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GrantPermission",
                            syntax: "local ok, err = exports['lumen-grant']:GrantPermission(identifier, permissionName, grantedBy, expiresAt)",
                            description: "",
                            parameters: [
                                { name: "identifier",     type: "string",       required: true,  desc: "Identifiant cible." },
                                { name: "permissionName", type: "string",       required: true,  desc: "Nom de la permission." },
                                { name: "grantedBy",      type: "string",       required: false, desc: "Auteur de l'action. Défaut : 'system'." },
                                { name: "expiresAt",      type: "string | nil", required: false, desc: "Date SQL 'YYYY-MM-DD HH:MM:SS'. nil = permanent." }
                            ],
                            returns: "boolean, string? — true si succès, sinon false + message d'erreur.",
                            examples: [
                                {
                                    title: "Permanent et temporaire",
                                    code: { lang: "lua", content: `local perm = exports['lumen-grant']\nlocal identifier = perm:GetIdentifier(source)\n\n-- Permanent\nlocal ok, err = perm:GrantPermission(identifier, 'elevator.create', 'system', nil)\nif not ok then print('Erreur:', err) end\n\n-- Temporaire : 30 jours\nlocal expiresAt = os.date('%Y-%m-%d %H:%M:%S', os.time() + 30 * 86400)\nperm:GrantPermission(identifier, 'elevator.edit', 'system', expiresAt)` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Permission non déclarée", text: "Le grant échoue si la permission n'existe pas dans le registre. Depuis la v1.2.0, si le registre est vide (redémarrage isolé de lumen-grant) il est automatiquement réhydraté depuis la base avant de renvoyer une erreur." }
                            ]
                        }
                    ],
                    alerts: []
                },

                RevokePermission: {
                    title: "RevokePermission()",
                    description: "Révoque une permission d'un joueur. Invalide le cache serveur, pousse la liste à jour au client concerné, et journalise l'action.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:RevokePermission",
                            syntax: "local ok = exports['lumen-grant']:RevokePermission(identifier, permissionName, revokedBy)",
                            description: "",
                            parameters: [
                                { name: "identifier",     type: "string", required: true,  desc: "Identifiant cible." },
                                { name: "permissionName", type: "string", required: true,  desc: "Permission à révoquer." },
                                { name: "revokedBy",      type: "string", required: false, desc: "Auteur de l'action. Défaut : 'system'." }
                            ],
                            returns: "boolean — true si révoquée, false si le joueur ne la possédait pas.",
                            examples: [
                                { code: { lang: "lua", content: `local ok = exports['lumen-grant']:RevokePermission(\n    'license:abc123',\n    'elevator.create',\n    'system'\n)` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                GetPlayerPermissions: {
                    title: "GetPlayerPermissions()",
                    description: "Retourne toutes les permissions actives d'un joueur. Les permissions expirées sont exclues.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GetPlayerPermissions",
                            syntax: "local perms = exports['lumen-grant']:GetPlayerPermissions(identifier)",
                            description: "",
                            parameters: [
                                { name: "identifier", type: "string", required: true, desc: "Identifiant du joueur." }
                            ],
                            returns: "table — tableau d'objets { permission_name, granted_by, granted_at, expires_at }.",
                            examples: [
                                { code: { lang: "lua", content: `local perms = exports['lumen-grant']:GetPlayerPermissions('license:abc123')\nfor _, p in ipairs(perms) do\n    print(p.permission_name, p.granted_by, p.expires_at or 'permanent')\nend` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                DeletePermission: {
                    title: "DeletePermission()",
                    description: "Supprime définitivement une permission, toutes ses assignations joueurs et ses liaisons dans les presets. Invalide tout le cache serveur et repousse la liste à jour à chaque joueur connecté.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:DeletePermission",
                            syntax: "local ok, removed = exports['lumen-grant']:DeletePermission(permName)",
                            description: "",
                            parameters: [
                                { name: "permName", type: "string", required: true, desc: "Nom de la permission à supprimer." }
                            ],
                            returns: "boolean, number — true + nombre d'assignations supprimées.",
                            examples: [
                                { code: { lang: "lua", content: `local ok, removed = exports['lumen-grant']:DeletePermission('old-resource.action')\nif ok then\n    print(removed .. ' assignation(s) supprimée(s)')\nend` } }
                            ],
                            alerts: [
                                { type: "danger", title: "Action irréversible", text: "La permission, toutes les assignations joueurs ET les liaisons dans les presets sont supprimées. Utilisez RevokePermission pour retirer la permission à un seul joueur." }
                            ]
                        }
                    ],
                    alerts: []
                },

                ReloadPermissionRegistry: {
                    title: "ReloadPermissionRegistry()",
                    description: "Recharge le registre mémoire des permissions depuis la base. Appelé automatiquement au démarrage de la ressource et lorsqu'un grant rencontre un registre vide.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:ReloadPermissionRegistry",
                            syntax: "local count = exports['lumen-grant']:ReloadPermissionRegistry()",
                            description: "",
                            parameters: [],
                            returns: "number — nombre de permissions chargées.",
                            examples: [
                                {
                                    title: "Rechargement manuel",
                                    code: { lang: "lua", content: `local n = exports['lumen-grant']:ReloadPermissionRegistry()\nprint(n .. ' permission(s) dans le registre')` }
                                },
                                {
                                    title: "Depuis la console",
                                    code: { lang: "bash", content: `lumen-grant reload   # recharge aussi le cache des super-admins` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Pourquoi c'est nécessaire", text: "Le registre est normalement alimenté par les appels RegisterPermission des autres ressources, qui n'ont lieu qu'à LEUR démarrage. Sans hydratation depuis la base, redémarrer lumen-grant seul le laisserait vide et ferait échouer tous les grants." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  EXPORTS — ACTIONS GROUPÉES
                // ══════════════════════════════════════════════════════

                GrantPermissions: {
                    title: "GrantPermissions()",
                    description: "Accorde plusieurs permissions en une seule opération. Les doublons sont ignorés et chaque permission est traitée indépendamment : un échec n'interrompt pas les suivantes.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GrantPermissions",
                            syntax: "local granted, failed = exports['lumen-grant']:GrantPermissions(identifier, permissionNames, grantedBy, expiresAt)",
                            description: "",
                            parameters: [
                                { name: "identifier",      type: "string",       required: true,  desc: "Identifiant cible." },
                                { name: "permissionNames", type: "table",        required: true,  desc: "Tableau de noms de permissions. Maximum 100." },
                                { name: "grantedBy",       type: "string",       required: false, desc: "Auteur de l'action. Défaut : 'system'." },
                                { name: "expiresAt",       type: "string | nil", required: false, desc: "Date SQL appliquée à TOUTES les permissions. nil = permanent." }
                            ],
                            returns: "number, table — nombre accordé, puis tableau des échecs { name, error }.",
                            examples: [
                                {
                                    code: { lang: "lua", content: `local granted, failed = exports['lumen-grant']:GrantPermissions(\n    'license:abc123',\n    { 'elevator.create', 'elevator.edit', 'elevator.delete' },\n    'system',\n    nil\n)\n\nprint(granted .. ' accordée(s), ' .. #failed .. ' échec(s)')\nfor _, f in ipairs(failed) do\n    print('  ✘ ' .. f.name .. ' : ' .. f.error)\nend` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Limite de 100",   text: "Au-delà de 100 permissions, l'appel est rejeté en bloc et rien n'est accordé." },
                                { type: "info",    title: "Un seul push client", text: "Même avec 50 permissions accordées, un seul message de rafraîchissement est envoyé au client concerné (fenêtre de regroupement de 250 ms)." }
                            ]
                        }
                    ],
                    alerts: []
                },

                RevokePermissions: {
                    title: "RevokePermissions()",
                    description: "Révoque plusieurs permissions en une seule opération. Même comportement que GrantPermissions : doublons ignorés, échecs isolés.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:RevokePermissions",
                            syntax: "local revoked, failed = exports['lumen-grant']:RevokePermissions(identifier, permissionNames, revokedBy)",
                            description: "",
                            parameters: [
                                { name: "identifier",      type: "string", required: true,  desc: "Identifiant cible." },
                                { name: "permissionNames", type: "table",  required: true,  desc: "Tableau de noms de permissions. Maximum 100." },
                                { name: "revokedBy",       type: "string", required: false, desc: "Auteur de l'action. Défaut : 'system'." }
                            ],
                            returns: "number, table — nombre révoqué, puis tableau des échecs { name, error }.",
                            examples: [
                                {
                                    code: { lang: "lua", content: `local revoked, failed = exports['lumen-grant']:RevokePermissions(\n    'license:abc123',\n    { 'elevator.create', 'elevator.edit' },\n    'system'\n)\nprint(revoked .. ' révoquée(s)')` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Permissions absentes", text: "Une permission que le joueur ne possède pas est comptée comme un échec, pas comme une erreur bloquante." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  EXPORTS — PRESETS
                // ══════════════════════════════════════════════════════

                GetPresets: {
                    title: "GetPresets()",
                    description: "Retourne tous les presets avec leurs permissions et le nombre de joueurs les possédant intégralement.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GetPresets",
                            syntax: "local presets = exports['lumen-grant']:GetPresets()",
                            description: "",
                            parameters: [],
                            returns: "table — tableau de { name, description, color, permissions, holders, created_by, created_at, updated_at }.",
                            examples: [
                                {
                                    code: { lang: "lua", content: `for _, p in ipairs(exports['lumen-grant']:GetPresets()) do\n    print(p.name, #p.permissions .. ' perms', p.holders .. ' joueur(s)')\n    for _, permName in ipairs(p.permissions) do\n        print('   ▸ ' .. permName)\n    end\nend` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Champ holders", text: "holders compte les joueurs possédant TOUTES les permissions du preset. Un joueur ayant 4 permissions sur 5 n'est pas compté." }
                            ]
                        }
                    ],
                    alerts: []
                },

                GetPresetPermissions: {
                    title: "GetPresetPermissions()",
                    description: "Retourne la liste des noms de permissions d'un preset.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GetPresetPermissions",
                            syntax: "local perms = exports['lumen-grant']:GetPresetPermissions(presetName)",
                            description: "",
                            parameters: [
                                { name: "presetName", type: "string", required: true, desc: "Nom du preset." }
                            ],
                            returns: "table — tableau de strings. Vide si le preset n'existe pas.",
                            examples: [
                                { code: { lang: "lua", content: `local perms = exports['lumen-grant']:GetPresetPermissions('Staff Modérateur')\nprint(#perms .. ' permission(s) dans ce preset')` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                SavePreset: {
                    title: "SavePreset()",
                    description: "Crée un preset ou met à jour un preset existant. Permet également de le renommer en passant son nom d'origine.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:SavePreset",
                            syntax: "local ok, err, count = exports['lumen-grant']:SavePreset(name, description, color, permissions, savedBy, originalName)",
                            description: "",
                            parameters: [
                                { name: "name",         type: "string", required: true,  desc: "Nom du preset. 2 à 64 caractères, accents autorisés, guillemets et antislashs interdits." },
                                { name: "description",  type: "string", required: false, desc: "Description, jusqu'à 255 caractères." },
                                { name: "color",        type: "string", required: false, desc: "purple (défaut), green, blue, orange ou red." },
                                { name: "permissions",  type: "table",  required: true,  desc: "Tableau de noms de permissions. Maximum 200." },
                                { name: "savedBy",      type: "string", required: false, desc: "Auteur. Défaut : 'system'." },
                                { name: "originalName", type: "string", required: false, desc: "Nom actuel du preset lors d'un renommage. Laisser vide ou nil pour une création ou une simple mise à jour." }
                            ],
                            returns: "boolean, string?, number — succès, message d'erreur, nombre de permissions réellement enregistrées.",
                            examples: [
                                {
                                    title: "Création",
                                    code: { lang: "lua", content: `local ok, err, count = exports['lumen-grant']:SavePreset(\n    'Staff Modérateur',\n    'Accès modération de base',\n    'blue',\n    { 'elevator.create', 'elevator.edit' },\n    'system',\n    nil\n)\nif ok then print(count .. ' permission(s) enregistrée(s)') else print(err) end` }
                                },
                                {
                                    title: "Renommage",
                                    code: { lang: "lua", content: `-- Renomme "Staff" en "Staff Modérateur" et remplace ses permissions\nexports['lumen-grant']:SavePreset(\n    'Staff Modérateur', 'Accès modération', 'blue',\n    { 'elevator.create' }, 'system',\n    'Staff'                     -- nom d'origine\n)` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Remplacement complet",       text: "Les permissions du preset sont entièrement remplacées à chaque appel. Pour ajouter une permission, récupérez d'abord la liste existante avec GetPresetPermissions() puis ajoutez-y votre entrée." },
                                { type: "info",    title: "Validation contre la base",  text: "Seules les permissions existant réellement en base sont conservées. La vérification se fait contre la DB et non contre le registre mémoire, pour qu'un preset ne perde pas ses permissions lorsque la ressource propriétaire est arrêtée." }
                            ]
                        }
                    ],
                    alerts: []
                },

                ApplyPreset: {
                    title: "ApplyPreset()",
                    description: "Accorde à un joueur toutes les permissions d'un preset, en une seule opération.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:ApplyPreset",
                            syntax: "local ok, err, granted, total, failed = exports['lumen-grant']:ApplyPreset(identifier, presetName, grantedBy, expiresAt)",
                            description: "",
                            parameters: [
                                { name: "identifier", type: "string",       required: true,  desc: "Identifiant cible." },
                                { name: "presetName", type: "string",       required: true,  desc: "Nom du preset à appliquer." },
                                { name: "grantedBy",  type: "string",       required: false, desc: "Auteur. Défaut : 'system'." },
                                { name: "expiresAt",  type: "string | nil", required: false, desc: "Date SQL appliquée à toutes les permissions du preset. nil = permanent." }
                            ],
                            returns: "boolean, string?, number, number, table — succès, erreur, nombre accordé, total du preset, échecs détaillés.",
                            examples: [
                                {
                                    code: { lang: "lua", content: `local ok, err, granted, total = exports['lumen-grant']:ApplyPreset(\n    'license:abc123', 'Staff Modérateur', 'system', nil\n)\n\nif ok then\n    print(('Preset appliqué : %d/%d permission(s)'):format(granted, total))\nelse\n    print('Échec : ' .. err)\nend` }
                                },
                                {
                                    title: "Preset temporaire (7 jours)",
                                    code: { lang: "lua", content: `local expiresAt = os.date('%Y-%m-%d %H:%M:%S', os.time() + 7 * 86400)\nexports['lumen-grant']:ApplyPreset('license:abc123', 'Essai VIP', 'system', expiresAt)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Échec honnête", text: "Si aucune permission n'a pu être accordée, l'export renvoie false avec la raison du premier échec, plutôt qu'un faux succès." }
                            ]
                        }
                    ],
                    alerts: []
                },

                RemovePreset: {
                    title: "RemovePreset()",
                    description: "Révoque chez un joueur toutes les permissions contenues dans un preset.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:RemovePreset",
                            syntax: "local ok, err, revoked, total, failed = exports['lumen-grant']:RemovePreset(identifier, presetName, revokedBy)",
                            description: "",
                            parameters: [
                                { name: "identifier", type: "string", required: true,  desc: "Identifiant cible." },
                                { name: "presetName", type: "string", required: true,  desc: "Nom du preset à retirer." },
                                { name: "revokedBy",  type: "string", required: false, desc: "Auteur. Défaut : 'system'." }
                            ],
                            returns: "boolean, string?, number, number, table — succès, erreur, nombre révoqué, total du preset, échecs détaillés.",
                            examples: [
                                {
                                    code: { lang: "lua", content: `local ok, err, revoked, total = exports['lumen-grant']:RemovePreset(\n    'license:abc123', 'Staff Modérateur', 'system'\n)\nprint(('%d/%d permission(s) retirée(s)'):format(revoked, total))` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Révocation totale", text: "TOUTES les permissions du preset sont révoquées, y compris celles qui avaient été accordées séparément au joueur avant l'application du preset. Il n'existe pas de traçabilité de l'origine d'une assignation." }
                            ]
                        }
                    ],
                    alerts: []
                },

                DeletePreset: {
                    title: "DeletePreset()",
                    description: "Supprime un preset et ses liaisons. Les permissions déjà accordées aux joueurs ne sont PAS retirées.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:DeletePreset",
                            syntax: "local ok, err = exports['lumen-grant']:DeletePreset(presetName, deletedBy)",
                            description: "",
                            parameters: [
                                { name: "presetName", type: "string", required: true,  desc: "Nom du preset à supprimer." },
                                { name: "deletedBy",  type: "string", required: false, desc: "Auteur. Défaut : 'system'." }
                            ],
                            returns: "boolean, string? — true si supprimé, sinon false + message.",
                            examples: [
                                { code: { lang: "lua", content: `local ok = exports['lumen-grant']:DeletePreset('Staff Modérateur', 'system')` } }
                            ],
                            alerts: [
                                { type: "info", title: "Sans effet sur les joueurs", text: "Supprimer un preset ne change rien aux permissions des joueurs. Pour retirer les accès, utilisez RemovePreset() sur chaque joueur AVANT de supprimer le preset." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  EXPORTS — JOUEURS
                // ══════════════════════════════════════════════════════

                GetIdentifier: {
                    title: "GetIdentifier()",
                    description: "Retourne l'identifiant principal d'un joueur côté serveur (priorité : license puis discord).",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GetIdentifier",
                            syntax: "local identifier = exports['lumen-grant']:GetIdentifier(source)",
                            description: "",
                            parameters: [
                                { name: "source", type: "number", required: true, desc: "Server ID du joueur." }
                            ],
                            returns: "string | nil — 'license:xxx' ou 'discord:xxx', nil si joueur invalide.",
                            examples: [
                                { code: { lang: "lua", content: `RegisterNetEvent('myResource:doAction')\nAddEventHandler('myResource:doAction', function()\n    local src        = source\n    local identifier = exports['lumen-grant']:GetIdentifier(src)\n    if exports['lumen-grant']:HasPermission(identifier, 'myResource.action') then\n        -- autorisé\n    end\nend)` } }
                            ],
                            alerts: [
                                { type: "danger", title: "Toujours côté serveur", text: "GetIdentifier s'appuie sur GetPlayerIdentifiers(), disponible uniquement côté serveur. N'acceptez jamais un identifiant envoyé par le client." }
                            ]
                        }
                    ],
                    alerts: []
                },

                GetDiscordId: {
                    title: "GetDiscordId()",
                    description: "Retourne le Discord ID d'un joueur connecté, au format 'discord:XXXXXXXXXXXXXXXXXX'.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:GetDiscordId",
                            syntax: "local discordId = exports['lumen-grant']:GetDiscordId(source)",
                            description: "",
                            parameters: [
                                { name: "source", type: "number", required: true, desc: "Server ID du joueur." }
                            ],
                            returns: "string | nil — nil si le joueur n'est pas connecté via Discord.",
                            examples: [
                                { code: { lang: "lua", content: `local discordId = exports['lumen-grant']:GetDiscordId(source)\nif discordId then print('Discord ID:', discordId) end` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                IsAdmin: {
                    title: "IsAdmin()",
                    description: "Vérifie si un joueur est super-admin lumen-grant. Accepte un server ID ou un Discord ID.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:IsAdmin",
                            syntax: "local isAdmin = exports['lumen-grant']:IsAdmin(source)",
                            description: "",
                            parameters: [
                                { name: "source", type: "number | string", required: true, desc: "Server ID (number) ou Discord ID (string 'discord:xxx')." }
                            ],
                            returns: "boolean — true si super-admin.",
                            examples: [
                                { code: { lang: "lua", content: `-- Via server ID\nif exports['lumen-grant']:IsAdmin(source) then\n    -- admin\nend\n\n-- Via Discord ID\nif exports['lumen-grant']:IsAdmin('discord:123456789012345678') then\n    -- admin\nend` } }
                            ],
                            alerts: [
                                { type: "info", title: "Super-admin ≠ permission", text: "Être super-admin donne accès aux panels d'administration, pas aux permissions déclarées par vos ressources. Ce sont deux notions distinctes." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  EXPORTS CLIENT
                // ══════════════════════════════════════════════════════

                HasPermissionUI: {
                    title: "HasPermissionUI()",
                    description: "Vérifie localement si le joueur possède une permission, via le cache client. Réservé à l'affichage — jamais à l'autorisation.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:HasPermissionUI",
                            syntax: "local hasIt = exports['lumen-grant']:HasPermissionUI(permName)",
                            description: "",
                            parameters: [
                                { name: "permName", type: "string", required: true, desc: "Nom de la permission." }
                            ],
                            returns: "boolean — true si la permission est dans le cache client.",
                            examples: [
                                {
                                    title: "Afficher ou masquer un bouton",
                                    code: { lang: "lua", content: `AddEventHandler('lumen-grant:permissionsLoaded', function(perms)\n    local canCreate = exports['lumen-grant']:HasPermissionUI('elevator.create')\n    ShowCreateButton(canCreate)\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "danger", title: "Non sécurisé",        text: "Le cache local peut être modifié par un joueur malveillant. Ne l'utilisez JAMAIS pour valider une action — toujours HasPermission() côté serveur." },
                                { type: "info",   title: "Cache tenu à jour",   text: "Depuis la v1.2.0, le cache est poussé automatiquement quand un admin modifie vos permissions. L'event permissionsLoaded se déclenche alors à nouveau." }
                            ]
                        }
                    ],
                    alerts: []
                },

                RequestPermissionCheck: {
                    title: "RequestPermissionCheck()",
                    description: "Demande au serveur de vérifier une permission. La réponse arrive via l'event 'lumen-grant:permissionChecked'.",
                    functions: [
                        {
                            name: "exports['lumen-grant']:RequestPermissionCheck",
                            syntax: "exports['lumen-grant']:RequestPermissionCheck(permName)",
                            description: "",
                            parameters: [
                                { name: "permName", type: "string", required: true, desc: "Nom de la permission à vérifier." }
                            ],
                            returns: "void — la réponse arrive via l'event lumen-grant:permissionChecked.",
                            examples: [
                                { code: { lang: "lua", content: `exports['lumen-grant']:RequestPermissionCheck('elevator.create')\n\nAddEventHandler('lumen-grant:permissionChecked', function(permName, hasIt)\n    if permName == 'elevator.create' then\n        ShowCreateButton(hasIt)\n    end\nend)` } }
                            ],
                            alerts: [
                                { type: "warning", title: "Rate limiting", text: "Les vérifications sont plafonnées à 30 par seconde et par joueur. Les dépassements sont journalisés en SECURITY_VIOLATION." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  RÉFÉRENCE
                // ══════════════════════════════════════════════════════

                events: {
                    title: "Événements",
                    description: "Événements client déclenchés par lumen-grant, à écouter dans vos ressources.",
                    functions: [
                        {
                            name: "lumen-grant:permissionsLoaded",
                            syntax: "AddEventHandler('lumen-grant:permissionsLoaded', function(permissions) end)",
                            description: "Déclenché côté client quand la liste des permissions du joueur est reçue : au spawn, sur demande explicite, et désormais à chaque fois qu'un admin modifie ses permissions.",
                            parameters: [
                                { name: "permissions", type: "table", required: true, desc: "Tableau des noms de permissions du joueur." }
                            ],
                            returns: "",
                            examples: [
                                { code: { lang: "lua", content: `AddEventHandler('lumen-grant:permissionsLoaded', function(perms)\n    print('Mes permissions (' .. #perms .. ') :')\n    for _, name in ipairs(perms) do print('  ▸ ' .. name) end\n    RefreshMyMenu()\nend)` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "lumen-grant:permissionChecked",
                            syntax: "AddEventHandler('lumen-grant:permissionChecked', function(permName, hasIt) end)",
                            description: "Réponse du serveur à un appel RequestPermissionCheck().",
                            parameters: [
                                { name: "permName", type: "string",  required: true, desc: "Permission vérifiée." },
                                { name: "hasIt",    type: "boolean", required: true, desc: "Résultat de la vérification serveur." }
                            ],
                            returns: "",
                            examples: [
                                { code: { lang: "lua", content: `AddEventHandler('lumen-grant:permissionChecked', function(permName, hasIt)\n    print(permName, hasIt and 'accordée' or 'refusée')\nend)` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                commands: {
                    title: "Commandes admin",
                    description: "Toutes les commandes passent par /lumen-grant. Elles sont accessibles depuis la console serveur ou par un joueur déclaré super-admin. Les sous-commandes 'admin' sont réservées à la console.",
                    alerts: [
                        { type: "info",    title: "Console uniquement pour 'admin'", text: "admin add / remove / list ne peuvent être exécutées que depuis la console serveur FiveM, jamais par un joueur en jeu." },
                        { type: "warning", title: "Tentatives journalisées",         text: "Toute tentative d'exécution par un non-admin est enregistrée en UNAUTHORIZED_CMD avec l'identifiant du joueur." }
                    ],
                    playerCommands: [
                        {
                            command: "/lumen-panel",
                            description: "Ouvre le panel d'administration NUI in-game. Réservé aux super-admins.",
                            permission: "super-admin",
                            example: "/lumen-panel"
                        },
                        {
                            command: "/lumen-grant grant <serverId> <permission> [jours]",
                            description: "Accorde une permission à un joueur connecté. Sans [jours] : permanent. Avec un nombre de jours : expiration automatique.",
                            permission: "super-admin ou console",
                            example: "lumen-grant grant 3 elevator.create 30"
                        },
                        {
                            command: "/lumen-grant revoke <serverId> <permission>",
                            description: "Révoque une permission d'un joueur connecté. Invalide le cache et pousse la liste à jour au client.",
                            permission: "super-admin ou console",
                            example: "lumen-grant revoke 3 elevator.create"
                        },
                        {
                            command: "/lumen-grant list <serverId>",
                            description: "Liste toutes les permissions d'un joueur connecté avec auteur, date d'accord et expiration.",
                            permission: "super-admin ou console",
                            example: "lumen-grant list 3"
                        },
                        {
                            command: "/lumen-grant perms",
                            description: "Affiche toutes les permissions déclarées, groupées par ressource propriétaire.",
                            permission: "super-admin ou console",
                            example: "lumen-grant perms"
                        },
                        {
                            command: "/lumen-grant preset list",
                            description: "Liste tous les presets avec le détail de leurs permissions.",
                            permission: "super-admin ou console",
                            example: "lumen-grant preset list"
                        },
                        {
                            command: "/lumen-grant preset apply <serverId> <preset> [jours]",
                            description: "Applique un preset à un joueur connecté. Sans [jours] : permanent. Le joueur reçoit une notification en jeu.",
                            permission: "super-admin ou console",
                            example: 'lumen-grant preset apply 3 "Staff Modérateur" 30'
                        },
                        {
                            command: "/lumen-grant preset remove <serverId> <preset>",
                            description: "Retire un preset d'un joueur connecté. Révoque TOUTES les permissions du preset.",
                            permission: "super-admin ou console",
                            example: 'lumen-grant preset remove 3 "Staff Modérateur"'
                        },
                        {
                            command: "/lumen-grant preset delete <preset>",
                            description: "Supprime un preset. Les permissions déjà accordées aux joueurs sont conservées.",
                            permission: "super-admin ou console",
                            example: 'lumen-grant preset delete "Staff Modérateur"'
                        },
                        {
                            command: "/lumen-grant reload",
                            description: "Recharge le registre mémoire des permissions depuis la base, ainsi que le cache des super-admins.",
                            permission: "super-admin ou console",
                            example: "lumen-grant reload"
                        },
                        {
                            command: "/lumen-grant logs [nombre]",
                            description: "Affiche les derniers logs d'audit. Défaut : 20 entrées, maximum 100.",
                            permission: "super-admin ou console",
                            example: "lumen-grant logs 50"
                        },
                        {
                            command: "/lumen-grant help",
                            description: "Affiche toutes les commandes disponibles. Depuis la console, affiche aussi les sous-commandes admin.",
                            permission: "super-admin ou console",
                            example: "lumen-grant help"
                        }
                    ],
                    adminCommands: [
                        {
                            command: "/lumen-grant admin list",
                            description: "Liste les super-admins avec Discord ID, note, auteur et date d'ajout.",
                            permission: "console uniquement",
                            example: "lumen-grant admin list"
                        },
                        {
                            command: "/lumen-grant admin add discord:ID [note]",
                            description: "Ajoute un super-admin. Le Discord ID s'obtient via Paramètres Discord → Avancé → Mode développeur → clic droit sur profil → Copier l'identifiant.",
                            permission: "console uniquement",
                            example: "lumen-grant admin add discord:123456789012345678 MonPseudo"
                        },
                        {
                            command: "/lumen-grant admin remove discord:ID",
                            description: "Retire un super-admin. Invalide ses sessions web et ferme son panel NUI s'il est connecté.",
                            permission: "console uniquement",
                            example: "lumen-grant admin remove discord:123456789012345678"
                        }
                    ]
                },

                database: {
                    title: "Base de données",
                    description: "lumen-grant utilise sept tables MySQL, toutes créées automatiquement au démarrage de la ressource.",
                    functions: [
                        {
                            name: "Tables",
                            syntax: "— référence",
                            description: "Vue d'ensemble du schéma.",
                            parameters: [
                                { name: "lumen_grant_permissions",        type: "table", desc: "Permissions déclarées par les ressources (nom, description, ressource propriétaire)." },
                                { name: "lumen_grant_player_permissions", type: "table", desc: "Assignations joueur ↔ permission, avec auteur, date d'accord et expiration." },
                                { name: "lumen_grant_presets",            type: "table", desc: "Presets : nom unique, description, couleur, auteur, dates." },
                                { name: "lumen_grant_preset_permissions", type: "table", desc: "Liaison preset ↔ permissions, avec contrainte d'unicité sur le couple." },
                                { name: "lumen_grant_players",            type: "table", desc: "Pseudo mémorisé pour chaque identifiant, avec date de dernière vue." },
                                { name: "lumen_grant_admins",             type: "table", desc: "Super-admins, identifiés par Discord ID." },
                                { name: "lumen_grant_logs",               type: "table", desc: "Journal d'audit horodaté." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Actions journalisées",
                                    code: { lang: "bash", content: `GRANT               Permission accordée\nREVOKE              Permission révoquée\nPERMISSION_DELETED  Permission supprimée du système\nPRESET_CREATED      Preset créé\nPRESET_UPDATED      Preset modifié ou renommé\nPRESET_DELETED      Preset supprimé\nPRESET_APPLIED      Preset appliqué à un joueur\nPRESET_REMOVED      Preset retiré d'un joueur\nADMIN_ADDED         Super-admin ajouté\nADMIN_REMOVED       Super-admin retiré\nSECURITY_VIOLATION  Rate limit dépassé\nUNAUTHORIZED_CMD    Commande admin tentée par un non-admin\nUNAUTHORIZED_NUI    Ouverture de panel tentée par un non-admin\nWEB_LOGIN           Connexion au panel web réussie\nWEB_LOGIN_FAIL      Connexion au panel web refusée` }
                                },
                                {
                                    title: "Mémorisation des pseudos",
                                    code: { lang: "lua", content: `-- Le pseudo affiché en jeu (GetPlayerName) est enregistré :\n--   • à la connexion du joueur (playerJoining)\n--   • puis resynchronisé toutes les 60 s pour les joueurs en ligne\n--\n-- Les panels affichent ce pseudo avec l'identifiant en dessous.\n-- Un joueur jamais vu depuis l'installation apparaît comme\n-- « Pseudo inconnu » jusqu'à sa prochaine connexion.` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Nettoyage automatique", text: "Les logs plus anciens que Config.Logs.KeepDays (30 jours par défaut) sont purgés automatiquement toutes les 24 heures." },
                                { type: "warning", title: "Pseudo Steam",          text: "Le pseudo enregistré est celui retourné par GetPlayerName. Pour un joueur connecté via Steam, FiveM y remonte souvent la persona Steam. Récupérer le pseudo du compte Cfx.re nécessiterait un appel à l'API Cfx." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "web-api": {
                    title: "API HTTP du panel web",
                    description: "Le panel web communique avec le serveur via une API REST interne. Tous les endpoints exigent une session Discord OAuth2 valide correspondant à un super-admin. Cette référence est utile si vous souhaitez construire vos propres outils.",
                    functions: [
                        {
                            name: "Lecture (GET)",
                            syntax: "GET /lumen-grant/api/...",
                            description: "Endpoints de consultation.",
                            parameters: [
                                { name: "/api/stats",                   type: "GET", desc: "Compteurs : joueurs en ligne, assignations, permissions, logs 24 h." },
                                { name: "/api/players",                 type: "GET", desc: "Joueurs actuellement connectés, avec pseudo et nombre de permissions." },
                                { name: "/api/permissions",             type: "GET", desc: "Toutes les permissions déclarées, avec leur nombre d'assignations." },
                                { name: "/api/player-permissions",      type: "GET", desc: "Permissions d'un joueur. Paramètre : ?identifier=..." },
                                { name: "/api/all-player-permissions",  type: "GET", desc: "Tous les joueurs possédant des permissions, avec pseudo mémorisé." },
                                { name: "/api/presets",                 type: "GET", desc: "Tous les presets, leurs permissions et leur nombre de porteurs." },
                                { name: "/api/logs",                    type: "GET", desc: "Journal d'audit. Paramètres : ?limit=&action=" }
                            ],
                            returns: "JSON",
                            examples: [],
                            alerts: []
                        },
                        {
                            name: "Écriture (POST)",
                            syntax: "POST /lumen-grant/api/...",
                            description: "Endpoints de modification. Corps en JSON.",
                            parameters: [
                                { name: "/api/grant",             type: "POST", desc: "{ identifier, permissionName, expiresAt }" },
                                { name: "/api/revoke",            type: "POST", desc: "{ identifier, permissionName }" },
                                { name: "/api/grant-bulk",        type: "POST", desc: "{ identifier, permissionNames: [], expiresAt }" },
                                { name: "/api/revoke-bulk",       type: "POST", desc: "{ identifier, permissionNames: [] }" },
                                { name: "/api/delete-permission", type: "POST", desc: "{ permissionName }" },
                                { name: "/api/preset-save",       type: "POST", desc: "{ name, originalName, description, color, permissions: [] }" },
                                { name: "/api/preset-delete",     type: "POST", desc: "{ name }" },
                                { name: "/api/preset-apply",      type: "POST", desc: "{ identifier, presetName, expiresAt }" },
                                { name: "/api/preset-remove",     type: "POST", desc: "{ identifier, presetName }" }
                            ],
                            returns: "JSON — { success: true, ... } ou { error: \"...\" }.",
                            examples: [
                                {
                                    title: "Exemple de réponse",
                                    code: { lang: "bash", content: `POST /lumen-grant/api/grant-bulk\n{ "identifier": "license:abc123",\n  "permissionNames": ["elevator.create", "elevator.edit"],\n  "expiresAt": null }\n\n→ 200 { "success": true, "granted": 2, "failed": [] }\n→ 400 { "error": "Aucune permission accordée" }` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Usage interne", text: "Cette API est conçue pour le panel web fourni. Elle n'est pas versionnée et peut évoluer entre deux versions de la ressource. Pour vos intégrations, préférez les exports serveur." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  GUIDES
                // ══════════════════════════════════════════════════════

                "integration-guide": {
                    title: "Guide d'intégration",
                    description: "Patron complet pour intégrer lumen-grant dans votre ressource.",
                    functions: [
                        {
                            name: "Intégration pas à pas",
                            syntax: "— guide",
                            description: "",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "1. fxmanifest.lua — déclarer la dépendance",
                                    code: { lang: "lua", content: `fx_version 'cerulean'\ngame 'gta5'\nlua54 'yes'\n\ndependency 'lumen-grant'   -- garantit l'ordre de démarrage\n\nserver_scripts { 'server/*.lua' }\nclient_scripts { 'client/*.lua' }` }
                                },
                                {
                                    title: "2. server/permissions.lua — enregistrer les permissions",
                                    code: { lang: "lua", content: `CreateThread(function()\n    Wait(500)\n    local perm = exports['lumen-grant']\n    local res  = GetCurrentResourceName()\n\n    perm:RegisterPermission('elevator.create', 'Créer un ascenseur',    res)\n    perm:RegisterPermission('elevator.edit',   'Modifier un ascenseur', res)\n    perm:RegisterPermission('elevator.delete', 'Supprimer un ascenseur',res)\nend)` }
                                },
                                {
                                    title: "3. server/main.lua — vérification serveur (obligatoire)",
                                    code: { lang: "lua", content: `local perm = exports['lumen-grant']\n\nRegisterNetEvent('elevator:server:create')\nAddEventHandler('elevator:server:create', function(data)\n    local src        = source\n    local identifier = perm:GetIdentifier(src)\n\n    if not perm:HasPermission(identifier, 'elevator.create') then\n        TriggerClientEvent('elevator:client:denied', src)\n        return\n    end\n\n    CreateElevator(data)\nend)` }
                                },
                                {
                                    title: "4. client/main.lua — feedback UI (optionnel)",
                                    code: { lang: "lua", content: `-- Se déclenche au spawn ET à chaque modification par un admin\nAddEventHandler('lumen-grant:permissionsLoaded', function()\n    local canCreate = exports['lumen-grant']:HasPermissionUI('elevator.create')\n    ShowElevatorMenu(canCreate)\nend)\n\nfunction OnCreateButtonPressed(data)\n    TriggerServerEvent('elevator:server:create', data)  -- le serveur revérifie\nend` }
                                },
                                {
                                    title: "5. Créer un preset pour votre ressource",
                                    code: { lang: "lua", content: `-- Optionnel : proposer un preset prêt à l'emploi au premier démarrage\nCreateThread(function()\n    Wait(2000)  -- après l'enregistrement des permissions\n    local perm = exports['lumen-grant']\n\n    local existing = perm:GetPresetPermissions('Gestion Ascenseurs')\n    if #existing == 0 then\n        perm:SavePreset(\n            'Gestion Ascenseurs',\n            'Accès complet aux ascenseurs',\n            'blue',\n            { 'elevator.create', 'elevator.edit', 'elevator.delete' },\n            GetCurrentResourceName(),\n            nil\n        )\n    end\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Wait(500) au démarrage", text: "Le délai laisse à lumen-grant le temps d'établir sa connexion MySQL. L'alternative propre est de déclarer dependency 'lumen-grant' dans votre fxmanifest." }
                            ]
                        }
                    ],
                    alerts: []
                },

                security: {
                    title: "Architecture de sécurité",
                    description: "lumen-grant est conçu pour que la sécurité soit impossible à contourner depuis le client.",
                    functions: [
                        {
                            name: "Flux sécurisé",
                            syntax: "— guide",
                            description: "",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Chemin d'une action",
                                    code: { lang: "bash", content: `CLIENT                          SERVEUR\n──────                          ───────\nDemande une action      ──►    Reçoit l'event\n                               ↓\n                               GetPlayerIdentifiers(source)\n                               (identifiant jamais fourni par le client)\n                               ↓\n                               HasPermission() — cache ou DB\n                               ↓\n                               Autorise ou refuse\n                        ◄──    Réponse uniquement si autorisé` }
                                },
                                {
                                    title: "Séparation client / serveur",
                                    code: { lang: "bash", content: `config_client.lua   → chargé par le CLIENT et le serveur\n                      Config.NUI uniquement. Tout ce qui est ici\n                      est lisible par n'importe quel joueur.\n\nconfig_server.lua   → chargé par le SERVEUR seul\n                      Debug, Logs, RateLimit, Cache, Web\n                      (dont DiscordClientId et ClientSecret)\n\n⚠ N'ajoutez JAMAIS config_server.lua à client_scripts ni à files{}.\n   Un garde-fou IsDuplicityVersion() bloque le chargement côté client,\n   mais le fichier serait tout de même téléchargé par les joueurs.` }
                                },
                                {
                                    title: "Points de contrôle",
                                    code: { lang: "bash", content: `✔ Identifiant résolu côté serveur, jamais transmis par le client\n✔ Toutes les requêtes SQL sont paramétrées\n✔ Ouverture du panel NUI validée serveur-side\n✔ Endpoints web protégés par session Discord OAuth2\n✔ Rate limiting : 30 vérifications/seconde/joueur\n✔ Toute tentative non autorisée est journalisée` }
                                }
                            ],
                            alerts: [
                                { type: "danger",  title: "Ne jamais faire confiance au client",  text: "N'acceptez jamais un identifiant, un nom de permission ou un résultat de vérification venant du client. Tout passe par HasPermission() et GetIdentifier() côté serveur." },
                                { type: "warning", title: "HasPermissionUI n'est pas sécurisé",   text: "Cet export sert uniquement à adapter l'interface. Un joueur peut modifier son cache local. Ne l'utilisez jamais pour autoriser une action." },
                                { type: "info",    title: "Rate limiting actif par défaut",       text: "30 vérifications par seconde et par joueur. Les dépassements sont journalisés en SECURITY_VIOLATION avec l'identifiant concerné." }
                            ]
                        }
                    ],
                    alerts: []
                },

                troubleshooting: {
                    title: "Dépannage",
                    description: "Les problèmes les plus courants et leur résolution.",
                    functions: [
                        {
                            name: "Tous les grants échouent après un redémarrage",
                            syntax: "Symptôme : « Permission non enregistrée » sur chaque grant",
                            description: "Le registre mémoire des permissions n'est alimenté que par les appels RegisterPermission des autres ressources, qui n'ont lieu qu'à LEUR démarrage. Redémarrer lumen-grant seul laissait donc le registre vide en v1.1.0.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Résolution",
                                    code: { lang: "bash", content: `# v1.2.0 : le registre est hydraté automatiquement depuis la base.\n# Si le doute persiste :\nlumen-grant reload\nlumen-grant perms      # doit lister vos permissions\n\n# Sinon, redémarrer les ressources propriétaires :\nrestart ma-ressource` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Symptôme trompeur", text: "En v1.1.0, appliquer un preset affichait un succès et écrivait un log PRESET_APPLIED alors qu'aucune permission n'était réellement accordée. La v1.2.0 renvoie désormais un échec explicite avec la raison." }
                            ]
                        },
                        {
                            name: "Le panel web refuse la connexion",
                            syntax: "Symptôme : erreur Discord OAuth2 ou accès refusé",
                            description: "Deux causes possibles : une URI de redirection incorrecte, ou un Discord ID absent de la table des super-admins.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Vérifications",
                                    code: { lang: "bash", content: `# 1. L'URI doit correspondre AU CARACTÈRE PRÈS, port compris,\n#    entre config_server.lua et Discord Developer → OAuth2 → Redirects\n\n# 2. Votre Discord ID doit être déclaré :\nlumen-grant admin list\nlumen-grant admin add discord:VOTRE_ID MonPseudo\n\n# 3. Consulter les tentatives refusées :\nlumen-grant logs 20     # chercher WEB_LOGIN_FAIL` }
                                }
                            ],
                            alerts: []
                        },
                        {
                            name: "Un preset s'applique mais le joueur n'a rien",
                            syntax: "Symptôme : « 0/5 permission(s) accordée(s) »",
                            description: "Les permissions du preset n'existent plus ou ne sont pas dans le registre.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Diagnostic",
                                    code: { lang: "bash", content: `lumen-grant preset list   # voir le contenu réel du preset\nlumen-grant perms         # voir les permissions reconnues\nlumen-grant reload        # réhydrater le registre\n\n# Activer Config.Debug = true pour voir le détail des échecs\n# dans la console serveur.` }
                                }
                            ],
                            alerts: []
                        },
                        {
                            name: "Les pseudos affichent « Pseudo inconnu »",
                            syntax: "Symptôme : onglet Joueurs sans pseudo",
                            description: "Le pseudo n'est mémorisé qu'à partir de l'installation de la v1.2.0. Il ne peut pas être reconstruit rétroactivement.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Comportement normal",
                                    code: { lang: "bash", content: `# Le pseudo est enregistré :\n#   • à la connexion du joueur\n#   • puis resynchronisé toutes les 60 s s'il est en ligne\n#\n# Un joueur hors ligne depuis la mise à jour restera\n# « Pseudo inconnu » jusqu'à sa prochaine connexion.\n\n# Vérifier que la table se remplit :\n# SELECT * FROM lumen_grant_players ORDER BY last_seen DESC;` }
                                }
                            ],
                            alerts: []
                        },
                        {
                            name: "Deux admins ne voient pas les mêmes données",
                            syntax: "Symptôme : décalage entre deux panels ouverts",
                            description: "Chaque panel se rafraîchit sur son propre cycle. Il n'existe pas de push serveur vers les panels ouverts.",
                            parameters: [],
                            returns: "",
                            examples: [
                                {
                                    title: "Comportement attendu",
                                    code: { lang: "bash", content: `# Un panel se resynchronise :\n#   • immédiatement après VOS propres actions\n#   • automatiquement toutes les 20 secondes\n#\n# Le cycle automatique est sauté si une modale est ouverte\n# ou si des permissions sont cochées, pour ne pas perturber\n# la saisie en cours.\n#\n# Pour forcer : changer d'onglet, ou fermer/rouvrir le panel.` }
                                }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                }

            }
        }

        // ─── Ajoutez vos ressources ici ──────────────────────────────────────────

    ]
};

window.config = config;