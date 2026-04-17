"use client";

import { motion } from "framer-motion";
import BrandedHeader from "./BrandedHeader";

interface HomeCongratsScreenProps {
  onLetsGoSurvey: () => void;
}

export default function HomeCongratsScreen({
  onLetsGoSurvey,
}: HomeCongratsScreenProps) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <BrandedHeader />
      <div className="flex-1 flex flex-col items-center px-6 pb-10 pt-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white leading-snug">
            CONGRATULATIONS!
          </h2>
          <p className="mt-5 text-[14px] text-white/45 leading-relaxed">
            Your personalized souvenir song is successfully completed and
            submitted to our AI studio for lyric and music creation.
          </p>
          <p className="mt-4 text-[14px] text-white/45 leading-relaxed">
            When finished, your song will be emailed to you within 24-48 hours
            and is yours to keep as a &quot;forever&quot; memory!
          </p>
          <p className="mt-4 text-[14px] text-white/45 leading-relaxed">
            Only one last step needed: take 5-10 minutes to tell us what you
            think about your time with us. We look forward to hearing what you
            thought!
          </p>
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={onLetsGoSurvey}
          whileTap={{ scale: 0.97 }}
          className="mt-10 w-full max-w-[280px] py-4 rounded-2xl text-white font-bold text-base uppercase tracking-widest"
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
