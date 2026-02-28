import Link from "next/link";

const BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpA1uL1rJFs3LJKa-0yEu4F8u-Is5tyl8ThMNMSEZf_p7QyUX1SEwgDgzuQONyYPtpQgFPxic_jF5yUX5MRzh2uQ0DpLqzk3_EdZvbtiVad7m8jjuCxTw5S1D-fx3EHErvC9APh2PE-E7ZBgNZlGTO7kFmK_bMXRtHcMIVAHN3gp4zrfm3Iu2DGGzqRT0rlsKXo0rteDfDw06WUWMGGmb80x8ySXqY203Kj0lOEzo6mximU8X70k8ceOsREvO_Cur4QA9T5u_sDuk";

export default function WotdCard() {
  return (
    <div className="w-full bg-[#0f0f23] rounded-2xl border border-[#ff00ff]/30 shadow-[0_0_30px_-10px_rgba(188,19,254,0.3)] relative overflow-hidden group">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{ backgroundImage: `url("${BG_IMAGE}")` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f23] via-[#0f0f23]/90 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: info */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[#00f3ff] text-xs font-bold uppercase tracking-widest border border-[#00f3ff]/30 bg-[#00f3ff]/10 px-2 py-0.5 rounded">
              Active Program
            </span>
            <p className="text-[#9ca3af] text-sm font-medium">
              12-Week Strength Program{" "}
              <span className="text-[#bc13fe] ml-1 font-bold">(Week 1/12)</span>
            </p>
          </div>

          <h1 className="font-[family-name:var(--font-lexend)] text-3xl sm:text-4xl font-black italic uppercase text-white drop-shadow-md">
            Workout of the Day:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9ca3af]">
              Upper Body Power
            </span>
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#9ca3af] mt-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#ff00ff] text-lg">timer</span>
              <span>45 min</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#2d2d55]" />
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#bc13fe] text-lg">
                fitness_center
              </span>
              <span>Hypertrophy Focus</span>
            </div>
          </div>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-col items-stretch gap-3 w-full sm:w-52 shrink-0">
          <Link href="/session" className="w-full bg-[#ff00ff] hover:bg-[#ff00ff]/90 text-black font-black uppercase tracking-wider py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 font-[family-name:var(--font-lexend)]">
            <span className="material-symbols-outlined">play_arrow</span>
            Start Logging
          </Link>
          <button className="w-full bg-[#050510]/50 border border-[#2d2d55] hover:border-[#9ca3af] text-[#9ca3af] text-xs py-2 px-4 rounded flex items-center justify-between transition-colors">
            <span>Skip Today</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </div>

      {/* Progress bar strip */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2d2d55] z-20">
        <div
          className="h-full bg-gradient-to-r from-[#ff00ff] to-[#bc13fe] w-[8%]"
          style={{ boxShadow: "0 0 10px #ff00ff" }}
        />
      </div>
    </div>
  );
}
