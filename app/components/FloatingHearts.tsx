"use client";

import { useEffect, useState } from "react";

type Heart = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  emoji: string;
};

const EMOJIS = ["❤️", "💕", "💖", "💘", "🌹", "💗"];

export default function FloatingHearts() {
  // gerado só no cliente para não divergir do HTML do servidor
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 22 }, () => ({
        left: Math.random() * 100,
        size: 0.5 + Math.random() * 1.4,
        duration: 10 + Math.random() * 16,
        delay: -Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.35,
        rotate: -30 + Math.random() * 60,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="floating-heart text-2xl"
          style={
            {
              left: `${h.left}%`,
              "--s": h.size,
              "--d": `${h.duration}s`,
              "--delay": `${h.delay}s`,
              "--o": h.opacity,
              "--r": `${h.rotate}deg`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
