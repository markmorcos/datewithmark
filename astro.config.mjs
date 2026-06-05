import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// Pure static output (SSG): builds to `dist/`, which is baked into an nginx
// container image (see Dockerfile) and served from the self-hosted k8s cluster.
// No SSR adapter; the experiment variant is resolved per-visitor IN THE BROWSER
// by the <DateApp> island (calls the experimentation platform on load).
export default defineConfig({
  output: 'static',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
