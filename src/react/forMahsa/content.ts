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
      tag: "THE CANDIDATE",
      title: `${HIS_NAME} · Berlin (via Cairo)`,
      photo: "/photos/1.jpeg",
      lines: [
        "Senior software engineer — I debug feelings too",
        "Cairo-born, Berlin-based, ready to travel anywhere with you",
        "Funniest in my mother tongue — you'll see",
      ],
    },
    {
      tag: "GREEN FLAGS",
      title: "Certified green flags",
      photo: "/photos/2.jpeg",
      lines: [
        "Kind, loyal, and actually empathetic",
        "Here to settle — sounds like we want the same thing",
        "Picks you over the group chat, every time",
      ],
    },
    {
      tag: "OFF THE CLOCK",
      title: "Piano, planes & dancing",
      photo: "/photos/3.jpeg",
      lines: [
        "I play piano and I'll fly anywhere you point at a map",
        "Yes, I dance — saw your moves, I'm in",
        "Love language: physical touch & acts of service",
      ],
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
    { name: "Kindness", value: 100 },
    { name: "Loyalty", value: 100 },
    { name: "Empathy", value: 99 },
    { name: "Sense of humor", value: 97, note: "100 in Arabic" },
    { name: "Dancing", value: 85, note: "ready to practice with you" },
  ],
  quals: [
    "Reference available: my own heart, fully committed",
    "Notice period: none — I'm ready to settle",
    "Relocation: Cairo → Berlin already done; anywhere you are next",
    "Salary expectation: your happiness",
  ],
};

// ── Act III · The Shark Tank Pitch ───────────────────────────────────────────
export const pitch = {
  label: "PART THREE",
  heading: "A Shark Tank Pitch",
  sub: "And now — the ask.",
  deck: [
    { k: "THE ASK", v: "One date.", note: "Space to actually get to know each other — beyond small talk." },
    { k: "THE EQUITY", v: "100% of my heart", note: "No dilution. No exit." },
    { k: "THE MARKET", v: "Just us", note: "Aligned on the husband-wife thing." },
    { k: "TRACTION", v: "Already impressed", note: "Your boldness had me at the application." },
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
    "I'll be honest: we never actually met. I saw you taking applications on Instagram and thought — that's the most fun idea I've seen in ages. So here's mine.",
    "You're bold, free, and open in a way that's genuinely rare. The dancing didn't hurt. Neither did the looks.",
    "I think we'd have a ridiculous amount of fun together — and I'm not just here to play. I want to settle, and it sounds like we're aligned on the whole husband-and-wife thing.",
    "So I don't want the next date. I want all of them.",
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
