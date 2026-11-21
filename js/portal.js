/* ============================================================
   PORTAL JS — particles ringan + reveal on scroll
   ============================================================ */
(function () {
  "use strict";

  /* ---------- PARTICLES (ringan, max 26) ---------- */
  const wrap = document.getElementById("pbParticles");
  if (wrap) {
    const count = window.innerWidth < 720 ? 12 : 26;
    let html = "";
    for (let i = 0; i < count; i++) {
      const size = (Math.random() * 3 + 1.5).toFixed(1);
      const left = (Math.random() * 100).toFixed(2);
      const dur = (Math.random() * 14 + 12).toFixed(1);
      const delay = (-Math.random() * 24).toFixed(1);
      const op = (Math.random() * 0.35 + 0.2).toFixed(2);
      html += `<span class="pb-particle" style="width:${size}px;height:${size}px;left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;opacity:${op}"></span>`;
    }
    wrap.innerHTML = html;
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const els = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 90 + "ms";
      io.observe(el);
    });
  } else {
    els.forEach(el => el.classList.add("revealed"));
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const links = document.querySelectorAll(".pl-link");
  links.forEach(a => {
    a.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      a.classList.add("active");
    });
  });
})();
