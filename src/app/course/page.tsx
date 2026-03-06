"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import courseLevels from "@/data/course-content";
import Icon from "@/components/Icons";


export default function CoursePage() {
  const [mounted, setMounted] = useState(false);
  const [openLevel, setOpenLevel] = useState<number>(1); // first level open by default

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const toggleLevel = (level: number) => {
    setOpenLevel((prev) => (prev === level ? -1 : level));
  };

  // Zigzag offsets
  const getOffset = (idx: number) => {
    const cycle = idx % 4;
    if (cycle === 0) return 0;
    if (cycle === 1) return 45;
    if (cycle === 2) return 0;
    return -45;
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Header */}
      <header
        className="shrink-0 flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid var(--color-border-subtle)` }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Icon name="arrow-left" size={16} />
        </Link>
        <h1
          className="text-sm font-bold tracking-tight"
          style={{ color: "var(--color-primary)" }}
        >
          Learn AI
        </h1>
        <div style={{ width: 16 }} />
      </header>

      {/* Level map */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-4 px-5">
          {courseLevels.map((level, levelIdx) => {
            const isOpen = openLevel === level.level;
            const prevModuleCount = courseLevels
              .slice(0, levelIdx)
              .reduce((acc, l) => acc + l.modules.length, 0);

            return (
              <div key={level.level} className="mb-4">
                {/* Level accordion header */}
                <button
                  onClick={() => toggleLevel(level.level)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
                  style={{
                    backgroundColor: isOpen ? "var(--color-primary)" : "var(--color-surface)",
                    border: `1.5px solid ${isOpen ? "var(--color-primary)" : "var(--color-border)"}`,
                    boxShadow: isOpen
                      ? `0 4px 16px var(--color-primary-subtle)`
                      : "var(--shadow-sm)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted
                      ? "translateY(0)"
                      : "translateY(10px)",
                    transition: `all 0.4s ease ${levelIdx * 0.1}s`,
                  }}
                >
                  {/* Book icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isOpen
                        ? "rgba(255,255,255,0.2)"
                        : "var(--color-primary-subtle)",
                    }}
                  >
                    <Icon
                      name="book"
                      size={22}
                      style={{ color: isOpen ? "#fff" : "var(--color-primary)" }}
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                      style={{
                        color: isOpen ? "rgba(255,255,255,0.6)" : "var(--color-text-tertiary)",
                      }}
                    >
                      Level {level.level}
                    </div>
                    <h2
                      className="text-base font-bold"
                      style={{ color: isOpen ? "#fff" : "var(--color-text)" }}
                    >
                      {level.name}
                    </h2>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{
                        color: isOpen ? "rgba(255,255,255,0.7)" : "var(--color-text-secondary)",
                      }}
                    >
                      {level.modules.length} modules · ~{level.modules.length}{" "}
                      min
                    </p>
                  </div>

                  {/* Chevron */}
                  <div
                    style={{
                      color: isOpen ? "#fff" : "var(--color-text-secondary)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <Icon name="chevron-down" size={18} />
                  </div>
                </button>

                {/* Expanded module nodes */}
                <div
                  style={{
                    maxHeight: isOpen ? "2000px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease",
                  }}
                >
                  <div className="pt-6 pb-2">
                    {level.modules.map((mod, modIdx) => {
                      const globalIdx = prevModuleCount + modIdx;
                      const offset = getOffset(modIdx);
                      const isLast = modIdx === level.modules.length - 1;
                      const delay = 0.15 + modIdx * 0.08;

                      return (
                        <div key={mod.id} className="relative">
                          {/* Connector line */}
                          {!isLast && (
                            <div
                              className="absolute left-1/2 z-0"
                              style={{
                                top: "72px",
                                height: "32px",
                                width: "2px",
                                backgroundColor: "var(--color-border)",
                                transform: `translateX(${offset}px)`,
                              }}
                            />
                          )}

                          {/* Module node */}
                          <Link
                            href={`/course/${level.level}?module=${modIdx}`}
                            className="relative z-10 flex flex-col items-center mb-4"
                            style={{
                              transform:
                                isOpen && mounted
                                  ? `translateX(${offset}px)`
                                  : `translateX(${offset}px) translateY(12px)`,
                              opacity: isOpen && mounted ? 1 : 0,
                              transition: `all 0.4s ease ${delay}s`,
                            }}
                          >
                            {/* Circle */}
                            <div
                              className="w-[68px] h-[68px] rounded-full flex items-center justify-center mb-2 transition-transform active:scale-95"
                              style={{
                                backgroundColor: "#fff",
                                border: `3px solid var(--color-primary)`,
                                boxShadow: `0 4px 14px var(--color-primary-subtle)`,
                              }}
                            >
                              <Icon
                                name={mod.icon}
                                size={26}
                                style={{ color: "var(--color-primary)" }}
                              />
                            </div>

                            {/* Label */}
                            <p
                              className="text-xs font-semibold text-center max-w-[120px] leading-tight"
                              style={{ color: "var(--color-text)" }}
                            >
                              {mod.title}
                            </p>
                            <p
                              className="text-[10px] mt-0.5"
                              style={{ color: "var(--color-text-tertiary)" }}
                            >
                              {mod.cards.length} cards
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
