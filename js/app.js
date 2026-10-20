/* ==========================================================================
   Scoliosi in Età Evolutiva — App logic
   ========================================================================== */
(() => {
  "use strict";

  const STORAGE = {
    onboarded: "scolio_onboarded",
    favorites: "scolio_favorites",
    session: "scolio_session",
    progress: "scolio_progress",
    recent: "scolio_recent"
  };

  const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V2.6A1.6 1.6 0 0110.6 1h2.8A1.6 1.6 0 0115 2.6V4"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none"/></svg>',
    focus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="5"/></svg>',
    muscle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14c-2 0-4-1.8-4-4s1-5 4-5c2 0 2.5 1.5 4 1.5S12 5 14 5c3 0 4 3 4 5a8 8 0 01-8 8c-2 0-2.5-1.5-4-4z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 6.5a1.2 1.2 0 011.2 1.2v5a1.2 1.2 0 01-2.4 0v-5A1.2 1.2 0 0112 8.5zm0 9.6a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    heartOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7.5-4.6-10-9.3C.3 7.9 2 4.5 5.4 4c2-.3 3.9.7 5.1 2.3C11.7 4.7 13.6 3.7 15.6 4c3.4.5 5.1 3.9 3.4 7.7C16.5 16.4 12 21 12 21z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>'
  };

  const CAT_ICON_SVG = {
    "spine-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M8 11l2 2 3-4"/></svg>',
    "rotate-3d": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 11-2.8-6.1"/><path d="M20 4v6h-6"/></svg>',
    "core": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="8" rx="3"/><path d="M8 8V6a4 4 0 018 0v2"/></svg>',
    "balance": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M3 18l9-12 9 12M3 18h18"/></svg>',
    "lungs": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v7m0 0c0 3-2 4-4 5s-3 3-3 5a2 2 0 004 0c0-1 .5-2 2-2m1-8c0 3 2 4 4 5s3 3 3 5a2 2 0 01-4 0c0-1-.5-2-2-2"/></svg>'
  };

  /* Pittogrammi clinici: figure stilizzate in stile "scheda esercizi fisioterapica",
     usate per mostrare in modo visivo e immediato la posizione/azione di ogni fase. */
  const PICTO_WRAP = (inner) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const HEAD = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="4.6" fill="currentColor" stroke="none"/>`;

  const PICTO = {
    "stand-front": PICTO_WRAP(HEAD(24,9) + `<path d="M24 13.5V30M24 16.5L15 27M24 16.5L33 27M24 30L18 44M24 30L30 44"/>`),
    "stand-mirror": PICTO_WRAP(HEAD(18,9) + `<path d="M18 13.5V30M18 16.5L9 27M18 16.5L27 27M18 30L12 44M18 30L24 44"/><path d="M41 4V44" stroke-dasharray="3 4"/>`),
    "stand-straight": PICTO_WRAP(HEAD(24,9) + `<path d="M24 13.5V30M24 16.5L15 27M24 16.5L33 27M24 30L18 44M24 30L30 44"/><path d="M12 20H17M14.5 17.5L17 20L14.5 22.5M36 20H31M33.5 17.5L31 20L33.5 22.5"/>`),
    "forward-bend": PICTO_WRAP(HEAD(35,15) + `<path d="M31.5 19L20 28M31.5 19L35 32M20 28L15 44M20 28L25 44"/>`),
    "prone": PICTO_WRAP(HEAD(9,22) + `<path d="M13.5 24H34M18 24L14 15M34 24L42 17M34 24L42 30"/>`),
    "supine": PICTO_WRAP(HEAD(9,29) + `<path d="M13.5 29H27M27 29L33 20L27.5 18M16 29L12 20"/>`),
    "side-lying": PICTO_WRAP(HEAD(11,23) + `<path d="M15.5 25Q25 27 32 21M32 21L40 17M32 21L36 27M17 26L13 32"/>`),
    "quadruped": PICTO_WRAP(HEAD(11,19) + `<path d="M15.5 21L34 26M18 22V40M32 25V40"/>`),
    "plank": PICTO_WRAP(HEAD(9,23) + `<path d="M13.5 24H36M15 24V38M36 24L41 39"/>`),
    "bridge": PICTO_WRAP(HEAD(9,31) + `<path d="M13 31H18M18 31L24 21H32L37 31" /><path d="M11 33L16 33"/>`),
    "seated": PICTO_WRAP(HEAD(23,9) + `<path d="M23 13.5V26M23 17L17 23M18 10V26H24M33 26V40M23 26H33"/>`),
    "balance-one-leg": PICTO_WRAP(HEAD(24,9) + `<path d="M24 13.5V28M24 16.5L16 22M24 16.5L32 22M24 28L20 44M24 28L29 34L25 36"/>`),
    "walking": PICTO_WRAP(HEAD(24,9) + `<path d="M24 13.5V27M24 16.5L18 25M24 16.5L31 23M24 27L32 44M24 27L17 40"/>`),
    "stairs": PICTO_WRAP(`<path d="M4 44H14V37H24V30H34" stroke-width="2.6"/>` + HEAD(34,21) + `<path d="M34 25.5V31"/>`),
    "breathing": PICTO_WRAP(`<path d="M24 7C15 9 10 18 12 29C13 35 18 40 24 40C30 40 35 35 36 29C38 18 33 9 24 7Z"/><path d="M8 23H3M3 23L6 20M3 23L6 26M40 23H45M45 23L42 20M45 23L42 26"/>`),
    "band": PICTO_WRAP(HEAD(24,9) + `<path d="M24 13.5V29M24 29L19 44M24 29L29 44M24 17L11 21M24 17L37 21"/><path d="M11 21Q17 26 24 21T37 21" stroke-width="2.6"/>`),
    "ball": PICTO_WRAP(`<circle cx="32" cy="28" r="11"/>` + HEAD(11,12) + `<path d="M11 16.5V26M11 19.5L6 24M11 26L7 38M11 26L15 33"/>`),
    "clipboard": PICTO_WRAP(`<rect x="11" y="9" width="26" height="34" rx="3"/><path d="M19 6.5A3 3 0 0122 4h4a3 3 0 013 2.5V10H19z"/><path d="M17 20H31M17 27H31M17 34H25"/>`),
    "spine-xray": PICTO_WRAP(`<circle cx="23" cy="8" r="3" fill="currentColor" stroke="none"/><circle cx="26" cy="15" r="3" fill="currentColor" stroke="none"/><circle cx="22" cy="22" r="3" fill="currentColor" stroke="none"/><circle cx="19" cy="29" r="3" fill="currentColor" stroke="none"/><circle cx="23" cy="36" r="3" fill="currentColor" stroke="none"/><circle cx="26" cy="43" r="3" fill="currentColor" stroke="none"/><path d="M14 15H20M30 22H16M28 29H13" stroke-width="2.2"/>`)
  };

  const ACC_ICONS = {
    obiettivo: ICONS.target,
    indicazioni: ICONS.clipboard,
    materiali: ICONS.list,
    esecuzione: ICONS.list,
    focusClinico: ICONS.focus,
    muscoli: ICONS.muscle
  };

  let DATA = null;
  let state = {
    route: "home",
    param: null,
    activeLevel: "tutti",
    sessionOpenAccordions: new Set()
  };

  /* ---------------- storage helpers ---------------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    }
  };

  function getFavorites() { return store.get(STORAGE.favorites, []); }
  function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) favs = favs.filter(x => x !== id);
    else favs.push(id);
    store.set(STORAGE.favorites, favs);
    return favs.includes(id);
  }
  function getSession() { return store.get(STORAGE.session, []); }
  function setSession(arr) { store.set(STORAGE.session, arr); }
  function getProgress() { return store.get(STORAGE.progress, {}); }
  function setProgress(p) { store.set(STORAGE.progress, p); }
  function pushRecent(id) {
    let r = store.get(STORAGE.recent, []);
    r = r.filter(x => x !== id);
    r.unshift(id);
    r = r.slice(0, 6);
    store.set(STORAGE.recent, r);
  }

  /* ---------------- data ---------------- */
  function findProto(id) { return DATA.protocolli.find(p => p.id === Number(id)); }
  function findCat(slug) { return DATA.categorie.find(c => c.slug === slug); }
  function protosByCat(slug) { return DATA.protocolli.filter(p => p.categoria === slug); }

  const LEVEL_LABEL = { base: "Base", intermedio: "Intermedio", avanzato: "Avanzato" };

  /* ---------------- toast ---------------- */
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerHTML = ICONS.check + "<span>" + msg + "</span>";
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------------- rendering: shared bits ---------------- */
  function protoCardHTML(p) {
    const favs = getFavorites();
    const isFav = favs.includes(p.id);
    const firstPose = p.sequenzaVisiva && p.sequenzaVisiva[0];
    return `
    <div class="proto-card" data-id="${p.id}" role="button">
      <div class="card-badges">
        <div class="numero-badge">${String(p.numero).padStart(2, "0")}</div>
        ${firstPose ? `<div class="picto-badge">${PICTO[firstPose.pose] || ""}</div>` : ""}
      </div>
      <div class="pc-body">
        <h4>${p.titolo}</h4>
        <div class="pc-sub">${p.sottotitolo || ""}</div>
        <div class="pc-meta">
          <span class="badge lvl-${p.livello}">${LEVEL_LABEL[p.livello] || p.livello}</span>
          <span class="badge lvl-eta">${p.eta}</span>
        </div>
      </div>
      <button class="fav-btn ${isFav ? "is-fav" : ""}" data-fav-id="${p.id}" aria-label="Preferito">${ICONS.heartOutline}</button>
    </div>`;
  }

  function renderProtoList(container, list, emptyMsg) {
    if (!list.length) {
      container.innerHTML = `<div class="empty-state">${ICONS.empty}<p>${emptyMsg}</p></div>`;
      return;
    }
    container.innerHTML = list.map(protoCardHTML).join("");
  }

  function bindProtoListEvents(container) {
    container.querySelectorAll(".proto-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".fav-btn")) return;
        navigate("protocollo", card.dataset.id);
      });
    });
    container.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = Number(btn.dataset.favId);
        const isFav = toggleFavorite(id);
        btn.classList.toggle("is-fav", isFav);
        showToast(isFav ? "Aggiunto ai preferiti" : "Rimosso dai preferiti");
        if (state.route === "preferiti") renderFavorites();
      });
    });
  }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    const total = DATA.meta.totaleProtocolli;
    const ready = DATA.meta.protocolliDisponibili;
    document.getElementById("home-progress-fill").style.width = Math.round((ready / total) * 100) + "%";
    document.getElementById("home-progress-label").textContent = ready >= total
      ? `Manuale completo: ${total} protocolli disponibili`
      : `${ready} di ${total} protocolli disponibili · altri in arrivo a breve`;

    const grid = document.getElementById("category-grid");
    grid.innerHTML = DATA.categorie.map(c => {
      const count = protosByCat(c.slug).length;
      return `
      <button class="cat-card c-${c.colore}" data-cat="${c.slug}">
        <div class="cat-icon">${CAT_ICON_SVG[c.icona] || ""}</div>
        <h4>${c.nome}</h4>
        <div class="cat-count">${count} protocolli</div>
      </button>`;
    }).join("");
    grid.querySelectorAll(".cat-card").forEach(el => {
      el.addEventListener("click", () => navigate("categoria", el.dataset.cat));
    });

    const recentIds = store.get(STORAGE.recent, []);
    const recentList = document.getElementById("recent-list");
    const recentProtos = recentIds.map(findProto).filter(Boolean);
    if (!recentProtos.length) {
      const sample = DATA.protocolli.slice(0, 3);
      renderProtoList(recentList, sample, "Nessun protocollo consultato ancora.");
    } else {
      renderProtoList(recentList, recentProtos, "");
    }
    bindProtoListEvents(recentList);
  }

  /* ---------------- CATEGORIES INDEX ---------------- */
  function renderCategoriesIndex() {
    const grid = document.getElementById("category-grid-full");
    grid.innerHTML = DATA.categorie.map(c => {
      const count = protosByCat(c.slug).length;
      return `
      <button class="cat-card c-${c.colore} full-width" data-cat="${c.slug}">
        <div class="cat-icon">${CAT_ICON_SVG[c.icona] || ""}</div>
        <div>
          <h4>${c.nome}</h4>
          <div class="cat-count">${count} protocolli disponibili</div>
        </div>
      </button>`;
    }).join("");
    grid.querySelectorAll(".cat-card").forEach(el => {
      el.addEventListener("click", () => navigate("categoria", el.dataset.cat));
    });
  }

  /* ---------------- CATEGORY ---------------- */
  function renderCategory(slug) {
    const cat = findCat(slug);
    document.getElementById("header-title").textContent = cat ? cat.nome : "Categoria";
    const levelRow = document.getElementById("level-filter-row");
    const levels = ["tutti", "base", "intermedio", "avanzato"];
    levelRow.innerHTML = levels.map(l => `<button class="chip ${state.activeLevel === l ? "active" : ""}" data-level="${l}">${l === "tutti" ? "Tutti i livelli" : LEVEL_LABEL[l]}</button>`).join("");
    levelRow.querySelectorAll(".chip").forEach(c => {
      c.addEventListener("click", () => {
        state.activeLevel = c.dataset.level;
        renderCategory(slug);
      });
    });

    let list = protosByCat(slug);
    if (state.activeLevel !== "tutti") list = list.filter(p => p.livello === state.activeLevel);
    const container = document.getElementById("category-proto-list");
    renderProtoList(container, list, "Nessun protocollo disponibile con questo filtro.");
    bindProtoListEvents(container);
  }

  /* ---------------- SEARCH ---------------- */
  function renderSearch(query) {
    const q = (query || "").trim().toLowerCase();
    const results = document.getElementById("search-results");
    if (!q) { results.innerHTML = ""; return; }
    const matches = DATA.protocolli.filter(p => {
      const hay = [p.titolo, p.sottotitolo, p.obiettivo, findCat(p.categoria)?.nome, ...(p.muscoli || []), ...(p.focusClinico || [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
    renderProtoList(results, matches, "Nessun risultato per questa ricerca.");
    bindProtoListEvents(results);
  }

  /* ---------------- FAVORITES ---------------- */
  function renderFavorites() {
    const ids = getFavorites();
    const list = ids.map(findProto).filter(Boolean);
    const container = document.getElementById("favorites-list");
    renderProtoList(container, list, "Non hai ancora salvato protocolli nei preferiti. Tocca il cuore su un protocollo per salvarlo qui.");
    bindProtoListEvents(container);
  }

  /* ---------------- PROTOCOL DETAIL ---------------- */
  function renderProtocolDetail(id) {
    const p = findProto(id);
    const view = document.getElementById("view-protocol");
    if (!p) { view.innerHTML = `<div class="empty-state">${ICONS.empty}<p>Protocollo non trovato.</p></div>`; return; }
    pushRecent(p.id);
    const cat = findCat(p.categoria);
    const favs = getFavorites();
    const isFav = favs.includes(p.id);
    const progress = getProgress();
    const doneSteps = new Set(progress[p.id] || []);
    const inSession = getSession().includes(p.id);

    const visualSeq = (p.sequenzaVisiva || []).map(s => `
      <div class="visu-item">
        <div class="visu-icon">${PICTO[s.pose] || PICTO["clipboard"]}</div>
        <div class="visu-label">${s.label}</div>
      </div>`).join("");

    const statTiles = [];
    if (p.parametri) {
      const labels = { serie: "Serie", ripetizioni: "Ripetizioni", durata: "Durata", frequenza: "Frequenza" };
      Object.entries(p.parametri).forEach(([k, v]) => {
        statTiles.push(`<div class="stat-tile"><div class="v">${v}</div><div class="l">${labels[k] || k}</div></div>`);
      });
    }

    const accItems = [];
    accItems.push(accItem("obiettivo", "Obiettivo Clinico", `<p>${p.obiettivo}</p>`, true));
    accItems.push(accItem("indicazioni", "Indicazioni", `<p>${p.indicazioni}</p>`));
    if (p.materiali && p.materiali.length) {
      accItems.push(accItem("materiali", "Materiali Necessari", `<div class="chip-list">${p.materiali.map(m => `<span class="chip-static">${m}</span>`).join("")}</div>`));
    }
    accItems.push(accItem("esecuzione", "Esecuzione Clinica (Metodo Sequenziale)", `
      <ul class="step-list">
        ${p.esecuzione.map((s, i) => {
          const checked = doneSteps.has(i);
          return `<li>
            <button class="step-check ${checked ? "checked" : ""}" data-step="${i}">${ICONS.check}</button>
            <span class="step-text ${checked ? "done" : ""}">${s}</span>
          </li>`;
        }).join("")}
      </ul>`, true));
    if (p.focusClinico && p.focusClinico.length) {
      accItems.push(accItem("focusClinico", "Focus Clinico", `<div class="chip-list">${p.focusClinico.map(m => `<span class="chip-static">${m}</span>`).join("")}</div>`));
    }
    if (p.muscoli && p.muscoli.length) {
      accItems.push(accItem("muscoli", "Muscoli Coinvolti", `<div class="chip-list">${p.muscoli.map(m => `<span class="chip-static muscle">${m}</span>`).join("")}</div>`));
    }

    view.innerHTML = `
      <div class="proto-detail-head">
        <div class="back-row">
          <button class="icon-btn" id="detail-back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
          <button class="icon-btn ${isFav ? "is-active" : ""}" id="detail-fav">${ICONS.heartOutline}</button>
        </div>
        <div class="cat-tag">${cat ? cat.nome : ""} · Protocollo ${String(p.numero).padStart(2, "0")}</div>
        <h2>${p.titolo}</h2>
        <div class="sub">${p.sottotitolo || ""}</div>
        <div class="pc-meta">
          <span class="badge lvl-${p.livello}">${LEVEL_LABEL[p.livello]}</span>
          <span class="badge lvl-eta">${p.eta}</span>
        </div>
      </div>
      ${visualSeq ? `<div class="visual-sequence"><div class="visu-track">${visualSeq}</div></div>` : ""}
      ${statTiles.length ? `<div class="stat-tiles">${statTiles.join("")}</div>` : ""}
      <div class="accordion">${accItems.join("")}</div>
      ${p.precauzioni ? `<div class="warn-box">${ICONS.warn}<p><b>Precauzioni:</b> ${p.precauzioni}</p></div>` : ""}
      ${p.progressione ? `<div class="next-box">${ICONS.arrow}<p><b>Come proseguire:</b> ${p.progressione}</p></div>` : ""}
      <div class="detail-actions">
        <button class="btn-session ${inSession ? "in-session" : ""}" id="detail-session-btn">
          ${inSession ? ICONS.check : ICONS.plus} ${inSession ? "Nella seduta di oggi" : "Aggiungi alla seduta"}
        </button>
      </div>
    `;

    view.querySelectorAll(".acc-head").forEach(h => {
      h.addEventListener("click", () => h.parentElement.classList.toggle("open"));
    });
    view.querySelectorAll(".step-check").forEach(btn => {
      btn.addEventListener("click", () => {
        const stepIdx = Number(btn.dataset.step);
        const prog = getProgress();
        const arr = new Set(prog[p.id] || []);
        if (arr.has(stepIdx)) arr.delete(stepIdx); else arr.add(stepIdx);
        prog[p.id] = Array.from(arr);
        setProgress(prog);
        btn.classList.toggle("checked");
        const span = btn.nextElementSibling;
        span.classList.toggle("done");
      });
    });
    document.getElementById("detail-back").addEventListener("click", () => history.back());
    document.getElementById("detail-fav").addEventListener("click", (e) => {
      const nowFav = toggleFavorite(p.id);
      e.currentTarget.classList.toggle("is-active", nowFav);
      showToast(nowFav ? "Aggiunto ai preferiti" : "Rimosso dai preferiti");
    });
    document.getElementById("detail-session-btn").addEventListener("click", (e) => {
      let session = getSession();
      if (session.includes(p.id)) {
        session = session.filter(x => x !== p.id);
        showToast("Rimosso dalla seduta");
      } else {
        session.push(p.id);
        showToast("Aggiunto alla seduta di oggi");
      }
      setSession(session);
      updateSessionBadge();
      renderProtocolDetail(id);
    });
  }

  function accItem(key, title, bodyHTML, openDefault) {
    return `
    <div class="acc-item ${openDefault ? "open" : ""}">
      <div class="acc-head">
        <div class="acc-icon">${ACC_ICONS[key] || ICONS.list}</div>
        <h4>${title}</h4>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="acc-body"><div class="acc-body-inner">${bodyHTML}</div></div>
    </div>`;
  }

  /* ---------------- SESSION MODE ---------------- */
  function renderSession() {
    const ids = getSession();
    const progress = getProgress();
    const list = document.getElementById("session-list");
    if (!ids.length) {
      list.innerHTML = `<div class="empty-state">${ICONS.empty}<p>Nessun protocollo aggiunto alla seduta di oggi. Apri un protocollo e tocca "Aggiungi alla seduta".</p></div>`;
      document.getElementById("session-progress-fill").style.width = "0%";
      document.getElementById("session-progress-label").textContent = "Nessun protocollo in seduta";
      return;
    }
    let totalSteps = 0, doneStepsCount = 0;
    const items = ids.map((id, idx) => {
      const p = findProto(id);
      if (!p) return "";
      const done = new Set(progress[id] || []);
      totalSteps += p.esecuzione.length;
      doneStepsCount += done.size;
      const completed = done.size === p.esecuzione.length;
      return `
      <div class="session-item ${completed ? "completed" : ""}" data-id="${p.id}">
        <div class="drag-num">${idx + 1}</div>
        <div class="si-title">${p.titolo}</div>
        <button class="si-remove" data-remove="${p.id}">${ICONS.trash}</button>
      </div>`;
    }).join("");
    list.innerHTML = items;
    const pct = totalSteps ? Math.round((doneStepsCount / totalSteps) * 100) : 0;
    document.getElementById("session-progress-fill").style.width = pct + "%";
    document.getElementById("session-progress-label").textContent = `${ids.length} protocolli in seduta · ${pct}% dei passaggi completati`;

    list.querySelectorAll(".session-item").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".si-remove")) return;
        navigate("protocollo", el.dataset.id);
      });
    });
    list.querySelectorAll(".si-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        let session = getSession().filter(x => x !== Number(btn.dataset.remove));
        setSession(session);
        updateSessionBadge();
        renderSession();
      });
    });
  }

  function updateSessionBadge() {
    const n = getSession().length;
    const badge = document.getElementById("session-badge");
    badge.hidden = n === 0;
    badge.textContent = n;
  }

  /* ---------------- ROUTER ---------------- */
  const VIEWS = ["home", "categorie", "categoria", "protocollo", "sessione", "preferiti", "cerca"];
  const VIEW_EL = {
    home: "view-home", categorie: "view-categories", categoria: "view-category", protocollo: "view-protocol",
    sessione: "view-session", preferiti: "view-favorites", cerca: "view-search"
  };
  const HEADER_TITLES = {
    home: "70 Protocolli Riabilitativi", categorie: "Aree Cliniche", categoria: "Categoria", protocollo: "Protocollo",
    sessione: "Modalità Seduta", preferiti: "I Tuoi Preferiti", cerca: "Cerca nei protocolli"
  };

  function navigate(route, param) {
    const hash = param ? `#/${route}/${param}` : `#/${route}`;
    if (location.hash === hash) renderRoute(route, param);
    else location.hash = hash;
  }

  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    const parts = h.split("/").filter(Boolean);
    return { route: parts[0] || "home", param: parts[1] || null };
  }

  function renderRoute(route, param) {
    if (!VIEWS.includes(route)) route = "home";
    state.route = route; state.param = param;

    Object.values(VIEW_EL).forEach(elId => {
      const el = document.getElementById(elId);
      if (el) el.hidden = true;
    });
    const el = document.getElementById(VIEW_EL[route]);
    if (el) { el.hidden = false; el.classList.remove("view-enter"); void el.offsetWidth; el.classList.add("view-enter"); }

    document.getElementById("header-title").textContent =
      route === "categoria" && findCat(param) ? findCat(param).nome : HEADER_TITLES[route];
    document.getElementById("btn-back").hidden = route === "home";

    document.querySelectorAll(".nav-btn").forEach(b => {
      const isActive = b.dataset.route === route || (b.dataset.route === "categorie" && route === "categoria");
      b.classList.toggle("active", isActive);
    });

    if (route === "home") renderHome();
    else if (route === "categorie") renderCategoriesIndex();
    else if (route === "categoria") { state.activeLevel = "tutti"; renderCategory(param); }
    else if (route === "protocollo") renderProtocolDetail(param);
    else if (route === "sessione") renderSession();
    else if (route === "preferiti") renderFavorites();
    else if (route === "cerca") { document.getElementById("search-input").value = ""; document.getElementById("search-results").innerHTML = ""; setTimeout(() => document.getElementById("search-input").focus(), 200); }

    window.scrollTo(0, 0);
  }

  function handleHashChange() {
    const { route, param } = parseHash();
    renderRoute(route, param);
  }

  /* ---------------- INIT ---------------- */
  function initNav() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => navigate(btn.dataset.route));
    });
    document.getElementById("btn-back").addEventListener("click", () => history.back());
    document.getElementById("btn-search-toggle").addEventListener("click", () => navigate("cerca"));
    document.getElementById("search-input").addEventListener("input", (e) => renderSearch(e.target.value));
    document.getElementById("btn-clear-session").addEventListener("click", () => {
      setSession([]);
      updateSessionBadge();
      renderSession();
      showToast("Seduta svuotata");
    });
    window.addEventListener("hashchange", handleHashChange);
  }

  function initOnboarding() {
    const onboarded = store.get(STORAGE.onboarded, false);
    const obView = document.getElementById("view-onboarding");
    const header = document.getElementById("app-header");
    const nav = document.getElementById("bottom-nav");
    if (onboarded) {
      obView.hidden = true;
      header.hidden = false;
      nav.hidden = false;
    } else {
      header.hidden = true;
      nav.hidden = true;
    }
    document.getElementById("btn-start").addEventListener("click", () => {
      store.set(STORAGE.onboarded, true);
      obView.hidden = true;
      header.hidden = false;
      nav.hidden = false;
      navigate("home");
      handleHashChange();
    });
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
    }
  }

  async function boot() {
    try {
      const res = await fetch("data/protocolli.json");
      DATA = await res.json();
    } catch (e) {
      document.getElementById("main-content").innerHTML = `<div class="empty-state">${ICONS.empty}<p>Impossibile caricare i protocolli. Controlla la connessione e riprova.</p></div>`;
      return;
    }
    document.getElementById("ob-stat-total").textContent = DATA.meta.totaleProtocolli;
    document.getElementById("ob-stat-ready").textContent = DATA.meta.protocolliDisponibili;
    initNav();
    initOnboarding();
    updateSessionBadge();
    if (!location.hash) location.hash = "#/home";
    handleHashChange();
    registerServiceWorker();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
