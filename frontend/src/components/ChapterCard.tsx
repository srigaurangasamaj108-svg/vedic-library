import Link from "next/link";
import { ChapterMeta } from "@/lib/constants";

export function ChapterCard({ chapter }: { chapter: ChapterMeta }) {
    return (
        <Link href={`./bg/${chapter.id}`} className="block group h-full">
            <div className="h-full p-6 bg-white border border-[#dee2e6] rounded-sm transition-all duration-200 hover:border-[#0056b3] hover:shadow-sm">
                <div className="flex justify-between items-baseline mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0056b3]">
                        Chapter {chapter.id}
                    </span>
                    <span className="text-xs text-[#888] font-medium">
                        {chapter.verseCount} Verses
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#212529] group-hover:text-[#0056b3] transition-colors">
                    {chapter.englishTitle}
                </h3>

                <p className="text-sm text-[#6c757d] italic mb-4 font-serif">
                    {chapter.sanskritTitle}
                </p>

                <p className="text-sm text-[#495057] line-clamp-3 leading-relaxed">
                    {chapter.summary}
                </p>
            </div>
        </Link>
    );
}
