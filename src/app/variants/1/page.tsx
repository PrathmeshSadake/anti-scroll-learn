"use client";

import { useState, useEffect, useCallback } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

type Phase = "modules" | "card";

export default function Variant1() {
  const [phase, setPhase] = useState<Phase>("modules");
  const [moduleIdx, setModuleIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const currentModule: Module = course[moduleIdx];
  const currentCard: ModuleCard | undefined = currentModule?.cards[cardIdx];
  const totalCards = currentModule?.cards.length ?? 0;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (currentCard?.type === "visual") {
      setVisibleSteps(0);
      const steps = (currentCard as { steps: unknown[] }).steps.length;
      for (let i = 0; i < steps; i++) {
        setTimeout(() => setVisibleSteps((v) => v + 1), 300 + i * 250);
      }
    }
  }, [cardIdx, currentCard]);

  const transitionTo = useCallback(
    (next: () => void) => {
      setTransitioning(true);
      setTimeout(() => {
        next();
        setTransitioning(false);
      }, 380);
    },
    []
  );

  const selectModule = (idx: number) => {
    transitionTo(() => {
      setModuleIdx(idx);
      setCardIdx(0);
      setQuizAnswer(null);
      setPhase("card");
    });
  };

  const nextCard = () => {
    if (cardIdx < totalCards - 1) {
      transitionTo(() => {
        setCardIdx(cardIdx + 1);
        setQuizAnswer(null);
      });
    }
  };

  const nextModule = () => {
    if (moduleIdx < course.length - 1) {
      transitionTo(() => {
        setModuleIdx(moduleIdx + 1);
        setCardIdx(0);
        setQuizAnswer(null);
      });
    } else {
      transitionTo(() => {
        setPhase("modules");
      });
    }
  };

  const backToModules = () => {
    transitionTo(() => {
      setPhase("modules");
      setCardIdx(0);
      setQuizAnswer(null);
    });
  };

  const cardProgress = totalCards > 0 ? ((cardIdx + 1) / totalCards) * 100 : 0;

  /* ──────────── Module Selection ──────────── */
  const renderModules = () => {
    const levels = [1, 2, 3] as const;
    const levelLabels: Record<number, string> = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" };

    return (
      <div className="flex-1 overflow-y-auto pt-16 pb-8 px-5">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold tracking-tight mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Gen AI Course
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {course.length} modules across 3 levels
          </p>
        </div>

        {levels.map((level) => {
          const modules = course.filter((m) => m.level === level);
          if (modules.length === 0) return null;
          return (
            <div key={level} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    color: "#fff",
                  }}
                >
                  {level}
                </div>
                <h2
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {levelLabels[level]}
                </h2>
              </div>
              <div className="space-y-3">
                {modules.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => selectModule(course.indexOf(mod))}
                    className="w-full text-left rounded-2xl p-4 transition-all active:scale-[0.98] cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                          boxShadow: "0 4px 12px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                        }}
                      >
                        <Icon name={mod.icon} size={20} style={{ color: "#fff" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {mod.category}
                          </span>
                          {mod.isPro && (
                            <span
                              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: "var(--color-primary-ghost)",
                                color: "var(--color-primary)",
                              }}
                            >
                              PRO
                            </span>
                          )}
                        </div>
                        <h3
                          className="text-sm font-semibold truncate"
                          style={{ color: "var(--color-text)" }}
                        >
                          {mod.title}
                        </h3>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {mod.cards.length} cards
                        </p>
                      </div>
                      <Icon
                        name="chevron-right"
                        size={16}
                        style={{ color: "var(--color-text-tertiary)" }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /* ──────────── Hook Card ──────────── */
  const renderHook = (card: ModuleCard) => {
    if (card.type !== "hook") return null;
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[70dvh] px-2">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            boxShadow: "0 8px 32px color-mix(in srgb, var(--color-primary) 30%, transparent)",
          }}
        >
          <Icon name={currentModule.icon} size={28} style={{ color: "#fff" }} />
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold mb-6 uppercase tracking-wider"
          style={{
            backgroundColor: "var(--color-primary-ghost)",
            color: "var(--color-primary)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          {currentModule.category}
        </div>

        <h1
          className="text-[26px] font-bold tracking-tight leading-[1.15] mb-4 px-2"
          style={{ color: "var(--color-text)" }}
        >
          {card.headline}
        </h1>

        <p
          className="text-sm leading-relaxed max-w-[340px] mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.subheadline}
        </p>

        <button
          onClick={nextCard}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all active:scale-[0.97] cursor-pointer"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
            color: "var(--color-primary-text)",
            boxShadow:
              "0 4px 16px color-mix(in srgb, var(--color-primary) 30%, transparent), 0 1px 3px color-mix(in srgb, var(--color-primary) 20%, transparent)",
          }}
        >
          Begin
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ──────────── Concept Card ──────────── */
  const renderConcept = (card: ModuleCard) => {
    if (card.type !== "concept") return null;
    return (
      <div className="py-6 px-1">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--color-primary-ghost)",
              color: "var(--color-primary)",
            }}
          >
            <Icon name="book" size={18} />
          </div>
          <h2
            className="text-lg font-bold leading-snug"
            style={{ color: "var(--color-text)" }}
          >
            {card.title}
          </h2>
        </div>

        <p
          className="text-[15px] leading-[1.8] mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.body}
        </p>

        {/* Analogy callout */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            backgroundColor: "var(--color-primary-ghost)",
            border: "1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon name="sparkles" size={14} style={{ color: "var(--color-primary)" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-primary)" }}
            >
              Think of it this way
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            {card.analogy}
          </p>
        </div>

        <button
          onClick={nextCard}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-text)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ──────────── Visual Card ──────────── */
  const renderVisual = (card: ModuleCard) => {
    if (card.type !== "visual") return null;
    return (
      <div className="py-6 px-1">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--color-primary-ghost)",
              color: "var(--color-primary)",
            }}
          >
            <Icon name="layers" size={18} />
          </div>
          <h2
            className="text-lg font-bold leading-snug"
            style={{ color: "var(--color-text)" }}
          >
            {card.title}
          </h2>
        </div>

        <div className="space-y-0 mb-8">
          {card.steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4"
              style={{
                opacity: i < visibleSteps ? 1 : 0,
                transform: i < visibleSteps ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {/* Vertical connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </div>
                {i < card.steps.length - 1 && (
                  <div
                    className="w-[2px] h-8"
                    style={{
                      backgroundColor: "var(--color-border)",
                    }}
                  />
                )}
              </div>

              <div className="pb-4 pt-1 flex-1 min-w-0">
                <p
                  className="text-sm font-semibold mb-0.5"
                  style={{ color: "var(--color-text)" }}
                >
                  {step.label}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextCard}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-text)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ──────────── Check Card (MCQ) ──────────── */
  const renderCheck = (card: ModuleCard) => {
    if (card.type !== "check") return null;
    const isAnswered = quizAnswer !== null;

    return (
      <div className="py-6 px-1">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 uppercase tracking-wider"
            style={{
              backgroundColor: "var(--color-primary-ghost)",
              color: "var(--color-primary)",
            }}
          >
            <Icon name="zap" size={12} />
            Knowledge Check
          </div>
          <h2
            className="text-lg font-bold leading-snug"
            style={{ color: "var(--color-text)" }}
          >
            {card.question}
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {card.options.map((opt, idx) => {
            const isSelected = quizAnswer === idx;
            let bg = "var(--color-surface)";
            let border = "var(--color-border)";
            let textColor = "var(--color-text)";
            let badgeBg = "var(--color-bg-muted)";
            let badgeColor = "var(--color-text-secondary)";

            if (isAnswered && opt.correct) {
              bg = "var(--color-success-subtle)";
              border = "var(--color-success)";
              textColor = "var(--color-success)";
              badgeBg = "var(--color-success)";
              badgeColor = "#fff";
            } else if (isSelected && !opt.correct) {
              bg = "var(--color-error-subtle)";
              border = "var(--color-error)";
              textColor = "var(--color-error)";
              badgeBg = "var(--color-error)";
              badgeColor = "#fff";
            }

            return (
              <button
                key={idx}
                onClick={() => !isAnswered && setQuizAnswer(idx)}
                disabled={isAnswered}
                className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all active:scale-[0.98] cursor-pointer disabled:cursor-default"
                style={{
                  backgroundColor: bg,
                  border: `1.5px solid ${border}`,
                  color: textColor,
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: badgeBg, color: badgeColor }}
                >
                  {isAnswered && opt.correct ? (
                    <Icon name="check" size={13} />
                  ) : isSelected && !opt.correct ? (
                    <Icon name="x" size={13} />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </div>
                <span className="text-sm font-medium leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {card.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <button
            onClick={nextCard}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-text)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Continue
            <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    );
  };

  /* ──────────── Real World Card ──────────── */
  const renderRealWorld = (card: ModuleCard) => {
    if (card.type !== "realworld") return null;
    return (
      <div className="py-6 px-1">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--color-primary-ghost)",
              color: "var(--color-primary)",
            }}
          >
            <Icon name="globe" size={18} />
          </div>
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-primary)" }}
            >
              Real World
            </p>
            <h2
              className="text-lg font-bold leading-snug"
              style={{ color: "var(--color-text)" }}
            >
              {card.company}
            </h2>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon name="target" size={14} style={{ color: "var(--color-primary)" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-primary)" }}
            >
              What they did
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {card.what}
          </p>
        </div>

        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            backgroundColor: "var(--color-success-subtle)",
            border: "1px solid color-mix(in srgb, var(--color-success) 20%, transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon name="bar-chart" size={14} style={{ color: "var(--color-success)" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-success)" }}
            >
              Result
            </span>
          </div>
          <p
            className="text-sm leading-relaxed font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {card.result}
          </p>
        </div>

        <button
          onClick={nextCard}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-text)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ──────────── Takeaway Card ──────────── */
  const renderTakeaway = (card: ModuleCard) => {
    if (card.type !== "takeaway") return null;
    const isLast = moduleIdx >= course.length - 1;

    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[60dvh] px-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            boxShadow: "0 6px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
          }}
        >
          <Icon name="award" size={24} style={{ color: "#fff" }} />
        </div>

        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          Key Takeaway
        </p>

        <div
          className="rounded-2xl p-5 mb-6 w-full text-left"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <p
            className="text-[15px] leading-relaxed font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {card.summary}
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-8 w-full text-left"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon name="compass" size={13} style={{ color: "var(--color-text-tertiary)" }} />
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Up Next
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {card.nextTeaser}
          </p>
        </div>

        {!isLast ? (
          <button
            onClick={nextModule}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all active:scale-[0.97] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
              color: "var(--color-primary-text)",
              boxShadow:
                "0 4px 16px color-mix(in srgb, var(--color-primary) 30%, transparent), 0 1px 3px color-mix(in srgb, var(--color-primary) 20%, transparent)",
            }}
          >
            Next Module
            <Icon name="arrow-right" size={16} />
          </button>
        ) : (
          <div className="space-y-3">
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Course Complete
            </p>
            <Link
              href="/variants"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
                color: "var(--color-primary-text)",
                boxShadow: "0 4px 16px color-mix(in srgb, var(--color-primary) 30%, transparent)",
              }}
            >
              <Icon name="arrow-left" size={16} />
              Back to Variants
            </Link>
          </div>
        )}
      </div>
    );
  };

  /* ──────────── Card Router ──────────── */
  const renderCard = () => {
    if (!currentCard) return null;
    switch (currentCard.type) {
      case "hook":
        return renderHook(currentCard);
      case "concept":
        return renderConcept(currentCard);
      case "visual":
        return renderVisual(currentCard);
      case "check":
        return renderCheck(currentCard);
      case "realworld":
        return renderRealWorld(currentCard);
      case "takeaway":
        return renderTakeaway(currentCard);
      default:
        return null;
    }
  };

  /* ──────────── Layout ──────────── */
  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Frosted glass nav */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 h-14"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        {phase === "modules" ? (
          <Link
            href="/variants"
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Icon name="arrow-left" size={16} />
            <span>Variants</span>
          </Link>
        ) : (
          <button
            onClick={backToModules}
            className="flex items-center gap-1.5 text-sm font-medium cursor-pointer"
            style={{
              color: "var(--color-text-secondary)",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <Icon name="arrow-left" size={16} />
            <span>Modules</span>
          </button>
        )}

        {phase === "card" && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {currentModule.cards.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === cardIdx ? "16px" : "4px",
                    backgroundColor:
                      i < cardIdx
                        ? "var(--color-primary)"
                        : i === cardIdx
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                    opacity: i === cardIdx ? 1 : i < cardIdx ? 0.6 : 0.3,
                  }}
                />
              ))}
            </div>
            <span
              className="text-[11px] font-medium tabular-nums"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {cardIdx + 1}/{totalCards}
            </span>
          </div>
        )}
      </nav>

      {/* Progress bar (only during cards) */}
      {phase === "card" && (
        <div
          className="fixed top-14 inset-x-0 z-40 h-[2px]"
          style={{ backgroundColor: "var(--color-border-subtle)" }}
        >
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{
              width: `${cardProgress}%`,
              background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
            }}
          />
        </div>
      )}

      {/* Content area */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          opacity: transitioning ? 0 : mounted ? 1 : 0,
          transform: transitioning
            ? "scale(0.97) translateY(8px)"
            : mounted
            ? "scale(1) translateY(0)"
            : "scale(0.97) translateY(16px)",
          transition:
            "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {phase === "modules" ? (
          renderModules()
        ) : (
          <div className="h-full overflow-y-auto pt-16 pb-8 px-5">
            <div className="w-full">{renderCard()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
