export type Sentence = {
  id: string;
  en: string;
  ko: string;
  /** 프로토타입: 음성 재생 실패 데모 */
  failAudio?: boolean;
  /** 프로토타입: 북마크 저장 실패 데모 */
  failBookmark?: boolean;
};

export type Unit = {
  id: string;
  name: string;
  unlocked: boolean;
  keywords?: string;
  sentences: Sentence[];
};

export type Level = {
  id: string;
  title: string;
  cefr: string;
  description: string;
  /** 홈에서 유닛 1개라도 수강 시 노출 */
  studied: boolean;
  units: Unit[];
};

export type Chapter = {
  id: string;
  name: string;
  cefr: string;
  unlocked: boolean;
  keywords?: string;
  sentences: Sentence[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  studied: boolean;
  chapters: Chapter[];
};

const smallTalkSentences: Sentence[] = [
  {
    id: "s-st-1",
    en: "Nice to meet you.",
    ko: "만나서 반가워요.",
  },
  {
    id: "s-st-2",
    en: "I'm in San Francisco.",
    ko: "저는 샌프란시스코에 있어요.",
  },
  {
    id: "s-st-3",
    en: "How's the weather in Sydney?",
    ko: "시드니 날씨는 어때요?",
    failAudio: true,
  },
  {
    id: "s-st-4",
    en: "It's windy.",
    ko: "바람이 많이 불어요.",
  },
  {
    id: "s-st-5",
    en: "What do you do for fun?",
    ko: "여가 시간에 뭐 하세요?",
  },
  {
    id: "s-st-6",
    en: "I usually hang out with friends.",
    ko: "보통 친구들이랑 놀아요.",
    failBookmark: true,
  },
];

const lifeSentences: Sentence[] = [
  {
    id: "s-life-1",
    en: "I live in Seoul.",
    ko: "저는 서울에 살아요.",
  },
  {
    id: "s-life-2",
    en: "I work as a designer.",
    ko: "저는 디자이너로 일해요.",
  },
  {
    id: "s-life-3",
    en: "My weekend plans are simple.",
    ko: "주말 계획은 단순해요.",
  },
];

const workCommSentences: Sentence[] = [
  {
    id: "s-wc-1",
    en: "Nice to meet you.",
    ko: "만나서 반가워요.",
  },
  {
    id: "s-wc-2",
    en: "Could you share an update?",
    ko: "진행 상황 공유해 주실 수 있나요?",
  },
  {
    id: "s-wc-3",
    en: "Let's sync after the meeting.",
    ko: "미팅 끝나고 짧게 맞춰 봐요.",
  },
  {
    id: "s-wc-4",
    en: "I'll follow up by email.",
    ko: "이메일로 후속 전달할게요.",
  },
  {
    id: "s-wc-5",
    en: "That timeline works for me.",
    ko: "그 일정 괜찮아요.",
  },
];

const workBasicSentences: Sentence[] = [
  {
    id: "s-wb-1",
    en: "Could you help me with this?",
    ko: "이것 좀 도와주실 수 있나요?",
  },
  {
    id: "s-wb-2",
    en: "I'll send the file today.",
    ko: "오늘 파일 보내드릴게요.",
  },
];

export const levels: Level[] = [
  {
    id: "beginner",
    title: "왕초보",
    cefr: "A1",
    description:
      "필수 대화 마스터하기 : 자기소개, 길 묻기, 시간 말하기 등 일상에서 꼭 필요한 표현을 배워보세요.",
    studied: true,
    units: [
      {
        id: "small-talk",
        name: "간단한 잡담",
        unlocked: true,
        keywords:
          "필수 대화 마스터하기 : 자기소개, 길 묻기, 시간 말하기 등",
        sentences: smallTalkSentences,
      },
      {
        id: "my-life",
        name: "내 삶에 대해 나누기",
        unlocked: true,
        keywords: "일상과 나에 대해 이야기하기",
        sentences: lifeSentences,
      },
      {
        id: "work-hobby",
        name: "일과 & 취미",
        unlocked: false,
        sentences: [],
      },
      {
        id: "friends-family",
        name: "친구 & 가족",
        unlocked: false,
        sentences: [],
      },
      {
        id: "time-date",
        name: "시간 & 날짜 & 길 찾기",
        unlocked: false,
        sentences: [],
      },
      {
        id: "needs-wants",
        name: "필요한 것 & 원하는 것",
        unlocked: false,
        sentences: [],
      },
      {
        id: "cafe",
        name: "카페에서",
        unlocked: false,
        sentences: [],
      },
      {
        id: "new-friends",
        name: "새 친구 사귀기",
        unlocked: false,
        sentences: [],
      },
      {
        id: "ask-directions",
        name: "길 물어보기",
        unlocked: false,
        sentences: [],
      },
      {
        id: "meet-friends",
        name: "친구 만나기",
        unlocked: false,
        sentences: [],
      },
    ],
  },
  {
    id: "elementary",
    title: "초급",
    cefr: "A2",
    description: "계획을 세우고 일상적인 주제에 대해 이야기하는 법을 배워요.",
    studied: true,
    units: [
      {
        id: "plans",
        name: "계획 세우기",
        unlocked: true,
        keywords: "일정과 약속을 잡는 표현",
        sentences: [
          {
            id: "s-el-1",
            en: "Are you free this weekend?",
            ko: "이번 주말 시간 돼요?",
          },
          {
            id: "s-el-2",
            en: "Let's grab coffee tomorrow.",
            ko: "내일 커피 한잔해요.",
          },
        ],
      },
      {
        id: "daily-topics",
        name: "일상 주제",
        unlocked: false,
        sentences: [],
      },
    ],
  },
  {
    id: "intermediate",
    title: "중급",
    cefr: "B1",
    description:
      "본인의 경험과 다양한 주제에 대해 자신 있게 이야기하는 법을 배워요.",
    studied: true,
    units: [
      {
        id: "experiences",
        name: "경험 나누기",
        unlocked: true,
        keywords: "과거 경험과 느낀 점 표현하기",
        sentences: [
          {
            id: "s-in-1",
            en: "I used to live in Busan.",
            ko: "예전에 부산에 살았어요.",
          },
          {
            id: "s-in-2",
            en: "That trip changed my perspective.",
            ko: "그 여행이 제 시각을 바꿔 놨어요.",
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    title: "고급",
    cefr: "B2",
    description:
      "더 추상적이거나 전문적인 주제에 대해서도 효과적으로 생각을 표현하는 법을 배워요.",
    studied: false,
    units: [],
  },
  {
    id: "master",
    title: "마스터",
    cefr: "C1",
    description:
      "폭넓은 고급 어휘를 사용해서 막힘없이 자연스럽게 생각을 표현하는 법을 배워요.",
    studied: false,
    units: [],
  },
];

export const courses: Course[] = [
  {
    id: "topic",
    title: "토픽별 선택 코스",
    description:
      "여행, 비즈니스, 면접, 대학 생활 등 관심사별 선택 코스들이에요.",
    studied: true,
    chapters: [
      {
        id: "work-mid",
        name: "직장 커뮤니케이션 중급",
        cefr: "B1",
        unlocked: true,
        keywords:
          "직장 영어 자신있게 말하기: 회의부터 진행사항 공유, 커리어 대화까지 실무에 바로 쓸 수 있는 표현을 배워보세요.",
        sentences: workCommSentences,
      },
      {
        id: "work-basic",
        name: "직장 커뮤니케이션 기초",
        cefr: "A2",
        unlocked: true,
        keywords: "직장에서 바로 쓰는 기본 표현",
        sentences: workBasicSentences,
      },
      {
        id: "biz-1",
        name: "비즈니스 영어 1",
        cefr: "B1",
        unlocked: false,
        sentences: [],
      },
      {
        id: "biz-2",
        name: "비즈니스 영어 2",
        cefr: "B2",
        unlocked: false,
        sentences: [],
      },
      {
        id: "phrasal",
        name: "실전 영어 구동사",
        cefr: "B1",
        unlocked: false,
        sentences: [],
      },
    ],
  },
  {
    id: "special",
    title: "스페셜 코스",
    description: "🔥 기간 한정 이벤트 코스들! 놓치지 말고 확인해보세요.",
    studied: true,
    chapters: [
      {
        id: "travel-special",
        name: "여행 필수 표현",
        cefr: "A2",
        unlocked: true,
        keywords: "공항·호텔·식당에서 바로 쓰는 표현",
        sentences: [
          {
            id: "s-sp-1",
            en: "Where is the boarding gate?",
            ko: "탑승 게이트가 어디인가요?",
          },
          {
            id: "s-sp-2",
            en: "I'd like a room for two nights.",
            ko: "이틀 밤 묵을 방 부탁드려요.",
          },
        ],
      },
    ],
  },
  {
    id: "legacy",
    title: "이전 버전 커리큘럼",
    description:
      "이전 버전 커리큘럼으로, 더 이상 정기적으로 업데이트되지 않지만 수강하실 수 있어요.",
    studied: true,
    chapters: [
      {
        id: "legacy-1",
        name: "레거시 기초 회화",
        cefr: "A1",
        unlocked: true,
        keywords: "이전 커리큘럼의 기초 표현",
        sentences: [
          {
            id: "s-lg-1",
            en: "How are you today?",
            ko: "오늘 어때요?",
          },
        ],
      },
    ],
  },
];

export function getStudiedLevels() {
  return levels.filter((l) => l.studied);
}

export function getStudiedCourses() {
  return courses.filter((c) => c.studied);
}

export function getLevel(levelId: string) {
  return levels.find((l) => l.id === levelId);
}

export function getUnit(levelId: string, unitId: string) {
  return getLevel(levelId)?.units.find((u) => u.id === unitId);
}

export function getCourse(courseId: string) {
  return courses.find((c) => c.id === courseId);
}

export function getChapter(courseId: string, chapterId: string) {
  return getCourse(courseId)?.chapters.find((c) => c.id === chapterId);
}

export function getAllSentences(): Sentence[] {
  const fromLevels = levels.flatMap((l) =>
    l.units.flatMap((u) => u.sentences)
  );
  const fromCourses = courses.flatMap((c) =>
    c.chapters.flatMap((ch) => ch.sentences)
  );
  const map = new Map<string, Sentence>();
  [...fromLevels, ...fromCourses].forEach((s) => map.set(s.id, s));
  return Array.from(map.values());
}
