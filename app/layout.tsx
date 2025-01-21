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
        <header className="bg-app-gray-500 pt-[4.5rem] pb-20 px-4 flex items-center justify-center">
          <Link href="/">
            <h1 className="flex gap-3 items-end justify-center text-[2.5rem] leading-[3.0257rem] font-black">
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
        <main className="max-w-[46.25rem] mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
