"use client";

import { useState, useEffect } from "react";

export type LibraryExercise = {
  id: string;
  name: string;
  bodyPart: string;
  category: "Compound" | "Isolation";
  equipment: string;
  subcategory: string;
  muscles: string[];
  image?: string;
};

const BODY_PARTS = ["Chest", "Back", "Legs", "Shoulders", "Arms"];
const EQUIPMENT_TYPES = ["Barbell", "Dumbbell", "Machine", "Cable", "Bodyweight"];

const EQUIPMENT_STYLES: Record<string, string> = {
  Barbell: "bg-[#f4257b] text-white",
  Cable: "bg-[#10b981] text-white",
  Dumbbell: "bg-[#8b5cf6] text-white",
  Bodyweight: "bg-[#374151] text-gray-300 border border-gray-600",
  Machine: "bg-[#f97316] text-white",
};

const SQ_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAo-coYh2NIGKylgQnKeERt32jZIL_wZG7LzDmYQ6upYxM09zLBehwWOtCskct_FAYGbRoiBYRr5qT5ZmUOOTnzGHRSUgmk3nyCD1ZUC3RYkRFH0NowMbOTLVJRwhH6a10VBZCYHge2f4ND0i1elB7Luc_dmZkd3zeXEfHedBYdrBYmRYft5Q70wPf1_eiS433ncitNRjrRFnuiOSUNo4pxJcNATKLfQ1luL9rHdi-SjZ5P20fXQqhs_tEpj9Wpmy3i8EsGNa1zYlg";
const LP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCenjHDAWxfnkkD-T5x-rw5evl4gJdaKFSVA8kRoRifCsleB1aYPG-3PWLE4zP3OcY8hF1TtMQdSEf_rbu6OQUPhf0MC1AyrXweY6qNA55YUODrI6WpZerTzbyv6XUBLfAW0gDR-s0XfIEKG1BgxSESvdyQI20H6DPTndlxsQz6fYjEsuNVOTQQXNaTE2QCAP5hJNbLgTwRIj-9d8lvIRDMaXvEnC2k4RGxVWNuFjz6Tz0UgtOvPLyIfKjPa4aUT6_526zC4t3GoKU";

