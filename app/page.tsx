"use client";

import dynamic from "next/dynamic";
import { VIEWPORT_OUTER_HEX } from "@/lib/pageBackground";

const AppShell = dynamic(() => import("@/components/AppShell"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-screen w-screen items-center justify-center"
      style={{ backgroundColor: VIEWPORT_OUTER_HEX }}
    >
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
