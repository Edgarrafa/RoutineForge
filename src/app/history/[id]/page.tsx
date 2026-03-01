"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { HISTORY_LOGS } from "@/data/mockData";
import type { ExerciseDetail } from "@/types";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import WorkoutDetailHeader from "@/components/history/detail/WorkoutDetailHeader";
import WorkoutDetailStats from "@/components/history/detail/WorkoutDetailStats";
import ExerciseLogCard from "@/components/history/detail/ExerciseLogCard";
import WorkoutXPPanel from "@/components/history/detail/WorkoutXPPanel";
import ExerciseDetailModal from "@/components/shared/ExerciseDetailModal";

export default function WorkoutDetailPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDetail | null>(null);

  useEffect(() => {
    if (mounted && !isLoggedIn) router.replace("/");
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  const log = HISTORY_LOGS.find((l) => l.id === params.id);
  if (!log) {
    router.replace("/history");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        <WorkoutDetailHeader log={log} />
        <WorkoutDetailStats log={log} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Exercise Logs */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-lg font-bold mb-4 font-[family-name:var(--font-orbitron)] uppercase tracking-wide">
              Exercise Log
            </h2>

            {log.exercises.length > 0 ? (
              log.exercises.map((ex) => (
                <ExerciseLogCard
                  key={ex.id}
                  exercise={ex}
                  onOpenDetail={setSelectedExercise}
                />
              ))
            ) : (
              <div className="bg-[#0d0d1a] border border-[#2d2d55] rounded-xl p-8 text-center">
                <span className="material-symbols-outlined text-[#2d2d55] text-5xl mb-3 block">
                  directions_run
                </span>
                <p className="text-[#9ca3af] text-sm">Cardio session — no exercise log recorded.</p>
              </div>
            )}
          </div>

          {/* Right — XP Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <WorkoutXPPanel log={log} />
            </div>
          </div>
        </div>
      </main>

      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}
