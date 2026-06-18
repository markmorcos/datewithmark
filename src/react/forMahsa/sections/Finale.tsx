/** @jsxImportSource react */
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { finale } from "../content";
import CssRing from "../CssRing";
import { gmailWebUrl, openEmailDraft } from "../email";

function HeartBurst() {
  const hearts = Array.from({ length: 26 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 6) * 0.12;
        const size = 14 + ((i * 7) % 26);
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 text-[#E8527E]"
            style={{ left: `${left}%`, fontSize: size }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -window.innerHeight - 80, opacity: [0, 1, 1, 0], rotate: (i % 2 ? 1 : -1) * 60 }}
            transition={{ duration: 2.6 + (i % 4) * 0.4, delay, ease: "easeOut" }}
          >
            ♥
          </motion.span>
        );
      })}
    </div>
  );
}

export default function Finale() {
  const [said, setSaid] = useState(false);

  // Right-click / no-JS target; the click handler does the smart per-device
  // routing (Gmail app on mobile, Gmail web on desktop / as fallback).
  const gmailHref = gmailWebUrl(finale.yes.email);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20">
      <div className="relative h-[320px] w-full max-w-md">
        <CssRing />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 text-center text-[11px] uppercase tracking-[0.3em] text-[#9a8a8f]"
        >
          {finale.ringHint}
        </motion.p>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-script mt-6 text-6xl text-[#E8527E]"
      >
        {finale.title}
      </motion.h2>

      <div className="mt-6 max-w-md space-y-4 text-center">
        {finale.message.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            className="text-[15px] leading-relaxed text-[#3a2c30]"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-7 text-center"
      >
        <p className="text-sm text-[#6b5b60]">{finale.signoff}</p>
        <p className="font-script text-4xl text-[#1a1517]">{finale.signature}</p>
      </motion.div>

      <motion.button
        onClick={() => setSaid(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mt-10 rounded-full bg-[#E8527E] px-12 py-4 text-base font-bold text-white shadow-xl shadow-[#E8527E]/30"
      >
        {finale.cta} ♥
      </motion.button>

      <AnimatePresence>
        {said && (
          <>
            <HeartBurst />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-[#1a1015]/70 px-6 backdrop-blur-sm"
              onClick={() => setSaid(false)}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                className="rounded-[2rem] bg-white px-10 py-12 text-center shadow-2xl"
              >
                <div className="text-6xl">💍</div>
                <h3 className="font-script mt-3 text-6xl text-[#E8527E]">{finale.yes.title}</h3>
                <p className="mt-2 text-[#5a4a4f]">{finale.yes.sub}</p>
                <a
                  href={gmailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openEmailDraft(finale.yes.email);
                  }}
                  className="mt-7 inline-block rounded-full bg-[#E8527E] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8527E]/30 transition active:scale-95"
                >
                  💌 {finale.yes.emailCta}
                </a>
                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[#9a8a8f]">tap outside to close</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
