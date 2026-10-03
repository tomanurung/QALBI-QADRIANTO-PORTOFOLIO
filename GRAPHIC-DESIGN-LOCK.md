# ðŸ”’ DESIGN LOCK â€” Graphic Design Carousel (`/work/graphic-design`)

**Status: TERKUNCI (FINAL).** Kontrak desain Graphic Design.
Komponen: `src/components/GraphicCarousel.astro` (komponen terpisah).

> ## ⚠️ AMENDMENT — KUNCI DICABUT (chapter navigation)
> **Halaman `/work/graphic-design` sudah DIHAPUS.** Graphic Design tidak punya
> halaman detail, sehingga aturan G1–G8 yang menargetkan route
> `/work/graphic-design` kini **tidak berlaku** (tidak ada route tujuan). Yang
> tetap mengikat: section **Desain Grafis di `/work`** (`GraphicShowcase`) dan
> komponen pendukungnya.

Berlaku untuk: **`/work/graphic-design`** saja.
Tidak berlaku untuk: Photography, Reels, Documentary, section Desain Grafis di `/work`.

---

## 1. Keputusan terkunci (G1â€“G8)

| G | Keputusan |
|---|---|
| G1 | Hanya `/work/graphic-design` |
| G2 | **3 carousel terpisah** â€” Logo/Identity, Poster, Social Media |
| G3 | Klik item â†’ **Lightbox** (dipertahankan) |
| G4 | Caption = **judul item**, **tanpa** `detail-link` |
| G5 | **Tanpa panah** â€” swipe + dots + drag |
| G6 | Lebar slide **60%** area carousel |
| G7 | **Komponen terpisah** `GraphicCarousel.astro` |
| G8 | **`object-fit:cover`** untuk crop 4:5 |

---

## 2. Tampilan (TERKUNCI)

| Aspek | Nilai |
|---|---|
| Rasio slide | **4 : 5** (`aspect-ratio:4/5`) |
| Lebar slide | **60%**, `scroll-snap-align:center` â†’ **center + peek kiri/kanan** |
| Track padding | `0 20%` (agar slide pertama & terakhir bisa center) |
| Gap | `20px` (mobile `12px`) |
| Media | `object-fit:cover`, `border-radius:6px` |
| Panah â† â†’ | **DIHAPUS** |
| Dots | **TETAP** (`8px` â†’ aktif `32px` + `var(--ink)`) |
| Caption | judul item aktif, `[data-gcaption]` `aria-live=polite` |
| Klik slide | `data-lightbox` + `data-description` â†’ Lightbox |
| Interaksi | swipe native (overflow) + drag mouse (pointer) + ArrowLeft/Right |
| Reduced motion | hormati `prefers-reduced-motion` |

```
        â”Œâ”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”
        â”‚ prev  â”‚ â”‚   ACTIVE     â”‚ â”‚ next  â”‚
        â”‚       â”‚ â”‚    4 : 5     â”‚ â”‚       â”‚
        â””â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”˜
                  â€¢  â”  â€¢  â€¢  â€¢
```

---

## 3. Struktur (TERKUNCI)

- `/work/graphic-design` â†’ 3 section: **Logo / Identity** (6), **Poster** (5), **Social Media** (12).
- Tiap section = `<GraphicCarousel label items={toItems(items)}/>`.
- **Tidak digabung** menjadi satu carousel 17 item.
- Data tetap dari `src/data/graphicDesign.ts` (tidak diubah).

---

## 4. Batas implementasi (JANGAN ubah)

- âŒ `Carousel.astro` (Photography & Reels) â€” tidak disentuh
- âŒ `DocumentaryCarousel.astro`
- âŒ Photography (`PHOTOGRAPHY-LOCK.md`), Reels, Documentary locks
- âŒ Global CSS / BaseLayout / Lightbox.astro
- âŒ `src/data/graphicDesign.ts`
- âŒ Section Desain Grafis di `/work`
- âœ… Hanya: `GraphicCarousel.astro` (baru), `pages/work/graphic-design.astro`

