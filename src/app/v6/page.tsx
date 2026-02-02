"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
};

function BrutalistFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="border-b-4 border-[#EBFF00]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left py-5 flex items-center justify-between gap-4 cursor-pointer group"
          >
            <span className="text-lg md:text-xl font-black text-white uppercase group-hover:text-[#EBFF00] transition-colors">
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.15 }}
              className="text-3xl text-[#EBFF00] font-black flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-white/70 leading-relaxed text-lg">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function Marquee({ text, speed = 20 }: { text: string; speed?: number }) {
  const repeated = Array(8).fill(text).join(" ★ ");
  return (
    <div className="overflow-hidden border-y-4 border-[#EBFF00] py-3 bg-[#EBFF00] select-none">
      <div className="brutalist-marquee whitespace-nowrap" style={{ animationDuration: `${speed}s` }}>
        <span className="text-black font-black text-lg md:text-xl tracking-wider">
          {repeated} ★ {repeated}
        </span>
      </div>
    </div>
  );
}

export default function V6() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black border-b-4 border-[#EBFF00]">
        <div className="max-w-none mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-xl font-black tracking-tighter text-[#EBFF00]">
            SYNTHESIS
          </span>
          <div className="hidden md:flex gap-6 text-xs font-black tracking-wider">
            <a href="#tracks" className="text-white hover:text-[#EBFF00] transition-colors">TRACKS</a>
            <a href="#judging" className="text-white hover:text-[#EBFF00] transition-colors">JUDGING</a>
            <a href="#prizes" className="text-white hover:text-[#EBFF00] transition-colors">PRIZES</a>
            <a href="#faq" className="text-white hover:text-[#EBFF00] transition-colors">FAQ</a>
          </div>
          <a
            href="#apply"
            className="bg-[#EBFF00] text-black font-black text-xs px-5 py-2 hover:bg-white transition-colors"
          >
            APPLY NOW
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative">
        {/* Rotated background text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12"
          >
            <span className="text-[20vw] font-black text-white leading-none whitespace-nowrap">
              SYNTHESIS
            </span>
          </motion.div>
        </div>

        <div className="max-w-none mx-auto w-full relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base font-black tracking-[0.3em] text-[#EBFF00] mb-6 uppercase"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-[0.85] mb-8"
          >
            THE
            <br />
            <span className="text-[#EBFF00]">SYNTHE</span>
            <span className="text-white">SIS</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
          >
            <p className="text-xl md:text-2xl font-bold text-white/60 max-w-md leading-tight">
              {content.hero.catchphrase}
            </p>
            <p className="text-xs text-white/30 font-bold tracking-wider max-w-xs">
              {content.hero.microcopy}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-0 mt-12"
          >
            {content.hero.ctas.primary.map((cta, i) => (
              <a
                key={cta.label}
                href={cta.href}
                className={`px-8 py-4 text-sm font-black tracking-wider transition-colors border-2 ${
                  i === 0
                    ? "bg-[#EBFF00] text-black border-[#EBFF00] hover:bg-white hover:border-white"
                    : i === 1
                    ? "bg-transparent text-[#EBFF00] border-[#EBFF00] hover:bg-[#EBFF00] hover:text-black"
                    : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                }`}
              >
                {cta.label.toUpperCase()}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee text="COOPERATION IS OPTIONAL — SYNTHESIS IS INEVITABLE" speed={25} />

      {/* What This Is */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-none mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row gap-8 md:gap-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#EBFF00] md:w-1/3 leading-none uppercase">
              {content.whatThisIs.title}
            </h2>
            <div className="md:w-2/3 space-y-6">
              {content.whatThisIs.body.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="border-t-4 border-[#EBFF00]">
        <div className="px-6 py-20 md:py-28">
          <motion.h2
            {...fadeUp}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-16 leading-none"
          >
            TRACKS
          </motion.h2>

          <div className="space-y-0">
            {content.tracks.items.map((track, i) => (
              <motion.div
                key={track.id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`border-b-4 ${i === 0 ? "border-t-4" : ""} border-white/20 py-10 md:py-14 hover:bg-white/[0.02] transition-colors`}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-1/3">
                    <span className="text-7xl md:text-8xl font-black text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-[#EBFF00] tracking-tighter -mt-4">
                      {track.name.toUpperCase()}
                    </h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-xl text-white/70 mb-6 font-bold">
                      {track.tagline}
                    </p>

                    {track.examples && (
                      <div className="space-y-2 mb-4">
                        {track.examples.map((ex, j) => (
                          <div key={j} className="flex gap-3 text-white/40">
                            <span className="text-[#EBFF00] font-black">→</span>
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {track.details && (
                      <div className="space-y-2 mb-4">
                        {track.details.map((d, j) => (
                          <div key={j} className="flex gap-3 text-white/40">
                            <span className="text-[#EBFF00] font-black">→</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {track.note && (
                      <div className="bg-[#EBFF00] text-black px-4 py-3 mt-4 inline-block">
                        <span className="font-black text-xs">{track.note}</span>
                      </div>
                    )}

                    {track.wants && (
                      <div className="mt-4">
                        <p className="font-black text-xs text-[#EBFF00] tracking-wider mb-2">
                          WHAT WE WANT:
                        </p>
                        {track.wants.map((w, j) => (
                          <div key={j} className="flex gap-3 text-white/40 mb-1">
                            <span className="text-[#EBFF00] font-black">→</span>
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trojan Horse — Inverted */}
      <section className="bg-[#EBFF00] text-black">
        <div className="px-6 py-20 md:py-28">
          <motion.div {...fadeUp}>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none uppercase">
              {content.trojanHorse.title}
            </h2>
            <div className="max-w-3xl space-y-6">
              {content.trojanHorse.body.map((p, i) => (
                <p key={i} className="text-xl md:text-2xl font-medium leading-relaxed text-black/80">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee text="JUDGED BY HUMANS AND AI — NO SCREENSHOTS — SHIP REAL CODE" speed={30} />

      {/* Judging */}
      <section id="judging" className="px-6 py-20 md:py-28">
        <motion.h2
          {...fadeUp}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-none"
        >
          JUDGING
        </motion.h2>
        <motion.p
          {...fadeUp}
          className="text-2xl font-black text-[#EBFF00] tracking-tighter mb-16 uppercase"
        >
          {content.judging.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-0">
          {content.judging.juries.map((jury, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`border-4 ${i === 0 ? "border-[#EBFF00]" : "border-white"} p-8 md:p-12 ${i === 0 ? "-mr-1" : ""}`}
            >
              <h3 className="text-3xl font-black mb-4 tracking-tighter">
                {jury.name.toUpperCase()}
              </h3>
              <p className="text-white/60 text-lg leading-relaxed">
                {jury.criteria}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-16">
          <h3 className="text-3xl font-black text-[#EBFF00] tracking-tighter mb-8 uppercase">
            {content.judging.whatWins.title}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.judging.whatWins.items.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[#EBFF00] font-black text-2xl leading-none">✦</span>
                <span className="text-white/70 text-lg font-bold">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Prize Pool */}
      <section id="prizes" className="border-t-4 border-[#EBFF00] px-6 py-20 md:py-28 relative">
        {/* Rotated dollar sign */}
        <div className="absolute top-10 right-10 text-[20vw] font-black text-white/[0.03] leading-none pointer-events-none select-none rotate-12">
          $
        </div>

        <motion.h2
          {...fadeUp}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-none relative z-10"
        >
          PRIZE POOL
        </motion.h2>

        <motion.div {...fadeUp} className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-16">
            <span className="text-7xl md:text-[10rem] font-black text-[#EBFF00] tracking-tighter leading-none">
              {content.prizes.total}
            </span>
            <span className="text-xl text-white/40 font-bold pb-4 md:pb-8">
              {content.prizes.note}
            </span>
          </div>

          <div className="space-y-0">
            {content.prizes.categories.map((cat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-b-2 border-white/10 py-4 flex items-center gap-6 hover:bg-white/[0.02] hover:pl-4 transition-all"
              >
                <span className="text-4xl font-black text-white/10 w-16">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xl font-bold text-white/70">
                  {cat}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#EBFF00] text-black px-6 py-4 mt-12 inline-block">
            <span className="font-black text-sm tracking-wider">
              {content.prizes.sponsorCallout.toUpperCase()}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Who Should Apply */}
      <section id="apply" className="bg-white text-black px-6 py-20 md:py-28">
        <motion.h2
          {...fadeUp}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-16 leading-none"
        >
          WHO SHOULD<br />
          <span className="text-[#EBFF00]" style={{ WebkitTextStroke: "3px black" }}>
            APPLY
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-0">
          {content.whoShouldApply.groups.map((group, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`border-4 border-black p-8 md:p-10 ${i > 0 ? "md:-ml-1" : ""} ${i > 0 ? "-mt-1 md:mt-0" : ""}`}
            >
              <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase">
                {group.name}
              </h3>
              <p className="text-black/60 text-lg leading-relaxed font-medium">
                {group.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20 md:py-28 border-t-4 border-[#EBFF00]">
        <motion.h2
          {...fadeUp}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-16 leading-none"
        >
          TIMELINE
        </motion.h2>

        {content.timeline.events.map((event, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="border-b-4 border-white/10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-2"
          >
            <span className="text-2xl md:text-3xl font-black text-white/80 tracking-tighter">
              {event.label.toUpperCase()}
            </span>
            <span className="text-xl font-black text-[#EBFF00]">
              {event.date}
            </span>
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-20 md:py-28 bg-[#111]">
        <motion.h2
          {...fadeUp}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-16 leading-none"
        >
          FAQ
        </motion.h2>
        <div className="max-w-4xl">
          <BrutalistFAQ items={content.faq.items} />
        </div>
      </section>

      <Marquee text="APPLY NOW — HACKERS — AGENTS — SPONSORS — THE FUTURE IS BEING BUILT" speed={22} />

      {/* Footer */}
      <footer className="px-6 py-20 md:py-28">
        <motion.p
          {...fadeUp}
          className="text-white/40 text-xl max-w-3xl mx-auto text-center leading-relaxed mb-12 font-medium"
        >
          {content.footer.body}
        </motion.p>

        <motion.div {...fadeUp} className="flex flex-col sm:flex-row gap-0 justify-center mb-16">
          {content.hero.ctas.primary.map((cta, i) => (
            <a
              key={cta.label}
              href={cta.href}
              className={`px-8 py-4 text-sm font-black tracking-wider transition-colors border-2 text-center ${
                i === 0
                  ? "bg-[#EBFF00] text-black border-[#EBFF00] hover:bg-white hover:border-white"
                  : i === 1
                  ? "bg-transparent text-[#EBFF00] border-[#EBFF00] hover:bg-[#EBFF00] hover:text-black"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              {cta.label.toUpperCase()}
            </a>
          ))}
        </motion.div>

        <motion.p
          {...fadeUp}
          className="text-center text-white/20 text-xs font-black tracking-[0.3em]"
        >
          {content.hero.ethos.toUpperCase()}
        </motion.p>
      </footer>
    </div>
  );
}
