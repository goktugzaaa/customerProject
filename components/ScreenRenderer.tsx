"use client";

import { motion } from "framer-motion";
import {
  Music,
  Mic,
  Smile,
  AlertCircle,
  Users,
  Mail,
  Ticket,
} from "lucide-react";
import Input from "./Input";
import ButtonGroup from "./ButtonGroup";
import type { Screen } from "@/lib/screens";
import type { ScreenOption } from "@/lib/screens";

const iconMap: Record<string, React.ElementType> = {
  music: Music,
  mic: Mic,
  smile: Smile,
  alert: AlertCircle,
  users: Users,
  mail: Mail,
  ticket: Ticket,
};

function ProfanityRow({
  options,
  value,
  onChange,
}: {
  options: ScreenOption[];
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((opt, i) => {
        const selected = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.08 + i * 0.06,
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            onClick={() => onChange?.(opt.value)}
            whileTap={{ scale: 0.97 }}
            className={`
              flex flex-col items-center justify-center rounded-2xl border px-2 py-4 min-h-[100px]
              ${
                selected
                  ? "border-transparent bg-[var(--accent)] text-white shadow-lg"
                  : "bg-[var(--surface)] text-foreground border-[var(--surface-border)] hover:border-[var(--accent)]/35"
              }
            `}
          >
            <span className="text-sm font-semibold text-center leading-tight">
              {opt.label}
            </span>
            {opt.symbolLine && (
              <span
                className={`text-[11px] mt-2 font-mono ${
                  selected ? "text-white/85" : "text-muted"
                }`}
              >
                {opt.symbolLine}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

interface ScreenRendererProps {
  data: Screen;
  value?: string;
  onChange?: (val: string) => void;
  termsAccepted?: boolean;
  onTermsChange?: (accepted: boolean) => void;
}

export default function ScreenRenderer({
  data,
  value,
  onChange,
  termsAccepted = false,
  onTermsChange,
}: ScreenRendererProps) {
  if (!data) return null;

  const Icon = data.icon ? iconMap[data.icon] : null;

  return (
    <div className="h-full w-full flex justify-center px-6 pt-6 pb-4 overflow-y-auto">
      <div className="w-full max-w-md flex flex-col h-full">
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0, 0.55, 0.45, 1] }}
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: "var(--accent)",
            }}
          >
            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
          </motion.div>
        )}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="text-[11px] text-[var(--accent-light)] uppercase tracking-[0.25em] font-medium"
        >
          {data.title}
        </motion.div>

        <motion.h2
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-3 text-[22px] font-bold text-foreground leading-snug"
        >
          {data.questions}
        </motion.h2>

        <div className="mt-7">
          {data.type === "input" && (
            <Input
              value={value}
              onChange={onChange}
              placeholder={data.placeholder}
            />
          )}
          {data.type === "buttons" && data.options && (
            <ButtonGroup
              options={data.options}
              value={value}
              onChange={onChange}
            />
          )}
          {data.type === "profanity" && data.options && (
            <ProfanityRow
              options={data.options}
              value={value}
              onChange={onChange}
            />
          )}
          {data.type === "booking" && (
            <div className="space-y-5">
              <Input
                value={value}
                onChange={onChange}
                placeholder={data.placeholder}
              />
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => onTermsChange?.(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[var(--surface-border)] bg-[var(--surface)] accent-[var(--accent)]"
                />
                <span className="text-[13px] text-muted leading-snug group-hover:text-foreground transition-colors">
                  I agree to the SongZoo Terms of Service
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="flex-1 min-h-3" />

        {data.description && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[13px] text-muted leading-relaxed pb-4"
          >
            {data.description}
          </motion.div>
        )}
      </div>
    </div>
  );
}
