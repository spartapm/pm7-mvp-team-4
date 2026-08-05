"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
        title: `${level.title} / ${unit.name}`,
        cefr: level.cefr,
        keywords: unit.keywords ?? level.description,
        sentences: unit.sentences,
        // 닫기(X) → 화면 2 (해당 레벨 아코디언 열림)
        closeHref: `/review?open=${level.id}`,
      };
    }
    if (type === "course") {
      const course = getCourse(courseId);
      const chapter = getChapter(courseId, chapterId);
      if (!course || !chapter || !chapter.unlocked) return null;
      return {
        title: chapter.name,
        cefr: chapter.cefr,
        keywords: chapter.keywords ?? course.description,
        sentences: chapter.sentences,
        closeHref: `/review?open=${course.id}`,
      };
    }
    return null;
  }, [type, levelId, unitId, courseId, chapterId]);

  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const clearToast = useCallback(() => setToast(null), []);

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

    const result = playSentence(sentence, () => {
      setPlayingId((current) => (current === sentence.id ? null : current));
    });
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
      <Toast message={toast} onClose={clearToast} />

      <PageHeader
        title={context.title}
        cefr={context.cefr}
        description={context.keywords}
        backHref={context.closeHref}
        action="close"
      />

      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-2">
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
        <p className="mb-4 mt-4 rounded-xl bg-speak-soft px-3 py-2 text-[11px] leading-relaxed text-speak-muted">
          데모 팁: &quot;How&apos;s the weather in Sydney?&quot;는 음성 오류,
          &quot;I usually hang out with friends.&quot;는 북마크 오류를 확인할 수
          있어요.
        </p>
      </div>
    </div>
  );
}
