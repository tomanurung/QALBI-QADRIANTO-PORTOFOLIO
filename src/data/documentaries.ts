import type { Documentary } from './types';
export const documentaries: readonly Documentary[] = ['Kembali ke Alam Pertanian', 'Suara Pesisir', 'Ruang Hidup Bersama'].map((title, i) => ({
  id: `d${i + 1}`, slug: ['kembali-ke-alam', 'suara-pesisir', 'ruang-hidup'][i], title,
  subtitle: i === 0 ? 'Saparuddin' : 'Community field documentation',
  hero: { video: ['https://www.youtube.com/watch?v=aqz-KE-bpKQ', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'https://www.youtube.com/watch?v=ScMzIvxBSi4'][i] || '', poster: `/media/documentary/documentary-${i + 1}.svg` },
  description: 'Dokumentasi tentang pengetahuan lokal, kehidupan masyarakat, dan perjuangan menjaga ruang hidup. Konten dummy untuk pengembangan frontend.',
  location: i === 0 ? 'Desa Bajiminasa, Sulawesi Selatan' : 'Sulawesi Selatan', duration: '', roles: 'Documentary Filmmaker (Director, Cinematographer, Editor)',
  fieldNotes: 'Percakapan dan pengamatan lapangan menjadi dasar untuk memahami hubungan masyarakat dengan tanah dan lingkungan. Narasi ini adalah data sementara yang akan diganti melalui admin.',
  documentationFocus: i === 0 ? ['Praktik pertanian organik murni bebas zat sintetis', 'Kearifan astronomi dan kalender tradisional penanaman', 'Resiliensi komunitas agraria akar rumput'] : ['Pengetahuan lokal dan perubahan lingkungan', 'Penghidupan dan pengalaman masyarakat', 'Inisiatif kolektif menjaga ruang hidup'],
  credits: [{ role: 'Director & Cinematographer', name: 'Qalbi Qadrianto' }, { role: 'Editor', name: 'Qalbi Qadrianto' }, { role: 'Production Partner', name: 'Balang Institute' }],
  gallery: Array.from({ length: 6 }, (_, j) => ({ src: `/media/documentary/documentary-${i + 1}-${j + 1}.svg`, alt: `${title} — dummy field photograph ${j + 1}` })),
}));
