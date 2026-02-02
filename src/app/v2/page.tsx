"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { FAQ } from "@/components/FAQ";
import { Particles } from "@/components/Particles";

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
      className={`max-w-5xl mx-auto px-6 py-24 md:py-32 relative z-10 ${className}`}
    >
      {children}
    </section>
  );
}

function GlowText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ${className}`}
      style={{
        textShadow: "0 0 40px rgba(0, 255, 255, 0.3), 0 0 80px rgba(140, 100, 255, 0.15)",
        filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.2))",
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      {...fadeUp}
      className="text-3xl md:text-5xl font-light tracking-tight mb-12"
    >
      <GlowText>{children}</GlowText>
    </motion.h2>
  );
}

function Divider() {
  return (
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}

export default function V2() {
  return (
    <div className="min-h-screen bg-[#050510] text-white relative overflow-hidden">
      <Particles />

      {/* Gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#050510]/70 border-b border-cyan-500/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm tracking-[0.3em] font-light">
            <GlowText>THE SYNTHESIS</GlowText>
          </span>
          <div className="hidden md:flex gap-8 text-xs tracking-wider text-white/40">
            <a href="#tracks" className="hover:text-cyan-400 transition-colors">TRACKS</a>
            <a href="#judging" className="hover:text-cyan-400 transition-colors">JUDGING</a>
            <a href="#prizes" className="hover:text-cyan-400 transition-colors">PRIZES</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </div>
          <a
            href="#apply"
            className="text-xs border border-cyan-500/30 px-4 py-2 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all text-cyan-400"
          >
            APPLY
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 0.6, letterSpacing: "0.3em" }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-xs md:text-sm mb-8 text-cyan-400/60"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight"
          >
            <GlowText className="leading-tight">
              THE
              <br />
              SYNTHESIS
            </GlowText>
          </motion.h1>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "160px", opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="h-px mx-auto mt-10 mb-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-lg md:text-xl font-light italic text-purple-300/70 max-w-xl mx-auto"
          >
            {content.hero.catchphrase}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="text-xs mt-6 tracking-wider text-white/30"
          >
            {content.hero.microcopy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center"
          >
            {content.hero.ctas.primary.map((cta, i) => (
              <a
                key={cta.label}
                href={cta.href}
                className={`px-8 py-3 text-sm tracking-wider transition-all duration-300 ${
                  i === 0
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 hover:from-cyan-500/30 hover:to-purple-500/30 text-white"
                    : i === 1
                    ? "border border-purple-400/40 text-purple-300 hover:bg-purple-500/10"
                    : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {cta.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"
          />
        </motion.div>
      </section>

      <Divider />

      {/* What This Is */}
      <Section>
        <SectionTitle>{content.whatThisIs.title}</SectionTitle>
        <div className="space-y-6 max-w-3xl">
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

      <Divider />

      {/* Ethos */}
      <section className="py-20 md:py-28 relative z-10">
        <motion.p
          {...fadeUp}
          className="text-center text-2xl md:text-4xl font-extralight tracking-wide px-6"
        >
          <GlowText>{content.hero.ethos}</GlowText>
        </motion.p>
      </section>

      <Divider />

      {/* Tracks */}
      <Section id="tracks">
        <SectionTitle>{content.tracks.title}</SectionTitle>
        <div className="space-y-12">
          {content.tracks.items.map((track, i) => {
            const borderColors = [
              "border-cyan-500/30",
              "border-purple-500/30",
              "border-white/20",
            ];
            const glowColors = [
              "hover:shadow-[0_0_30px_rgba(0,255,255,0.05)]",
              "hover:shadow-[0_0_30px_rgba(140,100,255,0.05)]",
              "hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]",
            ];
            return (
              <motion.div
                key={track.id}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`border ${borderColors[i]} p-8 md:p-10 rounded-sm bg-white/[0.02] backdrop-blur-sm ${glowColors[i]} transition-shadow`}
              >
                <h3 className="text-xl md:text-2xl font-light mb-3">
                  <GlowText>{track.name}</GlowText>
                </h3>
                <p className="text-white/60 text-lg mb-6">{track.tagline}</p>

                {track.examples && (
                  <ul className="space-y-2 text-white/40 text-sm">
                    {track.examples.map((ex, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-cyan-400/40">◆</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                )}

                {track.details && (
                  <ul className="space-y-2 text-white/40 text-sm mt-4">
                    {track.details.map((d, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-purple-400/40">◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}

                {track.note && (
                  <p className="text-cyan-400/30 text-xs mt-4 border border-cyan-500/10 p-3 inline-block">
                    {track.note}
                  </p>
                )}

                {track.wants && (
                  <div className="mt-4">
                    <p className="text-cyan-400/50 text-xs tracking-wider mb-2">
                      WHAT WE WANT:
                    </p>
                    <ul className="space-y-1 text-white/40 text-sm">
                      {track.wants.map((w, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-purple-400/40">◆</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Divider />

      {/* Trojan Horse */}
      <Section>
        <SectionTitle>{content.trojanHorse.title}</SectionTitle>
        <div className="space-y-6 max-w-3xl">
          {content.trojanHorse.body.map((p, i) => (
            <motion.p
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-lg font-light text-white/60 leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Judging */}
      <Section id="judging">
        <SectionTitle>{content.judging.title}</SectionTitle>
        <p className="text-cyan-400/40 text-sm tracking-wider mb-12">
          {content.judging.subtitle.toUpperCase()}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {content.judging.juries.map((jury, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`p-8 rounded-sm backdrop-blur-sm ${
                i === 0
                  ? "border border-cyan-500/20 bg-cyan-500/[0.03]"
                  : "border border-purple-500/20 bg-purple-500/[0.03]"
              }`}
            >
              <h3 className="text-lg font-light mb-4">
                <GlowText>{jury.name}</GlowText>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {jury.criteria}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}>
          <p className="text-cyan-400/40 text-sm tracking-wider mb-6">
            {content.judging.whatWins.title.toUpperCase()}
          </p>
          <ul className="space-y-3">
            {content.judging.whatWins.items.map((item, i) => (
              <li key={i} className="text-white/60 text-lg font-light flex gap-4">
                <span className="text-cyan-400/40">→</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </Section>

      <Divider />

      {/* Prize Pool */}
      <Section id="prizes">
        <SectionTitle>{content.prizes.title}</SectionTitle>
        <motion.div {...fadeUp}>
          <p className="text-5xl md:text-7xl font-extralight mb-4">
            <GlowText>{content.prizes.total}</GlowText>
          </p>
          <p className="text-white/40 mb-12">{content.prizes.note}</p>

          <div className="space-y-4">
            {content.prizes.categories.map((cat, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 text-white/60 p-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-xs text-cyan-400/30 w-6 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-light">{cat}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-white/30 text-sm mt-12 pt-6 border-t border-cyan-500/10">
            {content.prizes.sponsorCallout}
          </p>
        </motion.div>
      </Section>

      <Divider />

      {/* Who Should Apply */}
      <Section id="apply">
        <SectionTitle>{content.whoShouldApply.title}</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {content.whoShouldApply.groups.map((group, i) => {
            const colors = [
              "border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,255,255,0.05)]",
              "border-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(140,100,255,0.05)]",
              "border-white/10 hover:border-white/30",
            ];
            return (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`border p-8 bg-white/[0.02] backdrop-blur-sm rounded-sm transition-all ${colors[i]}`}
              >
                <h3 className="text-xl font-light mb-4">
                  <GlowText>{group.name}</GlowText>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {group.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Divider />

      {/* Timeline */}
      <Section>
        <SectionTitle>{content.timeline.title}</SectionTitle>
        <div className="space-y-0">
          {content.timeline.events.map((event, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-baseline gap-6 py-4 border-b border-white/5"
            >
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 flex-shrink-0 mt-1" />
              <span className="text-white/70 font-light flex-1">
                {event.label}
              </span>
              <span className="text-cyan-400/30 text-sm font-mono">
                {event.date}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* FAQ */}
      <Section id="faq">
        <SectionTitle>{content.faq.title}</SectionTitle>
        <FAQ
          items={content.faq.items}
          accentColor="text-white"
          borderColor="border-cyan-500/10"
          textColor="text-white/50"
        />
      </Section>

      <Divider />

      {/* Footer */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center relative z-10">
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
          {content.hero.ctas.primary.map((cta, i) => (
            <a
              key={cta.label}
              href={cta.href}
              className={`px-8 py-3 text-sm tracking-wider transition-all duration-300 ${
                i === 0
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 hover:from-cyan-500/30 hover:to-purple-500/30 text-white"
                  : "border border-white/20 text-white/60 hover:border-white/40"
              }`}
            >
              {cta.label}
            </a>
          ))}
        </motion.div>
        <p className="text-xs tracking-wider">
          <GlowText>{content.hero.ethos}</GlowText>
        </p>
      </section>
    </div>
  );
}
