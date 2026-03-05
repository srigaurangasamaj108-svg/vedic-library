export function HomeHero() {
  return (
    <section className="relative h-[65vh] flex items-center bg-[#2b2218] text-[#f9f5e3] overflow-hidden">

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[25%] w-[420px] h-[420px] bg-[#e6a75a] opacity-10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[15%] w-[380px] h-[380px] bg-[#a63410] opacity-10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-10 w-full">

        {/* Badge */}
        <div className="mb-6">
          <span className="px-4 py-1.5 border border-[#d4af37] text-[#d4af37] text-xs font-serif tracking-widest uppercase">
            A Structured Knowledge Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
          The Vedic Library
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#d6ccb5] max-w-2xl mb-10 leading-relaxed">
          A civilizational archive of Śruti, Smṛti, Itihāsa, Purāṇa,
          Darśana, Vedāṅga, and Sampradāya literature —
          organized with structural integrity.
        </p>

        {/* CTA */}
        <a
          href="/library"
          className="inline-block px-8 py-3 bg-[#d4af37] text-[#2b2218] font-semibold tracking-wide hover:opacity-90 transition"
        >
          Enter the Library
        </a>

      </div>
    </section>
  );
}
