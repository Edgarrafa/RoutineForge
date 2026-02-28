"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import WotdCard from "@/components/dashboard/WotdCard";
import QuickStatsRow from "@/components/dashboard/QuickStatsRow";
import CommunityFavorites from "@/components/dashboard/CommunityFavorites";
import RecentRoutines from "@/components/dashboard/RecentRoutines";

export default function DashboardPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/");
    }
  }, [mounted, isLoggedIn, router]);

  // Prevent flash: render nothing until auth state is resolved
  if (!mounted || !isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col relative">
      {/* Synth grid background */}
      <div className="fixed inset-0 bg-grid-synth pointer-events-none z-0" />

      <DashboardNavbar />

      <main className="relative z-10 flex-1 px-4 sm:px-8 py-8 mx-auto w-full max-w-7xl flex flex-col gap-8">
        <WotdCard />
        <QuickStatsRow />
        <CommunityFavorites />
        <RecentRoutines />
      </main>
    </div>
  );
}
