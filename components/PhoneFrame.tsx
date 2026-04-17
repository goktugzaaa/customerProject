"use client";

import { useEffect, useState, type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PHONE_W = 390;
const PHONE_H = 844;
const PAD = 40; // px padding on each side

function usePhoneScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function calc() {
      const sw = (window.innerWidth - PAD * 2) / PHONE_W;
      const sh = (window.innerHeight - PAD * 2) / PHONE_H;
      setScale(Math.min(1, sw, sh));
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return scale;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const scale = usePhoneScale();

  return (
    <div className="phone-frame-wrapper">
      <div
        className="phone-frame-scaler"
        style={{ transform: `scale(${scale})` }}
      >
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
    </div>
  );
}
