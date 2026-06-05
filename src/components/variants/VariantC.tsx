import { useEffect } from "preact/hooks";
import { useBookingFlow } from "../../lib/useBookingFlow";
import { variantC as data } from "../../data/variants";
import { INVITER_EMAIL, appleCalDownload, googleCalUrl, resolveChoice, saveBooking, sharePlan } from "../../lib/share";
import type { VariantProps } from "../../lib/types";

/**
 * Variant C — "Editorial Minimal"
 * Cream bg, elegant high-contrast serif, gold + black, list-style options.
 */
export default function VariantC({ onConfirm }: VariantProps = {}) {
  const flow = useBookingFlow({ setting: "dinner", day: "fri13", time: "7:30 PM" });
  const { step, selection, next, back, select } = flow;
  const choice = resolveChoice(data.settings, data.days, data.times, selection);

  const gold = "#a8893f";

  const calEvent = {
    title: "An evening together",
    iso: choice.day.iso,
    time: choice.time,
    details: choice.setting.label,
    guests: [INVITER_EMAIL],
  };

  // Persist the booking once she lands on the confirmation step.
  useEffect(() => {
    if (step !== "confirm") return;
    saveBooking({
      variant: "C",
      setting: choice.setting.label,
      day: `${choice.day.dow} June ${choice.day.dom}`,
      time: choice.time,
      iso: choice.day.iso,
    });
  }, [step]);

  const Segments = ({ active }: { active: number }) => (
    <div class="flex gap-2">
      {[0, 1, 2].map((i) => (
        <span
          class={`h-1 rounded-full transition-all ${
            i === active ? "w-6 bg-[#7a6433]" : "w-2.5 bg-[#7a6433]/25"
          }`}
        />
      ))}
    </div>
  );

  const Back = () => (
    <button onClick={back} class="text-2xl leading-none text-[#1f1b16]/70" aria-label="Back">
      ‹
    </button>
  );

  return (
    <div class="font-sans flex min-h-screen w-full items-center justify-center bg-[#e0d7c6] sm:py-8">
      <div class="relative flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-[#efe9dd] px-7 pb-10 pt-12 text-[#1f1b16] sm:min-h-[780px] sm:rounded-[2.5rem] sm:shadow-2xl">
        <div key={step} class="step-enter flex flex-1 flex-col">
        {step === "invite" && (
          <div class="flex flex-1 flex-col">
            <div class="mt-auto">
              <p class="text-xs font-medium uppercase tracking-[0.3em] text-[#8a7a52]">An Invitation</p>
              <div class="my-4 h-px w-10 bg-[#8a7a52]/50" />
              <h1 class="font-playfair text-[2.7rem] leading-[1.1]">
                An evening,<br />if you're <span class="italic">free.</span>
              </h1>
              <p class="mt-6 max-w-xs text-sm leading-relaxed text-[#6b6253]">
                Nothing elaborate. Good company, somewhere quiet, no rush to be anywhere.
              </p>
            </div>
            <div class="mt-auto pt-16">
              <button
                onClick={next}
                class="w-full rounded-md bg-[#272019] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#efe9dd] active:scale-[0.98]"
              >
                I'd like that
              </button>
              <button onClick={next} class="mt-4 block w-full text-center text-sm text-[#6b6253]">
                Tell me more
              </button>
            </div>
          </div>
        )}

        {step === "setting" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-5 mt-5">
              <Segments active={0} />
            </div>
            <h2 class="font-playfair text-4xl leading-tight">Choose the setting.</h2>
            <div class="mt-8 flex flex-col">
              {data.settings.map((s) => {
                const on = selection.setting === s.id;
                return (
                  <button
                    onClick={() => select("setting", s.id)}
                    class="flex items-center justify-between border-b border-[#1f1b16]/12 py-4 text-left"
                  >
                    <span class={`font-playfair text-xl ${on ? "" : ""}`} style={{ color: on ? gold : "#1f1b16" }}>
                      {s.label}
                    </span>
                    <span
                      class="text-[11px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: on ? gold : "#9a917e" }}
                    >
                      {on ? "Selected" : "Select"}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={next}
              class="mt-auto w-full rounded-md bg-[#272019] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#efe9dd] active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {step === "day" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-5 mt-5">
              <Segments active={1} />
            </div>
            <h2 class="font-playfair text-4xl">A day.</h2>
            <div class="mt-8 grid grid-cols-4 gap-3">
              {data.days.map((d) => {
                const on = selection.day === d.id;
                return (
                  <button
                    onClick={() => select("day", d.id)}
                    class={`rounded-md border bg-[#f6f2e9] py-4 text-center transition ${
                      on ? "border-[#a8893f]" : "border-[#1f1b16]/10"
                    }`}
                  >
                    <span class="block text-[10px] uppercase tracking-wide text-[#9a917e]">{d.dow}</span>
                    <span class="font-playfair mt-1 block text-xl">{d.dom}</span>
                  </button>
                );
              })}
            </div>
            <p class="font-playfair mt-6 text-lg italic" style={{ color: gold }}>
              {choice.day.dow === "FRI" ? "Friday" : choice.day.dow}, the {choice.day.dom}th of June
            </p>
            <button
              onClick={next}
              class="mt-auto w-full rounded-md bg-[#272019] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#efe9dd] active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {step === "time" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-5 mt-5">
              <Segments active={2} />
            </div>
            <h2 class="font-playfair text-4xl">A time.</h2>
            <p class="mt-2 text-sm text-[#6b6253]">
              {choice.day.dow === "FRI" ? "Friday" : choice.day.dow}, the {choice.day.dom}th
            </p>
            <div class="mt-7 grid grid-cols-2 gap-3">
              {data.times.map((t) => {
                const on = selection.time === t;
                return (
                  <button
                    onClick={() => select("time", t)}
                    class={`rounded-md border bg-[#f6f2e9] py-4 text-center transition ${
                      on ? "border-[#a8893f] text-[#a8893f]" : "border-[#1f1b16]/10 text-[#1f1b16]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <button
              onClick={next}
              class="mt-auto w-full rounded-md bg-[#272019] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#efe9dd] active:scale-[0.98]"
            >
              Confirm
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div class="flex flex-1 flex-col items-center text-center">
            <div class="mt-8 mb-2 flex h-16 w-16 items-center justify-center rounded-full border" style={{ borderColor: gold, color: gold }}>
              ✓
            </div>
            <h2 class="font-playfair mt-4 text-4xl">Confirmed.</h2>
            <p class="font-playfair mt-2 text-lg italic text-[#6b6253]">I'll see you then.</p>

            <div class="mt-8 w-full rounded-md border border-[#1f1b16]/12 p-2">
              <Row label="Setting" value={choice.setting.label} />
              <Row label="Day" value={`${choice.day.dow === "FRI" ? "Fri" : choice.day.dow}, June ${choice.day.dom}`} />
              <Row label="Time" value={choice.time} last />
            </div>

            <div class="mt-auto w-full pt-8">
              <a
                href={googleCalUrl(calEvent)}
                target="_blank"
                rel="noopener"
                onClick={() => onConfirm?.()}
                class="block w-full rounded-md bg-[#272019] py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#efe9dd] active:scale-[0.98]"
              >
                Google Calendar
              </a>
              <button
                onClick={() => {
                  onConfirm?.();
                  appleCalDownload(calEvent);
                }}
                class="mt-3 block w-full rounded-md border border-[#1f1b16]/25 py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#1f1b16] active:scale-[0.98]"
              >
                Apple Calendar
              </button>
              <button
                onClick={() => sharePlan(`Confirmed — ${choice.setting.label}, ${choice.day.dow} June ${choice.day.dom} at ${choice.time}.`)}
                class="mt-3 block w-full py-2 text-center text-sm font-medium text-[#6b6253] active:scale-[0.98]"
              >
                Share
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div class={`flex items-center justify-between px-4 py-3.5 ${last ? "" : "border-b border-[#1f1b16]/10"}`}>
      <span class="text-sm text-[#6b6253]">{label}</span>
      <span class="font-playfair text-lg">{value}</span>
    </div>
  );
}
