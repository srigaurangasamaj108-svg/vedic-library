import Link from "next/link"
import { Button } from "@/components/ui/button"

interface VerseNavigationProps {
  canon: string
  chapter: number
  verse: number
  hasPrevious: boolean
  hasNext: boolean
}

export function VerseNavigation({
  canon,
  chapter,
  verse,
  hasPrevious,
  hasNext,
}: VerseNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-16 w-full max-w-3xl mx-auto">
      {hasPrevious ? (
        <Button asChild variant="outline">
          <Link href={`/library/${canon}/${chapter}/${verse - 1}`}>
            ← Previous
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {hasNext ? (
        <Button asChild variant="outline">
          <Link href={`/library/${canon}/${chapter}/${verse + 1}`}>
            Next →
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  )
}
