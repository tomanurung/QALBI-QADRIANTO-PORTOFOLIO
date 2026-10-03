# 🔒 DESIGN LOCK — Photography Carousel (`/work` + `/work/photography`)

> ## ⚠️ AMENDMENT — KUNCI DICABUT SEBAGIAN (chapter navigation)
> **Halaman `/work/photography` sudah DIHAPUS.** Halaman detail tetap ada di
> `/work/photography/[slug]` dan **tidak berubah**.
> Berlaku efektif: route `Berlaku untuk` di bawah kini **hanya `/work` (section
> Photography)**. Aturan untuk blok `photo` pada `Carousel.astro` dan seksi
> Photography di `/work` tetap mengikat.

**Status: TERKUNCI (FINAL).** Dokumen ini kontrak desain Photography.
Komponen: `src/components/Carousel.astro` (dengan prop `photo`).

Berlaku untuk: **`/work` (section Photography)** dan **`/work/photography`**.
Tidak berlaku untuk: Reels, Documentary, Graphic Design, Carousel biasa tanpa prop `photo`.

---

## 1. Ruang lingkup (TERKUNCI)

| Halaman | Komponen | Prop |
|---|---|---|
| `/work` (section Photography) | `Carousel.astro` | `photo` |
| `/work/photography` | `Carousel.astro` | `photo` |

**Reels TIDAK berubah** (`portrait minimal` di `/work`, `portrait` di `/work/reels`).
Halaman detail `/work/photography/[slug]` **tidak berubah**.

---

## 2. Flag `photo` pada `Carousel.astro` (TERKUNCI)

- Prop baru: `photo?: boolean` (default `false`).
- Dirender menjadi `data-photo` + `class:list={['carousel',{portrait,photo}]}` → `<section class="carousel photo">`.
- **Tanpa prop `photo`** → perilaku lama persis (Reels & Carousel biasa aman).

---

## 3. Kondisi tampilan Photography (TERKUNCI)

| Aspek | Nilai | Catatan |
|---|---|---|
| Rasio media | **3 : 2** | `aspect-ratio:3/2` (bawaan) — tidak diubah |
| Lebar slide | **70%** dari area carousel | `flex:0 0 70%`, tetap **di tengah** — bukan `scale(0.7)` |
| Panah ← → | **DIHAPUS** | `data-prev`/`data-next` **tidak dirender** saat `photo` |
| Dots nav | **TETAP** | layout & animasi existing (`8px` → aktif `32px` + `var(--ink)`) |
| Caption | **TETAP** | `[data-caption-output]` |
| `detail-link` "Selengkapnya" (dalam carousel) | **TETAP** | layout & gaya tidak diubah |
| `object-fit` | **tidak ditambahkan** | sesuai P1 |

### CSS yang dikunci
```css
.carousel.photo .slide{flex:0 0 70%}
```

### Markup controls (TERKUNCI)
```astro
<div class="controls">
  {!dotsOnly && !photo && <button data-prev …>←</button>}
  <div class="dots">…</div>
  {!dotsOnly && !photo && <button data-next …>→</button>}
</div>
```

---

## 4. Elemen yang DIHAPUS di `/work` (TERKUNCI)

- ❌ `<a class="category-link">Selengkapnya Photography ↗</a>` — **dihapus** dari `src/pages/work/index.astro`.
- ✅ `category-link` **Desain Grafis** tetap ada (tidak disentuh).
- ✅ `detail-link` "Selengkapnya" **di dalam carousel** tetap ada.

---

## 5. Hasil visual final (TERKUNCI)

```
              AREA CAROUSEL

        ┌──────────────────────────┐
        │                          │
        │        PHOTO 3:2         │   ← 70% lebar, center
        │                          │
        └──────────────────────────┘

          [ • ━ • • • ]  [Selengkapnya]
             dots tetap    detail-link tetap
```

*Tanpa panah ← →. Tanpa "Selengkapnya Photography ↗" di luar carousel.*

---

## 6. Batas implementasi (JANGAN ubah)

- ❌ Reels (semua varian `portrait`/`minimal`) — **tanpa prop `photo`**
- ❌ Documentary Carousel → lihat `DOC-CAROUSEL-LOCK.md`
- ❌ Halaman detail `/work/photography/[slug]`
- ❌ `category-link` Desain Grafis
- ✅ Hanya: `Carousel.astro` (blok `photo`), `work/index.astro`, `work/photography/index.astro`

> **AMENDMENT (chapter navigation).** Batasan lama pada `BaseLayout.astro`,
> `global.css`, dan "ClientRouter" **dicabut**: `ClientRouter` kini aktif dan
> `global.css` memuat keyframes transisi chapter. Komponen Photography
> (`Carousel.astro` blok `photo`, `photo` carousel, caption, `detail-link`)
> **tidak berubah**. Boundary navigator memakai listener `wheel`/`touch` pasif
> tanpa `preventDefault()`, jadi drag/swipe carousel foto tetap normal.

---

## 7. Verifikasi terakhir (lulus)

- `npx astro check` → **0 errors / 0 warnings**
- `/work/photography` → `class="carousel photo"` ✔
- Panah `data-prev`/`data-next` → **0** ✔
- Caption `data-caption-output` → ada ✔
- `detail-link` → ada ✔
- CSS `.photo .slide{flex:0 0 70%}` → ter-render ✔
- `/work` → "Selengkapnya Photography" **hilang** ✔

---

*Kunci ini FINAL untuk Photography. Setiap revisi wajib memperbarui dokumen ini lebih dulu.*
