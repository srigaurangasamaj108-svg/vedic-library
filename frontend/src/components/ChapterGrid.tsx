import Link from "next/link";
import { ChapterMeta } from "@/lib/constants";

export function ChapterGrid({ chapters }: { chapters: ChapterMeta[] }) {
    return (
        <section id="chapters" className="py-24 bg-[#f9f5e3]">
            <div className="container max-w-6xl px-4">

                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-serif text-[#2b2218] mb-4">The Eighteen Jewels</h2>
                    <div className="h-1 w-24 bg-[#e6a75a] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter, index) => (
                        <Link
                            key={chapter.id}
                            href={`/bg/${chapter.id}`}
                            className="group relative bg-[#fdfbf7] p-8 rounded-sm border border-[#eee9d5] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#d4af37] overflow-hidden"
                        >
                            {/* Decoration: Subtle background number */}
                            <span className="absolute -right-4 -top-8 text-[120px] font-serif text-[#f0e4b8] opacity-20 group-hover:opacity-40 transition-opacity duration-500 select-none">
                                {chapter.id}
                            </span>

                            <div className="relative z-10">
                                <span className="block text-xs font-bold tracking-widest uppercase text-[#a63410] mb-3 group-hover:text-[#d4af37] transition-colors">
                                    Chapter {chapter.id}
                                </span>

                                <h3 className="text-2xl font-bold text-[#2b2218] mb-2 font-serif group-hover:text-[#a63410] transition-colors">
                                    {chapter.englishTitle}
                                </h3>

                                <p className="text-sm font-serif italic text-[#8c5e2a] mb-6">
                                    {chapter.sanskritTitle}
                                </p>

                                <p className="text-[#5c4d3c] text-sm leading-relaxed line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {chapter.summary}
                                </p>

                                <div className="mt-6 flex items-center text-xs font-bold uppercase text-[#d4af37] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    Read Verse <span className="ml-2">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
