"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { loadBookmarkIds } from "@/lib/bookmarks";

export function PracticeHome() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    setSavedCount(loadBookmarkIds().length);
  }, [pathname]);


  return (
    <div className="flex h-full flex-col bg-[#F7F8FA]">
      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-[max(1.25rem,env(safe-area-inset-top))]">

        <h1 className="text-[32px] font-bold tracking-tight text-speak-ink">
          연습
        </h1>

        <section className="mt-7">
          <h2 className="mb-3 text-[13px] font-semibold text-speak-muted">
            빠른 레슨
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickCard
              label="어휘"
              gradient="from-[#FFB36A] to-[#FF8A3D]"
              icon={
                <span className="text-[15px] font-extrabold text-white">Aa</span>
              }
            />
            <QuickCard
              label="관용구"
              gradient="from-[#FF7AA2] to-[#FF5C8A]"
              icon={
                <span className="text-[18px] font-bold leading-none text-white">
                  &ldquo;&rdquo;
                </span>
              }
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-[13px] font-semibold text-speak-muted">
            리뷰
          </h2>
          <div className="space-y-3">
            <div className="rounded-[22px] bg-white p-4 shadow-card">
              <div className="flex items-start gap-3">
                <IconCircle className="bg-speak-blue">
                  <BoltIcon />
                </IconCircle>
                <div className="min-w-0 flex-1">
                  <p className="text-[16px] font-bold text-speak-ink">
                    스마트 복습
                  </p>
                  <p className="mt-0.5 text-[13px] text-speak-muted">
                    숙련도 점수 48%
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8E9ED]">
                    <div className="h-full w-[48%] rounded-full bg-[#9AA3B5]" />
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/review"
              className="relative block rounded-[22px] bg-white p-4 shadow-card ring-2 ring-speak-blue/25"

            >
              <span className="absolute -right-1 -top-2 rounded-md bg-speak-blue px-1.5 py-0.5 text-[10px] font-bold text-white">
                NEW
              </span>
              <div className="flex items-center gap-3">
                <IconCircle className="bg-speak-blue">
                  <BookIcon />
                </IconCircle>
                <div className="min-w-0 flex-1">
                  <p className="text-[16px] font-bold text-speak-ink">
                    레벨 및 코스 선택
                  </p>
                  <p className="mt-0.5 text-[13px] text-speak-muted">
                    상황별 필수 표현을 복습하기
                  </p>
                </div>
                <ChevronRight />
              </div>
            </Link>

            <Link
              href="/bookmarks"
              className="block rounded-[22px] bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-3">
                <IconCircle className="bg-speak-green">
                  <BookmarkIcon />
                </IconCircle>
                <div className="min-w-0 flex-1">
                  <p className="text-[16px] font-bold text-speak-ink">
                    저장된 문장 보기
                  </p>
                  <p className="mt-0.5 text-[13px] text-speak-muted">
                    {savedCount}개 저장됨
                  </p>
                </div>
                <ChevronRight />
              </div>
            </Link>

            <div className="relative rounded-[22px] bg-white p-4 shadow-card">
              <PremiumBadge />
              <div className="flex items-center gap-3">
                <IconCircle className="bg-[#C5CAD3]">
                  <StarIcon />
                </IconCircle>
                <div className="min-w-0 flex-1 pr-16">
                  <p className="text-[16px] font-bold text-speak-ink">실수</p>
                  <p className="mt-0.5 text-[13px] text-speak-muted">
                    프리 토크 레슨을 수강하여 잠금 해제하기
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-[22px] bg-white p-4 shadow-card">
              <PremiumBadge />
              <div className="flex items-center gap-3">
                <IconCircle className="bg-gradient-to-br from-[#6C8CFF] to-[#9B6CFF]">
                  <SparkleIcon />
                </IconCircle>
                <div className="min-w-0 flex-1 pr-16">
                  <p className="text-[16px] font-bold text-speak-ink">관심사</p>
                  <p className="mt-0.5 text-[13px] text-speak-muted">
                    나만의 레슨 5개
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function QuickCard({
  label,
  gradient,
  icon,
}: {
  label: string;
  gradient: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex aspect-[1.15] flex-col items-center justify-center rounded-[22px] bg-white shadow-card">
      <div
        className={`mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}
      >
        {icon}
      </div>
      <p className="text-[15px] font-bold text-speak-ink">{label}</p>
    </div>
  );
}

function IconCircle({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${className}`}
    >
      {children}
    </div>
  );
}

function PremiumBadge() {
  return (
    <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-[#6C8CFF] to-[#B06CFF] px-2 py-0.5 text-[9px] font-bold text-white">
      프리미엄 플러스
    </span>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="#C0C4CE"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3 5.5 13.5h5L10 21l8-11h-5L13 3Z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 18.5h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 18 20" fill="currentColor">
      <path d="M3 1.75h12a1.25 1.25 0 0 1 1.25 1.25v14.4l-6.05-3.6a1.5 1.5 0 0 0-1.4 0l-6.05 3.6V3A1.25 1.25 0 0 1 3 1.75Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 3 1.8 5.5H20l-4.6 3.4 1.8 5.6L12 14.8 6.8 17.5l1.8-5.6L4 8.5h6.2L12 3Z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2 1.4 4.2L18 7.6l-4.2 1.4L12 13l-1.4-4L6 7.6l4.6-1.4L12 2Zm6.5 9 1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8ZM6 13.5l.9 2.4 2.4.9-2.4.9L6 20.1l-.9-2.4-2.4-.9 2.4-.9L6 13.5Z" />
    </svg>
  );
}
