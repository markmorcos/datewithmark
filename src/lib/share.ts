import type { DayOption, SettingOption } from "./types";

export interface CalEvent {
  title: string;
  iso: string; // YYYY-MM-DD
  time: string; // e.g. "7:00 PM"
  details?: string;
  location?: string;
}

function to24h(t: string): [number, number] {
  const m = t.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return [19, 0];
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const pm = /PM/i.test(m[3]);
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return [h, min];
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Build a Google Calendar "add event" URL using a floating (local) time. */
export function googleCalUrl(e: CalEvent): string {
  const [h, min] = to24h(e.time);
  const [y, mo, d] = e.iso.split("-").map(Number);
  const start = `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(min)}00`;
  const endMinTotal = h * 60 + min + 90; // +1h30m
  const eh = Math.floor(endMinTotal / 60) % 24;
  const em = endMinTotal % 60;
  const end = `${y}${pad(mo)}${pad(d)}T${pad(eh)}${pad(em)}00`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    details: e.details ?? "",
    location: e.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Resolve the human-readable bits of a selection for display + calendar. */
export function resolveChoice(
  settings: SettingOption[],
  days: DayOption[],
  times: string[],
  selection: { setting: string | null; day: string | null; time: string | null },
) {
  const setting = settings.find((s) => s.id === selection.setting) ?? settings[0];
  const day = days.find((d) => d.id === selection.day) ?? days[0];
  const time = selection.time ?? times[0];
  return { setting, day, time };
}

/** Share via the Web Share API, falling back to clipboard. */
export async function sharePlan(text: string) {
  const url = typeof location !== "undefined" ? location.href : "";
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Datebloom", text, url });
      return;
    } catch {
      /* user cancelled — fall through */
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`.trim());
    alert("Link copied to clipboard!");
  } catch {
    /* clipboard unavailable — no-op */
  }
}
