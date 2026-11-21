/* ============================================================
   LAPORAN MAGANG — PT POWER COMMERCE ASIA
   Render + navigasi presentasi (scope: halaman power-commerce)
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D = window.PCA_DATA || {};

  /* ---------- ESCAPE HELPER ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ================= RENDER: INTERN CARD ================= */
  function renderIntern() {
    const t = D.intern || {};
    const card = $("#pcaInternCard");
    if (!card) return;
    card.innerHTML = `
      <div class="pca-intern-photo ${t.photo ? "" : "pca-ph"}">
        ${t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.nama)}" loading="lazy"
          onerror="this.parentNode.classList.add('pca-ph');this.remove()">` : ""}
      </div>
      <div class="pca-intern-info">
        <h3>${esc(t.nama)}</h3>
        <p class="pca-intern-role">PESERTA MAGANG / INDUSTRI</p>
        <dl class="pca-intern-facts">
          <div class="pca-fact"><dt>NIS</dt><dd>${esc(t.nis)}</dd></div>
          <div class="pca-fact"><dt>SEKOLAH</dt><dd>${esc(t.sekolah)}</dd></div>
          <div class="pca-fact"><dt>JURUSAN</dt><dd>${esc(t.jurusan)}</dd></div>
          <div class="pca-fact"><dt>DIVISI</dt><dd>${esc(t.divisi)}</dd></div>
          <div class="pca-fact"><dt>PERIODE MAGANG</dt><dd>${esc(t.periode)}</dd></div>
        </dl>
      </div>`;
  }

  function renderDivMembers() {
    const slot = $("#pcaDivMembers");
    const t = D.intern || {};
    if (!slot) return;
    slot.innerHTML = `
      <div class="pca-member-mini">
        ${t.photo
        ? `<img src="${esc(t.photo)}" alt="${esc(t.nama)}" loading="lazy"
             onerror="this.outerHTML='<span class=&quot;pca-mini-ph&quot;>FOTO</span>'">`
        : `<span class="pca-mini-ph">FOTO</span>`}
        <div>
          <h4>${esc(t.nama)}</h4>
          <p>NIS ${esc(t.nis)} • ${esc(t.sekolah)}</p>
          <p>Penempatan: IT — Quality Assurance</p>
        </div>
      </div>`;
  }

  /* ================= RENDER: KEGIATAN + TOOLS + WORKFLOW ================= */
  function renderDivision() {
    const acts = $("#pcaActGrid");
    if (acts) {
      acts.innerHTML = (D.kegiatan || []).map((k, i) => `
        <div class="pca-act-card reveal">
          <div class="pca-act-top">
            <span class="pca-act-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="pca-act-cat">${esc((D.kegiatanKategori || [])[i] || "Kegiatan")}</span>
          </div>
          <p>${esc(k)}</p>
        </div>`).join("");
    }

    const tools = $(".pca-tools-grid");
    if (tools) {
      tools.innerHTML = (D.tools || []).map(t => `
        <div class="pca-tool">
          <span class="pca-tool-ic pca-ic">${t.icon}</span>
          <h4>${esc(t.nama)}</h4>
          <p>${esc(t.desc)}</p>
        </div>`).join("");
    }

    const wf = $(".pca-flow");
    if (wf) {
      wf.insertAdjacentHTML("beforeend", (D.workflow || []).map(w => `
        <div class="pca-flow-step reveal">
          <div class="pca-flow-node"><span class="pca-ic">${w[0]}</span></div>
          <h4>${esc(w[1])}</h4><p>${esc(w[2])}</p>
        </div>`).join(""));
    }
  }

  /* ================= RENDER: QUALITY PROCESS ================= */
  function renderQFlow() {
    const q = $("#pcaQFlow");
    if (!q) return;
    const steps = D.qualityProcess || [];
    q.innerHTML = steps.map((s, i) => `
      ${i > 0 ? '<span class="pca-qflow-arr">▸</span>' : ""}
      <div class="pca-qflow-step">
        <div class="pca-qflow-node">
          <span class="qf-num">${String(i + 1).padStart(2, "0")}</span>
          <span class="qf-ic pca-ic">${s[0]}</span>
        </div>
        <h4>${esc(s[1])}</h4>
        <p>${esc(s[2])}</p>
      </div>`).join("");
  }

  /* ================= RENDER: GALLERY + LIGHTBOX ================= */
  let galItems = [];
  function renderGallery() {
    const g = $("#pcaGallery");
    if (!g) return;
    g.innerHTML = (D.gallery || []).map((d, i) => {
      const num = String(i + 1).padStart(2, "0");
      const cls = d.ukuran === "besar" ? "gal-span-2" : "";
      return `<figure class="pca-gal-item ${cls}" data-i="${i}" tabindex="0">
        ${d.photo
          ? `<img src="${esc(d.photo)}" alt="${esc(d.caption)}" loading="lazy"
             onerror="this.closest('.pca-gal-item').classList.add('broken');this.remove()">`
          : ""}
        <span class="pca-gal-zoom"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg></span>
        <figcaption class="pca-gal-cap"><b>DOC • ${num}</b>${esc(d.caption || "Dokumentasi kegiatan")}</figcaption>
      </figure>`;
    }).join("");
    galItems = $$(".pca-gal-item", g);

    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); }
    }), { threshold: .15 });
    galItems.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });
  }

  const lb = $("#pcaLightbox");
  function openLB(i) {
    const items = (D.gallery || []).filter(x => x.photo);
    if (!items.length) return;
    lb.dataset.i = i;
    $("#pcaLbImg").src = items[i].photo || "";
    $("#pcaLbCap").textContent = items[i].caption || "";
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLB() { lb.classList.remove("open"); document.body.style.overflow = ""; }
  function stepLB(dir) {
    const items = (D.gallery || []).filter(x => x.photo);
    if (!items.length) return;
    openLB(((+lb.dataset.i || 0) + dir + items.length) % items.length);
  }

  /* ================= SLIDES NAV ================= */
  let slides = [];
  let current = 0;

  function initSlides() {
    slides = $$(".pca-slide");
    const mm = $("#pcaMobileMenu");
    if (mm) mm.innerHTML = $$(".pca-nav-link").map(a => `<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("");
  }

  function goTo(i, smooth = true) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides[current].scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }
  function nextSlide() { goTo(current + 1); }
  function prevSlide() { goTo(current - 1); }

  function updateCurrent() {
    if (!slides.length) return;
    const mid = window.scrollY + window.innerHeight / 2;
    let idx = 0;
    slides.forEach((s, i) => { if (s.offsetTop <= mid) idx = i; });
    current = idx;
    const prev = $("#pcaPrev"), next = $("#pcaNext");
    if (prev) prev.disabled = current === 0;
    if (next) next.disabled = current === slides.length - 1;
    const ind = $("#pcaPageIndicator");
    if (ind) ind.textContent = String(current + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    const pct = (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const bar = $("#pcaProgressBar");
    if (bar) bar.style.width = pct + "%";

    const id = slides[current].id;
    $$(".pca-nav-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    const crumb = $("#pcaCrumbSection");
    if (crumb) crumb.textContent = (slides[current].dataset.title || "").toUpperCase() || "—";
  }

  /* ================= KEYBOARD ================= */
  document.addEventListener("keydown", e => {
    if (lb.classList.contains("open")) return;
    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); nextSlide(); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prevSlide(); }
    if (e.key === "f" || e.key === "F") toggleFullscreen();
  });

  /* ================= FULLSCREEN ================= */
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  $("#pcaFullscreen")?.addEventListener("click", toggleFullscreen);

  /* ================= BUTTONS ================= */
  $("#pcaNext")?.addEventListener("click", nextSlide);
  $("#pcaPrev")?.addEventListener("click", prevSlide);
  $("#pcaMenuBtn")?.addEventListener("click", () => $("#pcaMobileMenu").classList.toggle("open"));
  $$(".pca-jump").forEach(b => b.addEventListener("click", e => {
    e.preventDefault();
    const t = slides.findIndex(s => s.id === b.dataset.target);
    if (t >= 0) goTo(t);
  }));
  $$(".pca-next-btn").forEach(b => b.addEventListener("click", e => { e.preventDefault(); nextSlide(); }));
  document.addEventListener("click", e => {
    if (e.target.closest("#pcaMobileMenu a")) $("#pcaMobileMenu").classList.remove("open");
  });

  /* ================= SCROLL EFFECTS ================= */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      $("#pcaNavbar")?.classList.toggle("scrolled", window.scrollY > 40);
      updateCurrent();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ================= REVEAL ================= */
  function initReveal() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("shown");
      const fl = e.target.matches(".pca-flow-anim, .pca-qflow-anim") ? e.target : e.target.closest?.(".pca-flow-anim, .pca-qflow-anim");
      if (fl) fl.classList.add("animated");
      const pw = e.target.closest?.(".pca-problem-wrap");
      if (pw) pw.classList.add("animated");
      io.unobserve(e.target);
    }), { threshold: .18 });
    $$(".pca-slide .reveal, .pca-flow-anim, .pca-qflow-anim").forEach(el => io.observe(el));
  }

  /* ================= INIT ================= */
  document.addEventListener("DOMContentLoaded", () => {
    renderIntern();
    renderDivMembers();
    renderDivision();
    renderQFlow();
    renderGallery();
    initSlides();
    initReveal();
    updateCurrent();

    // loader tidak dipakai — langsung tampilkan konten (fade in lewat reveal)
    document.body.classList.add("qa-ready");
  });

  /* lightbox events */
  document.addEventListener("click", e => {
    const item = e.target.closest(".pca-gal-item");
    if (item) openLB(+item.dataset.i);
    if (lb && (e.target === lb || e.target.closest("#pcaLbClose"))) closeLB();
    if (e.target.closest("#pcaLbPrev")) stepLB(-1);
    if (e.target.closest("#pcaLbNext")) stepLB(1);
  });
  document.addEventListener("keydown", e => {
    if (!lb || !lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") stepLB(-1);
    if (e.key === "ArrowRight") stepLB(1);
  });
})();
