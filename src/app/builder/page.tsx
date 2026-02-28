"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BuilderHeader from "@/components/builder/BuilderHeader";
import ProgramSidebar from "@/components/builder/ProgramSidebar";
import BuilderMain from "@/components/builder/BuilderMain";

export default function BuilderPage() {
  const { isLoggedIn, mounted } = useAuth();
  const router = useRouter();

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

      <BuilderHeader />

      <main className="relative z-10 flex flex-1 overflow-hidden">
        <ProgramSidebar />
        <BuilderMain />
      </main>
    </div>
  );
}
