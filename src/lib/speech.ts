import type { Sentence } from "./data";

/** speechSynthesis.cancel() 시 이전 utterance의 onend/onerror가
 *  새 재생 상태를 덮어쓰지 않도록 세대 토큰으로 구분 */
let playGeneration = 0;

export function stopSpeech() {
  if (typeof window === "undefined") return;
  playGeneration += 1;
  window.speechSynthesis.cancel();
}

export function playSentence(
  sentence: Sentence,
  onEnd?: () => void
): { ok: true } | { ok: false; error: string } {
  // 다른 문장 재생 중이어도 전환 시 기존 재생은 항상 중단
  stopSpeech();

  if (sentence.failAudio) {
    return { ok: false, error: "음성을 불러올 수 없습니다." };
  }

  if (typeof window === "undefined" || !window.speechSynthesis) {
    return { ok: false, error: "음성을 불러올 수 없습니다." };
  }

  const generation = playGeneration;

  try {
    const utter = new SpeechSynthesisUtterance(sentence.en);
    utter.lang = "en-US";
    utter.rate = 0.95;
    const finish = () => {
      if (generation === playGeneration) onEnd?.();
    };
    utter.onend = finish;
    utter.onerror = finish;
    window.speechSynthesis.speak(utter);
    return { ok: true };
  } catch {
    return { ok: false, error: "음성을 불러올 수 없습니다." };
  }
}
