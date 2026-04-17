"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, RotateCcw } from "lucide-react";

interface CompletionScreenProps {
  onRestart: () => void;
}

export default function CompletionScreen({ onRestart }: CompletionScreenProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full opacity-25 blur-[80px]"
        style={{ background: "var(--accent)" }}
      />

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0, 0.55, 0.45, 1] }}
        className="relative mb-8"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "var(--accent)" }}
        >
          <Check className="w-9 h-9 text-white" strokeWidth={2.5} />
        </div>
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{
            rotate: [0, 20, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-6 h-6 text-amber-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          You&apos;re All Set!
        </h2>
        <p className="text-muted text-sm leading-relaxed max-w-[260px] mx-auto">
          Your souvenir song preferences have been saved. SongZoo will start
          crafting your personalised track for Icon of the Seas.
        </p>
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="glass-strong rounded-2xl p-5 mt-8 w-full max-w-[280px]"
      >
        <div className="text-xs text-muted uppercase tracking-widest mb-3">
          What happens next
        </div>
        <div className="space-y-3">
          {[
            "Our AI analyses your preferences",
            "Your unique song is composed",
            "Review & download your track",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ background: "var(--accent)" }}
              >
                {i + 1}
              </div>
              <span className="text-sm text-muted">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="mt-6 text-[10px] uppercase tracking-[0.28em] text-muted opacity-80"
      >
        Powered by SongZoo
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        onClick={onRestart}
        className="mt-5 flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Start Over
      </motion.button>
    </div>
  );
}
