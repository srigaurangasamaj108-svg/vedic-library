import "./globals.css";
import type { Metadata } from "next";

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
      <body className="bg-background">
        {children}
      </body>
    </html>
  );
}
