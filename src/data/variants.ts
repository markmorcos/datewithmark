import type { SettingOption } from "../lib/types";

// Per-concept invite content. Days are NOT listed here anymore — the booking
// finale computes upcoming (always-future) evenings at render time via
// `upcomingDays()`; see src/lib/dates.ts. Only the setting/time menus differ
// per concept.

export interface VariantData {
  settings: SettingOption[];
  times: string[];
}

export const variantA: VariantData = {
  settings: [
    { id: "dinner", label: "Dinner out", blurb: "Candlelit & unhurried", dot: "#ef4444" },
    { id: "coffee", label: "Coffee & a walk", blurb: "Easy, talk for hours", dot: "#f59e0b" },
    { id: "music", label: "Live music", blurb: "Something with a pulse", dot: "#b45309" },
    { id: "surprise", label: "Surprise you", blurb: "Trust me on this", dot: "#10b981" },
  ],
  times: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"],
};

export const variantB: VariantData = {
  settings: [
    { id: "dinner", label: "loud dinner + dessert", blurb: "somewhere with good fries", dot: "#c6f432" },
    { id: "barcrawl", label: "bar crawl, no plan", blurb: "see where the night goes", dot: "#ff4fa3" },
    { id: "arcade", label: "arcade + burgers", blurb: "i'll beat you at air hockey", dot: "#38bdf8" },
    { id: "chaos", label: "total chaos, my pick", blurb: "you'll have to trust me", dot: "#f59e0b" },
  ],
  times: ["6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"],
};

export const variantC: VariantData = {
  settings: [
    { id: "dinner", label: "Dinner" },
    { id: "wine", label: "Wine & a walk" },
    { id: "gallery", label: "A gallery, then coffee" },
    { id: "leave", label: "Leave it to me" },
  ],
  times: ["6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"],
};
