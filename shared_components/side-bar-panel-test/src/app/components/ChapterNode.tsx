import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { VerseNode } from './VerseNode';
import type { Chapter } from '../data/gitaData';

interface ChapterNodeProps {
  chapter: Chapter;
  selectedVerse: { chapter: number; verse: number };
  onVerseSelect: (chapter: number, verse: number) => void;
}

export function ChapterNode({ chapter, selectedVerse, onVerseSelect }: ChapterNodeProps) {
  const [isExpanded, setIsExpanded] = useState(chapter.chapter === 1);

  return (
    <div>
      <div
        className="flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
        <span className="font-medium text-gray-800">Chapter {chapter.chapter}</span>
      </div>
      {isExpanded && (
        <div>
          {chapter.verses.map((verse) => (
            <VerseNode
              key={`${chapter.chapter}-${verse.verse}`}
              chapterNumber={chapter.chapter}
              verseNumber={verse.verse}
              isSelected={
                selectedVerse.chapter === chapter.chapter &&
                selectedVerse.verse === verse.verse
              }
              onClick={() => onVerseSelect(chapter.chapter, verse.verse)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
