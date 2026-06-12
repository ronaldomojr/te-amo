"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// o primeiro dia: 11 de janeiro de 2025
const INICIO = new Date(2025, 0, 11, 0, 0, 0);

function calcular() {
  const agora = new Date();
  const diffMs = agora.getTime() - INICIO.getTime();
  const dias = Math.floor(diffMs / 86_400_000);
  const horas = Math.floor((diffMs % 86_400_000) / 3_600_000);
  const minutos = Math.floor((diffMs % 3_600_000) / 60_000);
  const segundos = Math.floor((diffMs % 60_000) / 1000);
  return { dias, horas, minutos, segundos };
}

export default function Contador() {
  const [t, setT] = useState<ReturnType<typeof calcular> | null>(null);

  useEffect(() => {
    setT(calcular());
    const id = setInterval(() => setT(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  const unidades = [
    { valor: t?.dias, rotulo: "dias" },
    { valor: t?.horas, rotulo: "horas" },
    { valor: t?.minutos, rotulo: "minutos" },
    { valor: t?.segundos, rotulo: "segundos" },
  ];

  return (
    <section className="relative px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-script text-4xl text-rose-200 sm:text-5xl"
      >
        Desde aquele 11 de janeiro…
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mt-10 flex max-w-2xl flex-wrap items-stretch justify-center gap-3 sm:gap-5"
      >
        {unidades.map((u) => (
          <div
            key={u.rotulo}
            className="min-w-[5.2rem] flex-1 rounded-2xl border border-rose-500/20 bg-wine-900/60 px-3 py-5 backdrop-blur-sm sm:min-w-[6.5rem]"
          >
            <div className="text-3xl font-bold tabular-nums text-rose-100 sm:text-5xl">
              {u.valor ?? "—"}
            </div>
            <div className="mt-1 text-[0.65rem] uppercase tracking-widest text-rose-300/70 sm:text-xs">
              {u.rotulo}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 text-rose-100/60"
      >
        …nunca mais larguei os olhos de ti <span className="heartbeat">💘</span>
      </motion.p>
    </section>
  );
}
