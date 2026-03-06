"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import courseLevels from "@/data/course-content";
import Icon from "@/components/Icons";

export default function CoursePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const totalModules = courseLevels.reduce(
    (acc, l) => acc + l.modules.length,
    0
  );

  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Header */}
      <header className="shrink-0 px-5 pt-6 pb-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium mb-5"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <Icon name="arrow-left" size={14} />
          Home
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #8B5CF6, #3B82F6)",
              boxShadow:
                "0 6px 20px rgba(139, 92, 246, 0.3)",
            }}
          >
            <Icon name="brain" size={22} className="text-white" />
          </div>
          <div>
            <div
              className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider inline-block mb-1"
              style={{
                backgroundColor: "var(--color-primary-ghost)",
                color: "var(--color-primary)",
              }}
            >
              UNROT 2.0
            </div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              Learn AI in 5 Min/Day
            </h1>
          </div>
        </div>

        <p
          className="text-xs leading-relaxed mb-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Card-based modules with reading, animations, and interactive
          exercises. Pick a level to begin.
        </p>

        {/* Stats Row */}
        <div
          className="flex items-center gap-3 p-3 rounded-2xl"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {[
            {
              icon: "layers",
              label: "Modules",
              value: totalModules,
              color: "var(--color-primary)",
            },
            {
              icon: "star",
              label: "Levels",
              value: courseLevels.length,
              color: "#F59E0B",
            },
            {
              icon: "clock",
              label: "Minutes",
              value: `~${totalModules}`,
              color: "var(--color-accent)",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1 py-1"
              style={{
                borderRight:
                  i < 2
                    ? "1px solid var(--color-border-subtle)"
                    : "none",
              }}
            >
              <Icon
                name={s.icon}
                size={16}
                style={{ color: s.color }}
              />
              <span
                className="text-base font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {s.value}
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Level Cards */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <p
          className="text-[10px] font-bold uppercase tracking-wider mb-3"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Choose Your Level
        </p>

        <div className="space-y-4">
          {courseLevels.map((level, li) => (
            <Link
              key={level.level}
              href={`/course/${level.level}`}
              className="block rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted
                  ? "translateY(0)"
                  : "translateY(16px)",
                transition: `opacity 0.5s ease ${li * 0.12}s, transform 0.5s ease ${li * 0.12}s`,
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* Gradient banner */}
              <div
                className="px-5 py-4"
                style={{
                  background: `linear-gradient(135deg, ${level.accentColor}, ${level.accentColor}CC)`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/20">
                      <Icon
                        name={level.icon}
                        size={18}
                        className="text-white"
                      />
                    </div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white"
                    >
                      Level {level.level}
                    </div>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {level.name}
                </h2>
                <p className="text-xs text-white/80 mt-0.5">
                  {level.subtitle}
                </p>
              </div>

              {/* Card body */}
              <div
                className="px-5 py-4"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {level.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {level.modules.length} modules
                    </span>
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      ~{level.modules.length} min
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: level.accentColor }}
                  >
                    Start
                    <Icon name="arrow-right" size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
