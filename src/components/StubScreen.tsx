"use client";

import Link from "next/link";

export function StubScreen({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col bg-[#F7F8FA] px-5 pb-24 pt-14">
      <h1 className="text-[32px] font-bold text-speak-ink">{title}</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-speak-muted">
        프로토타입에서는 연습 탭의 &lsquo;레벨 및 코스 선택&rsquo; 플로우를
        중심으로 구현했어요.
      </p>
      <Link
        href="/practice"
        className="mt-8 inline-flex items-center justify-center rounded-2xl bg-speak-blue px-5 py-3.5 text-[15px] font-bold text-white"
      >
        연습 탭으로 이동
      </Link>
    </div>
  );
}
