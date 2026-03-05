"use client";

import { useState } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

export default function Variant3() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});

  const mod: Module = course[activeChapter];

  const switchChapter = (idx: number) => {
    setActiveChapter(idx);
    setSelectedAnswers({});
  };

  const handleAnswer = (cardIdx: number, optionIdx: number) => {
    const key = `${activeChapter}-${cardIdx}`;
    if (selectedAnswers[key] != null) return;
    setSelectedAnswers((prev) => ({ ...prev, [key]: optionIdx }));
  };

  const getAnswer = (cardIdx: number): number | null => {
    const key = `${activeChapter}-${cardIdx}`;
    return selectedAnswers[key] ?? null;
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)", fontFamily: "var(--font-sans)" }}
    >
      {/* Top bar with dot indicators */}
      <header
        className="flex items-center justify-between px-4 h-12 shrink-0"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-bg) 90%, transparent)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <Link
          href="/variants"
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Icon name="arrow-left" size={14} />
        </Link>
        <div className="flex items-center gap-1.5">
          {course.map((_, i) => (
            <button
              key={i}
              onClick={() => switchChapter(i)}
              className="transition-all cursor-pointer"
              style={{
                width: i === activeChapter ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor:
                  i === activeChapter
                    ? "var(--color-primary)"
                    : "var(--color-border)",
              }}
              aria-label={`Chapter ${i + 1}`}
            />
          ))}
        </div>
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Ch. {activeChapter + 1}
        </span>
      </header>

      {/* Chapter hero / gradient header */}
      <div
        className="shrink-0 px-5 pt-5 pb-4"
        style={{
          background:
            "linear-gradient(160deg, var(--color-primary-ghost) 0%, var(--color-bg) 80%)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            boxShadow:
              "0 4px 16px color-mix(in srgb, var(--color-primary) 25%, transparent)",
          }}
        >
          <Icon name={mod.icon} size={22} className="text-white" />
        </div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
          style={{ color: "var(--color-primary)" }}
        >
          {mod.category}
        </p>
        <h1
          className="text-2xl font-bold leading-tight mb-1"
          style={{ color: "var(--color-text)" }}
        >
          {mod.title}
        </h1>
        <p
          className="text-[10px] font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {mod.levelName} &middot; {mod.moduleType}
        </p>
      </div>

      {/* Vertically scrollable card stack */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {mod.cards.map((card, idx) => (
          <CardRenderer
            key={`${activeChapter}-${idx}`}
            card={card}
            cardIdx={idx}
            answer={getAnswer(idx)}
            onAnswer={(optIdx) => handleAnswer(idx, optIdx)}
            onNextChapter={
              activeChapter < course.length - 1
                ? () => switchChapter(activeChapter + 1)
                : undefined
            }
          />
        ))}
      </div>

      {/* Bottom chapter navigation */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <button
          onClick={() => activeChapter > 0 && switchChapter(activeChapter - 1)}
          disabled={activeChapter === 0}
          className="flex items-center gap-1 text-xs font-medium disabled:opacity-30 cursor-pointer disabled:cursor-default"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Icon name="chevron-left" size={14} /> Prev
        </button>
        <span
          className="text-[10px] font-semibold"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Chapter {activeChapter + 1} of {course.length}
        </span>
        <button
          onClick={() =>
            activeChapter < course.length - 1 &&
            switchChapter(activeChapter + 1)
          }
          disabled={activeChapter >= course.length - 1}
          className="flex items-center gap-1 text-xs font-medium disabled:opacity-30 cursor-pointer disabled:cursor-default"
          style={{ color: "var(--color-primary)" }}
        >
          Next <Icon name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Card Renderer ──────────────────────────────────────────── */

function CardRenderer({
  card,
  cardIdx,
  answer,
  onAnswer,
  onNextChapter,
}: {
  card: ModuleCard;
  cardIdx: number;
  answer: number | null;
  onAnswer: (idx: number) => void;
  onNextChapter?: () => void;
}) {
  switch (card.type) {
    case "hook":
      return <HookCard card={card} />;
    case "concept":
      return <ConceptCard card={card} />;
    case "visual":
      return <VisualCard card={card} />;
    case "check":
      return (
        <CheckCard card={card} answer={answer} onAnswer={onAnswer} />
      );
    case "realworld":
      return <RealWorldCard card={card} />;
    case "takeaway":
      return <TakeawayCard card={card} onNextChapter={onNextChapter} />;
    default:
      return null;
  }
}

/* ─── Hook Card ──────────────────────────────────────────────── */

function HookCard({ card }: { card: { type: "hook"; headline: string; subheadline: string } }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
        minHeight: "180px",
      }}
    >
      <h2
        className="text-lg font-bold leading-snug mb-3"
        style={{ color: "#ffffff" }}
      >
        {card.headline}
      </h2>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgba(255,255,255,0.8)" }}
      >
        {card.subheadline}
      </p>
    </div>
  );
}

/* ─── Concept Card ───────────────────────────────────────────── */

