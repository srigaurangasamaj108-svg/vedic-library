"use client";

import { ScriptBlock } from "../atoms/ScriptBlock";
import { VerseLabel } from "../atoms/VerseLabel";
import { VerseNavigation } from "../molecules/VerseNavigation";
import { TranslationBlock } from "../atoms/TranslationBlock";
import { useScriptureMode } from "@/features/scripture/mode/mode.context";

interface VerseDisplayProps {
  chapter: number;
  verse: number;
  title: string;
  devanagari: string;
  transliteration: string;
  translation?: {
    content: string;
    author?: string;
  };
  hasPrevious: boolean;
  hasNext: boolean;
}

export function VerseDisplay({
  chapter,
  verse,
  title,
  devanagari,
  transliteration,
  translation,
  hasPrevious,
  hasNext,
}: VerseDisplayProps) {
  const { mode } = useScriptureMode();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">

      {/* Header */}
      <div className="text-center space-y-4 mb-20">
        <VerseLabel chapter={chapter} />

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h1>

        <div className="text-sm text-gray-500 tracking-wide">
          Verse {verse}
        </div>
      </div>

      {/* Devanagari */}
      {(mode.script === "devanagari" || mode.script === "both") && (
        <div className="space-y-8">
          <ScriptBlock content={devanagari} />
        </div>
      )}

      {/* Transliteration */}
      {(mode.script === "iast" || mode.script === "both") && (
        <div className="mt-14">
          <ScriptBlock
            content={transliteration}
            variant="secondary"
          />
        </div>
      )}

      {/* Translation */}
      {translation && mode.translation !== "none" && (
        <div className="mt-16">
          <TranslationBlock
            content={translation.content}
            author={translation.author}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-20">
        <VerseNavigation
          chapter={chapter}
          verse={verse}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
}
