# pm7-mvp-team-4 — Speak 레벨·코스 복습 프로토타입

스픽(Speak) **레벨 및 코스별 학습 문장 복습** MVP 프로토타입입니다.  
기능/기획 명세서의 핵심 플로우를 Next.js 14로 구현했습니다.

## 실행

```bash
npm install
npm run dev
```

[http://localhost:3704](http://localhost:3704) 에서 확인할 수 있습니다.

## 구현 범위

| 화면 | 경로 | 내용 |
| --- | --- | --- |
| 연습 목록 | `/practice` | NEW 배지와 함께 `레벨 및 코스 선택` 진입 |
| 레벨/코스 선택 | `/review` | 아코디언 + 잠금 유닛/챕터 |
| 문장 리스트 | `/review/sentences` | 영·한 병기, 음성 재생, 북마크 |
| 저장된 문장 | `/bookmarks` | 북마크 저장소 연동 |

## 데모 팁

- **음성 오류**: `왕초보 > 간단한 잡담`의 `How's the weather in Sydney?`
- **북마크 오류**: 같은 유닛의 `I usually hang out with friends.`
- 음성은 Web Speech API(브라우저 TTS)로 재생됩니다.