function ConceptCard({
  card,
}: {
  card: { type: "concept"; title: string; body: string; analogy: string };
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          name="book"
          size={14}
          style={{ color: "var(--color-primary)" }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--color-primary)" }}
        >
          Concept
        </span>
      </div>
      <h3
        className="text-base font-bold mb-3"
        style={{ color: "var(--color-text)" }}
      >
        {card.title}
      </h3>
      <p
        className="text-sm leading-[1.8] mb-4"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {card.body}
      </p>
      {/* Analogy callout */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: "var(--color-primary-ghost)",
          border: "1px solid var(--color-primary-subtle)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon
            name="sparkles"
            size={13}
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
          className="text-xs leading-relaxed"
          style={{ color: "var(--color-text)" }}
        >
          {card.analogy}
        </p>
      </div>
    </div>
  );
}

/* ─── Visual Card ────────────────────────────────────────────── */

function VisualCard({
  card,
}: {
  card: {
    type: "visual";
    title: string;
    steps: { label: string; description: string }[];
  };
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          name="layers"
          size={14}
          style={{ color: "var(--color-primary)" }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--color-primary)" }}
        >
          Visual
        </span>
      </div>
      <h3
        className="text-base font-bold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        {card.title}
      </h3>
      {/* Vertical step flow */}
      <div className="relative pl-5">
        {card.steps.map((step, i) => (
          <div key={i} className="relative pb-5 last:pb-0">
            {/* Connecting line */}
            {i < card.steps.length - 1 && (
              <div
                className="absolute left-0 top-5 w-[2px]"
                style={{
                  height: "calc(100% - 4px)",
                  backgroundColor: "var(--color-border)",
                  transform: "translateX(9px)",
                }}
              />
            )}
            {/* Numbered circle */}
            <div className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 relative z-10"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-text)",
                }}
              >
                {i + 1}
              </div>
              <div className="min-w-0 pt-px">
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
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Check Card (MCQ) ───────────────────────────────────────── */

function CheckCard({
  card,
  answer,
  onAnswer,
}: {
  card: {
    type: "check";
    question: string;
    options: { text: string; correct: boolean }[];
    explanation: string;
  };
  answer: number | null;
  onAnswer: (idx: number) => void;
}) {
  const answered = answer !== null;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          name="zap"
          size={14}
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
        className="text-sm font-bold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        {card.question}
      </h3>
      <div className="space-y-2 mb-4">
        {card.options.map((opt, idx) => {
          let bg = "var(--color-bg-subtle)";
          let border = "var(--color-border-subtle)";
          let tc = "var(--color-text)";
          let badgeBg = "var(--color-bg-muted)";
          let badgeColor = "var(--color-text-tertiary)";

          if (answered && opt.correct) {
            bg = "var(--color-success-subtle)";
            border = "var(--color-success)";
            tc = "var(--color-success)";
            badgeBg = "var(--color-success)";
            badgeColor = "#ffffff";
          } else if (answered && idx === answer && !opt.correct) {
            bg = "var(--color-error-subtle)";
            border = "var(--color-error)";
            tc = "var(--color-error)";
            badgeBg = "var(--color-error)";
            badgeColor = "#ffffff";
          }

          return (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
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
                style={{ backgroundColor: badgeBg, color: badgeColor }}
              >
                {answered && opt.correct ? (
                  <Icon name="check" size={10} />
                ) : answered && idx === answer ? (
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
      {answered && (
        <div
          className="rounded-xl p-3"
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
    </div>
  );
}

/* ─── Real World Card ────────────────────────────────────────── */

function RealWorldCard({
  card,
}: {
  card: {
    type: "realworld";
    company: string;
    what: string;
    result: string;
  };
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          name="globe"
          size={14}
          style={{ color: "var(--color-primary)" }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--color-primary)" }}
        >
          Real World
        </span>
      </div>
      <h3
        className="text-base font-bold mb-2"
        style={{ color: "var(--color-text)" }}
      >
        {card.company}
      </h3>
      <p
        className="text-sm leading-[1.7] mb-3"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {card.what}
      </p>
      {/* Result highlight */}
      <div
        className="rounded-xl px-4 py-3"
        style={{
          backgroundColor: "var(--color-success-subtle)",
          border: "1px solid var(--color-success)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Icon
            name="bar-chart"
            size={12}
            style={{ color: "var(--color-success)" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--color-success)" }}
          >
            Result
          </span>
        </div>
        <p
          className="text-xs font-medium leading-relaxed"
          style={{ color: "var(--color-success)" }}
        >
          {card.result}
        </p>
      </div>
    </div>
  );
}

/* ─── Takeaway Card ──────────────────────────────────────────── */

function TakeawayCard({
  card,
  onNextChapter,
}: {
  card: { type: "takeaway"; summary: string; nextTeaser: string };
  onNextChapter?: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          name="bookmark"
          size={14}
          style={{ color: "var(--color-primary)" }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--color-primary)" }}
        >
          Takeaway
        </span>
      </div>
      {/* Summary box */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{
          backgroundColor: "var(--color-bg-subtle)",
          border: "1px solid var(--color-border-subtle)",
        }}
      >
        <p
          className="text-sm font-medium leading-[1.7]"
          style={{ color: "var(--color-text)" }}
        >
          {card.summary}
        </p>
      </div>
      {/* Teaser text */}
      <p
        className="text-xs leading-relaxed mb-4"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {card.nextTeaser}
      </p>
      {/* Next chapter button */}
      {onNextChapter && (
        <button
          onClick={onNextChapter}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-text)",
          }}
        >
          Next Chapter
          <Icon name="arrow-right" size={14} />
        </button>
      )}
    </div>
  );
}
