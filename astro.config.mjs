// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Spec §1.2 & §8: transisi halaman halus memakai Astro view transitions (ClientRouter di BaseLayout).
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
