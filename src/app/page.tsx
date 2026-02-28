import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import RoutineCreatorSection from "@/components/landing/RoutineCreatorSection";
import CharacterSheetSection from "@/components/landing/CharacterSheetSection";
import WorkoutPathsSection from "@/components/landing/WorkoutPathsSection";
import ClanSection from "@/components/landing/ClanSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <RoutineCreatorSection />
      <CharacterSheetSection />
      <WorkoutPathsSection />
      <ClanSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
