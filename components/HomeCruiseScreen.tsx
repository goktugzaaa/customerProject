"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import BrandedHeader from "./BrandedHeader";

interface HomeCruiseScreenProps {
  onOpenHub: () => void;
  onStartHighlight: () => void;
}

export default function HomeCruiseScreen({
  onOpenHub,
  onStartHighlight,
}: HomeCruiseScreenProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <BrandedHeader />
      <div className="px-5 flex items-center justify-end">
        <button
          type="button"
          onClick={onOpenHub}
          className="text-[11px] text-white/35 hover:text-white/55 uppercase tracking-widest"
        >
          Menu
        </button>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-3xl font-light text-white tabular-nums">20:30</p>
          <p className="text-sm text-white/40 mt-1">Tuesday 27th August</p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onStartHighlight}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 flex-1 max-h-[320px] rounded-3xl border border-white/10 bg-white/[0.04] flex flex-col items-center justify-center px-6"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            }}
          >
            <Mic className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <p className="text-xl font-bold text-white text-center">
            How was Cozumel?
          </p>
          <p className="text-[13px] text-white/40 text-center mt-3 leading-relaxed">
            Tap to record today&apos;s 30-second highlight.
          </p>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-[var(--accent-light)] mt-6 font-medium"
        >
          Your personalized song is 60% complete!
        </motion.p>
      </div>
    </div>
  );
}
