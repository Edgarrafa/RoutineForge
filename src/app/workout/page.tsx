"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import TodayFocusCard from "@/components/workout/TodayFocusCard";
import WeekScheduleCard from "@/components/workout/WeekScheduleCard";
import MilestonesCard from "@/components/workout/MilestonesCard";
import ProgramProgressionCard from "@/components/workout/ProgramProgressionCard";

export default function WorkoutPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/");
    }
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col relative">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-synth pointer-events-none z-0" />

      <DashboardNavbar />

      <main className="relative z-10 flex-grow pt-8 pb-20 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-grow flex flex-col gap-6 w-full lg:w-3/4">
          <TodayFocusCard />
          <WeekScheduleCard />
          <MilestonesCard />
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <ProgramProgressionCard />

          {/* Tip of the Week — inline */}
          <div className="cyber-card rounded-xl p-5 border border-[#ec4899]/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/10 to-transparent" />
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#ec4899] font-bold uppercase text-xs tracking-widest">
                <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                Tip of the week
              </div>
              <p className="text-sm text-gray-300 font-medium">
                Progressive overload isn&apos;t just weight. Adding a rep or decreasing rest time counts too.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
