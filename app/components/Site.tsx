"use client";

import { useState } from "react";
import IntroOverlay from "./IntroOverlay";
import FloatingHearts from "./FloatingHearts";
import Hero from "./Hero";
import Contador from "./Contador";
import VideoSection from "./VideoSection";
import Carta from "./Carta";
import Carousel from "./Carousel";
import Galeria from "./Galeria";
import MusicPlayer from "./MusicPlayer";

export default function Site() {
  const [started, setStarted] = useState(false);
  // o vídeo com som ativo pausa a playlist para não tocarem juntos
  const [musicSuspended, setMusicSuspended] = useState(false);

  return (
    <div className="relative w-full">
      <IntroOverlay started={started} onStart={() => setStarted(true)} />
      <FloatingHearts />

      <main className="relative z-10">
        <Hero />
        <Contador />
        <VideoSection onSoundChange={setMusicSuspended} />
        <Carta />
        <Carousel />
        <Galeria />

        <footer className="relative z-10 pb-36 pt-10 text-center">
          <p className="font-script text-3xl text-rose-300 sm:text-4xl">
            Eu te amo para sempre
          </p>
          <p className="mt-3 text-sm text-rose-200/50">
            Feito com <span className="heartbeat">❤️</span> pelo Júnior — o amor
            da sua vida
          </p>
        </footer>
      </main>

      <MusicPlayer started={started} suspended={musicSuspended} />
    </div>
  );
}
