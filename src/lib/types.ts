// Shared data model for the invite + booking flow. All three variants render the
// SAME underlying selection — only the presentation and copy differ.

/** A choosable "setting / vibe" for the evening. */
export interface SettingOption {
  id: string;
  label: string;
  /** Short supporting line shown under the label. */
  blurb?: string;
  /** Accent dot colour (CSS value) used by variants A and B. */
  dot?: string;
}

/** A selectable day chip. */
export interface DayOption {
  id: string;
  dow: string; // e.g. "FRI"
  dom: number; // e.g. 13
  /** ISO date (YYYY-MM-DD) used to build the calendar link. */
  iso: string;
}

/** The user's choices as they move through the flow. */
export interface Selection {
  setting: string | null;
  day: string | null;
  time: string | null;
}

/** Ordered steps shared by every variant. */
export const STEPS = ["invite", "setting", "day", "time", "confirm"] as const;
export type Step = (typeof STEPS)[number];

/** Props shared by the three concept components (VariantA/B/C). */
export interface VariantProps {
  /**
   * Fired when she taps an add-to-calendar action on the confirm screen — the
   * experiment's conversion. Wired by `DateApp` to `track("date_confirmed", …)`.
   */
  onConfirm?: () => void;
}
