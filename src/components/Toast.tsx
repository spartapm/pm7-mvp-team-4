"use client";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="absolute left-0 right-0 top-0 z-50 px-3 pt-[max(10px,env(safe-area-inset-top))]">
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
