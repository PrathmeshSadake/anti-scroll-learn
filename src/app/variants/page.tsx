"use client";

import Link from "next/link";
import Icon from "@/components/Icons";

const variants = [
  {
    id: 1,
    name: "Cinematic",
    subtitle: "Apple-style immersive",
    description: "Full-screen card transitions with module picker, gradient icons, and frosted glass navigation.",
    icon: "compass",
  },
  {
    id: 2,
    name: "Knowledge Base",
    subtitle: "Notion-style workspace",
    description: "Dropdown module picker with horizontal card-type pill navigation and structured content.",
    icon: "grid",
  },
  {
    id: 3,
    name: "Chapters",
    subtitle: "Vertical card stack",
    description: "Gradient chapter headers with all cards rendered as scrollable vertical sections.",
    icon: "layers",
  },
  {
    id: 4,
    name: "Stories",
    subtitle: "Instagram-style swipe",
    description: "Story progress segments at top, tap-to-advance through cards, auto-advance between modules.",
    icon: "star",
  },
  {
    id: 5,
    name: "Dashboard",
    subtitle: "Analytics-style panels",
    description: "Stats grid, tabbed content views, horizontal module selector at bottom.",
    icon: "bar-chart",
  },
  {
    id: 6,
    name: "Learning Path",
    subtitle: "Duolingo-style unlock",
    description: "Winding path with locked/unlocked nodes, level headers, star scoring, sequential unlock.",
    icon: "zap",
  },
  {
    id: 7,
    name: "Slides",
    subtitle: "Presentation deck",
    description: "Full-screen slide format with swipe navigation and horizontal transitions.",
    icon: "play",
  },
];

export default function VariantsHub() {
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: "var(--color-bg)", fontFamily: "var(--font-sans)" }}>
      <header className="shrink-0 px-5 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-1.5 text-xs font-medium mb-5" style={{ color: "var(--color-text-tertiary)" }}>
          <Icon name="arrow-left" size={14} />
          Home
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}
          >
            <Icon name="sparkles" size={16} className="text-white" />
          </div>
          <div
            className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: "var(--color-primary-ghost)", color: "var(--color-primary)" }}
          >
            7 Variants
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
          UI Variants
        </h1>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          Seven ways to experience the Gen AI course. 17 modules, 3 levels, card-based learning.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="space-y-3">
          {variants.map((v) => (
            <Link
              key={v.id}
              href={`/variants/${v.id}`}
              className="flex items-start gap-3.5 p-4 rounded-2xl transition-all active:scale-[0.98] block"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  boxShadow: "0 3px 8px color-mix(in srgb, var(--color-primary) 15%, transparent)",
                }}
              >
                <Icon name={v.icon} size={18} className="text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h2 className="text-sm font-bold" style={{ color: "var(--color-text)" }}>
                    {v.name}
                  </h2>
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold"
                    style={{ backgroundColor: "var(--color-bg-muted)", color: "var(--color-text-tertiary)" }}
                  >
                    {v.id}
                  </div>
                </div>
                <p className="text-[10px] font-semibold mb-1" style={{ color: "var(--color-primary)" }}>
                  {v.subtitle}
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {v.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
