# Contact Me — FINAL / DIKUNCI

Status ditetapkan berdasarkan instruksi pengguna: “kunci halaman contacme sebagai final”.
Dikunci ulang setelah penambahan perilaku tombol EMAIL (Gmail compose + fallback `mailto:`), tanpa perubahan layout.
Route: `/contact`
File: `D:\PORTOFOLIO\src\pages\contact.astro`

## Baseline yang disetujui

Pertahankan implementasi saat penguncian, bukan melakukan redesign:
- Judul CONTACT dan subtitle saat ini.
- Card utama, heading Get in touch, deskripsi, dan empat kartu kontak.
- Layout desktop dua area dengan divider vertikal; mobile satu kolom dengan divider horizontal.
- Informasi Based In, Field Availability, dan satu aksi CV.
- Navbar dan footer global; satu Back di bawah konten dengan shape tipis pada interaksi.
- Warna, tipografi, spacing, radius, hover, dan breakpoint saat ini.
- Tidak menambahkan form atau section baru.

## Perilaku tombol EMAIL (dikunci ulang)

Tombol EMAIL memakai skema berikut, tanpa mengubah layout:
- `href="mailto:Qalbiqadrianto@proton.me"` tetap ada sebagai **fallback**.
- Link ditandai `class="email-link"` dan `data-email` (hanya item EMAIL; WhatsApp, Instagram, LinkedIn tidak berubah).
- Script mencegat klik biasa dan membuka **Gmail compose di browser** (tab baru):
  `https://mail.google.com/mail/?view=cm&fs=1&to=<email>`.
- Bila `window.open` diblokir (popup), otomatis jatuh ke `mailto:`.
- Klik dengan modifier (Ctrl/Cmd/Shift/Alt) dibiarkan berjalan sebagai `mailto:` default.
- Bila JavaScript nonaktif, `mailto:` bawaan tetap berfungsi.

## Aturan perubahan

Jangan mengubah desain, komposisi, teks editorial, atau perilaku tanpa instruksi eksplisit pengguna untuk halaman Contact Me. Perubahan pada `D:\PORTOFOLIO\src\layouts\BaseLayout.astro`, `D:\PORTOFOLIO\src\styles\global.css`, Navbar, Footer, atau BackLink juga tidak boleh mengubah baseline Contact secara tidak sengaja. Review dampak terhadap route ini saat menyentuh komponen bersama.

Pengisian data kontak/CV asli pada `D:\PORTOFOLIO\src\data\site.ts` tetap diperbolehkan ketika data diberikan, tanpa redesign. Saat penguncian ulang: Instagram (`https://instagram.com/qalbi_qadrianto`) dan CV (link dummy `https://example.com/qalbi-qadrianto-cv.pdf`) sudah aktif; LinkedIn masih kosong dan tetap memakai fallback nonaktif. Jangan membuat URL palsu untuk LinkedIn.

Penguncian ini adalah aturan proyek dan persetujuan baseline, bukan permission read-only filesystem atau bukti semua aspek PRD sudah diverifikasi secara visual. Tidak ada perubahan tampilan pada task penguncian ini.
