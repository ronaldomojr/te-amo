"use client";

import { motion } from "framer-motion";

// Texto copiado exatamente da carta escrita pelo Júnior (PDF na pasta arquivos/carta)
const CARTA = `Oi amorzinho, aqui sou euuuuu, queria te desejar um feliz dia dos namorados. Você é uma benção na minha vida e tudo para mim. Desde o primeiro dia que eu te vi naquele 11 de janeiro nunca mais larguei os olhos de ti minha gatinha, e você daquele dia em diante nunca deixou de sair do meu lado, de me apoiar e sempre estar comigo venha o que vier, e estamos aqui quase um ano e meio depois comemorando o segundo dia dos namorados juntos. Saiba que você é minha vida, meu mundo e darei tudo por ti e por nós para sempreee, que seja o segundo de infinitos! Eu te amo para sempre.`;

const ASSINATURA = `Ass:Júnior o amor da sua vida.`;

export default function Carta() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-script text-center text-5xl text-rose-200 sm:text-6xl"
      >
        Uma carta para você
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 18 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1, type: "spring", bounce: 0.2 }}
        style={{ transformPerspective: 1200 }}
        className="relative mx-auto mt-12 max-w-2xl"
      >
        {/* selo de coração */}
        <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-rose-600 p-3 text-2xl shadow-lg shadow-rose-950/50">
          💌
        </div>

        <div className="paper relative -rotate-1 rounded-lg px-7 pb-12 pt-14 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:px-12">
          <p className="font-hand whitespace-pre-line text-2xl leading-[2.2rem] text-stone-800 sm:text-[1.65rem]">
            {CARTA}
          </p>
          <p className="font-hand mt-9 text-right text-2xl leading-[2.2rem] text-rose-800 sm:text-[1.65rem]">
            {ASSINATURA}
          </p>

          <span className="absolute bottom-4 left-7 text-xl opacity-70 sm:left-12">
            ❤️🌹
          </span>
        </div>
      </motion.div>
    </section>
  );
}
