"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoSection({
  onSoundChange,
}: {
  onSoundChange: (soundOn: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    if (next) {
      v.currentTime = 0;
      v.play();
    }
    setSoundOn(next);
    onSoundChange(next); // pausa a playlist enquanto o vídeo está com som
  }

  return (
    <section ref={sectionRef} className="relative px-4 py-24 sm:px-6">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/15 blur-[120px]"
      />

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-script text-center text-5xl text-rose-200 sm:text-6xl"
      >
        Nós dois dançando
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-3 text-center text-rose-100/60"
      >
        o nosso vídeo bonitinho 🎬💃🕺
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, type: "spring", bounce: 0.25 }}
        className="relative mx-auto mt-10 max-w-3xl"
      >
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600 opacity-60 blur-md" />
        <div className="relative overflow-hidden rounded-3xl border border-rose-400/30 bg-black shadow-2xl">
          <video
            ref={videoRef}
            src="/video/video-bonitinho.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="block w-full"
          />
          <button
            onClick={toggleSound}
            className="absolute bottom-4 right-4 cursor-pointer rounded-full bg-rose-600/90 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-rose-500"
          >
            {soundOn ? "🔇 Silenciar vídeo" : "🔊 Ouvir o vídeo"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
