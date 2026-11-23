import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import "./ServicesWheel.css";

type WheelService = {
  id: string;
  lines: string[];
  title: string;
  description: string;
};

export const WHEEL_SERVICES: WheelService[] = [
  {
    id: "heating",
    lines: ["Heating"],
    title: "Heating Services",
    description:
      "Keep your property warm and comfortable with reliable heating services and professional solutions.",
  },
  {
    id: "cooling",
    lines: ["Cooling"],
    title: "Cooling Services",
    description:
      "Stay comfortable during warmer months with dependable air conditioning and cooling solutions.",
  },
  {
    id: "installation",
    lines: ["HVAC", "Installation"],
    title: "HVAC Installation",
    description:
      "Professional HVAC installation designed to deliver reliable performance and indoor comfort.",
  },
  {
    id: "maintenance",
    lines: ["HVAC", "Maintenance"],
    title: "HVAC Maintenance",
    description:
      "Help maintain system efficiency and prevent unexpected issues with routine HVAC maintenance.",
  },
  {
    id: "repairs",
    lines: ["HVAC", "Repairs"],
    title: "HVAC Repairs",
    description:
      "Get your heating and cooling systems back on track with dependable troubleshooting and repair services.",
  },
  {
    id: "plumbing",
    lines: ["Plumbing"],
    title: "Plumbing Services",
    description:
      "Reliable plumbing solutions for everyday issues, repairs, and plumbing installations.",
  },
];

const AUTO_MS = 4200;
const RESUME_MS = 5200;
const NAVY = "#062747";
const ORANGE = "#ff6900";

const SEGMENT_SPAN = 30;
const CENTERS = [-75, -45, -15, 15, 45, 75] as const;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const polar = (cx: number, cy: number, r: number, deg: number) => ({
  x: cx + r * Math.cos(toRad(deg)),
  y: cy + r * Math.sin(toRad(deg)),
});

const annularSector = (
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number,
) => {
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg >= startDeg ? 1 : 0;
  const os = polar(cx, cy, outerR, startDeg);
  const oe = polar(cx, cy, outerR, endDeg);
  const ie = polar(cx, cy, innerR, endDeg);
  const is = polar(cx, cy, innerR, startDeg);
  return [
    `M ${os.x} ${os.y}`,
    `A ${outerR} ${outerR} 0 ${large} ${sweep} ${oe.x} ${oe.y}`,
    `L ${ie.x} ${ie.y}`,
    `A ${innerR} ${innerR} 0 ${large} ${1 - sweep} ${is.x} ${is.y}`,
    "Z",
  ].join(" ");
};

