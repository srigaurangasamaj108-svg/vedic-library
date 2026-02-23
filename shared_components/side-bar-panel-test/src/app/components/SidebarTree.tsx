import { ChapterNode } from './ChapterNode';
import { gitaData } from '../data/gitaData';
import { Search } from 'lucide-react';

interface SidebarTreeProps {
  selectedVerse: { chapter: number; verse: number };
  onVerseSelect: (chapter: number, verse: number) => void;
}

export function SidebarTree({ selectedVerse, onVerseSelect }: SidebarTreeProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-300 flex flex-col h-screen">
      <div className="p-3 border-b border-gray-300 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search verses..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {gitaData.map((chapter) => (
            <ChapterNode
              key={chapter.chapter}
              chapter={chapter}
              selectedVerse={selectedVerse}
              onVerseSelect={onVerseSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
