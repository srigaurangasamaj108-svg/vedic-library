import type { Metadata } from "next";
import "./globals.css";
import { geistSans, crimsonPro } from "./fonts";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Vedic Library | Bhagavad-gītā",
  description: "A digital library for Vedic wisdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${crimsonPro.variable} flex flex-col min-h-screen bg-[var(--bg-primary)]`}>
        {/* Top Navigation Bar */}
        <TopBar />

        {/* Main Content Area */}
        <div className="flex-1 w-full mx-auto max-w-[900px]">
          {children}
        </div>
      </body>
    </html>
  );
}
