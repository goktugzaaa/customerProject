"use client";

import { motion } from "framer-motion";
import BrandedHeader from "./BrandedHeader";

interface LandingScreenProps {
  onLetsGo: () => void;
}

export default function LandingScreen({ onLetsGo }: LandingScreenProps) {
  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden">
      <BrandedHeader />
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full opacity-25 blur-[90px] pointer-events-none"
          style={{ background: "var(--gradient-primary)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center max-w-[300px]"
        >
          <p className="text-white/90 text-2xl font-bold leading-tight tracking-tight">
            TURN YOUR
          </p>
          <p className="mt-4 text-[var(--accent-light)] text-xl font-semibold uppercase tracking-wide">
            cruise
          </p>
          <p className="mt-2 text-white/45 text-sm leading-snug">
            VALUED AT $150
            <br />
            <span className="text-white/30">(yours for free!)</span>
          </p>
          <p className="mt-8 text-white/90 text-2xl font-bold leading-tight">
            INTO YOUR
          </p>
          <p className="mt-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400">
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
          className="mt-12 w-full max-w-[280px] py-4 rounded-2xl text-white font-bold text-base uppercase tracking-widest relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          }}
        >
          LET&apos;S GO!
        </motion.button>
      </div>
    </div>
  );
}
