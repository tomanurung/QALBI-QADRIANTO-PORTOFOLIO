# Work — FINAL / DIKUNCI

Status ditetapkan berdasarkan instruksi pengguna: “finalkan work dan tombol documentary, photography, desain grafis, reels — yang final dan kunci ini”.
Route: `/work`
File implementasi: `D:\PORTOFOLIO\src\pages\work\index.astro`
Komponen tombol kategori: `D:\PORTOFOLIO\src\components\WorkCategoryNav.astro`

## Baseline yang disetujui

### Header Work
- Judul `WORK` dengan `class="heading"`.
- Ukuran judul: `header .heading{font-size:clamp(3rem,14.8vw,11.5rem)}` — diperbesar agar tepi kiri/kanan tulisan WORK sejajar dengan blok subjudul.
- Subjudul: `A selection of visual documentation and creative work across documentary films, photography, design and reels.`
- `header{text-align:center;margin-top:30px}`
- `header p{max-width:530px;margin:30px auto;line-height:1.4}`
- `section{padding:55px 0;border-bottom:1px solid #ddd}`; `h2{font-size:38px;letter-spacing:-.04em}`.

### Tombol kategori (Documentary / Photography / Desain Grafis / Reels)
Label tombol: `Documentary`, `Photography`, `Desain Grafis`, `Reels` (dari `workCategories`).
Efek glass diset identik dengan tombol Back:
- `border:1px solid transparent` pada keadaan normal (agar tidak ada pergeseran posisi).
- `transition:background .25s var(--ease-out-editorial),border-color .25s var(--ease-out-editorial)`.
- Saat hover / focus-visible / active / **active (halaman saat ini)**: `background:rgba(255,255,255,.65);border-color:rgba(17,17,16,.16)`.
- Efek glass **tetap menempel** saat tombol aktif (halaman kategori sedang dibuka).

```css
.category-nav{display:flex;justify-content:center;gap:6px;margin:38px auto 70px}
.category-nav a{padding:10px 16px;border-radius:99px;font-size:12px;border:1px solid transparent;transition:background .25s var(--ease-out-editorial),border-color .25s var(--ease-out-editorial)}
.category-nav a:hover,.category-nav a:focus-visible,.category-nav a:active,.category-nav a.active{background:rgba(255,255,255,.65);border-color:rgba(17,17,16,.16)}
@media(max-width:600px){.category-nav{overflow-x:auto;justify-content:flex-start}.category-nav a{white-space:nowrap}}
```

## Documentary — bagian yang dikunci (judul & tombol Selengkapnya)

Route: `/work` (hanya bagian **Documentary**). Terpisah dari Photography & Reels.
File implementasi: `D:\PORTOFOLIO\src\components\DocumentaryCarousel.astro`
Dipakai di `D:\PORTOFOLIO\src\pages\work\index.astro` pada `<section><h2>Documentary</h2>`.

> Catatan cakupan: yang **dikunci** hanya **judul** dan **tombol `Selengkapnya`**. Bagian carousel Documentary lainnya (scroll bar, track, kontrol, dot) **tidak** termasuk penguncian ini dan boleh dikembangkan.

Aturan judul & tombol `Selengkapnya` yang **dikunci**:
- **Satu tombol** `Selengkapnya` saja (`class="detail-link glass"`), berada **di luar track** (setelah `</div>` penutup track, sebelum `.controls`).
- **Desktop** (`min-width:601px`): tombol `position:absolute;top:18px;right:calc(10% + 22px);z-index:2` — kanan atas media, rata atas dengan judul.
- **Mobile** (`max-width:600px`): `.detail-link{margin:20px auto 0}` — tombol kembali ke bawah carousel.
- Ukuran tombol: `padding:10px 20px;font-size:10.5px` (~20% lebih kecil dari layout lama `12px 25px` / `13px`).
- Gaya glass: `background:rgba(255,255,255,.3)` (transparansi 70%) + `backdrop-filter:blur(14px) saturate(180%)` + `border:1px solid rgba(255,255,255,.55)`.
- **Judul** overlay di kiri atas (`class="doc-title"`, `data-title`): putih `#fff` + drop shadow lembut (`0 0 2px rgba(0,0,0,.55),0 1px 6px rgba(0,0,0,.45),0 2px 14px rgba(0,0,0,.35)`). Judul mengikuti slide aktif, berasal dari data `documentaries.ts` (`title`).
- **Sembunyi saat video diputar** (judul + tombol): `data-playing="true"` → `.overlay{opacity:0}` dan `.detail-link{opacity:0;pointer-events:none}`.
- **Fade tombol saat scroll** (opsi A — berbasis delta scroll):
  - `data-fading="true"` → `.detail-link{opacity:0}` (CSS) dengan `transition:opacity .3s`.
  - Pemicu: `|pos - lastScroll| > 6` px → fade out; debounce `140ms` idle → fade in.
  - `prefers-reduced-motion` → debounce `0ms`.

Nilai judul & tombol yang **tidak boleh diubah tanpa izin**: jumlah tombol (harus 1), posisi desktop kanan atas (`top:18px;right:calc(10% + 22px)`), posisi mobile bawah (`margin:20px auto 0`), ukuran tombol (`10px 20px` / `10.5px`), transparansi glass (`rgba(255,255,255,.3)`), style judul overlay, threshold delta scroll (`6px`), dan debounce (`140ms`).

**Di luar** penguncian ini: scroll bar, track, kontrol navigasi, dot indicator, dan aspek carousel Documentary lainnya.

## Cakupan penguncian

Berlaku pada layout halaman Work (`/work`), tombol kategori nav di seluruh halaman, dan **judul + tombol Selengkapnya pada Documentary** di `/work`:
- `/work`

> ## ⚠️ AMENDMENT — KUNCI DICABUT SEBAGIAN (chapter navigation)
> Route `/work/documentary`, `/work/photography`, `/work/reels`, dan
> `/work/graphic-design` sudah **DIHAPUS** sebagai halaman index kategori.
> Penguncian kini hanya berlaku pada **`/work`**. Halaman detail
> (`/work/<kategori>/[slug]`) tetap ada dan **tidak terpengaruh**.
> Tombol kategori nav kini berupa anchor in-page (`#documentary`, `#photography`,
> `#graphic-design`, `#reels`) menuju seksi di `/work`.

Yang **tidak** termasuk penguncian ini: isi/desain halaman kategori itu sendiri (daftar karya, carousel, poster grid) — hanya layout Work dan tombol kategori nav.

## Aturan perubahan

Jangan mengubah konten, posisi, ukuran, atau layout Work dan tombol kategori tanpa instruksi eksplisit pengguna.

Nilai yang **tidak boleh diubah tanpa izin**: ukuran judul WORK (`clamp(3rem,14.8vw,11.5rem)`), `max-width:530px` subjudul, padding/radius/font-size tombol kategori (`10px 16px` / `99px` / `12px`), gap (`6px`), dan efek glass tombol kategori.

Karena `WorkCategoryNav.astro` adalah komponen bersama, perubahan pada file ini berdampak ke semua halaman kategori Work — review dampaknya sebelum mengubah.

Penguncian ini adalah aturan proyek dan persetujuan baseline, bukan permission read-only filesystem.
