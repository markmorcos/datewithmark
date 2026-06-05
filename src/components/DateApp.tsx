import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import VariantA from "./variants/VariantA";
import VariantB from "./variants/VariantB";
import VariantC from "./variants/VariantC";
import Splash from "./Splash";
import { useDateVariant } from "../lib/useDateVariant";
import { EXPERIMENT_VARIANT_TO_AB, type Variant } from "../lib/variant";
import { VARIANT_TITLE } from "../lib/variantMeta";
import type { VariantProps } from "../lib/types";

// Maps the resolved A/B/C concept to its component. All three concepts share the
// same flow + state machine; only skin and copy differ.
const COMPONENTS: Record<Variant, FunctionComponent<VariantProps>> = {
  A: VariantA,
  B: VariantB,
  C: VariantC,
};

/**
 * Client-side render gate for the date-flow experiment. Replaces the old
 * build-time variant flag: fetches this device's `date_flow_variant` arm from
 * the platform, fires `exposure` once, renders the matching concept, and wires
 * `date_confirmed` to the add-to-calendar tap.
 */
export default function DateApp() {
  const { variant, confirm } = useDateVariant();

  // Reflect the resolved concept's title now that it's chosen in the browser
  // (the static page ships a neutral <title>; all three fonts are preloaded in
  // index.astro's <head>, so no client-side font injection is needed).
  useEffect(() => {
    if (!variant) return;
    document.title = VARIANT_TITLE[EXPERIMENT_VARIANT_TO_AB[variant]];
  }, [variant]);

  if (!variant) return <Splash />;

  const Concept = COMPONENTS[EXPERIMENT_VARIANT_TO_AB[variant]];
  return <Concept onConfirm={confirm} />;
}
