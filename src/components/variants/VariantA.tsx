import { useEffect } from "preact/hooks";
import { useBookingFlow } from "../../lib/useBookingFlow";
import { variantA as data } from "../../data/variants";
import { INVITER_EMAIL, googleCalUrl, resolveChoice, saveBooking, sharePlan } from "../../lib/share";

/**
 * Variant A — "Warm Romantic"
 * Peach gradient, fat serif italic headlines, coral accent, hearts.
 */
export default function VariantA() {
  const flow = useBookingFlow({ setting: "dinner", day: "fri13", time: "7:00 PM" });
  const { step, selection, next, back, select } = flow;
  const choice = resolveChoice(data.settings, data.days, data.times, selection);

  // Persist the booking once she lands on the confirmation step.
  useEffect(() => {
    if (step !== "confirm") return;
    saveBooking({
      variant: "A",
      setting: choice.setting.label,
      day: `${choice.day.dow} June ${choice.day.dom}`,
      time: choice.time,
      iso: choice.day.iso,
    });
  }, [step]);

  const Dots = ({ active }: { active: number }) => (
    <div class="flex gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          class={`h-1.5 rounded-full transition-all ${
            i === active ? "w-5 bg-[#f26b5e]" : "w-1.5 bg-[#f26b5e]/30"
          }`}
        />
      ))}
    </div>
  );

  const Back = () => (
    <button onClick={back} class="text-2xl text-[#8a6a60] leading-none" aria-label="Back">
      ‹
    </button>
  );

  return (
    <div class="font-sans flex min-h-screen w-full items-center justify-center bg-[#e7d0c4] sm:py-8">
      <div class="relative flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-[#fdeee7] via-[#fde2d6] to-[#fbd5c4] px-7 pb-10 pt-12 text-[#3a241e] sm:min-h-[780px] sm:rounded-[2.5rem] sm:shadow-2xl">
        <div key={step} class="step-enter flex flex-1 flex-col">
        {step === "invite" && (
          <div class="flex flex-1 flex-col items-center justify-center text-center">
            <p class="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#c2614f]">
              An Invitation
            </p>
            <div class="mb-8 text-5xl">❤️</div>
            <h1 class="font-fraunces text-4xl font-black italic leading-tight">
              Will you go out with me?
            </h1>
            <p class="mt-6 max-w-xs text-sm leading-relaxed text-[#7a5b52]">
              No grand plan. Just you, me, and an evening worth remembering.
            </p>
            <div class="mt-auto w-full pt-12">
              <button
                onClick={next}
                class="w-full rounded-full bg-[#f26b5e] py-4 text-base font-semibold text-white shadow-lg shadow-[#f26b5e]/30 transition active:scale-[0.98]"
              >
                I'd love to&nbsp;&nbsp;♥
              </button>
              <button onClick={next} class="mt-4 text-sm text-[#9a7a70]">
                maybe — tell me more first
              </button>
            </div>
          </div>
        )}

        {step === "setting" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-5 mt-5">
              <Dots active={0} />
            </div>
            <h2 class="font-fraunces text-3xl font-black">What sounds nice?</h2>
            <p class="mt-1 text-sm text-[#7a5b52]">Pick the kind of evening.</p>
            <div class="mt-6 grid grid-cols-2 gap-3">
              {data.settings.map((s) => {
                const on = selection.setting === s.id;
                return (
                  <button
                    onClick={() => select("setting", s.id)}
                    class={`rounded-2xl border p-4 text-left transition ${
                      on
                        ? "border-[#f26b5e] bg-[#fde0d8] shadow-sm"
                        : "border-transparent bg-white shadow-sm"
                    }`}
                  >
                    <span class="mb-3 block h-2.5 w-2.5 rounded-full" style={{ background: s.dot }} />
                    <span class="block font-semibold leading-snug">{s.label}</span>
                    <span class="mt-0.5 block text-xs text-[#9a7a70]">{s.blurb}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={next}
              class="mt-auto w-full rounded-full bg-[#f26b5e] py-4 text-base font-semibold text-white shadow-lg shadow-[#f26b5e]/30 active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {step === "day" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-5 mt-5">
              <Dots active={1} />
            </div>
            <h2 class="font-fraunces text-3xl font-black leading-tight">When works for you?</h2>
            <p class="mt-1 text-sm text-[#7a5b52]">Pick a day that suits you.</p>
            <div class="mt-6 grid grid-cols-4 gap-3">
              {data.days.map((d) => {
                const on = selection.day === d.id;
                return (
                  <button
                    onClick={() => select("day", d.id)}
                    class={`rounded-2xl py-4 text-center transition ${
                      on ? "bg-[#f26b5e] text-white shadow-lg shadow-[#f26b5e]/30" : "bg-white"
                    }`}
                  >
                    <span class={`block text-[10px] font-semibold ${on ? "text-white/80" : "text-[#9a7a70]"}`}>
                      {d.dow}
                    </span>
                    <span class="mt-1 block text-xl font-bold">{d.dom}</span>
                  </button>
                );
              })}
            </div>
            <div class="mt-6 rounded-2xl border-l-4 border-[#f26b5e] bg-[#fbe3da]/60 px-4 py-3">
              <p class="font-semibold">
                {choice.day.dow === "FRI" ? "Friday" : choice.day.dow}, June {choice.day.dom}
              </p>
              <p class="text-sm text-[#9a7a70]">evening — feels right</p>
            </div>
            <button
              onClick={next}
              class="mt-auto w-full rounded-full bg-[#f26b5e] py-4 text-base font-semibold text-white shadow-lg shadow-[#f26b5e]/30 active:scale-[0.98]"
            >
              Next
            </button>
          </div>
        )}

        {step === "time" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-5 mt-5">
              <Dots active={2} />
            </div>
            <h2 class="font-fraunces text-3xl font-black">And what time?</h2>
            <p class="mt-1 text-sm text-[#7a5b52]">
              {choice.day.dow === "FRI" ? "Friday" : choice.day.dow}, June {choice.day.dom}
            </p>
            <div class="mt-6 grid grid-cols-2 gap-3">
              {data.times.map((t) => {
                const on = selection.time === t;
                return (
                  <button
                    onClick={() => select("time", t)}
                    class={`rounded-2xl py-4 text-center font-medium transition ${
                      on ? "border border-[#f26b5e] bg-[#fde0d8] text-[#c2614f]" : "bg-white"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <button
              onClick={next}
              class="mt-auto w-full rounded-full bg-[#f26b5e] py-4 text-base font-semibold text-white shadow-lg shadow-[#f26b5e]/30 active:scale-[0.98]"
            >
              Review the plan
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div class="flex flex-1 flex-col items-center text-center">
            <div class="relative mt-6 mb-6">
              <span class="confetti absolute -left-10 -top-2 text-lg">🟥</span>
              <span class="confetti absolute -right-10 -top-1 text-lg" style={{ animationDelay: "0.1s" }}>🟩</span>
              <span class="confetti absolute -left-6 top-6 text-sm" style={{ animationDelay: "0.05s" }}>🟧</span>
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#f26b5e] text-3xl">❤️</div>
            </div>
            <h2 class="font-fraunces text-4xl font-black italic">It's a date.</h2>
            <p class="mt-2 text-[#7a5b52]">Can't wait to see you.</p>

            <div class="mt-8 w-full rounded-2xl bg-white p-2 shadow-sm">
              <Row label="What" value={choice.setting.label} />
              <Row label="Day" value={`${choice.day.dow === "FRI" ? "Fri" : choice.day.dow}, June ${choice.day.dom}`} />
              <Row label="Time" value={choice.time} />
              <Row label="Where" value="I'll surprise you" last />
            </div>

            <div class="mt-auto w-full pt-8">
              <a
                href={googleCalUrl({
                  title: "Our date 💕",
                  iso: choice.day.iso,
                  time: choice.time,
                  details: choice.setting.label,
                  guests: [INVITER_EMAIL],
                })}
                target="_blank"
                rel="noopener"
                class="block w-full rounded-full bg-[#f26b5e] py-4 text-center text-base font-semibold text-white shadow-lg shadow-[#f26b5e]/30 active:scale-[0.98]"
              >
                Add to calendar
              </a>
              <button
                onClick={() => sharePlan(`It's a date — ${choice.setting.label}, ${choice.day.dow} June ${choice.day.dom} at ${choice.time}.`)}
                class="mt-3 block w-full rounded-full border border-[#f26b5e] py-4 text-base font-semibold text-[#f26b5e] active:scale-[0.98]"
              >
                Share the plan
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
    <div class={`flex items-center justify-between px-4 py-3.5 ${last ? "" : "border-b border-[#f3e3dc]"}`}>
      <span class="text-sm text-[#9a7a70]">{label}</span>
      <span class="font-semibold">{value}</span>
    </div>
  );
}
