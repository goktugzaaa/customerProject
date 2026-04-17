"use client";

import { motion } from "framer-motion";
import { ChevronRight, Check, Lock } from "lucide-react";

interface HomeHubScreenProps {
  songSetupComplete: boolean;
  highlightsComplete: boolean;
  surveyUnlocked: boolean;
  onSongSetup: () => void;
  onDailyHighlight: () => void;
  onQuickSurvey: () => void;
  /** Sunum modu: yalnızca Song Setup kartı */
  presentationMode?: boolean;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export default function HomeHubScreen({
  songSetupComplete,
  highlightsComplete,
  surveyUnlocked,
  onSongSetup,
  onDailyHighlight,
  onQuickSurvey,
  presentationMode = false,
}: HomeHubScreenProps) {
  return (
    <div className="h-full w-full flex min-h-0 flex-col overflow-y-auto">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-8">
        <div className="my-auto w-full py-4">
          {/* ── Cards ──────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <HubCard
              title={
                songSetupComplete
                  ? "DONE! (Tap here to edit)"
                  : "SONG SETUP"
              }
              subtitle={
                songSetupComplete
                  ? "Your preferences are saved"
                  : "(Takes only 2 minutes – one time)"
              }
              disabled={false}
              active={!songSetupComplete}
              onClick={onSongSetup}
              done={songSetupComplete}
            />
            <HubCard
              title="DAILY HIGHLIGHT"
              subtitle="(Takes only 1 minute per day)"
              disabled={!songSetupComplete}
              active={songSetupComplete && !highlightsComplete}
              onClick={onDailyHighlight}
              done={highlightsComplete}
            />
            <HubCard
              title="QUICK SURVEY"
              subtitle="(Takes only 5 minutes – end of cruise)"
              disabled={!surveyUnlocked}
              active={surveyUnlocked}
              onClick={onQuickSurvey}
              done={false}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mt-8 text-[13px] text-muted text-center leading-relaxed px-2"
          >
            {presentationMode
              ? "Preview build — more flows unlock in the full release."
              : "We'll create your fully personalized song and email it to you 24-48 hours after your cruise – all for free!"}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function HubCard({
  title,
  subtitle,
  disabled,
  active,
  onClick,
  done,
}: {
  title: string;
  subtitle: string;
  disabled: boolean;
  active: boolean;
  onClick: () => void;
  done: boolean;
}) {
  return (
    <motion.button
      variants={cardVariant}
      type="button"
      disabled={disabled && !done}
      onClick={() => !disabled && onClick()}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`w-full text-left rounded-2xl border px-4 py-4 flex items-center gap-3 transition-all duration-300 ${
        done
          ? "border-emerald-200 bg-emerald-50/60"
          : active
            ? "border-[var(--accent)]/30 bg-white shadow-md shadow-blue-500/8 ring-1 ring-[var(--accent)]/10"
            : "border-[var(--surface-border)] bg-[var(--surface)] opacity-45 cursor-not-allowed"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
          done
            ? "bg-emerald-500/15"
            : active
              ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm shadow-blue-500/25"
              : "bg-[var(--surface-light)]"
        }`}
      >
        {done ? (
          <Check className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
        ) : disabled ? (
          <Lock className="w-4 h-4 text-muted" strokeWidth={2} />
        ) : (
          <ChevronRight className={`w-5 h-5 ${active ? "text-white" : "text-muted"}`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[15px] font-semibold leading-tight ${
            done
              ? "text-emerald-700"
              : active
                ? "text-foreground"
                : "text-foreground/50"
          }`}
        >
          {title}
        </div>
        <div
          className={`text-[11px] mt-1 leading-snug ${
            done
              ? "text-emerald-600/70"
              : active
                ? "text-muted"
                : "text-muted/60"
          }`}
        >
          {subtitle}
        </div>
      </div>
      {/* Right arrow for active cards */}
      {active && !done && (
        <ChevronRight className="w-5 h-5 text-[var(--accent)] flex-shrink-0" strokeWidth={2} />
      )}
    </motion.button>
  );
}