---

## 5. Verifikasi akhir (lulus)

- `npx astro check` â†’ **0 errors / 0 warnings**
- 3 root carousel, 23 slide (6+5+12) âœ”
- `data-lightbox` 23 âœ” Â· dots 23 âœ”
- Panah 0 âœ” Â· `detail-link` 0 âœ”
- CSS `flex:0 0 60%` + `aspect-ratio:4/5` + `object-fit:cover` âœ”

---

*Kunci ini FINAL. Setiap revisi wajib memperbarui dokumen ini lebih dulu.*

---

## 6. AMENDMENT (pengalaman kontinu + extensible)

Ditambahkan saat integrasi pengalaman kontinu. Keputusan G1–G8 tetap berlaku.

### 6.1 Geometri slide (koreksi)
Sebelumnya `flex-basis:60%` (mobile `70%`) di dalam track ber-`padding:0 20%`/`0 12%`
menghasilkan lebar efektif ~36%/~53% (persentase flex dihitung terhadap CONTENT box,
bukan lebar luar). Diperbaiki:

| | Desktop | Mobile (<=600px) |
|--|--|--|
| Track padding | `0 20%` | `0 12%` |
| Content box | 60% lebar luar | 76% lebar luar |
| Slide `flex-basis` | `100%` (content box) | `100%` |
| Lebar slide efektif | **~60% lebar luar** | **~76% lebar luar** |

Sisa keputusan (4:5, cover, dots 8px->32px, caption aria-live, Lightbox,
tanpa panah, gap 20/12px) TIDAK berubah.

### 6.2 Drag-vs-click (perbaikan bug)
Drag mouse kini: threshold 5px + `setPointerCapture` + handler `pointercancel`
+ suppress klik setelah drag (capture phase) sehingga drag tidak membuka Lightbox.

### 6.3 Data extensible
`src/data/graphicDesign.ts` diperluas SECARA ADITIF (koleksi lama tetap):
- `sections[]` (label + items) -> sumber render section halaman dedicated,
  tambah entri = tambah section otomatis.
- `showcaseCategories[]` (key + label) -> urutan kategori showcase lintas kategori.

### 6.4 Showcase lintas kategori di /work & /

> ## ⚠️ AMENDMENT — HALAMAN DETAIL GRAPHIC DESIGN (rework final)
> Halaman detail adalah **visual presentation page**, bukan case study tekstual.
> Referensi visual: detail Photography (`card detail`, kartu putih rounded,
> whitespace lega, tipografi minimal). Struktur:
> 1. **Kartu putih besar** (`.card.surface`) membungkus head + guideline + split.
> 2. Head: eyebrow "Graphic Design" + `<h1>` label + intro ringkas (grid 2 kolom,
>    `align-items:end`; mobile 1 kolom).
> 3. **Satu gambar guideline** sebagai visual utama — `aspect-ratio` **asli file**
>    dari `card.guideline.ratio` (tanpa crop/stretch), disertai `width/height`
>    intrinsik agar layout tidak melompat.
> 4. **Split 2 kolom**: kiri **Logo Philosophy** (teks pendek editorial),
>    kanan **Brand Identity** (logo utama + nama brand). Mobile → 1 kolom.
> 5. Karya: **All Works** grid 3 kolom (mobile 2), tiap gambar buka `Lightbox`
>    global via `data-lightbox` + `data-description`.
> 6. **Previous / Next** berdasarkan urutan `categoryCards` (logo → poster →
>    social-media); sisi tanpa tetangga dirender `.is-empty`.
>
> **Field konten baru bersifat OPSIONAL** di `GraphicCategoryCard`:
> `intro?`, `guideline?{src,alt,ratio?}`, `philosophy?`, `brand?{name,logo?}`.
> Semua dirender **kondisional** — bila data belum ada, section disembunyikan
> dan **tidak ada placeholder kosong**. Isi saat ini = data DUMMY repo.
>
> - **Jangan pakai `data-reveal`** di halaman detail: atribut itu hanya dipakai
>   halaman non-detail (index/about/contact/work). Detail page memakai animasi
>   yang sudah ada (page transition BaseLayout + transition CSS hover).
> - Tidak ada dialog/modal galeri baru; Lightbox existing tetap dipakai.

