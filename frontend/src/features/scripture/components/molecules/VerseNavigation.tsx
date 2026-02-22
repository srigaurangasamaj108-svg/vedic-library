import Link from "next/link";

interface VerseNavigationProps {
  chapter: number;
  verse: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function VerseNavigation({
  chapter,
  verse,
  hasPrevious,
  hasNext,
}: VerseNavigationProps) {
  return (
    <div className="flex justify-between text-sm mt-16">
      {hasPrevious ? (
        <Link href={`/bg/${chapter}/${verse - 1}`}>
          ← Previous
        </Link>
      ) : (
        <div />
      )}

      {hasNext && (
        <Link href={`/bg/${chapter}/${verse + 1}`}>
          Next →
        </Link>
      )}
    </div>
  );
}
