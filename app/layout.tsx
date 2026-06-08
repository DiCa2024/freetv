import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FREETV | Open Cinema Library",
  description: "퍼블릭 도메인 고전 영화를 탐색하는 오픈 시네마 라이브러리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5900744229489479"
          crossOrigin="anonymous"
        />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}