"use client";

import { useState, useCallback } from "react";
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
      className="h-dvh overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
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
        <div className="px-5 pb-3">
          <ProgressBar current={currentIndex + 1} total={totalLessons} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-5 overflow-hidden">
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
      <footer className="py-3 text-center">
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
