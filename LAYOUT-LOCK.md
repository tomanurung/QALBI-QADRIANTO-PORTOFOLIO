# LAYOUT LOCK — FINAL

Status: **LOCKED / FINAL**. Jangan ubah layout tanpa persetujuan eksplisit.

Terakhir dibangun: 2026-10-03T14:01:17Z · `astro check` 0/0/0 · `astro build` 19 halaman, 0 error.

## Hash sumber (SHA-256, 16 char pertama)

| Hash | File |
|---|---|
| `d7ea0a3c178620ee` | `src/pages/work/index.astro` |
| `9a1f0aa22e591a70` | `src/pages/work/documentary/[slug].astro` |
| `d80a2dfed3180a45` | `src/pages/work/photography/[slug].astro` |
| `6f83fc720ab61d17` | `src/pages/work/graphic-design/[slug]/[project].astro` |
| `45d2560067b9fdc6` | `src/components/GlassNav.astro` |
| `d1b36230a069e5b1` | `src/layouts/BaseLayout.astro` |
| `08aa1098838672cd` | `src/styles/global.css` |
| `e7b96c8c5b837bf7` | `src/data/documentaries.ts` |

Proyek bukan git repo — verifikasi perubahan lewat hash di atas
(`certutil -hashfile <file> SHA256` atau Node `crypto`).

## Layout final

### `/work`
- 4 section: Documentary · Photography · **Desain Grafis** · Reels.
- Tiap section: `.cat-intro` — 2 kolom `minmax(0,1fr) minmax(0,1fr)`,
  `align-items:center` (deskripsi **ter-center vertikal** terhadap heading),
  `gap:clamp(16px,4vw,48px)`, `margin-bottom:clamp(28px,4vw,44px)`.
- Judul kiri, deskripsi kanan (`justify-self:end`), teks deskripsi **rata kiri**,
  `15px`/400, `max-width:44ch`, `opacity:.62`.
- `h2` = `38px` (tidak diubah). `WORK` = `clamp(3rem,14.8vw,11.5rem)` (tidak diubah).
- ≤820px: 1 kolom vertical flow, deskripsi `justify-self:start`, `max-width:52ch`.

### Documentary detail — `HERO → PROJECT-INFO → GALLERY → NAV`
- **Hero FINAL & FROZEN**: `aspect-ratio:16/8`, `border-radius:14px`,
  `margin:35px 0`, `object-fit:cover`. Jangan disentuh.
- `.project-info` — grid `minmax(0,1fr) minmax(0,.8fr)`, `align-items:start`,
  `gap:clamp(32px,5vw,72px)`. Tanpa absolute positioning.
  - Kiri: `.project-title` `clamp(1.75rem,3.4vw,2.75rem)`/700/`line-height:1.08`
    → `.project-desc` `15px`/400/`line-height:1.65`/`max-width:46ch`.
  - Kanan: `<dl class="meta">` → Location · Role · Kredit Produksi
    (label `13px`/600, value `15px`/400). Kredit = 3 item dari data existing.
- **Dihapus, jangan dikembalikan**: Catatan Lapangan & Narasi, Fokus Dokumentasi,
  Duration, subtitle lama.
- `.gallery` — `repeat(3,1fr)`, `gap:12px`, semua img `aspect-ratio:3/2` +
  `object-fit:cover` + `border-radius:10px`. ≤700px 2 kolom, ≤480px 1 kolom;
  **aspect ratio tetap 3:2** di semua breakpoint.
- ≤820px: `.project-info` 1 kolom (vertical flow).
- Nav: `GlassNav` in-flow (`position:static`) di `.detail-nav-wrap`, **setelah**
  gallery. Back kiri, Previous/Next kanan. Tidak fixed/sticky.

### Detail navigation (semua 12 halaman detail)
- `GlassNav` in-flow, `position:static`, di `.detail-nav-wrap` sesuai container
  tiap halaman. Tidak ada clearance `padding-top` fixed-nav.

## Diketahui / open (tidak memblokir)
- Halaman detail merender **dua** nav: `.global-back` dari BaseLayout + GlassNav.
  Fix 1 baris (`hideBackLink`) tersedia bila diinginkan.
- Footer hanya render di `/contact`.
- Judul section ke-3 masih **"Desain Grafis"** (copy existing, dipertahankan).
- Pemilik proyek perlu visual QA di 375/768/1024/1440 (tidak ada browser otomasi).
