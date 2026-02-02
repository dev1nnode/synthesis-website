"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
  accentColor?: string;
  borderColor?: string;
  textColor?: string;
}

export function FAQ({
  items,
  accentColor = "text-white",
  borderColor = "border-white/20",
  textColor = "text-white/70",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className={`border-b ${borderColor}`}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`w-full text-left py-5 flex items-center justify-between gap-4 ${accentColor} cursor-pointer`}
          >
            <span className="text-lg font-medium">{item.q}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl flex-shrink-0"
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
                <p className={`pb-5 ${textColor} leading-relaxed`}>
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
