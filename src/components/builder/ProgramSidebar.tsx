"use client";

import { useState } from "react";

const INITIAL_TAGS = [
  { label: "Barbell", color: "primary" as const },
  { label: "Dumbbell", color: "cyan" as const },
];

type Props = {
  builderType?: "day" | "weekly" | "program";
};

export default function ProgramSidebar({ builderType = "program" }: Props) {
  const [programName, setProgramName] = useState(
    builderType === "day" ? "My Session" : builderType === "weekly" ? "My Weekly Plan" : "12-Week Hypertrophy"
  );
  const [focus, setFocus] = useState("Strength");
  const [goal, setGoal] = useState("hypertrophy");
  const [duration, setDuration] = useState(12);
  const [tags, setTags] = useState(INITIAL_TAGS);
  const [tagInput, setTagInput] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function removeTag(label: string) {
    setTags((t) => t.filter((tag) => tag.label !== label));
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((t) => [...t, { label: tagInput.trim(), color: "primary" }]);
      setTagInput("");
    }
  }

  return (
    <aside className="w-80 shrink-0 border-r border-[#f4257b]/20 bg-[#1a0f14]/60 backdrop-blur-sm flex flex-col overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Metadata */}
        <div>
          <h3 className="text-xs font-bold text-[#f4257b] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">settings</span>
            {builderType === "day" ? "Session Metadata" : builderType === "weekly" ? "Plan Metadata" : "Program Metadata"}
          </h3>
          <div className="space-y-5">
            {/* Name */}
            <div className="group">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide group-focus-within:text-white transition-colors">
                {builderType === "day" ? "Session Name" : builderType === "weekly" ? "Plan Name" : "Program Name"}
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full bg-[#0d060a]/80 border border-[#f4257b]/30 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#f4257b] focus:shadow-[0_0_10px_rgba(244,37,123,0.3)] transition-all placeholder:text-slate-600 font-medium"
              />
            </div>

            {/* Focus (day) or Goal (weekly/program) */}
            {builderType === "day" ? (
              <div className="group">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide group-focus-within:text-white transition-colors">
                  Focus
                </label>
                <input
                  type="text"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  placeholder="e.g. Upper Body, Legs…"
                  className="w-full bg-[#0d060a]/80 border border-[#f4257b]/30 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#f4257b] focus:shadow-[0_0_10px_rgba(244,37,123,0.3)] transition-all placeholder:text-slate-600 font-medium"
                />
              </div>
            ) : (
              <div className="group">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide group-focus-within:text-white transition-colors">
                  Goal
                </label>
                <div className="relative">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-[#0d060a]/80 border border-[#f4257b]/30 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#f4257b] appearance-none cursor-pointer"
                  >
                    <option value="hypertrophy">Hypertrophy (Size)</option>
                    <option value="strength">Strength (Power)</option>
                    <option value="endurance">Endurance (Stamina)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-[#f4257b] pointer-events-none text-lg">
                    expand_more
                  </span>
                </div>
              </div>
            )}

            {/* Duration — program only */}
            {builderType === "program" && (
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Duration
                  </label>
                  <span className="text-xs font-bold text-[#f4257b]">{duration} Weeks</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={24}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f4257b]"
                />
                <div className="flex justify-between mt-1 text-[10px] text-gray-500 font-mono">
                  <span>2w</span>
                  <span>12w</span>
                  <span>24w</span>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="group">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 p-2 bg-[#0d060a]/50 border border-[#f4257b]/20 rounded-lg min-h-[50px]">
                {tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${
                      tag.color === "cyan"
                        ? "bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30"
                        : "bg-[#f4257b]/20 text-[#f4257b] border border-[#f4257b]/30"
                    }`}
                  >
                    {tag.label}
                    <button onClick={() => removeTag(tag.label)} className="hover:text-white">
                      <span className="material-symbols-outlined text-[10px]">close</span>
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="+ Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  className="bg-transparent text-xs text-white focus:outline-none w-20 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-6 border-t border-[#f4257b]/20">
          <h3 className="text-xs font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">equalizer</span>
            Summary
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0d060a] p-3 rounded-lg border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase">Est. Volume</p>
              <p className="text-lg font-bold text-white">
                124k <span className="text-xs text-slate-600 font-normal">lbs</span>
              </p>
            </div>
            <div className="bg-[#0d060a] p-3 rounded-lg border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase">Frequency</p>
              <p className="text-lg font-bold text-white">
                4.5 <span className="text-xs text-slate-600 font-normal">days/wk</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 border-t border-[#f4257b]/20 bg-[#0d060a]/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-300">Public Access</span>
          <button
            onClick={() => setIsPublic((v) => !v)}
            className={`w-11 h-6 rounded-full relative transition-colors border cursor-pointer ${
              isPublic
                ? "bg-[#f4257b]/20 border-[#f4257b]/50"
                : "bg-white/5 border-white/20"
            }`}
          >
            <div
              className={`absolute top-1 size-4 rounded-full transition-all ${
                isPublic
                  ? "left-6 bg-[#f4257b] shadow-[0_0_10px_rgba(244,37,123,0.5)]"
                  : "left-1 bg-slate-500"
              }`}
            />
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-3 font-bold uppercase tracking-wider rounded transition-all text-sm ${
            saved
              ? "bg-[#10b981] text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              : "bg-[#39ff14] text-[#0d060a] shadow-[0_0_10px_rgba(57,255,20,0.5)] hover:brightness-110"
          }`}
        >
          <span className="material-symbols-outlined text-lg">{saved ? "check_circle" : "save"}</span>
          {saved ? "Saved!" : builderType === "day" ? "Save Session" : builderType === "weekly" ? "Save Plan" : "Save Program"}
        </button>
      </div>
    </aside>
  );
}
