"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FOTOS } from "./fotos";

export default function Galeria() {
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-script text-center text-5xl text-rose-200 sm:text-6xl"
      >
        Nossa galeria de amor
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-3 text-center text-rose-100/60"
      >
        clica nas fotos, amor 📸
      </motion.p>

      <div className="mx-auto mt-12 max-w-5xl columns-2 gap-3 sm:gap-4 md:columns-3">
        {FOTOS.map((src, i) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
            whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
            onClick={() => setAberta(src)}
            className="group relative mb-3 block w-full cursor-pointer overflow-hidden rounded-xl border border-rose-500/15 sm:mb-4"
          >
            <Image
              src={src}
              alt={`Foto nossa ${i + 1}`}
              width={600}
              height={750}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-rose-950/70 to-transparent pb-3 text-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ❤️
            </span>
          </motion.button>
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {aberta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAberta(null)}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.25 }}
              className="relative h-full w-full"
            >
              <Image
                src={aberta}
                alt="Foto nossa ampliada"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <button
              aria-label="Fechar"
              className="absolute right-5 top-5 cursor-pointer rounded-full bg-rose-600/80 px-4 py-2 text-white transition hover:bg-rose-500"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
