"use client";

import { motion } from "framer-motion";

interface PresentationEndScreenProps {
  onRestart: () => void;
}

export default function PresentationEndScreen({
  onRestart,
}: PresentationEndScreenProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[300px] text-center"
      >
        <h2 className="text-2xl font-bold leading-snug text-foreground">
          Thanks for watching
        </h2>
        <p className="mt-5 text-[14px] leading-relaxed text-muted">
          This preview covers the opening flow. Email signup, booking, daily
          highlights, survey, and the rest activate in the full build.
        </p>
        <motion.button
          type="button"
          onClick={onRestart}
          whileTap={{ scale: 0.97 }}
          className="mt-10 w-full max-w-[260px] rounded-2xl bg-[var(--accent)] py-4 text-[15px] font-semibold text-white shadow-md active:brightness-95"
        >
          Start again
        </motion.button>
      </motion.div>
    </div>
  );
}
