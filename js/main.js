/* =============================================================
   Main script — paper rendering + visitors globe.
   Classic homepage style: simple list with thumbnail + text.
   ============================================================= */

(function () {
  "use strict";

  let _paperUid = 0;

  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function authorHTML(a) {
    if (typeof a === "string") return a;
    const star = a && a.equal ? `<sup class="eq">*</sup>` : "";
    if (a && a.me) return `<span class="me">${a.name}</span>${star}`;
    return (a.name || "") + star;
  }

  function paperEntry(p) {
    const links = p.links || {};
    const linkParts = [];
    if (links.arxiv) linkParts.push(`<a href="${links.arxiv}" target="_blank" rel="noopener">Paper</a>`);
    if (links.pdf)   linkParts.push(`<a href="${links.pdf}"   target="_blank" rel="noopener">PDF</a>`);
    if (links.code)  linkParts.push(`<a href="${links.code}"  target="_blank" rel="noopener">Code</a>`);
    if (links.page)  linkParts.push(`<a href="${links.page}"  target="_blank" rel="noopener">Project Page</a>`);

    // thumbnail / carousel
    const thumbs = (p.thumbs && p.thumbs.length) ? p.thumbs : (p.thumb ? [p.thumb] : []);
    let thumbHTML;
    if (thumbs.length === 0) {
      thumbHTML = `<div class="paper-thumb placeholder">${p.abbr || (p.title.split(":")[0].trim())}</div>`;
    } else if (thumbs.length === 1) {
      thumbHTML = `<div class="paper-thumb"><img src="${thumbs[0]}" alt="${p.title} figure" loading="lazy" /></div>`;
    } else {
      const slides = thumbs.map((src, i) =>
        `<img class="cr-slide ${i===0?'is-active':''}" src="${src}" alt="figure ${i+1}" loading="lazy" />`
      ).join("");
      const dots = thumbs.map((_, i) =>
        `<button class="cr-dot ${i===0?'is-active':''}" data-i="${i}" aria-label="figure ${i+1}"></button>`
      ).join("");
      thumbHTML = `<div class="paper-thumb carousel">
        <div class="cr-track">${slides}</div>
        <button class="cr-arrow cr-prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="cr-arrow cr-next" aria-label="Next">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="cr-counter"><span class="cr-cur">1</span>/${thumbs.length}</div>
        <div class="cr-dots">${dots}</div>
      </div>`;
    }

    const authors = (p.authors || []).map(authorHTML).join(", ");
    const venue = p.venue ? `${p.venue}.` : `${p.year}.`;

    // Collapsible details: TLDR (uses p.tldr) + BibTeX (uses p.bibtex)
    const tldrId = `tldr-${++_paperUid}`;
    const bibId  = `bib-${_paperUid}`;
    const details = [];
    if (p.tldr) {
      linkParts.push(`<button class="paper-toggle" type="button" data-target="${tldrId}" aria-expanded="false">TLDR <span class="toggle-arrow">▾</span></button>`);
      details.push(`<div id="${tldrId}" class="paper-detail tldr" hidden>${escapeHTML(p.tldr)}</div>`);
    }
    if (p.bibtex) {
      linkParts.push(`<button class="paper-toggle" type="button" data-target="${bibId}" aria-expanded="false">BibTeX <span class="toggle-arrow">▾</span></button>`);
      details.push(`<div id="${bibId}" class="paper-detail bib" hidden><button class="bib-copy" type="button" title="Copy BibTeX" aria-label="Copy">⧉</button><pre>${escapeHTML(p.bibtex)}</pre></div>`);
    }

    return `
      <div class="paper">
        ${thumbHTML}
        <div class="paper-info">
          <p class="paper-title">${p.title}</p>
          <p class="paper-authors">${authors}</p>
          <p class="paper-venue">${venue} ${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join("")}</p>
          <p class="paper-links">${linkParts.join(" ")}</p>
          ${details.join("")}
        </div>
      </div>`;
  }

  function bindPaperDetails(root) {
    root.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".paper-toggle");
      const copyBtn   = e.target.closest(".bib-copy");
      if (toggleBtn) {
        e.preventDefault();
        const id = toggleBtn.dataset.target;
        const target = document.getElementById(id);
        if (!target) return;
        const paper = toggleBtn.closest(".paper");
        // Mutual exclusion: collapse the other detail panel inside the same paper.
        paper.querySelectorAll(".paper-detail").forEach(d => {
          if (d !== target) d.setAttribute("hidden", "");
        });
        paper.querySelectorAll(".paper-toggle").forEach(b => {
          if (b !== toggleBtn) {
            b.classList.remove("is-open");
            b.setAttribute("aria-expanded", "false");
          }
        });
        const willOpen = target.hasAttribute("hidden");
        if (willOpen) {
          target.removeAttribute("hidden");
          toggleBtn.classList.add("is-open");
          toggleBtn.setAttribute("aria-expanded", "true");
        } else {
          target.setAttribute("hidden", "");
          toggleBtn.classList.remove("is-open");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      } else if (copyBtn) {
        e.preventDefault();
        const pre = copyBtn.parentElement.querySelector("pre");
        if (!pre || !navigator.clipboard) return;
        navigator.clipboard.writeText(pre.textContent).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = "\u2713";
          copyBtn.classList.add("is-copied");
          setTimeout(() => {
            copyBtn.textContent = original;
            copyBtn.classList.remove("is-copied");
          }, 1200);
        });
      }
    });
  }

  function bindCarousels(root) {
    root.querySelectorAll(".paper-thumb.carousel").forEach(c => {
      const slides = Array.from(c.querySelectorAll(".cr-slide"));
      const dots   = Array.from(c.querySelectorAll(".cr-dot"));
      const cur    = c.querySelector(".cr-cur");
      const total  = slides.length;
      if (total < 2) return;
      let i = 0;
      const show = (n) => {
        i = (n + total) % total;
        slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
        dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
        if (cur) cur.textContent = i + 1;
      };
      c.querySelector(".cr-prev")?.addEventListener("click", e => { e.stopPropagation(); show(i - 1); });
      c.querySelector(".cr-next")?.addEventListener("click", e => { e.stopPropagation(); show(i + 1); });
      dots.forEach(d => d.addEventListener("click", e => {
        e.stopPropagation(); show(parseInt(d.dataset.i, 10));
      }));
      // Drag-to-swipe (mouse / touch / pen) via Pointer Events.
      let sx = null, sy = null, dragging = false;
      const SWIPE_THRESHOLD = 30;
      c.addEventListener("pointerdown", e => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        // Let inner controls (arrows, dots) keep their native click behavior.
        if (e.target.closest(".cr-arrow, .cr-dot")) return;
        sx = e.clientX; sy = e.clientY; dragging = true;
        c.classList.add("is-grabbing");
        try { c.setPointerCapture(e.pointerId); } catch (_) {}
      });
      c.addEventListener("pointermove", e => {
        if (!dragging || sx == null) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        // Once the gesture is clearly horizontal, suppress text / image selection.
        if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy) && e.cancelable) e.preventDefault();
      });
      const endDrag = (e) => {
        if (!dragging) return;
        const dx = (sx == null) ? 0 : (e.clientX - sx);
        const dy = (sy == null) ? 0 : (e.clientY - sy);
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          show(i + (dx < 0 ? 1 : -1));
        }
        sx = sy = null; dragging = false;
        c.classList.remove("is-grabbing");
        try { c.releasePointerCapture(e.pointerId); } catch (_) {}
      };
      c.addEventListener("pointerup", endDrag);
      c.addEventListener("pointercancel", endDrag);
      // Block the browser's native image drag so it doesn't hijack the swipe.
      c.addEventListener("dragstart", e => e.preventDefault());
    });
  }

  function isFirstAuthor(p) {
    const a = (p.authors || [])[0];
    return !!(a && typeof a === "object" && a.me);
  }

  function renderPapers() {
    if (!window.PAPERS) return;
    const sorted = window.PAPERS.slice().map((p, i) => ({ p, i }));
    sorted.sort((a, b) => {
      if (b.p.year !== a.p.year) return b.p.year - a.p.year;
      return a.i - b.i;
    });

    const firstList = document.getElementById("first-author-list");
    const coList    = document.getElementById("co-author-list");

    const first = sorted.filter(({ p }) => isFirstAuthor(p));
    const co    = sorted.filter(({ p }) => !isFirstAuthor(p))
      .sort((a, b) => {
        // Co-authored: by citations desc, then year desc (newer first on tie).
        const c = (b.p.citations || 0) - (a.p.citations || 0);
        if (c !== 0) return c;
        return (b.p.year || 0) - (a.p.year || 0);
      });

    if (firstList) {
      firstList.innerHTML = first.map(({ p }) => paperEntry(p)).join("");
      bindCarousels(firstList);
      bindPaperDetails(firstList);
    }
    if (coList) {
      coList.innerHTML = co.map(({ p }) => paperEntry(p)).join("");
      bindCarousels(coList);
      bindPaperDetails(coList);
    }
  }

  // ----- Theme toggle ------------------------------------------------------
  // Default = dark. Click flips to light. Choice persists in localStorage.
  // The globe is re-rendered with theme-specific texture & lighting on toggle.
  function initTheme() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const apply = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      // Re-render globe with theme-specific texture/lighting if it already exists.
      const el = document.getElementById("globeViz");
      if (el && _lastYouPoint) renderGlobe(el, _lastYouPoint);
    };

    // Hydrate the toggle from whatever the inline boot script set on <html>.
    apply(getCurrentTheme());

    btn.addEventListener("click", () => {
      const next = getCurrentTheme() === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      apply(next);
    });
  }

  // ----- Visitors globe ---------------------------------------------------
  // continent codes: AS / EU / NA / SA / OC / AF

  // Theme-aware visual configuration for the globe.
  // Light theme uses the bright "blue marble" texture under a strong sun;
  // dark theme keeps the existing night-earth-with-city-lights look.
  const THEME_GLOBE_CONFIG = {
    dark: {
      // NASA Black Marble — city lights you'd see from a plane window at night.
      globeImage:         "//unpkg.com/three-globe/example/img/earth-night.jpg",
      atmosphereColor:    "#22d3ee",
      atmosphereAltitude: 0.32,
      youColor:           "#22d3ee",
      otherColor:         "#ec4899",
      youRing:            t => `rgba(34, 211, 238, ${1 - t})`,
      otherRing:          t => `rgba(236, 72, 153, ${(1 - t) * 0.75})`,
      // Multiplied by Math.PI internally because three.js + globe.gl uses PI-scaled intensities.
      // Dim the sun + lift ambient so the city lights stay readable everywhere.
      sunIntensity:       0.55,
      ambientIntensity:   0.45,
      sunPosition:        [3, 1.5, 2],
      shininess:          0.7,
      bumpScale:          8,
      // Reuse the night texture as an emissive map so lights glow on their own,
      // independent of the sun direction (the "plane at night" look).
      emissive:           0xffd9a8,
      emissiveIntensity:  1.35
    },
    light: {
      globeImage:         "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      atmosphereColor:    "#7dd3fc",
      atmosphereAltitude: 0.28,
      youColor:           "#e11d48",
      otherColor:         "#d97706",
      youRing:            t => `rgba(225, 29, 72, ${1 - t})`,
      otherRing:          t => `rgba(217, 119, 6, ${(1 - t) * 0.75})`,
      sunIntensity:       3.2,
      ambientIntensity:   0.55,
      sunPosition:        [3, 1.5, 2],
      shininess:          12,
      bumpScale:          6,
      emissive:           0x000000,
      emissiveIntensity:  0
    }
  };

  function getCurrentTheme() {
    const t = document.documentElement.getAttribute("data-theme");
    return (t === "dark") ? "dark" : "light";
  }

  let _lastYouPoint = null;
  // Cached real visitors fetched from Supabase (set after first successful load).
  let _realVisitors = null;

  // ─── Supabase configuration ─────────────────────────────────────────────────
  // Fill in YOUR Supabase project URL and anon (public) key below.
  const SUPABASE_URL  = "https://xgtwtrzpzybrsbcdyawr.supabase.co";
  const SUPABASE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndHd0cnpwenlicnNiY2R5YXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzU1NDIsImV4cCI6MjA5NjQxMTU0Mn0._NnAWDQdyCzcQ9baKQsB9zYLN_qvVj7LxkkyDqXmHqs";

  let _supabase = null;
  function getSupabase() {
    if (_supabase) return _supabase;
    if (!SUPABASE_URL || SUPABASE_URL.indexOf("YOUR_") === 0 || !window.supabase) return null;
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return _supabase;
  }

  // Log the current visitor's location into Supabase (deduplicated by ip_hash).
  function logVisitor(ipData) {
    const sb = getSupabase();
    if (!sb || !ipData) return Promise.resolve();
    const ipHash = simpleHash(ipData.ip || "unknown");
    return sb.from("visitors").upsert({
      ip_hash:   ipHash,
      city:      ipData.city || "Unknown",
      lat:       parseFloat(ipData.latitude),
      lng:       parseFloat(ipData.longitude),
      continent: ipData.continent_code || guessContinent(parseFloat(ipData.latitude), parseFloat(ipData.longitude)),
      last_seen: new Date().toISOString()
    }, { onConflict: "ip_hash" }).then(() => {});
  }

  // Fetch all unique visitor locations from Supabase.
  function fetchAllVisitors() {
    const sb = getSupabase();
    if (!sb) return Promise.resolve(null);
    return sb.from("visitors")
      .select("city, lat, lng, continent, visit_count")
      .order("last_seen", { ascending: false })
      .limit(500)
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) return null;
        return data.map(r => ({
          name:      r.city,
          lat:       r.lat,
          lng:       r.lng,
          size:      Math.min(0.9, 0.25 + (r.visit_count || 1) * 0.05),
          continent: r.continent || "AS"
        }));
      })
      .catch(() => null);
  }

  // Simple non-crypto hash for deduplication.
  function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return "v_" + Math.abs(h).toString(36);
  }


  const CONTINENT_NAMES = {
    AS: "Asia", EU: "Europe", NA: "N. America",
    SA: "S. America", OC: "Oceania", AF: "Africa", AN: "Antarctica"
  };
  const CONTINENT_ORDER = ["AS", "EU", "NA", "SA", "OC", "AF", "AN"];

  const HOME = { lat: 30.2741, lng: 120.1551 };
  const ARC_TARGETS = ["Tokyo","Singapore","San Francisco","New York","London","Paris","Sydney","Boston","Berlin","Hong Kong","Bangalore","Toronto"];

  function buildArcs(visitors) {
    const palette = [
      ["rgba(34,211,238,0)",  "rgba(34,211,238,0.95)"],   // cyan
      ["rgba(236,72,153,0)",  "rgba(236,72,153,0.85)"],   // pink
      ["rgba(167,139,250,0)", "rgba(167,139,250,0.85)"],  // violet
      ["rgba(74,222,128,0)",  "rgba(74,222,128,0.80)"]    // green
    ];
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    const list = visitors || [];
    const arcs = list
      .filter(c => ARC_TARGETS.includes(c.name))
      .map(c => ({
        startLat: HOME.lat,
        startLng: HOME.lng,
        endLat: c.lat,
        endLng: c.lng,
        color: pick()
      }));

    // Extra hub-to-hub data links — denser, more "network ops" feel.
    const hubs = ["San Francisco", "New York", "London", "Tokyo", "Singapore", "Sydney", "Berlin", "Boston"];
    const hubCities = list.filter(c => hubs.includes(c.name));
    for (let i = 0; i < hubCities.length; i++) {
      for (let j = i + 1; j < hubCities.length; j++) {
        if (Math.random() < 0.42) {
          arcs.push({
            startLat: hubCities[i].lat, startLng: hubCities[i].lng,
            endLat:   hubCities[j].lat, endLng:   hubCities[j].lng,
            color: pick()
          });
        }
      }
    }
    // For real visitors, add arcs from HOME to top visited cities.
    if (visitors && visitors.length > 0) {
      visitors.slice(0, 12).forEach(c => {
        if (!ARC_TARGETS.includes(c.name)) {
          arcs.push({
            startLat: HOME.lat, startLng: HOME.lng,
            endLat: c.lat, endLng: c.lng,
            color: pick()
          });
        }
      });
    }
    return arcs;
  }

  // Try to fetch the visitor's real geolocation via a free IP API.
  // Also logs the visitor to Supabase for persistent tracking.
  function fetchVisitorByIP() {
    return fetch("https://ipapi.co/json/", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        const lat = parseFloat(d.latitude);
        const lng = parseFloat(d.longitude);
        if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
        // Log this visitor to Supabase (fire-and-forget).
        logVisitor(d);
        return {
          name: d.city ? `you · ${d.city}` : "you",
          lat, lng,
          size: 1.4,
          you: true,
          continent: d.continent_code || guessContinent(lat, lng)
        };
      })
      .catch(() => null);
  }

  // Rough continent inference from lat/lng — only used as a fallback.
  function guessContinent(lat, lng) {
    if (lat >= 35 && lng >= -25 && lng <= 60) return "EU";
    if (lat <  35 && lat > -35 && lng >= -20 && lng <= 55) return "AF";
    if (lng >= 55 && lng <= 180 && lat >= -10) return "AS";
    if (lng >= 110 && lat < -10) return "OC";
    if (lng < -30 && lat >= 12) return "NA";
    if (lng < -30 && lat <  12) return "SA";
    return "AS";
  }

  function tryGuessHere() {
    const tz = new Date().getTimezoneOffset();
    const lng = -tz / 4;
    const lat = 30 - Math.abs(tz) / 60 * 1.2;
    const cl = Math.max(-60, Math.min(60, lat));
    const cg = Math.max(-180, Math.min(180, lng));
    return { name: "you", lat: cl, lng: cg, size: 1.4, you: true, continent: guessContinent(cl, cg) };
  }

  function renderContinentStats(points, youContinent) {
    const stats = {};
    const byCity = {};   // continent -> city -> count
    points.forEach(p => {
      const c = p.continent || "AS";
      stats[c] = (stats[c] || 0) + 1;
      // Records WITHOUT a real city name still count toward the continent total
      // above, but are skipped from the city pill list below to avoid lonely
      // "Unknown" / "you" pills cluttering the panel.
      const rawName = (p.name || "").replace(/^you\s*·\s*/i, "").trim();
      if (!rawName || /^(you|unknown)$/i.test(rawName)) return;
      byCity[c] = byCity[c] || {};
      byCity[c][rawName] = (byCity[c][rawName] || 0) + 1;
    });
    const el = document.getElementById("continentStats");
    if (!el) return Object.keys(stats).length;
    el.innerHTML = CONTINENT_ORDER
      .filter(c => stats[c])
      .map(c => {
        const isYou = c === youContinent ? " is-you" : "";
        return `<button type="button" class="cont-stat${isYou}" data-c="${c}" aria-expanded="false">${CONTINENT_NAMES[c]} <em>${stats[c]}</em></button>`;
      })
      .join("");
    const panel = document.getElementById("continentCities");
    if (panel) {
      el.querySelectorAll(".cont-stat").forEach(btn => {
        btn.addEventListener("click", () => {
          const c = btn.dataset.c;
          const wasOpen = btn.classList.contains("is-active");
          el.querySelectorAll(".cont-stat.is-active").forEach(b => {
            b.classList.remove("is-active");
            b.setAttribute("aria-expanded", "false");
          });
          if (wasOpen) {
            panel.setAttribute("hidden", "");
            panel.innerHTML = "";
            return;
          }
          btn.classList.add("is-active");
          btn.setAttribute("aria-expanded", "true");
          const dict = byCity[c] || {};
          const cities = Object.keys(dict).sort((a, b) => dict[b] - dict[a]);
          panel.innerHTML = `<span class="cont-cities-label">${CONTINENT_NAMES[c]}:</span> ` +
            cities.map(city => {
              const cnt = dict[city] > 1 ? ` ×${dict[city]}` : "";
              return `<span class="cc-pill">${city}${cnt}</span>`;
            }).join(" ");
          panel.removeAttribute("hidden");
        });
      });
    }
    return Object.keys(stats).length;
  }

  function initGlobe() {
    const el = document.getElementById("globeViz");
    if (!el) return;
    if (typeof Globe === "undefined") {
      el.innerHTML = '<div style="display:flex;height:100%;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font:14px Georgia">Globe failed to load.</div>';
      return;
    }

    // Render the globe immediately with fallback data, then upgrade
    // progressively as real data arrives from Supabase + IP API.
    const fallbackYou = tryGuessHere();
    renderGlobe(el, fallbackYou);

    Promise.all([
      fetchAllVisitors(),
      fetchVisitorByIP()
    ]).then(([visitors, realYou]) => {
      if (visitors && visitors.length > 0) {
        _realVisitors = visitors;
      }
      const you = realYou || fallbackYou;
      renderGlobe(el, you);
    });
  }

  // Tear down a previous globe instance (if any) before re-rendering.
  let _globeInstance = null;
  function renderGlobe(el, youPoint) {
    _lastYouPoint = youPoint;
    const theme  = getCurrentTheme();
    const config = THEME_GLOBE_CONFIG[theme];

    if (_globeInstance && typeof _globeInstance._destructor === "function") {
      try { _globeInstance._destructor(); } catch (e) { /* ignore */ }
    }
    el.innerHTML = "";

    const visitors = _realVisitors || [];
    const points = visitors.concat([youPoint]);

    // Real Earth texture + atmosphere glow, pulsating rings on visitors,
    // glowing arcs and a denser hub-to-hub data network.
    const globe = Globe()
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl(config.globeImage)
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      // bright pin dots for visitors
      .pointsData(points)
      .pointLat("lat").pointLng("lng")
      .pointAltitude(d => d.you ? 0.025 : 0.01)
      .pointRadius(d => d.you ? 1.05 : 0.20)
      .pointColor(d => d.you ? config.youColor : config.otherColor)
      .pointResolution(20)
      .pointLabel(d => {
        const tag = (theme === "light")
          ? `background:#ffffff;color:#1f2328;border:1px solid rgba(31,35,40,.15);box-shadow:0 1px 4px rgba(0,0,0,.15)`
          : `background:#0b0c0f;color:#fff;border:1px solid rgba(255,255,255,.12)`;
        const youTag = (theme === "light")
          ? `background:#ffffff;color:#e11d48;border:1px solid rgba(225,29,72,.45);box-shadow:0 0 12px rgba(225,29,72,.3)`
          : `background:#0b0c0f;color:#22d3ee;border:1px solid rgba(34,211,238,.45);box-shadow:0 0 12px rgba(34,211,238,.35)`;
        return d.you
          ? `<div style="font:600 12px Georgia, serif;${youTag};padding:4px 8px;border-radius:6px">👋 ${d.name}</div>`
          : `<div style="font:500 12px Georgia, serif;${tag};padding:4px 8px;border-radius:6px">${d.name}</div>`;
      })
      // pulsating rings on every point
      .ringsData(points)
      .ringLat("lat").ringLng("lng")
      .ringMaxRadius(d => d.you ? 7 : 2.6)
      .ringPropagationSpeed(d => d.you ? 4 : 1.6)
      .ringRepeatPeriod(d => d.you ? 700 : 1400 + Math.random() * 1100)
      .ringAltitude(0.004)
      .ringColor(d => d.you ? config.youRing : config.otherRing)
      // glowing arcs — home → world + hub ↔ hub data links
      .arcsData(buildArcs(visitors))
      .arcColor("color")
      .arcDashLength(0.35)
      .arcDashGap(1.6)
      .arcDashAnimateTime(2000)
      .arcStroke(0.32)
      .arcAltitudeAutoScale(0.5)
      (el);
    _globeInstance = globe;

    // Subtle material tweaks so the textured Earth blends with the current theme.
    const globeMaterial = globe.globeMaterial();
    if (globeMaterial) {
      if ('shininess' in globeMaterial) globeMaterial.shininess = config.shininess;
      if ('bumpScale'  in globeMaterial) globeMaterial.bumpScale = config.bumpScale;

      // City-lights glow: reuse the diffuse texture as an emissive map so
      // illuminated areas (cities) keep shining even on the night side.
      // The texture loads asynchronously, so we hook into onLoad to wire it up
      // as soon as it's ready, and also try immediately in case it's cached.
      const applyEmissive = () => {
        if (config.emissiveIntensity > 0 && globeMaterial.map) {
          globeMaterial.emissiveMap = globeMaterial.map;
          if (globeMaterial.emissive && globeMaterial.emissive.set) {
            globeMaterial.emissive.set(config.emissive);
          }
          globeMaterial.emissiveIntensity = config.emissiveIntensity;
        } else {
          globeMaterial.emissiveMap = null;
          if (globeMaterial.emissive && globeMaterial.emissive.set) {
            globeMaterial.emissive.set(0x000000);
          }
          globeMaterial.emissiveIntensity = 0;
        }
        globeMaterial.needsUpdate = true;
      };
      applyEmissive();
      // Re-apply once the texture finishes loading (first paint may be empty).
      if (globeMaterial.map && globeMaterial.map.image && !globeMaterial.map.image.complete) {
        globeMaterial.map.image.addEventListener?.("load", applyEmissive, { once: true });
      }
      // Safety net: re-apply on the next animation frames in case the texture
      // attaches to material.map slightly later than the call above.
      requestAnimationFrame(applyEmissive);
      setTimeout(applyEmissive, 400);
      setTimeout(applyEmissive, 1200);

      if (globeMaterial.needsUpdate !== undefined) globeMaterial.needsUpdate = true;
    }

    // ----- Lighting: tune the existing ambient + directional lights so the
    // globe gets a clear day/night terminator (the "sun shining on Earth" look).
    const scene = globe.scene();
    if (scene && typeof scene.traverse === "function") {
      scene.traverse(obj => {
        if (obj.isDirectionalLight) {
          obj.intensity = config.sunIntensity * Math.PI;
          if (obj.position && typeof obj.position.set === "function") {
            obj.position.set(
              config.sunPosition[0],
              config.sunPosition[1],
              config.sunPosition[2]
            );
          }
          obj.color && obj.color.set && obj.color.set(0xffffff);
        } else if (obj.isAmbientLight) {
          obj.intensity = config.ambientIntensity * Math.PI;
          obj.color && obj.color.set && obj.color.set(theme === "light" ? 0xdde5ef : 0xbcd0ee);
        }
      });
    }

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = false;

    // Fix blurriness on Retina/HiDPI displays
    globe.renderer().setPixelRatio(window.devicePixelRatio);

    // Look at the visitor's continent if known, else default to East Asia.
    const pov = { lat: youPoint.lat || 25, lng: youPoint.lng || 120, altitude: 1.85 };
    globe.pointOfView(pov, 0);

    const resize = () => globe.width(el.clientWidth).height(el.clientHeight);
    resize();
    window.addEventListener("resize", resize);

    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    const continentCount = renderContinentStats(points, youPoint.continent);
    set("visitorCount", points.length);
    set("continentCount", continentCount);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderPapers();
    initTheme();

    // 🌍 Lazy-load the globe only when the user clicks the toggle.
    var _globeBtn   = document.getElementById("globeToggle");
    var _globePanel = document.getElementById("globePanel");
    var _globeInited = false;
    if (_globeBtn && _globePanel) {
      _globeBtn.addEventListener("click", function () {
        var open = _globePanel.hasAttribute("hidden");
        if (open) {
          _globePanel.removeAttribute("hidden");
          _globeBtn.setAttribute("aria-expanded", "true");
          if (!_globeInited) {
            _globeInited = true;
            // Wait one frame so the panel has real dimensions before three.js measures it.
            requestAnimationFrame(initGlobe);
          }
        } else {
          _globePanel.setAttribute("hidden", "");
          _globeBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    // ✨ Time-machine star — toggles the avatar between adult and childhood photo.
    var _avatarBtn  = document.getElementById("avatarToggle");
    var _avatarWrap = document.querySelector(".avatar-wrap");
    if (_avatarBtn && _avatarWrap) {
      _avatarBtn.addEventListener("click", function () {
        var young = _avatarWrap.classList.toggle("is-young");
        _avatarBtn.setAttribute("aria-pressed", young ? "true" : "false");
      });
    }
  });
})();
