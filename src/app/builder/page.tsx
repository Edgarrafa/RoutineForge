"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BuilderHeader from "@/components/builder/BuilderHeader";
import BuilderTypeSelector from "@/components/builder/BuilderTypeSelector";
import DayBuilder from "@/components/builder/DayBuilder";
import WeeklyBuilder from "@/components/builder/WeeklyBuilder";
import ProgramSidebar from "@/components/builder/ProgramSidebar";
import BuilderMain from "@/components/builder/BuilderMain";

type BuilderType = "day" | "weekly" | "program";

export default function BuilderPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();
  const [builderType, setBuilderType] = useState<BuilderType | null>(null);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/");
    }
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) return null;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#0d060a] font-[family-name:var(--font-grotesk)] relative">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#f4257b]/10 via-[#0d060a] to-[#0d060a]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(244,37,123,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,37,123,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "perspective(500px) rotateX(20deg) scale(2)",
            transformOrigin: "center top",
          }}
        />
      </div>

      <BuilderHeader onBack={builderType ? () => setBuilderType(null) : undefined} />

      <main className="relative z-10 flex flex-1 overflow-hidden">
        {!builderType && (
          <BuilderTypeSelector onSelect={setBuilderType} />
        )}
        {builderType === "day" && <DayBuilder />}
        {builderType === "weekly" && <WeeklyBuilder />}
        {builderType === "program" && (
          <>
            <ProgramSidebar builderType="program" />
            <BuilderMain />
          </>
        )}
      </main>
    </div>
  );
}
