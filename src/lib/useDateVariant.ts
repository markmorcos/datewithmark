import { useEffect, useRef, useState } from "preact/hooks";
import { EXPERIMENT, loadConfig, track } from "./experimentation";
import {
  DEFAULT_EXPERIMENT_VARIANT,
  isExperimentVariant,
  type ExperimentVariant,
} from "./variant";

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
