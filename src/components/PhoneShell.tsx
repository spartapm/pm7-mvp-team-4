"use client";

import { BottomNav } from "./BottomNav";

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#E8ECF4] px-4 py-6 text-speak-ink sm:py-10">
      <div className="mx-auto mb-4 max-w-[390px] text-center">
        <p className="text-[13px] font-semibold tracking-wide text-speak-blue">
          Speak Prototype
        </p>
        <p className="mt-1 text-[12px] text-speak-muted">
          레벨 및 코스별 학습 문장 복습 MVP
        </p>
      </div>

      <div className="relative mx-auto h-[844px] w-full max-w-[390px] overflow-hidden rounded-[36px] border-[8px] border-[#1C1C1E] bg-white shadow-phone">
        <div className="pointer-events-none absolute left-1/2 top-2 z-50 h-[28px] w-[120px] -translate-x-1/2 rounded-full bg-[#1C1C1E]" />
        <div className="relative h-full overflow-hidden bg-white">
          {children}
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
