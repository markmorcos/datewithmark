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

- `/` — renders the active variant in place (from the flag); no redirect.
- `/a`, `/b`, `/c` — the three concepts directly (handy for review / QA).

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
To preview another concept, change the flag and rebuild (or just visit `/a` `/b` `/c`).

## Swapping in GrowthBook (later)

Create a GrowthBook feature **`booking-ux`** with string value `A` / `B` / `C` (or an
experiment with those variations). Then pick one of:

**Option 1 — Edge assignment (preferred, no flicker, URL stays `/`).** Add a
Cloudflare Pages Function `functions/index.ts` that evaluates GrowthBook per request,
sets a sticky cookie, and internally **rewrites** `/` to the pre-rendered `/a | /b | /c`
asset (no redirect — the address bar stays `/`). The static variant pages and all
variant code stay exactly as they are.

```ts
// functions/index.ts (sketch)
import { GrowthBook } from "@growthbook/growthbook";
export const onRequestGet: PagesFunction = async ({ request, env, next }) => {
  const cookie = /* read "db_variant" from request headers */;
  const gb = new GrowthBook({ apiHost, clientKey, attributes: { id: visitorId } });
  await gb.init({ timeout: 1000 });
  const v = (cookie ?? gb.getFeatureValue("booking-ux", "A")).toLowerCase();
  // Serve the pre-rendered variant asset at "/" (internal rewrite, not a redirect)
  const res = await env.ASSETS.fetch(new URL(`/${v}`, request.url));
  const out = new Response(res.body, res);
  out.headers.append("Set-Cookie", `db_variant=${v}; Path=/; Max-Age=2592000`);
  return out;
};
```

**Option 2 — Client assignment.** Render all three islands at `/` and have the
GrowthBook lookup in `resolveVariant()` pick which one mounts on the client.

Either way, **only the resolver changes.** `npm i @growthbook/growthbook` to add the SDK.

## Project layout

```
src/
  lib/
    variant.ts          # ← the swappable A/B/C flag seam
    types.ts            # shared data model (Selection, SettingOption, DayOption)
    useBookingFlow.ts   # shared 5-step state machine
    share.ts            # Google Calendar URL + Web Share helpers
  data/variants.ts      # per-variant options / days / times
  components/variants/   # VariantA.tsx, VariantB.tsx, VariantC.tsx
  layouts/Base.astro
  pages/                # index.astro (resolver) + a/b/c.astro
```
