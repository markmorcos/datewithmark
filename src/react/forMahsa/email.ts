// Opening a pre-filled email draft reliably across devices is fiddly:
//   - Desktop  → Gmail web compose in a new tab (works great).
//   - iOS      → the Gmail app via its `googlegmail://` scheme; if Gmail isn't
//                installed, fall back to Gmail web.
//   - Android  → `mailto:` (Gmail handles it and opens with the draft); if no
//                mail app takes it, fall back to Gmail web.
// The mobile fallback uses the classic deep-link trick: try the app URL, and if
// the page is still visible ~1.5s later (i.e. nothing handled it), redirect to
// the web compose. If the app DID open, the page goes hidden and we cancel.

export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
}

export function gmailWebUrl({ to, subject, body }: EmailDraft): string {
  const p = new URLSearchParams({ view: "cm", fs: "1", to, su: subject, body });
  return `https://mail.google.com/mail/?${p.toString()}`;
}

export function openEmailDraft(draft: EmailDraft): void {
  const { to, subject, body } = draft;
  const web = gmailWebUrl(draft);
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // Desktop: Gmail web compose in a new tab.
  if (!isIOS && !isAndroid) {
    window.open(web, "_blank", "noopener");
    return;
  }

  const enc = encodeURIComponent;
  const appUrl = isIOS
    ? `googlegmail://co?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`
    : `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;

  let settled = false;
  const cleanup = () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onHide);
    window.removeEventListener("blur", onHide);
  };
  const onHide = () => {
    // The app opened (page backgrounded) — cancel the web fallback.
    if (settled) return;
    settled = true;
    cleanup();
  };
  const onVisibility = () => {
    if (document.hidden) onHide();
  };
  const timer = setTimeout(() => {
    if (settled) return;
    settled = true;
    cleanup();
    window.location.href = web;
  }, 1500);

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onHide);
  window.addEventListener("blur", onHide);

  window.location.href = appUrl;
}
