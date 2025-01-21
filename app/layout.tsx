import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { RocketIcon } from "@/components/icons/rocket-icon";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Full-stack todo list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} antialiased`}>
        <header className="flex items-center justify-center bg-app-gray-500 px-4 pb-20 pt-[4.5rem]">
          <Link href="/">
            <h1 className="flex items-end justify-center gap-3 text-[2.5rem] font-black leading-[3.0257rem]">
              <div className="relative bottom-0.5" aria-hidden>
                <RocketIcon />
              </div>
              <div>
                <span className="text-app-blue">Todo</span>{" "}
                <span className="text-app-purple-dark">App</span>
              </div>
            </h1>
          </Link>
        </header>
        <main className="mx-auto max-w-[46.25rem] px-4">{children}</main>
      </body>
    </html>
  );
}
