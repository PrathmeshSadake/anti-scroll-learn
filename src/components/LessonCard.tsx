"use client";

import { useState } from "react";
import type { Lesson } from "@/data/lessons";

type Step = "learn" | "quiz" | "result";

interface LessonCardProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function LessonCard({ lesson, onComplete }: LessonCardProps) {
  const [step, setStep] = useState<Step>("learn");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const correct = lesson.quiz.options[index].correct;
    setIsCorrect(correct);
    setTimeout(() => setStep("result"), 800);
  };

  const handleNext = () => {
    setStep("learn");
    setSelectedAnswer(null);
    setIsCorrect(null);
    onComplete();
  };

  return (
    <div
      className="w-full max-w-lg mx-auto rounded-2xl p-4 flex flex-col"
      style={{
        backgroundColor: "var(--color-card)",
        border: "1px solid var(--color-card-border)",
        maxHeight: "calc(100dvh - 160px)",
      }}
    >
      {/* Topic badge */}
      <div className="mb-2">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
          style={{
            backgroundColor: "var(--color-btn)",
            color: "var(--color-btn-text)",
          }}
        >
          {lesson.topic}
        </span>
      </div>

      {step === "learn" && (
        <div className="flex flex-col justify-between">
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              {lesson.title}
            </h2>
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {lesson.content}
            </p>
            <div
              className="rounded-lg p-4 mb-4"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-card-border)",
              }}
            >
              <p className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                Key Takeaway
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--color-text)" }}
              >
                {lesson.keyTakeaway}
              </p>
            </div>
          </div>
          <button
            onClick={() => setStep("quiz")}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--color-btn)",
              color: "var(--color-btn-text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-btn-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-btn)")
            }
          >
            Test Your Knowledge
          </button>
        </div>
      )}

      {step === "quiz" && (
        <div className="flex flex-col justify-between">
          <div>
            <h2
              className="text-xl font-bold mb-5"
              style={{ color: "var(--color-text)" }}
            >
              {lesson.quiz.question}
            </h2>
            <div className="flex flex-col gap-3">
              {lesson.quiz.options.map((option, index) => {
                let borderColor = "var(--color-card-border)";
                let bg = "var(--color-bg)";
                if (selectedAnswer === index) {
                  borderColor = isCorrect
                    ? "var(--color-correct)"
                    : "var(--color-incorrect)";
                  bg = isCorrect
                    ? "var(--color-correct)"
                    : "var(--color-incorrect)";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className="w-full text-left p-4 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:cursor-default"
                    style={{
                      backgroundColor:
                        selectedAnswer === index ? bg : "var(--color-bg)",
                      border: `2px solid ${borderColor}`,
                      color:
                        selectedAnswer === index
                          ? "#ffffff"
                          : "var(--color-text)",
                      opacity:
                        selectedAnswer !== null && selectedAnswer !== index
                          ? 0.5
                          : 1,
                    }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="text-5xl mb-2"
            role="img"
            aria-label={isCorrect ? "Correct" : "Incorrect"}
          >
            {isCorrect ? (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-correct)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-5" />
              </svg>
            ) : (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-incorrect)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            )}
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {isCorrect ? "Correct!" : "Not Quite"}
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {isCorrect
              ? "Great job! You nailed this concept."
              : `The answer was: ${lesson.quiz.options.find((o) => o.correct)?.text}`}
          </p>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--color-btn)",
              color: "var(--color-btn-text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-btn-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-btn)")
            }
          >
            Next Lesson
          </button>
        </div>
      )}
    </div>
  );
}
