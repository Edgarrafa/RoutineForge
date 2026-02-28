export default function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0f0e17] to-[#1a1025] relative overflow-hidden flex items-center justify-center border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_#ec4899_0%,_#a855f7_100%)] opacity-20 pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#ec4899] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#a855f7] rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-orbitron)] text-5xl md:text-7xl font-black text-white mb-8 drop-shadow-xl">
          Ready to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-glow">
            Ascend?
          </span>
        </h2>
        <p className="text-gray-300 text-xl mb-12 font-light">
          The gym is your dungeon. Your gains are your loot.
        </p>
        <button className="bg-white text-black hover:bg-gray-100 px-12 py-5 rounded-full text-lg font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(236,72,153,0.5)]">
          Start Your Quest
        </button>
      </div>
    </section>
  );
}
