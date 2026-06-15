/** @jsxImportSource react */
import { motion } from "framer-motion";
import { interview } from "../content";
import SectionLabel from "../ui/SectionLabel";

function SkillBar({ name, value, note, i }: { name: string; value: number; note?: string; i: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-[#1a1517]">{name}</span>
        <span className="text-xs text-[#9a8a8f]">
          {note ? `${note} · ` : ""}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.12 }}
            className="font-bold text-[#E8527E]"
          >
            {value}%
          </motion.span>
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f1e3e8]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#E8527E] to-[#f7a0bd]"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Interview() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20">
      <SectionLabel label={interview.label} heading={interview.heading} sub={interview.sub} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-10 w-full max-w-md rounded-[2rem] border border-[#f0d9e2] bg-white p-7 shadow-[0_20px_60px_-30px_rgba(232,82,126,0.45)]"
      >
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-[#0f5132]/5 p-3">
          <span className="flex h-3 w-3 items-center justify-center">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#3ec98b] opacity-60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3ec98b]" />
          </span>
          <span className="text-sm font-semibold text-[#0f5132]">{interview.status}</span>
        </div>

        <div className="space-y-4">
          {interview.skills.map((s, i) => (
            <SkillBar key={s.name} {...s} i={i} />
          ))}
        </div>

        <div className="mt-7 border-t border-dashed border-[#f0d9e2] pt-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#9a8a8f]">
            From the résumé
          </p>
          <ul className="space-y-2">
            {interview.quals.map((q, i) => (
              <motion.li
                key={q}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-2 text-sm text-[#5a4a4f]"
              >
                <span className="text-[#C9A227]">✓</span>
                {q}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
