const SOCIALS = [
  { icon: "share", href: "#", label: "Social" },
  { icon: "photo_camera", href: "#", label: "Instagram" },
  { icon: "alternate_email", href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ec4899] text-2xl">
              fitness_center
            </span>
            <span className="font-[family-name:var(--font-orbitron)] font-bold text-lg tracking-wider text-white">
              ROUTINE<span className="text-[#ec4899]">FORGE</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-sm font-mono">
            &copy; {new Date().getFullYear()} RoutineForge. All rights reserved.
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-gray-500 hover:text-[#ec4899] transition-colors hover:text-glow"
              >
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
