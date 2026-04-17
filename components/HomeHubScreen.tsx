"use client";

import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";

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
        <div className="space-y-3">
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
            onClick={onSongSetup}
            done={songSetupComplete}
          />
          {!presentationMode && (
            <>
              <HubCard
                title="DAILY HIGHLIGHT"
                subtitle="(Takes only 1 minute per day)"
                disabled={!songSetupComplete}
                onClick={onDailyHighlight}
                done={highlightsComplete}
              />
              <HubCard
                title="QUICK SURVEY"
                subtitle="(Takes only 5 minutes – end of cruise)"
                disabled={!surveyUnlocked}
                onClick={onQuickSurvey}
                done={false}
              />
            </>
          )}
        </div>

        <p className="mt-8 text-[13px] text-muted text-center leading-relaxed px-2">
          {presentationMode
            ? "Preview build — more flows unlock in the full release."
            : "We'll create your fully personalized song and email it to you 24-48 hours after your cruise – all for free!"}
        </p>
        </div>
      </div>
    </div>
  );
}

function HubCard({
  title,
  subtitle,
  disabled,
  onClick,
  done,
}: {
  title: string;
  subtitle: string;
  disabled: boolean;
  onClick: () => void;
  done: boolean;
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick()}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`w-full text-left rounded-2xl border px-4 py-4 flex items-center gap-3 transition-colors ${
        disabled
          ? "border-[var(--surface-border)] bg-[var(--surface)] opacity-40 cursor-not-allowed"
          : "border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)]/35"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          done ? "bg-emerald-500/15" : "bg-[var(--surface-light)]"
        }`}
      >
        {done ? (
          <Check className="w-5 h-5 text-emerald-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-foreground leading-tight">
          {title}
        </div>
        <div className="text-[11px] text-muted mt-1 leading-snug">
          {subtitle}
        </div>
      </div>
    </motion.button>
  );
}
