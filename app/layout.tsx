import type { Metadata } from "next";
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
       <Navbar />

        {children}

       <Footer />
      </body>
    </html>
  );
}