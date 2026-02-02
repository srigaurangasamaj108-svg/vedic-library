export function ViewOptions() {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm font-serif">
            <button className="px-5 py-2 bg-[#e6a75a] bg-opacity-20 hover:bg-opacity-30 rounded-full text-[#5c4d3c] font-medium transition-colors">
                Default View
            </button>
            <button className="px-5 py-2 bg-[#e6a75a] bg-opacity-10 hover:bg-opacity-20 rounded-full text-[#5c4d3c] font-medium transition-colors">
                Show in Advanced View
            </button>
            <button className="px-5 py-2 bg-[#e6a75a] bg-opacity-10 hover:bg-opacity-20 rounded-full text-[#5c4d3c] font-medium transition-colors flex items-center gap-2">
                <span>Dual Language View</span>
                <span className="text-[10px] opacity-60">▼</span>
            </button>
        </div>
    );
}
