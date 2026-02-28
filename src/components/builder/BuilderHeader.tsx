"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDsHGa_AW1SccIRCqPD-Rq0Y1-I1N6oc_3fuLgvB4IenXCNR2lXe96szI8IMOhbZBSMBM3PcugckQKpRDqZIf-q5pooSfvGCB5IDv0Gjy2E3o9pOXH7b49a5C5r2QFtbJ5CL9gjBDRliJ_bt0SlEwc9Ut6bh0q7BoAO476ZBS4z2q0KMMrWz9oTDRDo5_7hy40cOjqvVM6xfJGhPH07Nto4pgE2-eJUtXQ7rCiXu6NLaHdLiOZruEB1j5CF4f3x7PoDDz3Dhq8W6Yo";

export default function BuilderHeader() {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-[#f4257b]/20 bg-[#0d060a]/80 backdrop-blur-md px-6 py-4 h-16 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded flex items-center justify-center bg-[#f4257b] text-white shadow-[0_0_10px_rgba(244,37,123,0.5)]">
          <span className="material-symbols-outlined text-xl">fitness_center</span>
        </div>
        <h1 className="text-xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-[#f4257b]/80">
          Routine<span className="text-[#f4257b]">//</span>Forge
        </h1>
      </div>

      {/* Status pill */}
      <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#f4257b]/20 bg-[#f4257b]/5">
        <span className="text-xs font-semibold text-[#f4257b] uppercase tracking-wider">Status:</span>
        <span className="text-xs text-white">Drafting</span>
        <div className="size-2 rounded-full bg-[#f4257b] animate-pulse" />
      </div>

      {/* User */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogout} title="Logout">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold leading-none text-white group-hover:text-[#f4257b] transition-colors">
            Cyberlifter_99
          </p>
          <p className="text-[10px] text-[#f4257b]/70 uppercase tracking-wider">Pro Trainer</p>
        </div>
        <div className="size-9 rounded-full bg-gradient-to-tr from-[#f4257b] to-[#bc13fe] p-[2px]">
          <img
            src={AVATAR}
            alt="User Avatar"
            className="rounded-full size-full object-cover border-2 border-[#0d060a]"
          />
        </div>
      </div>
    </header>
  );
}
