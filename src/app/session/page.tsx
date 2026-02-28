"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SessionProvider, useSession } from "@/context/SessionContext";
import SessionHeader from "@/components/session/SessionHeader";
import RoutineSidebar from "@/components/session/RoutineSidebar";
import ExerciseCard from "@/components/session/ExerciseCard";
import RestTimerPanel from "@/components/session/RestTimerPanel";

function SessionContent() {
  const { currentIndex } = useSession();
  return (
    <div className="flex flex-1 overflow-hidden">
      <RoutineSidebar />
      <ExerciseCard key={currentIndex} />
      <RestTimerPanel />
    </div>
  );
}

export default function SessionPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/");
    }
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#0d0d14]">
      <SessionProvider>
        <SessionHeader />
        <SessionContent />
      </SessionProvider>
    </div>
  );
}
