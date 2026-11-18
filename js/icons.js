/* ============================================================
   IKON SVG SEDERHANA — gaya garis (stroke), mengikuti warna teks.
   Pakai: <span class="ic" data-icon="camera"></span>
   atau di JS: ic("camera")
   ============================================================ */

const ICONS = {
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  folder: '<path d="M3 6h6l2 2h10v11H3z"/>',
  cap: '<path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v5c0 1.5 12 1.5 12 0v-5"/><path d="M22 9v6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18-3-3-3-15 0-18z"/>',
  bank: '<path d="M3 10l9-6 9 6"/><path d="M4 10v9M9 10v9M15 10v9M20 10v9M2 20h20"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  users: '<circle cx="9" cy="9" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M16 6.5a3.5 3.5 0 010 7M17.5 20c0-2.4-.8-4.3-2-5.5 3 .3 5.5 2.6 5.5 5.5z"/>',
  puzzle: '<path d="M5 5h4a2 2 0 114 0h4v4a2 2 0 110 4v4h-4a2 2 0 10-4 0H5v-4a2 2 0 110-4z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>',
  school: '<path d="M12 4l9 4-9 4-9-4z"/><path d="M6 10v5c0 2 12 2 12 0v-5"/>',
  briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
  warn: '<path d="M12 4L2.5 20h19z"/><path d="M12 10v5"/><circle cx="12" cy="17.6" r=".4"/>',
  check: '<path d="M4 13l5 5L20 6"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.8.6 1.5 1.6 1.5 2.1h4c0-.5.7-1.5 1.5-2.1A6 6 0 0012 3z"/>',
  print: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="1.5"/><path d="M7 14h10v7H7z"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  rotate: '<path d="M4 12a8 8 0 118 8"/><path d="M4 6v6h6"/>',
  zap: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
  crown: '<path d="M3 18h18M4 17l-1-9 5.5 4L12 5l3.5 7L21 8l-1 9z"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  scales: '<path d="M12 4v16M6 20h12M12 6l-6 2 6-2 6 2"/><path d="M4 14a2.8 2.8 0 005.6 0L6.8 8zM14.4 14a2.8 2.8 0 005.6 0L17.2 8z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  inbox: '<path d="M4 5h16v14H4z"/><path d="M4 13h5l1 2h4l1-2h5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16.5 9"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  chart: '<path d="M4 20V4M4 20h16"/><rect x="8" y="12" width="3" height="5"/><rect x="13" y="8" width="3" height="9"/><rect x="18" y="10" width="3" height="7"/>',
  money: '<rect x="3" y="7" width="18" height="11" rx="2"/><circle cx="12" cy="12.5" r="3"/><path d="M6 10v.01M18 15v.01"/>',
  archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/>',
  brain: '<path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 3 3 3 0 001 5 3 3 0 004 4 3 3 0 006 0 3 3 0 004-4 3 3 0 001-5 3 3 0 00-2-3 3 3 0 00-3-3 3 3 0 00-6 0z"/><path d="M12 4v17"/>',
  eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  arrowRight: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>'
};

function ic(name, cls = "") {
  const body = ICONS[name] || ICONS.sparkle;
  return `<svg class="ic-svg ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* ganti otomatis semua <span class="ic" data-icon="nama"> saat halaman dimuat */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ic[data-icon]").forEach(el => {
    el.innerHTML = ic(el.dataset.icon);
  });
});
