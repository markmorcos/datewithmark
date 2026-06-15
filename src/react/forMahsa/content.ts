// ─────────────────────────────────────────────────────────────────────────────
// Everything personal lives here. Edit these strings to make it yours — the
// components below just render whatever is in this file. Written to match the
// "Future Husband Applications" brief: a dating app + job interview + shark-tank
// pitch, all at once. Signed by Mark, addressed to Mahsa.
// ─────────────────────────────────────────────────────────────────────────────

export const HER_NAME = "Mahsa";
export const HIS_NAME = "Mark";
export const APPLICATION_NO = "001";

// ── Cold open ────────────────────────────────────────────────────────────────
export const intro = {
  kicker: "OFFICIAL APPLICATION",
  title: "FUTURE HUSBAND",
  script: "Application",
  subtitle: `No. ${APPLICATION_NO} — submitted for the consideration of ${HER_NAME}`,
  hint: "scroll to review the candidate",
};

// ── Act I · The Dating App ───────────────────────────────────────────────────
// Swipeable profile cards about the candidate.
export const swipe = {
  label: "PART ONE",
  heading: "A Dating App",
  sub: "Meet the candidate.",
  cards: [
    {
      tag: "THE BASICS",
      title: `${HIS_NAME}, 1 (applicant)`,
      lines: [
        "Will text you good morning and mean it",
        "Laughs at your jokes — even the bad ones",
        "Already thinks you're the best part of the day",
      ],
      emoji: "😏",
    },
    {
      tag: "GREEN FLAGS",
      title: "Certified green flags",
      lines: [
        "Remembers the little things you say",
        "Shows up. On time. With snacks.",
        "Picks you over the group chat, every time",
      ],
      emoji: "💚",
    },
    {
      tag: "MY LOVE LANGUAGE",
      title: "How I'll show up",
      lines: [
        "Acts of service (I will carry everything)",
        "Quality time (phone face-down)",
        "Words — like the ones on this page",
      ],
      emoji: "💌",
    },
  ],
  matchTitle: "It's a Match!",
  matchSub: `You and ${HIS_NAME} liked each other.`,
};

// ── Act II · The Job Interview ───────────────────────────────────────────────
export const interview = {
  label: "PART TWO",
  heading: "A Job Interview",
  sub: "For the position of: Husband (full-time, lifetime contract).",
  status: "Open to work — and only this role.",
  skills: [
    { name: "Loyalty", value: 100 },
    { name: "Makes you laugh", value: 98 },
    { name: "Emotional availability", value: 100 },
    { name: "Cooking", value: 86, note: "improving daily" },
    { name: "Remembering dates", value: 95 },
  ],
  quals: [
    "Reference available: my own heart, fully committed",
    "Notice period: none — I'm ready now",
    "Relocation: anywhere you are",
    "Salary expectation: your happiness",
  ],
};

// ── Act III · The Shark Tank Pitch ───────────────────────────────────────────
export const pitch = {
  label: "PART THREE",
  heading: "A Shark Tank Pitch",
  sub: "And now — the ask.",
  deck: [
    { k: "THE ASK", v: "One date.", note: "Then forever, if you'll have it." },
    { k: "THE EQUITY", v: "100% of my heart", note: "No dilution. No exit." },
    { k: "THE MARKET", v: "Just us", note: "Total addressable: you and me." },
    { k: "TRACTION", v: "Already falling", note: "Growth rate: every single day." },
  ],
  chartLabel: "Our future (projected)",
  close: "I'm all in. Are you?",
};

// ── Finale · The 3D ring + the message ───────────────────────────────────────
export const finale = {
  ringHint: "made this for you",
  title: `${HER_NAME},`,
  // The personal note. Replace with your own words — this is the heart of it.
  message: [
    "I built a whole landing page because a text felt too small for how I feel.",
    "You make ordinary days feel like the highlight reel. You're my favorite person to tell things to, the first face I look for in every room.",
    "So here's my application — dating app, job interview, shark-tank pitch and all.",
    "I don't want the next date. I want all of them.",
  ],
  signoff: "All my heart,",
  signature: HIS_NAME,
  cta: "say yes",
  // Shown after she taps the CTA.
  yes: {
    title: "Yes?",
    sub: "I was hoping you'd say that.",
    // Tapping this opens her mail app, pre-addressed to you, subject + body
    // filled in. She can edit before hitting send.
    emailCta: "make it official — email me",
    email: {
      to: "me@datewithmark.com",
      subject: "I said yes 💍",
      body: [
        `${HIS_NAME},`,
        "",
        "Yes. To the date, and to all the ones after it.",
        "",
        "— " + HER_NAME,
      ].join("\n"),
    },
  },
};
