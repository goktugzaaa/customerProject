"use client";

import { motion } from "framer-motion";

const AMENITIES = [
  "Spa",
  "Pool",
  "Fitness Center",
  "Casino",
  "Kids' Club",
  "Shops",
] as const;

interface Survey1Props {
  recommend: string;
  cleanliness: string;
  staff: string;
  onChange: (field: "recommend" | "cleanliness" | "staff", v: string) => void;
  onNext: () => void;
}

export function SurveyRatingsScreen({
  recommend,
  cleanliness,
  staff,
  onChange,
  onNext,
}: Survey1Props) {
  const nps = Array.from({ length: 11 }, (_, i) => String(i));
  const likert = ["1", "2", "3", "4", "5"];

  const canNext =
    recommend !== "" && cleanliness !== "" && staff !== "";

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="px-5 pb-8 flex-1 pt-2">
        <ScaleBlock
          title="How likely are you to recommend this cruise to others?"
          values={nps}
          value={recommend}
          onPick={(v) => onChange("recommend", v)}
        />
        <ScaleBlock
          title="How would you rate the overall cleanliness of the ship?"
          values={likert}
          value={cleanliness}
          onPick={(v) => onChange("cleanliness", v)}
        />
        <ScaleBlock
          title="How would you rate the overall friendliness of the staff?"
          values={likert}
          value={staff}
          onPick={(v) => onChange("staff", v)}
        />

        <motion.button
          type="button"
          disabled={!canNext}
          onClick={onNext}
          whileTap={canNext ? { scale: 0.98 } : undefined}
          className={`mt-8 w-full py-4 rounded-2xl font-semibold ${
            canNext
              ? "bg-[var(--accent)] text-white shadow-md active:brightness-95"
              : "text-muted bg-[var(--surface-light)] cursor-not-allowed"
          }`}
        >
          NEXT &gt;
        </motion.button>
      </div>
    </div>
  );
}

function ScaleBlock({
  title,
  values,
  value,
  onPick,
}: {
  title: string;
  values: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="mb-8">
      <p className="text-[15px] font-semibold text-foreground leading-snug mb-3">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => {
          const sel = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onPick(v)}
              className={`min-w-[40px] py-2 px-3 rounded-xl text-sm font-medium border ${
                sel
                  ? "border-transparent bg-[var(--accent)] text-white"
                  : "border-[var(--surface-border)] text-muted bg-[var(--surface)]"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Survey2Props {
  selected: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}

export function SurveyAmenitiesScreen({
  selected,
  onToggle,
  onNext,
}: Survey2Props) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="px-5 pb-8 flex-1 pt-4">
        <p className="text-[15px] font-semibold text-foreground leading-snug mb-5">
          Which onboard amenities did you use during your cruise? (Select all
          that apply)
        </p>
        <div className="grid grid-cols-2 gap-3">
          {AMENITIES.map((a) => {
            const on = selected.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => onToggle(a)}
                className={`py-4 px-3 rounded-2xl text-sm font-medium border text-left ${
                  on
                    ? "border-transparent bg-[var(--accent)] text-white"
                    : "border-[var(--surface-border)] text-foreground bg-[var(--surface)]"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
        <motion.button
          type="button"
          onClick={onNext}
          whileTap={{ scale: 0.98 }}
          className="mt-10 w-full rounded-2xl bg-[var(--accent)] py-4 font-semibold text-white shadow-md active:brightness-95"
        >
          NEXT &gt;
        </motion.button>
      </div>
    </div>
  );
}

interface Survey3Props {
  text: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export function SurveySuggestionsScreen({
  text,
  onChange,
  onSend,
}: Survey3Props) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="px-5 pb-8 flex-1 pt-4 flex flex-col">
        <p className="text-[15px] font-semibold text-foreground leading-snug mb-4">
          Do you have any suggestions or ideas on how we could mak your next
          cruise with us more enjoyable?
        </p>
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] text-foreground text-sm flex-1 min-h-[140px]"
        />
        <motion.button
          type="button"
          onClick={onSend}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full rounded-2xl bg-[var(--accent)] py-4 font-bold uppercase tracking-wide text-white shadow-md active:brightness-95"
        >
          SEND!
        </motion.button>
      </div>
    </div>
  );
}

interface ThankYouProps {
  onOk: () => void;
  isSending?: boolean;
  sendError?: string | null;
}

export function ThankYouScreen({
  onOk,
  isSending = false,
  sendError = null,
}: ThankYouProps) {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <h2 className="text-2xl font-bold text-foreground text-center">
          THANK YOU!
        </h2>
        <p className="mt-6 text-[14px] text-muted text-center leading-relaxed">
          We really appreciate your feedback.
        </p>
        <p className="mt-4 text-[14px] text-muted text-center leading-relaxed">
          Your personalized souvenir song will be emailed to you within 24-48
          hours and is yours to keep as a &quot;forever&quot; memory!
        </p>
        <p className="mt-4 text-[14px] text-muted text-center leading-relaxed">
          We hope to see you again soon!
        </p>
        {sendError && (
          <p className="mt-6 text-[13px] text-rose-400/90 text-center leading-relaxed max-w-[300px]">
            {sendError}
          </p>
        )}
        <motion.button
          type="button"
          onClick={onOk}
          disabled={isSending}
          whileTap={isSending ? undefined : { scale: 0.97 }}
          className={`mt-10 w-full max-w-[200px] py-4 rounded-2xl border font-semibold ${
            isSending
              ? "border-[var(--surface-border)] text-muted bg-[var(--surface-light)] cursor-wait"
              : "border-[var(--accent)] text-[var(--accent)] bg-[var(--background)]"
          }`}
        >
          {isSending ? "Gönderiliyor…" : "OK"}
        </motion.button>
      </div>
    </div>
  );
}
