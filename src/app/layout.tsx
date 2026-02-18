import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin","cyrillic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Мессенджер на NextJS",
  description: "Сайт для обмена сообщениями, разработанный на фреймворке NextJS",
  icons: '/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${ptSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
