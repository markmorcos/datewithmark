import type { ComponentChildren } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useBookingFlow } from "../../lib/useBookingFlow";
import { upcomingDays, formatDay } from "../../lib/dates";
import {
  INVITER_EMAIL,
  appleCalDownload,
  googleCalUrl,
  saveBooking,
  sharePlan,
} from "../../lib/share";
import { STORY_CONTENT, STORY_THEME } from "../../data/story";
import { variantA, variantB, variantC, type VariantData } from "../../data/variants";
import type { Variant } from "../../lib/variant";
import type { VariantProps } from "../../lib/types";
import { useScrollReveal } from "./useScrollReveal";

const DATA: Record<Variant, VariantData> = { A: variantA, B: variantB, C: variantC };

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ComponentChildren;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useScrollReveal();
  return (
    <div
      ref={ref}
      class={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Top scroll-progress indicator. */
function Progress({ fill }: { fill: string }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div class="fixed inset-x-0 top-0 z-50 h-1">
      <div class={`h-full origin-left ${fill}`} style={{ transform: `scaleX(${pct})` }} />
    </div>
  );
}

/**
 * The home story. One shared structure (hero → chapters → booking finale),
 * skinned + retoned per A/B/C variant. Ends in a real, always-future calendar
 * booking; the calendar tap is the experiment's `date_confirmed` conversion.
 */
export default function Story({ variant, onConfirm }: { variant: Variant } & VariantProps) {
  const theme = STORY_THEME[variant];
  const content = STORY_CONTENT[variant];
  const data = DATA[variant];

  // Computed once per mount from the visitor's "today" — never a past date.
  const days = useMemo(() => upcomingDays(4), []);

  const { selection, select } = useBookingFlow({
    setting: data.settings[0].id,
    day: days[0].id,
    time: data.times[0],
  });

  const setting = data.settings.find((s) => s.id === selection.setting) ?? data.settings[0];
  const day = days.find((d) => d.id === selection.day) ?? days[0];
  const time = selection.time ?? data.times[0];

  const calEvent = {
    title: content.finale.calTitle,
    iso: day.iso,
    time,
    details: setting.label,
    location: content.finale.location,
    guests: [INVITER_EMAIL],
  };

  const commit = () => {
    onConfirm?.();
    saveBooking({
      variant,
      setting: setting.label,
      day: formatDay(day),
      time,
      iso: day.iso,
    });
  };

  const heading = `${theme.font} ${theme.heading}`;

  return (
    <main class={`${theme.font} relative min-h-screen w-full overflow-x-hidden ${theme.page}`}>
      <Progress fill={theme.bar} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section class="flex min-h-[100svh] flex-col items-center justify-center px-7 text-center">
        <Reveal>
          <p class={`mb-5 text-xs font-semibold uppercase tracking-[0.3em] ${theme.kicker}`}>
            {content.hero.kicker}
          </p>
          <h1 class={`${heading} text-5xl leading-[1.05] sm:text-6xl`}>{content.hero.title}</h1>
          <p class={`mx-auto mt-6 max-w-sm text-base leading-relaxed ${theme.muted}`}>
            {content.hero.subtitle}
          </p>
        </Reveal>
        <Reveal delay={250} className="mt-16">
          <span class={`text-xs uppercase tracking-[0.3em] ${theme.muted}`}>{content.hero.hint}</span>
          <div class={`mx-auto mt-3 h-8 w-px ${theme.bar} opacity-50`} />
        </Reveal>
      </section>

      {/* ── Chapters ─────────────────────────────────────────────────────── */}
      {content.chapters.map((ch, i) => (
        <section key={i} class="flex min-h-[100svh] items-center px-7 py-16">
          <div class="mx-auto grid w-full max-w-5xl items-center gap-10 sm:grid-cols-2">
            <Reveal className={i % 2 === 1 ? "sm:order-2" : ""}>
              {ch.photo && (
                <div class={`overflow-hidden rounded-[1.75rem] ${theme.card}`}>
                  <img
                    src={ch.photo}
                    alt=""
                    loading="lazy"
                    class="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>
              )}
            </Reveal>
            <Reveal delay={120} className={i % 2 === 1 ? "sm:order-1" : ""}>
              <p class={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] ${theme.kicker}`}>
                {ch.kicker}
              </p>
              <h2 class={`${heading} text-3xl leading-tight sm:text-4xl`}>{ch.title}</h2>
              <div class="mt-5 space-y-3">
                {ch.lines.map((line, j) => (
                  <p key={j} class={`text-base leading-relaxed ${theme.muted}`}>
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Finale · the ask + the booking ───────────────────────────────── */}
      <section class="flex min-h-[100svh] items-center justify-center px-7 py-20">
        <Reveal className="w-full max-w-md">
          <p class={`text-center text-xs font-semibold uppercase tracking-[0.3em] ${theme.kicker}`}>
            {content.finale.kicker}
          </p>
          <h2 class={`${heading} mt-4 text-center text-4xl leading-tight`}>{content.finale.title}</h2>
          <p class={`mx-auto mt-5 max-w-sm text-center text-base leading-relaxed ${theme.muted}`}>
            {content.finale.intro}
          </p>

          {/* Vibe */}
          <p class={`mt-10 text-sm font-semibold ${theme.accentText}`}>{content.finale.vibePrompt}</p>
          <div class="mt-3 grid grid-cols-2 gap-3">
            {data.settings.map((s) => {
              const on = selection.setting === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => select("setting", s.id)}
                  class={`rounded-2xl border p-4 text-left transition ${on ? theme.chipOn : theme.chipOff}`}
                >
                  {s.dot && (
                    <span class="mb-2 block h-2.5 w-2.5 rounded-full" style={{ background: s.dot }} />
                  )}
                  <span class="block text-sm font-semibold leading-snug">{s.label}</span>
                  {s.blurb && <span class={`mt-0.5 block text-xs ${theme.muted}`}>{s.blurb}</span>}
                </button>
              );
            })}
          </div>

          {/* Day */}
          <p class={`mt-8 text-sm font-semibold ${theme.accentText}`}>{content.finale.dayPrompt}</p>
          <div class="mt-3 grid grid-cols-4 gap-3">
            {days.map((d) => {
              const on = selection.day === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => select("day", d.id)}
                  class={`rounded-2xl border py-4 text-center transition ${on ? theme.chipOn : theme.chipOff}`}
                >
                  <span class="block text-[10px] font-semibold opacity-70">{d.dow}</span>
                  <span class="mt-1 block text-xl font-bold">{d.dom}</span>
                </button>
              );
            })}
          </div>

          {/* Time */}
          <p class={`mt-8 text-sm font-semibold ${theme.accentText}`}>{content.finale.timePrompt}</p>
          <div class="mt-3 grid grid-cols-3 gap-3">
            {data.times.map((t) => {
              const on = selection.time === t;
              return (
                <button
                  key={t}
                  onClick={() => select("time", t)}
                  class={`rounded-2xl border py-3 text-center text-sm font-medium transition ${on ? theme.chipOn : theme.chipOff}`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Summary + commit */}
          <p class={`mt-8 text-center text-base ${theme.text}`}>
            {setting.label} · {formatDay(day)} · {time}
          </p>
          <p class={`mt-1 text-center text-sm ${theme.muted}`}>{content.finale.confirmLine}</p>

          <div class="mt-6">
            <a
              href={googleCalUrl(calEvent)}
              target="_blank"
              rel="noopener"
              onClick={commit}
              class={`block w-full rounded-full py-4 text-center text-base font-semibold transition active:scale-[0.98] ${theme.btn}`}
            >
              {content.finale.googleCta}
            </a>
            <button
              onClick={() => {
                commit();
                appleCalDownload(calEvent);
              }}
              class={`mt-3 block w-full rounded-full py-4 text-center text-base font-semibold transition active:scale-[0.98] ${theme.btnOutline}`}
            >
              {content.finale.appleCta}
            </button>
            <button
              onClick={() =>
                sharePlan(`${setting.label}, ${formatDay(day)} at ${time}.`)
              }
              class={`mt-3 block w-full py-2 text-center text-sm font-medium ${theme.muted} active:scale-[0.98]`}
            >
              {content.finale.shareCta}
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
