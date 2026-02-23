import { useState } from 'react';
import { SidebarTree } from './components/SidebarTree';
import { VerseDisplay } from './components/VerseDisplay';

export default function App() {
  const [selectedVerse, setSelectedVerse] = useState({ chapter: 1, verse: 1 });

  const handleVerseSelect = (chapter: number, verse: number) => {
    setSelectedVerse({ chapter, verse });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SidebarTree selectedVerse={selectedVerse} onVerseSelect={handleVerseSelect} />
      <VerseDisplay selectedVerse={selectedVerse} />
    </div>
  );
}
