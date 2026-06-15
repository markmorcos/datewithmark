/** @jsxImportSource react */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { intro } from "../content";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center px-6">
      <motion.div style={{ opacity, scale, y }} className="flex flex-col items-center text-center">
        {/* Crown — strokes itself in, then fills */}
        <motion.svg
          viewBox="0 0 100 60"
          className="mb-7 h-14 w-24"
          initial="hidden"
          animate="show"
        >
          <motion.path
            d="M8 48 L8 22 L26 36 L50 14 L74 36 L92 22 L92 48 Z"
            fill="none"
            stroke="#E8527E"
            strokeWidth={3}
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M8 48 L8 22 L26 36 L50 14 L74 36 L92 22 L92 48 Z"
            fill="#E8527E"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 0.16 } }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
          {[8, 50, 92].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={i === 1 ? 14 : 22}
              r={4}
              fill="#C9A227"
              variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
              transition={{ delay: 1.3 + i * 0.12, type: "spring", stiffness: 300 }}
              style={{ transformOrigin: `${cx}px ${i === 1 ? 14 : 22}px` }}
            />
          ))}
        </motion.svg>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-4 rounded-full border border-[#1a1517] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#1a1517]"
        >
          {intro.kicker}
        </motion.p>

        <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-[#1a1517] sm:text-7xl">
          {intro.title.split(" ").map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 30, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.7 + i * 0.15, type: "spring", stiffness: 120 }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, type: "spring", stiffness: 140 }}
          className="font-script -mt-1 text-6xl text-[#E8527E] sm:text-7xl"
        >
          {intro.script}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-6 max-w-sm text-sm leading-relaxed text-[#6b5b60]"
        >
          {intro.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-14 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#9a8a8f]"
        >
          {intro.hint}
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-lg text-[#E8527E]"
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
