"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import HistoryStatsRow from "@/components/history/HistoryStatsRow";
import RecentLogs from "@/components/history/RecentLogs";
import WorkoutCalendar from "@/components/history/WorkoutCalendar";
import MonthlyPRs from "@/components/history/MonthlyPRs";

export default function HistoryPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !isLoggedIn) router.replace("/");
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#050510] bg-grid-synth font-[family-name:var(--font-lexend)]">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        <HistoryStatsRow />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Recent Logs */}
          <div className="lg:col-span-2">
            <RecentLogs />
          </div>

          {/* Right — Calendar + PRs */}
          <div className="flex flex-col gap-4">
            <WorkoutCalendar />
            <MonthlyPRs />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#2d2d55] pt-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
            <span className="text-[#9ca3af] text-sm">
              Clan Status:{" "}
              <span className="text-[#ff00ff] font-bold uppercase tracking-wider">Iron Guards</span>
            </span>
            <span className="bg-[#0f0f23] border border-[#2d2d55] text-[#9ca3af] text-xs px-3 py-1 rounded-full">
              Rank #4 Global
            </span>
          </div>
          <button className="text-[#ff00ff] text-sm font-bold flex items-center gap-1 hover:text-[#bc13fe] transition-colors uppercase tracking-wider">
            View Feed
            <span className="material-symbols-outlined text-base">expand_less</span>
          </button>
        </div>

        {/* Motivational quote */}
        <div className="mt-4 bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5">
          <span className="material-symbols-outlined text-[#bc13fe] text-2xl mb-2 block">format_quote</span>
          <p className="text-[#d1d5db] text-sm italic leading-relaxed">
            &ldquo;The only bad workout is the one that didn&rsquo;t happen. You are forging a legend.&rdquo;
          </p>
        </div>
      </main>
    </div>
  );
}
