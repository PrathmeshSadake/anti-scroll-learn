"use client";

import { useState, useMemo } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

type LessonPhase = "learn" | "cards" | "quiz" | "takeaway";

function getCardsByPhase(cards: ModuleCard[]) {
  return {
    learn: cards.filter((c) => c.type === "hook" || c.type === "concept"),
    cards: cards.filter((c) => c.type === "visual" || c.type === "realworld"),
    quiz: cards.filter((c) => c.type === "check"),
    takeaway: cards.filter((c) => c.type === "takeaway"),
  };
}

export default function Variant6() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set([course[0].id]));
  const [score, setScore] = useState(0);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [phase, setPhase] = useState<LessonPhase>("learn");
  const [learnCardIdx, setLearnCardIdx] = useState(0);
  const [cardsCardIdx, setCardsCardIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const activeModule = useMemo(
    () => course.find((m) => m.id === activeModuleId) ?? null,
    [activeModuleId]
  );

  const phaseCards = useMemo(
    () => (activeModule ? getCardsByPhase(activeModule.cards) : null),
    [activeModule]
  );

  const totalModules = course.length;
  const unlockPercent = Math.round((unlockedIds.size / totalModules) * 100);

  /* Group modules by level */
  const levels = useMemo(() => {
    const map = new Map<number, { levelName: string; modules: Module[] }>();
    for (const m of course) {
      if (!map.has(m.level)) {
        map.set(m.level, { levelName: m.levelName, modules: [] });
      }
      map.get(m.level)!.modules.push(m);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, []);

  const openModule = (mod: Module) => {
    if (!unlockedIds.has(mod.id)) return;
    setActiveModuleId(mod.id);
    setPhase("learn");
    setLearnCardIdx(0);
    setCardsCardIdx(0);
    setQuizAnswer(null);
  };

  const completeModule = () => {
    if (!activeModule) return;
    const newCompleted = new Set(completedIds);
    newCompleted.add(activeModule.id);
    setCompletedIds(newCompleted);

    const newUnlocked = new Set(unlockedIds);
    const idx = course.findIndex((m) => m.id === activeModule.id);
    if (idx >= 0 && idx + 1 < course.length) {
      newUnlocked.add(course[idx + 1].id);
    }
    setUnlockedIds(newUnlocked);
    setScore((s) => s + 1);
    setActiveModuleId(null);
  };

  const getModuleStatus = (mod: Module): "completed" | "unlocked" | "locked" => {
    if (completedIds.has(mod.id)) return "completed";
    if (unlockedIds.has(mod.id)) return "unlocked";
    return "locked";
  };

  /* ─── PATH VIEW ─── */
  if (activeModuleId === null) {
    return (
      <div
        className="h-dvh flex flex-col overflow-hidden"
        style={{ backgroundColor: "var(--color-bg)", fontFamily: "var(--font-sans)" }}
      >
        {/* Nav */}
        <nav
          className="flex items-center justify-between px-5 h-14 shrink-0"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <Link
            href="/variants"
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Icon name="arrow-left" size={16} />
          </Link>
          <h1
            className="text-sm font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            Learning Path
          </h1>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: "var(--color-primary-ghost)",
              color: "var(--color-primary)",
            }}
          >
            <Icon name="star" size={14} />
            <span className="text-xs font-bold">{score}</span>
          </div>
        </nav>

        {/* Progress bar */}
        <div className="px-5 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="h-2 flex-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--color-progress)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${unlockPercent}%`,
                  backgroundColor: "var(--color-progress-fill)",
                }}
              />
            </div>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {unlockPercent}%
            </span>
          </div>
        </div>

        {/* Path */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-sm mx-auto px-5 pb-12 pt-4">
            {levels.map(([levelNum, { levelName, modules }], levelIdx) => (
              <div key={levelNum}>
                {/* Level header */}
                <div className="flex items-center gap-3 mb-6 mt-2">
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--color-border)" }}
                  />
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap px-1"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    Level {levelNum}: {levelName}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--color-border)" }}
                  />
                </div>

                <div className="relative">
                  {/* Connecting line */}
                  <div
                    className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
                    style={{ backgroundColor: "var(--color-border)" }}
                  />

                  {modules.map((mod, i) => {
                    const status = getModuleStatus(mod);
                    const isEven = i % 2 === 0;

                    return (
                      <div
                        key={mod.id}
                        className="relative flex items-center mb-5"
                        style={{
                          justifyContent: isEven ? "flex-start" : "flex-end",
                        }}
                      >
                        {/* Center dot */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                          style={{
                            backgroundColor:
                              status === "completed"
                                ? "var(--color-success)"
                                : status === "unlocked"
                                ? "var(--color-primary)"
                                : "var(--color-border)",
                            boxShadow:
                              status !== "locked"
                                ? `0 0 0 4px color-mix(in srgb, ${
                                    status === "completed"
                                      ? "var(--color-success)"
                                      : "var(--color-primary)"
                                  } 15%, transparent)`
                                : "none",
                          }}
                        />

                        {/* Node card */}
                        <button
                          onClick={() => openModule(mod)}
                          disabled={status === "locked"}
                          className="w-[calc(50%-28px)] p-3.5 rounded-2xl text-left transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                          style={{
                            backgroundColor:
                              status !== "locked"
                                ? "var(--color-surface)"
                                : "var(--color-bg-muted)",
                            border: `1.5px solid ${
                              status !== "locked"
                                ? "var(--color-border)"
                                : "var(--color-border-subtle)"
                            }`,
                            boxShadow:
                              status !== "locked"
                                ? "var(--shadow-md)"
                                : "none",
                          }}
                        >
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor:
                                  status === "completed"
                                    ? "var(--color-success-subtle)"
                                    : status === "unlocked"
                                    ? "var(--color-primary-ghost)"
                                    : "var(--color-bg-muted)",
                                color:
                                  status === "completed"
                                    ? "var(--color-success)"
                                    : status === "unlocked"
                                    ? "var(--color-primary)"
                                    : "var(--color-text-tertiary)",
                              }}
                            >
                              {status === "completed" ? (
                                <Icon name="check" size={14} />
                              ) : status === "unlocked" ? (
                                <Icon name={mod.icon} size={14} />
                              ) : (
                                <Icon name="lock" size={12} />
                              )}
                            </div>
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
                          <p
                            className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                            style={{
                              color:
                                status !== "locked"
                                  ? "var(--color-primary)"
                                  : "var(--color-text-tertiary)",
                            }}
                          >
                            {mod.category}
                          </p>
                          <p
                            className="text-[13px] font-semibold leading-snug"
                            style={{
                              color:
                                status !== "locked"
                                  ? "var(--color-text)"
                                  : "var(--color-text-tertiary)",
                            }}
                          >
                            {mod.title}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Spacer between levels */}
                {levelIdx < levels.length - 1 && <div className="h-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── LESSON VIEW ─── */
  if (!activeModule || !phaseCards) return null;

  const learnCards = phaseCards.learn;
  const cardsCards = phaseCards.cards;
  const quizCards = phaseCards.quiz;
  const takeawayCards = phaseCards.takeaway;

  const phaseOrder: LessonPhase[] = ["learn", "cards", "quiz", "takeaway"];
  const phaseLabels: Record<LessonPhase, string> = {
    learn: "Learn",
    cards: "Cards",
    quiz: "Quiz",
    takeaway: "Done",
  };

  const currentPhaseIdx = phaseOrder.indexOf(phase);
  const phaseComplete = (p: LessonPhase) => phaseOrder.indexOf(p) < currentPhaseIdx;

  const advanceLearn = () => {
    if (learnCardIdx < learnCards.length - 1) {
      setLearnCardIdx((i) => i + 1);
    } else {
      setPhase("cards");
      setCardsCardIdx(0);
    }
  };

  const advanceCards = () => {
    if (cardsCardIdx < cardsCards.length - 1) {
      setCardsCardIdx((i) => i + 1);
    } else {
      setPhase("quiz");
      setQuizAnswer(null);
    }
  };

  const finishQuiz = () => {
    setPhase("takeaway");
  };

  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)", fontFamily: "var(--font-sans)" }}
    >
      {/* Lesson nav */}
      <nav
        className="flex items-center justify-between px-5 h-14 shrink-0"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <button
          onClick={() => setActiveModuleId(null)}
          className="flex items-center gap-1.5 text-sm font-medium cursor-pointer"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Icon name="arrow-left" size={16} />
        </button>
        <h1
          className="text-sm font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          {activeModule.title}
        </h1>
        <div className="w-8" />
      </nav>

      {/* Phase indicators */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <div className="flex gap-2">
          {phaseOrder.slice(0, 3).map((p) => (
            <div key={p} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    phaseComplete(p) || p === phase
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                }}
              />
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{
                  color:
                    phaseComplete(p) || p === phase
                      ? "var(--color-primary)"
                      : "var(--color-text-tertiary)",
                }}
              >
                {phaseLabels[p]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-5 py-6">
          {/* ── LEARN PHASE ── */}
          {phase === "learn" && learnCards.length > 0 && (
            <div>
              {(() => {
                const card = learnCards[learnCardIdx];
                if (card.type === "hook") {
                  return (
                    <div>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                          boxShadow:
                            "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                        }}
                      >
                        <Icon
                          name={activeModule.icon}
                          size={24}
                          className="text-white"
                        />
                      </div>
                      <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
                        style={{
                          backgroundColor: "var(--color-primary-ghost)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {activeModule.category}
                      </div>
                      <h2
                        className="text-2xl font-bold leading-tight mb-3"
                        style={{ color: "var(--color-text)" }}
                      >
                        {card.headline}
                      </h2>
                      <p
                        className="text-sm leading-relaxed mb-8"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {card.subheadline}
                      </p>
                      <button
                        onClick={advanceLearn}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-primary-text)",
                          boxShadow: "var(--shadow-md)",
                        }}
                      >
                        Continue
                        <Icon name="arrow-right" size={14} />
                      </button>
                    </div>
                  );
                }
                if (card.type === "concept") {
                  return (
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: "var(--color-primary-ghost)",
                            color: "var(--color-primary)",
                          }}
                        >
                          <Icon name={activeModule.icon} size={18} />
                        </div>
                        <div>
                          <p
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--color-primary)" }}
                          >
                            Concept
                          </p>
                          <h2
                            className="text-lg font-bold"
                            style={{ color: "var(--color-text)" }}
                          >
                            {card.title}
                          </h2>
                        </div>
                      </div>
                      <p
                        className="text-[15px] leading-[1.8] mb-5"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {card.body}
                      </p>
                      <div
                        className="rounded-xl p-4 mb-6"
                        style={{
                          backgroundColor: "var(--color-bg-subtle)",
                          border: "1px solid var(--color-border-subtle)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon
                            name="sparkles"
                            size={14}
                            style={{ color: "var(--color-primary)" }}
                          />
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--color-primary)" }}
                          >
                            Analogy
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
                        onClick={advanceLearn}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-primary-text)",
                          boxShadow: "var(--shadow-md)",
                        }}
                      >
                        Continue
                        <Icon name="arrow-right" size={14} />
                      </button>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* ── CARDS PHASE ── */}
          {phase === "cards" && cardsCards.length > 0 && (
            <div>
              <p
                className="text-xs font-semibold mb-5"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {cardsCardIdx + 1} / {cardsCards.length}
              </p>

              {(() => {
                const card = cardsCards[cardsCardIdx];
                if (card.type === "visual") {
                  return (
                    <div>
                      <h3
                        className="text-lg font-bold mb-5"
                        style={{ color: "var(--color-text)" }}
                      >
                        {card.title}
                      </h3>
                      <div className="space-y-3 mb-6">
                        {card.steps.map((step, si) => (
                          <div
                            key={si}
                            className="flex items-start gap-3 p-3 rounded-xl"
                            style={{
                              backgroundColor: "var(--color-bg-subtle)",
                              border: "1px solid var(--color-border-subtle)",
                            }}
                          >
                            <div
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                              style={{
                                backgroundColor: "var(--color-primary-ghost)",
                                color: "var(--color-primary)",
                              }}
                            >
                              {si + 1}
                            </div>
                            <div>
                              <p
                                className="text-sm font-semibold mb-0.5"
                                style={{ color: "var(--color-text)" }}
                              >
                                {step.label}
                              </p>
                              <p
                                className="text-[13px] leading-relaxed"
                                style={{ color: "var(--color-text-secondary)" }}
                              >
                                {step.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={advanceCards}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-primary-text)",
                          boxShadow: "var(--shadow-md)",
                        }}
                      >
                        {cardsCardIdx < cardsCards.length - 1
                          ? "Next"
                          : "Start Quiz"}
                        <Icon name="arrow-right" size={14} />
                      </button>
                    </div>
                  );
                }
                if (card.type === "realworld") {
                  return (
                    <div>
                      <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
                        style={{
                          backgroundColor: "var(--color-success-subtle)",
                          color: "var(--color-success)",
                        }}
                      >
                        Real World
                      </div>
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ color: "var(--color-text)" }}
                      >
                        {card.company}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {card.what}
                      </p>
                      <div
                        className="rounded-xl p-4 mb-6"
                        style={{
                          backgroundColor: "var(--color-success-subtle)",
                          border: "1px solid var(--color-success)",
                        }}
                      >
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--color-success)" }}
                        >
                          {card.result}
                        </p>
                      </div>
                      <button
                        onClick={advanceCards}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-primary-text)",
                          boxShadow: "var(--shadow-md)",
                        }}
                      >
                        {cardsCardIdx < cardsCards.length - 1
                          ? "Next"
                          : "Start Quiz"}
                        <Icon name="arrow-right" size={14} />
                      </button>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* ── QUIZ PHASE ── */}
          {phase === "quiz" && quizCards.length > 0 && (
            <div>
              {(() => {
                const card = quizCards[0];
                if (card.type !== "check") return null;
                const answered = quizAnswer !== null;

                return (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon
                        name="zap"
                        size={16}
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Knowledge Check
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-6 leading-snug"
                      style={{ color: "var(--color-text)" }}
                    >
                      {card.question}
                    </h3>
                    <div className="space-y-2.5 mb-6">
                      {card.options.map((opt, idx) => {
                        let bg = "var(--color-surface)";
                        let border = "var(--color-border)";
                        let tc = "var(--color-text)";

                        if (answered && opt.correct) {
                          bg = "var(--color-success-subtle)";
                          border = "var(--color-success)";
                          tc = "var(--color-success)";
                        } else if (answered && idx === quizAnswer) {
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
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
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
                                <Icon name="check" size={12} />
                              ) : answered && idx === quizAnswer ? (
                                <Icon name="x" size={12} />
                              ) : (
                                String.fromCharCode(65 + idx)
                              )}
                            </div>
                            <span className="text-sm font-medium">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {answered && (
                      <>
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
                        <button
                          onClick={finishQuiz}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-primary-text)",
                            boxShadow: "var(--shadow-md)",
                          }}
                        >
                          Continue
                          <Icon name="arrow-right" size={14} />
                        </button>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── TAKEAWAY PHASE ── */}
          {phase === "takeaway" && (
            <div>
              {(() => {
                const card = takeawayCards[0];
                if (!card || card.type !== "takeaway") {
                  return (
                    <div className="text-center">
                      <button
                        onClick={completeModule}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{
                          backgroundColor: "var(--color-success)",
                          color: "#fff",
                        }}
                      >
                        <Icon name="check" size={14} />
                        Complete & Unlock Next
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        backgroundColor: "var(--color-success-subtle)",
                        color: "var(--color-success)",
                      }}
                    >
                      <Icon name="award" size={28} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: "var(--color-text)" }}
                    >
                      Lesson Complete
                    </h3>
                    <div
                      className="rounded-xl p-5 mb-5 text-left"
                      style={{
                        backgroundColor: "var(--color-bg-subtle)",
                        border: "1px solid var(--color-border-subtle)",
                      }}
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider mb-2"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Key Takeaway
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text)" }}
                      >
                        {card.summary}
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-4 mb-6 text-left"
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
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {card.nextTeaser}
                      </p>
                    </div>
                    <button
                      onClick={completeModule}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                      style={{
                        backgroundColor: "var(--color-success)",
                        color: "#fff",
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      <Icon name="check" size={14} />
                      Complete & Unlock Next
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
