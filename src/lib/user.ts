import { getStudiedCourses, getStudiedLevels } from "./data";

const PREMIUM_KEY = "speak-proto-is-premium";

/** 프로토타입: 프리미엄 여부 (기본 true — 프리미엄 타겟 기능 데모) */
export function loadIsPremium(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(PREMIUM_KEY);
  if (raw === null) return true;
  return raw === "1";
}

export function saveIsPremium(value: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREMIUM_KEY, value ? "1" : "0");
}

/** 코스/레벨 레슨을 1개라도 시작한 상태 */
export function hasStartedCourseLesson(): boolean {
  const levels = getStudiedLevels();
  const courses = getStudiedCourses();
  const levelStarted = levels.some((l) =>
    l.units.some((u) => u.unlocked && u.sentences.length > 0)
  );
  const courseStarted = courses.some((c) =>
    c.chapters.some((ch) => ch.unlocked && ch.sentences.length > 0)
  );
  return levelStarted || courseStarted;
}

/**
 * 연습 목록 '레벨 및 코스 선택' 설명 문구
 * 1) 베이직 + 시작 전
 * 2) 베이직 + 시작 후
 * 3) 프리미엄 + 시작 전
 * 4) 프리미엄 + 시작 후
 */
export function getLevelCourseCardDescription(
  isPremium: boolean,
  started: boolean
): string {
  if (!isPremium && !started) {
    return "코스 레슨을 시작하여 복습을 잠금해제하세요.";
  }
  if (!isPremium && started) {
    return "학습한 레벨과 코스를 선택해 복습하세요.";
  }
  if (isPremium && !started) {
    return "코스 레슨을 시작하면 복습이 준비됩니다.";
  }
  return "원하는 레벨과 코스를 선택해 자유롭게 복습하세요.";
}
