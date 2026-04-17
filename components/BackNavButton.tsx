"use client";

import { ChevronLeft } from "lucide-react";

type BackNavButtonProps = {
  onClick: () => void;
  label?: string;
};

export default function BackNavButton({
  onClick,
  label = "Back",
}: BackNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm transition-colors hover:border-[var(--accent)]/30 hover:bg-[var(--surface-light)] active:brightness-[0.97]"
    >
      <ChevronLeft
        className="-ml-0.5 size-5 shrink-0 text-[var(--accent)]"
        strokeWidth={2.25}
        aria-hidden
      />
      {label}
    </button>
  );
}
