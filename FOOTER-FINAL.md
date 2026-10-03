File implementasi: `D:\PORTOFOLIO\src\components\Footer.astro` (dan data pada `D:\PORTOFOLIO\src\data\site.ts`).

## Baseline yang disetujui

> ## ⚠️ AMENDMENT — CAKUPAN FOOTER DIPERSEMPIT (chapter navigation)
> Footer kini **hanya dirender di `/contact`**. Di `/`, `/about`, `/work`, dan
> halaman detail, Footer **tidak ada sama sekali** (0 tag `<footer>` di HTML
> hasil build). Perubahan: `BaseLayout.astro` merender `{showFooter && <Footer/>}`
> dengan `showFooter = path === '/contact'`. Atribut `transition:persist` pada
> Footer **dihapus** agar node tidak terbawa antar navigasi (keberadaannya kini
> kondisional). Seluruh aturan visual Footer di bawah tetap berlaku apa adanya.

### Layout global
- `footer{max-width:1240px;margin:140px auto 0;padding:60px 28px 40px}`
- `.intro{display:grid;grid-template-columns:2fr 1fr;gap:70px}`

### Teks intro
- Lead bold: `Let's connect, share knowledge, and build meaningful collaborations.`
- `.intro p{font-size:clamp(16px,1.8vw,22px);line-height:1.35;max-width:700px;letter-spacing:-.02em}`
- Dinamis dari `site.footer.intro` (lead di-bold via `startsWith`).

### Nav footer (tanpa shape/blur)
- `nav{display:flex;flex-direction:column;gap:12px;align-items:flex-end;text-transform:capitalize}`
- `nav a{position:relative;isolation:isolate}`
- **Efek shape dan blur pada nav DIHAPUS** (tidak ada `::before`, gradient, border, shadow, atau `backdrop-filter`).
- Item: home, about me, work, contact me — label lowercase via `site.nav`.

### Tombol link (Instagram / Email / Download CV)
- `.links{display:flex;gap:28px;padding:20px 30px;border-radius:99px;margin-bottom:30px;font-size:13px}`
- `.intro .links{grid-column:2;justify-self:end;position:relative;z-index:2;margin-bottom:0;white-space:nowrap;background:rgba(255,255,255,.5);backdrop-filter:blur(16px) saturate(200%);border:1px solid rgba(255,255,255,.78);box-shadow:0 12px 34px rgba(17,17,16,.08),inset 0 1px 0 rgba(255,255,255,.75)}`
- `.links{position:relative;isolation:isolate}.links>a{position:relative;z-index:2}`
- Overlay `.links::before` **dihapus** agar tombol tidak terhalang.
- Instagram: `https://instagram.com/qalbi_qadrianto` (tab baru).
- Email: Buka **Gmail compose** di tab baru (`https://mail.google.com/mail/?view=cm&fs=1&to=...`), dengan `href="mailto:Qalbiqadrianto@proton.me"` sebagai fallback.
- Download CV: `https://example.com/qalbi-qadrianto-cv.pdf` (link dummy, tab baru).

### Gambar footer
- Path: `/media/footer/Footer-image.png` (dari `site.footer.photo.src`).
- `.bottom{display:flex;align-items:flex-end;gap:40px;margin-top:-230px;position:relative;z-index:1}`
- `.bottom img{width:400px;height:440px;object-fit:contain}`
- `position:relative;z-index:1` wajib agar gambar tidak menutupi tombol `.links` (z-index:2).

### Garis footer
- `.line{height:4px;background:var(--ink);margin-top:-185px}`

### Mobile (`@media(max-width:600px)`)
- `footer .intro{row-gap:32px}`
- `.intro{grid-template-columns:1fr auto;gap:25px}`
- `.intro p{font-size:16px}`
- `nav{font-size:12px}`
- `.intro .links{grid-column:1 / -1;max-width:100%;gap:clamp(8px,3vw,20px);padding:18px clamp(10px,3vw,18px)}`
- `.bottom{gap:12px;flex-wrap:wrap;margin-top:-230px}`
- `.bottom img{width:200px;height:220px}`
- `.links{gap:20px;padding:18px}`
- `.missing{height:130px}`
- `.line{margin-top:-40px}`

## Aturan perubahan

Jangan mengubah konten, posisi, ukuran, atau layout footer tanpa instruksi eksplisit pengguna.

Nilai yang **tidak boleh diubah tanpa izin**: `margin-top` gambar (`-230px`), `margin-top` garis (`-185px`), ukuran gambar (`400×440`), `z-index` gambar (`1`) dan `.links` (`2`), serta perilaku tombol Email (Gmail browser + fallback mailto).

Bila mengedit `Footer.astro`, ingat CSS footer tersebar pada beberapa blok `<style>` di satu file; lakukan edit presisi dan verifikasi dengan `npm run check` + `npm run build`.

Penguncian ini adalah aturan proyek dan persetujuan baseline, bukan permission read-only filesystem.
