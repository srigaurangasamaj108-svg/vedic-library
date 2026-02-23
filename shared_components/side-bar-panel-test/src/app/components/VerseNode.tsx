interface VerseNodeProps {
  chapterNumber: number;
  verseNumber: number;
  isSelected: boolean;
  onClick: () => void;
}

export function VerseNode({ chapterNumber, verseNumber, isSelected, onClick }: VerseNodeProps) {
  return (
    <div
      className={`pl-8 py-1.5 cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-100 text-blue-900 font-medium'
          : 'hover:bg-gray-100 text-gray-700'
      }`}
      onClick={onClick}
    >
      {chapterNumber}.{verseNumber}
    </div>
  );
}
