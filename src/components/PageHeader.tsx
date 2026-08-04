"use client";

import { useRouter } from "next/navigation";

type PageHeaderProps = {
  title: string;
  description?: string;
  backHref?: string;
  onBack?: () => void;
};

export function PageHeader({
  title,
  description,
  backHref,
  onBack,
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
        aria-label="뒤로가기"
        onClick={handleBack}
        className="-ml-1 mb-2 flex h-9 w-9 items-center justify-center rounded-full text-speak-ink"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 4.5 7 10l5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="text-[26px] font-bold tracking-tight text-speak-ink">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 text-[14px] leading-relaxed text-speak-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}
