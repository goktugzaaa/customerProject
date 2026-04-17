"use client";

import { motion } from "framer-motion";

interface LandingScreenProps {
  onLetsGo: () => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const copyContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.58,
    },
  },
};

const copyBlock = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export default function LandingScreen({ onLetsGo }: LandingScreenProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10">
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full opacity-25 blur-[90px]"
          style={{ background: "var(--accent)" }}
        />

        {/* Aynı yerleşim / boyutlar; sadece ilk kare: biraz büyük + hafif aşağı (görsel ortaya yakın), sonra yerine */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1, y: 72 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.88, ease: easeOut }}
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

        <motion.div
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

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.02, duration: 0.48, ease: easeOut }}
          type="button"
          onClick={onLetsGo}
          whileTap={{ scale: 0.97 }}
          className="mt-12 w-full max-w-[280px] rounded-2xl bg-[var(--accent)] py-4 text-base font-bold uppercase tracking-widest text-white shadow-md active:brightness-95"
        >
          LET&apos;S GO!
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.4 }}
          className="mt-6 text-center text-[10px] uppercase tracking-[0.35em] text-muted"
        >
          Powered by SongZoo
        </motion.p>
      </div>
    </div>
  );
}
