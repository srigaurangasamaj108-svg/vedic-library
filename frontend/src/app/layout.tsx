import "./globals.css";
import type { Metadata } from "next";
import { ScriptureModeProvider } from "@/features/scripture/mode/mode.context";
import { ScriptToggle } from "@/features/scripture/mode/ScriptToggle";
import { TranslationToggle } from "@/features/scripture/mode/TranslationToggle";

export const metadata: Metadata = {
  title: "Vedic Library",
  description: "A canonical scripture archive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">

        <ScriptureModeProvider>

          {/* Header */}
          <header className="border-b bg-white">
            <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">

              <div className="font-semibold tracking-wide">
                Vedic Library
              </div>

              <div className="flex items-center gap-8">
                <ScriptToggle />
                <TranslationToggle />
              </div>

            </div>
          </header>

          {/* Main Content */}
          <main>
            {children}
          </main>

        </ScriptureModeProvider>

      </body>
    </html>
  );
}
