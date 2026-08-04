import { getAllSentences, type Sentence } from "./data";

const STORAGE_KEY = "speak-proto-bookmarks";

export function loadBookmarkIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveBookmarkIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function getBookmarkedSentences(): Sentence[] {
  const ids = new Set(loadBookmarkIds());
  return getAllSentences().filter((s) => ids.has(s.id));
}

export function toggleBookmark(
  sentence: Sentence,
  currentIds: string[]
): { ids: string[]; error?: string } {
  if (sentence.failBookmark && !currentIds.includes(sentence.id)) {
    return { ids: currentIds, error: "저장에 실패했습니다." };
  }

  try {
    const next = currentIds.includes(sentence.id)
      ? currentIds.filter((id) => id !== sentence.id)
      : [...currentIds, sentence.id];
    saveBookmarkIds(next);
    return { ids: next };
  } catch {
    return { ids: currentIds, error: "저장에 실패했습니다." };
  }
}
