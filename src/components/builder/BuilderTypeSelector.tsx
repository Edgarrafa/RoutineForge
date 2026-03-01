type BuilderType = "day" | "weekly" | "program";

type TypeCard = {
  type: BuilderType;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  accent: string;
  glow: string;
};

const CARDS: TypeCard[] = [
  {
    type: "day",
    icon: "event",
    title: "Day / Session",
    subtitle: "Single workout",
    description: "Build one standalone workout session. Great for a specific training day or when you want to plan a single session.",
    features: ["Exercise selection", "Sets, reps & RPE", "Circuit support", "Per-set customization"],
    accent: "#00f3ff",
    glow: "rgba(0,243,255,0.2)",
  },
  {
    type: "weekly",
    icon: "calendar_view_week",
    title: "Weekly Plan",
    subtitle: "7-day routine",
    description: "Design a complete weekly training schedule with up to 7 sessions. Ideal for repeating weekly routines.",
    features: ["7-day structure", "Mix workout & rest days", "Day templates", "Full exercise builder"],
    accent: "#f4257b",
    glow: "rgba(244,37,123,0.2)",
  },
  {
    type: "program",
    icon: "calendar_month",
    title: "Full Program",
    subtitle: "Multi-week training plan",
    description: "Create a structured multi-week training program from 2 to 24 weeks. Best for progressive overload planning.",
    features: ["2–24 week structure", "Week templates", "Day templates", "Program density map"],
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.2)",
  },
];

type Props = {
  onSelect: (type: BuilderType) => void;
};

export default function BuilderTypeSelector({ onSelect }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">
          What are you building?
        </h1>
        <p className="text-slate-400 text-sm">
          Choose the type of routine to create. You can always switch later.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {CARDS.map((card) => (
          <button
            key={card.type}
            onClick={() => onSelect(card.type)}
            className="group text-left flex flex-col bg-[#1a0f14]/80 border border-white/10 rounded-2xl p-6 hover:border-opacity-100 transition-all duration-300 hover:-translate-y-1"
            style={
              {
                "--accent": card.accent,
                "--glow": card.glow,
              } as React.CSSProperties
            }
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = card.accent;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${card.glow}, 0 20px 40px rgba(0,0,0,0.4)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all"
              style={{ backgroundColor: `${card.accent}15`, border: `1px solid ${card.accent}30` }}
            >
              <span
                className="material-symbols-outlined text-3xl transition-all group-hover:scale-110"
                style={{ color: card.accent }}
              >
                {card.icon}
              </span>
            </div>

            {/* Title */}
            <div className="mb-3">
              <h2 className="text-white font-black text-xl uppercase tracking-wide transition-colors" style={{}}>
                {card.title}
              </h2>
              <p className="text-xs font-medium uppercase tracking-widest mt-0.5" style={{ color: card.accent }}>
                {card.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{card.description}</p>

            {/* Features */}
            <ul className="space-y-1.5 mb-6">
              {card.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-sm" style={{ color: card.accent }}>
                    check_circle
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
              style={{
                backgroundColor: `${card.accent}15`,
                border: `1px solid ${card.accent}30`,
                color: card.accent,
              }}
            >
              Start Building
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
