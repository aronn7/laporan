/* ============================================================
   LAPORAN MAGANG — main.js
   Rendering konten, navigasi slide, animasi, lightbox.
   ============================================================ */

const IMG_FALLBACK = true; // tampilkan placeholder jika foto tidak ada

/* ---------- UTIL ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- POP AUDIO & PARTICLES ---------- */
let audioCtx = null;
function playPopSound(vol = 0.15, freqStart = 340, freqEnd = 820) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freqStart, now);
    osc.frequency.exponentialRampToValueAtTime(freqEnd, now + 0.08);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (err) {
    // Audio opsional jika dinonaktifkan browser
  }
}

function createPopParticles(x, y, count = 14) {
  const colors = ["#C8A45D", "#E3C98C", "#FFFFFF", "#4FD1C5", "#F6E05E"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "pop-particle";
    const size = Math.random() * 6 + 4;
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const distance = Math.random() * 65 + 35;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const col = colors[Math.floor(Math.random() * colors.length)];

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.backgroundColor = col;
    p.style.boxShadow = `0 0 10px ${col}`;
    p.style.setProperty("--tx", `${tx}px`);
    p.style.setProperty("--ty", `${ty}px`);
    document.body.appendChild(p);

    setTimeout(() => p.remove(), 700);
  }
}

/* ---------- RENDER: ANGGOTA KELOMPOK ---------- */
function initial(nama) {
  const n = (nama || "?").replace(/\[|\]/g, "").trim();
  return n.split(" ").slice(0, 2).map(w => w[0] || "").join("").toUpperCase() || "?";
}

function renderMembers() {
  const grid = $("#memberGrid");
  if (!grid || !KONFIGURASI.anggota) return;

  grid.innerHTML = KONFIGURASI.anggota.map((a, i) => {
    const foto = a.photo || "";
    const isLeader = (a.jabatan || "").toLowerCase().includes("ketua");
    const roleIcon = ic(isLeader ? "crown" : "briefcase");
    const roleText = a.jabatan || "Anggota";
    const divisiName = a.divisi || "Pelayanan";
    const divisiIcon = divisiName.includes("P3") ? ic("scales") : (divisiName.includes("Pengawasan") ? ic("shield") : ic("receipt"));
    const init = initial(a.nama);
    const num = String(i + 1).padStart(2, "0");

    return `
    <div class="member-card-wrap reveal d${(i % 4) + 1}">
      <div class="member-card" data-index="${i}" tabindex="0" role="button" aria-label="Profil ${a.nama}">
        <div class="pop-ripple"></div>

        <!-- SISI DEPAN -->
        <div class="member-face member-front ${foto ? "" : "no-photo"}">
          <div class="card-glass-shine"></div>
          <div class="card-side-accent"></div>
          <div class="card-dot-matrix" aria-hidden="true"></div>
          
          <div class="card-top-badges">
            <span class="card-member-idx"><b class="idx-num">${num}</b> <small>•</small> TEAM MEMBER</span>
            <span class="badge-role ${isLeader ? 'gold-leader' : ''}">
              <span class="badge-icon">${roleIcon}</span> ${roleText}
            </span>
          </div>

          <div class="photo-container">
            ${foto ? `<img src="${foto}" alt="${a.nama}" loading="lazy" class="member-img" onerror="this.closest('.member-front').classList.add('no-photo');this.remove()">` : ""}
            <div class="photo-zone">
              <div class="photo-avatar-ring">
                <span class="avatar-icon">${ic("user")}</span>
                <span class="avatar-orbit"></span>
              </div>
              <p class="photo-title">FOTO ANGGOTA</p>
              <small class="photo-sub">${foto || "js/content.js"}</small>
            </div>
            <div class="photo-gradient-fade"></div>
          </div>

          <div class="member-meta">
            <div class="member-meta-main">
              <span class="member-meta-divisi">${divisiIcon} Divisi ${divisiName}</span>
              <h3 title="${a.nama}">${a.nama}</h3>
              <p class="member-nis"><span>NIS</span> <b>${a.nis}</b></p>
            </div>
            <div class="card-pop-hint">
              <span class="hint-spin-icon">${ic("rotate")}</span>
              <span class="hint-text">Arahkan / Klik untuk Pop &amp; Putar</span>
              <span class="hint-sparkle">${ic("sparkle")}</span>
            </div>
          </div>
        </div>

        <!-- SISI BELAKANG -->
        <div class="member-face member-back">
          <div class="card-glass-shine"></div>
          <div class="back-inner-frame"></div>
          <div class="card-side-accent"></div>
          
          <div class="back-badge-wrap">
            <span class="back-chip">${num} • REKAYASA PERANGKAT LUNAK</span>
          </div>

          <div class="avatar-ring-wrap">
            <div class="avatar-halo"></div>
            <div class="avatar-ring">${init}</div>
            <span class="avatar-sparkle">${ic("sparkle")}</span>
          </div>

          <h3 class="back-name">${a.nama}</h3>
          <div class="back-nis-pill">NIS · ${a.nis}</div>

          <div class="back-info-card">
            <div class="info-row">
              <span class="info-label">Posisi:</span>
              <span class="info-val ${isLeader ? 'gold-txt' : ''}">${roleIcon} ${roleText}</span>
            </div>
            <div class="info-divider"></div>
            <div class="info-row">
              <span class="info-label">Penempatan:</span>
              <span class="info-val">${divisiIcon} Divisi ${divisiName}</span>
            </div>
            <div class="info-divider"></div>
            <div class="info-row">
              <span class="info-label">Instansi:</span>
              <span class="info-val">KPP KB Satu</span>
            </div>
          </div>

          <div class="back-tags">
            <span class="tag-chip">${ic("globe")} Web Dev</span>
            <span class="tag-chip">${ic("folder")} Administrasi</span>
            <span class="tag-chip">${ic("users")} Tim Kerja</span>
          </div>

          <div class="back-actions">
            <button class="btn-card-action btn-flip-back" type="button" title="Kembali ke sisi depan">
              <span>${ic("rotate")}</span> Balik Depan
            </button>
            <button class="btn-card-action btn-spin-360" type="button" title="Putar 360 Derajat">
              <span>${ic("zap")}</span> Pop 360°
            </button>
          </div>
        </div>

      </div>
    </div>`;
  }).join("");

  attachMemberCardEvents();
}

