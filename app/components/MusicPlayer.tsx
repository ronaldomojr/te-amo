"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYLIST = [
  {
    titulo: "Um Dia Te Levo Comigo",
    artista: "Jorge & Mateus",
    src: "/musicas/01-jorge-e-mateus-um-dia-te-levo-comigo.mp3",
  },
  {
    titulo: "Garotas Não Merecem Chorar",
    artista: "Luan Santana",
    src: "/musicas/02-luan-santana-garotas-nao-merecem-chorar.mp3",
  },
  {
    titulo: "Boa Vida",
    artista: "Cazuza",
    src: "/musicas/03-cazuza-boa-vida.mp3",
  },
  {
    titulo: "Como Tudo Deve Ser",
    artista: "Charlie Brown Jr.",
    src: "/musicas/04-charlie-brown-jr-como-tudo-deve-ser.mp3",
  },
];

export default function MusicPlayer({
  started,
  suspended,
}: {
  started: boolean;
  suspended: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [tocando, setTocando] = useState(true);

  const deveTocar = started && tocando && !suspended;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (deveTocar) {
      audio.play().catch(() => {
        // se o navegador bloquear, o próximo clique em play resolve
        setTocando(false);
      });
    } else {
      audio.pause();
    }
  }, [deveTocar, index]);

  function proxima() {
    setIndex((i) => (i + 1) % PLAYLIST.length);
  }

  function anterior() {
    setIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
  }

  const faixa = PLAYLIST[index];

  return (
    <>
      <audio ref={audioRef} src={faixa.src} onEnded={proxima} />

      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-rose-500/30 bg-wine-900/90 px-4 py-3 shadow-2xl shadow-rose-950/60 backdrop-blur-md"
          >
            <span
              className={`text-2xl ${deveTocar ? "spin-slow" : ""}`}
              aria-hidden
            >
              💿
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-rose-100">
                {faixa.titulo}
              </p>
              <p className="truncate text-xs text-rose-300/70">
                {faixa.artista} • {index + 1}/{PLAYLIST.length}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={anterior}
                aria-label="Música anterior"
                className="cursor-pointer rounded-full p-2 text-rose-200 transition hover:bg-rose-500/20"
              >
                ⏮
              </button>
              <button
                onClick={() => setTocando((p) => !p)}
                aria-label={tocando ? "Pausar" : "Tocar"}
                className="cursor-pointer rounded-full bg-rose-600 p-2.5 text-white shadow transition hover:bg-rose-500"
              >
                {deveTocar ? "⏸" : "▶"}
              </button>
              <button
                onClick={proxima}
                aria-label="Próxima música"
                className="cursor-pointer rounded-full p-2 text-rose-200 transition hover:bg-rose-500/20"
              >
                ⏭
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
