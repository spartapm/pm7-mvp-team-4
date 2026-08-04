import { Suspense } from "react";
import { SentenceListScreen } from "@/components/SentenceListScreen";

export default function SentencesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-speak-muted">
          불러오는 중...
        </div>
      }
    >
      <SentenceListScreen />
    </Suspense>
  );
}
