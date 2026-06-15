// ─────────────────────────────────────────────────────────────────────────────
// Experimentation platform client (browser).
//
// Talks to the self-hosted feature-flag + experiment platform, now served by the
// admin control plane at admin.morcos.tech. Auth is the *client* SDK key (NOT the
// admin token) — it ships in the browser bundle and is read-only/CORS-open.
//
//   GET  /api/experimentation/v1/config?key=<sdkKey>&device=<id>  -> { features, experiments }
//   POST /api/experimentation/v1/track  { key, device, experiment, variant, event } -> 204
//
// Every call here is best-effort: if the SDK key is missing or the platform is
// unreachable, callers fall back to the control variant so the app still works.
// ─────────────────────────────────────────────────────────────────────────────

const API = "https://admin.morcos.tech";

/** Injected at build time (Astro inlines `PUBLIC_*`). See env.d.ts / Dockerfile. */
const SDK_KEY = import.meta.env.PUBLIC_EXP_SDK_KEY;

/** The running experiment that decides which date-flow concept renders. */
export const EXPERIMENT = "date_flow_variant";

const DEVICE_KEY = "datewithmark:device_id";

/**
 * A stable, per-device id persisted across launches. Assignment on the platform
 * is a deterministic hash of `device:experiment`, so a stable id means the same
 * visitor always sees the same concept (and exposure ↔ conversion line up).
 */
export function deviceId(): string {
  if (typeof localStorage === "undefined") return "ssr";
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `dev_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    // Storage blocked (private mode / quota) — fall back to an ephemeral id.
    return `dev_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  }
}

export interface PlatformConfig {
  project?: string;
  environment?: string;
  features: Record<string, unknown>;
  experiments: Record<string, { variant: string }>;
}

/** Fetch this device's flags + experiment assignments. Returns null on failure. */
export async function loadConfig(device = deviceId()): Promise<PlatformConfig | null> {
  if (!SDK_KEY) return null;
  try {
    const r = await fetch(
      `${API}/api/experimentation/v1/config?key=${encodeURIComponent(SDK_KEY)}&device=${encodeURIComponent(device)}`,
    );
    if (!r.ok) return null;
    return (await r.json()) as PlatformConfig;
  } catch {
    return null;
  }
}

/**
 * Record an event for the date-flow experiment. `event` is "exposure" (the
 * denominator) or the conversion metric "date_confirmed". `keepalive` lets the
 * request finish even if the tap navigates away (e.g. opening Google Calendar).
 */
export function track(event: string, variant: string, device = deviceId()): void {
  if (!SDK_KEY) return;
  try {
    void fetch(`${API}/api/experimentation/v1/track`, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: SDK_KEY, device, experiment: EXPERIMENT, variant, event }),
    }).catch(() => {});
  } catch {
    /* network unavailable — non-fatal */
  }
}
