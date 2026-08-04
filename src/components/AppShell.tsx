"use client";

import { BottomNav } from "./BottomNav";

/**
 * 화해식 모바일 퍼스트 셸
 * - 모바일: 풀폭 앱 화면
 * - 데스크탑: 중앙 max-width 컬럼으로 모바일 구조 유지
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#F2F3F7] text-speak-ink">
      <div className="relative mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-white md:shadow-[0_0_40px_rgba(17,24,39,0.08)]">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
