"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";

// Typewriter hook
function useTypewriter(text: string, speed = 30, startDelay = 0, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayed("");
    setDone(false);

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

// Terminal line component
function TerminalLine({
  prefix = "$",
  command,
  output,
  delay = 0,
  onComplete,
  commandSpeed = 40,
}: {
  prefix?: string;
  command: string;
  output?: string[];
  delay?: number;
  onComplete?: () => void;
  commandSpeed?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const { displayed, done } = useTypewriter(command, commandSpeed, 200, visible);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (done && output) {
      const t = setTimeout(() => setShowOutput(true), 300);
      return () => clearTimeout(t);
    }
    if (done && onComplete) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
  }, [done, output, onComplete]);

  useEffect(() => {
    if (showOutput && onComplete) {
      const t = setTimeout(onComplete, 200);
      return () => clearTimeout(t);
    }
  }, [showOutput, onComplete]);

  if (!visible) return null;

  return (
    <div className="mb-2">
      <div className="flex gap-2">
        <span className="text-green-500/60 select-none">{prefix}</span>
        <span className="text-green-400">
          {displayed}
          {!done && <span className="terminal-blink text-green-300">█</span>}
        </span>
      </div>
      {showOutput && output && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="ml-4 mt-1 text-green-300/70"
        >
          {output.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// FAQ item component for terminal
function TerminalFAQ({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left flex gap-2 hover:bg-green-500/5 py-1 px-1 transition-colors cursor-pointer"
          >
            <span className="text-green-500/40 select-none">
              {openIndex === i ? "[-]" : "[+]"}
            </span>
            <span className="text-green-400">{item.q}</span>
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
                <div className="ml-6 py-2 text-green-300/60 border-l border-green-500/20 pl-3">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Section nav for terminal
function TerminalNav({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (section: string) => void;
}) {
  const sections = [
    { id: "hero", label: "OVERVIEW" },
    { id: "what", label: "WHAT_THIS_IS" },
    { id: "tracks", label: "TRACKS" },
    { id: "trojan", label: "REQUIREMENTS" },
    { id: "judging", label: "JUDGING" },
    { id: "prizes", label: "PRIZE_POOL" },
    { id: "apply", label: "WHO_SHOULD_APPLY" },
    { id: "timeline", label: "TIMELINE" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="fixed top-0 w-full z-50 bg-black/95 border-b border-green-500/20 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-4 overflow-x-auto">
        <span className="text-green-500/40 text-xs font-bold whitespace-nowrap">
          SYNTHESIS://
        </span>
        <div className="flex gap-1 overflow-x-auto">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`text-xs px-2 py-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === s.id
                  ? "text-green-400 bg-green-500/10"
                  : "text-green-500/40 hover:text-green-400 hover:bg-green-500/5"
              }`}
            >
              /{s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function V4() {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const bootSequence = [
    { cmd: "ssh synthesis@mainframe.eth", delay: 0, speed: 50 },
    {
      cmd: "cat /etc/motd",
      delay: 1200,
      speed: 30,
      output: [
        "╔══════════════════════════════════════════╗",
        "║                                          ║",
        "║        T H E   S Y N T H E S I S         ║",
        "║                                          ║",
        "║   THE FIRST HACKATHON FOR HUMANS AND AI  ║",
        "║                                          ║",
        "╚══════════════════════════════════════════╝",
      ],
    },
    {
      cmd: "echo $STATUS",
      delay: 800,
      speed: 30,
      output: ["CLEARANCE: GRANTED", "CLASSIFICATION: OPEN // ETHEREUM-NATIVE"],
    },
    {
      cmd: "./load-briefing.sh --full",
      delay: 600,
      speed: 25,
      output: ["Loading briefing... [████████████████████] 100%", "Ready."],
    },
  ];

  const advanceBoot = useCallback(() => {
    if (bootStep < bootSequence.length - 1) {
      setBootStep((s) => s + 1);
    } else {
      setTimeout(() => setBootComplete(true), 800);
    }
  }, [bootStep, bootSequence.length]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [bootComplete]);

  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-black text-green-400 terminal-scanlines terminal-flicker"
         style={{ fontFamily: "var(--font-space-mono), var(--font-geist-mono), monospace" }}>

      {/* Boot Sequence */}
      {!bootComplete && (
        <div className="min-h-screen flex flex-col justify-center px-6 max-w-4xl mx-auto">
          <div className="text-sm leading-relaxed">
            {bootSequence.slice(0, bootStep + 1).map((step, i) => (
              <TerminalLine
                key={i}
                command={step.cmd}
                output={step.output}
                delay={i === 0 ? 500 : 0}
                commandSpeed={step.speed}
                onComplete={i === bootStep ? advanceBoot : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {bootComplete && (
        <>
          <TerminalNav activeSection={activeSection} onNavigate={handleNavigate} />

          <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-sm">
            {/* Hero */}
            <motion.div
              id="hero"
              ref={setSectionRef("hero")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="py-16 md:py-24"
            >
              <div className="text-green-500/30 text-xs mb-4">
                ┌─── BRIEFING: THE SYNTHESIS ───────────────────────────────┐
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-400 mb-6 leading-tight">
                THE<br />SYNTHESIS
              </h1>
              <div className="text-green-500/30 text-xs mb-8">
                └──────────────────────────────────────────────────────────┘
              </div>

              <p className="text-green-300/80 text-lg mb-2">
                &gt; {content.hero.subtitle}
              </p>
              <p className="text-green-300/50 italic mb-6">
                # {content.hero.catchphrase}
              </p>
              <p className="text-green-500/40 text-xs mb-8">
                {content.hero.microcopy}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {content.hero.ctas.primary.map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className="border border-green-500/40 px-6 py-2 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all text-xs tracking-wider"
                  >
                    [{cta.label.toUpperCase()}]
                  </a>
                ))}
              </div>

              <div className="mt-8 text-green-500/30 text-xs">
                &gt; {content.hero.ethos}
                <span className="terminal-blink ml-1">█</span>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* What This Is */}
            <motion.div
              id="what"
              ref={setSectionRef("what")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ cat /docs/what-this-is.md
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-400">
                # {content.whatThisIs.title}
              </h2>
              {content.whatThisIs.body.map((p, i) => (
                <p key={i} className="text-green-300/70 mb-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Tracks */}
            <motion.div
              id="tracks"
              ref={setSectionRef("tracks")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ ls -la /tracks/
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
                # {content.tracks.title}
              </h2>

              {content.tracks.items.map((track, i) => (
                <div key={track.id} className="mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-500/40">drwxr-xr-x</span>
                    <span className="text-green-400 font-bold">
                      {track.name}
                    </span>
                  </div>
                  <p className="text-green-300/60 ml-4 mb-4">
                    &gt; {track.tagline}
                  </p>

                  {track.examples && (
                    <div className="ml-4 border-l border-green-500/20 pl-4">
                      <div className="text-green-500/40 text-xs mb-2">
                        // Examples:
                      </div>
                      {track.examples.map((ex, j) => (
                        <div key={j} className="text-green-300/50 mb-1">
                          <span className="text-green-500/30 mr-2">├──</span>
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}

                  {track.details && (
                    <div className="ml-4 border-l border-green-500/20 pl-4 mt-3">
                      <div className="text-green-500/40 text-xs mb-2">
                        // How it works:
                      </div>
                      {track.details.map((d, j) => (
                        <div key={j} className="text-green-300/50 mb-1">
                          <span className="text-green-500/30 mr-2">├──</span>
                          {d}
                        </div>
                      ))}
                    </div>
                  )}

                  {track.note && (
                    <div className="ml-4 mt-3 border border-green-500/20 px-3 py-2 text-green-400/40 text-xs inline-block">
                      ⚠ {track.note}
                    </div>
                  )}

                  {track.wants && (
                    <div className="ml-4 mt-3">
                      <div className="text-green-500/50 text-xs mb-1">
                        // WANTED:
                      </div>
                      {track.wants.map((w, j) => (
                        <div key={j} className="text-green-300/50 mb-1">
                          <span className="text-green-500/30 mr-2">→</span>
                          {w}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Trojan Horse */}
            <motion.div
              id="trojan"
              ref={setSectionRef("trojan")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ cat /docs/requirements.md --classified
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-400">
                # {content.trojanHorse.title}
              </h2>
              <div className="border border-green-500/30 p-6">
                <div className="text-yellow-500/70 text-xs mb-4">
                  ⚠ CLASSIFIED — MANDATORY REQUIREMENTS
                </div>
                {content.trojanHorse.body.map((p, i) => (
                  <p key={i} className="text-green-300/70 mb-4 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Judging */}
            <motion.div
              id="judging"
              ref={setSectionRef("judging")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ ./describe-judging --verbose
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-green-400">
                # {content.judging.title}
              </h2>
              <p className="text-green-500/40 text-xs mb-8">
                // {content.judging.subtitle}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {content.judging.juries.map((jury, i) => (
                  <div key={i} className="border border-green-500/20 p-5">
                    <div className="text-green-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-green-500/30">{i === 0 ? "👤" : "🤖"}</span>
                      {jury.name}
                    </div>
                    <p className="text-green-300/50 text-xs leading-relaxed">
                      {jury.criteria}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-green-500/40 text-xs mb-4">
                // {content.judging.whatWins.title}:
              </div>
              {content.judging.whatWins.items.map((item, i) => (
                <div key={i} className="text-green-300/60 mb-2 flex gap-3">
                  <span className="text-green-500/30">[✓]</span>
                  {item}
                </div>
              ))}
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Prize Pool */}
            <motion.div
              id="prizes"
              ref={setSectionRef("prizes")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ query-prizes --format=table
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-400">
                # {content.prizes.title}
              </h2>

              <div className="text-3xl md:text-5xl font-bold text-green-400 mb-2">
                {content.prizes.total}
              </div>
              <p className="text-green-500/40 mb-8">// {content.prizes.note}</p>

              <div className="border border-green-500/20">
                <div className="border-b border-green-500/20 px-4 py-2 flex gap-4 text-green-500/40 text-xs">
                  <span className="w-8">IDX</span>
                  <span>CATEGORY</span>
                </div>
                {content.prizes.categories.map((cat, i) => (
                  <div
                    key={i}
                    className="border-b border-green-500/10 px-4 py-2 flex gap-4 text-green-300/60 hover:bg-green-500/5 transition-colors"
                  >
                    <span className="w-8 text-green-500/30">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span>{cat}</span>
                  </div>
                ))}
              </div>

              <p className="text-green-500/30 text-xs mt-6">
                # {content.prizes.sponsorCallout}
              </p>
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Who Should Apply */}
            <motion.div
              id="apply"
              ref={setSectionRef("apply")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ whoami --eligible
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
                # {content.whoShouldApply.title}
              </h2>

              <div className="space-y-4">
                {content.whoShouldApply.groups.map((group, i) => (
                  <div
                    key={i}
                    className="border border-green-500/20 p-5 hover:border-green-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-500/40">
                        {i === 0 ? "👤" : i === 1 ? "🤖" : "💰"}
                      </span>
                      <span className="text-green-400 font-bold">
                        {group.name}
                      </span>
                    </div>
                    <p className="text-green-300/50 ml-6">
                      {group.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Timeline */}
            <motion.div
              id="timeline"
              ref={setSectionRef("timeline")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ schedule --list
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
                # {content.timeline.title}
              </h2>

              {content.timeline.events.map((event, i) => (
                <div key={i} className="flex items-center gap-4 mb-3">
                  <span className="text-green-500/20 w-3">
                    {i === content.timeline.events.length - 1 ? "└" : "├"}
                  </span>
                  <span className="text-green-300/60 flex-1">
                    {event.label}
                  </span>
                  <span className="text-green-500/40 text-xs font-bold">
                    {event.date}
                  </span>
                </div>
              ))}
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* FAQ */}
            <motion.div
              id="faq"
              ref={setSectionRef("faq")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-green-500/50 text-xs mb-4">
                $ man synthesis
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
                # {content.faq.title}
              </h2>
              <TerminalFAQ items={content.faq.items} />
            </motion.div>

            <div className="text-green-500/20 text-xs my-4 select-none">
              ════════════════════════════════════════════════════════════════
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-16 text-center"
            >
              <p className="text-green-300/40 mb-8 max-w-2xl mx-auto leading-relaxed">
                {content.footer.body}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                {content.hero.ctas.primary.map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className="border border-green-500/40 px-6 py-2 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all text-xs tracking-wider"
                  >
                    [{cta.label.toUpperCase()}]
                  </a>
                ))}
              </div>

              <div className="text-green-500/20 text-xs">
                <p>synthesis@mainframe.eth ~ $ logout</p>
                <p className="mt-2">{content.hero.ethos}</p>
                <p className="mt-1">Connection closed.</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
