import type { Variant } from "../lib/variant";

// ─────────────────────────────────────────────────────────────────────────────
// The home story. `/` is now a scroll-told story about Mark that ends in a real
// (always-future) booking. The same story is skinned three ways by the existing
// A/B/C experiment — only tone + theme differ, the structure is shared.
//
// Copy is name-neutral toward the reader (no "you, <name>"): it works for anyone
// who lands on the page. The deeply personal, Mahsa-specific version lives
// separately at /for-mahsa and is intentionally left untouched.
//
// THEME values are LITERAL Tailwind class strings so the v4 scanner emits them.
// Never build these by interpolation — a computed `bg-[${x}]` is invisible to
// the scanner and silently produces no CSS.
// ─────────────────────────────────────────────────────────────────────────────

export interface StoryChapter {
  kicker: string;
  title: string;
  lines: string[];
  photo?: string;
}

export interface StoryFinale {
  kicker: string;
  title: string;
  intro: string;
  vibePrompt: string;
  dayPrompt: string;
  timePrompt: string;
  /** Calendar event title once she adds it. */
  calTitle: string;
  /** Optional event location line. */
  location?: string;
  confirmLine: string;
  googleCta: string;
  appleCta: string;
  shareCta: string;
}

export interface StoryContent {
  hero: { kicker: string; title: string; subtitle: string; hint: string };
  chapters: StoryChapter[];
  finale: StoryFinale;
}

export interface StoryTheme {
  /** font-family utility class (defined in global.css). */
  font: string;
  /** Extra classes applied to big headings (e.g. italic, lowercase). */
  heading: string;
  /** Full-page background for the scroll. */
  page: string;
  text: string;
  muted: string;
  kicker: string;
  accentText: string;
  /** Top scroll-progress bar fill. */
  bar: string;
  /** Chapter media/card surface. */
  card: string;
  /** Primary action button. */
  btn: string;
  /** Secondary/outline action button. */
  btnOutline: string;
  /** Chip when selected / unselected. */
  chipOn: string;
  chipOff: string;
}

// ── A · "sunset" — warm romantic ─────────────────────────────────────────────
const themeA: StoryTheme = {
  font: "font-fraunces",
  heading: "font-black italic",
  page: "bg-gradient-to-b from-[#fdeee7] via-[#fde2d6] to-[#fbd5c4] text-[#3a241e]",
  text: "text-[#3a241e]",
  muted: "text-[#7a5b52]",
  kicker: "text-[#c2614f]",
  accentText: "text-[#c2614f]",
  bar: "bg-[#f26b5e]",
  card: "bg-white shadow-xl shadow-[#f26b5e]/10",
  btn: "bg-[#f26b5e] text-white shadow-lg shadow-[#f26b5e]/30",
  btnOutline: "border border-[#f26b5e] text-[#c2614f]",
  chipOn: "border-[#f26b5e] bg-[#fde0d8] text-[#c2614f]",
  chipOff: "border-transparent bg-white text-[#3a241e]",
};

const contentA: StoryContent = {
  hero: {
    kicker: "A short story",
    title: "Hi, I'm Mark.",
    subtitle: "Give me a minute — let me tell you how I got here, and then ask you something.",
    hint: "scroll to read",
  },
  chapters: [
    {
      kicker: "Chapter one",
      title: "Cairo, then Berlin",
      photo: "/photos/1.jpeg",
      lines: [
        "I grew up in Cairo — loud, warm, full of people who feed you whether you're hungry or not.",
        "Now I'm in Berlin, building things and learning to make a new city feel like home.",
        "I'm the same person in both: a little nostalgic, a lot curious.",
      ],
    },
    {
      kicker: "Chapter two",
      title: "Engineer by day",
      photo: "/photos/2.jpeg",
      lines: [
        "I'm a software engineer. I like problems that look impossible until they suddenly aren't.",
        "Off the clock I play piano, and I'll fly somewhere on a Friday just to see it.",
        "And yes — I dance. Badly, joyfully, without much convincing.",
      ],
    },
    {
      kicker: "Chapter three",
      title: "What I'm actually after",
      photo: "/photos/3.jpeg",
      lines: [
        "I'm not here to collect dates. I'm here to find the person the rest of it is for.",
        "Kind, loyal, present — that's what I try to be, and what I'm hoping to meet.",
        "Someone to be a little ridiculous with, and serious about when it counts.",
      ],
    },
  ],
  finale: {
    kicker: "The ask",
    title: "So — will you go out with me?",
    intro: "No grand plan. Just an evening worth remembering. Pick what sounds nice and I'll be there.",
    vibePrompt: "What sounds nice?",
    dayPrompt: "Which evening?",
    timePrompt: "And what time?",
    calTitle: "Our date 💕",
    location: "I'll surprise you",
    confirmLine: "It's a date — can't wait to see you.",
    googleCta: "Add to Google Calendar",
    appleCta: "Add to Apple Calendar",
    shareCta: "Share the plan",
  },
};

