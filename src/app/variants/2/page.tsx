"use client";

import { useState, useRef, useEffect } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

const CARD_TYPE_LABELS: Record<ModuleCard["type"], string> = {
  hook: "Hook",
  concept: "Concept",
  visual: "Visual",
  check: "Check",
  realworld: "Real World",
  takeaway: "Summary",
};

const CARD_TYPE_ICONS: Record<ModuleCard["type"], string> = {
  hook: "zap",
  concept: "book",
  visual: "layers",
  check: "target",
  realworld: "globe",
  takeaway: "star",
};

const LEVEL_LABELS: Record<number, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

export default function Variant2() {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [showModulePicker, setShowModulePicker] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const pillBarRef = useRef<HTMLDivElement>(null);

  const mod: Module = course[moduleIdx];
  const card: ModuleCard = mod.cards[cardIdx];
  const cardTypes = mod.cards.map((c) => c.type);

  // Track viewed cards
  useEffect(() => {
    const key = `${mod.id}-${cardIdx}`;
    setViewedCards((prev) => new Set([...prev, key]));
  }, [mod.id, cardIdx]);

  // Scroll active pill into view
  useEffect(() => {
    if (pillBarRef.current) {
      const active = pillBarRef.current.children[cardIdx] as HTMLElement;
      if (active) {
        active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [cardIdx]);

  const selectModule = (idx: number) => {
    setModuleIdx(idx);
    setCardIdx(0);
    setQuizAnswer(null);
    setShowModulePicker(false);
  };

  const selectCard = (idx: number) => {
    setCardIdx(idx);
    setQuizAnswer(null);
  };

  const markComplete = () => {
    setCompleted((prev) => new Set([...prev, moduleIdx]));
    if (moduleIdx < course.length - 1) {
      selectModule(moduleIdx + 1);
    }
  };

  const moduleProgress = () => {
    let viewed = 0;
    for (let i = 0; i < mod.cards.length; i++) {
      if (viewedCards.has(`${mod.id}-${i}`)) viewed++;
    }
    return Math.round((viewed / mod.cards.length) * 100);
  };

  // Group modules by level
  const groupedModules = course.reduce<Record<number, Module[]>>((acc, m) => {
    if (!acc[m.level]) acc[m.level] = [];
    acc[m.level].push(m);
    return acc;
  }, {});

  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)", fontFamily: "var(--font-sans)", maxWidth: "430px", margin: "0 auto" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 h-12 shrink-0"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <Link
          href="/variants"
          className="flex items-center"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <Icon name="arrow-left" size={16} />
        </Link>

        <button
          onClick={() => setShowModulePicker(!showModulePicker)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          style={{
            backgroundColor: "var(--color-bg-muted)",
            color: "var(--color-text)",
            maxWidth: "240px",
          }}
        >
          <span className="truncate">{mod.title}</span>
          <Icon name="chevron-down" size={12} />
        </button>

        <span
          className="text-[10px] font-medium tabular-nums"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {completed.size}/{course.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-[2px] shrink-0" style={{ backgroundColor: "var(--color-progress)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${(completed.size / course.length) * 100}%`,
            backgroundColor: "var(--color-progress-fill)",
          }}
        />
      </div>

      {/* Module picker overlay */}
      {showModulePicker && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setShowModulePicker(false)}
          />
          <div
            className="absolute inset-x-0 top-12 z-50 mx-3 mt-1 rounded-xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-xl)",
              maxWidth: "410px",
              margin: "4px auto 0",
            }}
          >
            <div className="max-h-[65vh] overflow-y-auto">
              {Object.entries(groupedModules).map(([level, modules]) => (
                <div key={level}>
                  {/* Level header */}
                  <div
                    className="sticky top-0 z-10 px-4 py-2 flex items-center gap-2"
                    style={{
                      backgroundColor: "var(--color-bg-subtle)",
                      borderBottom: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-primary-ghost)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <span className="text-[9px] font-bold">{level}</span>
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {LEVEL_LABELS[Number(level)]}
                    </span>
                    <span
                      className="text-[9px] font-medium ml-auto"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {modules.length} modules
                    </span>
                  </div>
                  {/* Module items */}
                  <div className="p-1.5">
                    {modules.map((m) => {
                      const idx = course.findIndex((c) => c.id === m.id);
                      const isActive = idx === moduleIdx;
                      const isDone = completed.has(idx);
                      return (
                        <button
                          key={m.id}
                          onClick={() => selectModule(idx)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer"
                          style={{
                            backgroundColor: isActive ? "var(--color-primary-ghost)" : "transparent",
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: isDone
                                ? "var(--color-success-subtle)"
                                : isActive
                                  ? "var(--color-primary-subtle)"
                                  : "var(--color-bg-muted)",
                              color: isDone
                                ? "var(--color-success)"
                                : isActive
                                  ? "var(--color-primary)"
                                  : "var(--color-text-tertiary)",
                            }}
                          >
                            {isDone ? (
                              <Icon name="check" size={12} />
                            ) : (
                              <Icon name={m.icon} size={12} />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className="text-[9px] font-medium uppercase tracking-wider"
                              style={{
                                color: isActive ? "var(--color-primary)" : "var(--color-text-tertiary)",
                              }}
                            >
                              {m.category}
                            </p>
                            <p
                              className="text-xs font-medium truncate"
                              style={{
                                color: isActive ? "var(--color-text)" : "var(--color-text-secondary)",
                              }}
                            >
                              {m.title}
                            </p>
                          </div>
                          {m.isPro && (
                            <div
                              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase shrink-0"
                              style={{
                                backgroundColor: "var(--color-primary-ghost)",
                                color: "var(--color-primary)",
                              }}
                            >
                              Pro
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Module meta bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 shrink-0"
        style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          }}
        >
          <Icon name={mod.icon} size={13} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[9px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-primary)" }}
          >
            {mod.category} &middot; {mod.moduleType}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className="w-16 h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--color-progress)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${moduleProgress()}%`,
                backgroundColor: "var(--color-progress-fill)",
              }}
            />
          </div>
          <span
            className="text-[9px] font-medium tabular-nums"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {moduleProgress()}%
          </span>
        </div>
      </div>

      {/* Card type pill bar */}
      <div
        className="shrink-0 overflow-x-auto px-3 py-2"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div ref={pillBarRef} className="flex items-center gap-1.5" style={{ width: "max-content" }}>
          {cardTypes.map((type, idx) => {
            const isActive = idx === cardIdx;
            const isViewed = viewedCards.has(`${mod.id}-${idx}`);
            return (
              <button
                key={idx}
                onClick={() => selectCard(idx)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-primary)"
                    : isViewed
                      ? "var(--color-primary-ghost)"
                      : "var(--color-bg-muted)",
                  color: isActive
                    ? "var(--color-primary-text)"
                    : isViewed
                      ? "var(--color-primary)"
                      : "var(--color-text-tertiary)",
                  border: isActive ? "none" : "1px solid transparent",
                }}
              >
                <Icon name={CARD_TYPE_ICONS[type]} size={11} />
                {CARD_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card content area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* Hook card */}
        {card.type === "hook" && (
          <div className="pt-6">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5"
                style={{
                  backgroundColor: "var(--color-primary-ghost)",
                  color: "var(--color-primary)",
                }}
              >
                <Icon name="zap" size={10} />
                Hook
              </div>
              <h1
                className="text-xl font-bold leading-tight mb-4"
                style={{ color: "var(--color-text)" }}
              >
                {card.headline}
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {card.subheadline}
              </p>
            </div>
            <button
              onClick={() => selectCard(cardIdx + 1)}
              className="w-full flex items-center justify-center gap-2 mt-5 py-3 rounded-xl text-sm font-semibold cursor-pointer"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-text)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              Continue
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        )}

        {/* Concept card */}
        {card.type === "concept" && (
          <div className="pt-4">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--color-text)" }}
            >
              {card.title}
            </h2>
            <p
              className="text-sm leading-[1.8] mb-5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {card.body}
            </p>
            {/* Analogy callout */}
            <div
              className="rounded-xl overflow-hidden mb-5"
              style={{
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="px-4 py-2 flex items-center gap-2"
                style={{
                  backgroundColor: "var(--color-bg-subtle)",
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}
              >
                <Icon name="sparkles" size={12} style={{ color: "var(--color-primary)" }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-primary)" }}
                >
                  Analogy
                </span>
              </div>
              <div className="px-4 py-3">
                <p
                  className="text-xs leading-relaxed italic"
                  style={{ color: "var(--color-text)" }}
                >
                  {card.analogy}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {cardIdx > 0 && (
                <button
                  onClick={() => selectCard(cardIdx - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-bg-muted)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <Icon name="arrow-left" size={14} />
                  Back
                </button>
              )}
              {cardIdx < mod.cards.length - 1 && (
                <button
                  onClick={() => selectCard(cardIdx + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-text)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Visual card */}
        {card.type === "visual" && (
          <div className="pt-4">
            <h2
              className="text-lg font-bold mb-5"
              style={{ color: "var(--color-text)" }}
            >
              {card.title}
            </h2>
            <div className="space-y-3 mb-5">
              {card.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                      color: "#fff",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-semibold mb-0.5"
                      style={{ color: "var(--color-text)" }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {cardIdx > 0 && (
                <button
                  onClick={() => selectCard(cardIdx - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-bg-muted)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <Icon name="arrow-left" size={14} />
                  Back
                </button>
              )}
              {cardIdx < mod.cards.length - 1 && (
                <button
                  onClick={() => selectCard(cardIdx + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-text)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Check card (quiz) */}
        {card.type === "check" && (
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="target" size={14} style={{ color: "var(--color-primary)" }} />
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--color-primary)" }}
              >
                Knowledge Check
              </span>
            </div>
            <h2
              className="text-base font-bold mb-5 leading-snug"
              style={{ color: "var(--color-text)" }}
            >
              {card.question}
            </h2>
            <div className="space-y-2 mb-5">
              {card.options.map((opt, idx) => {
                const answered = quizAnswer !== null;
                let bg = "var(--color-surface)";
                let border = "var(--color-border)";
                let tc = "var(--color-text)";

                if (answered && opt.correct) {
                  bg = "var(--color-success-subtle)";
                  border = "var(--color-success)";
                  tc = "var(--color-success)";
                } else if (answered && idx === quizAnswer && !opt.correct) {
                  bg = "var(--color-error-subtle)";
                  border = "var(--color-error)";
                  tc = "var(--color-error)";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !answered && setQuizAnswer(idx)}
                    disabled={answered}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all cursor-pointer disabled:cursor-default"
                    style={{
                      backgroundColor: bg,
                      border: `1.5px solid ${border}`,
                      color: tc,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{
                        backgroundColor:
                          answered && opt.correct
                            ? "var(--color-success)"
                            : answered && idx === quizAnswer
                              ? "var(--color-error)"
                              : "var(--color-bg-muted)",
                        color:
                          answered && (opt.correct || idx === quizAnswer)
                            ? "#fff"
                            : "var(--color-text-tertiary)",
                      }}
                    >
                      {answered && opt.correct ? (
                        <Icon name="check" size={10} />
                      ) : answered && idx === quizAnswer ? (
                        <Icon name="x" size={10} />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span className="text-xs font-medium">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {quizAnswer !== null && (
              <div
                className="rounded-xl p-3 mb-4"
                style={{
                  backgroundColor: "var(--color-bg-subtle)",
                  border: "1px solid var(--color-border-subtle)",
                }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.explanation}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {cardIdx > 0 && (
                <button
                  onClick={() => selectCard(cardIdx - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-bg-muted)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <Icon name="arrow-left" size={14} />
                  Back
                </button>
              )}
              {cardIdx < mod.cards.length - 1 && (
                <button
                  onClick={() => selectCard(cardIdx + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-text)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Real World card */}
        {card.type === "realworld" && (
          <div className="pt-4">
            <div
              className="rounded-2xl overflow-hidden mb-5"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* Company header */}
              <div
                className="px-4 py-3 flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <Icon name="globe" size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    Case Study
                  </p>
                  <p className="text-sm font-bold text-white">
                    {card.company}
                  </p>
                </div>
              </div>
              {/* Content */}
              <div
                className="p-4 space-y-4"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    What they did
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-text)" }}
                  >
                    {card.what}
                  </p>
                </div>
                <div
                  className="h-px"
                  style={{ backgroundColor: "var(--color-border-subtle)" }}
                />
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--color-success)" }}
                  >
                    Result
                  </p>
                  <p
                    className="text-xs leading-relaxed font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {card.result}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {cardIdx > 0 && (
                <button
                  onClick={() => selectCard(cardIdx - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-bg-muted)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <Icon name="arrow-left" size={14} />
                  Back
                </button>
              )}
              {cardIdx < mod.cards.length - 1 && (
                <button
                  onClick={() => selectCard(cardIdx + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-text)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Takeaway card */}
        {card.type === "takeaway" && (
          <div className="pt-4">
            <div
              className="rounded-2xl p-5 mb-4"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name="star" size={14} style={{ color: "var(--color-primary)" }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-primary)" }}
                >
                  Key Takeaway
                </span>
              </div>
              <p
                className="text-sm leading-[1.8] font-medium mb-5"
                style={{ color: "var(--color-text)" }}
              >
                {card.summary}
              </p>
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: "var(--color-primary-ghost)",
                  border: "1px solid var(--color-primary-subtle)",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-wider mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  Up Next
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.nextTeaser}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {cardIdx > 0 && (
                <button
                  onClick={() => selectCard(cardIdx - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-bg-muted)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <Icon name="arrow-left" size={14} />
                  Back
                </button>
              )}
              {moduleIdx < course.length - 1 ? (
                <button
                  onClick={markComplete}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-text)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Complete & Next
                  <Icon name="arrow-right" size={14} />
                </button>
              ) : (
                <button
                  onClick={markComplete}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-success)",
                    color: "#fff",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <Icon name="check" size={14} />
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
