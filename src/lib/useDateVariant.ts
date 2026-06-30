import { useEffect, useRef, useState } from "preact/hooks";
import { EXPERIMENT, loadConfig, track } from "./experimentation";
import {
  DEFAULT_EXPERIMENT_VARIANT,
  isExperimentVariant,
  type ExperimentVariant,
} from "./variant";

/** Letters → platform keys, so `?variant=a` works as well as `?variant=sunset`. */
const LETTER_TO_VARIANT: Record<string, ExperimentVariant> = {
  a: "sunset",
  b: "midnight",
  c: "linen",
};

/**
 * Dev/testing escape hatch: `?variant=sunset|midnight|linen` (or a|b|c) forces a
 * concept locally, bypassing the platform assignment. Returns null when absent.
 */
function variantOverride(): ExperimentVariant | null {
  if (typeof location === "undefined") return null;
  const raw = new URLSearchParams(location.search).get("variant");
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (isExperimentVariant(lower)) return lower;
  return LETTER_TO_VARIANT[lower] ?? null;
}

export interface DateVariant {
  /** The resolved experiment arm, or null while config is still loading. */
  variant: ExperimentVariant | null;
  /**
   * Report the conversion ("date_confirmed"). Fires at most once per mount and
   * uses the SAME variant value as the exposure, so assignment ↔ conversion
   * line up on the results page.
   */
  confirm: () => void;
}

/**
 * Resolve this device's `date_flow_variant` arm from the platform and fire the
 * `exposure` event once on load. Falls back to the control arm if the platform
 * is unreachable so the app always renders.
 */
export function useDateVariant(): DateVariant {
  const [variant, setVariant] = useState<ExperimentVariant | null>(null);
  const converted = useRef(false);

  useEffect(() => {
    let active = true;
    const forced = variantOverride();
    if (forced) {
      setVariant(forced);
      track("exposure", forced);
      return;
    }
    loadConfig().then((config) => {
      if (!active) return;
      const raw = config?.experiments?.[EXPERIMENT]?.variant;
      const v = isExperimentVariant(raw) ? raw : DEFAULT_EXPERIMENT_VARIANT;
      setVariant(v);
      track("exposure", v);
    });
    return () => {
      active = false;
    };
  }, []);

  const confirm = () => {
    if (converted.current || !variant) return;
    converted.current = true;
    track("date_confirmed", variant);
  };

  return { variant, confirm };
}
