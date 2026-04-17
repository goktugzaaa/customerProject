"use client";

import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import BrandedHeader from "./BrandedHeader";

interface HomeHubScreenProps {
  songSetupComplete: boolean;
  highlightsComplete: boolean;
  surveyUnlocked: boolean;
  onSongSetup: () => void;
  onDailyHighlight: () => void;
  onQuickSurvey: () => void;
}

export default function HomeHubScreen({
  songSetupComplete,
  highlightsComplete,
  surveyUnlocked,
  onSongSetup,
  onDailyHighlight,
  onQuickSurvey,
}: HomeHubScreenProps) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <BrandedHeader />
      <div className="px-5 pb-8 flex-1 flex flex-col pt-2">
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
        </div>

        <p className="mt-8 text-[13px] text-white/35 text-center leading-relaxed px-2">
          We&apos;ll create your fully personalized song and email it to you
          24-48 hours after your cruise – all for free!
        </p>
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
          ? "border-white/[0.06] bg-white/[0.02] opacity-40 cursor-not-allowed"
          : "border-white/[0.1] bg-white/[0.04] hover:border-white/20"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          done ? "bg-emerald-500/20" : "bg-white/[0.06]"
        }`}
      >
        {done ? (
          <Check className="w-5 h-5 text-emerald-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white/40" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-white leading-tight">
          {title}
        </div>
        <div className="text-[11px] text-white/35 mt-1 leading-snug">
          {subtitle}
        </div>
      </div>
    </motion.button>
  );
}
