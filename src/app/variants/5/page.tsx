"use client";

import { useState, useMemo } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

type DashTab = "overview" | "cards" | "quiz";

function getCard<T extends ModuleCard["type"]>(
  mod: Module,
  cardType: T
): Extract<ModuleCard, { type: T }> | null {
  const found = mod.cards.find((c) => c.type === cardType);
  return (found as Extract<ModuleCard, { type: T }>) ?? null;
}

export default function Variant5() {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [tab, setTab] = useState<DashTab>("overview");
  const [flipped, setFlipped] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const mod = course[moduleIdx];
  const progress = Math.round((completed.size / course.length) * 100);

  const conceptCard = useMemo(() => getCard(mod, "concept"), [mod]);
  const visualCard = useMemo(() => getCard(mod, "visual"), [mod]);
  const checkCard = useMemo(() => getCard(mod, "check"), [mod]);

  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const switchModule = (idx: number) => {
    setModuleIdx(idx);
    setTab("overview");
    setFlipped(false);
    setQuizAnswer(null);
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswer !== null || !checkCard) return;
    setQuizAnswer(idx);
    setTotalAnswered((p) => p + 1);
    if (checkCard.options[idx].correct) {
      setCorrectCount((p) => p + 1);
      setCompleted((p) => new Set([...p, moduleIdx]));
    }
  };

  const handleNext = () => {
    if (moduleIdx < course.length - 1) {
      switchModule(moduleIdx + 1);
    }
  };

  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
        maxWidth: "430px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header
        className="shrink-0 px-5 pt-4 pb-3"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {/* Top row: back, title, progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/variants"
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                backgroundColor: "var(--color-bg-subtle)",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <Icon name="arrow-left" size={16} />
            </Link>
            <h1
              className="text-base font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Dashboard
            </h1>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Icon
              name="bar-chart"
              size={14}
              style={{ color: "var(--color-primary)" }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* 2x2 Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Modules", value: course.length, icon: "grid" as const },
            { label: "Completed", value: completed.size, icon: "check" as const },
            { label: "Level", value: mod.levelName, icon: "layers" as const },
            { label: "Accuracy", value: `${accuracy}%`, icon: "target" as const },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 p-2.5 rounded-xl"
              style={{
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--color-primary-ghost)",
                  color: "var(--color-primary)",
                }}
              >
                <Icon name={s.icon} size={14} />
              </div>
              <div>
                <p
                  className="text-base font-bold leading-none"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[9px] font-medium mt-0.5"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {/* Tab bar with underline indicator */}
          <div
            className="sticky top-0 z-10 px-4 py-2"
            style={{
              backgroundColor: "var(--color-bg)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div className="flex gap-0.5">
              {(
                [
                  { key: "overview" as DashTab, label: "Overview", icon: "book" as const },
                  { key: "cards" as DashTab, label: "Cards", icon: "rotate" as const },
                  { key: "quiz" as DashTab, label: "Quiz", icon: "zap" as const },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    if (t.key === "cards") setFlipped(false);
                    if (t.key === "quiz") setQuizAnswer(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold transition-all cursor-pointer relative"
                  style={{
                    color:
                      tab === t.key
                        ? "var(--color-primary)"
                        : "var(--color-text-tertiary)",
                  }}
                >
                  <Icon name={t.icon} size={12} />
                  {t.label}
                  {tab === t.key && (
                    <div
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-4 py-5">
            {/* ── Overview Tab ── */}
            {tab === "overview" && (
              <>
                {/* Module title + icon */}
                <div className="flex items-start gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                      boxShadow:
                        "0 4px 16px color-mix(in srgb, var(--color-primary) 20%, transparent)",
                    }}
                  >
                    <Icon name={mod.icon} size={22} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {mod.category}
                    </p>
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {mod.title}
                    </h2>
                  </div>
                </div>

                {/* Body content from concept card */}
                {conceptCard && (
                  <p
                    className="text-[15px] leading-[1.8] mb-8"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {conceptCard.body}
                  </p>
                )}

                {/* Key points from visual card */}
                {visualCard && (
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    <div
                      className="px-5 py-3 flex items-center gap-2"
                      style={{
                        backgroundColor: "var(--color-bg-subtle)",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <Icon
                        name="sparkles"
                        size={14}
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {visualCard.title}
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      {visualCard.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                            style={{
                              backgroundColor: "var(--color-primary-ghost)",
                              color: "var(--color-primary)",
                            }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <p
                              className="text-sm font-semibold leading-relaxed"
                              style={{ color: "var(--color-text)" }}
                            >
                              {step.label}
                            </p>
                            <p
                              className="text-xs leading-relaxed mt-0.5"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Cards Tab (flashcard flip) ── */}
            {tab === "cards" && conceptCard && (
              <div className="flex flex-col items-center">
                <p
                  className="text-xs font-semibold mb-6"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Tap to flip
                </p>
                <div
                  className="w-full max-w-md cursor-pointer mb-6"
                  style={{ perspective: "1200px" }}
                  onClick={() => setFlipped(!flipped)}
                >
                  <div
                    className="relative w-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
                      transition:
                        "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      minHeight: "280px",
                    }}
                  >
                    {/* Front - analogy */}
                    <div
                      className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
                      style={{
                        backfaceVisibility: "hidden",
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        boxShadow: "var(--shadow-lg)",
                      }}
                    >
                      <Icon
                        name="message-circle"
                        size={20}
                        style={{ color: "var(--color-text-tertiary)" }}
                      />
                      <p
                        className="text-lg font-semibold mt-4"
                        style={{ color: "var(--color-text)" }}
                      >
                        {conceptCard.analogy}
                      </p>
                      <span
                        className="mt-4 text-[11px] font-medium"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        Tap to flip
                      </span>
                    </div>

                    {/* Back - explanation */}
                    <div
                      className="absolute inset-0 rounded-2xl p-8 flex items-center justify-center text-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
                        boxShadow:
                          "0 8px 32px color-mix(in srgb, var(--color-primary) 20%, transparent)",
                      }}
                    >
                      <p className="text-base font-medium text-white leading-relaxed">
                        {conceptCard.body}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setFlipped(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-bg-muted)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setTab("quiz");
                      setQuizAnswer(null);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-primary-text)",
                    }}
                  >
                    Go to Quiz
                  </button>
                </div>
              </div>
            )}

            {/* ── Quiz Tab ── */}
            {tab === "quiz" && checkCard && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon
                    name="zap"
                    size={16}
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Assessment
                  </span>
                </div>
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ color: "var(--color-text)" }}
                >
                  {checkCard.question}
                </h2>
                <div className="space-y-2.5 mb-6">
                  {checkCard.options.map((opt, idx) => {
                    const answered = quizAnswer !== null;
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
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={answered}
                        className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all cursor-pointer disabled:cursor-default"
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
                        <span className="text-sm font-medium">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
                {quizAnswer !== null && (
                  <>
                    <div
                      className="rounded-xl p-4 mb-6"
                      style={{
                        backgroundColor: "var(--color-bg-subtle)",
                        border: "1px solid var(--color-border-subtle)",
                      }}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {checkCard.explanation}
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      {moduleIdx < course.length - 1
                        ? "Complete & Next Module"
                        : "Finish Course"}
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: horizontal scrollable module selector */}
      <div
        className="shrink-0 px-3 py-3"
        style={{
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {course.map((m, idx) => {
            const isActive = idx === moduleIdx;
            const isDone = completed.has(idx);
            return (
              <button
                key={m.id}
                onClick={() => switchModule(idx)}
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-primary)"
                    : isDone
                      ? "var(--color-success-subtle)"
                      : "var(--color-bg-subtle)",
                  color: isActive
                    ? "var(--color-primary-text)"
                    : isDone
                      ? "var(--color-success)"
                      : "var(--color-text-tertiary)",
                  border: `1.5px solid ${
                    isActive
                      ? "var(--color-primary)"
                      : isDone
                        ? "var(--color-success)"
                        : "var(--color-border)"
                  }`,
                }}
              >
                {isDone ? <Icon name="check" size={14} /> : m.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
