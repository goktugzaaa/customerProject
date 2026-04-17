"use client";

import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[var(--viewport)]">
      <div
        className="w-12 h-12 rounded-2xl animate-pulse"
        style={{ background: "var(--accent)" }}
      />
    </div>
  ),
});

export default function Page() {
  return <AppShell />;
}
