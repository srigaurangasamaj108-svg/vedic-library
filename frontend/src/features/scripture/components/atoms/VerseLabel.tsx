interface VerseLabelProps {
  chapter?: number;
  verse?: number;
}

export function VerseLabel({ chapter, verse }: VerseLabelProps) {
  return (
    <div className="text-xs uppercase tracking-[0.2em] text-gray-400">
      {chapter && <span>Chapter {chapter}</span>}
      {chapter && verse && <span className="mx-3">•</span>}
      {verse && <span>Verse {verse}</span>}
    </div>
  );
}
