"use client";

export default function BrandedHeader() {
  return (
    <div className="border-b border-[var(--surface-border)] bg-[var(--background)] px-4 pb-2.5 pt-[max(0.65rem,env(safe-area-inset-top))]">
      <div
        className="flex items-stretch justify-center gap-x-1 text-[var(--accent)]"
        aria-label="Icon of the Seas"
      >
        <span className="flex items-center text-2xl font-black uppercase leading-none tracking-tight">
          ICON
        </span>
        <div className="flex min-w-[1.1rem] flex-col items-center justify-center gap-0 text-center">
          <span className="text-[9px] font-bold uppercase leading-none tracking-[0.12em]">
            OF
          </span>
          <span className="-mt-px text-[9px] font-bold uppercase leading-none tracking-[0.12em]">
            THE
          </span>
        </div>
        <span className="flex items-center text-2xl font-black uppercase leading-none tracking-tight">
          SEAS
        </span>
      </div>
    </div>
  );
}