> ## ⚠️ AMENDMENT — KARTU KATEGORI → HALAMAN DETAIL (final)
> Seksi Desain Grafis di `/work` memakai `src/components/GraphicCategoryCards.astro`:
> **3 kartu** — Logo/Identity, Poster, Social Media — masing-masing **satu foto
> cover** + label + jumlah karya. **Tanpa blurb/deskripsi.**
>
> Klik kartu = **navigasi ke halaman detail baru** (BUKAN dialog/modal):
> - `/work/graphic-design/logo`
> - `/work/graphic-design/poster`
> - `/work/graphic-design/social-media`
>
> Halaman detail: `src/pages/work/graphic-design/[slug].astro` (dynamic dari
> `graphicDesign.categoryCards`) — mengikuti **konsep visual** detail Documentary
> (heading grid 2 kolom + galeri grid 3 kolom, rasio 1:1) **tanpa** menyalin
> seluruh struktur teks (tanpa fieldNotes/documentationFocus/credits). Tiap
> gambar di galeri membuka `Lightbox` global. Jumlah karya mengikuti data apa
> adanya (Logo 6, Poster 5, Social 12) — bukan dipaksa 6.
>
> - Data: `graphicDesign.categoryCards` (tipe `GraphicCategoryCard`, punya `slug`).
> - **Kartu memakai class `.gcard`, BUKAN `.card`.** Kelas `.card` adalah aturan
>   GLOBAL di `global.css` (`background:#fff;border-radius:14px;padding:28px`)
>   yang dipakai `AboutSection`/`ContactSection`. Memakainya di kartu foto
>   menyebabkan kotak putih + dorongan padding 28px yang menggeser penempatan.
>   `.gcard` me-reset semuanya (`background:0 0;border:0;border-radius:0;padding:0;
>   margin:0;box-shadow:none`). Tampilan akhir: gambar + judul terpusat, tanpa
>   shape/background apart, tanpa jumlah karya.
> - `GraphicShowcase.astro` unused (tidak dihapus) — dapat dikembalikan.
> - **Perbaikan terkait:** back-link halaman detail di `BaseLayout.astro` kini
>   selalu ke `/work` (sebelumnya `path.slice(...)` menghasilkan parent yang
>   sudah dihapus → 404).
> - `showcaseCategories[]` dipertahankan untuk kompatibilitas data (tak dipakai render).

Komponen lama `src/components/GraphicShowcase.astro`: satu carousel gabungan
(Logo/Identity -> Poster -> Social Media), geometri sama, dots, caption, Lightbox,
dan **indikator kategori non-interaktif** di bawah dots (teks saja, bukan filter).
Section Desain Grafis di /work tidak lagi memakai `poster-grid` + link `Selengkapnya`.

### 6.5 Pengalaman kontinu
`/` kini menyusun Hero (terkunci) -> About -> Work -> Contact di dalam SATU
`BaseLayout` (satu Navbar, satu Footer, satu Lightbox). Section About/Contact
diekstrak ke komponen bersama (`AboutSection.astro`, `ContactSection.astro`) yang
juga dipakai `/about` dan `/contact` (rute lama tetap ada). Handler email Contact
di-scope ke root section agar tidak bertumpuk dengan handler Footer.

---

## 7. ⚠️ AMENDMENT TERAKHIR — ARSITEKTUR 2 LEVEL (MENGGANTIKAN §6.4)

