/* ═══════════════════════════════════════════════════
   FIVEM DOCS — SCRIPT.JS
   Multi-resource documentation engine
   ═══════════════════════════════════════════════════ */

'use strict';

// ── STATE ──────────────────────────────────────────
const state = {
    currentResource: null,
    currentSection:  null,
    openGroups:      new Set(),
    searchOpen:      false
};

// ── INIT ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    if (typeof config === 'undefined') {
        document.getElementById('content').innerHTML = renderError('config.js introuvable ou invalide.');
        return;
    }

    initSite();
    initSidebar();
    initSearch();
    initMobileToggle();
    routeFromHash();

    window.addEventListener('hashchange', routeFromHash);
});

// ── SITE SETUP ────────────────────────────────────
function initSite() {
    const s = config.site;
    document.title = s.name || 'FiveM Docs';

    const el = id => document.getElementById(id);

    if (s.name)    el('siteName').textContent    = s.name;
    if (s.tagline) el('siteTagline').textContent = s.tagline;
    if (s.version) { const v = el('siteVersion'); if (v) v.textContent = s.version; }

    // Logo image
    if (s.logoUrl) {
        const iconEl = el('siteIcon');
        if (iconEl) {
            iconEl.innerHTML = `<img src="${s.logoUrl}" alt="${s.name}" style="width:38px;height:38px;object-fit:contain;display:block;">`;
            iconEl.style.background = 'none';
            iconEl.style.fontSize = '0';
        }
    }

    // Footer links
    const footer = el('sidebarFooter');
    let links = '';
    if (s.githubUrl) {
        links += `<a href="${s.githubUrl}" target="_blank" class="footer-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
        </a>`;
    }
    if (s.discordUrl) {
        links += `<a href="${s.discordUrl}" target="_blank" class="footer-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.043.031.053a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Discord
        </a>`;
    }
    footer.innerHTML = links || '';
    if (!links) footer.style.display = 'none';
}

// ── SIDEBAR ───────────────────────────────────────
function initSidebar() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = '';

    if (!config.resources || config.resources.length === 0) {
        nav.innerHTML = `<div style="padding:16px;color:var(--text-3);font-size:12.5px;">Aucune ressource configurée.</div>`;
        return;
    }

    config.resources.forEach(resource => {
        const group = createResourceGroup(resource);
        nav.appendChild(group);
    });
}

function createResourceGroup(resource) {
    const group = document.createElement('div');
    group.className = 'resource-group';
    group.dataset.resourceId = resource.id;

    const statusHtml = resource.status
        ? `<span class="status-badge status-${resource.status}">${resource.status}</span>` : '';

    const categoriesHtml = (resource.categories || []).map(cat => `
        <div class="tree-category">
            <span class="tree-category-label">${escHtml(cat.title)}</span>
            ${(cat.items || []).map(sectionId => {
                const section = (resource.sections || {})[sectionId];
                const label   = section ? section.title : sectionId;
                return `
                    <a class="tree-item" href="#${resource.id}/${sectionId}"
                       data-resource="${resource.id}" data-section="${sectionId}">
                        <span class="tree-item-dot"></span>
                        ${escHtml(label)}
                    </a>
                `;
            }).join('')}
        </div>
    `).join('');

    group.innerHTML = `
        <div class="resource-group-header" data-resource="${resource.id}">
            <div class="resource-group-icon">${resource.icon || '📦'}</div>
            <div class="resource-group-info">
                <div class="resource-group-name">${escHtml(resource.name || resource.id)}</div>
                <div class="resource-group-version">${escHtml(resource.version || '')}</div>
            </div>
            ${statusHtml}
            <svg class="resource-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="resource-tree">
            ${categoriesHtml || '<div style="padding:8px 14px;font-size:12px;color:var(--text-3)">Aucune section</div>'}
        </div>
    `;

    // Toggle group open/close
    group.querySelector('.resource-group-header').addEventListener('click', e => {
        if (e.target.closest('a')) return;
        group.classList.toggle('open');
    });

    return group;
}

function setActiveNav(resourceId, sectionId) {
    // Remove all active states
    document.querySelectorAll('.tree-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.resource-group-header').forEach(el => el.classList.remove('active'));

    // Open the resource group
    document.querySelectorAll('.resource-group').forEach(group => {
        if (group.dataset.resourceId === resourceId) {
            group.classList.add('open');
            group.querySelector('.resource-group-header').classList.add('active');

            // Activate section item
            if (sectionId) {
                const item = group.querySelector(`[data-resource="${resourceId}"][data-section="${sectionId}"]`);
                if (item) {
                    item.classList.add('active');
                    // Scroll into view
                    item.scrollIntoView({ block: 'nearest' });
                }
            }
        }
    });
}

