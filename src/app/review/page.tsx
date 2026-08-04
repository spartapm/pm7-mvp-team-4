import { Suspense } from "react";
import { ReviewSelect } from "@/components/ReviewSelect";

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-speak-muted">
          불러오는 중...
        </div>
      }
    >
      <ReviewSelect />
    </Suspense>
  );
}
