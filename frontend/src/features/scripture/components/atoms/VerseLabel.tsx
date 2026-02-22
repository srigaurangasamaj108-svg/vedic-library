interface VerseLabelProps {
  chapter?: number;
  verse?: number;
}

export function VerseLabel({ chapter, verse }: VerseLabelProps) {
  return (
    <div className="text-sm text-gray-500 uppercase tracking-widest">
      {chapter && `Chapter ${chapter}`}
      {verse && ` • Verse ${verse}`}
    </div>
  );
}
