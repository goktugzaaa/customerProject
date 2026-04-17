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
        style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)" }}
      />

      {/* Phone body */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] overflow-hidden border border-white/[0.08] bg-[var(--surface)] shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="absolute inset-0 flex flex-col bg-[var(--background)]">
          {children}
        </div>
      </div>
    </div>
  );
}
