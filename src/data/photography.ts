import type { PhotographyItem } from './types';

export const photography: readonly PhotographyItem[] = [
  { id: 'p1', slug: 'morning-at-the-field', title: 'Morning at the Field', year: '2024', role: 'Photographer', location: 'Bantaeng, South Sulawesi', image: '/media/photography/photo-01.webp', caption: 'Morning work and inherited knowledge in an agricultural community.', description: 'A quiet study of labor, land, and the everyday gestures that keep community knowledge alive.' },
  { id: 'p2', slug: 'community-gathering', title: 'Community Gathering', year: '2023', role: 'Documentary Photographer', location: 'South Sulawesi', image: '/media/photography/photo-02.webp', caption: 'Collective conversation as a form of care and resistance.', description: 'Documenting a meeting where stories become shared evidence and a path toward action.' },
  { id: 'p3', slug: 'coastal-livelihood', title: 'Coastal Livelihood', year: '2024', role: 'Photographer', location: 'Bantaeng, South Sulawesi', image: '/media/photography/photo-03.webp', caption: 'People, coast, and the work of sustaining a place.', description: 'A field portrait of coastal livelihoods and the social ecology surrounding them.' },
];
