"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function SessionHeader() {
  const [elapsed, setElapsed] = useState(0);
  const router = useRouter();
  const { workoutName } = useSession();

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-[#0a0a0f] border-b border-white/10 z-10">
      {/* Left: workout name */}
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ec4899] animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        <h1 className="font-[family-name:var(--font-orbitron)] font-bold text-white tracking-widest uppercase text-lg">
          {workoutName}
        </h1>
      </div>

      {/* Center: stats */}
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Duration</div>
          <div className="font-[family-name:var(--font-orbitron)] text-white font-bold text-xl tracking-wider">
            {formatTime(elapsed)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Heart Rate</div>
          <div className="font-[family-name:var(--font-orbitron)] text-white font-bold text-xl tracking-wider flex items-center gap-1.5">
            <span className="text-[#ec4899] text-sm">♥</span>
            142 <span className="text-xs text-gray-400 font-normal">BPM</span>
          </div>
        </div>
      </div>

      {/* Right: exit */}
      <button
        onClick={() => router.push("/workout")}
        className="flex items-center gap-2 px-4 py-2 rounded border border-white/20 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:border-white/40 transition-colors"
      >
        Exit Session
        <span className="material-symbols-outlined text-lg">logout</span>
      </button>
    </header>
  );
}
