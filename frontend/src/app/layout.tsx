import "./globals.css";
import type { Metadata } from "next";
import { GlobalHeader } from "@/components/layout/GlobalHeader";

export const metadata: Metadata = {
  title: "Vedic Library",
  description: "Structured Vedic Knowledge Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#e8e2d3]">
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