const EXERCISES: LibraryExercise[] = [
  // Back (12)
  { id: "deadlift", name: "Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["GL", "HV", "LB"], image: SQ_IMG },
  { id: "lat-pulldown", name: "Lat Pulldown", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Vertical Pull", muscles: ["LT", "BI"], image: LP_IMG },
  { id: "db-row", name: "DB Row", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Pull", muscles: ["LT", "RD"] },
  { id: "pull-up", name: "Pull Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["LT"] },
  { id: "tbar-row", name: "T-Bar Row", bodyPart: "Back", category: "Compound", equipment: "Machine", subcategory: "Horizontal Pull", muscles: ["UB", "LT"] },
  { id: "face-pull", name: "Face Pull", bodyPart: "Back", category: "Isolation", equipment: "Cable", subcategory: "Rear Delts", muscles: ["RI", "TR"] },
  { id: "barbell-row", name: "Barbell Row", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Pull", muscles: ["LT", "UB"] },
  { id: "seated-cable-row", name: "Seated Cable Row", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Horizontal Pull", muscles: ["LT", "BI"] },
  { id: "chest-sup-row", name: "Chest-Supported Row", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Pull", muscles: ["UB", "RD"] },
  { id: "straight-arm-pd", name: "Straight-Arm Pulldown", bodyPart: "Back", category: "Isolation", equipment: "Cable", subcategory: "Vertical Pull", muscles: ["LT"] },
  { id: "single-arm-row", name: "Single-Arm Row", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Pull", muscles: ["LT", "RD"] },
  { id: "pullover", name: "Pullover", bodyPart: "Back", category: "Isolation", equipment: "Dumbbell", subcategory: "Stretch", muscles: ["LT", "CH"] },
  // Chest
  { id: "bench-press", name: "Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH", "TR", "FD"] },
  { id: "incline-db", name: "Incline DB Press", bodyPart: "Chest", category: "Compound", equipment: "Dumbbell", subcategory: "Incline Push", muscles: ["UP", "TR"] },
  { id: "cable-fly", name: "Cable Fly", bodyPart: "Chest", category: "Isolation", equipment: "Cable", subcategory: "Fly", muscles: ["CH", "FD"] },
  { id: "push-up", name: "Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  // Legs
  { id: "squat", name: "Barbell Squat", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Squat", muscles: ["QD", "GL", "HV"], image: SQ_IMG },
  { id: "leg-press", name: "Leg Press", bodyPart: "Legs", category: "Compound", equipment: "Machine", subcategory: "Quad", muscles: ["QD", "GL"], image: LP_IMG },
  { id: "rdl", name: "Romanian DL", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "GL"] },
  { id: "leg-curl", name: "Leg Curl", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Hamstring", muscles: ["HV"] },
  // Shoulders
  { id: "ohp", name: "Overhead Press", bodyPart: "Shoulders", category: "Compound", equipment: "Barbell", subcategory: "Vertical Push", muscles: ["FD", "TR", "UP"] },
  { id: "lateral-raise", name: "Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Lateral", muscles: ["MD"] },
  { id: "rear-delt-fly", name: "Rear Delt Fly", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Rear Delt", muscles: ["RD", "RI"] },
  // Arms
  { id: "bicep-curl", name: "Bicep Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Bicep", muscles: ["BI"] },
  { id: "tricep-pushdown", name: "Tricep Pushdown", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Tricep", muscles: ["TR"] },
  { id: "hammer-curl", name: "Hammer Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Bicep", muscles: ["BI", "BR"] },
];

type Props = {
  onClose: () => void;
  onAdd: (exercise: LibraryExercise) => void;
};

export default function ExerciseLibraryModal({ onClose, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popularity");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggleBodyPart(bp: string) {
    setBodyParts((prev) => (prev.includes(bp) ? prev.filter((p) => p !== bp) : [...prev, bp]));
  }

  function toggleEquipment(eq: string) {
    setEquipment((prev) => (prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]));
  }

  const filtered = EXERCISES.filter((e) => {
    if (query && !e.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (bodyParts.length > 0 && !bodyParts.includes(e.bodyPart)) return false;
    if (category !== "all" && e.category !== category) return false;
    if (equipment.length > 0 && !equipment.includes(e.equipment)) return false;
    return true;
  }).sort((a, b) => (sortBy === "Name" ? a.name.localeCompare(b.name) : 0));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] bg-[#0d060a] border border-[#f4257b]/40 rounded-2xl shadow-[0_0_80px_rgba(244,37,123,0.2)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#f4257b]/20 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#f4257b] text-xl font-black uppercase tracking-[0.15em]">
              Exercise Library
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
              search
            </span>
            <input
              autoFocus
              type="text"
              placeholder="Search exercises (e.g., Bench Press, Rows)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#1a0f14] border border-[#f4257b]/20 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f4257b]/50 transition-colors"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 border-r border-[#f4257b]/10 p-5 overflow-y-auto space-y-6">
            {/* Body Part */}
            <div>
              <h4 className="text-[10px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-3">
                Body Part
              </h4>
              <div className="space-y-2.5">
                {BODY_PARTS.map((bp) => (
                  <label key={bp} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleBodyPart(bp)}
                      className={`size-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                        bodyParts.includes(bp)
                          ? "bg-[#f4257b] border-[#f4257b]"
                          : "border-gray-600 bg-transparent group-hover:border-[#f4257b]/60"
                      }`}
                    >
                      {bodyParts.includes(bp) && (
                        <span className="material-symbols-outlined text-white leading-none" style={{ fontSize: 10 }}>
                          check
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors ${
                        bodyParts.includes(bp) ? "text-white font-medium" : "text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {bp}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-[10px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-3">
                Category
              </h4>
              <div className="space-y-2.5">
                {(["all", "Compound", "Isolation"] as const).map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setCategory(cat)}
                      className={`size-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        category === cat
                          ? "border-[#f4257b]"
                          : "border-gray-600 group-hover:border-[#f4257b]/60"
                      }`}
                    >
                      {category === cat && (
                        <div className="size-2 rounded-full bg-[#f4257b]" />
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors ${
                        category === cat ? "text-white font-medium" : "text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {cat === "all" ? "All" : cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="text-[10px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-3">
                Equipment
              </h4>
              <div className="flex flex-wrap gap-2">
                {EQUIPMENT_TYPES.map((eq) => (
                  <button
                    key={eq}
                    onClick={() => toggleEquipment(eq)}
                    className={`px-2.5 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider border transition-all ${
                      equipment.includes(eq)
                        ? "bg-[#f4257b]/15 border-[#f4257b] text-[#f4257b]"
                        : "bg-[#1a0f14] border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                    }`}
                  >
                    {eq}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Results header */}
            <div className="px-6 py-3 border-b border-[#f4257b]/10 flex items-center justify-between shrink-0">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="text-white font-bold">{filtered.length}</span>{" "}
                results
                {bodyParts.length > 0 && (
                  <>
                    {" "}for{" "}
                    <span className="text-white font-bold">
                      &ldquo;{bodyParts.join(", ")}&rdquo;
                    </span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#0d060a] border border-gray-700 rounded px-3 py-1 text-xs text-white focus:outline-none focus:border-[#f4257b] appearance-none cursor-pointer pr-7"
                  >
                    <option>Popularity</option>
                    <option>Name</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-5xl">fitness_center</span>
                  <p className="text-sm">No exercises match your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {filtered.map((ex) => (
                    <div
                      key={ex.id}
                      className="bg-[#1a0f14] border border-white/5 rounded-xl overflow-hidden hover:border-[#f4257b]/30 transition-colors"
                    >
                      {/* Image */}
                      <div className="relative h-36 bg-[#0d060a] flex items-center justify-center">
                        {ex.image ? (
                          <img
                            src={ex.image}
                            alt={ex.name}
                            className="w-full h-full object-cover opacity-80"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-5xl text-gray-700">
                            fitness_center
                          </span>
                        )}
                        <span
                          className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${EQUIPMENT_STYLES[ex.equipment]}`}
                        >
                          {ex.equipment}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-3">
                        <h4 className="text-white font-bold text-sm">{ex.name}</h4>
                        <p className="text-[#00f3ff] text-[10px] uppercase tracking-wider mt-0.5">
                          {ex.bodyPart} • {ex.subcategory}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          {/* Muscle circles */}
                          <div className="flex -space-x-1.5">
                            {ex.muscles.map((m) => (
                              <div
                                key={m}
                                className="size-7 rounded-full bg-[#0d060a] border border-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-400 font-mono"
                              >
                                {m}
                              </div>
                            ))}
                          </div>
                          {/* ADD button */}
                          <button
                            onClick={() => onAdd(ex)}
                            className="px-3 py-1.5 bg-[#f4257b] hover:bg-[#f4257b]/90 text-white text-xs font-black uppercase tracking-wider rounded hover:shadow-[0_0_15px_rgba(244,37,123,0.5)] transition-all flex items-center gap-0.5"
                          >
                            Add
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
