import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS } from "@/lib/constants";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadVerse } from "@/lib/loadVerse";

export async function generateStaticParams() {
    return CHAPTERS.map((c) => ({
        chapter: c.id.toString(),
    }));
}

export default async function ChapterPage({
    params,
    searchParams,
}: {
    params: Promise<{ chapter: string }>;
    searchParams: Promise<{ view?: string }>;
}) {
    const { chapter } = await params;
    const { view } = await searchParams;
    const isAdvanced = view === 'advanced';

    const chapterId = Number(chapter);
    const chapterData = CHAPTERS.find((c) => c.id === chapterId);

    if (!chapterData) {
        notFound();
    }

    // Fetch all verses in parallel
    const versePromises = Array.from({ length: chapterData.verseCount }, (_, i) =>
        loadVerse(`bg.${chapterId}.${i + 1}`)
    );
    const verses = await Promise.all(versePromises);

    return (
        <main className="pb-32 bg-[var(--bg-primary)] min-h-screen font-serif">
            <div className="max-w-[720px] mx-auto px-6 py-12">
                <Breadcrumbs />

                <div className="mb-20 text-center">
                    <span className="text-[#a63410] font-bold tracking-widest uppercase text-xs mb-3 block">
                        Chapter {chapterData.id}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-[#2b2218]">
                        {chapterData.englishTitle}
                    </h1>
                    <h2 className="text-xl italic text-[#5c4d3c] font-serif mb-8">
                        {chapterData.sanskritTitle}
                    </h2>
                    <p className="text-[19px] leading-relaxed text-[#2b2218] mb-12 max-w-xl mx-auto">
                        {chapterData.summary}
                    </p>

                    {/* View Toggle - Soft Saffron Style */}
                    <div className="flex justify-center gap-4 text-sm font-serif">
                        <Link
                            href={`/bg/${chapterId}`}
                            className={`px-5 py-2 rounded-[8px] transition-colors font-medium ${!isAdvanced
                                ? 'bg-[#e6a75a] bg-opacity-20 text-[#5c4d3c]'
                                : 'text-[#888] hover:bg-[#e6a75a] hover:bg-opacity-10'}`}
                        >
                            Translations
                        </Link>
                        <Link
                            href={`/bg/${chapterId}?view=advanced`}
                            className={`px-5 py-2 rounded-[8px] transition-colors font-medium ${isAdvanced
                                ? 'bg-[#e6a75a] bg-opacity-20 text-[#5c4d3c]'
                                : 'text-[#888] hover:bg-[#e6a75a] hover:bg-opacity-10'}`}
                        >
                            Advanced View
                        </Link>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Mode 1: Translation List (Default) */}
                    {!isAdvanced && (
                        <div className="space-y-0">
                            {verses.map((verse, index) => (
                                <Link
                                    key={verse.uid}
                                    href={`/bg/${chapterId}/${index + 1}`}
                                    className="block py-5 border-b border-transparent hover:bg-[#e6a75a] hover:bg-opacity-5 transition-colors rounded-sm px-4 -mx-4 group"
                                >
                                    <div className="flex gap-6 items-baseline">
                                        <div className="text-[#a63410] font-bold font-serif whitespace-nowrap text-lg w-12 text-right">
                                            {index + 1}
                                        </div>
                                        <p className="text-[#2b2218] font-serif leading-relaxed text-[19px] group-hover:text-[#a63410] transition-colors">
                                            {verse.translation?.text || "Translation not available."}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Mode 2: Advanced View (Full Detail Stream) */}
                    {isAdvanced && (
                        <div className="space-y-32"> {/* Large vertical rhythm */}
                            {verses.map((verseData, index) => (
                                <article key={verseData.uid} id={`verse-${index + 1}`}>
                                    <div className="text-center mb-10">
                                        <Link href={`/bg/${chapterId}/${index + 1}`} className="inline-block text-2xl font-bold text-[#2b2218] mb-8 hover:text-[#a63410] decoration-[#a63410] underline-offset-4 pointer-cursor hover:underline">
                                            Bg. {chapterId}.{index + 1}
                                        </Link>

                                        <div className="text-[26px] md:text-[30px] font-medium leading-[1.8] text-[#2b2218] whitespace-pre-line mb-6 font-serif">
                                            {verseData.devanagari}
                                        </div>

                                        <div className="text-[20px] md:text-[24px] italic text-[#2b2218] leading-[1.8] whitespace-pre-line mb-6 font-serif">
                                            {verseData.iast}
                                        </div>
                                    </div>

                                    {verseData.synonyms && (
                                        <div className="mb-10 text-center">
                                            <h3 className="text-xl font-bold text-[#2b2218] mb-4">Synonyms</h3>
                                            <div className="text-[19px] text-justify leading-[1.8] text-[#2b2218]">
                                                {verseData.synonyms.map((item, idx) => (
                                                    <span key={idx} className="inline mr-1.5">
                                                        <span className="text-[#a63410] italic font-medium">{item.sanskrit}</span> — {item.meaning};
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {verseData.translation && (
                                        <div className="mb-12">
                                            <h3 className="text-xl font-bold text-center text-[#2b2218] mb-4">Translation</h3>
                                            <div className="text-[21px] font-medium text-[#2b2218] leading-[1.8] text-justify px-0 md:px-4">
                                                {verseData.translation.text}
                                            </div>
                                        </div>
                                    )}

                                    {verseData.purport && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-center text-[#2b2218] mb-4">Purport</h3>
                                            <div className="prose prose-lg max-w-none text-[#2b2218] leading-[1.8] text-justify font-serif text-[19px]">
                                                {verseData.purport.text}
                                            </div>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
