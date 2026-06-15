/** @jsxImportSource react */
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { swipe } from "../content";
import SectionLabel from "../ui/SectionLabel";

function Card({
  card,
  onSwipe,
  front,
}: {
  card: (typeof swipe.cards)[number];
  onSwipe: (dir: number) => void;
  front: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0"
      style={front ? { x, rotate } : undefined}
      drag={front ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 120) onSwipe(info.offset.x > 0 ? 1 : -1);
      }}
      whileTap={front ? { cursor: "grabbing" } : undefined}
    >
      <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#f0d9e2] bg-white p-7 shadow-[0_20px_60px_-25px_rgba(232,82,126,0.5)]">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-[#fbe7ee] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8527E]">
            {card.tag}
          </span>
          <span className="text-4xl">{card.emoji}</span>
        </div>
        <div>
          <h3 className="font-display text-2xl font-black text-[#1a1517]">{card.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {card.lines.map((l) => (
              <li key={l} className="flex items-start gap-2 text-sm text-[#5a4a4f]">
                <span className="mt-0.5 text-[#E8527E]">♥</span>
                {l}
              </li>
            ))}
          </ul>
        </div>
        {front && (
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute right-7 top-20 -rotate-12 rounded-lg border-4 border-[#3ec98b] px-3 py-1 text-xl font-black uppercase tracking-wider text-[#3ec98b]"
          >
            Like
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Swipe() {
  const [index, setIndex] = useState(0);
  const advance = () => setIndex((i) => i + 1);
  const done = index >= swipe.cards.length;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20">
      <SectionLabel label={swipe.label} heading={swipe.heading} sub={swipe.sub} />

      <div className="relative mt-10 h-[420px] w-full max-w-sm">
        <AnimatePresence>
          {!done &&
            swipe.cards
              .map((card, i) => ({ card, i }))
              .filter(({ i }) => i >= index && i < index + 3)
              .reverse()
              .map(({ card, i }) => {
                const depth = i - index;
                return (
                  <motion.div
                    key={card.tag}
                    className="absolute inset-0"
                    initial={{ scale: 0.92, y: 24 }}
                    animate={{ scale: 1 - depth * 0.04, y: depth * 14, opacity: 1 }}
                    exit={{ x: 320, opacity: 0, rotate: 18, transition: { duration: 0.35 } }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    style={{ zIndex: swipe.cards.length - depth }}
                  >
                    <Card card={card} front={depth === 0} onSwipe={advance} />
                  </motion.div>
                );
              })}
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#E8527E] to-[#c43a68] text-center text-white shadow-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="text-6xl"
            >
              💞
            </motion.div>
            <h3 className="font-script mt-2 text-5xl">{swipe.matchTitle}</h3>
            <p className="mt-2 px-8 text-sm text-white/85">{swipe.matchSub}</p>
          </motion.div>
        )}
      </div>

      {!done && (
        <div className="mt-8 flex items-center gap-5">
          <button
            onClick={advance}
            aria-label="like"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-lg shadow-[#E8527E]/20 transition active:scale-90"
          >
            💗
          </button>
        </div>
      )}
      <p className="mt-5 text-xs text-[#9a8a8f]">{done ? "" : "swipe right, or tap the heart"}</p>
    </section>
  );
}
