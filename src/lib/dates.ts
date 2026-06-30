import type { DayOption } from "./types";

// Live date helpers. The home story is a static SSG build, but the booking
// finale runs in the browser island — so we compute candidate evenings relative
// to the *visitor's* "today" at render time. This is what keeps the date the
// story ends on always in the future (the old hardcoded June dates went stale).

const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/**
 * The next `count` evenings that fall on a preferred weekday, starting strictly
 * after today. Defaults to Thu/Fri/Sat/Sun — the date-night candidates.
 * `preferred` uses JS weekday numbers (0 = Sun … 6 = Sat).
 */
export function upcomingDays(
  count = 4,
  preferred: number[] = [4, 5, 6, 0],
  from: Date = new Date(),
): DayOption[] {
  const out: DayOption[] = [];
  // Normalise to local midnight, then step to tomorrow so "today" is excluded.
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    if (preferred.includes(d.getDay())) {
      out.push({ id: iso(d), dow: DOW[d.getDay()], dom: d.getDate(), iso: iso(d) });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** "Fri, Jul 4" — full label for a day option. */
export function formatDay(day: DayOption): string {
  const [y, mo, dd] = day.iso.split("-").map(Number);
  const cap = day.dow.charAt(0) + day.dow.slice(1).toLowerCase();
  return `${cap}, ${MONTH[mo - 1]} ${dd}`;
}
