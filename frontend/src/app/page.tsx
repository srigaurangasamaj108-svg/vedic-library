import { CHAPTERS } from "@/lib/constants";
import { HomeHero } from "@/components/HomeHero";
import { ChapterGrid } from "@/components/ChapterGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#2b2218]"> {/* Dark background for seamless Hero transition */}
      <HomeHero />
      <ChapterGrid chapters={CHAPTERS} />

      {/* Simple Footer Offering */}
      <footer className="py-12 bg-[#2b2218] text-[#8c5e2a] text-center font-serif text-sm border-t border-[#383330]">
        <p className="mb-2 opacity-60">Dedication to His Divine Grace</p>
        <p className="text-[#d4af37]">A.C. Bhaktivedanta Swami Prabhupāda</p>
      </footer>
    </main>
  );
}
