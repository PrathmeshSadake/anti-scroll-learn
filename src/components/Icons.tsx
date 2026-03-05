import type { IconType } from "@/data/genai-course";

interface IconProps {
  name: IconType | string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const paths: Record<string, string> = {
  cpu: "M9 3V1m0 2v2M15 3V1m0 2v2M9 21v-2m0 2v2M15 21v-2m0 2v2M3 9h2M3 9H1M3 15h2M3 15H1M21 9h-2m2 0h2M21 15h-2m2 0h2M7 7h10v10H7z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  brain: "M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21h6M10 17v4M14 17v4",
  pencil: "M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z",
  target: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  "arrow-left": "M19 12H5M12 19l-7-7 7-7",
  "arrow-right": "M5 12h14M12 5l7 7-7 7",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  "chevron-right": "M9 18l6-6-6-6",
  "chevron-left": "M15 18l-6-6 6-6",
  "chevron-down": "M6 9l6 6 6-6",
  play: "M5 3l14 9-14 9V3z",
  sparkles: "M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2zM5 3v4M3 5h4M19 17v4M17 19h4",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  compass: "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
  clock: "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zM12 6v6l4 2",
  rotate: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15",
  hash: "M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18",
  terminal: "M4 17l6-5-6-5M12 19h8",
  "message-circle": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  award: "M12 15l-3.09 6.26L12 18.77l3.09 2.49L13.82 15M7 14.14L2 9.27l6.91-1.01L12 2l3.09 6.26L22 9.27l-5 4.87",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  unlock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 9.9-1",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  "bar-chart": "M12 20V10M18 20V4M6 20v-4",
  globe: "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
};

export default function Icon({ name, size = 20, className = "", style }: IconProps) {
  const d = paths[name];
  if (!d) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}
