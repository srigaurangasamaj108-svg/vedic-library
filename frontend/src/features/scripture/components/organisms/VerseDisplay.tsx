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
    <div>
      <div className="text-center mb-16">
        <VerseLabel chapter={chapter} />
        <h1 className="text-3xl font-semibold mt-3">
          {title}
        </h1>
        <div className="mt-4 text-sm text-gray-500">
          Verse {verse}
        </div>
      </div>

      {(mode.script === "devanagari" || mode.script === "both") && (
        <ScriptBlock content={devanagari} />
      )}

      {(mode.script === "iast" || mode.script === "both") && (
        <div className="mt-12">
          <ScriptBlock
            content={transliteration}
            variant="secondary"
          />
        </div>
      )}

      {translation && mode.translation !== "none" && (
        <TranslationBlock
          content={translation.content}
          author={translation.author}
        />
      )}

      <VerseNavigation
        chapter={chapter}
        verse={verse}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </div>
  );
}
