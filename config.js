const config = {

    site: {
        name:       "Lumen Docs",
        tagline:    "Documentation des ressources lumen",
        version:    "v1.2",
        githubUrl:  "https://github.com/ImSamaCurrent",
        discordUrl: "https://discord.gg/ay4uGDKP58",
        logoUrl:    ""
    },

    resources: [


        
        // ══════════════════════════════════════════
        // ║  LUMEN-UI                              ║
        // ══════════════════════════════════════════
        {
            id:          "lumen-ui",
            name:        "lumen-ui",
            version:     "v2.0.0",
            description: "Framework de menus NUI pour FiveM — menus clavier, menus liste à la souris, boîtes de saisie, notifications d'aide, instructional buttons et lecteur média. Frontend Vite + React + TypeScript, API Lua multi-ressources.",
            icon:        "🎛️",
            color:       "#8b5cf6",
            status:      "stable",

            categories: [
                {
                    title: "Démarrage",
                    items: ["introduction", "installation", "premier-menu", "architecture"]
                },
                {
                    title: "Menus",
                    items: ["create", "render", "close", "updateMenu", "deleteMenu", "RefreshCurrentMenu", "menu-queries"]
                },
                {
                    title: "Items",
                    items: ["addButton", "addCheckbox", "addList", "addSlider", "addStepper", "addButtonGrid", "addSeparator", "updateItem", "getItemValue"]
                },
                {
                    title: "Boîtes de saisie",
                    items: ["showInput", "input-fields", "closeInput"]
                },
                {
                    title: "Menu liste",
                    items: ["showListMenu", "listmenu-registry"]
                },
                {
                    title: "Overlays",
                    items: ["showHelpNotification", "showInstructionalButtons", "showMedia"]
                },
                {
                    title: "Langues",
                    items: ["translations", "SetPlayerLanguage"]
                },
                {
                    title: "Utilitaires",
                    items: ["copyToClipboard", "opacity", "setDebug"]
                },
                {
                    title: "Référence",
                    items: ["keyboard", "text-markup", "commands", "troubleshooting"]
                }
            ],

            sections: {

                // ══════════════════════════════════════════════════════
                //  DÉMARRAGE
                // ══════════════════════════════════════════════════════

                introduction: {
                    title: "Introduction",
                    description: "lumen-ui est un framework de menus NUI standalone pour FiveM. Chaque ressource construit ses menus dans sa propre VM Lua via @lumen-ui/init.lua, tandis que lumen-ui possède la page NUI et route les callbacks vers la bonne ressource. Le frontend est écrit en React + TypeScript et compilé par Vite.",
                    features: [
                        { icon: "⌨️", title: "Menu clavier",            desc: "Navigation aux flèches, boutons, cases à cocher, listes, sliders, steppers et grilles de boutons. Pagination automatique par poids d'item." },
                        { icon: "🖱️", title: "Menu liste à la souris",  desc: "Panneau latéral cliquable avec icônes, badges, tags et lignes d'info. Recherche intégrée et bouton retour." },
                        { icon: "📝", title: "Boîtes de saisie",        desc: "Onze types de champs : texte, nombre, mot de passe, zone de texte, select, multiselect, case à cocher, sélecteur de couleur HSV et calendrier." },
                        { icon: "💬", title: "Notifications d'aide",    desc: "Encadré translucide avec badges clavier ~INPUT_XXX~, mode permanent, boucle ou auto-dismiss avec barre de progression." },
                        { icon: "🎮", title: "Instructional buttons",   desc: "Barre de touches façon GTA V, positionnable, qui partage la table de touches des notifications d'aide." },
                        { icon: "🎬", title: "Lecteur média",           desc: "Images, vidéos locales, YouTube, Dailymotion, Vimeo, Twitch et Sibnet affichés à côté du menu." },
                        { icon: "🌍", title: "Multi-langue",            desc: "Français, anglais, espagnol et allemand intégrés. Les ressources externes enregistrent leurs propres traductions par namespace." },
                        { icon: "🔀", title: "Multi-ressources",        desc: "Le dispatcher NUI route chaque callback vers la VM de la ressource émettrice. Aucune fuite de globales entre ressources." },
                        { icon: "🔍", title: "Recherche dans le menu",  desc: "Filtrage sur le label et sur searchId, navigation aux flèches sans quitter le champ, validation à Entrée." },
                        { icon: "⚛️", title: "Frontend React",          desc: "Vite + React 18 + TypeScript. Rechargement à chaud en navigateur, typage complet des payloads, test headless intégré." }
                    ],
                    alerts: [
                        { type: "info",    title: "Nouveautés v2.0.0",  text: "Frontend réécrit en Vite + React + TypeScript, ajout des instructional buttons, et correction de cinq bugs de la v1 dont le retour arrière bloqué pendant une recherche." },
                        { type: "warning", title: "Étape de build",     text: "Contrairement à la v1, la page NUI doit être compilée avant le premier démarrage. Voir Installation." }
                    ]
                },

                installation: {
                    title: "Installation",
                    requirements: [
                        { name: "FiveM Server", version: "build récent", required: true },
                        { name: "Node.js",      version: "20.19+",       required: true },
                        { name: "npm",          version: "10+",          required: true }
                    ],
                    steps: [
                        {
                            title: "1. Déposer la ressource",
                            description: "Copier le dossier lumen-ui dans votre répertoire de ressources. Le dossier web/ contient les sources du frontend et n'est jamais envoyé aux joueurs.",
                            code: { lang: "bash", content: `resources/\n└── lumen-ui/\n    ├── fxmanifest.lua\n    ├── init.lua                ← à inclure depuis vos ressources\n    ├── config/\n    │   └── config.lua          ← langue par défaut, debug, options menu\n    ├── client/\n    │   ├── ini.lua             ← ponts NUI (SendNUIMessage, SetNuiFocus…)\n    │   ├── locale.lua          ← traductions fr / en / es / de\n    │   ├── core.lua            ← état global, langue, opacité, focus\n    │   ├── menus.lua           ← create / render / close / update\n    │   ├── items.lua           ← addButton, addSlider… + updateItem\n    │   ├── input.lua           ← showInput / closeInput\n    │   ├── media.lua           ← showMedia / updateMedia / hideMedia\n    │   ├── clipboard.lua       ← copyToClipboard\n    │   ├── list_menu.lua       ← showListMenu + registre\n    │   ├── events.lua          ← handlers NUI → Lua\n    │   ├── help_notification.lua\n    │   ├── instructional_buttons.lua\n    │   ├── nui_dispatcher.lua  ← routage des callbacks (VM lumen-ui)\n    │   ├── settings.lua        ← menu de langue\n    │   └── export.lua          ← exports pour ressources externes\n    └── web/                    ← sources du frontend (non distribuées)\n        ├── package.json\n        ├── vite.config.ts\n        ├── src/\n        └── build/              ← généré par npm run build` }
                        },
                        {
                            title: "2. Compiler la page NUI",
                            description: "Obligatoire avant le premier démarrage. Le dossier web/build doit exister, sinon FiveM ne trouvera pas la ui_page. Commitez web/build ou intégrez cette étape à votre pipeline de déploiement.",
                            code: { lang: "bash", content: `cd resources/lumen-ui/web\nnpm install\nnpm run build\n\n# Résultat attendu :\n# build/index.html                   0.40 kB\n# build/assets/index.[hash].css     45.21 kB\n# build/assets/index.[hash].js     211.10 kB` }
                        },
                        {
                            title: "3. Déclarer dans server.cfg",
                            description: "lumen-ui DOIT démarrer AVANT toute ressource qui l'utilise, sinon ses exports seront nil au chargement.",
                            code: { lang: "cfg", content: `ensure lumen-ui\nensure ma-ressource   # après lumen-ui` }
                        },
                        {
                            title: "4. Inclure l'API dans votre ressource",
                            description: "Ajoutez @lumen-ui/init.lua en tête de vos client_scripts. Les modules lumen-ui s'exécutent alors dans VOTRE VM : _RES vaut le nom de votre ressource, et les callbacks NUI vous sont routés.",
                            code: { lang: "lua", content: `-- fxmanifest.lua de VOTRE ressource\nfx_version 'cerulean'\ngame 'gta5'\n\nclient_scripts {\n    '@lumen-ui/init.lua',   -- doit être en PREMIER\n    'client/main.lua',\n}` }
                        },
                        {
                            title: "5. Vérifier",
                            description: "Un menu minimal pour confirmer que tout est branché.",
                            code: { lang: "lua", content: `-- client/main.lua\nRegisterCommand('testmenu', function()\n    lumenui.create('test', { title = 'Test', subtitle = 'lumen-ui' })\n\n    lumenui.render('test', function()\n        addButton('Ça marche', { description = 'Appuyez sur Entrée' }, {\n            onSelected = function() print('OK') end\n        })\n    end)\nend)` }
                        }
                    ],
                    alerts: [
                        { type: "danger",  title: "web/build obligatoire",  text: "Si web/build est absent, la ui_page pointe dans le vide et l'interface reste noire. Lancez npm run build après chaque mise à jour des sources." },
                        { type: "warning", title: "Ordre de démarrage",     text: "Toute ressource qui appelle lumenui.* doit être ensure APRÈS lumen-ui, sinon exports['lumen-ui'] est nil au moment du chargement d'init.lua." },
                        { type: "info",    title: "Node uniquement au build", text: "Node.js n'est nécessaire que pour compiler le frontend. Le serveur FiveM en production n'a besoin que du dossier web/build." }
                    ]
                },

                "premier-menu": {
                    title: "Premier menu",
                    description: "Un menu lumen-ui se construit en deux temps : create() enregistre sa configuration une fois, render() reconstruit ses items à chaque affichage. Le callback de render est rejoué à chaque rafraîchissement, changement de langue ou updateMenu — vos items doivent donc être décrits, pas mémorisés.",
                    functions: [
                        {
                            name: "Cycle de vie",
                            syntax: "create() → render() → close()",
                            description: "create() ne fait qu'enregistrer la définition du menu, il n'affiche rien. C'est render() qui exécute votre callback, construit les items et envoie le tout à la NUI.",
                            parameters: [
                                { name: "create",  type: "1 fois",     desc: "Titre, sous-titre, couleur, largeur, touche contextuelle. À appeler une seule fois, au démarrage par exemple." },
                                { name: "render",  type: "à l'ouverture", desc: "Exécute le callback qui empile les items via addButton, addCheckbox… puis affiche le menu et prend le focus NUI." },
                                { name: "close",   type: "à la sortie", desc: "Ferme le menu et rend le focus au jeu. Déclenché aussi par ÉCHAP ou RETOUR ARRIÈRE côté joueur." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Menu complet avec sous-menu",
                                    code: { lang: "lua", content: `local settings = { godmode = false, speed = 50, weather = 1 }\n\nlumenui.create('main', {\n    title       = 'Menu Admin',\n    subtitle    = 'Outils de modération',\n    description = 'Serveur RP',\n    color       = '#8B5CF6',\n    width       = 'wide',\n    itemsPerPage = 10,\n})\n\nlumenui.create('sub', { title = 'Météo', color = '#3B82F6' })\n\nlocal function openMain()\n    lumenui.render('main', function()\n        addSeparator('Général')\n\n        addCheckbox('God mode', settings.godmode, { id = 'god' }, {\n            onSelected = function(value)\n                settings.godmode = value\n                SetEntityInvincible(PlayerPedId(), value)\n            end\n        })\n\n        addSlider('Vitesse', 0, 100, settings.speed, { id = 'speed' }, {\n            onSliderChange = function(value) settings.speed = value end\n        })\n\n        addLine()\n\n        addButton('Météo', { description = 'Ouvrir le sous-menu' }, {\n            onSelected = function() openWeather() end\n        })\n\n        -- Fermeture propre : rend le focus au jeu\n        onClosed(function() print('Menu fermé') end)\n    end)\nend\n\nfunction openWeather()\n    lumenui.render('sub', function()\n        addList('Météo', { 'Clair', 'Pluie', 'Orage' }, settings.weather, {}, {\n            onListChange = function(index) settings.weather = index end\n        })\n\n        addButton('Retour', {}, { onSelected = openMain })\n\n        -- Sans onClosed, ÉCHAP ferme simplement le menu\n        onClosed(function() lumenui.close() end)\n    end)\nend\n\nRegisterCommand('admin', openMain, false)` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Le callback est rejoué",   text: "render() vide currentItems puis réexécute votre callback. Ne créez pas d'effets de bord dedans (spawn d'entités, requêtes serveur) : il peut être appelé plusieurs fois par seconde lors d'un updateMenu." },
                                { type: "info",    title: "Sous-menus",               text: "Il n'y a pas de pile de navigation intégrée. Un sous-menu est un autre menu rendu par-dessus ; gérez le retour avec vos propres boutons, comme dans l'exemple." },
                                { type: "danger",  title: "Erreur dans le callback",  text: "Une erreur Lua dans le callback de render est capturée : la trace est affichée en console, le dialogue de saisie et le menu sont fermés pour ne pas laisser le focus NUI bloqué." }
                            ]
                        }
                    ],
                    alerts: []
                },

                architecture: {
                    title: "Architecture",
                    description: "Comprendre le routage est utile dès que plusieurs ressources utilisent lumen-ui en même temps. Les callbacks NUI ne peuvent pas traverser les VM Lua : lumen-ui possède la page NUI, reçoit donc tous les callbacks, et les redistribue par événement.",
                    functions: [
                        {
                            name: "Routage des callbacks",
                            syntax: "NUI → nui_dispatcher.lua → TriggerEvent → votre VM",
                            description: "Chaque message envoyé par le frontend porte un champ __resource. Le dispatcher lit ce champ et déclenche __lumen-ui:<ressource>:<event>, que les handlers de events.lua interceptent dans la VM concernée.",
                            parameters: [
                                { name: "_RES",              type: "global", desc: "Nom de la ressource appelante, défini par core.lua au chargement d'init.lua. Sert à préfixer les événements." },
                                { name: "__resource",        type: "champ",  desc: "Ajouté à chaque callback par le frontend. Détermine la VM de destination." },
                                { name: "nui_dispatcher.lua", type: "module", desc: "Chargé uniquement dans la VM lumen-ui. Répond immédiatement au callback puis dispatche via SetTimeout(0) pour revenir sur le thread principal." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Les 18 callbacks routés",
                                    code: { lang: "lua", content: `-- client/nui_dispatcher.lua\nlocal NUI_CALLBACKS = {\n    'itemSelected', 'itemChanged', 'stepperChanged', 'buttonGridClicked',\n    'gridToggled', 'itemHovered', 'itemUnhovered', 'contextMenu',\n    'onClosed', 'updateSelectedIndex', 'inputSubmitted', 'inputCancelled',\n    'searchModeChanged',\n    'listMenuClicked', 'listMenuClosed', 'listMenuGoBack',\n    'listMenuHovered', 'listMenuUnhovered'\n}\n\n-- Devient, dans votre ressource :\n-- AddEventHandler('__lumen-ui:ma-ressource:itemSelected', function(data) ... end)` }
                                },
                                {
                                    title: "Gestion du focus NUI",
                                    code: { lang: "lua", content: `-- Menu normal   : clavier capté, curseur masqué, jeu jouable\nSetNuiFocus(true, false)\nSetNuiFocusKeepInput(true)\n\n-- Recherche / saisie / menu liste : curseur nécessaire\nSetNuiFocus(true, true)\nSetNuiFocusKeepInput(false)\n\n-- Une boucle de secours dans core.lua reprend le focus toutes les 50 ms\n-- si une autre ressource le vole pendant qu'un menu est ouvert.` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Exclusion mutuelle",     text: "Un menu normal et un menu liste ne peuvent pas être ouverts en même temps. render() est bloqué côté Lua si un menu liste est ouvert, et openMenu est bloqué côté frontend dans le sens inverse." },
                                { type: "warning", title: "Arrêt de ressource",     text: "onResourceStop ferme automatiquement le menu, le menu liste et la boîte de saisie de la ressource arrêtée, pour éviter une interface figée avec le focus bloqué." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  MENUS
                // ══════════════════════════════════════════════════════

                create: {
                    title: "create()",
                    description: "Enregistre la définition d'un menu. N'affiche rien — c'est render() qui ouvre le menu. Appeler create() sur un identifiant existant écrase la définition et affiche un avertissement si le debug est actif.",
                    functions: [
                        {
                            name: "lumenui.create",
                            syntax: "local menuId = lumenui.create(id, options)",
                            description: "",
                            parameters: [
                                { name: "id",                          type: "string",  required: true,  desc: "Identifiant unique du menu. Converti en chaîne via tostring()." },
                                { name: "options.title",               type: "string",  required: false, desc: "Titre affiché dans l'en-tête. Défaut : \"Menu\". Supporte les couleurs FiveM et §translate[...]." },
                                { name: "options.subtitle",            type: "string",  required: false, desc: "Sous-titre sous le titre. Défaut : \"\"." },
                                { name: "options.description",         type: "string",  required: false, desc: "Bandeau sous l'en-tête. Le compteur position/total y est ajouté automatiquement à droite." },
                                { name: "options.itemsPerPage",        type: "number",  required: false, desc: "Nombre d'items visibles. Défaut : 10, plafonné à 15 par le frontend. Les grilles dépliées comptent pour plusieurs items." },
                                { name: "options.color",               type: "string",  required: false, desc: "Couleur d'accent : \"#8B5CF6\", \"rgb(139,92,246)\", \"139,92,246\" ou une table {r,g,b}. Défaut : violet." },
                                { name: "options.contextKey",          type: "string",  required: false, desc: "Touche du menu contextuel. Défaut : lumenConfig.DefaultMenuOptions.contextKey, soit \"x\"." },
                                { name: "options.width",               type: "string",  required: false, desc: "\"normal\" (340 px) ou \"wide\" (450 px). Défaut : valeur de lumenConfig.DefaultMenuOptions.width." },
                                { name: "options.headerBackgroundImage", type: "string", required: false, desc: "URL d'image de fond pour l'en-tête. Un voile sombre et une ombre de texte sont ajoutés automatiquement." },
                                { name: "options.headerBackgroundOpacity", type: "number", required: false, desc: "Opacité de l'image de fond, de 0 à 1. Défaut : 0.3." },
                                { name: "options.headerBackgroundBlur", type: "boolean", required: false, desc: "Applique un flou de 2 px sur l'image de fond. Défaut : false." },
                                { name: "options.closable",            type: "boolean", required: false, desc: "Si false, ÉCHAP et RETOUR ARRIÈRE ne ferment plus le menu. Défaut : true." }
                            ],
                            returns: "string — l'identifiant du menu.",
                            examples: [
                                {
                                    title: "Menu simple",
                                    code: { lang: "lua", content: `lumenui.create('garage', {\n    title    = 'Mon garage',\n    subtitle = 'Véhicules disponibles',\n    color    = '#3B82F6',\n})` }
                                },
                                {
                                    title: "En-tête illustré, menu non fermable",
                                    code: { lang: "lua", content: `lumenui.create('tuto', {\n    title                   = 'Tutoriel',\n    subtitle                = 'Étape 1 sur 5',\n    headerBackgroundImage   = 'https://exemple.com/banniere.png',\n    headerBackgroundOpacity = 0.45,\n    headerBackgroundBlur    = true,\n    closable                = false,   -- le joueur ne peut pas sortir\n    width                   = 'wide',\n    itemsPerPage            = 12,\n})` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "closable = false",     text: "Aucune touche ne ferme le menu. Prévoyez impérativement un bouton qui appelle lumenui.close(), sinon le joueur reste bloqué avec le focus NUI." },
                                { type: "info",    title: "itemsPerPage plafonné", text: "Le frontend ramène toute valeur supérieure à 15 à 15. Une grille de boutons dépliée pèse 0,5 + (nombre de lignes × 1 à 2) selon le nombre de colonnes." }
                            ]
                        }
                    ],
                    alerts: []
                },

                render: {
                    title: "render()",
                    description: "Ouvre le menu et construit ses items. Le callback est exécuté immédiatement : il doit empiler les items avec addButton, addCheckbox, addList, etc. render() prend ensuite le focus NUI en mode clavier.",
                    functions: [
                        {
                            name: "lumenui.render",
                            syntax: "lumenui.render(menuId, callback)",
                            description: "",
                            parameters: [
                                { name: "menuId",   type: "string",   required: true, desc: "Identifiant passé à create(). Si le menu n'existe pas, render() n'affiche rien." },
                                { name: "callback", type: "function", required: true, desc: "Fonction sans argument qui construit les items. Mémorisée pour permettre les rafraîchissements ultérieurs." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Construction dynamique",
                                    code: { lang: "lua", content: `local vehicles = { 'Sultan', 'Kuruma', 'Banshee' }\n\nlumenui.render('garage', function()\n    addSeparator('Véhicules')\n\n    for i, name in ipairs(vehicles) do\n        addButton(name, {\n            id          = 'veh_' .. i,\n            rightLabel  = 'Prêt',\n            badge       = i == 1 and 'FAVORI' or nil,\n            badgeColor  = 'yellow',\n            searchId    = name,\n            description = 'Sortir le ' .. name,\n        }, {\n            onSelected    = function() SpawnVehicle(name) end,\n            onContextMenu = function() ShowVehicleOptions(i) end,\n        })\n    end\n\n    if #vehicles == 0 then\n        addButton('Aucun véhicule', {}, true)   -- 3e argument : désactivé\n    end\n\n    onClosed(function() print('Garage fermé') end)\nend)` }
                                },
                                {
                                    title: "Se souvenir de la position du curseur",
                                    code: { lang: "lua", content: `-- lastSelectedIndex est mis à jour à chaque déplacement.\n-- render() le renvoie via preserveSelection : le curseur revient\n-- automatiquement sur le même item après un refresh.\n\nlumenui.render('garage', buildGarage)   -- curseur restauré tout seul\n\n-- Pour repartir du premier item, redéfinissez lastSelectedIndex :\nlumenui.updateMenu('garage', { lastSelectedIndex = 0 })` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Bloqué par le menu liste", text: "Si un menu liste est ouvert dans cette VM, render() refuse de s'exécuter et journalise un avertissement. Fermez-le d'abord avec lumenui.closeListMenu()." },
                                { type: "info",    title: "Langue resynchronisée",     text: "render() relit la langue du joueur depuis lumen-ui à chaque appel, pour qu'une ressource externe chargée depuis longtemps ne serve pas une langue périmée." },
                                { type: "info",    title: "onClosed",                  text: "onClosed(callback, keepVisible) se déclare à l'intérieur du callback de render. Avec keepVisible = true, le menu reste affiché à l'écran après fermeture logique, figé sur son dernier état." }
                            ]
                        }
                    ],
                    alerts: []
                },

                close: {
                    title: "close()",
                    description: "Ferme le menu en cours, rend le focus au jeu et remet à zéro l'état interne. À appeler depuis un bouton « Quitter », ou dans un onClosed de sous-menu pour éviter que le menu parent reste ouvert.",
                    functions: [
                        {
                            name: "lumenui.close",
                            syntax: "lumenui.close()",
                            description: "",
                            parameters: [],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Bouton de sortie",
                                    code: { lang: "lua", content: `addButton('Quitter', { description = 'Fermer le menu' }, {\n    onSelected = function()\n        lumenui.close()\n    end\n})` }
                                },
                                {
                                    title: "Fermeture depuis l'extérieur",
                                    code: { lang: "lua", content: `-- Fermer le menu quand le joueur monte en véhicule\nCreateThread(function()\n    while true do\n        Wait(500)\n        if lumenui.isMenuOpen('garage') and IsPedInAnyVehicle(PlayerPedId(), false) then\n            lumenui.close()\n        end\n    end\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Différence avec ÉCHAP", text: "close() ferme immédiatement avec forceClose. La fermeture par ÉCHAP passe par l'événement onClosed, qui exécute d'abord votre callback onClosed." }
                            ]
                        }
                    ],
                    alerts: []
                },

                updateMenu: {
                    title: "updateMenu()",
                    description: "Modifie les propriétés d'un menu enregistré. Si le menu est actuellement ouvert, il est re-rendu immédiatement avec son callback mémorisé.",
                    functions: [
                        {
                            name: "lumenui.updateMenu",
                            syntax: "local ok = lumenui.updateMenu(menuId, updates, resetItems)",
                            description: "",
                            parameters: [
                                { name: "menuId",     type: "string",  required: true,  desc: "Identifiant du menu." },
                                { name: "updates",    type: "table",   required: true,  desc: "Paires clé/valeur à écraser : title, subtitle, description, color, width, itemsPerPage, closable, lastSelectedIndex…" },
                                { name: "resetItems", type: "boolean", required: false, desc: "Si true, vide le cache des valeurs d'items avant le re-render." }
                            ],
                            returns: "boolean — false si le menu est introuvable, si updates n'est pas une table, ou si aucun callback de render n'est mémorisé.",
                            examples: [
                                {
                                    title: "Titre dynamique",
                                    code: { lang: "lua", content: `-- Afficher le solde dans le sous-titre, sans reconstruire le menu\nlumenui.updateMenu('banque', {\n    subtitle = 'Solde : ' .. money .. ' €',\n    color    = money > 0 and '#22C55E' or '#EF4444',\n})` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "L'ID est protégé",  text: "La clé « id » est ignorée et un avertissement est affiché. Pour renommer un menu, supprimez-le puis recréez-le." },
                                { type: "info",    title: "Re-render complet", text: "Pour changer un seul item plutôt que tout le menu, préférez lumenui.updateItem() : bien plus léger." }
                            ]
                        }
                    ],
                    alerts: []
                },

                deleteMenu: {
                    title: "deleteMenu()",
                    description: "Supprime définitivement un menu du registre ainsi que son callback de render. Si le menu est ouvert, il est fermé avant suppression.",
                    functions: [
                        {
                            name: "lumenui.deleteMenu",
                            syntax: "local ok = lumenui.deleteMenu(menuId)",
                            description: "",
                            parameters: [
                                { name: "menuId", type: "string", required: true, desc: "Identifiant du menu à supprimer." }
                            ],
                            returns: "boolean — false si le menu n'existe pas.",
                            examples: [
                                {
                                    title: "Nettoyage de menus temporaires",
                                    code: { lang: "lua", content: `-- Menus générés dynamiquement, à nettoyer une fois inutiles\nfor _, id in ipairs(lumenui.listMenus()) do\n    if id:sub(1, 5) == 'temp_' then\n        lumenui.deleteMenu(id)\n    end\nend` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Nettoyage automatique", text: "onResourceStop ferme déjà les menus de la ressource arrêtée. deleteMenu ne sert qu'aux menus créés à la volée pendant la session." }
                            ]
                        }
                    ],
                    alerts: []
                },

                RefreshCurrentMenu: {
                    title: "RefreshCurrentMenu()",
                    description: "Réexécute le callback de render du menu actuellement ouvert. Utile après une modification de données qui touche plusieurs items à la fois.",
                    functions: [
                        {
                            name: "lumenui.RefreshCurrentMenu",
                            syntax: "local n = lumenui.RefreshCurrentMenu()",
                            description: "",
                            parameters: [],
                            returns: "number — 1 si un menu a été rafraîchi, 0 sinon.",
                            examples: [
                                {
                                    title: "Rafraîchir après une réponse serveur",
                                    code: { lang: "lua", content: `RegisterNetEvent('garage:client:updated')\nAddEventHandler('garage:client:updated', function(newList)\n    vehicles = newList\n\n    -- Reconstruit le menu si le joueur l'a encore sous les yeux\n    lumenui.RefreshCurrentMenu()\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Coût du rafraîchissement", text: "Tout le menu est reconstruit et renvoyé à la NUI. Pour un compteur qui change souvent, updateItem() est bien plus économique." },
                                { type: "info",    title: "Position conservée",       text: "Le curseur revient sur le même index grâce à preserveSelection, tant que le nombre d'items ne diminue pas en dessous de cette position." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "menu-queries": {
                    title: "Fonctions de consultation",
                    description: "Quatre fonctions en lecture seule pour interroger l'état des menus enregistrés dans votre VM.",
                    functions: [
                        {
                            name: "lumenui.getOpenMenu",
                            syntax: "local id = lumenui.getOpenMenu()",
                            description: "Retourne l'identifiant du menu ouvert, ou nil.",
                            parameters: [],
                            returns: "string | nil",
                            examples: [
                                { title: "Éviter d'ouvrir deux fois", code: { lang: "lua", content: `if lumenui.getOpenMenu() then return end\nlumenui.render('garage', buildGarage)` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "lumenui.isMenuOpen",
                            syntax: "local open = lumenui.isMenuOpen(menuId)",
                            description: "Vrai si ce menu précis est celui qui est ouvert.",
                            parameters: [
                                { name: "menuId", type: "string", required: true, desc: "Identifiant à tester." }
                            ],
                            returns: "boolean",
                            examples: [
                                { title: "Condition d'affichage", code: { lang: "lua", content: `if lumenui.isMenuOpen('garage') then\n    lumenui.updateItem('veh_1', { rightLabel = 'Sorti' })\nend` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "lumenui.listMenus",
                            syntax: "local ids = lumenui.listMenus()",
                            description: "Liste des identifiants enregistrés dans cette VM. L'ordre n'est pas garanti.",
                            parameters: [],
                            returns: "table — tableau de chaînes.",
                            examples: [
                                { title: "Inventaire", code: { lang: "lua", content: `for _, id in ipairs(lumenui.listMenus()) do\n    print(id, json.encode(lumenui.getMenuProperties(id)))\nend` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "lumenui.getMenuProperties",
                            syntax: "local props = lumenui.getMenuProperties(menuId)",
                            description: "Copie de surface de la définition du menu : title, subtitle, color, width, itemsPerPage, closable, lastSelectedIndex…",
                            parameters: [
                                { name: "menuId", type: "string", required: true, desc: "Identifiant du menu." }
                            ],
                            returns: "table | nil — copie, la modifier n'affecte pas le menu réel.",
                            examples: [
                                { title: "Lire la position du curseur", code: { lang: "lua", content: `local props = lumenui.getMenuProperties('garage')\nif props then\n    print('Dernier index sélectionné :', props.lastSelectedIndex)\nend` } }
                            ],
                            alerts: [
                                { type: "info", title: "Copie détachée", text: "Modifier la table retournée n'a aucun effet. Passez par updateMenu() pour changer une propriété." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  ITEMS
                // ══════════════════════════════════════════════════════

                addButton: {
                    title: "addButton()",
                    description: "Ajoute un bouton simple. C'est l'item le plus courant : il déclenche onSelected quand le joueur appuie sur Entrée. Toutes les fonctions addXxx sont des globales disponibles dans le callback de render, sans préfixe lumenui.",
                    functions: [
                        {
                            name: "addButton",
                            syntax: "addButton(label, options, isDisabled, callbacks)",
                            description: "",
                            parameters: [
                                { name: "label",                 type: "string",   required: true,  desc: "Texte affiché. Supporte les couleurs FiveM, §url[...] et §translate[...]." },
                                { name: "options.description",   type: "string",   required: false, desc: "Texte affiché dans l'encadré du bas quand l'item est sélectionné." },
                                { name: "options.rightLabel",    type: "string",   required: false, desc: "Texte aligné à droite, tronqué avec des points de suspension s'il déborde." },
                                { name: "options.badge",         type: "string",   required: false, desc: "Pastille à droite du label." },
                                { name: "options.badgeColor",    type: "string",   required: false, desc: "purple (défaut), green, red, yellow, blue, orange — ou une table {r,g,b} pour une couleur libre." },
                                { name: "options.searchId",      type: "string",   required: false, desc: "Terme supplémentaire pris en compte par la recherche, en plus du label." },
                                { name: "options.id",            type: "string",   required: false, desc: "Identifiant stable pour cibler l'item avec updateItem() et getItemValue()." },
                                { name: "isDisabled",            type: "boolean",  required: false, desc: "Grise l'item et le rend non sélectionnable. Peut être omis : passez alors les callbacks en 3e position." },
                                { name: "callbacks.onSelected",  type: "function", required: false, desc: "Appelé à la validation (Entrée)." },
                                { name: "callbacks.onHovered",   type: "function", required: false, desc: "Appelé quand le curseur arrive sur l'item." },
                                { name: "callbacks.onUnhovered", type: "function", required: false, desc: "Appelé quand le curseur quitte l'item." },
                                { name: "callbacks.onContextMenu", type: "function", required: false, desc: "Appelé à l'appui sur la touche contextuelle. Sa seule présence affiche l'indicateur de touche sur l'item." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Usage courant",
                                    code: { lang: "lua", content: `addButton('Réparer le véhicule', {\n    description = 'Remet la carrosserie et le moteur à neuf',\n    rightLabel  = '250 €',\n    badge       = 'RAPIDE',\n    badgeColor  = 'green',\n    id          = 'repair',\n}, {\n    onSelected = function()\n        TriggerServerEvent('garage:repair')\n    end\n})` }
                                },
                                {
                                    title: "Sans le paramètre isDisabled",
                                    code: { lang: "lua", content: `-- Les callbacks peuvent occuper la 3e position :\n-- si le 3e argument est une table, il est traité comme callbacks.\naddButton('Fermer', {}, {\n    onSelected = lumenui.close\n})` }
                                },
                                {
                                    title: "Menu contextuel",
                                    code: { lang: "lua", content: `addButton('Sultan RS', { id = 'veh_1' }, {\n    onSelected    = function() SpawnVehicle('sultanrs') end,\n    onContextMenu = function()\n        -- Déclenché par la touche contextKey (\"X\" par défaut)\n        lumenui.render('vehicle_options', buildVehicleOptions)\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Indicateur contextuel", text: "Dès que onContextMenu est défini, la lettre de contextKey apparaît sur l'item et la description est préfixée par « Appuyez sur [X] pour plus d'options »." }
                            ]
                        }
                    ],
                    alerts: []
                },

                addCheckbox: {
                    title: "addCheckbox()",
                    description: "Case à cocher. La valeur bascule côté frontend dès l'appui sur Entrée, puis onSelected reçoit le nouvel état. L'affichage est immédiat, sans aller-retour serveur.",
                    functions: [
                        {
                            name: "addCheckbox",
                            syntax: "addCheckbox(label, checked, options, isDisabled, callbacks)",
                            description: "",
                            parameters: [
                                { name: "label",                type: "string",   required: true,  desc: "Texte affiché." },
                                { name: "checked",              type: "boolean",  required: true,  desc: "État initial de la case." },
                                { name: "options",              type: "table",    required: false, desc: "description, badge, badgeColor, searchId, id — mêmes clés que addButton (rightLabel non pris en charge)." },
                                { name: "isDisabled",           type: "boolean",  required: false, desc: "Grise l'item." },
                                { name: "callbacks.onSelected", type: "function", required: false, desc: "Reçoit le nouvel état booléen." },
                                { name: "callbacks.onHovered",  type: "function", required: false, desc: "Survol." },
                                { name: "callbacks.onUnhovered", type: "function", required: false, desc: "Fin de survol." },
                                { name: "callbacks.onContextMenu", type: "function", required: false, desc: "Touche contextuelle." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Réglage persistant",
                                    code: { lang: "lua", content: `addCheckbox('Afficher le HUD', settings.hud, { id = 'hud' }, {\n    onSelected = function(enabled)\n        settings.hud = enabled\n        SetResourceKvp('hud', enabled and '1' or '0')\n        DisplayHud(enabled)\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Identifiant automatique", text: "Sans options.id, un identifiant interne __auto_checkbox_N est généré pour mémoriser la valeur. Fournissez un id explicite si vous comptez utiliser updateItem() ou getItemValue()." }
                            ]
                        }
                    ],
                    alerts: []
                },

                addList: {
                    title: "addList()",
                    description: "Liste horizontale parcourue avec les flèches gauche/droite, affichée sous la forme « ‹ valeur › ». Le défilement est circulaire : après le dernier élément on revient au premier.",
                    functions: [
                        {
                            name: "addList",
                            syntax: "addList(label, items, default, options, isDisabled, callbacks)",
                            description: "",
                            parameters: [
                                { name: "label",   type: "string", required: true,  desc: "Texte affiché à gauche." },
                                { name: "items",   type: "table",  required: true,  desc: "Tableau de chaînes. Chaque entrée passe par parseTranslate, donc §translate[...] fonctionne." },
                                { name: "default", type: "number", required: false, desc: "Index de départ, en base 1. Défaut : 1. Converti en interne en base 0." },
                                { name: "options", type: "table",  required: false, desc: "description, rightLabel, badge, badgeColor, searchId, id." },
                                { name: "isDisabled", type: "boolean", required: false, desc: "Grise l'item." },
                                { name: "callbacks.onListChange", type: "function", required: false, desc: "Appelé à chaque changement de valeur. Reçoit l'index en base 1." },
                                { name: "callbacks.onSelected",   type: "function", required: false, desc: "Appelé à la validation (Entrée). Reçoit l'index en base 0." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Sélecteur de couleur",
                                    code: { lang: "lua", content: `local colors = { 'Noir', 'Blanc', 'Rouge', 'Bleu' }\n\naddList('Couleur', colors, current, { id = 'color' }, {\n    onListChange = function(index)\n        -- index est en base 1 : colors[index] est directement utilisable\n        current = index\n        SetVehicleColour(veh, index)\n    end,\n    onSelected = function(index0)\n        -- ATTENTION : onSelected reçoit l'index en base 0\n        print('Validé :', colors[index0 + 1])\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "danger",  title: "Deux bases différentes",  text: "onListChange reçoit un index en base 1 (prêt à indexer votre table Lua), mais onSelected reçoit la valeur brute en base 0. Ajoutez 1 dans onSelected. C'est la source d'erreur la plus fréquente avec addList." },
                                { type: "info",    title: "Défilement circulaire",   text: "La flèche gauche sur le premier élément saute au dernier, et inversement. Ce comportement n'est pas désactivable." }
                            ]
                        }
                    ],
                    alerts: []
                },

                addSlider: {
                    title: "addSlider()",
                    description: "Curseur horizontal avec une barre de progression et la valeur affichée en pourcentage. Se règle avec les flèches gauche/droite.",
                    functions: [
                        {
                            name: "addSlider",
                            syntax: "addSlider(label, min, max, default, options, isDisabled, callbacks)",
                            description: "",
                            parameters: [
                                { name: "label",   type: "string", required: true,  desc: "Texte affiché." },
                                { name: "min",     type: "number", required: true,  desc: "Valeur minimale." },
                                { name: "max",     type: "number", required: true,  desc: "Valeur maximale." },
                                { name: "default", type: "number", required: false, desc: "Valeur initiale. Défaut : min." },
                                { name: "options", type: "table",  required: false, desc: "description, rightLabel, badge, badgeColor, searchId, id." },
                                { name: "isDisabled", type: "boolean", required: false, desc: "Grise l'item." },
                                { name: "callbacks.onSliderChange", type: "function", required: false, desc: "Appelé à chaque cran. Reçoit la valeur." },
                                { name: "callbacks.onSelected",     type: "function", required: false, desc: "Appelé à la validation. Reçoit la valeur courante." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Volume",
                                    code: { lang: "lua", content: `addSlider('Volume radio', 0, 100, volume, {\n    id          = 'volume',\n    description = 'Flèches gauche / droite pour régler',\n}, {\n    onSliderChange = function(value)\n        volume = value\n        SetRadioVolume(value / 100.0)\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Pas fixé à 1",           text: "addSlider force step = 1 et ignore options.step. Pour un pas différent, utilisez addStepper()." },
                                { type: "info",    title: "Mise à jour bridée",     text: "updateItem() sur un slider est bridé à un envoi toutes les 100 ms, pour éviter d'inonder la NUI quand la valeur bouge en continu." },
                                { type: "info",    title: "Affichage en pourcent",  text: "La valeur est toujours suivie du signe %. Pour une unité différente, mettez la valeur dans rightLabel et utilisez un stepper." }
                            ]
                        }
                    ],
                    alerts: []
                },

                addStepper: {
                    title: "addStepper()",
                    description: "Compteur avec boutons − et +, réglable aux flèches ou à la souris. Contrairement au slider, le pas est configurable et la valeur est affichée telle quelle, sans pourcentage.",
                    functions: [
                        {
                            name: "addStepper",
                            syntax: "addStepper(label, min, max, default, options, isDisabled, callbacks)",
                            description: "",
                            parameters: [
                                { name: "label",        type: "string", required: true,  desc: "Texte affiché." },
                                { name: "min",          type: "number", required: true,  desc: "Valeur minimale. Le bouton − se grise une fois atteinte." },
                                { name: "max",          type: "number", required: true,  desc: "Valeur maximale. Le bouton + se grise une fois atteinte." },
                                { name: "default",      type: "number", required: false, desc: "Valeur initiale. Défaut : min." },
                                { name: "options.step", type: "number", required: false, desc: "Incrément par cran. Défaut : 1." },
                                { name: "options",      type: "table",  required: false, desc: "Également description, rightLabel, badge, badgeColor, searchId, id." },
                                { name: "isDisabled",   type: "boolean", required: false, desc: "Grise l'item." },
                                { name: "callbacks.onStepperChange", type: "function", required: false, desc: "Appelé à chaque changement. Reçoit la nouvelle valeur." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Quantité par lots de 5",
                                    code: { lang: "lua", content: `addStepper('Quantité', 0, 100, 10, {\n    step        = 5,\n    id          = 'qty',\n    rightLabel  = 'unités',\n    description = 'Quantité à acheter',\n}, {\n    onStepperChange = function(value)\n        quantity = value\n        lumenui.updateItem('total', { rightLabel = (value * 25) .. ' €' })\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Pas de onSelected", text: "Le stepper n'expose pas onSelected. Appuyer sur Entrée dessus ne déclenche rien : seul onStepperChange existe." }
                            ]
                        }
                    ],
                    alerts: []
                },

                addButtonGrid: {
                    title: "addButtonGrid()",
                    description: "Grille de boutons repliable, pratique pour des actions rapides avec icônes. Repliée, elle occupe une ligne ; dépliée, les flèches naviguent entre les boutons et Entrée en déclenche un.",
                    functions: [
                        {
                            name: "addButtonGrid",
                            syntax: "addButtonGrid(label, buttons, options, isDisabled, callbacks)",
                            description: "",
                            parameters: [
                                { name: "label",              type: "string",   required: true,  desc: "Titre de la grille, affiché au-dessus des boutons." },
                                { name: "buttons",            type: "table",    required: true,  desc: "Tableau de boutons : { icon, text, color, disabled, action }." },
                                { name: "buttons[].icon",     type: "string",   required: false, desc: "Emoji, caractère ou §url[...] pour une image." },
                                { name: "buttons[].text",     type: "string",   required: false, desc: "Libellé sous l'icône. Sans texte, le bouton est rendu en mode icône seule." },
                                { name: "buttons[].color",    type: "string",   required: false, desc: "purple, green, red, yellow, blue ou orange." },
                                { name: "buttons[].disabled", type: "boolean",  required: false, desc: "Grise le bouton et bloque son action." },
                                { name: "buttons[].action",   type: "function", required: false, desc: "Fonction appelée au clic ou à Entrée sur ce bouton." },
                                { name: "options.columns",    type: "number",   required: false, desc: "1, 2 ou 3 colonnes. Défaut : 3. Les valeurs hors bornes sont ramenées dans l'intervalle." },
                                { name: "options.isExpanded", type: "boolean",  required: false, desc: "Grille dépliée dès l'affichage. Défaut : false." },
                                { name: "callbacks.onToggle", type: "function", required: false, desc: "Appelé au dépliage/repliage. Reçoit le nouvel état booléen." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Actions rapides",
                                    code: { lang: "lua", content: `addButtonGrid('Actions rapides', {\n    { icon = '🔧', text = 'Réparer', color = 'green',  action = function() RepairVehicle() end },\n    { icon = '⛽', text = 'Essence', color = 'yellow', action = function() Refuel() end },\n    { icon = '🧽', text = 'Laver',   color = 'blue',   action = function() WashVehicle() end },\n    { icon = '🔒', text = 'Ranger',  color = 'red',    action = function() StoreVehicle() end },\n}, {\n    columns    = 3,\n    isExpanded = true,\n    id         = 'quick',\n}, {\n    onToggle = function(expanded)\n        print('Grille', expanded and 'ouverte' or 'fermée')\n    end\n})` }
                                },
                                {
                                    title: "Icônes seules sur deux colonnes",
                                    code: { lang: "lua", content: `addButtonGrid('Émotes', {\n    { icon = '👋', action = function() PlayEmote('wave') end },\n    { icon = '💃', action = function() PlayEmote('dance') end },\n    { icon = '🪑', action = function() PlayEmote('sit') end },\n}, { columns = 2 })` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "canToggle non désactivable", text: "options.canToggle = false n'a pas d'effet : l'expression Lua qui le calcule dans items.lua retombe systématiquement sur true. Toute grille reste donc repliable. À corriger dans une prochaine version." },
                                { type: "warning", title: "Nombre de boutons plafonné", text: "Le frontend n'affiche que colonnes × 4 boutons au maximum, soit 12 en 3 colonnes. Les suivants sont ignorés silencieusement." },
                                { type: "info",    title: "Poids dans la pagination",  text: "Une grille dépliée compte pour 0,5 + (lignes × 1 à 2) items selon le nombre de colonnes. Une grande grille peut donc remplir toute la page à elle seule." },
                                { type: "info",    title: "Navigation",                text: "Entrée déplie la grille, puis Entrée à nouveau entre dedans. Flèche droite entre directement si elle est déjà dépliée, flèche gauche la referme, RETOUR ARRIÈRE en sort." }
                            ]
                        }
                    ],
                    alerts: []
                },

                addSeparator: {
                    title: "addSeparator() / addLine()",
                    description: "Éléments décoratifs non sélectionnables. Le curseur les saute automatiquement et ils sont exclus de la recherche comme du compteur d'items.",
                    functions: [
                        {
                            name: "addSeparator",
                            syntax: "addSeparator(label)",
                            description: "Sans argument, insère un espace vide. Avec un label, insère un titre de section.",
                            parameters: [
                                { name: "label", type: "string", required: false, desc: "Titre de section. Si absent, séparateur vide." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Structurer un menu",
                                    code: { lang: "lua", content: `addSeparator('Véhicule')\naddButton('Réparer', {}, { onSelected = Repair })\naddButton('Nettoyer', {}, { onSelected = Wash })\n\naddSeparator()          -- espace simple\n\naddSeparator('Joueur')\naddCheckbox('God mode', false, {}, { onSelected = SetGod })` }
                                }
                            ],
                            alerts: []
                        },
                        {
                            name: "addLine",
                            syntax: "addLine()",
                            description: "Trait horizontal fin. Plus discret qu'un séparateur, et plus léger dans la pagination.",
                            parameters: [],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Poids dans la pagination",
                                    code: { lang: "lua", content: `-- Coût en « items » pour le calcul de la page :\n--   addLine()             → 0,3\n--   addSeparator()        → 0,5\n--   addSeparator('Titre') → 1,0\n--   item normal           → 1,0\n\naddLine()` }
                                }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                updateItem: {
                    title: "updateItem()",
                    description: "Modifie un seul item du menu ouvert sans reconstruire tout le menu. C'est la méthode à privilégier pour un compteur, un prix ou un état qui change souvent.",
                    functions: [
                        {
                            name: "lumenui.updateItem",
                            syntax: "lumenui.updateItem(identifier, data)",
                            description: "",
                            parameters: [
                                { name: "identifier", type: "string | number", required: true, desc: "L'id déclaré dans options.id, ou un index numérique en base 1 comptant uniquement les items sélectionnables (séparateurs et traits exclus)." },
                                { name: "data",       type: "table",           required: true, desc: "Champs à écraser : label, description, rightLabel, badge, badgeColor, value, listItems, min, max, step, disabled, isExpanded, buttons…" }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Mise à jour ciblée par id",
                                    code: { lang: "lua", content: `-- L'item doit avoir été créé avec options.id = 'money'\naddButton('Solde', { id = 'money', rightLabel = '0 €' })\n\n-- Plus tard, sans re-render :\nlumenui.updateItem('money', {\n    rightLabel = money .. ' €',\n    badge      = money < 0 and 'DÉCOUVERT' or nil,\n    badgeColor = 'red',\n})` }
                                },
                                {
                                    title: "Activer / désactiver dynamiquement",
                                    code: { lang: "lua", content: `lumenui.updateItem('repair', {\n    disabled    = money < 250,\n    description = money < 250 and 'Fonds insuffisants' or 'Réparation complète',\n})` }
                                },
                                {
                                    title: "Par index numérique",
                                    code: { lang: "lua", content: `-- L'index ignore séparateurs et traits :\naddSeparator('Section')   -- non compté\naddButton('Premier')      -- index 1\naddLine()                 -- non compté\naddButton('Deuxième')     -- index 2\n\nlumenui.updateItem(2, { rightLabel = 'OK' })` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Menu ouvert requis",     text: "updateItem agit sur currentItems, la liste construite par le dernier render(). Sans menu ouvert, l'item est introuvable et un avertissement est journalisé." },
                                { type: "info",    title: "Sliders bridés",         text: "Sur un slider, les mises à jour sont regroupées et envoyées au plus toutes les 100 ms. Seule la dernière valeur de la fenêtre est transmise." },
                                { type: "info",    title: "isExpanded préservé",    text: "Sur une grille de boutons, l'état déplié/replié est conservé si data.isExpanded n'est pas fourni explicitement." }
                            ]
                        }
                    ],
                    alerts: []
                },

                getItemValue: {
                    title: "getItemValue()",
                    description: "Lit une propriété d'un item du menu ouvert à partir de son id. Pratique pour récupérer l'état d'une case à cocher ou la position d'une liste au moment de valider un formulaire.",
                    functions: [
                        {
                            name: "lumenui.getItemValue",
                            syntax: "local v = lumenui.getItemValue(itemId, returnType)",
                            description: "",
                            parameters: [
                                { name: "itemId",     type: "string", required: true,  desc: "L'id déclaré dans options.id. Les identifiants générés automatiquement ne sont pas exposés." },
                                { name: "returnType", type: "string", required: false, desc: "\"value\", \"label\", \"rightLabel\", \"description\", \"badge\" ou \"all\". Sans argument, retourne value, sinon badge, sinon label." }
                            ],
                            returns: "any — la propriété demandée, ou nil si l'item est introuvable. Avec \"all\", la table complète de l'item.",
                            examples: [
                                {
                                    title: "Relire un formulaire de menu",
                                    code: { lang: "lua", content: `lumenui.render('config', function()\n    addCheckbox('Notifications', true,  { id = 'notif' })\n    addCheckbox('Sons',          false, { id = 'sound' })\n    addSlider('Volume', 0, 100, 50,     { id = 'vol'   })\n\n    addButton('Enregistrer', {}, {\n        onSelected = function()\n            TriggerServerEvent('settings:save', {\n                notif  = lumenui.getItemValue('notif', 'value'),\n                sound  = lumenui.getItemValue('sound', 'value'),\n                volume = lumenui.getItemValue('vol',   'value'),\n            })\n        end\n    })\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Non exporté",     text: "getItemValue n'est pas déclaré dans export.lua. Il n'est donc accessible que dans une ressource qui inclut @lumen-ui/init.lua, pas via exports['lumen-ui']." },
                                { type: "info",    title: "id obligatoire",  text: "Sans options.id à la création, l'item reçoit un identifiant interne inaccessible. Déclarez toujours un id sur les items que vous comptez relire." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  BOÎTES DE SAISIE
                // ══════════════════════════════════════════════════════

                showInput: {
                    title: "showInput()",
                    description: "Ouvre une boîte de saisie modale au centre de l'écran. Le curseur souris est activé pendant l'affichage, puis rendu au menu s'il y en avait un. Le callback reçoit les valeurs dans l'ordre des champs.",
                    functions: [
                        {
                            name: "lumenui.showInput",
                            syntax: "lumenui.showInput(title, inputs, callback, options)",
                            description: "Signature alternative acceptée : showInput(inputs, callback, options), sans titre.",
                            parameters: [
                                { name: "title",         type: "string",   required: false, desc: "Titre de la boîte. Défaut : espace vide." },
                                { name: "inputs",        type: "table",    required: true,  desc: "Tableau de définitions de champs. Voir « Types de champs »." },
                                { name: "callback",      type: "function", required: true,  desc: "callback(success, values). success vaut true à la validation, false à l'annulation." },
                                { name: "options.color", type: "string",   required: false, desc: "Couleur d'accent de la boîte : titre, bordure, bouton de validation et focus des champs." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Formulaire simple",
                                    code: { lang: "lua", content: `lumenui.showInput('Nouveau véhicule', {\n    { type = 'text',   label = 'Modèle',        placeholder = 'sultanrs', required = true },\n    { type = 'text',   label = 'Plaque',        placeholder = 'ABC 123',  pattern = '^[A-Z0-9 ]{1,8}$',\n      errorMessage = 'Lettres majuscules et chiffres uniquement' },\n    { type = 'number', label = 'Prix', default = 15000, min = 0, max = 999999 },\n}, function(success, values)\n    if not success then return end\n\n    local model, plate, price = values[1], values[2], tonumber(values[3])\n    TriggerServerEvent('garage:add', model, plate, price)\nend, { color = '#22C55E' })` }
                                },
                                {
                                    title: "Depuis un item de menu",
                                    code: { lang: "lua", content: `addButton('Renommer', {}, {\n    onSelected = function()\n        lumenui.showInput('Renommer', {\n            { type = 'text', label = 'Nouveau nom', default = currentName, required = true },\n        }, function(ok, values)\n            if ok then\n                currentName = values[1]\n                -- Le focus revient automatiquement au menu\n                lumenui.updateItem('name', { rightLabel = currentName })\n            end\n        end)\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Ordre des valeurs",    text: "values est un tableau dans l'ordre de déclaration, en sautant les champs structurels separator et line. Le premier champ réel est values[1]." },
                                { type: "info",    title: "Toujours des chaînes", text: "Sauf pour checkbox qui renvoie un booléen, toutes les valeurs arrivent en chaîne de caractères. Convertissez avec tonumber() si nécessaire." },
                                { type: "warning", title: "Focus rendu avant le callback", text: "Le focus NUI est restauré AVANT l'exécution de votre callback, et celui-ci est protégé par pcall. Une erreur dedans ne laisse donc jamais le curseur bloqué à l'écran." },
                                { type: "info",    title: "ÉCHAP annule",         text: "ÉCHAP ferme la boîte et appelle le callback avec success = false, même si aucun menu n'est ouvert." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "input-fields": {
                    title: "Types de champs",
                    description: "Onze types de champs sont disponibles. Chaque définition est une table dans le tableau inputs de showInput().",
                    functions: [
                        {
                            name: "Champs texte",
                            syntax: "{ type = 'text' | 'number' | 'password' | 'textarea', … }",
                            description: "Saisie libre. Le premier champ texte de la boîte reçoit le focus automatiquement.",
                            parameters: [
                                { name: "label",        type: "string",  required: false, desc: "Libellé au-dessus du champ." },
                                { name: "placeholder",  type: "string",  required: false, desc: "Texte indicatif dans le champ vide." },
                                { name: "default",      type: "string",  required: false, desc: "Valeur pré-remplie. Sélectionnée automatiquement à l'ouverture." },
                                { name: "required",     type: "boolean", required: false, desc: "Refuse la validation si le champ est vide." },
                                { name: "pattern",      type: "string",  required: false, desc: "Expression régulière JavaScript de validation." },
                                { name: "errorMessage", type: "string",  required: false, desc: "Message affiché si le pattern échoue. Défaut : « Format invalide »." },
                                { name: "min / max",    type: "number",  required: false, desc: "Sur text et textarea : longueur minimale et maximale. Sur number : bornes numériques du champ." }
                            ],
                            returns: "string",
                            examples: [
                                {
                                    title: "Les quatre variantes",
                                    code: { lang: "lua", content: `{ type = 'text',     label = 'Pseudo',  min = 3, max = 16, required = true },\n{ type = 'number',   label = 'Montant', min = 1, max = 5000, default = 100 },\n{ type = 'password', label = 'Code',    pattern = '^\\\\d{4}$', errorMessage = '4 chiffres' },\n{ type = 'textarea', label = 'Motif',   max = 500, placeholder = 'Décrivez la situation…' },` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "min/max ambivalents", text: "Sur text et textarea, min et max comptent des caractères. Sur number, ce sont les bornes de valeur. La validation de longueur n'est appliquée qu'aux types text et textarea." }
                            ]
                        },
                        {
                            name: "Listes déroulantes",
                            syntax: "{ type = 'select' | 'multiselect', options = { … } }",
                            description: "select renvoie une seule valeur, multiselect renvoie un tableau JSON encodé en chaîne.",
                            parameters: [
                                { name: "options", type: "table",         required: true,  desc: "Tableau de chaînes, ou de tables { value = 'v', label = 'Libellé' }. Les libellés passent par parseTranslate." },
                                { name: "default", type: "number|string", required: false, desc: "Sur select : un index de base 1 ou directement une valeur. Sur multiselect : un tableau de valeurs pré-cochées." }
                            ],
                            returns: "select → string · multiselect → string JSON",
                            examples: [
                                {
                                    title: "Select et multiselect",
                                    code: { lang: "lua", content: `lumenui.showInput('Sanction', {\n    { type = 'select', label = 'Type', default = 1, options = {\n        { value = 'warn', label = 'Avertissement' },\n        { value = 'kick', label = 'Expulsion' },\n        { value = 'ban',  label = 'Bannissement' },\n    }},\n    { type = 'multiselect', label = 'Motifs', default = { 'rdm' }, options = {\n        { value = 'rdm',   label = 'RDM' },\n        { value = 'vdm',   label = 'VDM' },\n        { value = 'fail',  label = 'Fail RP' },\n    }},\n}, function(ok, values)\n    if not ok then return end\n\n    local kind   = values[1]              -- 'warn' | 'kick' | 'ban'\n    local motifs = json.decode(values[2]) -- { 'rdm', 'vdm' }\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "multiselect à décoder", text: "La valeur arrive sous forme de chaîne JSON, par exemple [\"rdm\",\"vdm\"]. Passez-la à json.decode() pour obtenir une table Lua." },
                                { type: "info",    title: "required inopérant",    text: "Sur un multiselect vide, la valeur transmise est la chaîne \"[]\", qui n'est pas vide. required ne bloque donc pas la validation ; vérifiez vous-même la longueur après décodage." }
                            ]
                        },
                        {
                            name: "Case à cocher",
                            syntax: "{ type = 'checkbox', label = '…', description = '…' }",
                            description: "Renvoie un vrai booléen, pas une chaîne. Le champ description sert de texte cliquable à droite de la case.",
                            parameters: [
                                { name: "default",     type: "boolean", required: false, desc: "Coché au départ si true ou 1." },
                                { name: "description", type: "string",  required: false, desc: "Texte affiché à côté de la case." }
                            ],
                            returns: "boolean",
                            examples: [
                                { title: "Confirmation", code: { lang: "lua", content: `{ type = 'checkbox', label = 'Conditions',\n  description = 'J\\'accepte le règlement du serveur', default = false },` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "Sélecteur de couleur",
                            syntax: "{ type = 'color', format = 'rgb' | 'rgba' | 'hex' | 'hexa' | 'hsl' | 'hsla' | 'all' }",
                            description: "Palette teinte/saturation/valeur avec barre de teinte, aperçu et champs numériques éditables. Le format détermine à la fois les champs affichés et le format de la valeur retournée.",
                            parameters: [
                                { name: "default", type: "string", required: false, desc: "Couleur initiale : hex, rgb(), hsl() ou \"r, g, b\". Défaut : #8B5CF6." },
                                { name: "format",  type: "string", required: false, desc: "rgb (défaut), rgba, hex, hexa, hsl, hsla, ou all pour un objet JSON complet." }
                            ],
                            returns: "string — au format demandé. Avec all : JSON { r, g, b, hsl, hex }.",
                            examples: [
                                {
                                    title: "Couleur de véhicule",
                                    code: { lang: "lua", content: `lumenui.showInput('Peinture', {\n    { type = 'color', label = 'Couleur', format = 'all', default = '#FF0000' },\n}, function(ok, values)\n    if not ok then return end\n\n    local c = json.decode(values[1])\n    SetVehicleCustomPrimaryColour(veh, c.r, c.g, c.b)\n    print(c.hex, c.hsl)\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Champs affichés", text: "format = 'rgb' n'affiche que le champ RGB, 'hex' que le champ hexadécimal, et 'all' affiche les trois (RGB, HEX, HSL) simultanément." }
                            ]
                        },
                        {
                            name: "Sélecteur de date",
                            syntax: "{ type = 'date', format = 'DD/MM/YYYY' }",
                            description: "Champ texte doublé d'un calendrier mensuel. La date peut être tapée à la main ou choisie dans la grille. L'année est éditable en cliquant dessus.",
                            parameters: [
                                { name: "default", type: "string", required: false, desc: "Date initiale interprétable par Date(). Défaut : aujourd'hui." },
                                { name: "format",  type: "string", required: false, desc: "Format d'affichage : DD/MM/YYYY (défaut), MM/DD/YYYY, YYYY-MM-DD, DD-MM-YYYY ou YYYY/MM/DD." },
                                { name: "min / max", type: "string", required: false, desc: "Bornes de sélection. Les jours hors intervalle sont grisés et non cliquables." }
                            ],
                            returns: "string — toujours au format ISO YYYY-MM-DD, quel que soit le format d'affichage.",
                            examples: [
                                {
                                    title: "Date de rendez-vous",
                                    code: { lang: "lua", content: `lumenui.showInput('Rendez-vous', {\n    { type = 'date', label = 'Date', format = 'DD/MM/YYYY',\n      min = '2026-01-01', max = '2026-12-31' },\n}, function(ok, values)\n    if ok then\n        print(values[1])   -- '2026-06-15'\n    end\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Retour normalisé", text: "Le format ne change que l'affichage. La valeur transmise à votre callback est toujours en YYYY-MM-DD, directement utilisable en SQL." }
                            ]
                        },
                        {
                            name: "Éléments structurels",
                            syntax: "{ type = 'separator', label = '…' } · { type = 'line' }",
                            description: "Mise en page uniquement. Ces champs ne produisent aucune valeur et décalent donc l'indexation du tableau values.",
                            parameters: [],
                            returns: "aucune valeur",
                            examples: [
                                {
                                    title: "Attention au décalage d'index",
                                    code: { lang: "lua", content: `lumenui.showInput('Profil', {\n    { type = 'separator', label = 'Identité' },   -- pas de valeur\n    { type = 'text', label = 'Prénom' },          -- values[1]\n    { type = 'text', label = 'Nom' },             -- values[2]\n    { type = 'line' },                            -- pas de valeur\n    { type = 'text', label = 'Téléphone' },       -- values[3]\n}, function(ok, values) end)` }
                                }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                closeInput: {
                    title: "closeInput()",
                    description: "Ferme la boîte de saisie ouverte depuis le code. Le callback est invoqué avec success = false, comme une annulation par le joueur.",
                    functions: [
                        {
                            name: "lumenui.closeInput",
                            syntax: "lumenui.closeInput()",
                            description: "",
                            parameters: [],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Annuler sur un événement extérieur",
                                    code: { lang: "lua", content: `RegisterNetEvent('shop:closed')\nAddEventHandler('shop:closed', function()\n    -- Le magasin ferme : annuler la saisie en cours\n    lumenui.closeInput()\nend)` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Sans effet si rien n'est ouvert", text: "closeInput() sort immédiatement si aucun callback de saisie n'est enregistré. L'appel est donc toujours sûr." },
                                { type: "info", title: "Restauration du focus",           text: "Si un menu était ouvert derrière, le focus clavier lui est rendu. Sinon, le focus est intégralement libéré." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  MENU LISTE
                // ══════════════════════════════════════════════════════

                showListMenu: {
                    title: "showListMenu()",
                    description: "Panneau latéral piloté à la souris, adapté aux longues listes riches : véhicules, joueurs, propriétés. Chaque entrée peut porter une icône, un badge, des tags et des lignes d'information.",
                    functions: [
                        {
                            name: "lumenui.showListMenu",
                            syntax: "local ok = lumenui.showListMenu(title, items, callback, options)",
                            description: "Signature alternative acceptée : showListMenu(items, callback, options), le titre étant alors lu dans options.title.",
                            parameters: [
                                { name: "title",              type: "string",   required: false, desc: "Titre du panneau." },
                                { name: "items",              type: "table",    required: true,  desc: "Tableau d'entrées. Voir les champs plus bas." },
                                { name: "callback",           type: "function", required: true,  desc: "callback(itemIndex, item). itemIndex est en base 1." },
                                { name: "options.id",         type: "string",   required: false, desc: "Enregistre le menu dans le registre pour pouvoir le mettre à jour ou le supprimer plus tard." },
                                { name: "options.subtitle",   type: "string",   required: false, desc: "Sous-titre sous le titre." },
                                { name: "options.search",     type: "boolean",  required: false, desc: "Affiche la barre de recherche. Filtre sur label, description, tags et lines." },
                                { name: "options.color",      type: "string",   required: false, desc: "Couleur d'accent : en-tête, survol, badges et barre de défilement." },
                                { name: "options.goBack",     type: "function", required: false, desc: "Affiche un bouton ← et appelle cette fonction au clic." },
                                { name: "options.onExit",     type: "function", required: false, desc: "Appelé quand le joueur ferme via ✕ ou en cliquant hors du panneau." },
                                { name: "options.onHovered",  type: "function", required: false, desc: "Survol d'une entrée. Reçoit (itemIndex, item)." },
                                { name: "options.onUnhovered", type: "function", required: false, desc: "Fin de survol. Reçoit (itemIndex, item)." }
                            ],
                            returns: "boolean — false si un menu classique est déjà ouvert dans cette VM.",
                            examples: [
                                {
                                    title: "Liste de véhicules",
                                    code: { lang: "lua", content: `local items = {}\n\nfor _, v in ipairs(myVehicles) do\n    table.insert(items, {\n        label       = v.name,\n        description = v.garage,\n        icon        = v.stored and '🅿️' or '🚗',\n        badge       = v.stored and 'RANGÉ' or 'SORTI',\n        badgeColor  = v.stored and 'green' or 'orange',\n        color       = v.impounded and 'red' or nil,\n        tags        = { 'Modèle : ' .. v.model, 'Plaque : ' .. v.plate },\n        lines       = { '💰 ' .. v.price .. ' €', '⛽ ' .. v.fuel .. ' %' },\n        disabled    = v.impounded,\n    })\nend\n\nlumenui.showListMenu('Mes véhicules', items, function(index, item)\n    local vehicle = myVehicles[index]\n    SpawnVehicle(vehicle)\nend, {\n    id       = 'vehicles',\n    subtitle = #items .. ' véhicule(s)',\n    search   = true,\n    color    = '#3B82F6',\n    goBack   = function() openMainMenu() end,\n    onExit   = function() print('Panneau fermé') end,\n})` }
                                },
                                {
                                    title: "Champs d'une entrée",
                                    code: { lang: "lua", content: `{\n    label       = 'Sultan RS',            -- titre de la ligne\n    description = 'Garage central',       -- seconde ligne, plus discrète\n    icon        = '🚗',                   -- emoji, ou §url[https://…] pour une image\n    badge       = 'VIP',                  -- pastille à droite du label\n    badgeColor  = 'purple',               -- purple green red yellow blue gray orange\n                                          -- teal pink white black indigo cyan\n                                          -- ou une couleur libre : '#FF6B6B'\n    color       = 'green',                -- liseré gauche : green red blue yellow gray\n    tags        = { 'Modèle : m5' },      -- puces compactes\n    lines       = { '💰 750 €' },         -- lignes d'information\n    disabled    = false,                  -- non cliquable et grisé\n    close       = true,                   -- false pour garder le panneau ouvert au clic\n}\n\n-- Séparateur visuel :\n{ type = 'separator' }   -- ou { separator = true }` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Exclusif du menu classique", text: "showListMenu retourne false si un menu classique est ouvert dans la même VM, et render() est bloqué dans l'autre sens. Fermez l'un avant d'ouvrir l'autre." },
                                { type: "info",    title: "Fermeture au clic",          text: "Par défaut, cliquer sur une entrée ferme le panneau. Mettez close = false sur l'entrée pour le garder ouvert, par exemple pour une liste d'actions répétables." },
                                { type: "info",    title: "Curseur souris",             text: "Le panneau active le curseur (SetNuiFocus(true, true)). Le joueur ne peut donc pas se déplacer tant qu'il est ouvert." },
                                { type: "info",    title: "Index en base 1",            text: "callback(index, item) reçoit un index en base 1 qui correspond directement à votre table items, séparateurs compris." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "listmenu-registry": {
                    title: "Registre des menus liste",
                    description: "Passer options.id à showListMenu enregistre la définition et débloque six fonctions de gestion. Sans id, le menu est éphémère et n'apparaît pas dans le registre.",
                    functions: [
                        {
                            name: "lumenui.closeListMenu",
                            syntax: "lumenui.closeListMenu()",
                            description: "Ferme le panneau ouvert et libère le focus. Ne déclenche pas onExit.",
                            parameters: [],
                            returns: "nil",
                            examples: [
                                { title: "Fermeture programmée", code: { lang: "lua", content: `lumenui.closeListMenu()\nlumenui.render('main', buildMain)   -- possible seulement après fermeture` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "lumenui.updateListMenu",
                            syntax: "lumenui.updateListMenu(id, updates)",
                            description: "Met à jour la définition enregistrée : title, subtitle, items, search, color. Le panneau est redessiné s'il est ouvert.",
                            parameters: [
                                { name: "id",      type: "string", required: true, desc: "Identifiant fourni dans options.id." },
                                { name: "updates", type: "table",  required: true, desc: "Champs à remplacer." }
                            ],
                            returns: "boolean",
                            examples: [
                                { title: "Rafraîchir la liste", code: { lang: "lua", content: `lumenui.updateListMenu('vehicles', {\n    items    = buildVehicleItems(),\n    subtitle = #myVehicles .. ' véhicule(s)',\n})` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "Consultation",
                            syntax: "getOpenListMenu() · isListMenuOpen(id) · listListMenus() · getListMenuProperties(id) · deleteListMenu(id)",
                            description: "Mêmes conventions que leurs équivalents pour les menus classiques.",
                            parameters: [
                                { name: "getOpenListMenu",       type: "→ string|nil", desc: "Identifiant du panneau ouvert, ou \"__ephemeral__\" si ouvert sans id, ou nil." },
                                { name: "isListMenuOpen",        type: "→ boolean",    desc: "Vrai si ce panneau précis est ouvert." },
                                { name: "listListMenus",         type: "→ table",      desc: "Identifiants enregistrés dans le registre." },
                                { name: "getListMenuProperties", type: "→ table|nil",  desc: "Copie de la définition enregistrée." },
                                { name: "deleteListMenu",        type: "→ boolean",    desc: "Retire la définition du registre." }
                            ],
                            returns: "",
                            examples: [
                                { title: "Vérification avant ouverture", code: { lang: "lua", content: `if lumenui.getOpenListMenu() then\n    lumenui.closeListMenu()\nend\n\nlumenui.showListMenu('Joueurs', items, onPick, { id = 'players' })` } }
                            ],
                            alerts: [
                                { type: "info", title: "Menus éphémères", text: "Un panneau ouvert sans options.id est identifié en interne par \"__ephemeral__\". Il fonctionne normalement mais reste invisible pour listListMenus et updateListMenu." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  OVERLAYS
                // ══════════════════════════════════════════════════════

                showHelpNotification: {
                    title: "showHelpNotification()",
                    description: "Encadré discret en haut à gauche, indépendant des menus. Les jetons ~INPUT_XXX~ y sont convertis en badges clavier lisibles. La notification se masque automatiquement pendant qu'un menu lumen-ui est affiché.",
                    functions: [
                        {
                            name: "lumenui.showHelpNotification",
                            syntax: "lumenui.showHelpNotification(text, options)",
                            description: "",
                            parameters: [
                                { name: "text",          type: "string", required: true,  desc: "Message. Accepte les couleurs FiveM, ~h~ pour le gras, ~n~ ou \\n pour un saut de ligne, et ~INPUT_XXX~ pour un badge de touche." },
                                { name: "options.color", type: "string", required: false, desc: "Couleur CSS du liseré gauche et de la barre de progression." },
                                { name: "options.time",  type: "number", required: false, desc: "nil ou absent : permanent, à masquer manuellement. 0 : mode boucle, se masque seul si l'appel n'est pas répété sous 600 ms. N : disparaît après N millisecondes avec une barre de progression." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Les trois modes",
                                    code: { lang: "lua", content: `-- Permanent : reste jusqu'à hideHelpNotification()\nlumenui.showHelpNotification('Appuyez sur ~INPUT_CONTEXT~ pour interagir')\n\n-- Auto-dismiss après 4 secondes, avec barre de progression\nlumenui.showHelpNotification('~g~Véhicule réparé~s~', { time = 4000, color = '#22C55E' })\n\n-- Mode boucle : idéal dans un CreateThread de zone\nCreateThread(function()\n    while true do\n        Wait(0)\n        if IsNearShop() then\n            lumenui.showHelpNotification('~INPUT_CONTEXT~ Ouvrir la boutique', { time = 0 })\n        else\n            Wait(500)\n        end\n    end\nend)` }
                                },
                                {
                                    title: "Mise en forme",
                                    code: { lang: "lua", content: `lumenui.showHelpNotification(\n    '~h~Braquage en cours~s~~n~' ..\n    '~INPUT_FRONTEND_ACCEPT~ Continuer   ~INPUT_FRONTEND_CANCEL~ Abandonner~n~' ..\n    'Temps restant : ~y~2:30~s~',\n    { color = '#EF4444' }\n)` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Masquée par les menus",  text: "La notification est automatiquement cachée tant qu'un menu lumen-ui est visible, pour éviter la superposition. Elle réapparaît à la fermeture." },
                                { type: "warning", title: "Mode boucle à 0",        text: "Avec time = 0, la notification s'efface d'elle-même après 600 ms sans nouvel appel. Appelez-la depuis une boucle Wait(0), sinon elle clignotera." },
                                { type: "info",    title: "Touches non bindées",    text: "Certains contrôles n'ont pas d'équivalent clavier PC documenté. Leur jeton est alors simplement retiré du texte, sans badge vide." }
                            ]
                        },
                        {
                            name: "lumenui.hideHelpNotification",
                            syntax: "lumenui.hideHelpNotification()",
                            description: "Masque immédiatement la notification, quel que soit son mode.",
                            parameters: [],
                            returns: "nil",
                            examples: [
                                { title: "Sortie de zone", code: { lang: "lua", content: `if not IsNearShop() and wasNear then\n    lumenui.hideHelpNotification()\n    wasNear = false\nend` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: [
                        { type: "info", title: "Alias globaux", text: "ShowHelpNotification(text, options) et HideHelpNotification() sont également disponibles comme fonctions globales, sans préfixe lumenui." }
                    ]
                },

                showInstructionalButtons: {
                    title: "showInstructionalButtons()",
                    description: "Barre de touches façon GTA V, en NUI et au style lumen-ui. Les badges utilisent la même table de correspondance que les notifications d'aide : ~INPUT_FRONTEND_ACCEPT~ affiche « Enter » dans les deux composants.",
                    functions: [
                        {
                            name: "lumenui.showInstructionalButtons",
                            syntax: "lumenui.showInstructionalButtons(buttons, options)",
                            description: "",
                            parameters: [
                                { name: "buttons[].key",      type: "string",  required: false, desc: "Une touche : jeton ~INPUT_XXX~, nom brut INPUT_XXX, ou libellé direct comme \"E\"." },
                                { name: "buttons[].keys",     type: "table",   required: false, desc: "Plusieurs touches regroupées dans une même entrée, par exemple les flèches haut et bas." },
                                { name: "buttons[].join",     type: "string",  required: false, desc: "Séparateur entre touches groupées. Défaut : \"/\"." },
                                { name: "buttons[].label",    type: "string",  required: false, desc: "Libellé de l'action. Accepte les couleurs FiveM et les badges ~INPUT_XXX~ en ligne." },
                                { name: "buttons[].disabled", type: "boolean", required: false, desc: "Affiche l'entrée en transparence." },
                                { name: "buttons[].color",    type: "string",  required: false, desc: "Couleur du badge pour cette entrée uniquement." },
                                { name: "buttons[].divider",  type: "boolean", required: false, desc: "Insère un séparateur vertical au lieu d'une entrée." },
                                { name: "options.color",      type: "string",  required: false, desc: "Couleur d'accent de la barre : bordure et séparateurs. Défaut : violet." },
                                { name: "options.position",   type: "string",  required: false, desc: "bottom-right (défaut), bottom-left, bottom-center, top-right ou top-left." },
                                { name: "options.background", type: "boolean", required: false, desc: "Fond sombre derrière la barre. Défaut : true. À false, une ombre portée garde le texte lisible." },
                                { name: "options.hideWithMenu", type: "boolean", required: false, desc: "Masque la barre quand un menu lumen-ui est ouvert. Défaut : false — la barre reste visible, c'est son usage principal." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Barre standard",
                                    code: { lang: "lua", content: `lumenui.showInstructionalButtons({\n    { keys = { '~INPUT_FRONTEND_UP~', '~INPUT_FRONTEND_DOWN~' }, label = 'Naviguer' },\n    { key  = '~INPUT_FRONTEND_ACCEPT~', label = 'Valider' },\n    { divider = true },\n    { key  = 'E', label = '~g~Interagir~s~' },\n    { key  = '~INPUT_FRONTEND_CANCEL~', label = 'Retour', disabled = true },\n}, {\n    color    = '#8B5CF6',\n    position = 'bottom-right',\n})` }
                                },
                                {
                                    title: "Mettre à jour sans tout renvoyer",
                                    code: { lang: "lua", content: `-- buttons = nil : seules les options changent\nlumenui.updateInstructionalButtons(nil, { position = 'bottom-center' })\n\n-- Remplacer uniquement la liste\nlumenui.updateInstructionalButtons({\n    { key = '~INPUT_FRONTEND_CANCEL~', label = 'Quitter' },\n})\n\nlumenui.hideInstructionalButtons()` }
                                },
                                {
                                    title: "Accompagner un menu",
                                    code: { lang: "lua", content: `lumenui.render('garage', function()\n    -- … items …\n\n    onClosed(function()\n        lumenui.hideInstructionalButtons()\n    end)\nend)\n\nlumenui.showInstructionalButtons({\n    { keys = { '~INPUT_FRONTEND_UP~', '~INPUT_FRONTEND_DOWN~' }, label = 'Naviguer' },\n    { key = '~INPUT_FRONTEND_ACCEPT~', label = 'Choisir' },\n    { key = '~INPUT_FRONTEND_CANCEL~', label = 'Fermer' },\n})` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Touches sans binding PC", text: "Un contrôle documenté comme non bindé sur PC voit son badge supprimé plutôt que rendu vide. Le libellé de l'action, lui, reste affiché." },
                                { type: "info", title: "Superposition",           text: "La barre est placée sous le menu et sous la notification d'aide dans l'ordre d'empilement. Elle ne masque jamais l'un ni l'autre." },
                                { type: "info", title: "Alias globaux",           text: "ShowInstructionalButtons, UpdateInstructionalButtons et HideInstructionalButtons existent aussi en globales, comme pour les notifications d'aide." }
                            ]
                        }
                    ],
                    alerts: []
                },

                showMedia: {
                    title: "showMedia()",
                    description: "Affiche une image ou une vidéo à côté du menu. La position s'ajuste automatiquement selon ce qui est ouvert : menu classique, menu liste, ou rien.",
                    functions: [
                        {
                            name: "lumenui.showMedia",
                            syntax: "lumenui.showMedia(options, url)",
                            description: "Signature alternative acceptée : showMedia(url), avec les options par défaut.",
                            parameters: [
                                { name: "url",             type: "string",  required: true,  desc: "URL de l'image, de la vidéo ou de la page du fournisseur." },
                                { name: "options.type",    type: "string",  required: false, desc: "auto (défaut), image, video, youtube, dailymotion, vimeo, twitter, twitch ou sibnet. En auto, le type est déduit de l'URL puis de l'extension." },
                                { name: "options.width",   type: "number",  required: false, desc: "Largeur en pixels. Défaut : 300." },
                                { name: "options.height",  type: "number",  required: false, desc: "Hauteur en pixels, ou \"auto\" pour un ratio 16:9 déduit de la largeur. Défaut : auto." },
                                { name: "options.volume",  type: "number",  required: false, desc: "Volume de 0 à 1 pour les vidéos. Défaut : 0.5. La valeur 0 coupe le son des lecteurs intégrés." },
                                { name: "options.loop",    type: "boolean", required: false, desc: "Lecture en boucle. Défaut : true." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Aperçu de véhicule dans un menu",
                                    code: { lang: "lua", content: `addButton('Sultan RS', {}, {\n    onHovered = function()\n        lumenui.showMedia({ width = 380 }, 'https://exemple.com/sultanrs.png')\n    end,\n    onUnhovered = function()\n        lumenui.hideMedia()\n    end,\n})` }
                                },
                                {
                                    title: "Vidéo et lecteurs intégrés",
                                    code: { lang: "lua", content: `-- Vidéo locale ou distante\nlumenui.showMedia({ width = 400, volume = 0.3, loop = true },\n    'https://exemple.com/tuto.mp4')\n\n-- YouTube : autoplay, coupé si volume = 0\nlumenui.showMedia({ width = 480, volume = 0 },\n    'https://youtu.be/dQw4w9WgXcQ')\n\n-- Ajuster sans changer la source\nlumenui.updateMedia({ width = 500, volume = 0.8 })\n\nlumenui.hideMedia()` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Positionnement automatique", text: "Le média se place à droite du menu classique (340 ou 450 px selon la largeur), à droite du panneau liste, ou en haut à gauche si rien n'est ouvert." },
                                { type: "warning", title: "Ressources externes",        text: "Les lecteurs intégrés chargent des scripts distants dans la NUI. Ils demandent une connexion, et Twitch exige un domaine parent valide, ce qui ne fonctionne pas toujours en jeu." },
                                { type: "info",    title: "Images plafonnées",          text: "Les images sont contraintes à 500 × 500 px avec conservation du ratio, quelle que soit la largeur demandée." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  LANGUES
                // ══════════════════════════════════════════════════════

                translations: {
                    title: "Traductions",
                    description: "lumen-ui embarque le français, l'anglais, l'espagnol et l'allemand pour ses propres textes. Vos ressources peuvent enregistrer leurs traductions sous leur propre namespace, et les insérer dans n'importe quel libellé avec §translate[...].",
                    functions: [
                        {
                            name: "RegisterTranslations",
                            syntax: "RegisterTranslations(resourceName, translations)",
                            description: "Enregistre les traductions d'une ressource. La table est indexée par code langue, puis par clé.",
                            parameters: [
                                { name: "resourceName", type: "string", required: true, desc: "Namespace utilisé ensuite dans les clés, sous la forme namespace:clé." },
                                { name: "translations", type: "table",  required: true, desc: "Table { fr = { clé = valeur }, en = { … } }." }
                            ],
                            returns: "boolean — false si les arguments sont invalides.",
                            examples: [
                                {
                                    title: "Déclarer et utiliser",
                                    code: { lang: "lua", content: `RegisterTranslations('mon-garage', {\n    fr = {\n        title    = 'Mon garage',\n        repair   = 'Réparer',\n        no_money = 'Fonds insuffisants',\n    },\n    en = {\n        title    = 'My garage',\n        repair   = 'Repair',\n        no_money = 'Not enough money',\n    },\n})\n\n-- Dans un menu : la substitution est faite au rendu,\n-- donc le menu suit automatiquement la langue du joueur.\nlumenui.create('garage', { title = '§translate[mon-garage:title]' })\n\nlumenui.render('garage', function()\n    addButton('§translate[mon-garage:repair]', {\n        description = '§translate[mon-garage:no_money]',\n    })\nend)\n\n-- Ou directement en Lua :\nprint(_T('mon-garage:repair'))` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Namespace obligatoire", text: "_T('repair') sans namespace échoue et retourne la clé telle quelle avec un avertissement. Écrivez toujours _T('ressource:clé'). Seule exception : dans §translate[...], un namespace absent est complété par lumen-ui." },
                                { type: "info",    title: "Repli automatique",     text: "Si la clé n'existe pas dans la langue du joueur, lumen-ui retombe sur la langue par défaut définie dans config/config.lua." },
                                { type: "info",    title: "Champs traduits",       text: "parseTranslate est appliqué automatiquement aux titres, labels, descriptions, rightLabel, badges, listItems, textes de boutons de grille, ainsi qu'aux entrées de menu liste." }
                            ]
                        }
                    ],
                    alerts: []
                },

                SetPlayerLanguage: {
                    title: "Langue du joueur",
                    description: "La langue est stockée en KVP côté client et survit aux redémarrages. La changer rafraîchit immédiatement le menu ouvert et notifie toutes les ressources.",
                    functions: [
                        {
                            name: "SetPlayerLanguage",
                            syntax: "local ok = SetPlayerLanguage(lang)",
                            description: "Change la langue et persiste le choix.",
                            parameters: [
                                { name: "lang", type: "string", required: true, desc: "\"fr\", \"en\", \"es\" ou \"de\". Une langue inconnue est refusée." }
                            ],
                            returns: "boolean — false si la langue n'existe pas dans lumenConfig.Translations.",
                            examples: [
                                { title: "Changer de langue", code: { lang: "lua", content: `SetPlayerLanguage('en')\n\n-- Effets immédiats :\n--   • sauvegarde KVP\n--   • RefreshCurrentMenu() sur le menu ouvert\n--   • event __lumen-ui:languageChanged vers toutes les ressources` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "GetPlayerLanguage",
                            syntax: "local lang = GetPlayerLanguage()",
                            description: "Code de la langue active, ou la langue par défaut de la configuration.",
                            parameters: [],
                            returns: "string",
                            examples: [
                                { title: "Adapter un texte serveur", code: { lang: "lua", content: `TriggerServerEvent('shop:buy', item, GetPlayerLanguage())` } }
                            ],
                            alerts: [
                                { type: "info", title: "Menu intégré", text: "Les commandes /language et /lang ouvrent un menu de sélection de langue fourni par lumen-ui, sans code supplémentaire de votre part." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  UTILITAIRES
                // ══════════════════════════════════════════════════════

                copyToClipboard: {
                    title: "copyToClipboard()",
                    description: "Copie du texte dans le presse-papier du joueur. Utilise la native FiveM, avec repli sur l'API du navigateur intégré si elle est indisponible.",
                    functions: [
                        {
                            name: "lumenui.copyToClipboard",
                            syntax: "local ok = lumenui.copyToClipboard(text)",
                            description: "",
                            parameters: [
                                { name: "text", type: "string", required: true, desc: "Texte à copier. Les autres types sont convertis via tostring()." }
                            ],
                            returns: "boolean — true dans les deux modes de copie.",
                            examples: [
                                {
                                    title: "Copier un identifiant",
                                    code: { lang: "lua", content: `addButton('Copier ma plaque', { rightLabel = plate }, {\n    onSelected = function()\n        lumenui.copyToClipboard(plate)\n        lumenui.showHelpNotification('~g~Plaque copiée~s~', { time = 2000 })\n    end\n})` }
                                }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                opacity: {
                    title: "Opacité du menu",
                    description: "L'opacité du fond des menus est un réglage joueur, persisté en KVP. Elle s'applique au bandeau d'en-tête, à la liste d'items et à l'encadré de description.",
                    functions: [
                        {
                            name: "SetPlayerMenuOpacity",
                            syntax: "SetPlayerMenuOpacity(opacity)",
                            description: "Définit et sauvegarde l'opacité. La valeur est bornée entre 0.4 et 1.0 ; le menu ouvert est mis à jour immédiatement.",
                            parameters: [
                                { name: "opacity", type: "number", required: true, desc: "Valeur entre 0.4 et 1.0. En dehors, elle est ramenée dans l'intervalle." }
                            ],
                            returns: "boolean — toujours true.",
                            examples: [
                                {
                                    title: "Réglage dans un menu d'options",
                                    code: { lang: "lua", content: `addSlider('Opacité', 40, 100, math.floor(GetPlayerMenuOpacity() * 100), {\n    id = 'opacity',\n}, {\n    onSliderChange = function(value)\n        SetPlayerMenuOpacity(value / 100)\n    end\n})` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Persistance", text: "La valeur est écrite en KVP sous la clé \"Opacity\" et rechargée au démarrage du client. Chaque joueur conserve donc son réglage." }
                            ]
                        },
                        {
                            name: "GetPlayerMenuOpacity",
                            syntax: "local o = GetPlayerMenuOpacity()",
                            description: "Opacité courante, entre 0.4 et 1.0. Défaut : 0.98.",
                            parameters: [],
                            returns: "number",
                            examples: [
                                { title: "Lecture", code: { lang: "lua", content: `print(GetPlayerMenuOpacity())   -- 0.98` } }
                            ],
                            alerts: []
                        }
                    ],
                    alerts: []
                },

                setDebug: {
                    title: "setDebug()",
                    description: "Active ou coupe les messages de debug de lumen-ui en console client : rendus, mises à jour d'items, copies presse-papier, grilles de boutons.",
                    functions: [
                        {
                            name: "setDebug",
                            syntax: "exports['lumen-ui']:setDebug(true)",
                            description: "",
                            parameters: [
                                { name: "bool", type: "boolean", required: true, desc: "true pour activer les logs, false pour les couper." }
                            ],
                            returns: "nil",
                            examples: [
                                {
                                    title: "Activer temporairement",
                                    code: { lang: "lua", content: `-- En jeu, depuis n'importe quelle ressource\nexports['lumen-ui']:setDebug(true)\n\n-- Ou en dur dans config/config.lua :\nlumenConfig.Debug = true` }
                                }
                            ],
                            alerts: [
                                { type: "warning", title: "Debug actif par défaut", text: "config/config.lua livre lumenConfig.Debug = true. Passez-le à false en production pour éviter de polluer la console des joueurs." }
                            ]
                        }
                    ],
                    alerts: []
                },

                // ══════════════════════════════════════════════════════
                //  RÉFÉRENCE
                // ══════════════════════════════════════════════════════

                keyboard: {
                    title: "Raccourcis clavier",
                    description: "Touches gérées par le frontend lorsqu'un menu classique est ouvert. Le menu liste et la boîte de saisie se pilotent à la souris, sauf ÉCHAP qui annule toujours.",
                    functions: [
                        {
                            name: "Navigation générale",
                            syntax: "menu classique",
                            description: "",
                            parameters: [
                                { name: "↑ / ↓",           type: "touche", desc: "Déplacent la sélection. Les items désactivés, séparateurs et traits sont sautés. La navigation est circulaire." },
                                { name: "← / →",           type: "touche", desc: "Modifient la valeur d'une liste, d'un slider ou d'un stepper. Sur une grille dépliée, → entre dedans et ← la referme." },
                                { name: "Entrée",          type: "touche", desc: "Valide l'item : déclenche onSelected, bascule une case à cocher, ouvre une grille repliée ou entre dans une grille dépliée." },
                                { name: "Retour arrière",  type: "touche", desc: "Ferme le menu et déclenche onClosed, sauf si closable = false. Dans une grille, sort du mode grille." },
                                { name: "Échap",           type: "touche", desc: "Identique à Retour arrière hors recherche. En mode recherche, annule la recherche sans fermer le menu." },
                                { name: "contextKey",      type: "touche", desc: "\"X\" par défaut. Déclenche onContextMenu sur l'item sélectionné, s'il en définit un." },
                                { name: "F16",             type: "touche", desc: "Ouvre la recherche. Remappable dans Paramètres → Commandes clavier de FiveM, entrée « 🔍 Search in menu »." }
                            ],
                            returns: "",
                            examples: [],
                            alerts: []
                        },
                        {
                            name: "Mode recherche",
                            syntax: "après F16 ou l'action searchMode",
                            description: "Le filtre porte sur le label de l'item et sur options.searchId, sans tenir compte de la casse. La recherche se déroule en deux temps : saisie dans le champ, puis navigation dans les résultats filtrés une fois le champ quitté.",
                            parameters: [
                                { name: "frappe",          type: "champ actif", desc: "Filtre la liste. Les résultats sont recalculés 150 ms après la dernière touche." },
                                { name: "Entrée",          type: "champ actif", desc: "Quitte le champ et rend le clavier au menu, en conservant les résultats filtrés. Sans effet s'il n'y a aucun résultat." },
                                { name: "Retour arrière",  type: "champ actif", desc: "Efface un caractère. Sur un champ déjà vide, quitte le mode recherche." },
                                { name: "Échap",           type: "champ actif", desc: "Annule la recherche et replace le curseur sur le premier item du menu complet." },
                                { name: "↑ / ↓",           type: "champ quitté", desc: "Parcourent les résultats filtrés, comme dans un menu normal." },
                                { name: "Entrée",          type: "champ quitté", desc: "Valide l'item sélectionné, exactement comme hors recherche." },
                                { name: "Retour arrière",  type: "champ quitté", desc: "Ferme le menu et déclenche onClosed, même si un filtre est encore appliqué." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Rendre un item plus facile à trouver",
                                    code: { lang: "lua", content: `-- searchId ajoute des termes de recherche invisibles à l'écran\naddButton('Sultan RS', {\n    searchId = 'sultanrs voiture sport karin',\n}, { onSelected = Spawn })\n\n-- Ouvrir la recherche depuis votre code :\nexports['lumen-ui']:SendNUIMessage({ action = 'searchMode' })` }
                                }
                            ],
                            alerts: [
                                { type: "info",    title: "Curseur activé",       text: "Le mode recherche active le curseur souris pour que le champ puisse recevoir le focus dans CEF. Une fois le champ quitté avec Entrée, le focus clavier normal est restauré et le joueur peut à nouveau se déplacer." },
                                { type: "info",    title: "Filtre conservé",      text: "Quitter le champ avec Entrée envoie searchModeChanged avec active = false côté Lua, mais la liste reste filtrée à l'écran. Fermer le menu ou appuyer sur Échap remet la liste complète." },
                                { type: "warning", title: "Correctif v2.0.0",     text: "En v1, le retour arrière ne faisait rien tant qu'un filtre était appliqué : le joueur devait d'abord annuler la recherche pour pouvoir sortir du menu. La touche ferme désormais le menu dès que le champ de saisie n'a plus le focus." }
                            ]
                        }
                    ],
                    alerts: []
                },

                "text-markup": {
                    title: "Formatage du texte",
                    description: "Tous les libellés, descriptions, badges et titres passent par le même moteur de rendu. Le HTML est échappé avant traitement : seuls les jetons ci-dessous produisent du balisage.",
                    functions: [
                        {
                            name: "Couleurs et styles",
                            syntax: "~r~ texte ~s~",
                            description: "Jetons de couleur FiveM. ~s~ referme la couleur en cours et revient à la précédente.",
                            parameters: [
                                { name: "~r~ ~g~ ~b~", type: "couleur", desc: "Rouge, vert, bleu." },
                                { name: "~y~ ~o~ ~p~", type: "couleur", desc: "Jaune, orange, violet." },
                                { name: "~q~ ~u~ ~v~", type: "couleur", desc: "Rose, rose vif, violet clair." },
                                { name: "~c~ ~t~ ~m~", type: "couleur", desc: "Gris menu, gris menu, gris clair." },
                                { name: "~w~ ~l~ ~d~ ~f~", type: "couleur", desc: "Blanc, noir, bleu foncé, vert amical." },
                                { name: "~s~",         type: "style",   desc: "Ferme la couleur en cours." },
                                { name: "~h~ / ~bold~", type: "style",  desc: "Bascule le gras. Un second jeton le referme." },
                                { name: "~italic~",    type: "style",   desc: "Bascule l'italique." },
                                { name: "~n~ ou \\n",  type: "style",   desc: "Saut de ligne." }
                            ],
                            returns: "",
                            examples: [
                                { title: "Exemple", code: { lang: "lua", content: `addButton('~g~Disponible~s~ · ~h~Sultan RS~h~', {\n    description = 'Prix : ~y~25 000 €~s~~n~État : ~g~Neuf~s~',\n})` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "Jetons spéciaux",
                            syntax: "§url[…] · §translate[…] · ~INPUT_XXX~",
                            description: "",
                            parameters: [
                                { name: "§url[URL]",            type: "image",  desc: "Insère une image en ligne. Elle est masquée automatiquement si le chargement échoue. Fonctionne dans les labels, descriptions et icônes de menu liste." },
                                { name: "§translate[ns:clé]",   type: "i18n",   desc: "Remplacé par la traduction au moment du rendu. Sans namespace, lumen-ui est utilisé par défaut." },
                                { name: "~INPUT_XXX~",          type: "touche", desc: "Badge clavier. Uniquement dans les notifications d'aide et les instructional buttons ; ailleurs le jeton est retiré." }
                            ],
                            returns: "",
                            examples: [
                                {
                                    title: "Image, traduction et badge",
                                    code: { lang: "lua", content: `-- Image en ligne\naddButton('§url[https://exemple.com/icone.png] Boutique')\n\n-- Traduction\naddButton('§translate[mon-garage:repair]')\n\n-- Badge clavier (notifications et instructional buttons)\nlumenui.showHelpNotification('~INPUT_CONTEXT~ pour ouvrir')` }
                                }
                            ],
                            alerts: [
                                { type: "info", title: "Sécurité", text: "Les caractères &, < et > sont échappés avant toute transformation. Un libellé venant d'une saisie joueur ne peut donc pas injecter de HTML dans l'interface." }
                            ]
                        }
                    ],
                    alerts: []
                },

                commands: {
                    title: "Commandes et raccourcis",
                    playerCommands: [
                        {
                            command: "/language",
                            description: "Ouvre le menu de sélection de langue fourni par lumen-ui. Le choix est sauvegardé en KVP et appliqué immédiatement.",
                            permission: "tous",
                            example: "/language"
                        },
                        {
                            command: "/lang",
                            description: "Alias de /language.",
                            permission: "tous",
                            example: "/lang"
                        },
                        {
                            command: "searchMode",
                            description: "Ouvre la recherche dans le menu affiché. Associée à F16 par défaut, remappable dans Paramètres → Commandes clavier de FiveM. La commande est sans effet si aucun menu n'est ouvert.",
                            permission: "tous",
                            example: "Touche F16"
                        }
                    ],
                    alerts: [
                        { type: "info", title: "Remapper la recherche", text: "F16 n'existe pas sur la plupart des claviers : c'est volontaire, afin de ne pas entrer en conflit avec d'autres ressources. Invitez vos joueurs à choisir leur propre touche dans les paramètres FiveM." }
                    ]
                },

                troubleshooting: {
                    title: "Dépannage",
                    description: "Les problèmes les plus fréquents et leur origine.",
                    functions: [
                        {
                            name: "Interface noire ou vide",
                            syntax: "Symptôme : aucun menu ne s'affiche",
                            description: "Presque toujours un dossier web/build absent ou périmé : la ui_page pointe vers un fichier inexistant.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Vérification", code: { lang: "bash", content: `# Le dossier doit exister et contenir index.html + assets/\nls resources/lumen-ui/web/build\n\n# Sinon, reconstruire :\ncd resources/lumen-ui/web\nnpm install\nnpm run build\n\n# Puis en console serveur :\nrefresh\nrestart lumen-ui` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "attempt to index a nil value (exports)",
                            syntax: "Symptôme : erreur au chargement de votre ressource",
                            description: "Votre ressource démarre avant lumen-ui, donc exports['lumen-ui'] n'existe pas encore quand init.lua s'exécute.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Corriger l'ordre", code: { lang: "cfg", content: `# server.cfg — lumen-ui d'abord\nensure lumen-ui\nensure ma-ressource\n\n# init.lua vérifie explicitement l'état et lève une erreur claire :\n# \"lumen-ui must be started before this resource.\"` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "Le curseur reste bloqué",
                            syntax: "Symptôme : impossible de bouger après fermeture",
                            description: "Le focus NUI n'a pas été rendu. Une boucle de secours dans core.lua reprend le focus quand un menu est ouvert, mais elle ne peut rien si l'état Lua pense qu'un menu est encore actif.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Libérer le focus", code: { lang: "lua", content: `-- Fermer tout ce qui pourrait retenir le focus\nlumenui.closeInput()\nlumenui.closeListMenu()\nlumenui.close()\n\n-- En dernier recours, depuis n'importe quelle ressource :\nexports['lumen-ui']:SetNuiFocus(false, false)\nexports['lumen-ui']:SetNuiFocusKeepInput(false)` } }
                            ],
                            alerts: [
                                { type: "info", title: "Arrêt de ressource", text: "onResourceStop ferme déjà automatiquement menu, menu liste et boîte de saisie. Un simple restart de votre ressource suffit généralement à récupérer un focus bloqué." }
                            ]
                        },
                        {
                            name: "render() ne fait rien",
                            syntax: "Symptôme : aucun message d'erreur, aucun menu",
                            description: "Trois causes possibles : le menu n'a jamais été créé, un menu liste est ouvert, ou le callback a levé une erreur.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Diagnostic", code: { lang: "lua", content: `exports['lumen-ui']:setDebug(true)\n\n-- 1. Le menu existe-t-il ?\nprint(json.encode(lumenui.listMenus()))\n\n-- 2. Un menu liste bloque-t-il le rendu ?\nprint('Menu liste ouvert :', lumenui.getOpenListMenu())\n\n-- 3. Une erreur dans le callback est affichée en rouge,\n--    avec la trace complète, et referme le menu.` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "onSelected reçoit un mauvais index sur addList",
                            syntax: "Symptôme : décalage d'un cran dans les listes",
                            description: "onListChange reçoit un index en base 1, mais onSelected reçoit la valeur interne en base 0.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Le bon usage", code: { lang: "lua", content: `addList('Couleur', colors, 1, {}, {\n    onListChange = function(i)\n        print(colors[i])       -- correct : base 1\n    end,\n    onSelected = function(i)\n        print(colors[i + 1])   -- correct : base 0, il faut ajouter 1\n    end,\n})` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "options.canToggle = false est ignoré",
                            syntax: "Symptôme : la grille reste repliable",
                            description: "L'expression qui calcule canToggle dans items.lua retombe toujours sur true à cause d'un idiome Lua and/or. Le paramètre est donc sans effet en l'état.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Correctif", code: { lang: "lua", content: `-- client/items.lua, dans addButtonGrid :\n\n-- Actuel — (true and false) or true  →  toujours true\nlocal canToggle = options.canToggle ~= nil and options.canToggle or true\n\n-- Correct\nlocal canToggle = options.canToggle ~= false` } }
                            ],
                            alerts: []
                        },
                        {
                            name: "saveCurrentIndex et getMediaType sans effet",
                            syntax: "Symptôme : aucune réponse Lua",
                            description: "Le frontend émet les callbacks saveIndex et mediaTypeResponse, mais ils ne figurent pas dans NUI_CALLBACKS du dispatcher. Ils ne sont donc jamais routés.",
                            parameters: [],
                            returns: "",
                            examples: [
                                { title: "Les activer", code: { lang: "lua", content: `-- client/nui_dispatcher.lua\nlocal NUI_CALLBACKS = {\n    -- … liste existante …\n    'saveIndex',\n    'mediaTypeResponse',\n}` } }
                            ],
                            alerts: [
                                { type: "info", title: "Limitation héritée", text: "Ce comportement existait déjà en v1 et a été conservé tel quel en v2 pour ne pas modifier la logique Lua sans nécessité." }
                            ]
                        }
                    ],
                    alerts: []
                }

            }
        },

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
        },

        // ─── Ajoutez vos ressources ici ──────────────────────────────────────────

    ]
};

window.config = config;