/* =============================================================
   Main script — paper rendering + visitors globe.
   Classic homepage style: simple list with thumbnail + text.
   ============================================================= */

(function () {
  "use strict";

  function authorHTML(a) {
    if (typeof a === "string") return a;
    const star = a && a.equal ? `<sup class="eq">*</sup>` : "";
    if (a && a.me) return `<span class="me">${a.name}</span>${star}`;
    return (a.name || "") + star;
  }

  function paperEntry(p, idx) {
    const links = p.links || {};
    const titleLink = links.arxiv || links.page || links.code || "#";

    // links: paper / code / page / pdf / hf
    const linkParts = [];
    if (links.arxiv) linkParts.push(`<a href="${links.arxiv}" target="_blank" rel="noopener">[paper]</a>`);
    if (links.pdf)   linkParts.push(`<a href="${links.pdf}"   target="_blank" rel="noopener">[pdf]</a>`);
    if (links.code)  linkParts.push(`<a href="${links.code}"  target="_blank" rel="noopener">[code]</a>`);
    if (links.page)  linkParts.push(`<a href="${links.page}"  target="_blank" rel="noopener">[project page]</a>`);

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

    // ----- stats: disabled for now -----
    const statsHTML = "";

    return `
      <div class="paper">
        ${thumbHTML}
        <div class="paper-info">
          <p class="paper-title">${p.title}</p>
          <p class="paper-authors">${authors}</p>
          <p class="paper-venue">${venue} ${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join("")}</p>
          <p class="paper-links">${linkParts.join(" ")} ${statsHTML}</p>
        </div>
      </div>`;
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
      // touch swipe
      let sx = null;
      c.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
      c.addEventListener("touchend", e => {
        if (sx == null) return;
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 30) show(i + (dx < 0 ? 1 : -1));
        sx = null;
      });
    });
  }

  function isAGI(p) {
    const tags = (p.tags || []).map(t => t.toLowerCase());
    return tags.some(t => ["llm", "multi-agent", "reasoning", "test-time", "pruning", "peft"].includes(t));
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
      .sort((a, b) => (b.p.citations || 0) - (a.p.citations || 0));

    if (firstList) {
      firstList.innerHTML = first.map(({ p }, idx) => paperEntry(p, idx)).join("");
      bindCarousels(firstList);
    }
    if (coList) {
      coList.innerHTML = co.map(({ p }, idx) => paperEntry(p, idx)).join("");
      bindCarousels(coList);
    }
  }

  function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  // ----- Visitors globe ---------------------------------------------------
  // continent codes: AS / EU / NA / SA / OC / AF
  const VISITOR_SEED = [
    { name: "HangZhou",    lat: 30.2741, lng: 120.1551, size: 0.9,  continent: "AS" },
    { name: "Beijing",     lat: 39.9042, lng: 116.4074, size: 0.55, continent: "AS" },
    { name: "Shanghai",    lat: 31.2304, lng: 121.4737, size: 0.55, continent: "AS" },
    { name: "Guangzhou",   lat: 23.1291, lng: 113.2644, size: 0.6,  continent: "AS" },
    { name: "Shenzhen",    lat: 22.5431, lng: 114.0579, size: 0.5,  continent: "AS" },
    { name: "Hong Kong",   lat: 22.3193, lng: 114.1694, size: 0.5,  continent: "AS" },
    { name: "Taipei",      lat: 25.0330, lng: 121.5654, size: 0.4,  continent: "AS" },
    { name: "Tokyo",       lat: 35.6762, lng: 139.6503, size: 0.55, continent: "AS" },
    { name: "Seoul",       lat: 37.5665, lng: 126.9780, size: 0.45, continent: "AS" },
    { name: "Singapore",   lat:  1.3521, lng: 103.8198, size: 0.45, continent: "AS" },
    { name: "Bangalore",   lat: 12.9716, lng:  77.5946, size: 0.4,  continent: "AS" },
    { name: "Delhi",       lat: 28.6139, lng:  77.2090, size: 0.35, continent: "AS" },
    { name: "Dubai",       lat: 25.2048, lng:  55.2708, size: 0.3,  continent: "AS" },
    { name: "Moscow",      lat: 55.7558, lng:  37.6173, size: 0.3,  continent: "EU" },
    { name: "London",      lat: 51.5074, lng:  -0.1278, size: 0.5,  continent: "EU" },
    { name: "Paris",       lat: 48.8566, lng:   2.3522, size: 0.45, continent: "EU" },
    { name: "Zurich",      lat: 47.3769, lng:   8.5417, size: 0.35, continent: "EU" },
    { name: "Amsterdam",   lat: 52.3676, lng:   4.9041, size: 0.35, continent: "EU" },
    { name: "Berlin",      lat: 52.5200, lng:  13.4050, size: 0.4,  continent: "EU" },
    { name: "Stockholm",   lat: 59.3293, lng:  18.0686, size: 0.3,  continent: "EU" },
    { name: "San Francisco", lat: 37.7749, lng: -122.4194, size: 0.6,  continent: "NA" },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437, size: 0.45, continent: "NA" },
    { name: "Seattle",     lat: 47.6062, lng: -122.3321, size: 0.4,  continent: "NA" },
    { name: "Boston",      lat: 42.3601, lng:  -71.0589, size: 0.45, continent: "NA" },
    { name: "New York",    lat: 40.7128, lng:  -74.0060, size: 0.6,  continent: "NA" },
    { name: "Toronto",     lat: 43.6532, lng:  -79.3832, size: 0.4,  continent: "NA" },
    { name: "Montreal",    lat: 45.5017, lng:  -73.5673, size: 0.35, continent: "NA" },
    { name: "Pittsburgh",  lat: 40.4406, lng:  -79.9959, size: 0.35, continent: "NA" },
    { name: "Chicago",     lat: 41.8781, lng:  -87.6298, size: 0.4,  continent: "NA" },
    { name: "São Paulo",   lat: -23.5505, lng: -46.6333, size: 0.3,  continent: "SA" },
    { name: "Buenos Aires",lat: -34.6037, lng: -58.3816, size: 0.25, continent: "SA" },
    { name: "Sydney",      lat: -33.8688, lng: 151.2093, size: 0.4,  continent: "OC" },
    { name: "Melbourne",   lat: -37.8136, lng: 144.9631, size: 0.35, continent: "OC" },
    { name: "Cape Town",   lat: -33.9249, lng:  18.4241, size: 0.25, continent: "AF" },
  ];

  const CONTINENT_NAMES = {
    AS: "Asia", EU: "Europe", NA: "N. America",
    SA: "S. America", OC: "Oceania", AF: "Africa", AN: "Antarctica"
  };
  const CONTINENT_ORDER = ["AS", "EU", "NA", "SA", "OC", "AF", "AN"];

  const HOME = { lat: 30.2741, lng: 120.1551 };
  const ARC_TARGETS = ["Tokyo","Singapore","San Francisco","New York","London","Paris","Sydney","Boston","Berlin","Hong Kong","Bangalore","Toronto"];

  function buildArcs() {
    const palette = [
      ["rgba(34,211,238,0)",  "rgba(34,211,238,0.95)"],   // cyan
      ["rgba(236,72,153,0)",  "rgba(236,72,153,0.85)"],   // pink
      ["rgba(167,139,250,0)", "rgba(167,139,250,0.85)"]   // violet
    ];
    return VISITOR_SEED
      .filter(c => ARC_TARGETS.includes(c.name))
      .map(c => ({
        startLat: HOME.lat,
        startLng: HOME.lng,
        endLat: c.lat,
        endLng: c.lng,
        color: palette[Math.floor(Math.random() * palette.length)]
      }));
  }

  // Try to fetch the visitor's real geolocation via a free IP API.
  // Falls back to a timezone-based guess if the request fails.
  function fetchVisitorByIP() {
    return fetch("https://ipapi.co/json/", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        const lat = parseFloat(d.latitude);
        const lng = parseFloat(d.longitude);
        if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
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
    points.forEach(p => {
      const c = p.continent || "AS";
      stats[c] = (stats[c] || 0) + 1;
    });
    const el = document.getElementById("continentStats");
    if (!el) return Object.keys(stats).length;
    el.innerHTML = CONTINENT_ORDER
      .filter(c => stats[c])
      .map(c => {
        const isYou = c === youContinent ? " is-you" : "";
        return `<span class="cont-stat${isYou}" data-c="${c}">${CONTINENT_NAMES[c]} <em>${stats[c]}</em></span>`;
      })
      .join("");
    return Object.keys(stats).length;
  }

  function initGlobe() {
    const el = document.getElementById("globeViz");
    if (!el) return;
    if (typeof Globe === "undefined") {
      el.innerHTML = '<div style="display:flex;height:100%;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font:14px Georgia">Globe failed to load.</div>';
      return;
    }

    // Render the globe immediately with a fallback "you" point, then upgrade
    // it once the IP-based location resolves.
    const fallbackYou = tryGuessHere();
    renderGlobe(el, fallbackYou);

    fetchVisitorByIP().then(real => {
      if (real) renderGlobe(el, real);
    });
  }

  // Tear down a previous globe instance (if any) before re-rendering.
  let _globeInstance = null;
  function renderGlobe(el, youPoint) {
    if (_globeInstance && typeof _globeInstance._destructor === "function") {
      try { _globeInstance._destructor(); } catch (e) { /* ignore */ }
    }
    el.innerHTML = "";

    const points = VISITOR_SEED.concat([youPoint]);

    // Tech-style globe: dark translucent sphere + cyan hex-dot continents +
    // pulsating rings on visitors + glowing arcs.
    const globe = Globe()
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#22d3ee")
      .atmosphereAltitude(0.25)
      // bright pin dots for visitors
      .pointsData(points)
      .pointLat("lat").pointLng("lng")
      .pointAltitude(d => d.you ? 0.05 : 0.008)
      .pointRadius(d => d.you ? 0.55 : 0.18)
      .pointColor(d => d.you ? "#22d3ee" : "#ec4899")
      .pointLabel(d => d.you
        ? `<div style="font:600 12px Georgia, serif;background:#0b0c0f;color:#22d3ee;padding:4px 8px;border-radius:6px;border:1px solid rgba(34,211,238,.45);box-shadow:0 0 12px rgba(34,211,238,.35)">👋 ${d.name}</div>`
        : `<div style="font:500 12px Georgia, serif;background:#0b0c0f;color:#fff;padding:4px 8px;border-radius:6px;border:1px solid rgba(255,255,255,.12)">${d.name}</div>`)
      // pulsating rings on every point
      .ringsData(points)
      .ringLat("lat").ringLng("lng")
      .ringMaxRadius(d => d.you ? 4.5 : 2.2)
      .ringPropagationSpeed(d => d.you ? 3 : 1.4)
      .ringRepeatPeriod(d => d.you ? 900 : 1600 + Math.random() * 1200)
      .ringColor(d => t => d.you
        ? `rgba(34, 211, 238, ${1 - t})`
        : `rgba(236, 72, 153, ${(1 - t) * 0.7})`)
      // glowing arcs from home
      .arcsData(buildArcs())
      .arcColor("color")
      .arcDashLength(0.4)
      .arcDashGap(2)
      .arcDashAnimateTime(2400)
      .arcStroke(0.4)
      .arcAltitudeAutoScale(0.45)
      (el);
    _globeInstance = globe;

    // Make the globe itself a dark translucent sphere (no photo texture).
    const globeMaterial = globe.globeMaterial();
    if (globeMaterial && globeMaterial.color) {
      globeMaterial.color.set('#06121f');
      globeMaterial.transparent = true;
      globeMaterial.opacity = 0.95;
      if ('shininess' in globeMaterial) globeMaterial.shininess = 0.6;
      if ('emissive' in globeMaterial && globeMaterial.emissive) {
        globeMaterial.emissive.set('#020815');
      }
    }

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;

    // Fix blurriness on Retina/HiDPI displays
    globe.renderer().setPixelRatio(window.devicePixelRatio);

    // Continents drawn as glowing cyan hex-dot grid
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(data => {
        if (typeof topojson !== 'undefined') {
          const countries = topojson.feature(data, data.objects.countries);
          globe
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.35)
            .hexPolygonUseDots(true)
            .hexPolygonColor(() => `rgba(56, 189, 248, ${0.55 + Math.random() * 0.4})`);
        }
      })
      .catch(() => {});

    // Look at the visitor's continent if known, else default to East Asia.
    const pov = { lat: youPoint.lat || 25, lng: youPoint.lng || 120, altitude: 1.7 };
    globe.pointOfView(pov, 0);

    const resize = () => globe.width(el.clientWidth).height(el.clientHeight);
    resize();
    window.addEventListener("resize", resize);

    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    const continentCount = renderContinentStats(points, youPoint.continent);
    set("visitorCount", points.length);
    set("countryCount", continentCount);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setYear();
    renderPapers();
    initGlobe();
  });
})();
