"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getStudiedCourses, getStudiedLevels } from "@/lib/data";
import { CefrBadge } from "./CefrBadge";
import { PageHeader } from "./PageHeader";

export function ReviewSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const levels = getStudiedLevels();
  const courses = getStudiedCourses();
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const open = params.get("open");
    if (open) setOpenId(open);
  }, [params]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleBack = () => {
    // 화면 2-1/2-2 → 화면 2 (아코디언 닫기)
    if (openId) {
      setOpenId(null);
      router.replace("/review");
      return;
    }
    // 화면 2 → 연습 탭
    router.push("/practice");
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader
        title="레벨 및 코스 선택"
        description="학습한 문장을 레벨과 코스별로 모아, 원하는 내용을 쉽게 복습합니다."
        onBack={handleBack}
      />

      <div className="scrollbar-hide flex-1 overflow-y-auto px-5 pb-8 pt-5">
        <p className="mb-2 text-[13px] font-semibold text-speak-muted">레벨</p>
        <div className="space-y-3">
          {levels.map((level) => {
            const open = openId === level.id;
            return (
              <div
                key={level.id}
                className="overflow-hidden rounded-2xl border border-speak-line bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => toggle(level.id)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] font-bold text-speak-ink">
                        {level.title}
                      </p>
                      <CefrBadge cefr={level.cefr} />
                    </div>
                    <p className="mt-1 text-[13px] leading-snug text-speak-muted">
                      {level.description}
                    </p>
                  </div>
                  <Chevron open={open} />
                </button>

                {open ? (
                  <div className="border-t border-speak-line px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {level.units.map((unit) =>
                        unit.unlocked ? (
                          <Link
                            key={unit.id}
                            href={`/review/sentences?type=level&levelId=${level.id}&unitId=${unit.id}`}
                            className="max-w-full break-keep rounded-xl bg-speak-blue-soft px-3 py-2 text-[13px] font-semibold leading-snug text-speak-ink"
                          >
                            {unit.name}
                          </Link>
                        ) : (
                          <span
                            key={unit.id}
                            className="inline-flex max-w-full items-center gap-1.5 break-keep rounded-xl bg-[#F3F4F6] px-3 py-2 text-[13px] font-medium leading-snug text-[#B0B4BE]"
                          >
                            <LockIcon />
                            {unit.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mb-2 mt-7 text-[13px] font-semibold text-speak-muted">
          코스
        </p>
        <div className="space-y-3">
          {courses.map((course) => {
            const open = openId === course.id;
            return (
              <div
                key={course.id}
                className="overflow-hidden rounded-2xl border border-speak-line bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => toggle(course.id)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-bold text-speak-ink">
                      {course.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-speak-muted">
                      {course.description}
                    </p>
                  </div>
                  <Chevron open={open} />
                </button>

                {open ? (
                  <div className="space-y-2 border-t border-speak-line px-4 py-3">
                    {course.chapters.map((chapter) =>
                      chapter.unlocked ? (
                        <Link
                          key={chapter.id}
                          href={`/review/sentences?type=course&courseId=${course.id}&chapterId=${chapter.id}`}
                          className="flex items-center justify-between gap-3 rounded-xl bg-speak-soft px-3 py-3"
                        >
                          <span className="text-[14px] font-semibold leading-snug text-speak-ink">
                            {chapter.name}
                          </span>
                          <CefrBadge cefr={chapter.cefr} />
                        </Link>
                      ) : (
                        <div
                          key={chapter.id}
                          className="flex items-center justify-between gap-3 rounded-xl bg-[#F3F4F6] px-3 py-3"
                        >
                          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium leading-snug text-[#B0B4BE]">
                            <LockIcon />
                            {chapter.name}
                          </span>
                          <CefrBadge cefr={chapter.cefr} locked />
                        </div>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={`mt-1 shrink-0 text-[#C0C4CE] transition-transform ${
        open ? "rotate-90" : ""
      }`}
    >
      <path
        d="M6.5 4.5 11.5 9l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect
        x="2.25"
        y="5"
        width="7.5"
        height="5.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 5V3.8a2 2 0 1 1 4 0V5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
