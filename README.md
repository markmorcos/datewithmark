# Date with Mark

A date-invitation + booking flow shipped as **three UX concepts** so we can run a
live A/B/n experiment. Which concept a visitor sees is decided **per-device by the
self-hosted experimentation platform** (`experimentation.morcos.tech`, experiment
`date_flow_variant`) — resolved in the browser on load, not a build-time flag.

| Platform variant | Component | Concept | Vibe |
| --- | --- | --- | --- |
| `sunset` (control) | **A** | Warm Romantic | Peach gradient, fat serif italic, coral, hearts |
| `midnight` | **B** | Neon Playful | Dark navy, lime + hot-pink, bold lowercase grotesk, glow |
| `linen` | **C** | Editorial Minimal | Cream, high-contrast serif, gold + black, list options |

All three share the **same 5-step flow** (invite → setting → day → time → confirm) and
the **same state machine** — only the skin and copy differ.

## Stack

- **[Astro](https://astro.build)** — static output (SSG), ships ~zero JS by default.
- **[Preact](https://preactjs.com)** islands — one small island per variant for the
  interactive flow (`client:load`).
- **[Tailwind CSS v4](https://tailwindcss.com)** via `@tailwindcss/vite`.
- Built to a static `dist/`, baked into an **nginx** container, and served from the
  self-hosted **k8s cluster** (node `m720q`). **Cloudflare = DNS only** (it points
  `datewithmark.com` at the cluster ingress; no CF Pages, no SSR adapter).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output -> dist/
npm run preview  # serve the build locally
```

Routes:

- `/` — the only route. A static shell that mounts the `<DateApp>` island; the
  island resolves the variant in the browser and renders it in place (no redirect).

Local dev/build pick up the SDK key from a `PUBLIC_EXP_SDK_KEY` env var (e.g. a
`.env` file). Without it the client simply falls back to the `sunset` control.

## The experiment integration (the important bit)

The active concept comes from the experimentation platform, resolved **per-visitor
on the client**. The pieces:

- [`src/lib/experimentation.ts`](src/lib/experimentation.ts) — the SDK client:
  `loadConfig()` (GET `/api/v1/config`) and `track()` (POST `/api/v1/track`), authed
  with the **client SDK key** (`PUBLIC_EXP_SDK_KEY`), plus a stable per-device id in
  `localStorage`. Every call is best-effort — failures fall back to the control.
- [`src/lib/variant.ts`](src/lib/variant.ts) — maps the platform's variant keys
  (`sunset` / `midnight` / `linen`) to the `A` / `B` / `C` components, and the control
  fallback.
- [`src/lib/useDateVariant.ts`](src/lib/useDateVariant.ts) — the hook: fetches the
  `date_flow_variant` assignment, fires **`exposure`** once on load, and returns a
  `confirm()` that fires **`date_confirmed`** once (the conversion). Both events use
  the same variant value so assignment ↔ conversion bucket correctly.
- [`src/components/DateApp.tsx`](src/components/DateApp.tsx) — the render gate:
  shows a splash until the variant resolves, then mounts the matching concept and
  wires `confirm()` to the add-to-calendar taps.

```ts
// src/lib/variant.ts — the single mapping
export const EXPERIMENT_VARIANT_TO_AB = { sunset: "A", midnight: "B", linen: "C" };
```

Because assignment is a deterministic hash of `device:experiment`, a given device
always sees the same concept across launches.

### The SDK key

The SDK key is a **public client key** — safe to ship in the browser bundle (never
the admin token). Astro only inlines vars prefixed `PUBLIC_`, and this is a static
build, so it must be present at **build time**:

- **CI / prod** — [`deployment.yaml`](deployment.yaml) declares a `buildArgs` entry
  that `infrastructure/scripts/build.sh` resolves from a k8s secret in the
  `datewithmark` namespace and passes as `--build-arg PUBLIC_EXP_SDK_KEY=…` (see the
  [`Dockerfile`](Dockerfile)). Create the secret once, out-of-band, with the
  production key (admin UI → `datewithmark` → SDK keys, or the pod log line
  `production SDK key: sdk_…`):

  ```bash
  kubectl -n datewithmark create secret generic experimentation-sdk \
    --from-literal=SDK_KEY=sdk_xxx
  ```

- **Local** — put `PUBLIC_EXP_SDK_KEY=sdk_xxx` in a `.env` (gitignored).

### Verifying

After a deploy, open `datewithmark.com`, walk the flow to the confirm screen, and tap
*Add to Calendar*. In the admin UI results page for `date_flow_variant`, exposures
and `date_confirmed` should populate and the two-proportion z-test should start to
move as traffic accrues.

## Deploy

Served from the self-hosted cluster (node `m720q`), not Cloudflare Pages —
Cloudflare only hosts DNS for `datewithmark.com`, pointing it at the cluster's
nginx ingress.

1. **Image** — CI builds the [`Dockerfile`](Dockerfile) (Astro build → nginx) and
   pushes `ghcr.io/markmorcos/datewithmark:datewithmark-latest`.
2. **Release** — [`deployment.yaml`](deployment.yaml) is the values file for the shared
   `infrastructure` chart. `infrastructure/scripts/deploy.sh` reads `version` /
   `namespace` / `project` from it and runs:

   ```bash
   helm upgrade --install datewithmark \
     oci://ghcr.io/markmorcos/infrastructure --version 0.6.2 \
     -f deployment.yaml -n datewithmark --create-namespace --history-max=3
   ```

   The chart emits the Deployment, Service, and Ingress (TLS via cert-manager,
   `www` → apex redirect) for `datewithmark.com`.

## Project layout

```
src/
  lib/
    experimentation.ts  # platform SDK client (loadConfig + track + device id)
    useDateVariant.ts   # hook: resolve variant, fire exposure / date_confirmed
    variant.ts          # ← variant types + sunset/midnight/linen → A/B/C mapping
    types.ts            # shared data model (Selection, SettingOption, VariantProps)
    useBookingFlow.ts   # shared 5-step state machine
    share.ts            # Google Calendar URL + Web Share + localStorage helpers
    variantMeta.ts      # per-variant <title> + web font
  data/variants.ts      # per-variant options / days / times
  components/
    DateApp.tsx         # client render gate: resolves variant, mounts concept
    Splash.tsx          # loading state while the variant resolves
    variants/           # VariantA.tsx, VariantB.tsx, VariantC.tsx
  layouts/Base.astro
  pages/index.astro      # the only route — static shell that mounts <DateApp>
  env.d.ts               # types PUBLIC_EXP_SDK_KEY
```
