# 🔒 DESIGN LOCK — Documentary Carousel (`/work` + `/work/documentary`)

> ## ⚠️ AMENDMENT — KUNCI DICABUT SEBAGIAN (chapter navigation)
> **Halaman `/work/documentary` sudah DIHAPUS.** Halaman detail tetap ada di
> `/work/documentary/[slug]` dan **tidak berubah**.
> Berlaku efektif: route `Berlaku untuk` di bawah kini **hanya `/work` (section
> Documentary)**. Seluruh aturan di dokumen ini tetap mengikat untuk komponen
> `DocumentaryCarousel.astro` dan seksi Documentary di `/work`.

**Status: TERKUNCI.** Dokumen ini adalah kontrak desain. Setiap perubahan harus
memperbarui dokumen ini lebih dulu. Berkas komponen: `src/components/DocumentaryCarousel.astro`.

Berlaku untuk: **`/work` (section Documentary)** dan **`/work/documentary`**.
Tidak berlaku untuk: Reels, Graphic Design.
Photography punya dokumen terpisah: **`PHOTOGRAPHY-LOCK.md`**.

---

## 1. Struktur DOM (TERKUNCI)

```
<div class="doc-carousel" data-ready data-playing data-fading data-nested>
  <div class="track">                     <!-- scroll-snap horizontal -->
    <a class="slide" href=... aria-label=...>   <!-- SATU per item, 16:9 -->
      <img class="doc-thumb" data-thumb data-poster />
      <div class="yt-mount" data-yt-id>    <!-- opsional, jika ada video YT -->
      <span class="overlay">               <!-- judul kiri-atas -->
        <span class="doc-title" data-title>Judul</span>
      </span>
    </a>
    ...
  </div>

  <a class="detail-link glass" data-detail>Selengkapnya</a>

  <div class="controls">                   <!-- nav + toggle (BUKAN di dalam slide) -->
    <div class="nav-pill glass">
      <div class="dots">
        <button data-index="i" aria-pressed>…</button>
      </div>
    </div>
    <button class="toggle-btn glass" data-toggle aria-pressed>  <!-- play/pause -->
      <svg data-icon-play>…</svg>
      <svg data-icon-pause>…</svg>
    </button>
  </div>
</div>
```

**Aturan struktur yang dikunci:**
- `detail-link` berada **di luar** `.track`.
- `.controls` berada **di luar** `.track`, **setelah** `detail-link`.
- **TIDAK ADA** tombol play tengah di dalam slide (`.doc-play` dihapus permanen). F2 = b-bersih.
- Ikon toggle = 2 `<svg>` (play & pause) dalam satu tombol, switch via CSS `[data-playing]`.

---

## 2. State machine pada root (TERKUNCI)

| Atribut | Nilai | Arti | Penulis |
|---|---|---|---|
| `data-ready` | `true` | Guard init idempoten | JS init |
| `data-playing` | `true`/`false` | Slide aktif sedang PLAYING | JS `syncPlayback()` dari `getPlayerState()===1` |
| `data-fading` | `true`/`false` | Fade judul saat perpindahan slide | JS debounce scroll track |
| `data-nested` | `true`/`false` | Kontrol "masuk" 10% ke area video | JS scroll listener + hysteresis |

Sumber tunggal kebenaran `data-playing` = **`YT.Player.getPlayerState()`**. Toggle **tidak**
menyimpan state sendiri.

---

## 3. Tata letak media (TERKUNCI — jangan diubah)

| Properti | Nilai | Catatan |
|---|---|---|
| `.slide` | `flex:0 0 100%` | 1 slide per view |
| `.slide` | `aspect-ratio:16/9` | Media **tetap 16:9** |
| `.track` | `padding:0 10%` (desktop) / `0 6%` (≤600px) | peek kiri-kanan |
| `.track` | `gap:20px` (desktop) / `12px` (≤600px) | |
| `.track` | `scroll-snap-type:x mandatory`, `touch-action:pan-x pan-y` | |
| scrollbar | disembunyikan | |

---

## 4. Lapisan z-index (TERKUNCI)

```
z-index:3  .overlay (judul + scrim gradient)   ← atas
z-index:2  .detail-link (desktop: absolute kanan-atas)
z-index:1  .doc-thumb (thumbnail YouTube)
z-index:0  .yt-mount / iframe (video)
```

- `.overlay` **WAJIB** `z-index:3` + `pointer-events:none` agar judul tak tertutup thumbnail.
- Scrim: `linear-gradient(to bottom, rgba(0,0,0,.42), rgba(0,0,0,0))`.

---

## 5. Judul (TERKUNCI)

- Posisi: **kiri-atas** media (`.overlay{top:0;left:0;right:0;padding:18px 22px}`; mobile `12px 14px`).
- `font-size:clamp(18px,2.4vw,30px)`, `weight:700`, `color:#fff`, text-shadow 3 lapis.
- **Hilang** saat `data-playing=true` (`opacity:0`).

---

## 6. Tombol "Selengkapnya" (TERKUNCI — jangan diubah)

