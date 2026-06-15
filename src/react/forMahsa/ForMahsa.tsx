/** @jsxImportSource react */
import { motion, useScroll, useSpring } from "framer-motion";
import Intro from "./sections/Intro";
import Swipe from "./sections/Swipe";
import Interview from "./sections/Interview";
import Pitch from "./sections/Pitch";
import Finale from "./sections/Finale";

// Drifting hearts behind everything — deterministic positions (no random, so it
// renders identically every load and never causes hydration drift).
function FloatingHearts() {
  const hearts = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {hearts.map((_, i) => {
        const left = (i * 53) % 100;
        const size = 10 + ((i * 13) % 22);
        const dur = 14 + (i % 5) * 4;
        const delay = (i % 7) * 1.5;
        return (
          <motion.span
            key={i}
            className="absolute text-[#E8527E]"
            style={{ left: `${left}%`, fontSize: size, opacity: 0.12 }}
            initial={{ y: "110vh" }}
            animate={{ y: "-15vh" }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          >
            ♥
          </motion.span>
        );
      })}
    </div>
  );
}

export default function ForMahsa() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <main className="relative overflow-x-hidden bg-[#FBF7F0] text-[#1a1517]">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#E8527E] via-[#f7a0bd] to-[#C9A227]"
      />
      <FloatingHearts />

      {/* soft radial glow that anchors the warmth */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(247,201,217,0.5), transparent 60%), radial-gradient(900px 500px at 50% 110%, rgba(232,82,126,0.18), transparent 60%)",
        }}
      />

      <Intro />
      <Swipe />
      <Interview />
      <Pitch />
      <Finale />
    </main>
  );
}
