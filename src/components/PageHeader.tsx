"use client";

import { useRouter } from "next/navigation";
import { CefrBadge } from "./CefrBadge";

type PageHeaderProps = {
  title: string;
  description?: string;
  /** 제목 옆에 CEFR 배지 표시 (3-1/3-2) */
  cefr?: string;
  backHref?: string;
  onBack?: () => void;
  /** close: X 아이콘 (플로우 마지막 단계). back: 뒤로가기 화살표 */
  action?: "back" | "close";
};

export function PageHeader({
  title,
  description,
  cefr,
  backHref,
  onBack,
  action = "back",
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (backHref) {
      router.push(backHref);
      return;
    }
    router.back();
  };

  return (
    <header className="shrink-0 px-5 pt-[max(1rem,env(safe-area-inset-top))]">
      <button
        type="button"
        aria-label={action === "close" ? "닫기" : "뒤로가기"}
        onClick={handleBack}
        className="-ml-1 mb-2 flex h-9 w-9 items-center justify-center rounded-full text-speak-ink"
      >
        {action === "close" ? <CloseIcon /> : <BackIcon />}
      </button>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-[26px] font-bold tracking-tight text-speak-ink">
          {title}
        </h1>
        {cefr ? <CefrBadge cefr={cefr} /> : null}
      </div>
      {description ? (
        <p className="mt-2 text-[14px] leading-relaxed text-speak-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
