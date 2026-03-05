"use client";

interface CompletionScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function CompletionScreen({
  score,
  total,
  onRestart,
}: CompletionScreenProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center px-6">
      <div className="mb-6">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <h2
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--color-text)" }}
      >
        Session Complete!
      </h2>
      <p
        className="text-lg mb-1"
        style={{ color: "var(--color-text-secondary)" }}
      >
        You scored{" "}
        <span className="font-bold" style={{ color: "var(--color-accent)" }}>
          {score}/{total}
        </span>
      </p>
      <p
        className="text-sm mb-8"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {percentage >= 80
          ? "Outstanding! You're mastering these concepts."
          : percentage >= 50
            ? "Good effort! Keep practicing to improve."
            : "Keep learning! Review the concepts and try again."}
      </p>
      <button
        onClick={onRestart}
        className="px-8 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
        style={{
          backgroundColor: "var(--color-btn)",
          color: "var(--color-btn-text)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-btn-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-btn)")
        }
      >
        Start Again
      </button>
    </div>
  );
}
