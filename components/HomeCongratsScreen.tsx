"use client";

import { motion } from "framer-motion";

interface HomeCongratsScreenProps {
  onLetsGoSurvey: () => void;
}

export default function HomeCongratsScreen({
  onLetsGoSurvey,
}: HomeCongratsScreenProps) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex-1 flex flex-col items-center px-6 pb-10 pt-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground leading-snug">
            CONGRATULATIONS!
          </h2>
          <p className="mt-5 text-[14px] text-muted leading-relaxed">
            Your personalized souvenir song is successfully completed and
            submitted to our AI studio for lyric and music creation.
          </p>
          <p className="mt-4 text-[14px] text-muted leading-relaxed">
            When finished, your song will be emailed to you within 24-48 hours
            and is yours to keep as a &quot;forever&quot; memory!
          </p>
          <p className="mt-4 text-[14px] text-muted leading-relaxed">
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
          className="mt-10 w-full max-w-[280px] rounded-2xl bg-[var(--accent)] py-4 text-base font-bold uppercase tracking-widest text-white shadow-md active:brightness-95"
        >
          LET&apos;S GO!
        </motion.button>
      </div>
    </div>
  );
}
