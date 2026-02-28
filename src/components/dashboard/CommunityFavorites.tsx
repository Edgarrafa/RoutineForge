"use client";

import { useRef } from "react";
import { COMMUNITY_WORKOUTS } from "@/data/mockData";

const SCROLL_AMOUNT = 272; // card width (256) + gap (16)

export default function CommunityFavorites() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2 font-[family-name:var(--font-lexend)]">
          <span className="material-symbols-outlined text-[#bc13fe] animate-pulse">star</span>
          Community Favorites
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="w-7 h-7 rounded border border-[#2d2d55] bg-[#0f0f23] text-gray-400 hover:text-white hover:border-[#ff00ff] transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <button
            onClick={scrollRight}
            className="w-7 h-7 rounded border border-[#2d2d55] bg-[#0f0f23] text-gray-400 hover:text-white hover:border-[#ff00ff] transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
          <button className="text-xs font-bold text-[#ff00ff] border border-[#ff00ff] bg-[#ff00ff]/10 px-3 py-1.5 rounded hover:bg-[#ff00ff] hover:text-black transition-all uppercase tracking-wide shadow-[0_0_10px_rgba(255,0,255,0.2)]">
            Browse All
          </button>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div ref={scrollRef} className="relative w-full overflow-x-auto hide-scroll pb-2">
        <div className="flex gap-4 min-w-max">
          {COMMUNITY_WORKOUTS.map((w) => (
            <div
              key={w.name}
              className={`w-64 bg-[#0f0f23] border border-[#2d2d55] rounded-xl overflow-hidden ${w.hoverBorder} transition-colors group cursor-pointer shadow-lg ${w.hoverShadow}`}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