function attachMemberCardEvents() {
  const cards = $$(".member-card");
  if (!cards.length) return;

  function flipCard(card, state, event) {
    const wrap = card.closest(".member-card-wrap");
    playPopSound(0.18, 330, 850);

    const rect = card.getBoundingClientRect();
    const px = event ? event.clientX : rect.left + rect.width / 2;
    const py = event ? event.clientY : rect.top + rect.height / 2;
    createPopParticles(px, py, 14);

    // Reset inline tilt transform agar class CSS dapat mengambil alih secara mulus
    card.style.transform = "";

    if (wrap) {
      wrap.classList.remove("pop-bounce");
      void wrap.offsetWidth;
      wrap.classList.add("pop-bounce");
      setTimeout(() => wrap.classList.remove("pop-bounce"), 700);
    }

    if (state) {
      card.classList.add("is-flipped");
    } else {
      card.classList.remove("is-flipped");
    }
  }

  function triggerSpin360(card, event) {
    const wrap = card.closest(".member-card-wrap");
    playPopSound(0.2, 280, 960);

    const rect = card.getBoundingClientRect();
    const px = event ? event.clientX : rect.left + rect.width / 2;
    const py = event ? event.clientY : rect.top + rect.height / 2;
    createPopParticles(px, py, 18);

    const isFlipped = card.classList.contains("is-flipped");
    card.style.setProperty("--cur-rot", isFlipped ? "180deg" : "0deg");
    card.style.transform = "";

    if (wrap) {
      wrap.classList.remove("pop-bounce");
      void wrap.offsetWidth;
      wrap.classList.add("pop-bounce");
      setTimeout(() => wrap.classList.remove("pop-bounce"), 900);
    }

    card.classList.remove("spin-360-active");
    void card.offsetWidth;
    card.classList.add("spin-360-active");

    setTimeout(() => {
      card.classList.remove("spin-360-active");
    }, 1050);
  }

  cards.forEach(card => {
    // Click: Flip & Pop
    card.addEventListener("click", e => {
      if (e.target.closest(".btn-spin-360")) {
        e.stopPropagation();
        triggerSpin360(card, e);
        return;
      }
      if (e.target.closest(".btn-flip-back")) {
        e.stopPropagation();
        flipCard(card, false, e);
        return;
      }

      const willFlip = !card.classList.contains("is-flipped");
      flipCard(card, willFlip, e);
    });

    // Keyboard support (Enter / Space)
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const willFlip = !card.classList.contains("is-flipped");
        flipCard(card, willFlip);
      }
    });

    // Mouseenter: sound pop & light effect
    card.addEventListener("mouseenter", () => {
      playPopSound(0.06, 430, 690);
    });

    // Interactive 3D tilt tracking
    card.addEventListener("mousemove", e => {
      if (card.classList.contains("pop-active") || card.classList.contains("spin-360-active")) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const isFlipped = card.classList.contains("is-flipped");
      const tiltX = -y * 12;
      const tiltY = (isFlipped ? -x : x) * 12;
      const rotY = isFlipped ? 180 : 0;
      card.style.transform = `translateY(-18px) scale(1.08) rotateX(${tiltX}deg) rotateY(${rotY + tiltY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Tombol aksi massal di atas kartu
  const btnFlipAll = $("#btnFlipAll");
  if (btnFlipAll) {
    btnFlipAll.addEventListener("click", () => {
      const allFlipped = cards.every(c => c.classList.contains("is-flipped"));
      cards.forEach((card, idx) => {
        setTimeout(() => {
          flipCard(card, !allFlipped);
        }, idx * 120);
      });
    });
  }

  const btnSpinAll = $("#btnSpinAll");
  if (btnSpinAll) {
    btnSpinAll.addEventListener("click", () => {
      cards.forEach((card, idx) => {
        setTimeout(() => {
          triggerSpin360(card);
        }, idx * 140);
      });
    });
  }
}

/* ---------- RENDER: HALAMAN DIVISI ---------- */
const DIVISI_META = {
  "Pelayanan": {
    secNum: "06",
    secLabel: "DIVISION OVERVIEW • 01",
    badgeLabel: "SERVICE DIVISION",
    ikon: ic("receipt"),
    quoteHighlight: "Pelayanan prima dengan prinsip integritas, transparansi, dan kemudahan administrasi bagi seluruh wajib pajak.",
    categories: ["Layanan Wajib Pajak", "Pengelolaan Arsip", "Front Office", "Input Data", "SOP Perpajakan"],
    actIcons: ["receipt", "archive", "users", "doc", "compass"],
    deskripsi: "Divisi <b>Pelayanan</b> berkaitan dengan pemberian layanan administrasi perpajakan kepada wajib pajak, pemberian informasi, serta membantu kebutuhan administrasi perpajakan sesuai ketentuan yang berlaku. Peserta magang yang ditempatkan pada divisi ini membantu kegiatan pelayanan administratif di bawah arahan petugas dan pembimbing lapangan.",
    flow: [
      [ic("inbox"), "Permohonan", "Wajib pajak datang atau mengajukan permohonan layanan."],
      [ic("search"), "Pemeriksaan Awal", "Petugas melakukan pemeriksaan awal terhadap kebutuhan administrasi."],
      [ic("compass"), "Arahan / Pelayanan", "Petugas memberikan arahan atau pelayanan sesuai prosedur."],
      [ic("gear"), "Proses Administrasi", "Proses administrasi dilaksanakan oleh petugas terkait."],
      [ic("checkCircle"), "Hasil Pelayanan", "Wajib pajak memperoleh informasi atau hasil pelayanan."]
    ]
  },
  "P3": {
    secNum: "07",
    secLabel: "DIVISION OVERVIEW • 02",
    badgeLabel: "EXAMINATION & ENFORCEMENT",
    ikon: ic("scales"),
    namaLengkap: "Pemeriksaan, Penilaian &amp; Penagihan",
    quoteHighlight: "Ketelitian, analisis data yang akurat, dan kepatuhan terhadap regulasi perpajakan nasional.",
    categories: ["Dokumen & Berkas", "Administrasi Audit", "Penilaian Pajak", "Tindakan Penagihan", "Arsip Laporan"],
    actIcons: ["doc", "search", "chart", "money", "archive"],
    deskripsi: "Divisi <b>Pemeriksaan, Penilaian dan Penagihan (P3)</b> berkaitan dengan pelaksanaan administrasi pemeriksaan perpajakan, penilaian, serta kegiatan penagihan pajak sesuai ketentuan yang berlaku. Alur kerja berikut bersifat informatif secara umum dan merupakan bagian dari tugas peserta magang dalam membantu pekerjaan administratif.",
    flow: [
      [ic("doc"), "Dokumen &amp; Berkas", "Pengumpulan dan penyiapan dokumen administrasi terkait."],
      [ic("search"), "Administrasi Pemeriksaan", "Pengelolaan administrasi kegiatan pemeriksaan perpajakan."],
      [ic("chart"), "Penilaian", "Administrasi penilaian sesuai ketentuan yang berlaku."],
      [ic("money"), "Penagihan", "Administrasi kegiatan penagihan pajak."],
      [ic("archive"), "Dokumentasi", "Pengarsipan dan dokumentasi hasil kegiatan."]
    ]
  },
  "Pengawasan": {
    secNum: "08",
    secLabel: "DIVISION OVERVIEW • 03",
    badgeLabel: "MONITORING & SUPERVISION",
    ikon: ic("shield"),
    quoteHighlight: "Monitoring berkelanjutan untuk memastikan kepatuhan dan ketertiban administrasi wajib pajak.",
    categories: ["Pengawasan Wajib Pajak", "Pengelolaan Administrasi", "Pengolahan Data", "Kepatuhan Pajak", "Dukungan Kerja"],
    actIcons: ["shield", "folder", "doc", "eye", "brain"],
    deskripsi: "Divisi <b>Pengawasan</b> melakukan kegiatan pemantauan dan pengawasan terhadap pemenuhan kewajiban perpajakan wajib pajak sesuai ketentuan yang berlaku. Peserta magang membantu pekerjaan administratif yang mendukung kegiatan pengawasan di bawah arahan petugas dan pembimbing lapangan.",
    flow: [
      [ic("inbox"), "Pengumpulan Informasi", "Pengumpulan informasi administrasi terkait wajib pajak."],
      [ic("brain"), "Analisis Informasi", "Pengelolaan dan analisis informasi oleh petugas."],
      [ic("eye"), "Pemantauan", "Pemantauan pemenuhan kewajiban perpajakan."],
      [ic("arrowRight"), "Tindak Lanjut", "Tindak lanjut sesuai ketentuan yang berlaku."],
      [ic("archive"), "Dokumentasi", "Dokumentasi hasil kegiatan pengawasan."]
    ]
  }
};

function renderDivisions() {
  $$("[data-divisi]").forEach(section => {
    const nama = section.dataset.divisi;
    const meta = DIVISI_META[nama];
    const slot = $("[data-division-slot]", section);
    if (!meta || !slot) return;

    const anggotaDiv = (KONFIGURASI.anggota || []).filter(a => a.divisi === nama);
    const anggotaHTML = anggotaDiv.length
      ? anggotaDiv.map((a, i) => `
        <div class="profile-card reveal d${i + 1}">
          <div class="profile-num">${String(i + 1).padStart(2, "0")}</div>
          <div class="profile-photo ${a.photo ? "" : "no-photo"}">
            ${a.photo ? `<img src="${a.photo}" alt="${a.nama}" loading="lazy" onerror="this.parentNode.classList.add('no-photo');this.remove()">` : ic("user")}
          </div>
          <div class="profile-info">
            <span class="profile-badge">${meta.badgeLabel}</span>
            <h4>${a.nama}</h4>
            <p class="nis">NIS ${a.nis}</p>
            <p class="placed">Penempatan ${meta.namaLengkap || nama}</p>
          </div>
        </div>`).join("")
      : `<div class="no-slot">Belum ada anggota yang ditempatkan di divisi ini — atur properti <code>divisi</code> pada <code>js/content.js</code>.</div>`;

    const kegiatan = (KONFIGURASI.kegiatan && KONFIGURASI.kegiatan[nama]) || [];

    slot.innerHTML = `
      <div class="sec-label reveal"><span class="sec-num">${meta.secNum}</span><span class="sec-slash">/</span><span class="sec-name">${meta.secLabel}</span><span class="sec-line"></span></div>
      
      <div class="div-head reveal">
        <div class="div-badge">${meta.ikon}</div>
        <div class="div-title-wrap">
          <p class="kicker">Struktur Penempatan</p>
          <h2 class="slide-title left" style="font-size:clamp(1.4rem,3vw,2.2rem)">DIVISI <span class="gold-grad">${(meta.namaLengkap || nama).toUpperCase()}</span></h2>
        </div>
      </div>

      <div class="div-quote-box reveal d1">
        <span class="dq-icon">${ic("sparkle")}</span>
        <p>${meta.quoteHighlight}</p>
      </div>

      <p class="kicker reveal" style="letter-spacing:.25em;font-size:.62rem">A · Deskripsi Divisi</p>
      <div class="div-desc reveal d1">${meta.deskripsi}</div>

      <h3 class="sub-title reveal">B · Anggota di Divisi Ini</h3>
      <div class="div-members">${anggotaHTML}</div>

      <h3 class="sub-title reveal">C · Kegiatan Selama Magang</h3>
      <div class="act-grid">
        ${kegiatan.map((k, i) => `
          <div class="act-card reveal d${(i % 5) + 1}">
            <div class="act-top">
              <span class="act-num">${String(i + 1).padStart(2, "0")}</span>
              <span class="act-cat">${meta.categories[i] || "Administrasi"}</span>
              <span class="act-icon">${ic(meta.actIcons[i] || "doc")}</span>
            </div>
            <p>${k}</p>
          </div>`).join("")}
      </div>
      <p class="gallery-hint reveal">${ic("bulb")} Daftar kegiatan bersifat dapat diedit sesuai aktivitas nyata — ubah pada <code>js/content.js</code> bagian <code>kegiatan</code>.</p>

      <h3 class="sub-title reveal">D · Proses Kerja Divisi</h3>
      <div class="flow" data-flow>
        <div class="flow-line"></div><div class="flow-line-fill"></div>
        ${meta.flow.map((f, i) => `
          <div class="flow-step reveal d${i + 1}">
            <div class="flow-node">${f[0]}</div>
            <h4>${i + 1}. ${f[1]}</h4><p>${f[2]}</p>
          </div>`).join("")}
      </div>`;
  });
}

/* ---------- RENDER: DOKUMENTASI ---------- */
let galItems = [];
function renderGallery() {
  const gal = $("#gallery");
  if (!gal) return;
  gal.innerHTML = (KONFIGURASI.dokumentasi || []).map((d, i) => {
    const num = String(i + 1).padStart(2, "0");
    const cls = d.ukuran === "besar" ? "gal-span-2" : "";
    return `<figure class="gal-item ${cls}" data-i="${i}" tabindex="0">
      <span class="gal-idx">DOC • ${num}</span>
      ${d.photo
        ? `<img src="${d.photo}" alt="${d.caption || "Dokumentasi"}" loading="lazy" onerror="this.closest('.gal-item').classList.add('no-photo');this.remove()">`
        : ""}
      ${(!d.photo) ? `<span>${ic("camera")}</span><small>${d.photo || "foto belum ditambahkan"}<br>letakkan di assets/img/</small>` : ""}
      <span class="gal-zoom">${ic("expand")}</span>
      <figcaption class="gal-cap">
        <span class="gal-caption-tag">DOKUMENTASI ${num}</span>
        <p>${d.caption || "Dokumentasi kegiatan"}</p>
      </figcaption>
    </figure>`;
  }).join("");
  galItems = $$(".gal-item", gal);

  // zoom-in reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); }
  }), { threshold: .15 });
  galItems.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + "ms"; io.observe(el); });
}

/* ---------- LIGHTBOX ---------- */
const lb = $("#lightbox");
function openLB(i) {
  const items = (KONFIGURASI.dokumentasi || []);
  if (!items.length) return;
  lb.dataset.i = i;
  $("#lbImg").src = items[i].photo || "";
  $("#lbCap").textContent = items[i].caption || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLB() { lb.classList.remove("open"); document.body.style.overflow = ""; }
function stepLB(dir) {
  const n = (KONFIGURASI.dokumentasi || []).length;
  if (!n) return;
  openLB(((+lb.dataset.i || 0) + dir + n) % n);
}
document.addEventListener("click", e => {
  const item = e.target.closest(".gal-item");
  if (item) openLB(+item.dataset.i);
  if (e.target === lb || e.target.closest("#lbClose")) closeLB();
  if (e.target.closest("#lbPrev")) stepLB(-1);
  if (e.target.closest("#lbNext")) stepLB(1);
});
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") stepLB(-1);
  if (e.key === "ArrowRight") stepLB(1);
});

/* ---------- SLIDES & NAVIGASI PRESENTASI ---------- */
let slides = [];
let current = 0;

function initSlides() {
  slides = $$(".slide");
  // isi menu mobile
  const mm = $("#mobileMenu");
  if (mm) mm.innerHTML = $$(".nav-link").map(a => `<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("");
}

function goTo(i, smooth = true) {
  current = Math.max(0, Math.min(slides.length - 1, i));
  slides[current].scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
}
function nextSlide() { goTo(current + 1); }
function prevSlide() { goTo(current - 1); }

function updateCurrent() {
  const mid = window.scrollY + window.innerHeight / 2;
  let idx = 0;
  slides.forEach((s, i) => { if (s.offsetTop <= mid) idx = i; });
  current = idx;
  $("#btnPrev").disabled = current === 0;
  $("#btnNext").disabled = current === slides.length - 1;
  $("#pageIndicator").textContent = String(current + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  $("#progressBar").style.width = pct + "%";

  // nav aktif
  const id = slides[current].id;
  $$(".nav-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
}

/* ---------- KEYBOARD ---------- */
document.addEventListener("keydown", e => {
  if (lb.classList.contains("open")) return;
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); nextSlide(); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prevSlide(); }
  if (e.key === "f" || e.key === "F") toggleFullscreen();
});

/* ---------- FULLSCREEN ---------- */
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}
$("#btnFullscreen")?.addEventListener("click", toggleFullscreen);

