"use client";

import { useState, useEffect } from "react";

const TOTAL_REST = 120;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function RestTimerPanel() {
  const [timeLeft, setTimeLeft] = useState(45);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isRunning]);

  const progress = timeLeft / TOTAL_REST;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  function addTime(s: number) {
    setTimeLeft((v) => Math.min(v + s, TOTAL_REST));
    setIsRunning(true);
  }

  function skip() {
    setTimeLeft(0);
    setIsRunning(false);
  }

  return (
    <aside className="w-64 shrink-0 border-l border-white/5 bg-[#0a0a0f] flex flex-col overflow-y-auto">
      {/* Rest Timer */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
          Rest Timer
        </div>

        {/* SVG circular ring */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <svg width="140" height="140" viewBox="0 0 120 120">
              {/* Track */}
              <circle
                cx={60} cy={60} r={RADIUS}
                fill="none"
                stroke="#1a1a2e"
                strokeWidth={8}
              />
              {/* Progress arc */}
              <circle
                cx={60} cy={60} r={RADIUS}
                fill="none"
                stroke="#ec4899"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 1s linear", filter: "drop-shadow(0 0 6px rgba(236,72,153,0.6))" }}
              />
            </svg>
            {/* Time in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-[family-name:var(--font-orbitron)] text-white font-bold text-2xl tracking-wider">
                {formatTime(timeLeft)}
              </span>
              {timeLeft > 0 && (
                <span
                  className="text-[10px] text-[#ec4899] font-bold mt-0.5 cursor-pointer hover:text-white"
                  onClick={() => addTime(10)}
                >
                  +10S
                </span>
              )}
              {timeLeft === 0 && (
                <span className="text-[10px] text-[#10b981] font-bold animate-pulse">GO!</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addTime(30)}
            className="py-2.5 rounded-lg border border-white/20 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            +30S
          </button>
          <button
            onClick={skip}
            className="py-2.5 rounded-lg border border-white/20 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Music Player */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#13131f] border border-white/5">
          {/* Album art */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center shrink-0 overflow-hidden">
            <span className="material-symbols-outlined text-white text-2xl">music_note</span>
          </div>

          {/* Track info + controls */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate">Neon Nights</div>
            <div className="text-[10px] text-gray-500 truncate">Synthwave Mix Vol. 4</div>
            <div className="flex items-center gap-3 mt-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">skip_previous</span>
              </button>
              <button className="w-7 h-7 rounded-full bg-[#ec4899] flex items-center justify-center hover:bg-[#ec4899]/80 transition-colors shadow-[0_0_8px_rgba(236,72,153,0.4)]">
                <span className="material-symbols-outlined text-white text-base">pause</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">skip_next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
