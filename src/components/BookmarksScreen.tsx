"use client";

import { useEffect, useState } from "react";
import {
  getAllSentences,
  type Sentence,
} from "@/lib/data";
import { loadBookmarkIds, toggleBookmark } from "@/lib/bookmarks";
import { playSentence, stopSpeech } from "@/lib/speech";
import { PageHeader } from "./PageHeader";
import { SentenceRow } from "./SentenceRow";
import { Toast } from "./Toast";

export function BookmarksScreen() {
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setBookmarkIds(loadBookmarkIds());
    return () => stopSpeech();
  }, []);

  const sentences = getAllSentences().filter((s) =>
    bookmarkIds.includes(s.id)
  );

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
        title="저장된 문장 보기"
        description="북마크로 저장한 문장을 다시 복습할 수 있어요."
        backHref="/practice"
      />

      <div className="scrollbar-hide flex-1 overflow-y-auto px-5 pb-6 pt-4">

        {sentences.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-[16px] font-semibold text-speak-ink">
              저장된 문장이 없어요
            </p>
            <p className="mt-2 text-[13px] text-speak-muted">
              레벨 및 코스 선택에서 문장을 북마크해 보세요.
            </p>
          </div>
        ) : (
          sentences.map((sentence) => (
            <SentenceRow
              key={sentence.id}
              sentence={sentence}
              bookmarked
              playing={playingId === sentence.id}
              onPlay={() => handlePlay(sentence)}
              onBookmark={() => handleBookmark(sentence)}
            />
          ))
        )}
      </div>
    </div>
  );
}
