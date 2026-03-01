"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Workout", href: "/workout" },
  { label: "Builder", href: "/builder" },
  { label: "History", href: "/history" },
  { label: "Community", href: "#" },
  { label: "Settings", href: "#" },
];

export default function DashboardNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    logout();
    router.push("/");
  }

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header className="w-full border-b border-[#2d2d55] bg-[#050510]/90 backdrop-blur-md px-4 sm:px-8 py-3 sticky top-0 z-50 shadow-[0_4px_20px_-10px_rgba(188,19,254,0.3)] shrink-0">
      <div className="mx-auto max-w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="material-symbols-outlined text-4xl text-[#ff00ff] drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
            fitness_center
          </span>
          <h2 className="font-[family-name:var(--font-lexend)] text-2xl font-black italic tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#bc13fe] to-[#00f3ff] drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
            RoutineForge
          </h2>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium leading-normal transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? "text-[#ff00ff] font-bold border-b-2 border-[#ff00ff] pb-1"
                  : "text-[#9ca3af] hover:text-[#00f3ff]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: level pill + notifications + avatar */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Level pill */}
          <div className="hidden lg:flex items-center gap-3 bg-[#0f0f23] border border-[#2d2d55] rounded-full px-4 py-1.5 shadow-[0_0_10px_rgba(188,19,254,0.3)]">
            <div className="flex flex-col items-end">
              <span className="text-[#00f3ff] text-xs font-bold uppercase tracking-widest">
                Level {user.level} {user.title}
              </span>
              <div className="w-24 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#bc13fe] to-[#ff00ff] w-[85%] shadow-[0_0_10px_rgba(255,0,255,0.7)]" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button className="hidden sm:flex items-center justify-center rounded-lg w-10 h-10 bg-[#0f0f23] text-[#9ca3af] hover:text-[#ff00ff] hover:bg-[#2d2d55] transition-all border border-[#2d2d55] shadow-[0_0_10px_rgba(255,0,255,0.1)] hover:shadow-[0_0_10px_rgba(255,0,255,0.3)]">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>

          {/* Avatar + logout */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat ring-2 ring-[#bc13fe] shadow-[0_0_15px_rgba(188,19,254,0.5)] hover:ring-[#ff00ff] transition-all shrink-0"
            style={{ backgroundImage: `url("${user.avatarUrl}")` }}
          />

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#9ca3af] hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2d2d55] mt-3 pt-4 flex flex-col gap-4 pb-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium ${
                isActive(link.href) ? "text-[#ff00ff] font-bold" : "text-[#9ca3af]"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="text-sm text-left text-[#9ca3af] hover:text-[#ff00ff] transition-colors pt-2 border-t border-[#2d2d55]"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