/* ---------- TOMBOL ---------- */
$("#btnNext")?.addEventListener("click", nextSlide);
$("#btnPrev")?.addEventListener("click", prevSlide);
$("#btnPrint")?.addEventListener("click", () => window.print());
$("#btnMenu")?.addEventListener("click", () => $("#mobileMenu").classList.toggle("open"));
$$(".nav-jump").forEach(b => b.addEventListener("click", e => {
  e.preventDefault();
  const t = slides.findIndex(s => s.id === b.dataset.target);
  if (t >= 0) goTo(t);
}));
$$(".nav-next-btn").forEach(b => b.addEventListener("click", e => { e.preventDefault(); nextSlide(); }));
document.addEventListener("click", e => {
  if (e.target.closest("#mobileMenu a")) $("#mobileMenu").classList.remove("open");
});

/* ---------- NAV NEXT BUTTON di hero ---------- */

/* ---------- SCROLL EFFECTS ---------- */
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    // parallax hero bg
    $$(".parallax").forEach(el => {
      const parent = el.closest(".slide");
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const offset = rect.top * -0.18;
        el.style.transform = `translateY(${offset}px) scale(1.02)`;
      }
    });
    updateCurrent();
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- REVEAL ON SCROLL ---------- */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("shown");
    // animasi flowchart & garis kendala
    const flow = e.target.matches("[data-flow]") ? e.target : e.target.closest?.("[data-flow]");
    if (flow) flow.classList.add("animated");
    const pw = e.target.closest?.(".problem-wrap");
    if (pw) pw.classList.add("animated");
    io.unobserve(e.target);
  }), { threshold: .18 });
  $$(".reveal, [data-flow]").forEach(el => io.observe(el));
}

/* ---------- NAVBAR BACKGROUND ---------- */
window.addEventListener("scroll", () => {
  $("#navbar").classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderMembers();
  renderDivisions();
  renderGallery();
  initSlides();
  initReveal();
  updateCurrent();
  window.addEventListener("load", () => {
    $("#loader").classList.add("done");
    setTimeout(() => $("#loader").remove(), 800);
  });
  // fallback: sembunyikan loader maks 4 dtk
  setTimeout(() => $("#loader")?.classList.add("done"), 4000);
});
