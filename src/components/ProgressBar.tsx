"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full flex items-center gap-3">
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-progress)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: "var(--color-progress-fill)",
          }}
        />
      </div>
      <span
        className="text-xs font-medium tabular-nums"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {current}/{total}
      </span>
    </div>
  );
}
