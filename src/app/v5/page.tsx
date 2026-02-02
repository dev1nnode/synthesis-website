"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function EditorialFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left py-6 flex items-center justify-between gap-6 cursor-pointer group"
          >
            <span
              className="text-lg text-stone-800 group-hover:text-stone-600 transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl text-stone-400 flex-shrink-0"
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
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-stone-500 leading-relaxed max-w-2xl">
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

function Section({
  children,
  id,
  className = "",
  wide = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${wide ? "max-w-6xl" : "max-w-4xl"} mx-auto px-6 md:px-12 py-20 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      {...fadeUp}
      className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4"
    >
      {children}
    </motion.p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      {...fadeUp}
      className="text-3xl md:text-5xl text-stone-800 mb-10 leading-tight"
      style={{ fontFamily: "var(--font-playfair)" }}
    >
      {children}
    </motion.h2>
  );
}

function ImagePlaceholder({ aspect = "aspect-[16/9]", label }: { aspect?: string; label?: string }) {
  return (
    <div className={`${aspect} bg-stone-100 flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200" />
      {label && (
        <span className="relative text-xs tracking-[0.15em] uppercase text-stone-300">
          {label}
        </span>
      )}
    </div>
  );
}

export default function V5() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-stone-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <a
            href="#"
            className="text-sm tracking-[0.15em] text-stone-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Synthesis
          </a>
          <div className="hidden md:flex items-center gap-8 text-xs tracking-wider text-stone-400">
            <a href="#tracks" className="hover:text-stone-800 transition-colors">Tracks</a>
            <a href="#judging" className="hover:text-stone-800 transition-colors">Judging</a>
            <a href="#prizes" className="hover:text-stone-800 transition-colors">Prizes</a>
            <a href="#faq" className="hover:text-stone-800 transition-colors">FAQ</a>
          </div>
          <a
            href="#apply"
            className="text-xs tracking-wider text-stone-800 border-b border-stone-800 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors"
          >
            Apply
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto w-full pt-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-6">
                An Ethereum Event
              </p>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl text-stone-800 leading-[0.95] mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The<br />
                Synthesis
              </h1>
              <div className="w-16 h-px bg-stone-300 mb-8" />
              <p className="text-lg md:text-xl text-stone-500 leading-relaxed mb-4 max-w-md">
                {content.hero.description}
              </p>
              <p
                className="text-lg text-stone-400 italic mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {content.hero.catchphrase}
              </p>
              <p className="text-xs text-stone-400 mb-10">
                {content.hero.microcopy}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {content.hero.ctas.primary.map((cta, i) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 text-center ${
                      i === 0
                        ? "bg-stone-800 text-[#FAFAF7] hover:bg-stone-700"
                        : "border border-stone-300 text-stone-600 hover:border-stone-800 hover:text-stone-800"
                    }`}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ImagePlaceholder aspect="aspect-[4/5]" label="Editorial Image" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ethos Quote */}
      <section className="py-16 md:py-20 border-y border-stone-200">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <blockquote
            className="text-2xl md:text-4xl text-stone-700 leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;{content.hero.ethos}&rdquo;
          </blockquote>
        </motion.div>
      </section>

      {/* What This Is */}
      <Section>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <SectionLabel>About</SectionLabel>
            <SectionTitle>{content.whatThisIs.title}</SectionTitle>
          </div>
          <div className="md:col-span-2 space-y-6">
            {content.whatThisIs.body.map((p, i) => (
              <motion.p
                key={i}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-lg text-stone-500 leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </Section>

      {/* Full-width image placeholder */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <ImagePlaceholder aspect="aspect-[21/9]" label="Two Intelligences Meeting" />
        </motion.div>
      </div>

      {/* Tracks */}
      <Section id="tracks" wide>
        <SectionLabel>Competition</SectionLabel>
        <SectionTitle>{content.tracks.title}</SectionTitle>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {content.tracks.items.map((track, i) => (
            <motion.article
              key={track.id}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <ImagePlaceholder aspect="aspect-[3/2]" label={`Track ${i + 1}`} />
              <div className="pt-6">
                <p className="text-xs tracking-[0.15em] uppercase text-stone-400 mb-2">
                  Track {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="text-2xl text-stone-800 mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {track.name}
                </h3>
                <p className="text-stone-500 leading-relaxed mb-4">
                  {track.tagline}
                </p>

                {track.examples && (
                  <ul className="space-y-2 text-stone-400 text-sm">
                    {track.examples.map((ex, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-stone-300 mt-1.5">·</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {track.details && (
                  <ul className="space-y-2 text-stone-400 text-sm mt-3">
                    {track.details.map((d, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-stone-300 mt-1.5">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {track.note && (
                  <p className="text-stone-400 text-xs mt-4 italic border-l-2 border-stone-200 pl-4">
                    {track.note}
                  </p>
                )}

                {track.wants && (
                  <div className="mt-4">
                    <p className="text-xs tracking-wider text-stone-400 mb-2 uppercase">
                      What we want
                    </p>
                    <ul className="space-y-1 text-stone-400 text-sm">
                      {track.wants.map((w, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-stone-300 mt-1.5">·</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Trojan Horse */}
      <section className="bg-stone-800 text-[#FAFAF7]">
        <Section>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <motion.p
                {...fadeUp}
                className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4"
              >
                Requirement
              </motion.p>
              <motion.h2
                {...fadeUp}
                className="text-3xl md:text-5xl leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {content.trojanHorse.title}
              </motion.h2>
            </div>
            <div className="md:col-span-2 space-y-6">
              {content.trojanHorse.body.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-lg text-stone-300 leading-relaxed"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Judging */}
      <Section id="judging">
        <SectionLabel>Process</SectionLabel>
        <SectionTitle>{content.judging.title}</SectionTitle>
        <motion.p
          {...fadeUp}
          className="text-stone-400 text-sm tracking-wider mb-12 uppercase"
        >
          {content.judging.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16">
          {content.judging.juries.map((jury, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="border-t-2 border-stone-200 pt-6"
            >
              <h3
                className="text-xl text-stone-800 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {jury.name}
              </h3>
              <p className="text-stone-500 leading-relaxed">
                {jury.criteria}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="border-t border-stone-200 pt-8">
          <h3
            className="text-xl text-stone-800 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {content.judging.whatWins.title}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.judging.whatWins.items.map((item, i) => (
              <div key={i} className="flex gap-3 text-stone-500">
                <span className="text-stone-300 mt-0.5">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Prize Pool */}
      <section className="border-y border-stone-200 bg-stone-50">
        <Section id="prizes">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel>Rewards</SectionLabel>
              <SectionTitle>{content.prizes.title}</SectionTitle>
              <motion.p
                {...fadeUp}
                className="text-5xl md:text-7xl text-stone-800"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {content.prizes.total}
              </motion.p>
              <motion.p {...fadeUp} className="text-stone-400 mt-2">
                {content.prizes.note}
              </motion.p>
            </div>
            <div>
              <div className="space-y-0 divide-y divide-stone-200">
                {content.prizes.categories.map((cat, i) => (
                  <motion.div
                    key={i}
                    {...stagger}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="py-4 flex items-baseline gap-4"
                  >
                    <span className="text-xs text-stone-300 w-6 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-stone-600">{cat}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                {...fadeUp}
                className="text-stone-400 text-sm mt-8 italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {content.prizes.sponsorCallout}
              </motion.p>
            </div>
          </div>
        </Section>
      </section>

      {/* Who Should Apply */}
      <Section id="apply" wide>
        <SectionLabel>Participants</SectionLabel>
        <SectionTitle>{content.whoShouldApply.title}</SectionTitle>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {content.whoShouldApply.groups.map((group, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <ImagePlaceholder aspect="aspect-[4/3]" label={group.name} />
              <div className="pt-6">
                <h3
                  className="text-xl text-stone-800 mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {group.name}
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  {group.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <section className="border-y border-stone-200">
        <Section>
          <SectionLabel>Schedule</SectionLabel>
          <SectionTitle>{content.timeline.title}</SectionTitle>

          <div className="space-y-0 divide-y divide-stone-200">
            {content.timeline.events.map((event, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="py-6 flex items-baseline justify-between gap-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-stone-300 w-6 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-stone-700 text-lg">
                    {event.label}
                  </span>
                </div>
                <span
                  className="text-stone-400 text-sm italic whitespace-nowrap"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {event.date}
                </span>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* FAQ */}
      <Section id="faq">
        <SectionLabel>Questions</SectionLabel>
        <SectionTitle>{content.faq.title}</SectionTitle>
        <EditorialFAQ items={content.faq.items} />
      </Section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-800 text-[#FAFAF7]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <motion.p
            {...fadeUp}
            className="text-stone-400 max-w-2xl mx-auto text-center leading-relaxed mb-12"
          >
            {content.footer.body}
          </motion.p>

          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {content.hero.ctas.primary.map((cta, i) => (
              <a
                key={cta.label}
                href={cta.href}
                className={`px-6 py-3 text-sm tracking-wider transition-all text-center ${
                  i === 0
                    ? "bg-[#FAFAF7] text-stone-800 hover:bg-stone-200"
                    : "border border-stone-500 text-stone-300 hover:border-stone-300 hover:text-[#FAFAF7]"
                }`}
              >
                {cta.label}
              </a>
            ))}
          </motion.div>

          <div className="text-center">
            <p
              className="text-stone-500 text-sm italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {content.hero.ethos}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
