"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/home",
    label: "홈",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/freetalk",
    label: "프리톡",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="9"
          r="3.2"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
        />
        <path
          d="M6.5 19c1.2-2.6 3.1-3.8 5.5-3.8s4.3 1.2 5.5 3.8"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M17.5 8.5c1.2.4 2 1.4 2 2.7 0 1.1-.5 2-1.4 2.6"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/practice",
    label: "연습",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 3 5.5 13.5h5L10 21l8-11h-5L13 3Z"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinejoin="round"
          fill={active ? "#1746FC" : "none"}
        />
      </svg>
    ),
  },
  {
    href: "/challenge",
    label: "챌린지",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 4h8v3a4 4 0 0 1-8 0V4Z"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
        />
        <path
          d="M8 5H5.5a2.5 2.5 0 0 0 2.5 2.5M16 5h2.5A2.5 2.5 0 0 1 16 7.5"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M12 11v3M9.5 20h5M10 17h4l-.5 3h-3L10 17Z"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "프로필",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="8.5"
          r="3.2"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
        />
        <path
          d="M5.5 19.5c1.4-3 3.5-4.5 6.5-4.5s5.1 1.5 6.5 4.5"
          stroke={active ? "#1746FC" : "#9CA3AF"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const show =
    pathname === "/practice" ||
    pathname === "/home" ||
    pathname === "/freetalk" ||
    pathname === "/challenge" ||
    pathname === "/profile" ||
    pathname === "/bookmarks";

  if (!show) return null;

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 border-t border-speak-line bg-white/95 backdrop-blur">
      <div className="grid h-[64px] grid-cols-5 px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            (tab.href === "/practice" &&
              (pathname.startsWith("/review") || pathname === "/bookmarks"));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5"
            >
              {tab.icon(active)}
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-speak-blue" : "text-[#9CA3AF]"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
