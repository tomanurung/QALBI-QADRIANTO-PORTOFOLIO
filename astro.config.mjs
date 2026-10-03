// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: https://tomanurung.github.io/QALBI-QADRIANTO-PORTOFOLIO/
// Repo bukan `tomanurung.github.io`, jadi situs dilayani di sub-path dan
// WAJIB pakai `base`. Nama repo ditulis persis (case-sensitive pada path).
const REPO = '/QALBI-QADRIANTO-PORTOFOLIO';

// Kode sumber memakai path internal absolut (mis. "/work/...", "/media/...").
// Dengan `base`, path itu harus ikut diprefix. Alih-alih mengedit 37 titik di
// 15 file (berisiko regresi), prefix disuntikkan otomatis saat build:
// hanya menyasar string literal yang DIAWALI "/" dan BUKAN "//" (protokol).
/** @returns {import('vite').Plugin} */
function prefixInternalPaths() {
  return {
    name: 'prefix-internal-paths',
    enforce: 'pre',
    transform(code, id) {
      // Hanya file sumber proyek; lewati dependensi & file non-relevan.
      if (!id.includes('/src/') || id.includes('node_modules')) return null;

      let changed = false;
      const out = code.replace(
        /(["'`])\/(?!\/)(?=[A-Za-z0-9._#?]|["'`])/g,
        (match, quote) => {
          changed = true;
          // Jangan sentuh path yang sudah diprefix (idempoten).
          return `${quote}${REPO}/`;
        }
      );
      // Hindari double-prefix bila file sudah mengandung REPO.
      const safe = out.replace(new RegExp(`${REPO}${REPO}`, 'g'), REPO);
      return changed ? safe : null;
    },
  };
}

// Spec §1.2 & §8: transisi halaman halus memakai Astro view transitions (ClientRouter di BaseLayout).
export default defineConfig({
  site: 'https://tomanurung.github.io',
  base: REPO,
  vite: {
    plugins: [prefixInternalPaths(), tailwindcss()],
  },
});