// ── ROUTING ───────────────────────────────────────
function routeFromHash() {
    const hash  = window.location.hash.slice(1);

    if (!hash) {
        renderHome();
        return;
    }

    const parts      = hash.split('/');
    const resourceId = parts[0];
    const sectionId  = parts[1];

    const resource = (config.resources || []).find(r => r.id === resourceId);

    if (!resource) {
        renderHome();
        return;
    }

    if (!sectionId) {
        // Navigate to first section
        const firstSection = getFirstSection(resource);
        if (firstSection) {
            window.location.hash = `${resource.id}/${firstSection}`;
        } else {
            renderResourceOverview(resource);
        }
        return;
    }

    renderSection(resource, sectionId);
    setActiveNav(resourceId, sectionId);
}

function getFirstSection(resource) {
    if (!resource.categories || resource.categories.length === 0) return null;
    const firstCat = resource.categories[0];
    return firstCat.items && firstCat.items.length > 0 ? firstCat.items[0] : null;
}

// ── RENDER HOME ───────────────────────────────────
function renderHome() {
    state.currentResource = null;
    state.currentSection  = null;

    document.querySelectorAll('.tree-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.resource-group-header').forEach(el => el.classList.remove('active'));

    const resources = config.resources || [];
    const s         = config.site;

    let cards = '';
    resources.forEach(r => {
        const statusHtml = r.status ? `<span class="status-badge status-${r.status}">${r.status}</span>` : '';
        const firstSec   = getFirstSection(r);
        const href       = firstSec ? `#${r.id}/${firstSec}` : `#${r.id}`;

        cards += `
            <a class="resource-card" href="${href}" style="--accent:${r.color || '#6366f1'}">
                <div class="card-header">
                    <div class="card-icon">${r.icon || '📦'}</div>
                    <div class="card-meta">
                        <div class="card-name">${escHtml(r.name || r.id)}</div>
                        <div class="card-version">${escHtml(r.version || '')}</div>
                    </div>
                    ${statusHtml}
                </div>
                <div class="card-description">${escHtml(r.description || 'Aucune description.')}</div>
                <div class="card-footer">
                    <span class="card-link">
                        Voir la documentation
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </div>
            </a>
        `;
    });

    const emptyState = resources.length === 0 ? `
        <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <div class="empty-state-title">Aucune ressource configurée</div>
            <div class="empty-state-desc">Ajoutez des ressources dans config.js pour les voir apparaître ici.</div>
        </div>
    ` : `<div class="home-grid">${cards}</div>`;

    document.getElementById('content').innerHTML = `
        <div class="home-hero">
            <h1 class="home-title">${escHtml(s.name || 'Documentation FiveM')}</h1>
            <p class="home-subtitle">${escHtml(s.tagline || '')}</p>
        </div>
        <h2 style="border:none;margin-top:0;padding:0 0 16px;font-size:14px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;">
            ${resources.length} ressource${resources.length !== 1 ? 's' : ''}
        </h2>
        ${emptyState}
    `;

    document.getElementById('tocNav').innerHTML = '';
    document.getElementById('toc').style.visibility = 'hidden';

    document.getElementById('homeLink').href = '#';
    window.scrollTo(0, 0);
}

// ── RENDER RESOURCE OVERVIEW ──────────────────────
function renderResourceOverview(resource) {
    // Redirect to first section if exists
    const first = getFirstSection(resource);
    if (first) {
        window.location.hash = `${resource.id}/${first}`;
        return;
    }
    renderHome();
}

