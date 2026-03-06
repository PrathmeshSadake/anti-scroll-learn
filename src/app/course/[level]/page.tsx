"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useSearchParams } from "next/navigation";
import courseLevels from "@/data/course-content";
import type { CourseModule, CourseLevel } from "@/data/course-content";
import type { ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

type Phase = "modules" | "card";

export default function CourseLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const levelNum = parseInt(resolvedParams.level, 10) as 1 | 2;
  const levelData: CourseLevel | undefined = courseLevels.find(
    (l) => l.level === levelNum
  );

  const initialModule = parseInt(searchParams.get("module") ?? "0", 10);
  const initialPhase: Phase = searchParams.has("module") ? "card" : "modules";

  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [moduleIdx, setModuleIdx] = useState(initialModule);
  const [cardIdx, setCardIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set()
  );
  const [conceptsLearned, setConceptsLearned] = useState(0);

  // Interactive card state
  const [interactiveOrder, setInteractiveOrder] = useState<string[]>([]);
  const [interactiveSubmitted, setInteractiveSubmitted] = useState(false);
  const [interactiveCorrect, setInteractiveCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const modules = levelData?.modules ?? [];
  const currentModule: CourseModule | undefined = modules[moduleIdx];
  const currentCard: ModuleCard | undefined = currentModule?.cards[cardIdx];
  const totalCards = currentModule?.cards.length ?? 0;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Visual step animation
  useEffect(() => {
    if (currentCard?.type === "visual") {
      setVisibleSteps(0);
      const steps = (currentCard as { steps: unknown[] }).steps.length;
      for (let i = 0; i < steps; i++) {
        setTimeout(() => setVisibleSteps((v) => v + 1), 300 + i * 300);
      }
    }
  }, [cardIdx, currentCard, animKey]);

  // Reset interactive state on card change
  useEffect(() => {
    if (currentCard?.type === "interactive") {
      const card = currentCard as {
        items: { id: string; label: string }[];
      };
      // Shuffle items
      const shuffled = [...card.items]
        .map((item) => item.id)
        .sort(() => Math.random() - 0.5);
      setInteractiveOrder(shuffled);
      setInteractiveSubmitted(false);
      setInteractiveCorrect(false);
    }
  }, [cardIdx, currentCard]);

  const transitionTo = useCallback((next: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      next();
      setTransitioning(false);
    }, 350);
  }, []);

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

  const completeModule = () => {
    if (currentModule && !completedModules.has(currentModule.id)) {
      setCompletedModules((prev) => new Set(prev).add(currentModule.id));
      setConceptsLearned((prev) => prev + currentModule.outcomes.length);
    }
  };

  const nextModule = () => {
    completeModule();
    if (moduleIdx < modules.length - 1) {
      transitionTo(() => {
        setModuleIdx(moduleIdx + 1);
        setCardIdx(0);
        setQuizAnswer(null);
      });
    } else {
      completeModule();
      transitionTo(() => {
        setPhase("modules");
        setCardIdx(0);
        setQuizAnswer(null);
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

  const replayAnimation = () => {
    setAnimKey((k) => k + 1);
  };

  const cardProgress =
    totalCards > 0 ? ((cardIdx + 1) / totalCards) * 100 : 0;

  if (!levelData) {
    return (
      <div
        className="h-full flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-bg)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <div className="text-center">
          <p
            className="text-lg font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Level not found
          </p>
          <Link
            href="/course"
            className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════════════ MODULE LIST ═══════════════ */
  const renderModules = () => (
    <div className="flex-1 overflow-y-auto pt-16 pb-8 px-5">
      {/* Level header */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{
          background: `linear-gradient(135deg, ${levelData.accentColor}, ${levelData.accentColor}CC)`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
            <Icon name={levelData.icon} size={20} className="text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/70">
              Level {levelData.level}
            </div>
            <h1 className="text-lg font-bold text-white">{levelData.name}</h1>
          </div>
        </div>
        <p className="text-xs text-white/80 leading-relaxed">
          {levelData.description}
        </p>

        {/* Progress */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1.5">
            <Icon name="check" size={14} className="text-white" />
            <span className="text-sm font-bold text-white">
              {completedModules.size}/{modules.length}{" "}
              <span className="font-normal text-white/70">done</span>
            </span>
          </div>
        </div>
      </div>

      {/* Module list */}
      <p
        className="text-[10px] font-bold uppercase tracking-wider mb-3"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        Modules
      </p>
      <div className="space-y-3">
        {modules.map((mod, idx) => {
          const isDone = completedModules.has(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => selectModule(idx)}
              className="w-full text-left rounded-2xl p-4 transition-all active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: "var(--color-surface)",
                border: `1px solid ${isDone ? "var(--color-success)" : "var(--color-border)"}`,
                boxShadow: "var(--shadow-sm)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.4s ease ${idx * 0.08}s`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: isDone
                      ? levelData.accentColor
                      : `linear-gradient(135deg, ${levelData.accentColor}, ${levelData.accentColor}CC)`,
                    boxShadow: `0 4px 12px ${isDone ? "rgba(5,150,105,0.25)" : levelData.accentColor + "40"}`,
                  }}
                >
                  {isDone ? (
                    <Icon name="check" size={20} style={{ color: "#fff" }} />
                  ) : (
                    <Icon name={mod.icon} size={20} style={{ color: "#fff" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {mod.category}
                    </span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: "var(--color-bg-muted)",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {mod.cards.length} cards
                    </span>
                  </div>
                  <h3
                    className="text-sm font-semibold truncate"
                    style={{ color: "var(--color-text)" }}
                  >
                    {mod.title}
                  </h3>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {mod.cards.length} cards · ~{mod.estimatedMinutes} min
                  </p>
                </div>
                <Icon
                  name="chevron-right"
                  size={16}
                  style={{ color: "var(--color-text-tertiary)" }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ═══════════════ HOOK CARD ═══════════════ */
  const renderHook = (card: ModuleCard) => {
    if (card.type !== "hook") return null;
    return (
      <div className="flex flex-col items-center justify-center text-center py-6 px-2">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
          style={{
            background: `linear-gradient(135deg, ${levelData.accentColor}, ${levelData.accentColor}CC)`,
            boxShadow: `0 8px 32px ${levelData.accentColor}50`,
          }}
        >
          <Icon
            name={currentModule?.icon ?? "brain"}
            size={28}
            style={{ color: "#fff" }}
          />
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 uppercase tracking-wider"
          style={{
            backgroundColor: "var(--color-primary-subtle)",
            color: "var(--color-primary)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          {currentModule?.category}
        </div>

        <h1
          className="text-[22px] font-bold tracking-tight leading-[1.2] mb-3 px-2"
          style={{ color: "var(--color-text)" }}
        >
          {card.headline}
        </h1>

        <p
          className="text-sm leading-relaxed max-w-[340px] mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.subheadline}
        </p>

        <button
          onClick={nextCard}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all active:scale-[0.97] cursor-pointer"
          style={{
            backgroundColor: levelData.accentColor,
            color: "#fff",
            boxShadow: `0 4px 16px ${levelData.accentColor}40`,
          }}
        >
          Begin
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ═══════════════ CONCEPT CARD ═══════════════ */
  const renderConcept = (card: ModuleCard) => {
    if (card.type !== "concept") return null;
    return (
      <div className="py-6 px-1">
        {/* Topic image */}
        {currentModule?.image && (
          <div
            className="w-full mb-6 rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0 8px 32px ${levelData.accentColor}1A`,
              border: `1px solid ${levelData.accentColor}20`,
            }}
          >
            <img
              src={currentModule.image}
              alt={currentModule.title}
              className="w-full h-auto object-contain"
              style={{ display: "block", aspectRatio: "16/9" }}
            />
          </div>
        )}

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
            border: `1px solid ${levelData.accentColor}25`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon
              name="sparkles"
              size={14}
              style={{ color: levelData.accentColor }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: levelData.accentColor }}
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
            backgroundColor: levelData.accentColor,
            color: "#fff",
            boxShadow: "var(--shadow-md)",
          }}
        >
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ═══════════════ VISUAL / DIAGRAM CARD ═══════════════ */
  const renderVisual = (card: ModuleCard) => {
    if (card.type !== "visual") return null;
    return (
      <div className="py-6 px-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
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
          {/* Replay button */}
          <button
            onClick={replayAnimation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "var(--color-bg-muted)",
              color: "var(--color-primary)",
              border: `1px solid ${levelData.accentColor}30`,
            }}
          >
            <Icon name="rotate" size={12} />
            Replay
          </button>
        </div>

        <div className="space-y-0 mb-8" key={animKey}>
          {card.steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4"
              style={{
                opacity: i < visibleSteps ? 1 : 0,
                transform:
                  i < visibleSteps ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${levelData.accentColor}, ${levelData.accentColor}CC)`,
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </div>
                {i < card.steps.length - 1 && (
                  <div
                    className="w-[2px] h-8"
                    style={{ backgroundColor: "var(--color-border)" }}
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
            backgroundColor: levelData.accentColor,
            color: "#fff",
            boxShadow: "var(--shadow-md)",
          }}
        >
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ═══════════════ CHECK CARD (MCQ) ═══════════════ */
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
              color: levelData.accentColor,
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
                <span className="text-sm font-medium leading-snug">
                  {opt.text}
                </span>
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
              backgroundColor: levelData.accentColor,
              color: "#fff",
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

  /* ═══════════════ REAL WORLD CARD ═══════════════ */
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
            <Icon
              name="target"
              size={14}
              style={{ color: "var(--color-primary)" }}
            />
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
            border:
              "1px solid color-mix(in srgb, var(--color-success) 20%, transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon
              name="bar-chart"
              size={14}
              style={{ color: "var(--color-success)" }}
            />
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
            backgroundColor: levelData.accentColor,
            color: "#fff",
            boxShadow: "var(--shadow-md)",
          }}
        >
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    );
  };

  /* ═══════════════ TAKEAWAY CARD ═══════════════ */
  const renderTakeaway = (card: ModuleCard) => {
    if (card.type !== "takeaway") return null;
    const isLastModule = moduleIdx >= modules.length - 1;

    return (
      <div className="flex flex-col items-center justify-center text-center py-8 px-2">
        {/* Celebratory icon with pulse */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${levelData.accentColor}, var(--color-success))`,
            boxShadow: `0 6px 24px ${levelData.accentColor}40`,
            animation: "pulse 2s ease-in-out infinite",
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
          className="rounded-2xl p-5 mb-4 w-full text-left"
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

        {/* Concepts learned counter */}
        <div
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <Icon
            name="brain"
            size={14}
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {conceptsLearned + (currentModule?.outcomes.length ?? 0)} concepts
            learned
          </span>
        </div>

        {/* Coming Next teaser */}
        <div
          className="rounded-xl p-4 mb-6 w-full text-left"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon
              name="compass"
              size={13}
              style={{ color: "var(--color-text-tertiary)" }}
            />
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

        {!isLastModule ? (
          <button
            onClick={nextModule}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all active:scale-[0.97] cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${levelData.accentColor}, ${levelData.accentColor}DD)`,
              color: "#fff",
              boxShadow: `0 4px 16px ${levelData.accentColor}50`,
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
              Level Complete!
            </p>
            <Link
              href="/course"
              onClick={() => completeModule()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${levelData.accentColor}, ${levelData.accentColor}DD)`,
                color: "#fff",
                boxShadow: `0 4px 16px ${levelData.accentColor}50`,
              }}
            >
              <Icon name="arrow-left" size={16} />
              Back to Levels
            </Link>
          </div>
        )}
      </div>
    );
  };

  /* ═══════════════ INTERACTIVE / EXPERIMENT CARD ═══════════════ */
  const renderInteractive = (card: ModuleCard) => {
    if (card.type !== "interactive") return null;

    const moveItem = (fromIdx: number, toIdx: number) => {
      if (interactiveSubmitted) return;
      const newOrder = [...interactiveOrder];
      const [removed] = newOrder.splice(fromIdx, 1);
      newOrder.splice(toIdx, 0, removed);
      setInteractiveOrder(newOrder);
    };

    const submitAnswer = () => {
      const isCorrect = interactiveOrder.every((id, idx) => {
        const item = card.items.find((it) => it.id === id);
        return item?.correctPosition === idx;
      });
      setInteractiveCorrect(isCorrect);
      setInteractiveSubmitted(true);
    };

    return (
      <div className="py-6 px-1">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: levelData.accentColor,
              boxShadow: `0 8px 32px ${levelData.accentColor}50`,
            }}
          >
            <Icon name="sparkles" size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: levelData.accentColor }}
            >
              Interactive Exercise
            </div>
            <h2
              className="text-base font-bold leading-snug"
              style={{ color: "var(--color-text)" }}
            >
              {card.title}
            </h2>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.instruction}
        </p>

        {/* Sortable items */}
        <div
          className="rounded-2xl p-3 mb-5"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "2px dashed var(--color-border)",
          }}
        >
          {interactiveOrder.map((id, idx) => {
            const item = card.items.find((it) => it.id === id);
            if (!item) return null;

            let itemBg = "var(--color-surface)";
            let itemBorder = "var(--color-border)";
            if (interactiveSubmitted) {
              const isInCorrectPos = item.correctPosition === idx;
              itemBg = isInCorrectPos
                ? "var(--color-success-subtle)"
                : "var(--color-error-subtle)";
              itemBorder = isInCorrectPos
                ? "var(--color-success)"
                : "var(--color-error)";
            }

            return (
              <div
                key={id}
                className="flex items-center gap-3 p-3 rounded-xl mb-2 last:mb-0 transition-all select-none"
                style={{
                  backgroundColor: itemBg,
                  border: `1.5px solid ${itemBorder}`,
                  boxShadow: "var(--shadow-xs)",
                  cursor: interactiveSubmitted ? "default" : "grab",
                  opacity: draggedItem === id ? 0.5 : 1,
                }}
                draggable={!interactiveSubmitted}
                onDragStart={() => setDraggedItem(id)}
                onDragEnd={() => setDraggedItem(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedItem && draggedItem !== id) {
                    const fromIdx = interactiveOrder.indexOf(draggedItem);
                    moveItem(fromIdx, idx);
                  }
                  setDraggedItem(null);
                }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    backgroundColor: interactiveSubmitted
                      ? item.correctPosition === idx
                        ? "var(--color-success)"
                        : "var(--color-error)"
                      : "var(--color-bg-muted)",
                    color: interactiveSubmitted ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {interactiveSubmitted ? (
                    item.correctPosition === idx ? (
                      <Icon name="check" size={11} />
                    ) : (
                      <Icon name="x" size={11} />
                    )
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className="text-sm font-medium flex-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.label}
                </span>
                {!interactiveSubmitted && (
                  <div className="flex flex-col gap-0.5 shrink-0">
                    {idx > 0 && (
                      <button
                        onClick={() => moveItem(idx, idx - 1)}
                        className="w-6 h-5 rounded flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-bg-muted)",
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                      </button>
                    )}
                    {idx < interactiveOrder.length - 1 && (
                      <button
                        onClick={() => moveItem(idx, idx + 1)}
                        className="w-6 h-5 rounded flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-bg-muted)",
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback */}
        {interactiveSubmitted && (
          <div
            className="rounded-xl p-4 mb-5"
            style={{
              backgroundColor: interactiveCorrect
                ? "var(--color-success-subtle)"
                : "var(--color-error-subtle)",
              border: `1px solid ${interactiveCorrect ? "var(--color-success)" : "var(--color-error)"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon
                name={interactiveCorrect ? "check" : "x"}
                size={14}
                style={{
                  color: interactiveCorrect
                    ? "var(--color-success)"
                    : "var(--color-error)",
                }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: interactiveCorrect
                    ? "var(--color-success)"
                    : "var(--color-error)",
                }}
              >
                {interactiveCorrect ? "Correct!" : "Not Quite"}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              {interactiveCorrect
                ? card.feedback.correct
                : card.feedback.incorrect}
            </p>
          </div>
        )}

        {!interactiveSubmitted ? (
          <button
            onClick={submitAnswer}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
            style={{
              background: levelData.accentColor,
              color: "#fff",
              boxShadow: `0 8px 32px ${levelData.accentColor}40`,
            }}
          >
            Check Answer
            <Icon name="zap" size={16} />
          </button>
        ) : (
          <button
            onClick={nextCard}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: levelData.accentColor,
              color: "#fff",
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

  /* ═══════════════ CARD ROUTER ═══════════════ */
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
      case "interactive":
        return renderInteractive(currentCard);
      default:
        return null;
    }
  };

  /* ═══════════════ LAYOUT ═══════════════ */
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Frosted nav */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 h-14 mx-auto w-full max-w-[430px]"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-bg) 85%, transparent)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <Link
          href="/course"
          className="flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Icon name="arrow-left" size={16} />
          <span>Map</span>
        </Link>

        {phase === "card" && currentModule && (
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {cardIdx + 1}/{totalCards}
          </span>
        )}
        {phase === "modules" && <div style={{ width: 40 }} />}
      </nav>

      {/* Card progress bar */}
      {phase === "card" && (
        <div
          className="fixed top-14 left-0 right-0 z-40 h-1 mx-auto w-full max-w-[430px]"
          style={{ backgroundColor: "var(--color-progress)" }}
        >
          <div
            className="h-full rounded-r-full"
            style={{
              width: `${cardProgress}%`,
              backgroundColor: levelData.accentColor,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateX(-20px)" : "translateX(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {phase === "modules" ? (
          renderModules()
        ) : (
          <div className="pt-16 pb-8 px-5">{renderCard()}</div>
        )}
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
