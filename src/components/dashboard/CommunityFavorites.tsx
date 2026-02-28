const WORKOUTS = [
  {
    name: "5x5 Strength",
    tags: ["Chest", "Legs"],
    rating: "4.9",
    countColor: "bg-[#bc13fe]",
    count: "+2k",
    hoverBorder: "hover:border-[#bc13fe]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(188,19,254,0.3)]",
    hoverTitle: "group-hover:text-[#bc13fe]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWaohV5DLt7cyLmr_GMZJLX2l6AZ_b2yr9x4sGBNgZBAB22iY8hxx1NboD7zJpnQpNb6GQsEONs4svknWXviLgtivEb9rRFa6qDX6N-K2zLuhP-bEpAZSngNqIwoAQsGLLTDpMm1JFLVtSZcOnkSxg9nnIUK5Yc8QeQOUqvNdiQdXR_kQmZ3BFaB4ENHZJ5MkxoFP__MXxuzVPmF_qW_YtAT8J7kYwVlLq5M1vjA9NO8HPP0JvoQ7aPCDoBwyx_NdKOAu-McpMXhM",
    explore: false,
  },
  {
    name: "HIIT Burner",
    tags: ["Cardio", "Core"],
    rating: "4.8",
    countColor: "bg-[#ff00ff]",
    count: "+850",
    hoverBorder: "hover:border-[#ff00ff]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
    hoverTitle: "group-hover:text-[#ff00ff]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlK5ef3q2f0D8zqNqilpfzUdHPEvnZH52Y_oMsdFqf-cgRYJleR5wJs9gR_Z25syO-pNOKZZ-KFTEtUmCDCUF-Orj9U16qZKb4l5uIs51qtf9ukNdlRiNEVJn80AmA8hUwadMhdw9VOClr2KrrB7xyLaiO5Sg7g2p9tftT2Nzq8nWE8ajV3feT44LB-Dln3KqaqcGIXPssoMDwb_N65AqrFosTdYNDYY9rgNL4bNY44G1HT9U1f8euEKy92lq0V-M9UyCsqi4Z7R4",
    explore: false,
  },
  {
    name: "Mobility Flow",
    tags: ["Flexibility", "Recovery"],
    rating: "5.0",
    countColor: "bg-[#00f3ff] text-black",
    count: "+500",
    hoverBorder: "hover:border-[#00f3ff]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]",
    hoverTitle: "group-hover:text-[#00f3ff]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-9uHEKVPdKxKtQy8o8hYh5HdL2WeH24ABDXlLX2i2un19GH00HkPU-3eYtz0DlHHNoYYFLW-ZfvZbP46R7-H7NHD8aLHZiDP9so7Ujb7ErF0w-0zaS8qw4c_u8u0SkXEuLBK06f9khaHSSBeduehSlqh5E3bBLjEkoapHtarMaEKVcqa17CT9s8iE6PJVUMdg-NJhOFE5Xo5DZGQENwWOGHOR6648Gyj94HFdekcpzFg3iRdPecclvsTyrmUZrrHa72wuS-Q51vk",
    explore: false,
  },
  {
    name: "Arnold Split",
    tags: ["Arms", "Shoulders"],
    rating: "4.7",
    countColor: "bg-[#bc13fe]",
    count: "+1.2k",
    hoverBorder: "hover:border-[#bc13fe]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(188,19,254,0.3)]",
    hoverTitle: "group-hover:text-[#bc13fe]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZiZzsr4-V3fJzPK_zZKZ2Chjm00wDubu_9a4xI3MvBVe8JO3PGL_9h2DeZLb0meWM-Unn9DgJjy1m1ouiwUjFz16JsZWSu2-hgyuT4SqRmuCLBxYEvW5i9RRYfavgtHbGBiMCQ0hr1D6c3Ky8Vd4hoP-LpCrLhfJ6M2Sx2z8u-uglLlLZ_-vfQT5sYNDqMVUGrhrKeCwDO9ASQsSt4xQokt50koeRZa2qhLYaD9GDeuUqxvBhYF0bEdAFoQ8phVMvn-o5F1ha1fY",
    explore: false,
  },
  {
    name: "Power Yoga",
    tags: ["Flexibility"],
    rating: null,
    countColor: "",
    count: "",
    hoverBorder: "hover:border-[#ff00ff]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
    hoverTitle: "group-hover:text-[#ff00ff]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1QTRPOKBzSU0pEwteQdPIN7MsDrtT87nmQyV2HrnFTZhIVMDfcXRC6K_JAej6Prv2LEOeQGylcJZPjWZsB4PjHsZG1iCQoLdZcHNpUyk16LK9JF5TC_NpMsaHaE_xoUAW8pj0Ri-bCwMaHe7GJTxe-gQ_mTsSa3b1k0UJw50qdl7jsi4Lkqw6gGMprUx_XBF93CkxBnOrY5MRYFVrVjrhJ1h2JNONVS9fkmu-nZHn8NBUjsLqfJC3ICvVdIXJ8a-wN4t1wReMj9Q",
    explore: true,
  },
];

export default function CommunityFavorites() {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2 font-[family-name:var(--font-lexend)]">
          <span className="material-symbols-outlined text-[#bc13fe] animate-pulse">star</span>
          Community Favorites
        </h2>
        <button className="text-xs font-bold text-[#ff00ff] border border-[#ff00ff] bg-[#ff00ff]/10 px-3 py-1.5 rounded hover:bg-[#ff00ff] hover:text-black transition-all uppercase tracking-wide shadow-[0_0_10px_rgba(255,0,255,0.2)]">
          Browse All
        </button>
      </div>

      {/* Horizontal scroll */}
      <div className="relative w-full overflow-x-auto hide-scroll pb-2">
        <div className="flex gap-4 min-w-max">
          {WORKOUTS.map((w) => (
            <div
              key={w.name}
              className={`w-64 bg-[#0f0f23] border border-[#2d2d55] rounded-xl overflow-hidden ${w.hoverBorder} transition-colors group cursor-pointer shadow-lg ${w.hoverShadow} ${w.explore ? "opacity-60" : ""}`}
            >
              {/* Image */}
              <div
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${w.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-transparent" />
                {w.rating && (
                  <div className="absolute top-2 right-2 bg-[#050510]/80 backdrop-blur px-1.5 py-0.5 rounded text-[10px] text-white flex items-center gap-1 border border-[#2d2d55]">
                    <span className="material-symbols-outlined text-yellow-400 text-[10px]">
                      star
                    </span>
                    {w.rating}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-3">
                <h4 className={`text-white font-bold text-sm uppercase truncate transition-colors ${w.hoverTitle}`}>
                  {w.name}
                </h4>
                <div className="flex gap-1 mt-1 mb-2 flex-wrap">
                  {w.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] bg-[#2d2d55] text-[#9ca3af] px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2d2d55]">
                  {w.explore ? (
                    <span className="text-xs text-[#9ca3af]">Explore more...</span>
                  ) : (
                    <>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-700 border border-[#0f0f23]" />
                        <div className="w-6 h-6 rounded-full bg-gray-600 border border-[#0f0f23]" />
                        <div
                          className={`w-6 h-6 rounded-full ${w.countColor} text-white text-[8px] flex items-center justify-center border border-[#0f0f23] font-bold`}
                        >
                          {w.count}
                        </div>
                      </div>
                      <button className="text-[#00f3ff] hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
