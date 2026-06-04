import type { DayOption, SettingOption } from "../lib/types";

// Sample invite content per concept. Day/time labels mirror the Figma mockups.
// `iso` dates are what the calendar link uses.

export interface VariantData {
  settings: SettingOption[];
  days: DayOption[];
  times: string[];
}

export const variantA: VariantData = {
  settings: [
    { id: "dinner", label: "Dinner out", blurb: "Candlelit & unhurried", dot: "#ef4444" },
    { id: "coffee", label: "Coffee & a walk", blurb: "Easy, talk for hours", dot: "#f59e0b" },
    { id: "music", label: "Live music", blurb: "Something with a pulse", dot: "#b45309" },
    { id: "surprise", label: "Surprise you", blurb: "Trust me on this", dot: "#10b981" },
  ],
  days: [
    { id: "wed11", dow: "WED", dom: 11, iso: "2026-06-11" },
    { id: "fri13", dow: "FRI", dom: 13, iso: "2026-06-13" },
    { id: "sat14", dow: "SAT", dom: 14, iso: "2026-06-14" },
    { id: "sun15", dow: "SUN", dom: 15, iso: "2026-06-15" },
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
  days: [
    { id: "thu12", dow: "THU", dom: 12, iso: "2026-06-12" },
    { id: "fri13", dow: "FRI", dom: 13, iso: "2026-06-13" },
    { id: "sat14", dow: "SAT", dom: 14, iso: "2026-06-14" },
    { id: "sun15", dow: "SUN", dom: 15, iso: "2026-06-15" },
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
  days: [
    { id: "wed11", dow: "WED", dom: 11, iso: "2026-06-11" },
    { id: "fri13", dow: "FRI", dom: 13, iso: "2026-06-13" },
    { id: "sat14", dow: "SAT", dom: 14, iso: "2026-06-14" },
    { id: "sun15", dow: "SUN", dom: 15, iso: "2026-06-15" },
  ],
  times: ["6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"],
};
