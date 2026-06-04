import type { DayOption, SettingOption } from "./types";

/**
 * The inviter's email. Added as a guest on the Google Calendar event so the
 * inviter is notified the moment the invitee saves it. (Later this could come
 * from a per-invite link/config instead of a constant.)
 */
export const INVITER_EMAIL = "mark.yehia@gmail.com";

export interface CalEvent {
  title: string;
  iso: string; // YYYY-MM-DD
  time: string; // e.g. "7:00 PM"
  details?: string;
  location?: string;
  /** Emails to invite as guests (e.g. the inviter). */
  guests?: string[];
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
  // `add` pre-fills the guest list; Google invites them when the event is saved.
  if (e.guests?.length) params.set("add", e.guests.join(","));
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export interface StoredBooking {
  variant: string;
  setting: string;
  day: string;
  time: string;
  iso: string;
}

/** Persist a confirmed booking to localStorage (history + last booking). */
export function saveBooking(b: StoredBooking) {
  if (typeof localStorage === "undefined") return;
  try {
    const KEY = "datewithmark:bookings";
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown[];
    list.push({ ...b, savedAt: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(list));
    localStorage.setItem("datewithmark:lastBooking", JSON.stringify(b));
  } catch {
    /* storage unavailable (private mode / quota) — non-fatal */
  }
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
      await navigator.share({ title: "Date with Mark", text, url });
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
