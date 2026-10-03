import type { Reel } from './types';

export const reels: readonly Reel[] = [
  { id: 'r1', slug: 'seeds-and-soil', title: 'Seeds and Soil', year: '2023', role: 'Director & Sound', location: 'Desa Bajiminasa', thumbnail: '/media/reels/reel-01.webp', source: { type: 'none' }, caption: 'A short reflection on preserving seeds and soil.', description: 'Voices from the agricultural frontline, reflecting on organic practice and the future of land.', aspectRatio: '9:16' },
  { id: 'r2', slug: 'voices-of-the-coast', title: 'Voices of the Coast', year: '2024', role: 'Director', location: 'South Sulawesi', thumbnail: '/media/reels/reel-02.webp', source: { type: 'none' }, caption: 'A coastal story told by the people who live it.', description: 'A compact field story about coastal work, memory, and collective stewardship.', aspectRatio: '9:16' },
  { id: 'r3', slug: 'field-notes', title: 'Field Notes', year: '2024', role: 'Editor & Camera', location: 'Bantaeng', thumbnail: '/media/reels/reel-03.webp', source: { type: 'none' }, caption: 'Small observations from the field.', description: 'Fragments of observation gathered during community documentation work.', aspectRatio: '9:16' },
];
