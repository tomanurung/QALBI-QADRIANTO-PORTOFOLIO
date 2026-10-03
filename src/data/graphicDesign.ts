import type { GraphicDesignData } from './types';

// Data DUMMY repo. Field konten detail (guidelineImage/philosophy/logoImage/
// brandName/meta) bersifat OPSIONAL — halaman detail merender kondisional dan
// TIDAK mengarang konten bila field tidak ada. Ganti lewat admin.
const items = (
  kind: string,
  count: number,
  dir: string,
  /* Konten detail contoh: hanya project pertama yang diisi lengkap, sisanya
   * minimal — membuktikan halaman detail tetap benar saat sebagian field kosong. */
  enrich?: (i: number) => Partial<{slug: string; guidelineImage: any; philosophy: string; logoImage: any; brandName: string; meta: string}>,
) =>
  Array.from({length: count}, (_, i) => ({
    id: `${kind}-${i}`,
    title: `${kind} ${String(i + 1).padStart(2, '0')}`,
    year: '2024',
    role: 'Visual Designer',
    description: 'Dummy campaign material for community communication.',
    image: `/media/${dir}/${kind.toLowerCase()}-${i + 1}.svg`,
    slug: `${kind.toLowerCase()}-${String(i + 1).padStart(2, '0')}`,
    ...(enrich ? enrich(i) : {}),
  }));

const logos = items('Identity', 6, 'identity', i => ({
  brandName: i === 0 ? 'Dummy Brand — Identity 01' : `Dummy Organization ${String(i + 1).padStart(2, '0')}`,
  meta: 'Logo / Identity',
  philosophy: i === 0
    ? 'Dummy concept note. The mark is drawn from agricultural contours and the idea of shared ground, forming a simple shape that stays legible at small sizes. Content is placeholder and will be replaced through the admin.'
    : undefined,
  guidelineImage: i === 0
    ? {src: '/media/identity/identity-2.svg', alt: 'Logo guideline — Identity 01', ratio: '3 / 2'}
    : undefined,
  logoImage: i === 0 ? {src: '/media/identity/identity-1.svg', alt: 'Dummy primary logo'} : undefined,
}));
const posters = items('Poster', 5, 'posters');
const socialMedia = items('Social', 12, 'social');

export const graphicDesign: GraphicDesignData = {
  logos,
  posters,
  socialMedia,
  // Rendering seksi mengikuti urutan array ini — tambah entri = tambah seksi.
  sections: [
    { label: 'Logo / Identity', items: logos },
    { label: 'Poster', items: posters },
    { label: 'Social Media', items: socialMedia },
  ],
  // Urutan kategori showcase lintas kategori di /work.
  showcaseCategories: [
    { key: 'logos', label: 'Logo / Identity' },
    { key: 'posters', label: 'Poster' },
    { key: 'socialMedia', label: 'Social Media' },
  ],
  // Kartu kategori di /work → halaman GALERI kategori (bukan detail project).
  // Kartu ini hanya membawa header galeri; isi presentasi ada per-project.
  categoryCards: [
    {
      key: 'logos', label: 'Logo / Identity', slug: 'logo', count: logos.length,
      eyebrow: 'Graphic Design',
      intro: 'Identity system for community-based organizations — mark, colour and typographic voice.',
    },
    {
      key: 'posters', label: 'Poster', slug: 'poster', count: posters.length,
      eyebrow: 'Graphic Design',
      intro: 'Campaign posters built on a strict type grid and a restrained palette.',
    },
    {
      key: 'socialMedia', label: 'Social Media', slug: 'social-media', count: socialMedia.length,
      eyebrow: 'Graphic Design',
      intro: 'A reusable social template kit for community communication.',
    },
  ],
};

