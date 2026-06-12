"use client";

import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

function explodirCoracoes() {
  const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });
  const defaults = {
    shapes: [heart],
    scalar: 2,
    spread: 120,
    ticks: 220,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 38,
  };
  confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.6 } });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 25, origin: { x: 0.2, y: 0.7 } });
    confetti({ ...defaults, particleCount: 25, origin: { x: 0.8, y: 0.7 } });
  }, 350);
}

export default function IntroOverlay({
  started,
  onStart,
}: {
  started: boolean;
  onStart: () => void;
}) {
  return (
    <AnimatePresence>
      {!started && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-wine-950 via-wine-900 to-rose-950 px-6 text-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl sm:text-8xl"
          >
            💌
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm uppercase tracking-[0.4em] text-rose-300/70"
          >
            Uma surpresa para
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="font-script animated-gradient-text text-7xl leading-tight sm:text-9xl"
          >
            Mariana
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              explodirCoracoes();
              onStart();
            }}
            className="cursor-pointer rounded-full bg-rose-600 px-10 py-4 text-lg font-semibold text-white shadow-[0_0_40px_rgba(225,29,72,0.5)] transition-colors hover:bg-rose-500"
          >
            Abrir com amor <span className="heartbeat">❤️</span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-xs text-rose-200/40"
          >
            (aumenta o som, amor 🔊)
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
