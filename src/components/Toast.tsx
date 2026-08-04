"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
  /** 자동 소멸(ms). 기본 5초. 0이면 수동 닫기만 */
  durationMs?: number;
};

export function Toast({
  message,
  onClose,
  durationMs = 5000,
}: ToastProps) {
  useEffect(() => {
    if (!message || durationMs <= 0) return;
    const t = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(t);
  }, [message, onClose, durationMs]);

  if (!message) return null;

  return (
    <div className="absolute left-0 right-0 top-0 z-50 px-4 pt-[max(12px,env(safe-area-inset-top))]">
      <div className="flex items-center gap-2 rounded-xl bg-speak-danger-bg px-3 py-2.5 text-[13px] font-medium text-speak-danger shadow-sm">
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-speak-danger"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 3.5l7 7M10.5 3.5l-7 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span>{message}</span>
      </div>
    </div>
  );
}
