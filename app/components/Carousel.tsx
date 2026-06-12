"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FOTOS } from "./fotos";

const INTERVALO_MS = 2000;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % FOTOS.length),
      INTERVALO_MS,
    );
    return () => clearInterval(id);
  }, [pausado]);

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-script text-center text-5xl text-rose-200 sm:text-6xl"
      >
        Nossos momentos
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-rose-500/20 bg-wine-900/60 shadow-2xl"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/10]">
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* fundo desfocado preenche as bordas das fotos verticais */}
              <Image
                src={FOTOS[index]}
                alt=""
                fill
                aria-hidden
                className="scale-110 object-cover opacity-40 blur-2xl"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <Image
                src={FOTOS[index]}
                alt={`Foto nossa ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* setas */}
        <button
          aria-label="Foto anterior"
          onClick={() => setIndex((i) => (i - 1 + FOTOS.length) % FOTOS.length)}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 px-3.5 py-2 text-xl text-white backdrop-blur transition hover:bg-rose-600/80"
        >
          ‹
        </button>
        <button
          aria-label="Próxima foto"
          onClick={() => setIndex((i) => (i + 1) % FOTOS.length)}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 px-3.5 py-2 text-xl text-white backdrop-blur transition hover:bg-rose-600/80"
        >
          ›
        </button>

        {/* indicadores */}
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
          {FOTOS.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para a foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 cursor-pointer rounded-full transition-all ${
                i === index ? "w-6 bg-rose-400" : "w-2 bg-rose-100/40"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