- Desktop (`min-width:601px`): `position:absolute; top:18px; right:calc(10% + 22px); z-index:2` → **kanan-atas** media, rata atas dengan judul.
- Mobile (`max-width:600px`): `margin:20px auto 0` → **di bawah** carousel.
- **Hilang** saat `data-playing=true` (`opacity:0; pointer-events:none`) dan saat `data-fading=true` (`opacity:0`).
- Gaya glass (lihat §7).

---

## 7. Gaya "glass" (TERKUNCI — satu resep untuk semua)

Dipakai oleh: `.detail-link`, `.nav-pill`, `.toggle-btn`.

```css
border-radius:99px;
background:rgba(255,255,255,.3);
backdrop-filter:blur(14px) saturate(180%);
-webkit-backdrop-filter:blur(14px) saturate(180%);
border:1px solid rgba(255,255,255,.55);
box-shadow:0 8px 24px rgba(17,17,16,.12);
```

---

## 8. Kontrol carousel (TERKUNCI)

`.controls`: `display:flex; justify-content:center; align-items:center; gap:14px; margin:24px 0`.

### 8.1 Nav pill (dots)
- `.nav-pill`: **tinggi 44px** (SAMA dengan toggle-btn), `box-sizing:border-box`, `padding:0 18px`, radius 99px, glass.
- `.dots`: `gap:9px`.
- Dot: `8×8px`, radius 99px, bg `#c4c1ba`; aktif `width:32px` + `background:var(--ink)`.
- **Transisi dot dipertahankan:** `width .4s var(--ease-out-editorial)`.

### 8.2 Tombol toggle play/pause
- **Bentuk bulat 44×44px**, `padding:0`, radius 99px, glass, `color:#111110`.
- Ikon svg 18×18px.
- **Ikon** — `play` tampil saat pause; `pause` tampil saat `data-playing=true`.
- `:hover{background:rgba(255,255,255,.5)}`; `:focus-visible{outline:2px solid var(--ink);outline-offset:3px}`.
- **SELALU terlihat**, termasuk saat video playing.
- Kontrol: **slide aktif saja** — `data-playing==='true'` → `pauseVideo()`, else `mute()+playVideo()`.

### 8.3 Aturan ukuran yang dikunci
> **Shape nav wajib setinggi & sejajar dengan shape toggle (44px).**
> Mengubah tinggi salah satu **wajib** mengubah yang lain agar tetap sama.

---

## 9. Animasi "masuk 10%" (TERKUNCI)

- **Pemicu = b1:** saat bagian **bawah media keluar dari viewport atas**.
- **Hysteresis (anti-kedip):** `ENTER = bottom < 60px` (masuk), `EXIT = bottom > 120px` (keluar).
- **Besaran:** `translateY(calc(-0.1 * var(--slideH)))` → **10% × tinggi media** (proporsional desktop & mobile).
- `--slideH` di-set dari `slide.getBoundingClientRect().height` pada: init, `resize`, dan ganti slide aktif.
- Transisi: `transform .45s var(--ease-out-editorial)`.
- **`prefers-reduced-motion: reduce`:** posisi tetap berpindah 10%, **tanpa transisi**.

```css
.doc-carousel[data-nested=true] .controls{transform:translateY(calc(-0.1 * var(--slideH,0px)))}
@media(prefers-reduced-motion:reduce){ .controls{transition:none} }
```

---

## 10. Batas implementasi (JANGAN ubah)

- ❌ Mekanisme carousel 16:9 + peek (`.track`/`.slide`/gap/snap)
- ❌ Layout & transisi dot nav
- ❌ `detail-link` (posisi & gaya)
- ❌ File/komponen lain (Carousel biasa, Photography, Reels, Graphic Design)
- ✅ Hanya `src/components/DocumentaryCarousel.astro`

> **AMENDMENT (chapter navigation).** Catatan lama "ClientRouter tidak diaktifkan"
> sudah tidak berlaku: `ClientRouter` aktif di `BaseLayout.astro`, dan `global.css`
> kini memuat 4 keyframes transisi chapter (`chatSlide*`). Yang tetap berlaku untuk
> carousel: mekanisme `.track`/`.slide`/snap, `applyNested`, dot nav, dan
> `detail-link` **tidak berubah**. Boundary navigator (`scroll` chapter) hanya
> memakai listener `wheel`/`touch` pasif dan **tidak pernah** `preventDefault()`,
> sehingga drag carousel & nested scroll tetap utuh.

---

## 11. Ringkasan visual final

```
   ┌─────────────────────────────────────────────┐
   │ Dokumenter …                    [Selengkapnya]│  ← judul kiri-atas + scrim
   │                                             │
   │                 VIDEO 16:9                  │
   │                                             │
   └─────────────────────────────────────────────┘

              [ •  ━  •  • ]   [ ▶ ]
                glass 44px      glass 44px
                  nav-pill       toggle-btn

   scroll halaman ↓ (bagian bawah media lewat atas viewport)
              controls naik 10% tinggi media → menempel bawah video
```

---

*Kunci ini menggantikan catatan desain ad-hoc sebelumnya. Setiap revisi wajib lewat dokumen ini.*
