"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const POLAROIDS = [
  { src: "/fotos/foto-09.jpg", className: "left-[4%] top-[16%] -rotate-6", speed: -120 },
  { src: "/fotos/foto-13.jpg", className: "right-[4%] top-[20%] rotate-6", speed: -200 },
  { src: "/fotos/foto-05.jpg", className: "left-[12%] bottom-[6%] rotate-3", speed: -280 },
  { src: "/fotos/foto-11.jpg", className: "right-[10%] bottom-[10%] -rotate-3", speed: -160 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* brilho de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.18),transparent_65%)]" />

      {/* polaroids com parallax — escondidas em telas pequenas para não atrapalhar o título */}
      {POLAROIDS.map((p, i) => (
        <ParallaxPolaroid key={i} {...p} progress={scrollYProgress} index={i} />
      ))}

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-xs uppercase tracking-[0.5em] text-rose-300/80 sm:text-sm"
        >
          12 de junho • Dia dos Namorados
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.1 }}
          className="font-script mt-6 text-5xl leading-tight text-rose-100 sm:text-7xl"
        >
          Feliz Dia dos Namorados,
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1.2, type: "spring" }}
          className="font-script animated-gradient-text mt-2 text-8xl leading-tight sm:text-[11rem]"
        >
          Mariana
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mx-auto mt-6 max-w-md text-base text-rose-100/70 sm:text-lg"
        >
          minha namorada, minha vida, meu mundo —{" "}
          <span className="text-rose-300">que seja o segundo de infinitos</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 3.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.8, delay: 3.5 },
        }}
        className="absolute bottom-8 z-10 text-2xl text-rose-300/70"
      >
        ↓
      </motion.div>
    </section>
  );
}

function ParallaxPolaroid({
  src,
  className,
  speed,
  progress,
  index,
}: {
  src: string;
  className: string;
  speed: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const y = useTransform(progress, [0, 1], [0, speed]);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.25, duration: 0.9, type: "spring" }}
      className={`absolute hidden w-40 rotate-0 rounded-md bg-rose-50 p-2 pb-8 shadow-2xl shadow-rose-950/60 lg:block xl:w-48 ${className}`}
    >
      <Image
        src={src}
        alt="Nós dois"
        width={400}
        height={500}
        className="aspect-[4/5] rounded-sm object-cover"
        priority={index < 2}
      />
      <span className="absolute bottom-1.5 left-0 right-0 text-center text-sm text-rose-900/70">
        ❤️
      </span>
    </motion.div>
  );
}
