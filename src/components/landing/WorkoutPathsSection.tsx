const PATHS = [
  {
    name: "Tank Path: Week 1",
    label: "ACTIVE",
    description:
      "Foundation building. Heavy compound movements focusing on form.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL5cZserwafB4yxdyewFy9Ns58dLiND0qlgWhp5bMKiqIHOIE338bmIR2a3J9AvecffODcVu_1SYhuX3jELXW9tFdRnHariSmcbwm-KDMSC9DgNgbhGTW2x3U3tU0-TLhS_r7C8EfepKPZUxbIJmYsZsPUSVXv9vgtB7QgAvnu5diuzkxr_q0EqrS8OjvBbOtybQQCv9eZOzMfhVBYNL13aDAvfaPpV1U5tZdlauLyGPv3-IeZy9qk5efE-uhmwyF_evBeQXqyjss",
    duration: "60m",
    intensity: "Heavy",
    locked: false,
    active: true,
    hoverColor: "border-[#ec4899]",
    glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    badgeClass: "bg-[#ec4899] text-white",
  },
  {
    name: "Mage Path: Mobility",
    label: "LOCKED (LVL 15)",
    description:
      "Increase range of motion and joint health with dynamic flows.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbMSVWklmt3OEGBlTC4hhyhCA_y7dx8uFSKee8Ym7HEwdzYHsHD6JYTGnTuZ-_SRk9AJ3N7iT0LOHnJ6FhNISC0QoXra8Np4pyipMiO3ifVGDqCAtLAex2j5x56JTr23wMgJyhPt1wbmGSc1_N5ajTmVXeNP4bI9ehOP8ET1a9A5aluFBTsQ1M0Y2n8J0RpLOF-K2rGTMTZOXRxYdTSYAkfh0IixSdmAGqHSO4e6nUicIYOQd8-_-H2TljJmKWROqkkQeUKu4bqyA",
    duration: "45m",
    intensity: "Light",
    locked: true,
    active: false,
    hoverColor: "hover:border-white/20",
    glowColor: "",
    badgeClass: "bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30",
  },
  {
    name: "Rogue Path: HIIT",
    label: "AVAILABLE",
    description:
      "High intensity interval training for maximum calorie burn.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSwWUVUSByLHYDzgM_5362SWW3fRaMunpltEK6mHRIHhi5NaQLgAss6WrDNgtZ4goWvP5FhiH7IkL53VTn6hkEocIQkY4re1gZIuNBuhURmcMw1rduP7zocAaoN-qlNkDKb1CKdsVk28J_6T-KmdGmmntuHdMXN8Qz7KWRKudtc9BOlb5CBHrCwZo4N7iRbtZmgc621jVB5wBDvqN3DoT2aq82p0Oe2587Wc6IvZWt0INGfiXjfqO7UrQrURLLra630j_RU_NchsY",
    duration: "35m",
    intensity: "Extreme",
    locked: false,
    active: false,
    hoverColor: "hover:border-[#06b6d4]/40",
    glowColor: "",
    badgeClass: "bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30",
  },
  {
    name: "Paladin: Power",
    label: "AVAILABLE",
    description: "Focus on the big three: Squat, Bench, and Deadlift.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrEGD_CcATRvP6G594k4069WhvgO0uJSWjdOn4R9FDKcN28G90cPbfutIwqxeV-DEU_9jSNYcTlOnIgI_tq45xYUt4sy1QhVgY-a5gkg6vJFRkvkuXLbQ8oTw3cVVjsgtxGsDjfG92WWzBIUPzGddf9dN4RG9fxz23pnZPNlBUPYZYGVTzUy69cvdd3yBYZNPqYQodMso6-Hz0uVO-W--HxqUvbaomN7f0UeE9ySaobF1X5xlB3Kqza9YPdXwMCNHo3Av0cx8aXo",
    duration: "75m",
    intensity: "Heavy",
    locked: false,
    active: false,
    hoverColor: "hover:border-yellow-500/40",
    glowColor: "",
    badgeClass:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  },
];

export default function WorkoutPathsSection() {
  return (
    <section className="py-24 bg-[#0c0b12] border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ec4899]/5 via-[#0c0b12] to-[#0c0b12] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold text-white">
              Choose Your{" "}
              <span className="text-[#ec4899] text-glow">Battles</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">
              Select your specialization
            </p>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full border border-white/10 bg-[#13111c] flex items-center justify-center text-white hover:bg-white/5 hover:border-[#ec4899]/50 hover:text-[#ec4899] transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 bg-[#13111c] flex items-center justify-center text-white hover:bg-white/5 hover:border-[#ec4899]/50 hover:text-[#ec4899] transition-all">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Path cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATHS.map((path) => (
            <div
              key={path.name}
              className={`group relative rounded-xl overflow-hidden bg-[#13111c] border flex flex-col hover:-translate-y-2 transition-transform duration-300 ${
                path.active
                  ? `border-[#ec4899] ${path.glowColor}`
                  : `border-white/5 ${path.hoverColor}`
              }`}
            >
              {/* Active badge */}
              {path.active && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#ec4899] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-[#ec4899]/40 uppercase tracking-widest">
                    Active
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="h-56 bg-gray-900 relative overflow-hidden">
                <img
                  src={path.image}
                  alt={path.name}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
                    path.locked ? "opacity-40 grayscale" : "opacity-60 grayscale group-hover:grayscale-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13111c] via-transparent to-transparent" />

                {/* Lock overlay */}
                {path.locked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white/30">
                      lock
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-lg mb-2 text-white group-hover:text-[#ec4899] transition-colors">
                  {path.name}
                </h3>
                <p className="text-xs text-gray-400 mb-6 flex-1 font-light leading-relaxed">
                  {path.description}
                </p>

                {path.locked ? (
                  <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                    <span className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                      {path.label}
                    </span>
                    <span className="material-symbols-outlined text-gray-600 text-sm">
                      lock
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-[10px] text-gray-500 mb-5 font-mono uppercase tracking-wide border-t border-white/5 pt-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {path.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">fitness_center</span>
                        {path.intensity}
                      </span>
                    </div>
                    {path.active ? (
                      <button className="w-full btn-synth py-3 rounded text-sm">
                        Resume Session
                      </button>
                    ) : (
                      <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded font-bold text-sm transition-all mt-auto uppercase tracking-wider border border-white/10 hover:border-white/30">
                        Preview
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
