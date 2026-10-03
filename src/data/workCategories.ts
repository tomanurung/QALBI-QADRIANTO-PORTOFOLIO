import type { WorkCategory } from './types';

export const workCategories: readonly WorkCategory[] = [
  { id: 'documentary', navLabel: 'Documentary', pageTitle: 'Documentary', href: '#documentary', caption: 'Field-based films documenting community voices and environmental justice.' },
  { id: 'photography', navLabel: 'Photography', pageTitle: 'Photography', href: '#photography', caption: 'A portrait of everyday life, labor, and community experience in South Sulawesi.' },
  { id: 'graphic-design', navLabel: 'Desain Grafis', pageTitle: 'Graphic Design', href: '#graphic-design', caption: 'Visual identities and campaign materials rooted in public communication.' },
  { id: 'reels', navLabel: 'Reels', pageTitle: 'Reels', href: '#reels', caption: 'Short-form visual documentation exploring people, place, and everyday field stories.' },
];
