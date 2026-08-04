"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getChapter,
  getCourse,
  getLevel,
  getUnit,
  type Sentence,
} from "@/lib/data";
import { loadBookmarkIds, toggleBookmark } from "@/lib/bookmarks";
import { playSentence, stopSpeech } from "@/lib/speech";
import { CefrBadge } from "./CefrBadge";
import { PageHeader } from "./PageHeader";
import { SentenceRow } from "./SentenceRow";
import { Toast } from "./Toast";

export function SentenceListScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type");
  const levelId = params.get("levelId") ?? "";
  const unitId = params.get("unitId") ?? "";
  const courseId = params.get("courseId") ?? "";
  const chapterId = params.get("chapterId") ?? "";

  const context = useMemo(() => {
    if (type === "level") {
      const level = getLevel(levelId);
      const unit = getUnit(levelId, unitId);
      if (!level || !unit || !unit.unlocked) return null;
      return {
        section: "레벨" as const,
        title: `${level.title} / ${unit.name}`,
        cefr: level.cefr,
        keywords: unit.keywords ?? level.description,
        sentences: unit.sentences,
        // 화면 3-1 → 화면 2-1 (해당 레벨 아코디언 열린 상태)
        backHref: `/review?open=${level.id}`,
      };
    }
    if (type === "course") {
      const course = getCourse(courseId);
      const chapter = getChapter(courseId, chapterId);
      if (!course || !chapter || !chapter.unlocked) return null;
      return {
        section: "코스" as const,
        title: chapter.name,
        cefr: chapter.cefr,
        keywords: chapter.keywords ?? course.description,
        sentences: chapter.sentences,
        // 화면 3-2 → 화면 2-2 (해당 코스 아코디언 열린 상태)
        backHref: `/review?open=${course.id}`,
      };
    }
    return null;
  }, [type, levelId, unitId, courseId, chapterId]);

  const [expanded, setExpanded] = useState(true);
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setBookmarkIds(loadBookmarkIds());
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    if (!context) {
      router.replace("/review");
    }
  }, [context, router]);

  if (!context) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-speak-muted">
        불러오는 중...
      </div>
    );
  }

  const handlePlay = (sentence: Sentence) => {
    if (playingId === sentence.id) {
      stopSpeech();
      setPlayingId(null);
      return;
    }

    const result = playSentence(sentence, () => setPlayingId(null));
    if (!result.ok) {
      setPlayingId(null);
      setToast(result.error);
      return;
    }
    setPlayingId(sentence.id);
  };

  const handleBookmark = (sentence: Sentence) => {
    const result = toggleBookmark(sentence, bookmarkIds);
    if (result.error) {
      setToast(result.error);
      return;
    }
    setBookmarkIds(result.ids);
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      <Toast message={toast} onClose={() => setToast(null)} />

      <PageHeader
        title="레벨 및 코스 선택"
        description="학습한 문장을 레벨과 코스별로 모아, 원하는 내용을 쉽게 복습합니다."
        backHref={context.backHref}
      />

      <div className="flex min-h-0 flex-1 flex-col px-5 pb-8 pt-5">
        <p className="mb-2 text-[13px] font-semibold text-speak-muted">
          {context.section}
        </p>

        {/* 유닛/챕터 박스: 펼침 시 문장 목록을 박스 범위 내 스크롤 */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-speak-line bg-white shadow-card">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full shrink-0 items-start gap-3 px-4 py-4 text-left"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[16px] font-bold text-speak-ink">
                  {context.title}
                </p>
                <CefrBadge cefr={context.cefr} />
              </div>
              <p className="mt-1 text-[13px] leading-snug text-speak-muted">
                {context.keywords}
              </p>
            </div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className={`mt-1 shrink-0 text-[#C0C4CE] transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <path
                d="M4.5 6.75 9 11.25l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {expanded ? (
            <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto border-t border-speak-line px-4">
              {context.sentences.map((sentence) => (
                <SentenceRow
                  key={sentence.id}
                  sentence={sentence}
                  bookmarked={bookmarkIds.includes(sentence.id)}
                  playing={playingId === sentence.id}
                  onPlay={() => handlePlay(sentence)}
                  onBookmark={() => handleBookmark(sentence)}
                />
              ))}
              <p className="mb-4 mt-2 rounded-xl bg-speak-soft px-3 py-2 text-[11px] leading-relaxed text-speak-muted">
                데모 팁: &quot;How&apos;s the weather in Sydney?&quot;는 음성
                오류, &quot;I usually hang out with friends.&quot;는 북마크
                오류를 확인할 수 있어요.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
