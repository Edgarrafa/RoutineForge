const CLANS = [
  {
    name: "The 5AM Club",
    badge: "Recruiting",
    badgeClass: "bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20",
    description:
      "Early risers dedicated to grinding before the sun comes up. Coffee required, excuses forbidden.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfLByUx4zXY3aQyrw4lIeh7zb-jPniOTKMa7CaDJco-BkeQirh4lcuxHtrb3glColIpgxlfDh6dZwvy_VSJjxUhLb3_PrdqHo9i6U_bVJDqJIXunT-S01wzX_WGqGABk3OYoiNzXH2EEqWGGiZ8Sh1S4DwjZ-oX_LGo9b4y2cVBVHeEg5dV_q4Xxq6PbGObuP2sU2FlW-YOsaY9gBMlBBjo3lWdgdgJxWoO7RzNWbY6TPiniRrOxhkrt_XjXAgP7KOp2docLzVyrQ",
    icon: "emoji_events",
    iconColor: "text-yellow-500",
    iconGlow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    members: "4,250",
    rank: "#4",
    hoverBorder: "hover:border-[#ec4899]/50",
    hoverShadow: "hover:shadow-neon",
    btnText: "Request to Join",
  },
  {
    name: "Voltage Vanguards",
    badge: "Invite Only",
    badgeClass: "bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20",
    description:
      "High intensity interval training specialists. We move fast and lift heavy.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6FXq7Un4iIv2yjcLm6ZA9Y17Tr3ijYpfWW6-E-UqSuIqe38ArGEXzmuEilTJ2bAuTYHSF6jUO0itexMjcfZylBW0TMf5M8vBwU7GDN27xwCo8Pv0WTyDDQ3EUGBGUgdDZVfxIfKeObc-QtRs4WMBIFCJMtxYFUerdjxEuVkeBCsavUddw_t8fuFL5s2wH02o6I9ajcqdUreONr6cxeeSn-9roxuPR2NFZWOJ5fqm_VscdgqCbyXDnUZPCGM6QFPPOCd4JUogF92Q",
    icon: "bolt",
    iconColor: "text-[#06b6d4]",
    iconGlow: "drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]",
    members: "892",
    rank: "#12",
    hoverBorder: "hover:border-[#06b6d4]/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    btnText: "View Requirements",
  },
  {
    name: "Iron Guardians",
    badge: "Recruiting",
    badgeClass: "bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20",
    description:
      "For those who protect the squat rack and re-rack their weights. The honorable lifters.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFUGjsAlO7G5wvAkH2evcFTrBtjg8HGWnMt7uUWzZLKh0-0pCA8JuDJqEatSsLNtzxV7ONCtbAzlcOVOjuSqKgfwqk8JjDJSqhwlKJHpx_fSGVIvO1vk6TUfqv5B9PGub9PaCLvvuJwROzfxFtzvfhZ9LFJ0JhmVn5mWltHnGN47USkAekn5xROb6vAYEQFAumlX13YdgRCfjrP-fhGEt3bC9mdz3AprKHJFKv-zLxc_ez1RQ3wWX7py_8-9THkOwt5dz4slgNRQI",
    icon: "shield",
    iconColor: "text-green-500",
    iconGlow: "drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    members: "12,050",
    rank: "#1",
    hoverBorder: "hover:border-green-500/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    btnText: "Request to Join",
  },
];

export default function ClanSection() {
  return (
    <section className="py-24 bg-[#09090b] relative">
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ec4899] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#ec4899] font-bold tracking-[0.2em] text-xs uppercase">
            Community
          </span>
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#a855f7]">
              Tribe
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join a clan to unlock exclusive raids, compete in clan wars, and get
            support from lifters on the same mission.
          </p>
        </div>

        {/* Clan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLANS.map((clan) => (
            <div
              key={clan.name}
              className={`bg-[#13111c] rounded-2xl overflow-hidden border border-white/5 ${clan.hoverBorder} transition-all hover:-translate-y-3 duration-300 shadow-lg ${clan.hoverShadow} group`}
            >
              {/* Image header */}
              <div className="h-36 bg-gray-900 relative">
                <img
                  src={clan.image}
                  alt={clan.name}
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Clan icon avatar */}
                <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-[#1e1c29] border-2 border-[#13111c] flex items-center justify-center z-10 shadow-2xl group-hover:border-[#ec4899]/50 transition-colors">
                  <span className={`material-symbols-outlined text-3xl ${clan.iconColor} ${clan.iconGlow}`}>
                    {clan.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 px-6 pb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl font-[family-name:var(--font-orbitron)] text-white group-hover:text-[#ec4899] transition-colors">
                    {clan.name}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${clan.badgeClass}`}>
                    {clan.badge}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-8 leading-relaxed">
                  {clan.description}
                </p>

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-6 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">person</span>
                    {clan.members} Members
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <span className="material-symbols-outlined text-sm">emoji_events</span>
                    Rank {clan.rank}
                  </div>
                </div>

                <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest transition-colors hover:border-[#ec4899]/30">
                  {clan.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
