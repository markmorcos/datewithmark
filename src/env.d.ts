/// <reference types="astro/client" />

// Public (client-exposed) build-time env vars. Astro inlines anything prefixed
// `PUBLIC_` into the static bundle, so the value must be present at `npm run
// build` time (see Dockerfile `ARG PUBLIC_EXP_SDK_KEY` + deployment.yaml
// `buildArgs`). The experimentation SDK key is a *client* key — safe to ship in
// the browser bundle. The admin token must never appear here.
interface ImportMetaEnv {
  readonly PUBLIC_EXP_SDK_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
