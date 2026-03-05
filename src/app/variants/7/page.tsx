"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

interface SlideItem {
  module: Module;
  card: ModuleCard;
}

function buildSlides(): SlideItem[] {
  const slides: SlideItem[] = [];
  course.forEach((mod) => {
    mod.cards.forEach((card) => {
      slides.push({ module: mod, card });
    });
  });
  return slides;
}

export default function Variant7() {
  const [slides] = useState(buildSlides);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev") => {
      if (idx < 0 || idx >= slides.length || animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setQuizAnswer(null);
        setAnimating(false);
      }, 250);
    },
    [slides.length, animating]
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  /* Swipe handling */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  /* Slide renderers */
  const renderHook = () => {
    if (slide.card.type !== "hook") return null;
    const card = slide.card;
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 h-full">
        <div
          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8"
          style={{
            backgroundColor: "var(--color-primary-ghost)",
            color: "var(--color-primary)",
          }}
        >
          {slide.module.category}
        </div>
        <h1
          className="text-2xl font-bold leading-tight mb-4"
          style={{ color: "var(--color-text)" }}
        >
          {card.headline}
        </h1>
        <p
          className="text-sm leading-relaxed max-w-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.subheadline}
        </p>
      </div>
    );
  };

  const renderConcept = () => {
    if (slide.card.type !== "concept") return null;
    const card = slide.card;
    return (
      <div className="flex flex-col px-5 py-6 h-full overflow-y-auto">
        <h2
          className="text-lg font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          {card.title}
        </h2>
        <p
          className="text-[13px] leading-[1.8] mb-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.body}
        </p>
        <div
          className="mt-4 p-4 rounded-xl"
          style={{
            backgroundColor: "var(--color-primary-ghost)",
            border: "1px solid var(--color-primary-subtle)",
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
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            {card.analogy}
          </p>
        </div>
      </div>
    );
  };

  const renderVisual = () => {
    if (slide.card.type !== "visual") return null;
    const card = slide.card;
    return (
      <div className="flex flex-col px-5 py-6 h-full overflow-y-auto">
        <h2
          className="text-lg font-bold mb-6"
          style={{ color: "var(--color-text)" }}
        >
          {card.title}
        </h2>
        <div className="space-y-3">
          {card.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{
                  backgroundColor: "var(--color-primary-ghost)",
                  color: "var(--color-primary)",
                }}
              >
                {i + 1}
              </div>
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold"
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
    );
  };

  const renderCheck = () => {
    if (slide.card.type !== "check") return null;
    const card = slide.card;
    const answered = quizAnswer !== null;
    return (
      <div className="flex flex-col px-5 py-6 h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
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
          className="text-base font-bold mb-5"
          style={{ color: "var(--color-text)" }}
        >
          {card.question}
        </h3>
        <div className="space-y-2.5">
          {card.options.map((opt, idx) => {
            let bg = "var(--color-bg-subtle)";
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
                <span className="text-[13px] font-medium">{opt.text}</span>
              </button>
            );
          })}
        </div>
        {answered && (
          <p
            className="text-xs mt-4 p-3 rounded-lg leading-relaxed"
            style={{
              backgroundColor: "var(--color-bg-muted)",
              color: "var(--color-text-secondary)",
            }}
          >
            {card.explanation}
          </p>
        )}
      </div>
    );
  };

  const renderRealWorld = () => {
    if (slide.card.type !== "realworld") return null;
    const card = slide.card;
    return (
      <div className="flex flex-col items-start justify-center px-5 py-6 h-full">
        <div className="flex items-center gap-2 mb-6">
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
        <h2
          className="text-2xl font-bold mb-5"
          style={{ color: "var(--color-text)" }}
        >
          {card.company}
        </h2>
        <div
          className="rounded-xl p-4 mb-4 w-full"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            What they did
          </p>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            {card.what}
          </p>
        </div>
        <div
          className="rounded-xl p-4 w-full"
          style={{
            backgroundColor: "var(--color-success-subtle)",
            border: "1px solid var(--color-success)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ color: "var(--color-success)" }}
          >
            Result
          </p>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            {card.result}
          </p>
        </div>
      </div>
    );
  };

  const renderTakeaway = () => {
    if (slide.card.type !== "takeaway") return null;
    const card = slide.card;
    return (
      <div className="flex flex-col items-center justify-center text-center px-5 py-6 h-full">
        <div
          className="w-full rounded-xl p-5 mb-6"
          style={{
            backgroundColor: "var(--color-primary-ghost)",
            border: "1px solid var(--color-primary-subtle)",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
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
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            {card.summary}
          </p>
        </div>
        <p
          className="text-xs leading-relaxed mb-6 max-w-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.nextTeaser}
        </p>
        {current < slides.length - 1 && (
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-text)",
            }}
          >
            Continue
            <Icon name="chevron-right" size={14} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Thin top toolbar */}
      <div
        className="flex items-center justify-between px-3 h-11 shrink-0"
        style={{
          backgroundColor: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link
          href="/variants"
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Icon name="arrow-left" size={14} />
        </Link>

        <div className="flex items-center gap-2.5">
          <span
            className="text-[11px] font-mono font-semibold"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {current + 1}/{slides.length}
          </span>
          <div
            className="w-16 h-1 rounded-full"
            style={{ backgroundColor: "var(--color-progress)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--color-progress-fill)",
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-20 cursor-pointer disabled:cursor-default"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-20 cursor-pointer disabled:cursor-default"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      {/* Full-screen slide area */}
      <div
        className="flex-1 overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "next"
                ? "translateX(40px)"
                : "translateX(-40px)"
              : "translateX(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {slide.card.type === "hook" && renderHook()}
          {slide.card.type === "concept" && renderConcept()}
          {slide.card.type === "visual" && renderVisual()}
          {slide.card.type === "check" && renderCheck()}
          {slide.card.type === "realworld" && renderRealWorld()}
          {slide.card.type === "takeaway" && renderTakeaway()}
        </div>
      </div>

      {/* Swipe hint */}
      <div
        className="flex items-center justify-center py-2.5 shrink-0"
        style={{
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Swipe to navigate
        </span>
      </div>
    </div>
  );
}
