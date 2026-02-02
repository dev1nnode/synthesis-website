"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const versions = [
  {
    path: "/v1",
    name: "Monochrome Minimal",
    description:
      "Black background, white text, very stark. Thin lines, lots of whitespace. Apple-meets-Terminal aesthetic.",
    bg: "bg-black",
    border: "border-white/20 hover:border-white/60",
    accent: "text-white",
  },
  {
    path: "/v2",
    name: "Ethereal Glow",
    description:
      "Dark background with cyan/purple gradient accents. Glowing text, particle constellation animation. Sci-fi feeling.",
    bg: "bg-[#050510]",
    border: "border-cyan-500/20 hover:border-cyan-400/60",
    accent: "text-cyan-400",
  },
  {
    path: "/v3",
    name: "Split Identity",
    description:
      "Page split — left represents humans (warm tones), right represents agents (cool tones), meeting in the middle.",
    bg: "bg-[#0a0a0a]",
    border: "border-amber-500/20 hover:border-amber-400/60",
    accent: "bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-4">
          THE SYNTHESIS
        </h1>
        <p className="text-white/40 text-lg font-light">
          Choose a design direction
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {versions.map((v, i) => (
          <motion.div
            key={v.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
          >
            <Link
              href={v.path}
              className={`block border ${v.border} p-8 transition-all duration-300 hover:scale-[1.02] group`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-white/20 font-mono">
                  V{i + 1}
                </span>
                <h2 className={`text-xl font-light ${v.accent}`}>
                  {v.name}
                </h2>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                {v.description}
              </p>
              <div className="mt-6 text-xs text-white/20 group-hover:text-white/40 transition-colors tracking-wider">
                VIEW →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 text-xs text-white/30 italic"
      >
        Cooperation is optional. Synthesis is inevitable.
      </motion.p>
    </div>
  );
}
