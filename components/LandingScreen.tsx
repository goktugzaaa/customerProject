"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface LandingScreenProps {
  onLetsGo: () => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

/* ── Timing ─────────────────────────────────────────────────── */
const LOGO_FADE  = 0.55;  // fade-in duration
const LOGO_HOLD  = 1.40;  // rest at centre before content appears
const SCALE_DUR  = 0.80;  // scale-down duration (overlaps with layout shift)
const SLIDE_DUR  = 1.10;  // layout shift (logo sliding up) duration

const copyContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: SLIDE_DUR * 0.55,
    },
  },
};

const copyBlock = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

export default function LandingScreen({ onLetsGo }: LandingScreenProps) {
  const [settled, setSettled] = useState(false);

  // After the hold, reveal content — the layout shift will be animated
  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), (LOGO_FADE + LOGO_HOLD) * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full opacity-25 blur-[90px]"
        style={{ background: "var(--accent)" }}
      />

      {/* Single flex column — logo is the only child initially,
          so justify-center places it at the dead centre.
          When content appears, the logo naturally shifts up
          and `layout` animates that shift smoothly. */}
      <LayoutGroup>
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10">
          {/* ── LOGO ──────────────────────────────────────── */}
          <motion.div
            layout
            layoutId="brand-logo"
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              layout: { duration: SLIDE_DUR, ease: [0.33, 0.0, 0.15, 1.0] },
              opacity: { duration: LOGO_FADE, ease: "easeOut" },
              scale: { duration: SCALE_DUR, ease: easeOut, delay: LOGO_HOLD * 0.5 },
            }}
            className="relative mb-8 text-center"
          >
            <div
              className="flex items-stretch justify-center gap-x-1.5 text-[var(--accent)] sm:gap-x-2"
              aria-label="Icon of the Seas"
            >
              <span className="flex items-center text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                ICON
              </span>
              <div className="flex min-w-[1.4rem] flex-col items-center justify-center gap-0 text-center sm:min-w-[1.65rem]">
                <span className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
                  OF
                </span>
                <span className="-mt-px text-[11px] font-bold uppercase leading-none tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
                  THE
                </span>
              </div>
              <span className="flex items-center text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                SEAS
              </span>
            </div>
          </motion.div>

          {/* ── CONTENT (appears after hold, pushes logo up) ─ */}
          <AnimatePresence>
            {settled && (
              <motion.div
                key="content-block"
                variants={copyContainer}
                initial="hidden"
                animate="show"
                className="relative max-w-[300px] text-center"
              >
                <motion.div variants={copyBlock}>
                  <p className="text-2xl font-bold leading-tight tracking-tight text-foreground">
                    TURN YOUR
                  </p>
                  <p className="mt-4 text-xl font-semibold uppercase tracking-wide text-[var(--accent)]">
                    cruise
                  </p>
                  <p className="mt-2 text-sm leading-snug text-muted">
                    VALUED AT $150
                    <br />
                    <span className="opacity-75">(yours for free!)</span>
                  </p>
                </motion.div>
                <motion.div variants={copyBlock} className="mt-8">
                  <p className="text-2xl font-bold leading-tight text-foreground">
                    INTO YOUR
                  </p>
                  <p className="mt-2 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
                    SONG
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {settled && (
              <motion.button
                key="cta-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: SLIDE_DUR * 0.6 + 0.30, duration: 0.48, ease: easeOut }}
                type="button"
                onClick={onLetsGo}
                whileTap={{ scale: 0.97 }}
                className="mt-12 w-full max-w-[280px] rounded-2xl bg-[var(--accent)] py-4 text-base font-bold uppercase tracking-widest text-white shadow-md active:brightness-95"
              >
                LET&apos;S GO!
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {settled && (
              <motion.p
                key="powered-by"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: SLIDE_DUR * 0.6 + 0.42, duration: 0.4 }}
                className="mt-6 text-center text-[10px] uppercase tracking-[0.35em] text-muted"
              >
                Powered by SongZoo
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}