§6.4 mengasumsikan SATU halaman per kategori yang memuat header + guideline +
filosofi + galeri sekaligus. Itu **DIGANTIKAN** oleh navigasi 2 level.

### 7.1 Peta route

| Level | Route | Peran | File |
|--|--|--|--|
| 1 | `/work/graphic-design/<kategori>` | **GALERI / INDEX** — hanya memilih project | `[slug].astro` |
| 2 | `/work/graphic-design/<kategori>/<project>` | **DETAIL / PRESENTASI** satu project | `[slug]/[project].astro` |

Kategori: `logo`, `poster`, `social-media`. Contoh:
`/work/graphic-design/logo` → `/work/graphic-design/logo/identity-01`.

**Dua halaman ini tidak boleh dicampur.** Galeri tidak menampilkan guideline atau
filosofi; detail tidak menampilkan seluruh galeri karya.

### 7.0 REVISI FINAL — HANYA LOGO YANG PUNYA LEVEL DETAIL

> **Ditetapkan final:** dari tiga kategori, **HANYA `logo`** yang memiliki level
> detail project. `poster` dan `social-media` adalah **galeri/arsip murni** —
> **TIDAK ada** route `/work/graphic-design/poster/[slug]` maupun
> `/work/graphic-design/social-media/[slug]`.
>
> - **Logo** → `/work/graphic-design/logo` → klik karya → `/work/graphic-design/logo/<slug>`
> - **Poster** → `/work/graphic-design/poster` → klik karya → **Lightbox** (tetap di halaman)
> - **Social Media** → `/work/graphic-design/social-media` → klik karya → **Lightbox**
>
> Karena itu `getStaticPaths` di `[slug]/[project].astro` **hanya** mengembalikan
> `graphicDesign.logos` dengan `params: {slug: 'logo', project: item.slug}`.
> Segmen `slug` wajib diisi karena file berada di dalam `[slug]/`.
>
> Navigasi Back/Prev/Next memakai komponen **`GlassNav.astro`** (satu sistem glass,
> resep §7 DOC-CAROUSEL-LOCK.md: `rgba(255,255,255,.3)` + `blur(14px) saturate(180%)`
> + border `rgba(255,255,255,.55)` + shadow `0 8px 24px rgba(17,17,16,.12)`,
> hit 44×44, ikon 18×18). Icon-only, tanpa teks `Previous`/`Next`/`Back`.
> Slot yang tidak punya tetangga tetap dirender sebagai `.is-disabled` agar
> layout tidak bergeser. Halaman detail memakai `<BaseLayout hideBackLink>` agar
> `.global-back` bawaan tidak dobel dengan tombol Back glass.

### 7.2 Halaman GALERI (`[slug].astro`)

- Header dipertahankan persis (eyebrow + `<h1>` + intro kanan, grid 2 kolom
  `align-items:end`; mobile 1 kolom).
- Di bawahnya **grid galeri 3 kolom** (mobile 2 → 1). Setiap item = `<a class="tile">`
  menuju halaman detail project.
- **Tanpa** dialog/modal, **tanpa** jumlah karya ("N KARYA").
- Rasio tile `3 / 2` mengikuti file SVG asli; `object-fit:cover` pada `.tile-media`
  (thumbnail galeri, bukan karya penuh).

### 7.3 Halaman DETAIL (`[slug]/[project].astro`)

1. Header sama polanya; judul = **nama project**, kicker = label kategori.
2. **Satu gambar guideline** sebagai visual utama. `aspect-ratio` dari
   `item.guidelineImage.ratio` + `width/height` intrinsik 1200×800. **Tanpa crop,
   tanpa stretch, tanpa memaksa 16:9 atau 1:1.** Isi guideline tidak dipecah
   menjadi banyak section HTML. Bila `guidelineImage` kosong → fallback ke
   `item.image` (tetap rasio 3:2, tetap utuh).
