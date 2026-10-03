/**
 * Spec §6 — Model data.
 * UI tidak boleh menulis data langsung di komponen. Semua lewat data adapter ini,
 * supaya admin nanti bisa mengedit konten tanpa mengubah layout.
 *
 * Catatan: URL kosong ("") diperbolehkan, tetapi komponen WAJIB menanganinya
 * dengan benar (tanpa href / disabled). Tidak boleh membuat URL palsu (§9.6).
 */

/** URL yang boleh kosong selama data asli belum tersedia (§9 "masih terbuka"). */
export type MaybeUrl = string;

export interface SiteContacts {
  email: string;
  instagram: string;
  instagramUrl: MaybeUrl;
  linkedin: string;
  linkedinUrl: MaybeUrl;
  /** Format E.164 untuk ditampilkan, mis. "+62 813 1345 229". */
  whatsapp: string;
}

export interface SiteCv {
  label: string;
  url: MaybeUrl;
}

export interface FooterPhoto {
  src: string;
  alt: string;
}

export interface SiteFooter {
  intro: string;
  photo: FooterPhoto;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Site {
  name: string;
  role: string;
  location: string;
  contacts: SiteContacts;
  cv: SiteCv;
  footer: SiteFooter;
  nav: readonly NavItem[];
}

export interface WorkCategory {
  id: string;
  /** Label pada category nav (mis. "Desain Grafis"). */
  navLabel: string;
  /** Judul halaman (mis. "Graphic Design"). */
  pageTitle: string;
  href: string;
  caption: string;
}

export interface MediaAsset {
  /** Boleh "" bila video belum tersedia → komponen fallback ke poster + tombol Play. */
  video: MaybeUrl;
  poster: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Documentary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hero: MediaAsset;
  description: string;
  location: string;
  /** Spec §5.4: dihitung otomatis dari video; "" bila video belum dilampirkan. */
  duration: string;
  roles: string;
  fieldNotes: string;
  documentationFocus: readonly string[];
  credits: readonly Credit[];
  /** Spec §5.4: photo grid dikunci pada 6 foto. */
  gallery: readonly GalleryPhoto[];
}

/** Spec §5.6 & §9.3: satu foto utama per detail page — TIDAK ada gallery[]. */
export interface PhotographyItem {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  location: string;
  image: string;
  caption: string;
  description: string;
}

/**
 * Sumber Reels (keputusan final): hanya sumber eksternal resmi.
 * - Tidak ada local video file.
 * - Tidak ada default/fake platform: Reel yang belum punya sumber memakai
 *   `{ type: 'none' }` secara eksplisit (thumbnail jadi static fallback).
 */
export type ReelSource =
  | { type: 'google-drive'; url: MaybeUrl }
  | { type: 'instagram'; url: MaybeUrl }
  | { type: 'none' };

export interface Reel {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  location: string;
  thumbnail: string;
  /** Sumber eksternal eksplisit. `{ type: 'none' }` = belum ada sumber. */
  source: ReelSource;
  caption: string;
  description: string;
  aspectRatio: '9:16';
}

export interface GraphicDesignItem {
  id: string;
  title: string;
  year: string;
  description: string;
  role: string;
  image: string;

  /* ---- Konten halaman DETAIL project (semua opsional) --------------
   * Dirender kondisional: tidak ada placeholder kosong bila field belum
   * tersedia. Jangan mengarang konten untuk field yang tidak ada.
   * ------------------------------------------------------------------ */

  /** Segmen URL: '/work/graphic-design/<kategori>/<slug>'. */
  slug?: string;
  /** Gambar guideline sebagai visual utama halaman detail (rasio asli file). */
  guidelineImage?: {
    src: string;
    alt: string;
    /** Rasio intrinsik, mis. "3 / 2". Mencegah layout melompat. */
    ratio?: string;
  };
  /** Filosofi/konsep logo — teks pendek editorial. */
  philosophy?: string;
  /** Logo utama brand. */
  logoImage?: {src: string; alt: string};
  /** Nama brand/organisasi. */
  brandName?: string;
  /** Metadata tambahan, mis. kategori/tipe project. */
  meta?: string;
}

export interface GraphicDesignSection {
  /** Label seksi, mis. "Logo / Identity". */
  label: string;
  items: readonly GraphicDesignItem[];
}

export interface GraphicCategoryCard {
  /** Kunci koleksi terkait: 'logos' | 'posters' | 'socialMedia'. */
  key: string;
  /** Label kategori, mis. "Logo / Identity". */
  label: string;
  /** Segmen URL halaman GALERI kategori: '/work/graphic-design/<slug>'. */
  slug: string;
  /** Jumlah karya dalam kategori. */
  count: number;

  /* ---- Header halaman GALERI kategori -----------------------------
   * Isi presentasi (guideline/philosophy/brand) TIDAK di sini, melainkan
   * per-project di `GraphicDesignItem` — lihat halaman detail project.
   * ------------------------------------------------------------------ */

  /** Eyebrow kecil di atas judul, mis. "GRAPHIC DESIGN". */
  eyebrow?: string;
  /** Deskripsi pendukung singkat di sisi kanan header (opsional). */
  intro?: string;
}

export interface GraphicDesignData {
  logos: readonly GraphicDesignItem[];
  posters: readonly GraphicDesignItem[];
  socialMedia: readonly GraphicDesignItem[];
  /**
   * Daftar seksi berurutan untuk rendering (extensible: tambah entri di sini
   * agar halaman /work dan /work/graphic-design ikut menyesuaikan tanpa
   * mengubah komponen). Urutan: Logo/Identity → Poster → Social Media.
   */
  sections: readonly GraphicDesignSection[];
  /**
   * Kategori untuk showcase lintas kategori di /work. `key` menunjuk ke
   * salah satu koleksi di data ini (logos/posters/socialMedia).
   */
  showcaseCategories: readonly GraphicShowcaseCategory[];
  /**
   * Kartu perwakilan untuk seksi Desain Grafis di /work: satu foto cover per
   * kategori, diklik untuk membuka seluruh karya kategori tersebut.
   */
  categoryCards: readonly GraphicCategoryCard[];
}

export interface GraphicShowcaseCategory {
  key: 'logos' | 'posters' | 'socialMedia';
  /** Label indikator kategori (BUKAN navigasi/filter). */
  label: string;
}
