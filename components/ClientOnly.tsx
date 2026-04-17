"use client";

import { useState, useEffect, type ReactNode } from "react";

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--background)]">
        <div
          className="w-12 h-12 rounded-2xl animate-pulse"
          style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)" }}
        />
      </div>
    );
  }

  return <>{children}</>;
}
