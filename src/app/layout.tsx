import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/auth-context";

const ptSans = PT_Sans({
	variable: "--font-pt-sans",
	subsets: ["latin", "cyrillic"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "Мессенджер на NextJS",
	description:
		"Сайт для обмена сообщениями, разработанный на фреймворке NextJS",
	icons: "/logo.svg",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={`${ptSans.variable} antialiased grid place-items-center`}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
