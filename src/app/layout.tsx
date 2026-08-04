import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { PhoneShell } from "@/components/PhoneShell";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Speak — 레벨 및 코스 복습",
  description: "스픽 레벨·코스별 학습 문장 복습 MVP 프로토타입",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${notoSansKr.className} antialiased`}>
        <PhoneShell>{children}</PhoneShell>
      </body>
    </html>
  );
}
