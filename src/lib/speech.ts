import type { Sentence } from "./data";

export function stopSpeech() {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
}

export function playSentence(
  sentence: Sentence,
  onEnd?: () => void
): { ok: true } | { ok: false; error: string } {
  if (sentence.failAudio) {
    return { ok: false, error: "음성을 불러올 수 없습니다." };
  }

  if (typeof window === "undefined" || !window.speechSynthesis) {
    return { ok: false, error: "음성을 불러올 수 없습니다." };
  }

  stopSpeech();

  try {
    const utter = new SpeechSynthesisUtterance(sentence.en);
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.onend = () => {
      onEnd?.();
    };
    utter.onerror = () => {
      onEnd?.();
    };
    window.speechSynthesis.speak(utter);
    return { ok: true };
  } catch {
    return { ok: false, error: "음성을 불러올 수 없습니다." };
  }
}
