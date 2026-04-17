"use client";

export default function BrandedHeader() {
  return (
    <div className="border-b border-[var(--surface-border)] bg-[var(--background)] px-4 pb-4 pt-[max(0.85rem,env(safe-area-inset-top))]">
      <div
        className="flex items-stretch justify-center gap-x-1.5 text-[var(--accent)]"
        aria-label="Icon of the Seas"
      >
        <span className="flex items-center text-4xl font-black uppercase leading-none tracking-tight">
          ICON
        </span>
        <div className="flex min-w-[1.45rem] flex-col items-center justify-center gap-0 text-center">
          <span className="text-[11px] font-bold uppercase leading-none tracking-[0.14em]">
            OF
          </span>
          <span className="-mt-px text-[11px] font-bold uppercase leading-none tracking-[0.14em]">
            THE
          </span>
        </div>
        <span className="flex items-center text-4xl font-black uppercase leading-none tracking-tight">
          SEAS
        </span>
      </div>
    </div>
  );
}
