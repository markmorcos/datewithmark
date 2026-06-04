import { useEffect, useState } from "preact/hooks";
import { useBookingFlow } from "../../lib/useBookingFlow";
import { variantB as data } from "../../data/variants";
import { INVITER_EMAIL, googleCalUrl, resolveChoice, saveBooking, sharePlan } from "../../lib/share";

/**
 * Variant B — "Neon Playful"
 * Dark navy bg, lime + hot-pink accents, bold lowercase grotesk, glow.
 */
export default function VariantB() {
  const flow = useBookingFlow({ setting: "dinner", day: "fri13", time: "7:30 PM" });
  const { step, selection, next, back, select } = flow;
  const choice = resolveChoice(data.settings, data.days, data.times, selection);

  // The "hmm, no" button dodges so it can't be pressed.
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const dodge = () =>
    setNoPos({
      x: Math.round((Math.random() - 0.5) * 220),
      y: Math.round((Math.random() - 0.5) * 90),
    });

  // Persist the booking once she lands on the confirmation step.
  useEffect(() => {
    if (step !== "confirm") return;
    saveBooking({
      variant: "B",
      setting: choice.setting.label,
      day: `${choice.day.dow} June ${choice.day.dom}`,
      time: choice.time,
      iso: choice.day.iso,
    });
  }, [step]);

  const Segments = ({ active }: { active: number }) => (
    <div class="flex gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          class={`h-1.5 rounded-full transition-all ${
            i === active ? "w-6 bg-[#c6f432]" : "w-3 bg-white/15"
          }`}
        />
      ))}
    </div>
  );

  const Back = () => (
    <button onClick={back} class="text-2xl leading-none text-white/70" aria-label="Back">
      ‹
    </button>
  );

  return (
    <div class="font-grotesk flex min-h-screen w-full items-center justify-center bg-[#070512] sm:py-8">
      <div class="relative flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-[#241a44] via-[#1a1230] to-[#0f0a1e] px-7 pb-10 pt-12 text-white sm:min-h-[780px] sm:rounded-[2.5rem] sm:shadow-2xl">
        <div key={step} class="step-enter flex flex-1 flex-col">
        {step === "invite" && (
          <div class="flex flex-1 flex-col">
            <div class="mt-auto">
              <p class="mb-3 text-sm font-bold lowercase tracking-wide text-[#c6f432]">ok deep breath</p>
              <h1 class="text-6xl font-extrabold lowercase leading-[0.95]">
                so...<br />
                <span class="text-[#ff4fa3]">dinner?</span>
              </h1>
              <p class="mt-5 text-sm lowercase text-white/60">
                (this is me asking you out.<br />officially. it's happening.)
              </p>
            </div>
            <div class="mt-auto pt-16">
              <button
                onClick={next}
                class="glow-lime w-full rounded-full bg-[#c6f432] py-4 text-base font-extrabold text-black active:scale-[0.98]"
              >
                YES obviously
              </button>
              <button
                onPointerEnter={dodge}
                onPointerDown={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onClick={(e) => e.preventDefault()}
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  transition: "transform 0.18s ease",
                }}
                class="relative mt-4 block w-full text-center text-sm lowercase text-white/40"
              >
                hmm, no
              </button>
            </div>
          </div>
        )}

        {step === "setting" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-4 mt-5">
              <Segments active={0} />
            </div>
            <h2 class="text-3xl font-extrabold lowercase">
              pick our <span class="text-[#c6f432]">vibe</span>
            </h2>
            <p class="mt-1 text-sm lowercase text-white/50">what are we feeling</p>
            <div class="mt-6 flex flex-col gap-3">
              {data.settings.map((s) => {
                const on = selection.setting === s.id;
                return (
                  <button
                    onClick={() => select("setting", s.id)}
                    class={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      on ? "border-[#c6f432] bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <span class="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.dot }} />
                    <span>
                      <span class="block font-bold lowercase">{s.label}</span>
                      <span class="block text-xs lowercase text-white/45">{s.blurb}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={next}
              class="glow-pink mt-auto w-full rounded-full bg-[#ff4fa3] py-4 text-base font-extrabold lowercase text-black active:scale-[0.98]"
            >
              next →
            </button>
          </div>
        )}

        {step === "day" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-4 mt-5">
              <Segments active={1} />
            </div>
            <h2 class="text-3xl font-extrabold lowercase">what day tho</h2>
            <p class="mt-1 text-sm lowercase text-white/50">clear your evening</p>
            <div class="mt-6 grid grid-cols-4 gap-3">
              {data.days.map((d) => {
                const on = selection.day === d.id;
                return (
                  <button
                    onClick={() => select("day", d.id)}
                    class={`rounded-2xl py-4 text-center transition ${
                      on ? "bg-[#ff4fa3] text-black" : "border border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <span class={`block text-[10px] font-bold ${on ? "text-black/70" : "text-white/45"}`}>
                      {d.dow}
                    </span>
                    <span class="mt-1 block text-xl font-extrabold">{d.dom}</span>
                  </button>
                );
              })}
            </div>
            <p class="mt-5 font-bold lowercase text-[#c6f432]">
              {choice.day.dow === "FRI" ? "friday" : choice.day.dow.toLowerCase()} it is.
            </p>
            <button
              onClick={next}
              class="glow-pink mt-auto w-full rounded-full bg-[#ff4fa3] py-4 text-base font-extrabold lowercase text-black active:scale-[0.98]"
            >
              next →
            </button>
          </div>
        )}

        {step === "time" && (
          <div class="flex flex-1 flex-col">
            <Back />
            <div class="mb-4 mt-5">
              <Segments active={2} />
            </div>
            <h2 class="text-3xl font-extrabold lowercase">what time</h2>
            <p class="mt-1 text-sm lowercase text-white/50">don't make me wait</p>
            <div class="mt-6 grid grid-cols-2 gap-3">
              {data.times.map((t) => {
                const on = selection.time === t;
                return (
                  <button
                    onClick={() => select("time", t)}
                    class={`rounded-2xl py-4 text-center font-bold transition ${
                      on ? "bg-[#c6f432] text-black" : "border border-white/10 bg-white/[0.03] text-white"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <button
              onClick={next}
              class="glow-lime mt-auto w-full rounded-full bg-[#c6f432] py-4 text-base font-extrabold lowercase text-black active:scale-[0.98]"
            >
              lock it in
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div class="flex flex-1 flex-col items-center text-center">
            <div class="relative mt-6 mb-6">
              <span class="confetti absolute -left-12 -top-2">🟪</span>
              <span class="confetti absolute -right-12 -top-1" style={{ animationDelay: "0.1s" }}>🟧</span>
              <span class="confetti absolute left-0 top-8" style={{ animationDelay: "0.05s" }}>🟩</span>
              <div class="glow-lime flex h-20 w-20 items-center justify-center rounded-full bg-[#c6f432] text-3xl font-black text-black">
                ✓
              </div>
            </div>
            <h2 class="text-5xl font-extrabold lowercase leading-[0.95]">
              locked<br />
              <span class="text-[#ff4fa3]">in.</span>
            </h2>
            <p class="mt-4 text-sm lowercase text-white/55">don't you dare bail on me</p>

            <div class="mt-7 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-2">
              <Row label="doing" value={choice.setting.label} />
              <Row label="day" value={`${choice.day.dow === "FRI" ? "Fri" : choice.day.dow}, June ${choice.day.dom}`} />
              <Row label="time" value={choice.time} last />
            </div>

            <div class="mt-auto w-full pt-7">
              <a
                href={googleCalUrl({
                  title: "locked in 🔒",
                  iso: choice.day.iso,
                  time: choice.time,
                  details: choice.setting.label,
                  guests: [INVITER_EMAIL],
                })}
                target="_blank"
                rel="noopener"
                class="glow-pink block w-full rounded-full bg-[#ff4fa3] py-4 text-center text-base font-extrabold lowercase text-black active:scale-[0.98]"
              >
                add to calendar
              </a>
              <button
                onClick={() => sharePlan(`locked in — ${choice.setting.label}, ${choice.day.dow} June ${choice.day.dom} @ ${choice.time}`)}
                class="mt-3 block w-full rounded-full border border-white/20 py-4 text-base font-bold lowercase text-white active:scale-[0.98]"
              >
                share
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
    <div class={`flex items-center justify-between px-4 py-3.5 ${last ? "" : "border-b border-white/10"}`}>
      <span class="text-sm lowercase text-white/45">{label}</span>
      <span class="font-bold">{value}</span>
    </div>
  );
}
