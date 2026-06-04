// ─────────────────────────────────────────────────────────────────────────────
// THE VARIANT SEAM — the single source of truth for which A/B/C concept renders.
//
// Right now this is a HARD-CODED flag. To run the real experiment later, replace
// the body of `resolveVariant()` with a GrowthBook lookup (see README → "Swapping
// in GrowthBook"). Nothing else in the app needs to change: every page and
// component goes through `resolveVariant()` and the `/a` `/b` `/c` routes.
// ─────────────────────────────────────────────────────────────────────────────

export type Variant = "A" | "B" | "C";

export const VARIANTS: readonly Variant[] = ["A", "B", "C"] as const;

/** Flip this to "A" | "B" | "C" to preview a different concept, then rebuild. */
const HARDCODED_VARIANT: Variant = "A";

/**
 * Resolve the active variant.
 *
 * Today: returns the hard-coded flag (evaluated at build time by the index page).
 *
 * Later (GrowthBook A/B/C):
 *   import { GrowthBook } from "@growthbook/growthbook";
 *   const gb = new GrowthBook({ ...config, attributes: { id: visitorId } });
 *   await gb.init();
 *   return gb.getFeatureValue<Variant>("booking-ux", "A");
 */
export function resolveVariant(): Variant {
  return HARDCODED_VARIANT;
}

/** Map a variant to its route path, e.g. "A" -> "/a". */
export function variantPath(v: Variant): string {
  return `/${v.toLowerCase()}`;
}
