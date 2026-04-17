"use client";

import { motion } from "framer-motion";
import { Music, Sparkles, ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "var(--accent)" }}
      />

      {/* Floating notes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[var(--accent)]/25 text-2xl"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            rotate: [-5, 5, -5],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          ♪
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0, 0.55, 0.45, 1] }}
        className="relative mb-8"
      >
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center relative"
          style={{ background: "var(--accent)" }}
        >
          <Music className="w-10 h-10 text-white" strokeWidth={1.5} />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <div className="text-xs tracking-[0.35em] text-muted uppercase mb-1">
          ICON OF THE SEAS
        </div>
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-3 opacity-80">
          Powered by SongZoo
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3 leading-tight">
          Your Souvenir
          <br />
          <span className="text-[var(--accent)]">Song Awaits</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-[260px] mx-auto">
          Create a personalised song that captures your Icon of the Seas memories
          forever
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={onStart}
        whileTap={{ scale: 0.97 }}
        className="mt-10 flex items-center gap-3 overflow-hidden rounded-2xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-md active:brightness-95"
      >
        Let&apos;s Create Your Song
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-[11px] text-muted opacity-80"
      >
        Takes about 2 minutes
      </motion.p>
    </div>
  );
}
