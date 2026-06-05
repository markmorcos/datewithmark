// ─────────────────────────────────────────────────────────────────────────────
// THE VARIANT SEAM — the single source of truth for which A/B/C concept renders.
//
// The active concept now comes from the self-hosted experimentation platform
// (experiment `date_flow_variant`), resolved PER-VISITOR IN THE BROWSER — not a
// build-time flag. The platform names its variants by concept
// (`sunset` / `midnight` / `linen`); the app renders them as VariantA/B/C. This
// file holds that mapping and the control fallback. See `useDateVariant` +
// `DateApp.tsx` for the fetch/render gate, and `experimentation.ts` for the SDK.
// ─────────────────────────────────────────────────────────────────────────────

/** The three UX concepts as rendered by VariantA/B/C. */
export type Variant = "A" | "B" | "C";

export const VARIANTS: readonly Variant[] = ["A", "B", "C"] as const;

/**
 * The experiment's variant keys (as configured on the platform and returned by
 * `/api/v1/config`). These are the values reported back in `track()` so that
 * exposures and conversions bucket against the right arm.
 */
export type ExperimentVariant = "sunset" | "midnight" | "linen";

export const EXPERIMENT_VARIANTS: readonly ExperimentVariant[] = [
  "sunset",
  "midnight",
  "linen",
] as const;

/**
 * Control arm — also the fallback when the SDK key is missing or the platform
 * is unreachable, so the app always renders a real concept.
 */
export const DEFAULT_EXPERIMENT_VARIANT: ExperimentVariant = "sunset";

/** Map a platform variant key to the component it renders. */
export const EXPERIMENT_VARIANT_TO_AB: Record<ExperimentVariant, Variant> = {
  sunset: "A", // Warm Romantic — peach gradient, fat serif italic, coral
  midnight: "B", // Bold/Dark — near-black, neon lime + hot-pink, glow
  linen: "C", // Minimal — cream, high-contrast serif, gold accents
};

/** Narrowing guard for an unknown variant string from the platform. */
export function isExperimentVariant(v: unknown): v is ExperimentVariant {
  return v === "sunset" || v === "midnight" || v === "linen";
}
