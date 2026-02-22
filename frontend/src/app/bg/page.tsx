import Link from "next/link";
import { CHAPTERS } from "@/lib/constants";

/**
 * Static generation for /bg
 */
export const dynamic = "force-static";

export default function BhagavadGitaIndexPage() {
  return (
    <main className="min-h-screen pb-32 font-serif">
      <div className="max-w-[760px] mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="text-sm uppercase tracking-wider text-gray-500">
            Bhagavad-gītā As It Is
          </div>

          <h1 className="text-4xl font-bold">
            The Eighteen Chapters
          </h1>

          <p className="text-gray-700 mt-4">
            The timeless dialogue between Śrī Kṛṣṇa and Arjuna.
          </p>
        </div>

        {/* Chapter List */}
        <div className="space-y-8">
          {CHAPTERS.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/bg/${chapter.id}`}
              className="block rounded-xl p-8 transition hover:bg-white/40 hover:shadow-sm"
            >
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                Chapter {chapter.id}
              </div>

              <h2 className="text-2xl font-semibold mb-2">
                {chapter.englishTitle}
              </h2>

              <div className="italic text-gray-600 mb-3">
                {chapter.sanskritTitle}
              </div>

              {chapter.summary && (
                <p className="text-gray-700 leading-relaxed">
                  {chapter.summary}
                </p>
              )}
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
