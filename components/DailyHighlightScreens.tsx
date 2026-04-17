"use client";

import { motion } from "framer-motion";

interface DailyListProps {
  completedDays: boolean[];
  onSelectDay: (day: 1 | 2 | 3) => void;
  onBack: () => void;
}

export function DailyHighlightList({
  completedDays,
  onSelectDay,
  onBack,
}: DailyListProps) {
  const labels: [string, string, string] = ["DAY 1", "DAY 2", "DAY 3"];
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center px-5 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="py-2 text-[11px] font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          &lt; Back
        </button>
      </div>
      <div className="flex-1 px-5 pt-6">
        <h2 className="text-lg font-bold text-foreground text-center mb-8">
          DAILY HIGHLIGHT
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {([1, 2, 3] as const).map((day, i) => {
            const done = completedDays[i];
            const canOpen = i === 0 || completedDays[i - 1];
            return (
              <motion.button
                key={day}
                type="button"
                disabled={!canOpen}
                onClick={() => canOpen && onSelectDay(day)}
                whileTap={canOpen ? { scale: 0.97 } : undefined}
                className={`rounded-2xl border py-6 text-center ${
                  done
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-800"
                    : canOpen
                      ? "border-[var(--surface-border)] bg-[var(--surface)] text-foreground"
                      : "border-[var(--surface-border)] bg-[var(--surface-light)] text-muted cursor-not-allowed"
                }`}
              >
                <span className="text-xs font-bold tracking-widest">
                  {labels[i]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const BULLETS = [
  "Speak clearly in a normal tone.",
  "Speak in any language (english gets best results). The language you speak will be the language used for your song lyrics.",
  "Speak about what made today great.",
  "We recommend about 30-60 seconds.",
  "No human will hear what you record.",
  "When you're ready, simply tap the record button below to start.",
] as const;

interface DailyRecordProps {
  day: 1 | 2 | 3;
  onStartRecording: () => void;
  onBack: () => void;
}

export function DailyRecordScreen({
  day,
  onStartRecording,
  onBack,
}: DailyRecordProps) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex items-center px-5 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="py-2 text-[11px] font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          &lt; Back
        </button>
      </div>
      <div className="flex-1 px-5 pb-8">
        <h2 className="text-lg font-bold text-foreground text-center mt-4 mb-6">
          DAY {day}
        </h2>
        <p className="text-foreground font-semibold mb-3">Time to record your highlight!</p>
        <ul className="space-y-3 text-[13px] text-muted leading-relaxed list-disc pl-4">
          {BULLETS.map((b) => (
            <li key={b.slice(0, 24)}>{b}</li>
          ))}
        </ul>
        <motion.button
          type="button"
          onClick={onStartRecording}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full rounded-2xl bg-[var(--accent)] py-4 font-semibold text-white shadow-md active:brightness-95"
        >
          Start recording
        </motion.button>
      </div>
    </div>
  );
}
