import "./globals.css";
import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { ReadingModeProvider } from "@/context/ReadingModeContext";

export const metadata: Metadata = {
  title: "Vedic Library",
  description: "Bhagavad-gītā As It Is — Structured Study Edition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <ReadingModeProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ReadingModeProvider>

      </body>
    </html>
  );
}
