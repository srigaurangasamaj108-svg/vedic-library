export function HomeHero() {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#2b2218] text-[#f9f5e3] py-20">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#e6a75a] rounded-full opacity-10 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-[#a63410] rounded-full opacity-10 blur-[100px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container max-w-4xl px-4">

                {/* Animated Badge */}
                <div className="inline-block mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="px-4 py-1.5 rounded-full border border-[#d4af37] text-[#d4af37] text-xs font-serif italic tracking-widest uppercase">
                        The Timeless Wisdom
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tight leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    The <span className="text-gold-gradient italic animate-pulse-glow">Eternal</span> <br />
                    Song of God
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-[#d6ccb5] max-w-2xl mx-auto mb-12 font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Dive into the Bhagavad-gītā As It Is. <br />
                    <span className="italic text-[#8c5e2a]">A journey from darkness to light.</span>
                </p>

                {/* CTA Button */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <a href="#chapters" className="inline-block px-8 py-4 bg-gradient-to-r from-[#e6a75a] to-[#d4af37] text-[#2b2218] font-bold rounded-sm shadow-glow hover:scale-105 transition-transform duration-300">
                        Begin Reading
                    </a>
                </div>

                {/* Floating Graphic Element (Mockup of a Book or Symbol) */}
                <div className="mt-16 animate-float opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                    <div className="text-[10rem] leading-none opacity-20 select-none font-serif text-[#d4af37]">
                        ॐ
                    </div>
                </div>

            </div>
        </section>
    );
}
