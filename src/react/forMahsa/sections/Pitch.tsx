/** @jsxImportSource react */
import { motion } from "framer-motion";
import { pitch } from "../content";
import SectionLabel from "../ui/SectionLabel";

function GrowthChart() {
  // Hockey-stick "our future" curve.
  const d = "M6 86 C 30 84, 52 78, 70 60 S 104 14, 116 6";
  return (
    <div className="relative h-44 w-full rounded-2xl bg-[#1a1517] p-4">
      <span className="absolute left-4 top-3 text-[11px] uppercase tracking-[0.2em] text-white/50">
        {pitch.chartLabel}
      </span>
      <svg viewBox="0 0 122 92" className="h-full w-full">
        <defs>
          <linearGradient id="pitchFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8527E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E8527E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[24, 44, 64].map((y) => (
          <line key={y} x1="6" y1={y} x2="116" y2={y} stroke="#ffffff" strokeOpacity="0.07" />
        ))}
        <motion.path
          d={`${d} L 116 86 L 6 86 Z`}
          fill="url(#pitchFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="#E8527E"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.circle
          cx="116"
          cy="6"
          r="4"
          fill="#fff"
          stroke="#E8527E"
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
        />
      </svg>
    </div>
  );
}

export default function Pitch() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20">
      <SectionLabel label={pitch.label} heading={pitch.heading} sub={pitch.sub} />

      <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-3">
        {pitch.deck.map((slide, i) => (
          <motion.div
            key={slide.k}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 160 }}
            className="rounded-2xl border border-[#f0d9e2] bg-white p-4 shadow-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8527E]">{slide.k}</p>
            <p className="mt-1.5 font-display text-xl font-black leading-tight text-[#1a1517]">
              {slide.v}
            </p>
            <p className="mt-1 text-xs text-[#9a8a8f]">{slide.note}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 w-full max-w-md">
        <GrowthChart />
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: "spring", stiffness: 140 }}
        className="font-script mt-8 text-4xl text-[#E8527E]"
      >
        {pitch.close}
      </motion.p>
    </section>
  );
}
