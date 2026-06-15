import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Pure static output (SSG): builds to `dist/`, which is baked into an nginx
// container image (see Dockerfile) and served from the self-hosted k8s cluster.
// No SSR adapter; the experiment variant is resolved per-visitor IN THE BROWSER
// by the <DateApp> island (calls the experimentation platform on load).
//
// Two JSX frameworks coexist, scoped by path so they never fight over .tsx:
//   - Preact  → the live date-flow experiment (everything except src/react/**)
//   - React   → the `/for-mahsa` showpiece (react-three-fiber + framer-motion),
//               which needs the real React reconciler that R3F builds on.
export default defineConfig({
  output: 'static',
  integrations: [
    preact({ exclude: ['**/react/**'] }),
    react({ include: ['**/react/**'] }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