// ── RENDER SECTION ────────────────────────────────
function renderSection(resource, sectionId) {
    state.currentResource = resource;
    state.currentSection  = sectionId;

    const section = (resource.sections || {})[sectionId];
    if (!section) {
        document.getElementById('content').innerHTML = renderError(`Section "${sectionId}" introuvable dans "${resource.name}".`);
        return;
    }

    // Apply resource accent color
    document.documentElement.style.setProperty('--accent', resource.color || '#6366f1');
    document.documentElement.style.setProperty('--accent-dim', hexToRgba(resource.color || '#6366f1', 0.12));
    document.documentElement.style.setProperty('--accent-glow', hexToRgba(resource.color || '#6366f1', 0.25));

    // Breadcrumb
    const breadcrumb = `
        <div class="breadcrumb">
            <a href="#">${escHtml(config.site.name || 'Home')}</a>
            <span class="breadcrumb-sep">›</span>
            <a href="#${resource.id}">${escHtml(resource.name || resource.id)}</a>
            <span class="breadcrumb-sep">›</span>
            <span>${escHtml(section.title || sectionId)}</span>
        </div>
    `;

    // Render section body based on type
    let body = '';

    if (sectionId === 'introduction') body = renderIntroduction(section, resource);
    else if (sectionId === 'installation')   body = renderInstallation(section);
    else if (sectionId === 'configuration')  body = renderConfiguration(section);
    else if (sectionId === 'commands')       body = renderCommands(section);
    else if (sectionId === 'events')         body = renderEvents(section);
    else if (sectionId === 'exports')        body = renderExports(section);
    else if (sectionId === 'permissions')    body = renderPermissions(section);
    else if (sectionId === 'api')            body = renderApi(section);
    else if (sectionId === 'examples')       body = renderExamples(section);
    else if (sectionId === 'faq')            body = renderFaq(section);
    else if (sectionId === 'changelog')      body = renderChangelog(section);
    else body = renderGenericSection(section);

    // Prev / Next navigation
    const navHtml = renderSectionNav(resource, sectionId);

    document.getElementById('content').innerHTML = `
        <div class="page-header">
            ${breadcrumb}
            <h1 class="page-title">${escHtml(section.title || sectionId)}</h1>
            ${section.description ? `<p class="page-description">${escHtml(section.description)}</p>` : ''}
        </div>
        ${body}
        ${navHtml}
    `;

    // Render TOC
    renderToc();

    // Highlight code
    if (window.Prism) Prism.highlightAll();

    // Bind interactions
    bindCopyButtons();
    bindFaqItems();

    document.getElementById('toc').style.visibility = 'visible';
    window.scrollTo(0, 0);
}

// ── SECTION RENDERERS ─────────────────────────────

