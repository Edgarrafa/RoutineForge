"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = ["Features", "Clans", "Leaderboard", "Pricing"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  function handleLogin() {
    login();
    router.push("/dashboard");
  }

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="material-symbols-outlined text-[#ec4899] text-4xl">
              fitness_center
            </span>
            <span className="font-[family-name:var(--font-orbitron)] font-bold text-2xl tracking-wider text-white">
              ROUTINE
              <span className="gradient-text">FORGE</span>
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-[#ec4899] transition-colors uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={handleLogin} className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
              Login
            </button>
            <button onClick={handleLogin} className="btn-synth px-6 py-2.5 text-sm">
              Start Quest
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090b]/95 border-b border-white/10 px-4 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-[#ec4899] transition-colors uppercase tracking-widest"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <button onClick={handleLogin} className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide text-left">
              Login
            </button>
            <button onClick={handleLogin} className="btn-synth px-6 py-3 text-sm">
              Start Quest
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
