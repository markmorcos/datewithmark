# Datebloom

A date-invitation + booking flow shipped as **three UX concepts (A/B/C)** so we can
run an experiment. Today a **hard-coded flag** picks which concept renders; later it
swaps to **GrowthBook** A/B/C assignment with a one-file change.

| Variant | Concept | Vibe |
| --- | --- | --- |
| **A** | Warm Romantic | Peach gradient, fat serif italic, coral accent, hearts |
| **B** | Neon Playful | Dark navy, lime + hot-pink, bold lowercase grotesk, glow |
| **C** | Editorial Minimal | Cream, high-contrast serif, gold + black, list options |

All three share the **same 5-step flow** (invite → setting → day → time → confirm) and
the **same state machine** — only the skin and copy differ.

## Stack

- **[Astro](https://astro.build)** — static output (SSG), ships ~zero JS by default.
- **[Preact](https://preactjs.com)** islands — one small island per variant for the
  interactive flow (`client:load`).
- **[Tailwind CSS v4](https://tailwindcss.com)** via `@tailwindcss/vite`.
- Deploys to **Cloudflare Pages** by serving the static `dist/` (no SSR adapter needed).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output -> dist/
npm run preview  # serve the build locally
```

Routes:

- `/` — the only route. Renders the active variant in place (from the flag); no redirect.
  To review another concept, flip the flag and rebuild.

## The variant flag (the important bit)

Everything funnels through one file: [`src/lib/variant.ts`](src/lib/variant.ts).

```ts
const HARDCODED_VARIANT: Variant = "A"; // flip to "B" / "C", then rebuild

export function resolveVariant(): Variant {
  return HARDCODED_VARIANT;
}
```

`src/pages/index.astro` calls `resolveVariant()` at build time and renders the chosen
variant **in place** — `/` is a static page containing only that variant (no redirect).
To preview another concept, change the flag and rebuild.

## Swapping in GrowthBook (later)

Create a GrowthBook feature **`booking-ux`** with string value `A` / `B` / `C` (or an
experiment with those variations), then `npm i @growthbook/growthbook`.

Since `/` is the only route, assign the variant **per-visitor on the client**: render
all three islands at `/` and let the GrowthBook value decide which one mounts. The
variant components stay exactly as they are — only `index.astro`'s render gate and
`resolveVariant()` change.

```tsx
// src/pages/index.astro — make resolveVariant() run in the browser
const gb = new GrowthBook({ apiHost, clientKey, attributes: { id: getOrSetVisitorId() } });
await gb.init({ timeout: 1000 });
const variant = gb.getFeatureValue<Variant>("booking-ux", "A");
// then mount <VariantA/B/C> for `variant` (client:only) and report exposure to GrowthBook
```

To avoid a flash, gate the islands behind the resolved value (render nothing until
GrowthBook returns) or persist the assignment in a cookie/localStorage so repeat
visits are instant. Bucketing reporting (`gb.setTrackingCallback`) is where the A/B/C
exposure event gets sent to your analytics.

## Project layout

```
src/
  lib/
    variant.ts          # ← the swappable A/B/C flag seam
    types.ts            # shared data model (Selection, SettingOption, DayOption)
    useBookingFlow.ts   # shared 5-step state machine
    share.ts            # Google Calendar URL + Web Share + localStorage helpers
    variantMeta.ts      # per-variant <title> + web font
  data/variants.ts      # per-variant options / days / times
  components/variants/   # VariantA.tsx, VariantB.tsx, VariantC.tsx
  layouts/Base.astro
  pages/index.astro      # the only route — renders the resolved variant in place
```
