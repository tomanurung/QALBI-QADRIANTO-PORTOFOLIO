# Ponytails Review — Portfolio Qalbi Qadrianto

Tanggal review: 2026-10-02
Sumber kebenaran: `PRD-QALBI-FRONTEND-SPEC-FINAL (1).md`

## Checklist implementasi

- [x] Astro + TypeScript + Tailwind tersedia dan buildable.
- [x] Design tokens paper, ink, easing editorial, glass, reduced-motion.
- [x] Data adapter terpisah dari komponen UI.
- [x] Navbar global: active state, WORK aktif untuk `/work/*`, hide/show scroll.
- [x] Footer global dan tautan kontak tanpa URL palsu.
- [x] Route Home, About, Contact, Work Hub, seluruh kategori Work, dan detail dinamis.
- [x] Category navigation berpindah route.
- [x] Photography carousel dengan snap, tombol, indikator, caption, dan detail link.
- [x] Documentary carousel dengan snap, tombol, indikator, caption, dan detail link.
- [x] Reels carousel portrait 9:16 dengan snap, tombol, indikator, caption, dan detail link.
- [x] Graphic Design lightbox dengan Escape/native dialog close.
- [x] Alt text, focus-visible, semantic links/buttons, dan reduced motion.
- [x] `astro check` dan `astro build` dijalankan setelah perubahan.

## Data/aset yang masih terbuka sesuai PRD

- Foto footer asli belum tersedia; tidak difabrikasi.
- Video asli belum tersedia; UI menampilkan poster/status media belum tersedia.
- URL Instagram, LinkedIn, dan CV masih kosong; komponen tidak menghasilkan URL palsu.
- Media lain yang ada di `public/media` adalah dummy placeholder dan harus diganti admin.

## Temuan terbuka — belum selesai

Status keseluruhan: IMPLEMENTASI PARSIAL, bukan selesai penuh PRD.

- Home belum menggunakan foto penuh dan overlay pada ketiga card.
- About masih memakai placeholder huruf Q; kontak intro belum berupa link operasional, deskripsi Experience dan ikon Tools belum lengkap.
- Work Hub masih berupa ringkasan tautan, belum empat section media sesuai PRD.
- Carousel Documentary/Reels baru menampilkan poster; integrasi playback, autoplay satu video, durasi otomatis, dan kontrol belum dibuat.
- Galeri Documentary belum mengikuti grid editorial terkunci dan belum terhubung ke lightbox.
- Graphic Design Poster/Social masih grid, belum carousel sesuai PRD.
- Footer masih monolitik, dan deteksi ketersediaan foto dikunci false sehingga perlu diperbaiki sebelum aset asli dipasang.
- Astro ClientRouter/transisi halaman belum diimplementasikan.
- Sebagian teks masih ditulis langsung di halaman, belum seluruhnya melalui adapter.
- Carousel, lightbox, focus, gesture, dan breakpoint belum diuji di browser; tanda checklist di atas berarti kode tersedia, bukan verifikasi perilaku langsung.
- Localhost berhasil dijalankan pada http://localhost:4321/ dan Home mengembalikan HTTP 200.
- Validasi terakhir: astro check 0 error / 0 warning / 0 hint; build menghasilkan 17 halaman.

## Catatan fidelity

Komposisi final Canva/PDF tidak dapat diverifikasi tanpa file referensi visual asli. Review ini memverifikasi struktur route, data contract, aksesibilitas dasar, perilaku navigasi/carousel, dan build.
