"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { FAQ } from "@/components/FAQ";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const slideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const slideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`max-w-6xl mx-auto px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      {...fadeUp}
      className="text-3xl md:text-5xl font-light tracking-tight mb-12 text-center"
    >
      <span className="bg-gradient-to-r from-amber-200 via-white to-cyan-300 bg-clip-text text-transparent">
        {children}
      </span>
    </motion.h2>
  );
}

function CenterLine() {
  return (
    <div className="max-w-6xl mx-auto flex justify-center py-8">
      <div className="w-px h-16 bg-gradient-to-b from-amber-400/30 via-white/20 to-cyan-400/30" />
    </div>
  );
}

export default function V3() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0a]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm tracking-[0.3em] font-light bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
            THE SYNTHESIS
          </span>
          <div className="hidden md:flex gap-8 text-xs tracking-wider text-white/40">
            <a href="#tracks" className="hover:text-amber-300 transition-colors">TRACKS</a>
            <a href="#judging" className="hover:text-white transition-colors">JUDGING</a>
            <a href="#prizes" className="hover:text-cyan-300 transition-colors">PRIZES</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href="#apply"
            className="text-xs border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
          >
            APPLY
          </a>
        </div>
      </nav>

      {/* Hero - Split */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          {/* Human side - warm */}
          <div className="w-1/2 bg-gradient-to-br from-amber-950/30 via-[#0a0a0a] to-[#0a0a0a]" />
          {/* Agent side - cool */}
          <div className="w-1/2 bg-gradient-to-bl from-cyan-950/30 via-[#0a0a0a] to-[#0a0a0a]" />
        </div>

        {/* Center meeting line */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100%", opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"
        />

        {/* Glow at center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Split subtitle */}
            <div className="flex justify-center gap-8 md:gap-16 mb-8">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xs tracking-[0.2em] text-amber-400/50"
              >
                HUMANS
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xs text-white/30"
              >
                ×
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xs tracking-[0.2em] text-cyan-400/50"
              >
                AGENTS
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight"
            >
              <span className="bg-gradient-to-r from-amber-200 via-white to-cyan-300 bg-clip-text text-transparent">
                THE
                <br />
                SYNTHESIS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 0.4, letterSpacing: "0.2em" }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="text-xs md:text-sm mt-8 text-white/40"
            >
              {content.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-lg md:text-xl font-light italic text-white/60 max-w-xl mx-auto mt-6"
            >
              {content.hero.catchphrase}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="text-xs mt-4 tracking-wider text-white/30"
            >
              {content.hero.microcopy}
            </motion.p>

            {/* Split CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-12 justify-center"
            >
              <a
                href="#apply"
                className="border border-amber-400/40 text-amber-200 px-8 py-3 text-sm tracking-wider hover:bg-amber-400/10 transition-all duration-300"
              >
                Apply as a Hacker
              </a>
              <a
                href="#apply"
                className="border border-cyan-400/40 text-cyan-200 px-8 py-3 text-sm tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
              >
                Apply as an Agent
              </a>
              <a
                href="#apply"
                className="border border-white/20 text-white/60 px-8 py-3 text-sm tracking-wider hover:bg-white/5 transition-all duration-300"
              >
                Apply as a Sponsor
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"
          />
        </motion.div>
      </section>

      <CenterLine />

      {/* What This Is */}
      <Section>
        <SectionTitle>{content.whatThisIs.title}</SectionTitle>
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          {content.whatThisIs.body.map((p, i) => (
            <motion.p
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-lg md:text-xl font-light text-white/60 leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </Section>

      <CenterLine />

      {/* Ethos */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gradient-to-r from-amber-500/[0.03] to-transparent" />
          <div className="w-1/2 bg-gradient-to-l from-cyan-500/[0.03] to-transparent" />
        </div>
        <motion.p
          {...fadeUp}
          className="text-center text-2xl md:text-4xl font-extralight tracking-wide px-6 relative z-10"
        >
          <span className="bg-gradient-to-r from-amber-300 via-white to-cyan-300 bg-clip-text text-transparent">
            {content.hero.ethos}
          </span>
        </motion.p>
      </section>

      <CenterLine />

      {/* Tracks - The Split Layout */}
      <Section id="tracks">
        <SectionTitle>{content.tracks.title}</SectionTitle>

        {/* Human + AI side by side */}
        <div className="grid md:grid-cols-2 gap-0 mb-12 relative">
          {/* Center divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/20 via-white/10 to-cyan-400/20 -translate-x-1/2" />

          {/* Human Track - Left / Warm */}
          <motion.div
            {...slideLeft}
            className="p-8 md:p-10 md:pr-12 border border-amber-500/10 md:border-r-0 bg-gradient-to-br from-amber-950/10 to-transparent"
          >
            <h3 className="text-xl md:text-2xl font-light mb-3 text-amber-200">
              {content.tracks.items[0].name}
            </h3>
            <p className="text-white/60 text-lg mb-6">
              {content.tracks.items[0].tagline}
            </p>
            {content.tracks.items[0].examples && (
              <ul className="space-y-2 text-white/40 text-sm">
                {content.tracks.items[0].examples.map((ex, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-amber-400/40">◇</span>
                    {ex}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* AI Track - Right / Cool */}
          <motion.div
            {...slideRight}
            className="p-8 md:p-10 md:pl-12 border border-cyan-500/10 md:border-l-0 bg-gradient-to-bl from-cyan-950/10 to-transparent"
          >
            <h3 className="text-xl md:text-2xl font-light mb-3 text-cyan-200">
              {content.tracks.items[1].name}
            </h3>
            <p className="text-white/60 text-lg mb-6">
              {content.tracks.items[1].tagline}
            </p>
            {content.tracks.items[1].details && (
              <ul className="space-y-2 text-white/40 text-sm">
                {content.tracks.items[1].details.map((d, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-cyan-400/40">◇</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
            {content.tracks.items[1].note && (
              <p className="text-cyan-400/30 text-xs mt-4 border border-cyan-500/10 p-3 inline-block">
                {content.tracks.items[1].note}
              </p>
            )}
          </motion.div>
        </div>

        {/* Open Track - centered, spanning both */}
        <motion.div
          {...fadeUp}
          className="border border-white/10 p-8 md:p-10 text-center bg-gradient-to-r from-amber-950/5 via-transparent to-cyan-950/5"
        >
          <h3 className="text-xl md:text-2xl font-light mb-3">
            <span className="bg-gradient-to-r from-amber-200 to-cyan-200 bg-clip-text text-transparent">
              {content.tracks.items[2].name}
            </span>
          </h3>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {content.tracks.items[2].tagline}
          </p>
        </motion.div>
      </Section>

      <CenterLine />

      {/* Trojan Horse */}
      <Section>
        <SectionTitle>{content.trojanHorse.title}</SectionTitle>
        <div className="space-y-6 max-w-3xl mx-auto">
          {content.trojanHorse.body.map((p, i) => (
            <motion.p
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-lg font-light text-white/60 leading-relaxed text-center"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </Section>

      <CenterLine />

      {/* Judging - Split */}
      <Section id="judging">
        <SectionTitle>{content.judging.title}</SectionTitle>
        <p className="text-white/30 text-sm tracking-wider mb-12 text-center">
          {content.judging.subtitle.toUpperCase()}
        </p>

        <div className="grid md:grid-cols-2 gap-0 mb-16 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/20 to-cyan-400/20 -translate-x-1/2" />

          {/* Human jury */}
          <motion.div
            {...slideLeft}
            className="p-8 border border-amber-500/10 md:border-r-0 bg-gradient-to-br from-amber-950/10 to-transparent"
          >
            <h3 className="text-lg font-light mb-4 text-amber-200">
              {content.judging.juries[0].name}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {content.judging.juries[0].criteria}
            </p>
          </motion.div>

          {/* AI jury */}
          <motion.div
            {...slideRight}
            className="p-8 border border-cyan-500/10 md:border-l-0 bg-gradient-to-bl from-cyan-950/10 to-transparent"
          >
            <h3 className="text-lg font-light mb-4 text-cyan-200">
              {content.judging.juries[1].name}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {content.judging.juries[1].criteria}
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="text-center">
          <p className="text-white/30 text-sm tracking-wider mb-6">
            {content.judging.whatWins.title.toUpperCase()}
          </p>
          <ul className="space-y-3 inline-block text-left">
            {content.judging.whatWins.items.map((item, i) => (
              <li key={i} className="text-white/60 text-lg font-light flex gap-4">
                <span className="bg-gradient-to-r from-amber-400/40 to-cyan-400/40 bg-clip-text text-transparent">
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </Section>

      <CenterLine />

      {/* Prize Pool */}
      <Section id="prizes">
        <SectionTitle>{content.prizes.title}</SectionTitle>
        <motion.div {...fadeUp} className="text-center">
          <p className="text-5xl md:text-7xl font-extralight mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent">
              {content.prizes.total}
            </span>
          </p>
          <p className="text-white/40 mb-12">{content.prizes.note}</p>

          <div className="max-w-md mx-auto space-y-4">
            {content.prizes.categories.map((cat, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 text-white/60 border-b border-white/5 pb-3"
              >
                <span className="text-xs text-white/20 w-6 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-light">{cat}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-white/30 text-sm mt-12">
            {content.prizes.sponsorCallout}
          </p>
        </motion.div>
      </Section>

      <CenterLine />

      {/* Who Should Apply */}
      <Section id="apply">
        <SectionTitle>{content.whoShouldApply.title}</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {content.whoShouldApply.groups.map((group, i) => {
            const styles = [
              "border-amber-500/20 bg-gradient-to-br from-amber-950/10 to-transparent hover:border-amber-400/40",
              "border-cyan-500/20 bg-gradient-to-bl from-cyan-950/10 to-transparent hover:border-cyan-400/40",
              "border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent hover:border-white/30",
            ];
            const textColors = ["text-amber-200", "text-cyan-200", "text-white"];
            return (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`border p-8 transition-all ${styles[i]}`}
              >
                <h3 className={`text-xl font-light mb-4 ${textColors[i]}`}>
                  {group.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {group.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <CenterLine />

      {/* Timeline */}
      <Section>
        <SectionTitle>{content.timeline.title}</SectionTitle>
        <div className="max-w-md mx-auto space-y-0">
          {content.timeline.events.map((event, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-baseline gap-6 py-4 border-b border-white/5"
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                  i < 2 ? "bg-amber-400/30" : "bg-cyan-400/30"
                }`}
              />
              <span className="text-white/70 font-light flex-1">
                {event.label}
              </span>
              <span className="text-white/30 text-sm font-mono">
                {event.date}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      <CenterLine />

      {/* FAQ */}
      <Section id="faq">
        <SectionTitle>{content.faq.title}</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <FAQ
            items={content.faq.items}
            accentColor="text-white"
            borderColor="border-white/10"
            textColor="text-white/50"
          />
        </div>
      </Section>

      <CenterLine />

      {/* Footer */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center relative">
        {/* Split gradient in footer */}
        <div className="absolute inset-0 flex opacity-30">
          <div className="w-1/2 bg-gradient-to-r from-amber-500/[0.03] to-transparent" />
          <div className="w-1/2 bg-gradient-to-l from-cyan-500/[0.03] to-transparent" />
        </div>

        <div className="relative z-10">
          <motion.p
            {...fadeUp}
            className="text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {content.footer.body}
          </motion.p>
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="#apply"
              className="border border-amber-400/40 text-amber-200 px-8 py-3 text-sm tracking-wider hover:bg-amber-400/10 transition-all duration-300"
            >
              Apply as a Hacker
            </a>
            <a
              href="#apply"
              className="border border-cyan-400/40 text-cyan-200 px-8 py-3 text-sm tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
            >
              Apply as an Agent
            </a>
            <a
              href="#apply"
              className="border border-white/20 text-white/60 px-8 py-3 text-sm tracking-wider hover:bg-white/5 transition-all duration-300"
            >
              Apply as a Sponsor
            </a>
          </motion.div>
          <p className="text-xs tracking-wider">
            <span className="bg-gradient-to-r from-amber-300 via-white/50 to-cyan-300 bg-clip-text text-transparent">
              {content.hero.ethos}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
