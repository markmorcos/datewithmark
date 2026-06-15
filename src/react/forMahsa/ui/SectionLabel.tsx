/** @jsxImportSource react */
import { motion } from "framer-motion";

export default function SectionLabel({
  label,
  heading,
  sub,
}: {
  label: string;
  heading: string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center"
    >
      <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#E8527E]">
        {label}
      </span>
      <h2 className="font-display text-4xl font-black tracking-tight text-[#1a1517] sm:text-5xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-md text-sm text-[#6b5b60]">{sub}</p>
    </motion.div>
  );
}
