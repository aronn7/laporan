/* ============================================================
   DATA LAPORAN — PT POWER COMMERCE ASIA (IT — Quality Assurance)
   ------------------------------------------------------------
   Semua identitas, foto, tools, dan dokumentasi diatur di sini.
   Untuk foto: letakkan gambar di folder "assets/img" lalu
   tulis nama file pada properti "photo"/"src".
   ============================================================ */

window.PCA_DATA = {

  /* ---------- 02. MEET THE INTERN ---------- */
  intern: {
    nama: "Nadya Budi Salsabilla",            // EDIT: nama lengkap
    nis: "14451",                           // EDIT: NIS
    sekolah: "SMK Negeri 20 Jakarta",          // EDIT: nama sekolah
    jurusan: "Rekayasa Perangkat Lunak",
    divisi: "IT — Quality Assurance",
    periode: "Okt 2026 – Nov 2026",       // EDIT: periode magang
    photo: "assets/img/pca-intern.jpg"      // EDIT: foto 3x4 (rasio 1:1)
  },

  /* ---------- 06. DIVISION: KEGIATAN ---------- */
  kegiatan: [
    "Mempelajari konsep dasar software testing dan jenis-jenis pengujian.",
    "Menyusun dan menjalankan test case sederhana pada fitur aplikasi.",
    "Membantu melakukan pengujian manual terhadap aplikasi/e-commerce.",
    "Melaporkan bug yang ditemukan beserta langkah reproduksi ke mentor QA.",
    "Membantu dokumentasi hasil pengujian dan re-testing setelah perbaikan."
  ],
  kegiatanKategori: [
    "Fundamental", "Test Case", "Manual Testing", "Bug Reporting", "Re-testing"
  ],

  /* ---------- 06. DIVISION: TOOLS (editable) ---------- */
  tools: [
    { icon: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><rect x='4' y='3' width='16' height='18' rx='2'/><path d='M8 7h8M8 11h8M8 15h5'/><path d='M9 15l2 2 4-4'/></svg>", nama: "Test Case Sheet", desc: "Dokumen rencana & hasil uji" },
    { icon: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M8 2l1.88 1.41L12 2l2.12 1.41L16 2v4H8z'/><rect x='6' y='6' width='12' height='14' rx='2'/><path d='M9 10h6M9 14h6M9 18h4'/></svg>", nama: "Bug Tracker", desc: "Pencatatan & pelacakan bug" },
    { icon: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M2 12h20'/><path d='M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z'/></svg>", nama: "Web Browser + DevTools", desc: "Inspeksi & pengujian web" },
    { icon: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><rect x='7' y='2' width='10' height='20' rx='2'/><path d='M11 18h2'/><path d='M12 2v0'/></svg>", nama: "Perangkat Mobile", desc: "Pengujian tampilan mobile" },
    { icon: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2'/><path d='M3 9h18M9 21V9'/></svg>", nama: "Spreadsheet", desc: "Dokumentasi hasil pengujian" },
    { icon: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/><path d='M8 9h8M8 13h5'/></svg>", nama: "Team Chat", desc: "Komunikasi dengan tim dev" }
  ],

  /* ---------- 06. DIVISION: QA WORKFLOW ---------- */
  workflow: [
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v18'/><path d='M5 10l7-7 7 7'/><path d='M3 21h18'/></svg>", "Analisis Kebutuhan", "Memahami fitur yang akan diuji."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><rect x='4' y='3' width='16' height='18' rx='2'/><path d='M8 7h8M8 11h5'/><path d='M9 15l2 2 4-4'/></svg>", "Menyiapkan Test Case", "Menyusun skenario pengujian."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M7 4l12 8-12 8z'/></svg>", "Eksekusi Pengujian", "Menjalankan test pada aplikasi."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2l7 5v10l-7 5-7-5V7z'/><path d='M12 8v4'/><circle cx='12' cy='15' r='.5'/></svg>", "Lapor Bug", "Mencatat bug & langkah reproduksi."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12a9 9 0 1 1-3-6.7'/><path d='M21 3v6h-6'/></svg>", "Verifikasi Ulang", "Memastikan bug sudah diperbaiki."]
  ],

  /* ---------- 07. QUALITY PROCESS ---------- */
  qualityProcess: [
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><rect x='4' y='3' width='16' height='18' rx='2'/><path d='M8 7h8M8 11h8M8 15h5'/><path d='M9 15l2 2 4-4'/></svg>", "Understand Requirements", "Memahami kebutuhan & kriteria fitur."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2'/><path d='M3 9h18M9 21V9'/></svg>", "Test Planning", "Merencanakan skenario & data uji."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M7 4l12 8-12 8z'/></svg>", "Test Execution", "Melaksanakan pengujian sistematis."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2l7 5v10l-7 5-7-5V7z'/><path d='M12 8v4'/><circle cx='12' cy='15' r='.5'/></svg>", "Issue Identification", "Mengidentifikasi & mencatat masalah."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/><path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/></svg>", "Documentation", "Mendokumentasikan hasil pengujian."],
    ["<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12a9 9 0 1 1-3-6.7'/><path d='M21 3v6h-6'/></svg>", "Re-testing", "Menguji ulang setelah perbaikan."]
  ],

  /* ---------- 09. GALLERY ---------- */
  gallery: [
    { photo: "assets/img/pca-dok1.jpg", caption: "Suasana kerja di divisi IT — Quality Assurance", ukuran: "besar" },
    { photo: "assets/img/pca-dok2.jpg", caption: "Kegiatan pengujian di divisi QA", ukuran: "sedang" },
    { photo: "assets/img/pca-dok3.jpg", caption: "Dokumentasi kegiatan magang di PT Power Commerce Asia", ukuran: "sedang" }
  ]
};
