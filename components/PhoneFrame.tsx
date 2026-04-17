"use client";

import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        className="absolute -inset-4 rounded-[52px] opacity-20 blur-2xl pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      {/* Phone body */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] overflow-hidden border border-[var(--surface-border)] bg-white shadow-2xl shadow-slate-900/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-slate-900 rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="absolute inset-0 flex flex-col bg-[var(--background)]">
          {children}
        </div>
      </div>
    </div>
  );
}
