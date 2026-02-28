const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCIQs5tegz3_bcP3kDLY3A5VPD2BOLajJerZa4OMbSZYevMS_ltdUheB-VcrrScdZjrUr50I2KnOToxxKEM-WXAD4QFZhxRbqXNOptyEwF8_jpxrwODA4aubsi8Z0Fnt7EWQqFZMn1Qj6AWoRBTzJ91FfTF0wcIgDe4FMrW2EdMlsO_y9CyLCM-O2kbLf7G04S78E6GvTDcbjerYW5R0ly4cNCynHRkoDikFaQ7zTIdd6PowyZ5DED05NEoG2UzrmqU_yc20PVaKns",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDItN54ANJtojfXpbzPL-ekM4gbrkumhSgVE95H9n2tGNZzFbUmfgyvCTO-2HU9MvNF5VL_7Uau_9_3lJYrHGCqdgEw9JXO4nlcX1qSUL9Sf2M9qF2XPKsrbjA1Go5xbn0xXp2CJO2BCZbhxL6vu6FneGLo-QjLxRizLZ9wIFWQ48KNcFZQXfm559gUq424fYTzVJdhn5Ieu5UfCKlZEQvz8MOsU9zEz3aTlEzoxL5IqJgD_aUUZ4FUff7KjwyQWD9C6kCRtsvXJ7k",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDqAyFb4aJCE3HTNlVGbLqKU3ATJ1OOwEsS5JiKntQ_Ip-Ua4PH5-cjlHQq9bMdVkAcj8vpSFsNZ1nEKWnGuYbJfBYX6KbreohYi0sftYOROjGNGRdkemaUXrTOtvpxchzhB2PGhfpPJEeGPQyQNrZ8QFrK0Y-MXKegqAkP9WXRGbf8Z62JdaE3EQvfnk-1tVjpZkgZ1ja_WQKevAJ1LHGVgulX_zqOOgwRBT5TVX4iyrZqCrT0QjvAzD_lBykRs3xswZhF1J94qm0",
];

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden min-h-screen flex items-center">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40 pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ec4899]/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md hover:border-[#ec4899]/50 transition-colors cursor-default">
          <div className="flex -space-x-3">
            {AVATARS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Community member"
                className="w-8 h-8 rounded-full border-2 border-[#09090b] object-cover grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#ec4899] tracking-wide uppercase">
            +10k Lifters joined this week
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-orbitron)] text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight text-white drop-shadow-2xl">
          Level Up Your <br />
          <span className="gradient-text text-glow">Strength.</span>
        </h1>

        {/* Body copy */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Construct your legacy. Battle bosses, earn legendary loot, and lift
          with your clan in the ultimate{" "}
          <span className="text-white font-medium">RPG fitness builder</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="btn-synth w-full sm:w-auto px-10 py-4 text-lg">
            <span className="material-symbols-outlined">bolt</span>
            Start Your Quest
          </button>
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-[#ec4899]/50 px-10 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-3 backdrop-blur-sm group">
            <span className="material-symbols-outlined group-hover:text-[#ec4899] transition-colors">
              explore
            </span>
            Explore Paths
          </button>
        </div>
      </div>
    </section>
  );
}
