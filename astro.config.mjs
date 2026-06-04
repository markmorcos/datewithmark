import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// Pure static output (SSG) — deploys to Cloudflare Pages by serving `dist/`.
// No SSR adapter needed: the variant is resolved at build time (hard-coded flag)
// and, later, at the edge via a Cloudflare Pages Function (see README).
export default defineConfig({
  output: 'static',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
