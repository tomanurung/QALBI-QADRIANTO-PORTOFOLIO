import type { Site } from './types';

export const site: Site = {
  name: 'Qalbi Qadrianto',
  role: 'Community Organizing, Socio-Environmental Research & Advocacy Documentation',
  location: 'Bantaeng, South Sulawesi',
  contacts: { email: 'Qalbiqadrianto@proton.me', instagram: 'Qalbi_qadrianto', instagramUrl: 'https://instagram.com/qalbi_qadrianto', linkedin: 'Qalbi Qadrianto', linkedinUrl: '', whatsapp: '+62 813 1345 229' },
  cv: { label: 'Download CV', url: 'https://example.com/qalbi-qadrianto-cv.pdf' },
  footer: { intro: 'Let’s connect, share knowledge, and build meaningful collaborations. Together, we can strengthen community voices and advance social and environmental justice.', photo: { src: '/media/footer/Footer-image.png', alt: 'Qalbi Qadrianto in the field' } },
  nav: [{ label: 'HOME', href: '/' }, { label: 'ABOUT ME', href: '/about' }, { label: 'WORK', href: '/work' }, { label: 'CONTACT ME', href: '/contact' }],
};

export const aboutBio = 'I am a community organizer and socio-environmental practitioner working at the intersection of field research, community organizing, advocacy, documentation, and public communication. My experience includes accompanying affected communities, gathering evidence, documenting socio-ecological issues, and producing campaign materials rooted in community experiences.';
export const experience = [
  ['2022 — Now', 'Balang Institute', 'Research, Publication & Communication staff'],
  ['2024 — Now', 'LBH Makassar', 'Research, Publication & Communication staff'],
  ['2023 — Now', 'KIBA Environmental Advocacy', 'Community Organizer & Land Rights Advocate'],
] as const;
export const tools = ['Adobe Premiere Pro', 'After Effects', 'CapCut', 'Photoshop', 'Canva'];
export const capabilities = ['Documentary Filmmaking', 'Photography', 'Field Documentation', 'Visual Storytelling', 'Research & Fieldwork', 'Video Editing', 'Creative Direction', 'Visual Communication'];
export const education = '2022 – 2025 · ASMI PUBLIK MAKASSAR · Manajemen informatika';
export const languages = [['Indonesia', 'Native'], ['Inggris', 'Basic']] as const;

export function activeNav(pathname: string, href: string) { return href === '/work' ? pathname.startsWith('/work') : pathname === href; }
export function externalOrEmpty(url: string) { return url || undefined; }
export function whatsappUrl(phone: string) { return `https://wa.me/${phone.replace(/\D/g, '')}`; }
