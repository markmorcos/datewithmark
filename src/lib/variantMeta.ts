import type { Variant } from "./variant";

// Per-variant page metadata, shared by the "/" resolver page and the /a /b /c
// direct-access routes so the title + web font live in exactly one place.

export const VARIANT_TITLE: Record<Variant, string> = {
  A: "Will you go out with me? · Datebloom",
  B: "so... dinner? · Datebloom",
  C: "An evening, if you're free · Datebloom",
};

export const VARIANT_FONT: Record<Variant, string> = {
  A: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,900&display=swap",
  B: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap",
  C: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap",
};
