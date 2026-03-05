"use client";

import { useState, useCallback } from "react";
import course from "@/data/genai-course";
import type { Module, ModuleCard } from "@/data/genai-course";
import Icon from "@/components/Icons";
import Link from "next/link";

export default function Variant4() {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const mod: Module = course[moduleIdx];
  const card: ModuleCard = mod.cards[cardIdx];
  const totalCards = mod.cards.length;

  const goToModule = useCallback((idx: number) => {
    setModuleIdx(idx);
    setCardIdx(0);
    setSelectedOption(null);
    setTransitioning(false);
  }, []);

  const advance = useCallback(() => {
    if (card.type === "check" && selectedOption === null) return;
    setTransitioning(true);
    setTimeout(() => {
      if (cardIdx < totalCards - 1) {
        setCardIdx(cardIdx + 1);
        setSelectedOption(null);
      } else if (moduleIdx < course.length - 1) {
        goToModule(moduleIdx + 1);
      }
      setTransitioning(false);
    }, 200);
  }, [cardIdx, totalCards, moduleIdx, card.type, selectedOption, goToModule]);

  const retreat = useCallback(() => {
    if (cardIdx > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCardIdx(cardIdx - 1);
        setSelectedOption(null);
        setTransitioning(false);
      }, 200);
    }
  }, [cardIdx]);

  const handleTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (card.type === "check" && selectedOption === null) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const clientX =
        "touches" in e
          ? (e as React.TouchEvent).changedTouches[0].clientX
          : (e as React.MouseEvent).clientX;
      const x = clientX - rect.left;
      if (x < rect.width / 2) {
        retreat();
      } else {
        advance();
      }
    },
    [advance, retreat, card.type, selectedOption]
  );

  /* ── Card renderers ─────────────────────────────────── */

  const renderHook = () => {
    const c = card as Extract<ModuleCard, { type: "hook" }>;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "28px",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "var(--color-primary)",
            marginBottom: "16px",
            maxWidth: "340px",
          }}
        >
          {c.headline}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--color-text-secondary)",
            maxWidth: "320px",
          }}
        >
          {c.subheadline}
        </p>
      </div>
    );
  };

  const renderConcept = () => {
    const c = card as Extract<ModuleCard, { type: "concept" }>;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "14px",
          }}
        >
          {c.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--color-text-secondary)",
            marginBottom: "20px",
          }}
        >
          {c.body}
        </p>
        <div
          style={{
            marginTop: "auto",
            padding: "16px",
            borderRadius: "14px",
            backgroundColor: "var(--color-primary-ghost)",
            border: "1px solid var(--color-primary-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Icon name="sparkles" size={14} style={{ color: "var(--color-primary)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-primary)",
              }}
            >
              Analogy
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              lineHeight: 1.65,
              color: "var(--color-text)",
            }}
          >
            {c.analogy}
          </p>
        </div>
      </div>
    );
  };

  const renderVisual = () => {
    const c = card as Extract<ModuleCard, { type: "visual" }>;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "20px",
          }}
        >
          {c.title}
        </h2>
        <div style={{ position: "relative", paddingLeft: "20px" }}>
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: "12px",
              bottom: "12px",
              width: "2px",
              backgroundColor: "var(--color-border)",
              borderRadius: "1px",
            }}
          />
          {c.steps.map((step, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                marginBottom: i < c.steps.length - 1 ? "16px" : "0",
              }}
            >
              {/* Dot on the line */}
              <div
                style={{
                  position: "absolute",
                  left: "-17px",
                  top: "14px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  border: "2px solid var(--color-bg)",
                  boxShadow: "0 0 0 2px var(--color-primary-subtle)",
                }}
              />
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  backgroundColor: "var(--color-bg-subtle)",
                  border: "1px solid var(--color-border-subtle)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {step.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    lineHeight: 1.55,
                    color: "var(--color-text-secondary)",
                  }}
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
    const c = card as Extract<ModuleCard, { type: "check" }>;
    const answered = selectedOption !== null;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <Icon name="zap" size={16} style={{ color: "var(--color-primary)" }} />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-primary)",
            }}
          >
            Check
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: 1.4,
            color: "var(--color-text)",
            marginBottom: "20px",
          }}
        >
          {c.question}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {c.options.map((opt, idx) => {
            let bg = "var(--color-bg-subtle)";
            let border = "var(--color-border)";
            let textColor = "var(--color-text)";
            if (answered && opt.correct) {
              bg = "var(--color-success-subtle)";
              border = "var(--color-success)";
              textColor = "var(--color-success)";
            } else if (answered && idx === selectedOption && !opt.correct) {
              bg = "var(--color-error-subtle)";
              border = "var(--color-error)";
              textColor = "var(--color-error)";
            }
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!answered) setSelectedOption(idx);
                }}
                disabled={answered}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  backgroundColor: bg,
                  border: `1.5px solid ${border}`,
                  color: textColor,
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  textAlign: "left",
                  cursor: answered ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    flexShrink: 0,
                    backgroundColor:
                      answered && opt.correct
                        ? "var(--color-success)"
                        : answered && idx === selectedOption
                          ? "var(--color-error)"
                          : "var(--color-bg-muted)",
                    color:
                      answered && (opt.correct || idx === selectedOption)
                        ? "#fff"
                        : "var(--color-text-tertiary)",
                  }}
                >
                  {answered && opt.correct ? (
                    <Icon name="check" size={12} />
                  ) : answered && idx === selectedOption ? (
                    <Icon name="x" size={12} />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </div>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>
        {answered && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px 16px",
              borderRadius: "12px",
              backgroundColor: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--color-text-secondary)",
              }}
            >
              {c.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderRealWorld = () => {
    const c = card as Extract<ModuleCard, { type: "realworld" }>;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "360px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            style={{
              padding: "20px",
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <Icon name="globe" size={14} style={{ color: "rgba(255,255,255,0.8)" }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Real World
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "20px",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {c.company}
            </h3>
          </div>
          <div style={{ padding: "20px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "var(--color-text-secondary)",
                marginBottom: "14px",
              }}
            >
              {c.what}
            </p>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                backgroundColor: "var(--color-success-subtle)",
                border: "1px solid var(--color-success)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "4px",
                }}
              >
                <Icon
                  name="bar-chart"
                  size={12}
                  style={{ color: "var(--color-success)" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-success)",
                  }}
                >
                  Result
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  lineHeight: 1.55,
                  color: "var(--color-text)",
                  fontWeight: 600,
                }}
              >
                {c.result}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTakeaway = () => {
    const c = card as Extract<ModuleCard, { type: "takeaway" }>;
    const isLast = moduleIdx === course.length - 1;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow:
              "0 8px 24px color-mix(in srgb, var(--color-primary) 30%, transparent)",
          }}
        >
          <Icon name="award" size={24} style={{ color: "#fff" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "20px",
            fontWeight: 800,
            color: "var(--color-text)",
            marginBottom: "12px",
          }}
        >
          Module Complete
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "var(--color-text-secondary)",
            maxWidth: "320px",
            marginBottom: "24px",
          }}
        >
          {c.summary}
        </p>
        {c.nextTeaser && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--color-text-tertiary)",
              fontStyle: "italic",
              maxWidth: "300px",
              marginBottom: "24px",
            }}
          >
            {c.nextTeaser}
          </p>
        )}
        {!isLast && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToModule(moduleIdx + 1);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "14px",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-text)",
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              boxShadow:
                "0 4px 16px color-mix(in srgb, var(--color-primary) 35%, transparent)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            Next Module
            <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    );
  };

  const renderCard = () => {
    switch (card.type) {
      case "hook":
        return renderHook();
      case "concept":
        return renderConcept();
      case "visual":
        return renderVisual();
      case "check":
        return renderCheck();
      case "realworld":
        return renderRealWorld();
      case "takeaway":
        return renderTakeaway();
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
        maxWidth: "430px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* ── Top bar: progress segments + module info ── */}
      <div
        style={{
          flexShrink: 0,
          padding: "12px 16px 0 16px",
          backgroundColor: "var(--color-bg)",
        }}
      >
        {/* Story-style progress segments */}
        <div
          style={{
            display: "flex",
            gap: "3px",
            marginBottom: "14px",
          }}
        >
          {mod.cards.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "3px",
                borderRadius: "2px",
                backgroundColor:
                  i < cardIdx
                    ? "var(--color-primary)"
                    : i === cardIdx
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                opacity: i < cardIdx ? 0.5 : i === cardIdx ? 1 : 0.3,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Module info row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Link
              href="/variants"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Icon name="x" size={16} />
            </Link>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "2px 10px",
                  borderRadius: "100px",
                  backgroundColor: "var(--color-primary-ghost)",
                  marginBottom: "2px",
                }}
              >
                <Icon
                  name={mod.icon}
                  size={11}
                  style={{ color: "var(--color-primary)" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-primary)",
                  }}
                >
                  {mod.category}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {mod.title}
              </p>
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--color-text-tertiary)",
              whiteSpace: "nowrap",
            }}
          >
            {cardIdx + 1}/{totalCards}
          </span>
        </div>
      </div>

      {/* ── Full-screen card area with tap zones ── */}
      <div
        onClick={card.type !== "check" || selectedOption !== null ? handleTap : undefined}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          cursor:
            card.type === "check" && selectedOption === null
              ? "default"
              : "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          position: "relative",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            margin: "0 16px 16px 16px",
            borderRadius: "20px",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "scale(0.97)" : "scale(1)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {renderCard()}
        </div>
      </div>
    </div>
  );
}
