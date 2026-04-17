"use client";

import { useState, useEffect, type ReactNode } from "react";
import { VIEWPORT_BACKGROUND } from "@/lib/siteTheme";

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="flex h-screen w-screen items-center justify-center"
        style={{ backgroundColor: VIEWPORT_BACKGROUND }}
      >
        <div
          className="w-12 h-12 rounded-2xl animate-pulse"
          style={{ background: "var(--accent)" }}
        />
      </div>
    );
  }

  return <>{children}</>;
}