3. **Split 2 kolom**: kiri **Logo Philosophy**, kanan **Brand Identity**
   (logo + nama brand + `meta` opsional).
   - Bila **hanya satu sisi** terisi → `.split.single` (1 kolom penuh,
     `max-width:640px`) agar tidak ada kolom kosong menggantung.
   - Bila **keduanya kosong** → split tidak dirender sama sekali.
4. Baris **facts** (Year / Role / Project `NN / MM`) — hanya field yang ada.
5. **Previous / Next** berpindah antar **project dalam kategori yang sama**
   (bukan antar kategori). Sisi tanpa tetangga → `.pager-link.is-empty`.

### 7.4 Data

Konten presentasi pindah dari `GraphicCategoryCard` ke **`GraphicDesignItem`**
(per project), semua **opsional**:

- `slug?` — segmen URL project
- `guidelineImage?{src,alt,ratio?}`
- `philosophy?`
- `logoImage?{src,alt}`
- `brandName?`
- `meta?`

`GraphicCategoryCard` kini hanya: `key, label, slug, count, eyebrow?, intro?`.
`cover` **dihapus**; cover kartu di `/work` dilewatkan via prop `thumbs`
(`Record<key, {src,alt}>`) dari `work/index.astro`.

**Jangan mengarang konten** untuk field yang tidak ada di data. Jumlah gambar
per project bebas (tidak dipaksa sama).

### 7.5 Aturan implementasi

- **`getStaticPaths` tidak boleh memakai helper/variabel di module scope** —
  Astro mengekstrak fungsi ini ke chunk terpisah sehingga closure module-scope
  menjadi `undefined` (error `coll is not defined`). Semua data harus dibangun
  **di dalam** body `getStaticPaths`.
- **Jangan pakai `data-reveal`** di halaman graphic-design (atribut itu hanya
  untuk index/about/contact/work).
- Tanpa dialog/modal galeri **baru**; Poster & Social Media memakai **Lightbox
  existing** (`data-lightbox data-src=...`), yang sudah diperluas agar
  menerima `<button>` di samping `<a>`. Logo **tidak** memicu Lightbox.
- Tanpa shadow berat.
- Tidak mengubah Documentary, Photography, Reels, design system global,
  typography, card system, atau komponen bersama.

### 7.6 Verifikasi (lulus)

- `npx astro check` → **0 errors / 0 warnings / 0 hints**
- Build → **22 page(s)**: 6 detail Logo + 3 galeri + documentary 3 + photography 3
  + reels 3 + work/about/contact/index. **0 route detail Poster/Social Media.**
- Galeri `/logo`: 6 tile `<a>` → `/work/graphic-design/logo/<slug>`, 0 "KARYA",
  0 `data-lightbox` pada item.
- Galeri `/poster`: 5 tile `<button data-lightbox data-src>`, 0 link detail.
- Galeri `/social-media`: 12 tile `<button data-lightbox data-src>`, 0 link detail.
- Detail `identity-01`: guideline utuh (rasio file, tanpa crop), split 2 kolom
  (Logo Philosophy + Brand Identity).
- Detail tanpa philosophy/brand (mis. `identity-02`): split `.single` (1 kolom).
- Detail pertama: Prev `.is-disabled`; detail terakhir: Next `.is-disabled`;
  slot tetap ada → **0 pergeseran layout**.
- Prev/Next terisolasi dalam kategori Logo; Back → `/work/graphic-design/logo`.
- 0 `data-reveal` di semua halaman graphic-design; 0 pemaksaan `16:9`/`1:1`.
- 70 gambar diperiksa → **0 broken image**.
- `/work` kartu: 3 `gcard` → logo / poster / social-media; **tanpa jumlah karya**.
- Regresi Documentary/Photography/Reels: tetap utuh (`global-back` ada, 0 error).

*Amandemen ini FINAL. Setiap revisi wajib memperbarui dokumen ini lebih dulu.*

