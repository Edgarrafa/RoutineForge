import Link from "next/link";

const BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAL5cZserwafB4yxdyewFy9Ns58dLiND0qlgWhp5bMKiqIHOIE338bmIR2a3J9AvecffODcVu_1SYhuX3jELXW9tFdRnHariSmcbwm-KDMSC9DgNgbhGTW2x3U3tU0-TLhS_r7C8EfepKPZUxbIJmYsZsPUSVXv9vgtB7QgAvnu5diuzkxr_q0EqrS8OjvBbOtybQQCv9eZOzMfhVBYNL13aDAvfaPpV1U5tZdlauLyGPv3-IeZy9qk5efE-uhmwyF_evBeQXqyjss";

export default function TodayFocusCard() {
  return (
    <div className="cyber-card rounded-2xl overflow-hidden relative shadow-neon group">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt="Workout Background"
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 p-8 md:p-12 flex flex-col justify-center min-h-[300px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] text-xs font-bold uppercase tracking-wider rounded backdrop-blur-md">
            Today&apos;s Focus
          </span>
          <div className="h-px w-10 bg-[#a855f7]" />
        </div>

        {/* Headline */}
        <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase italic text-glow">
          Upper Body{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#a855f7]">
            Power
          </span>
        </h2>

        {/* Metadata pills */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-300 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
            <span className="material-symbols-outlined text-[#ec4899] text-sm">timer</span>
            <span className="text-sm font-mono font-bold">45-60 MIN</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
            <span className="material-symbols-outlined text-yellow-500 text-sm">fitness_center</span>
            <span className="text-sm font-mono font-bold">INTENSITY: HIGH</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
            <span className="material-symbols-outlined text-[#06b6d4] text-sm">analytics</span>
            <span className="text-sm font-mono font-bold">EST. XP: 850</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/session" className="btn-synth px-8 py-4 rounded-lg flex items-center justify-center gap-3 group/btn text-lg shadow-[0_0_20px_rgba(236,72,153,0.4)] font-[family-name:var(--font-orbitron)] font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined group-hover/btn:animate-pulse">play_circle</span>
            Start Session
          </Link>
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold uppercase tracking-widest px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors backdrop-blur-sm">
            <span className="material-symbols-outlined text-gray-400">info</span>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
