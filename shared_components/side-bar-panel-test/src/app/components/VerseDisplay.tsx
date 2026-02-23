import { gitaData } from '../data/gitaData';

interface VerseDisplayProps {
  selectedVerse: { chapter: number; verse: number };
}

export function VerseDisplay({ selectedVerse }: VerseDisplayProps) {
  const chapter = gitaData.find((ch) => ch.chapter === selectedVerse.chapter);
  const verse = chapter?.verses.find((v) => v.verse === selectedVerse.verse);

  if (!chapter || !verse) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Verse not found
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Bhagavad Gita {selectedVerse.chapter}.{selectedVerse.verse}
          </h1>
          <p className="text-gray-600 text-sm">{chapter.title}</p>
        </div>

        <div className="mb-8 text-center">
          <p className="text-3xl leading-relaxed" style={{ fontFamily: 'serif' }}>
            {verse.sanskrit}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-lg italic text-gray-700 leading-relaxed text-center">
            {verse.transliteration}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase text-green-700 mb-3 tracking-wide">
            SYNONYMS
          </h2>
          <p className="text-gray-800 leading-relaxed">{verse.synonyms}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase text-green-700 mb-3 tracking-wide">
            TRANSLATION
          </h2>
          <p className="text-red-900 leading-relaxed">{verse.translation}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase text-green-700 mb-3 tracking-wide">
            PURPORT
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">{verse.purport}</p>
        </div>
      </div>
    </div>
  );
}
