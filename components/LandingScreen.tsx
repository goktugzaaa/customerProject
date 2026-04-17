"use client";

import { motion } from "framer-motion";

interface LandingScreenProps {
  onLetsGo: () => void;
}

export default function LandingScreen({ onLetsGo }: LandingScreenProps) {
  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full opacity-25 blur-[90px] pointer-events-none"
          style={{ background: "var(--accent)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center max-w-[300px]"
        >
          <div
            className="mb-8 flex items-stretch justify-center gap-x-1.5 text-[var(--accent)] sm:gap-x-2"
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
          <p className="text-foreground text-2xl font-bold leading-tight tracking-tight">
            TURN YOUR
          </p>
          <p className="mt-4 text-[var(--accent)] text-xl font-semibold uppercase tracking-wide">
            cruise
          </p>
          <p className="mt-2 text-muted text-sm leading-snug">
            VALUED AT $150
            <br />
            <span className="opacity-75">(yours for free!)</span>
          </p>
          <p className="mt-8 text-foreground text-2xl font-bold leading-tight">
            INTO YOUR
          </p>
          <p className="mt-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500">
            SONG
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          type="button"
          onClick={onLetsGo}
          whileTap={{ scale: 0.97 }}
          className="mt-12 w-full max-w-[280px] py-4 rounded-2xl bg-[var(--accent)] text-white font-bold text-base uppercase tracking-widest shadow-md active:brightness-95"
        >
          LET&apos;S GO!
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-6 text-center text-[10px] uppercase tracking-[0.35em] text-muted"
        >
          Powered by SongZoo
        </motion.p>
      </div>
    </div>
  );
}