const arcPath = (
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
) => {
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg >= startDeg ? 1 : 0;
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} ${sweep} ${e.x} ${e.y}`;
};

type ServicesWheelProps = {
  activeIndex: number;
  onActiveChange: (index: number) => void;
  autoPlay?: boolean;
};

const ServicesWheel = ({
  activeIndex,
  onActiveChange,
  autoPlay = true,
}: ServicesWheelProps) => {
  const uid = useId();
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const cx = 400;
  const cy = 400;
  const outerR = 292;
  const innerR = 168;
  const labelR = (outerR + innerR) / 2;
  const underlineR = labelR + 28;

  const ticks = useMemo(() => {
    const items: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let a = -95; a <= 95; a += 4.5) {
      const a0 = polar(cx, cy, outerR + 14, a);
      const a1 = polar(cx, cy, outerR + 22, a);
      items.push({ x1: a0.x, y1: a0.y, x2: a1.x, y2: a1.y });
    }
    return items;
  }, []);

  const segments = useMemo(
    () =>
      WHEEL_SERVICES.map((service, i) => {
        const center = CENTERS[i];
        const start = center - SEGMENT_SPAN / 2;
        const end = center + SEGMENT_SPAN / 2;
        const mid = polar(cx, cy, labelR, center);
        return {
          service,
          center,
          path: annularSector(cx, cy, innerR, outerR, start, end),
          mid,
          underline: arcPath(cx, cy, underlineR, center - 9, center + 9),
          fontSize: service.lines.length > 1 ? 11.5 : 13.5,
        };
      }),
    [labelR, underlineR],
  );

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
    }, RESUME_MS);
  }, []);

  const select = useCallback(
    (index: number, fromUser = false) => {
      if (index === activeIndex) return;
      if (fromUser) pauseTemporarily();
      onActiveChange(index);
    },
    [activeIndex, onActiveChange, pauseTemporarily],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    if (!autoPlay || paused || reduceMotion) return;

    const advance = () => {
      onActiveChange((activeRef.current + 1) % WHEEL_SERVICES.length);
    };

    // Start moving immediately when the section is reached — no initial wait.
    advance();
    const id = window.setInterval(advance, AUTO_MS);
    return () => window.clearInterval(id);
  }, [autoPlay, paused, reduceMotion, onActiveChange]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const current = WHEEL_SERVICES[activeIndex] ?? WHEEL_SERVICES[0];

  return (
    <div
      className="sw-root"
      onPointerDown={pauseTemporarily}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
        resumeTimer.current = window.setTimeout(() => setPaused(false), 900);
      }}
    >
      <p className="sw-sr-only" aria-live="polite">
        Active service: {current.title}. {current.description}
      </p>

      <div className="sw-wheel-wrap">
        <svg
          className="sw-svg"
          viewBox="0 0 800 800"
          role="listbox"
          aria-label="HVAC services carousel"
          aria-activedescendant={`${uid}-seg-${activeIndex}`}
        >
          <path
            d={annularSector(cx, cy, innerR, outerR, 90, 270)}
            fill={NAVY}
          />

          <circle className="sw-ring-orange" cx={cx} cy={cy} r={outerR + 28} />
          <circle className="sw-ring-gap" cx={cx} cy={cy} r={outerR + 18} />
          <circle className="sw-ring-navy" cx={cx} cy={cy} r={outerR + 12} />

          {ticks.map((t, i) => (
            <line
              key={`tick-${i}`}
              className="sw-tick"
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
            />
          ))}

          {segments.map((seg, i) => {
            const isActive = i === activeIndex;
            const dist = i - activeIndex;
            const drift = reduceMotion ? 0 : dist * 5;
            return (
              <g key={seg.service.id}>
                <g
                  id={`${uid}-seg-${i}`}
                  className="sw-segment"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={0}
                  onClick={() => select(i, true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(i, true);
                    }
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      select((i + 1) % WHEEL_SERVICES.length, true);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      select(
                        (i - 1 + WHEEL_SERVICES.length) % WHEEL_SERVICES.length,
                        true,
                      );
                    }
                  }}
                >
                  <path
                    className={`sw-segment-fill${isActive ? " is-active" : ""}`}
                    d={seg.path}
                    fill={isActive ? ORANGE : NAVY}
                  />
                  <path
                    d={seg.path}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2.5}
                    pointerEvents="none"
                  />
                </g>

                <g transform={`rotate(${seg.center} ${seg.mid.x} ${seg.mid.y})`}>
                  <g
                    className={`sw-label${isActive ? " is-active" : ""}`}
                    style={{
                      transform: `translateY(${drift}px) scale(${isActive ? 1.04 : 1})`,
                    }}
                  >
                    {seg.service.lines.map((line, li) => {
                      const lineCount = seg.service.lines.length;
                      const y =
                        seg.mid.y +
                        (li - (lineCount - 1) / 2) * (seg.fontSize * 1.15);
                      return (
                        <text
                          key={line}
                          className="sw-label-text"
                          x={seg.mid.x}
                          y={y}
                          fontSize={seg.fontSize}
                        >
                          {line}
                        </text>
                      );
                    })}
                  </g>
                </g>

                <path
                  className={`sw-underline${isActive ? " is-active" : ""}`}
                  d={seg.underline}
                />
              </g>
            );
          })}

          <circle className="sw-inner-gap" cx={cx} cy={cy} r={innerR - 4} />
          <circle className="sw-inner-ring" cx={cx} cy={cy} r={innerR - 10} />
          <circle cx={cx} cy={cy} r={innerR - 14} fill="#fff" />
        </svg>
      </div>
    </div>
  );
};

export default ServicesWheel;
