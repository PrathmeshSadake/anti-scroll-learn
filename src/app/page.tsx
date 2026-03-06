"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import lessons from "@/data/lessons";
import LessonCard from "@/components/LessonCard";
import ProgressBar from "@/components/ProgressBar";
import ThemeToggle from "@/components/ThemeToggle";
import CompletionScreen from "@/components/CompletionScreen";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const totalLessons = lessons.length;

  const handleComplete = useCallback(() => {
    setScore((s) => s + 1);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalLessons) {
      setCompleted(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, totalLessons]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
  };

  return (
    <main
      className="h-full overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3">
        <h1
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          anti<span style={{ color: "var(--color-accent)" }}>scroll</span>
        </h1>
        <ThemeToggle />
      </header>

      {/* Progress */}
      {!completed && (
        <div className="px-5 pb-2">
          <ProgressBar current={currentIndex + 1} total={totalLessons} />
        </div>
      )}

      {/* Content */}
      <div className="flex items-start justify-center px-5 overflow-hidden">
        {completed ? (
          <CompletionScreen
            score={score}
            total={totalLessons}
            onRestart={handleRestart}
          />
        ) : (
          <LessonCard
            key={lessons[currentIndex].id}
            lesson={lessons[currentIndex]}
            onComplete={handleComplete}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="shrink-0 pb-2 pt-1 text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/course"
            className="inline-block px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{
              background: "#1E3A5F",
              color: "#fff",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Test Course Levels →
          </Link>
          <Link
            href="/variants"
            className="inline-block px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{
              backgroundColor: "var(--color-card)",
              color: "var(--color-accent)",
              border: "1px solid var(--color-card-border)",
            }}
          >
            View Variants →
          </Link>
        </div>
        <p
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Learn one concept at a time
        </p>
      </footer>
    </main>
  );
}
