"use client";

import { motion } from "framer-motion";
import type { ScreenOption } from "@/lib/screens";

interface ButtonGroupProps {
  options: ScreenOption[];
  value?: string;
  onChange?: (val: string) => void;
}

export default function ButtonGroup({
  options,
  value,
  onChange,
}: ButtonGroupProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt, i) => {
        const selected = value === opt.value;

        return (
          <motion.button
            key={opt.value}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.1 + i * 0.08,
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            onClick={() => onChange?.(opt.value)}
            whileTap={{ scale: 0.98 }}
            className={`
              option-card
              flex items-center gap-4 px-5 py-4 rounded-2xl border
              text-left
              ${
                selected
                  ? "border-transparent text-white shadow-lg"
                  : "bg-[var(--surface)] text-foreground border-[var(--surface-border)] hover:border-[var(--accent)]/35"
              }
            `}
            style={
              selected ? { background: "var(--accent)" } : undefined
            }
          >
            <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{opt.label}</span>
              {opt.description && (
                <span
                  className={`text-xs mt-0.5 ${
                    selected ? "text-white/80" : "text-muted"
                  }`}
                >
                  {opt.description}
                </span>
              )}
            </div>
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
