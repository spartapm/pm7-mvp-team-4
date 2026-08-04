"use client";

import type { Sentence } from "@/lib/data";

type SentenceRowProps = {
  sentence: Sentence;
  bookmarked: boolean;
  playing: boolean;
  onPlay: () => void;
  onBookmark: () => void;
};

export function SentenceRow({
  sentence,
  bookmarked,
  playing,
  onPlay,
  onBookmark,
}: SentenceRowProps) {
  return (
    <div className="flex items-start gap-3 border-b border-speak-line/80 py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p className="text-[16px] font-semibold leading-snug text-speak-ink">
            {sentence.en}
          </p>
          <button
            type="button"
            aria-label={playing ? "음성 중지" : "음성 재생"}
            onClick={onPlay}
            className={`mt-0.5 shrink-0 ${
              playing ? "text-speak-blue" : "text-[#A0A4AE]"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 5 7 9H4v6h3l4 4V5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
                fill={playing ? "currentColor" : "none"}
              />
              <path
                d="M15.5 8.5a4.5 4.5 0 0 1 0 7M18.2 6a8 8 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-[14px] leading-snug text-speak-muted">
          {sentence.ko}
        </p>
      </div>

      <button
        type="button"
        aria-label={bookmarked ? "북마크 해제" : "북마크 저장"}
        onClick={onBookmark}
        className={`mt-0.5 shrink-0 ${
          bookmarked ? "text-speak-blue" : "text-[#C0C4CE]"
        }`}
      >
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path
            d="M3 1.75h12a1.25 1.25 0 0 1 1.25 1.25v14.4l-6.05-3.6a1.5 1.5 0 0 0-1.4 0l-6.05 3.6V3A1.25 1.25 0 0 1 3 1.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill={bookmarked ? "currentColor" : "none"}
          />
        </svg>
      </button>
    </div>
  );
}
