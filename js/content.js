/* ============================================================
   KONFIGURASI KONTEN — EDIT FILE INI UNTUK MENGUBAH DATA
   Semua identitas, foto, kegiatan, dan dokumentasi diatur di sini.
   Untuk foto: letakkan gambar di folder "assets/img" lalu
   tulis nama file pada properti "photo".
   ============================================================ */

const KONFIGURASI = {

  /* ---------- ANGGOTA KELOMPOK (4 orang) ----------
     Isi nama, NIS, jabatan, dan nama file foto.
     Gunakan foto portrait (rasio 3:4) agar tampil rapi.
     "divisi" menentukan penempatan di halaman divisi. */
  anggota: [
    {
      nama: "Sata Abrisyam Aldeki",
      nis: "14454",
      jabatan: "Ketua Kelompok",
      divisi: "Pelayanan",          // opsi: "Pelayanan" | "P3" | "Pengawasan"
      photo: "assets/img/anggota1.jpg"   // ganti dengan foto asli
    },
    {
      nama: "Kaysia Putri Arifah",
      nis: "14441",
      jabatan: "Anggota",
      divisi: "Pelayanan",
      photo: "assets/img/anggota2.jpg"
    },
    {
      nama: "Shafira Alya Prayitno",
      nis: "14456",
      jabatan: "Anggota",
      divisi: "P3",
      photo: "assets/img/anggota3.jpg"
    },
    {
      nama: "Ahmad Rommy Qurniawan",
      nis: "14428",
      jabatan: "Anggota",
      divisi: "Pengawasan",
      photo: "assets/img/anggota4.jpg"
    }
  ],

  /* ---------- KEGIATAN MAGANG PER DIVISI ----------
     Edit daftar kegiatan sesuai aktivitas nyata selama magang.
     Hapus / tambah item sesuai kebutuhan. */
  kegiatan: {
    "Pelayanan": [
      "Membantu pelayanan administrasi kepada wajib pajak sesuai arahan petugas.",
      "Membantu pengelolaan dan pengarsipan dokumen pelayanan.",
      "Membantu mengarahkan wajib pajak ke bagian yang sesuai kebutuhannya.",
      "Melakukan input / pengolahan data sesuai arahan pembimbing.",
      "Mempelajari alur pelayanan administrasi perpajakan."
    ],
    "P3": [
      "Membantu pengarsipan dokumen pemeriksaan dan penagihan.",
      "Membantu pengelolaan berkas administrasi divisi.",
      "Melakukan input data sesuai arahan pembimbing.",
      "Mempelajari proses administrasi pemeriksaan, penilaian, dan penagihan.",
      "Membantu pekerjaan administratif lainnya sesuai kebutuhan divisi."
    ],
    "Pengawasan": [
      "Membantu pengarsipan dokumen pengawasan.",
      "Membantu pengelolaan administrasi divisi.",
      "Melakukan penginputan data sesuai arahan pembimbing.",
      "Mempelajari administrasi pengawasan pemenuhan kewajiban wajib pajak.",
      "Membantu pekerjaan administratif lainnya sesuai kebutuhan divisi."
    ]
  },

  /* ---------- DOKUMENTASI ----------
     Tambahkan item foto dokumentasi di sini. Setiap item:
     photo  = nama file di assets/img/
     caption= keterangan kegiatan
     ukuran = "kecil" | "sedang" | "besar" (menentukan tampilan masonry) */
  dokumentasi: [
    { photo: "assets/img/dok1.jpg", caption: "Suasana kantor KPP Pratama Jakarta Kebayoran Baru Satu", ukuran: "besar" },
    { photo: "assets/img/dok2.jpg", caption: "Kegiatan bersama pembimbing lapangan", ukuran: "sedang" },
    { photo: "assets/img/dok3.jpg", caption: "Aktivitas administrasi di divisi Pelayanan", ukuran: "sedang" },
    { photo: "assets/img/dok4.jpg", caption: "Kegiatan kelompok selama magang", ukuran: "kecil" },
    { photo: "assets/img/dok5.jpg", caption: "Lingkungan kerja di dalam kantor", ukuran: "kecil" },
    { photo: "assets/img/dok6.jpg", caption: "Kegiatan di divisi Pemeriksaan, Penilaian dan Penagihan", ukuran: "sedang" },
    { photo: "assets/img/dok7.jpg", caption: "Kegiatan di divisi Pengawasan", ukuran: "kecil" },
    { photo: "assets/img/dok8.jpg", caption: "Dokumentasi bersama seluruh anggota kelompok", ukuran: "besar" }
  ]
};
