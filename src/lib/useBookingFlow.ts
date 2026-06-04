import { useState } from "preact/hooks";
import { STEPS, type Step, type Selection } from "./types";

/**
 * Headless state machine for the 5-step invite→booking→confirm flow.
 * Shared by all three variants; each variant supplies its own markup + copy.
 */
export function useBookingFlow(initial?: Partial<Selection>) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState<Selection>({
    setting: initial?.setting ?? null,
    day: initial?.day ?? null,
    time: initial?.time ?? null,
  });

  const step: Step = STEPS[stepIndex];

  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const go = (s: Step) => setStepIndex(STEPS.indexOf(s));

  const select = <K extends keyof Selection>(key: K, value: Selection[K]) =>
    setSelection((prev) => ({ ...prev, [key]: value }));

  return { step, stepIndex, selection, next, back, go, select };
}