function renderIntroduction(sec, resource) {
    let html = '';

    // Alerts
    html += renderAlerts(sec.alerts);

    // Features grid
    if (sec.features && sec.features.length > 0) {
        html += `<h2>Fonctionnalités</h2><div class="features-grid">`;
        sec.features.forEach(f => {
            html += `
                <div class="feature-card">
                    <div class="feature-icon">${f.icon || '✦'}</div>
                    <div class="feature-title">${escHtml(f.title || '')}</div>
                    <div class="feature-desc">${escHtml(f.desc || '')}</div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += emptyBlock('Aucune fonctionnalité définie.', 'Ajoutez des entrées dans features[] dans config.js.');
    }

    return html;
}

function renderInstallation(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    // Requirements
    if (sec.requirements && sec.requirements.length > 0) {
        html += `<h2>Prérequis</h2><div class="requirements-list">`;
        sec.requirements.forEach(req => {
            const cls  = req.required ? 'req-required' : 'req-optional';
            const tag  = req.required ? 'Requis' : 'Optionnel';
            const link = req.url ? `<a href="${req.url}" target="_blank" style="color:var(--accent);font-size:11px;">↗</a>` : '';
            html += `
                <div class="requirement-item ${cls}">
                    <span class="req-dot"></span>
                    <span class="req-name">${escHtml(req.name || '')} ${link}</span>
                    <span class="req-version">${escHtml(req.version || '')}</span>
                    <span class="req-tag">${tag}</span>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Steps
    if (sec.steps && sec.steps.length > 0) {
        html += `<h2>Étapes d'installation</h2><div class="steps-list">`;
        sec.steps.forEach((step, i) => {
            html += `
                <div class="step-item">
                    <div class="step-number">${i + 1}</div>
                    <div class="step-content">
                        <div class="step-title">${escHtml(step.title || '')}</div>
                        ${step.description ? `<div class="step-desc">${escHtml(step.description)}</div>` : ''}
                        ${step.code ? renderCodeBlock(step.code) : ''}
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += emptyBlock('Aucune étape définie.', 'Ajoutez des étapes dans steps[] dans config.js.');
    }

    return html;
}

function renderConfiguration(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    if (sec.filePath) {
        html += `<p><strong>Fichier :</strong> <code>${escHtml(sec.filePath)}</code></p>`;
    }

    // Options table
    if (sec.options && sec.options.length > 0) {
        html += `
            <h2>Options disponibles</h2>
            <table class="params-table">
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Type</th>
                        <th>Défaut</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
        `;
        sec.options.forEach(opt => {
            html += `
                <tr>
                    <td>${escHtml(opt.name || '')}</td>
                    <td><span class="type-badge">${escHtml(opt.type || '')}</span></td>
                    <td><code>${escHtml(opt.default ?? '—')}</code></td>
                    <td>${escHtml(opt.desc || '')}</td>
                </tr>
            `;
        });
        html += `</tbody></table>`;
    } else {
        html += emptyBlock('Aucune option définie.', 'Ajoutez des options dans options[] dans config.js.');
    }

    // Example config
    if (sec.example && sec.example.content) {
        html += `<h2>Exemple de fichier de configuration</h2>`;
        html += renderCodeBlock(sec.example);
    }

    return html;
}

function renderCommands(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    if (sec.description) {
        html += `<p>${escHtml(sec.description)}</p>`;
    }

    // Player commands
    if (sec.playerCommands && sec.playerCommands.length > 0) {
        html += `<h2>Commandes joueur</h2><div class="commands-list">`;
        sec.playerCommands.forEach(cmd => html += renderCommandItem(cmd));
        html += `</div>`;
    } else {
        html += `<h2>Commandes joueur</h2>` + emptyBlock('Aucune commande joueur.', 'Ajoutez des commandes dans playerCommands[].');
    }

    // Admin commands
    if (sec.adminCommands && sec.adminCommands.length > 0) {
        html += `<h2>Commandes admin</h2><div class="commands-list">`;
        sec.adminCommands.forEach(cmd => html += renderCommandItem(cmd));
        html += `</div>`;
    } else {
        html += `<h2>Commandes admin</h2>` + emptyBlock('Aucune commande admin.', 'Ajoutez des commandes dans adminCommands[].');
    }

    return html;
}

function renderCommandItem(cmd) {
    const permHtml    = cmd.permission ? `<span class="command-perm">🔒 ${escHtml(cmd.permission)}</span>` : '';
    const exampleHtml = cmd.example ? `<span class="command-example">ex: ${escHtml(cmd.example)}</span>` : '';
    return `
        <div class="command-item">
            <div class="command-cmd">${escHtml(cmd.command || '')}</div>
            <div class="command-desc">${escHtml(cmd.description || '')}</div>
            ${permHtml || exampleHtml ? `<div class="command-meta">${permHtml}${exampleHtml}</div>` : ''}
        </div>
    `;
}

function renderEvents(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;

    const renderEventList = (events, heading) => {
        if (events && events.length > 0) {
            html += `<h2>${heading}</h2><div class="events-list">`;
            events.forEach(ev => {
                const sideCls  = ev.side === 'server' ? 'side-server' : ev.side === 'shared' ? 'side-shared' : 'side-client';
                const sideText = ev.side || 'client';
                html += `
                    <div class="event-item">
                        <div class="event-header">
                            <span class="event-name">${escHtml(ev.name || '')}</span>
                            <span class="side-badge ${sideCls}">${sideText}</span>
                        </div>
                        <div class="event-body">
                            <div class="event-desc">${escHtml(ev.description || '')}</div>
                            ${ev.parameters && ev.parameters.length > 0 ? renderParamsTable(ev.parameters) : ''}
                            ${ev.example ? renderCodeBlock(ev.example) : ''}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else {
            html += `<h2>${heading}</h2>` + emptyBlock('Aucun événement.', 'Ajoutez des événements dans la configuration.');
        }
    };

    renderEventList(sec.triggers, 'Événements à déclencher');
    renderEventList(sec.listeners, 'Événements à écouter');

    return html;
}

function renderExports(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;

    const renderExportList = (exports, heading) => {
        if (exports && exports.length > 0) {
            html += `<h2>${heading}</h2>`;
            exports.forEach(exp => {
                html += `
                    <div class="export-item">
                        <div class="export-header">
                            <span class="export-name">${escHtml(exp.name || '')}</span>
                            ${exp.returns ? `<span class="export-returns">→ ${escHtml(exp.returns)}</span>` : ''}
                        </div>
                        <div class="export-body">
                            ${exp.description ? `<div class="export-desc">${escHtml(exp.description)}</div>` : ''}
                            ${exp.syntax ? `<div class="syntax-block">${escHtml(exp.syntax)}</div>` : ''}
                            ${exp.parameters && exp.parameters.length > 0 ? renderParamsTable(exp.parameters) : ''}
                            ${exp.example ? renderCodeBlock(exp.example) : ''}
                        </div>
                    </div>
                `;
            });
        } else {
            html += `<h2>${heading}</h2>` + emptyBlock('Aucun export.', 'Ajoutez des exports dans la configuration.');
        }
    };

    renderExportList(sec.client, 'Exports client');
    renderExportList(sec.server, 'Exports serveur');

    return html;
}

function renderPermissions(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;

    if (sec.list && sec.list.length > 0) {
        html += `<h2>Permissions ACE disponibles</h2><div class="perms-list">`;
        sec.list.forEach(p => {
            html += `
                <div class="perm-item">
                    <span class="perm-ace">${escHtml(p.ace || '')}</span>
                    <span class="perm-desc">${escHtml(p.description || '')}</span>
                    <span class="perm-default">Défaut: ${escHtml(p.default || '—')}</span>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += emptyBlock('Aucune permission définie.', 'Ajoutez des permissions dans list[].');
    }

    if (sec.example && sec.example.content) {
        html += `<h2>Exemple server.cfg</h2>`;
        html += renderCodeBlock(sec.example);
    }

    return html;
}

function renderApi(sec) {
    let html = '';
    html += renderAlerts(sec.alerts);

    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;

    if (sec.functions && sec.functions.length > 0) {
        sec.functions.forEach(fn => {
            html += `<h2>${escHtml(fn.name || 'Fonction')}</h2>`;
            if (fn.description) html += `<p>${escHtml(fn.description)}</p>`;
            if (fn.syntax)      html += `<div class="syntax-block">${escHtml(fn.syntax)}</div>`;

            if (fn.parameters && fn.parameters.length > 0) {
                html += `<h3>Paramètres</h3>`;
                html += renderParamsTable(fn.parameters);
            }

            if (fn.returns) {
                html += `<h3>Retourne</h3><p><code>${escHtml(fn.returns)}</code></p>`;
            }

            if (fn.alerts) html += renderAlerts(fn.alerts);

            if (fn.examples && fn.examples.length > 0) {
                html += `<h3>Exemples</h3>`;
                fn.examples.forEach(ex => {
                    if (ex.title) html += `<p><strong>${escHtml(ex.title)}</strong></p>`;
                    if (ex.code)  html += renderCodeBlock(ex.code);
                });
            }
        });
    } else {
        html += emptyBlock('Aucune fonction API définie.', 'Ajoutez des fonctions dans functions[] dans config.js.');
    }

    return html;
}

function renderExamples(sec) {
    let html = '';
    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;

    if (sec.list && sec.list.length > 0) {
        sec.list.forEach(ex => {
            if (ex.title)       html += `<h2>${escHtml(ex.title)}</h2>`;
            if (ex.description) html += `<p>${escHtml(ex.description)}</p>`;
            if (ex.code)        html += renderCodeBlock(ex.code);
        });
    } else {
        html += emptyBlock('Aucun exemple défini.', 'Ajoutez des exemples dans list[] dans config.js.');
    }

    return html;
}

function renderFaq(sec) {
    let html = '';
    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;

    if (sec.questions && sec.questions.length > 0) {
        html += `<div class="faq-list">`;
        sec.questions.forEach(q => {
            html += `
                <div class="faq-item">
                    <div class="faq-question">
                        <span class="faq-q-icon">?</span>
                        ${escHtml(q.question || '')}
                        <svg class="faq-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="faq-answer">
                        ${escHtml(q.answer || '')}
                        ${q.code ? renderCodeBlock(q.code) : ''}
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += emptyBlock('Aucune question définie.', 'Ajoutez des questions dans questions[] dans config.js.');
    }

    return html;
}

function renderChangelog(sec) {
    let html = '';

    if (sec.versions && sec.versions.length > 0) {
        html += `<div class="changelog-list">`;
        sec.versions.forEach(v => {
            const typeClass = `vtype-${v.type || 'patch'}`;
            html += `
                <div class="version-entry">
                    <div class="version-meta">
                        <div class="version-num">${escHtml(v.version || '')}</div>
                        <div class="version-date">${escHtml(v.date || '')}</div>
                        ${v.type ? `<span class="version-type-badge ${typeClass}">${v.type}</span>` : ''}
                    </div>
                    <div class="version-changes">
                        ${(v.changes || []).map(c => {
                            const tag = `ctag-${c.type || 'changed'}`;
                            const label = {added:'Ajouté', changed:'Modifié', fixed:'Corrigé', removed:'Supprimé'}[c.type] || c.type;
                            return `
                                <div class="change-item">
                                    <span class="change-tag ${tag}">${label}</span>
                                    ${escHtml(c.text || '')}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += emptyBlock('Aucune version définie.', 'Ajoutez des entrées dans versions[] dans config.js.');
    }

    return html;
}

function renderGenericSection(sec) {
    // If the section has functions[], use a rich API-style renderer
    if (sec.functions && sec.functions.length > 0) {
        return renderRichFunctions(sec);
    }
    let html = '';
    if (sec.description) html += `<p>${escHtml(sec.description)}</p>`;
    if (sec.alerts)  html += renderAlerts(sec.alerts);
    if (sec.content) html += `<p>${escHtml(sec.content)}</p>`;
    return html || emptyBlock('Section vide.', 'Cette section n\'a pas encore de contenu.');
}

// Renders a section that has sec.functions[] — covers all lumen-ui API sections
function renderRichFunctions(sec) {
    let html = '';
    if (sec.alerts) html += renderAlerts(sec.alerts);
    if (sec.description) html += `<p class="page-description" style="margin-bottom:2rem">${escHtml(sec.description)}</p>`;

    sec.functions.forEach((fn, idx) => {
        // Divider between functions (not before first)
        if (idx > 0) html += `<hr style="border:none;border-top:1px solid var(--border);margin:2.5rem 0">`;

        html += `<h2 id="${escHtml((fn.name||'').replace(/[^a-z0-9]/gi,'_'))}">${escHtml(fn.name || 'Fonction')}</h2>`;
        if (fn.description) html += `<p>${escHtml(fn.description)}</p>`;
        if (fn.syntax)      html += `<div class="syntax-block">${escHtml(fn.syntax)}</div>`;

        // Parameters
        if (fn.parameters && fn.parameters.length > 0) {
            html += `<h3>Paramètres</h3>`;
            html += renderParamsTable(fn.parameters);
        }

        // Returns
        if (fn.returns) {
            html += `<h3>Retourne</h3><p><code class="inline-code">${escHtml(fn.returns)}</code></p>`;
        }

        // Options table (for create / showListMenu / showMedia …)
        if (fn.optionsTable && fn.optionsTable.length > 0) {
            html += `<h3>Options</h3>`;
            html += renderPropsTable(fn.optionsTable, ['Nom', 'Type', 'Défaut', 'Description'], ['name','type','default','desc']);
        }

        // Callbacks table (for addButton, addSlider …)
        if (fn.callbacksTable && fn.callbacksTable.length > 0) {
            html += `<h3>Callbacks</h3>`;
            html += renderPropsTable(fn.callbacksTable, ['Callback', 'Paramètres', 'Description'], ['name','params','desc']);
        }

        // Item structure (for showListMenu)
        if (fn.itemStructure && fn.itemStructure.length > 0) {
            html += `<h3>Structure d'un item</h3>`;
            html += renderPropsTable(fn.itemStructure, ['Champ', 'Type', 'Description'], ['name','type','desc']);
        }

        // Options table on fn level (for showListMenu options)
        if (fn.optionsTable && fn.optionsTable.length > 0 && fn.itemStructure) {
            // already rendered above
        }

        // Alerts before or after examples
        if (fn.alerts) html += renderAlerts(fn.alerts);

        // Examples
        if (fn.examples && fn.examples.length > 0) {
            html += `<h3>Exemples</h3>`;
            fn.examples.forEach(ex => {
                if (ex.title) html += `<p><strong>${escHtml(ex.title)}</strong></p>`;
                if (ex.code)  html += renderCodeBlock(ex.code);
            });
        }
    });

    // Section-level sub-tables (buttonStructure on the section, not fn)
    if (sec.buttonStructure && sec.buttonStructure.length > 0) {
        html += `<hr style="border:none;border-top:1px solid var(--border);margin:2.5rem 0">`;
        html += `<h2>Structure d'un bouton de grille</h2>`;
        html += renderPropsTable(sec.buttonStructure, ['Champ', 'Type', 'Description'], ['name','type','desc']);
    }
    if (sec.itemStructure && sec.itemStructure.length > 0) {
        html += `<hr style="border:none;border-top:1px solid var(--border);margin:2.5rem 0">`;
        html += `<h2>Structure d'un item</h2>`;
        html += renderPropsTable(sec.itemStructure, ['Champ', 'Type', 'Description'], ['name','type','desc']);
    }

    return html;
}

// Generic property table renderer
function renderPropsTable(rows, headers, keys) {
    if (!rows || rows.length === 0) return '';
    return `
        <table class="params-table">
            <thead>
                <tr>${headers.map(h => `<th>${escHtml(h)}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${rows.map(row => `
                    <tr>
                        ${keys.map(k => {
                            const v = row[k] || '';
                            if (k === 'name')    return `<td><code class="inline-code">${escHtml(v)}</code></td>`;
                            if (k === 'type')    return `<td><span class="type-badge">${escHtml(v)}</span></td>`;
                            if (k === 'default') return `<td>${v ? `<code class="inline-code">${escHtml(v)}</code>` : '<span style="opacity:.4">—</span>'}</td>`;
                            return `<td>${escHtml(v)}</td>`;
                        }).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ── HELPERS ───────────────────────────────────────

function renderAlerts(alerts) {
    if (!alerts || alerts.length === 0) return '';
    return alerts.map(a => `
        <div class="alert alert-${a.type || 'info'}">
            ${a.title ? `<div class="alert-title">${escHtml(a.title)}</div>` : ''}
            ${escHtml(a.text || '')}
        </div>
    `).join('');
}

function renderParamsTable(params) {
    if (!params || params.length === 0) return '';
    return `
        <table class="params-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${params.map(p => `
                    <tr>
                        <td>
                            ${escHtml(p.name || '')}
                            ${p.required ? '<span class="required-badge">Requis</span>' : '<span class="optional-badge">Optionnel</span>'}
                        </td>
                        <td><span class="type-badge">${escHtml(p.type || '')}</span></td>
                        <td>${escHtml(p.desc || '')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderCodeBlock(code) {
    if (!code) return '';
    const lang    = code.lang || 'lua';
    const content = code.content || '';
    return `
        <div class="code-block">
            <div class="code-header">
                <span class="code-lang">${escHtml(lang)}</span>
                <button class="code-copy" onclick="copyCode(this)">Copier</button>
            </div>
            <pre><code class="language-${escHtml(lang)}">${escHtml(content)}</code></pre>
        </div>
    `;
}

function renderSectionNav(resource, currentId) {
    const allSections = [];
    (resource.categories || []).forEach(cat => {
        (cat.items || []).forEach(id => allSections.push(id));
    });

    const idx  = allSections.indexOf(currentId);
    const prev = idx > 0 ? allSections[idx - 1] : null;
    const next = idx < allSections.length - 1 ? allSections[idx + 1] : null;

    if (!prev && !next) return '';

    const getSectionTitle = id => {
        const s = (resource.sections || {})[id];
        return s ? s.title : id;
    };

    let html = `<div class="section-nav">`;
    if (prev) {
        html += `
            <a class="section-nav-item prev" href="#${resource.id}/${prev}">
                <div class="nav-label">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Précédent
                </div>
                <div class="nav-title">${escHtml(getSectionTitle(prev))}</div>
            </a>
        `;
    } else {
        html += `<div></div>`;
    }

    if (next) {
        html += `
            <a class="section-nav-item next" href="#${resource.id}/${next}">
                <div class="nav-label">
                    Suivant
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="nav-title">${escHtml(getSectionTitle(next))}</div>
            </a>
        `;
    } else {
        html += `<div></div>`;
    }

    html += `</div>`;
    return html;
}

function emptyBlock(title, desc) {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">✦</div>
            <div class="empty-state-title">${escHtml(title)}</div>
            <div class="empty-state-desc">${escHtml(desc)}</div>
        </div>
    `;
}

function renderError(msg) {
    return `
        <div style="padding:48px 0;text-align:center;">
            <div style="font-size:32px;margin-bottom:12px;">⚠️</div>
            <div style="font-size:16px;font-weight:600;color:var(--text);margin-bottom:8px;">Erreur</div>
            <div style="font-size:13px;color:var(--text-2);">${escHtml(msg)}</div>
        </div>
    `;
}

// ── TOC ───────────────────────────────────────────
function renderToc() {
    const content  = document.getElementById('content');
    const tocNav   = document.getElementById('tocNav');
    const headings = content.querySelectorAll('h2, h3');

    tocNav.innerHTML = '';
    if (headings.length === 0) return;

    headings.forEach((h, i) => {
        const anchor = `toc-${i}`;
        h.id = anchor;

        const a = document.createElement('a');
        a.className  = `toc-item ${h.tagName === 'H3' ? 'level-3' : ''}`;
        a.href       = `#${anchor}`;
        a.textContent = h.textContent.replace(/^#\s*/, '').trim();

        a.addEventListener('click', e => {
            e.preventDefault();
            h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        tocNav.appendChild(a);
    });

    // Highlight on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const tocItem = tocNav.querySelector(`[href="#${id}"]`);
            if (tocItem) {
                if (entry.isIntersecting) {
                    tocNav.querySelectorAll('.toc-item').forEach(i => i.classList.remove('active'));
                    tocItem.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-20% 0px -75% 0px' });

    headings.forEach(h => observer.observe(h));
}

// ── COPY CODE ──────────────────────────────────────
function copyCode(btn) {
    const code = btn.closest('.code-block').querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.textContent).then(() => {
        btn.textContent = 'Copié ✓';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copier';
            btn.classList.remove('copied');
        }, 2000);
    });
}

function bindCopyButtons() {
    // Already bound via onclick=copyCode(this) — global function
}

function bindFaqItems() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.faq-item').classList.toggle('open');
        });
    });
}

// ── SEARCH ────────────────────────────────────────
function initSearch() {
    const overlay     = document.getElementById('searchOverlay');
    const modalInput  = document.getElementById('searchModalInput');
    const sideInput   = document.getElementById('searchInput');

    // Open on sidebar search click
    sideInput.addEventListener('click', openSearch);

    // Keyboard shortcut ⌘K / Ctrl+K
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape' && state.searchOpen) closeSearch();
    });

    // Close on overlay background click
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeSearch();
    });

    // ESC key label
    document.querySelector('.search-esc').addEventListener('click', closeSearch);

    // Live search
    modalInput.addEventListener('input', () => performSearch(modalInput.value));
}

function openSearch() {
    state.searchOpen = true;
    document.getElementById('searchOverlay').classList.add('open');
    setTimeout(() => document.getElementById('searchModalInput').focus(), 50);
    performSearch('');
}

function closeSearch() {
    state.searchOpen = false;
    document.getElementById('searchOverlay').classList.remove('open');
    document.getElementById('searchModalInput').value = '';
    document.getElementById('searchInput').value = '';
}

function performSearch(query) {
    const results  = document.getElementById('searchModalResults');
    const q        = query.toLowerCase().trim();
    const items    = [];

    (config.resources || []).forEach(resource => {
        (resource.categories || []).forEach(cat => {
            (cat.items || []).forEach(sectionId => {
                const section = (resource.sections || {})[sectionId];
                if (!section) return;
                const title       = section.title || sectionId;
                const description = section.description || '';
                const searchText  = `${title} ${description} ${sectionId}`.toLowerCase();

                if (!q || searchText.includes(q)) {
                    items.push({ resource, sectionId, title, description, cat: cat.title });
                }
            });
        });
    });

    if (items.length === 0) {
        results.innerHTML = `<div class="search-no-results">Aucun résultat pour "<strong>${escHtml(query)}</strong>"</div>`;
        return;
    }

    results.innerHTML = items.slice(0, 20).map(item => `
        <div class="search-result-item" onclick="navigateSearch('${item.resource.id}', '${item.sectionId}')">
            <div class="search-result-title">${escHtml(item.title)}</div>
            <div class="search-result-resource">${escHtml(item.resource.name || item.resource.id)} › ${escHtml(item.cat)}</div>
            ${item.description ? `<div class="search-result-preview">${escHtml(item.description.slice(0, 80))}${item.description.length > 80 ? '…' : ''}</div>` : ''}
        </div>
    `).join('');
}

function navigateSearch(resourceId, sectionId) {
    closeSearch();
    window.location.hash = `${resourceId}/${sectionId}`;
}

// ── MOBILE TOGGLE ─────────────────────────────────
function initMobileToggle() {
    document.getElementById('mobileToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

// ── UTILS ─────────────────────────────────────────
function escHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16) || 99;
    const g = parseInt(hex.slice(3,5), 16) || 102;
    const b = parseInt(hex.slice(5,7), 16) || 241;
    return `rgba(${r},${g},${b},${alpha})`;
}

function id(selector) {
    return document.getElementById(selector);
}