// ── B · "midnight" — neon playful ────────────────────────────────────────────
const themeB: StoryTheme = {
  font: "font-grotesk",
  heading: "font-extrabold lowercase",
  page: "bg-gradient-to-b from-[#241a44] via-[#1a1230] to-[#0f0a1e] text-white",
  text: "text-white",
  muted: "text-white/55",
  kicker: "text-[#c6f432]",
  accentText: "text-[#ff4fa3]",
  bar: "bg-[#c6f432]",
  card: "border border-white/10 bg-white/[0.04]",
  btn: "glow-pink bg-[#ff4fa3] text-black font-extrabold lowercase",
  btnOutline: "border border-white/20 text-white font-bold lowercase",
  chipOn: "border-[#c6f432] bg-[#c6f432] text-black",
  chipOff: "border-white/10 bg-white/[0.03] text-white",
};

const contentB: StoryContent = {
  hero: {
    kicker: "ok deep breath",
    title: "hi, i'm mark.",
    subtitle: "give me thirty seconds of scrolling and then i'm asking you out. officially.",
    hint: "keep scrolling",
  },
  chapters: [
    {
      kicker: "part one",
      title: "cairo kid, berlin life",
      photo: "/photos/1.jpeg",
      lines: [
        "grew up in cairo. loud, warm, way too much food. zero regrets.",
        "now i'm in berlin causing fun and shipping code.",
        "same chaos energy in both cities tbh.",
      ],
    },
    {
      kicker: "part two",
      title: "engineer + menace",
      photo: "/photos/2.jpeg",
      lines: [
        "software engineer. i'll debug your wifi and your bad day.",
        "i play piano and i'll book a flight on a whim. point at a map.",
        "i dance. you've been warned.",
      ],
    },
    {
      kicker: "part three",
      title: "not here to play (much)",
      photo: "/photos/3.jpeg",
      lines: [
        "i'm not collecting matches. i want the real thing.",
        "kind, loyal, fully present — that's the whole pitch.",
        "someone to be unserious with, and serious about.",
      ],
    },
  ],
  finale: {
    kicker: "the ask",
    title: "so... dinner?",
    intro: "this is me asking you out. pick the vibe, i'll handle the rest. it's happening.",
    vibePrompt: "pick our vibe",
    dayPrompt: "what day tho",
    timePrompt: "what time",
    calTitle: "locked in 🔒",
    confirmLine: "locked in — don't you dare bail on me.",
    googleCta: "google calendar",
    appleCta: "apple calendar",
    shareCta: "share it",
  },
};

// ── C · "linen" — editorial minimal ──────────────────────────────────────────
const themeC: StoryTheme = {
  font: "font-playfair",
  heading: "",
  page: "bg-[#efe9dd] text-[#1f1b16]",
  text: "text-[#1f1b16]",
  muted: "text-[#6b6253]",
  kicker: "text-[#8a7a52]",
  accentText: "text-[#a8893f]",
  bar: "bg-[#a8893f]",
  card: "border border-[#1f1b16]/10 bg-[#f6f2e9]",
  btn: "bg-[#272019] text-[#efe9dd] uppercase tracking-[0.15em]",
  btnOutline: "border border-[#1f1b16]/25 text-[#1f1b16] uppercase tracking-[0.15em]",
  chipOn: "border-[#a8893f] bg-[#f6f2e9] text-[#a8893f]",
  chipOff: "border-[#1f1b16]/10 bg-[#f6f2e9] text-[#1f1b16]",
};

const contentC: StoryContent = {
  hero: {
    kicker: "An introduction",
    title: "I'm Mark.",
    subtitle: "A short story, and then a question — if you'll allow me the indulgence.",
    hint: "scroll",
  },
  chapters: [
    {
      kicker: "One",
      title: "From Cairo to Berlin",
      photo: "/photos/1.jpeg",
      lines: [
        "I was raised in Cairo — warm, crowded, generous to a fault.",
        "Berlin is home now: quieter mornings, the same restless mind.",
        "I carry a little of the old city wherever I go.",
      ],
    },
    {
      kicker: "Two",
      title: "An engineer who plays",
      photo: "/photos/2.jpeg",
      lines: [
        "I build software for a living, and I'm rather good at the impossible-looking ones.",
        "I play the piano, and I'll cross a continent for a good reason.",
        "I dance, too — with more enthusiasm than technique.",
      ],
    },
    {
      kicker: "Three",
      title: "What I'm looking for",
      photo: "/photos/3.jpeg",
      lines: [
        "Not another evening to pass the time — the person worth keeping.",
        "Kind, loyal, and present. The qualities I try to offer in return.",
        "Someone to be unhurried with, when there's no rush to be anywhere.",
      ],
    },
  ],
  finale: {
    kicker: "The question",
    title: "An evening, if you're free?",
    intro: "Nothing elaborate. Good company, somewhere quiet. Choose the shape of it below.",
    vibePrompt: "Choose the setting",
    dayPrompt: "A day",
    timePrompt: "A time",
    calTitle: "An evening together",
    confirmLine: "Confirmed. I'll see you then.",
    googleCta: "Google Calendar",
    appleCta: "Apple Calendar",
    shareCta: "Share",
  },
};

export const STORY_THEME: Record<Variant, StoryTheme> = { A: themeA, B: themeB, C: themeC };
export const STORY_CONTENT: Record<Variant, StoryContent> = { A: contentA, B: contentB, C: contentC };
