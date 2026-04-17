"use client";

import { motion } from "framer-motion";

interface NotificationScreenProps {
  onAllow: () => void;
  onNoThanks: () => void;
}

export default function NotificationScreen({
  onAllow,
  onNoThanks,
}: NotificationScreenProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex flex-col px-6 pb-10 justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground text-center"
        >
          WELL DONE!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-5 text-[14px] text-muted text-center leading-relaxed"
        >
          You have successfully completed your song setup.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-[14px] text-muted text-center leading-relaxed"
        >
          Once a day, simply record a 30-second highlight of your day. We can
          send you a daily reminder (recommended so you don&apos;t forget). If
          you would like to turn the daily reminder on, simply press the
          &quot;ALLOW&quot; button below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10 space-y-3"
        >
          <button
            type="button"
            onClick={onAllow}
            className="w-full rounded-2xl bg-[var(--accent)] py-4 font-semibold uppercase tracking-wide text-white shadow-md active:brightness-95"
          >
            ALLOW
          </button>
          <button
            type="button"
            onClick={onNoThanks}
            className="w-full py-4 rounded-2xl border border-[var(--surface-border)] text-foreground font-medium bg-[var(--surface)]"
          >
            NO THANKS
          </button>
        </motion.div>
      </div>
    </div>
  );
}
