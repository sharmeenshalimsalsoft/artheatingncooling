import { useEffect, useRef, useState } from "react";
import "./KvFreightHero.css";

const VAN_SRC = "/images/atr-service-van.png";

/** Scroll length for vehicle pullback (in viewports). */
const A = 1.55;
/** Band edge at start / end of pullback (viewport fraction). */
const EDGE_START = 0.58;
const EDGE_END = 0.52;

const CARDS = [
  {
    title: "Heating\nServices",
    body: "Keep your property warm and comfortable with reliable heating services and professional solutions.",
    icon: "flame",
  },
  {
    title: "Cooling\nServices",
    body: "Stay comfortable during warmer months with dependable air conditioning and cooling solutions.",
    icon: "snowflake",
  },
  {
    title: "HVAC\nInstallation",
    body: "Professional HVAC installation designed to deliver reliable performance and indoor comfort.",
    icon: "wrench",
  },
  {
    title: "HVAC\nMaintenance",
    body: "Maintain system efficiency and prevent unexpected issues with routine HVAC maintenance.",
    icon: "settings",
  },
  {
    title: "HVAC\nRepairs",
    body: "Get heating and cooling systems back on track with dependable troubleshooting and repairs.",
    icon: "tool",
  },
  {
    title: "Plumbing\nServices",
    body: "Reliable plumbing solutions for everyday issues, repairs, and plumbing installations.",
    icon: "droplets",
  },
] as const;

function CardIcon({ type }: { type: (typeof CARDS)[number]["icon"] }) {
  if (type === "flame") {
    return (
      <svg viewBox="0 0 38 38" fill="none" aria-hidden>
        <path
          d="M19 6 C19 6 12 14 12 22 C12 27 15 31 19 31 C23 31 26 27 26 22 C26 14 19 6 19 6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M19 18 C19 18 16 21 16 24 C16 26 17.5 28 19 28 C20.5 28 22 26 22 24 C22 21 19 18 19 18Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "snowflake") {
    return (
      <svg viewBox="0 0 38 38" fill="none" aria-hidden>
        <path
          d="M19 6 V32 M8 12.5 L30 25.5 M30 12.5 L8 25.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M19 11 L16 8 M19 11 L22 8 M19 27 L16 30 M19 27 L22 30"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "wrench") {
    return (
      <svg viewBox="0 0 38 38" fill="none" aria-hidden>
        <path
          d="M26 8 C22 8 19 11 19 15 C19 16.5 19.5 18 20.5 19 L10 29.5 C9 30.5 9 32 10 33 C11 34 12.5 34 13.5 33 L24 22.5 C25 23.5 26.5 24 28 24 C32 24 35 21 35 17 L30 19 L26 15 L28 10 C27.3 8.7 26.7 8 26 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "settings") {
    return (
      <svg viewBox="0 0 38 38" fill="none" aria-hidden>
        <circle
          cx="19"
          cy="19"
          r="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M19 7 V11 M19 27 V31 M7 19 H11 M27 19 H31 M10.5 10.5 L13.3 13.3 M24.7 24.7 L27.5 27.5 M27.5 10.5 L24.7 13.3 M13.3 24.7 L10.5 27.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "tool") {
    return (
      <svg viewBox="0 0 38 38" fill="none" aria-hidden>
        <path
          d="M12 26 L26 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M22 10 L28 16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M10 28 C8 30 8 32 10 32 C12 32 14 30 16 28"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle
          cx="25"
          cy="13"
          r="4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 38 38" fill="none" aria-hidden>
      <path
        d="M19 8 C14 14 11 18 11 23 C11 28 14.5 31 19 31 C23.5 31 27 28 27 23 C27 18 24 14 19 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19 22 V31"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const KvFreightHero = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLHeadingElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const vanRef = useRef<HTMLImageElement>(null);
  const speedRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [speedLabel, setSpeedLabel] = useState("00");

  useEffect(() => {
    const track = trackRef.current;
    const letters = lettersRef.current;
    const strip = stripRef.current;
    const van = vanRef.current;
    if (!track || !letters || !strip || !van) return;

    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let smoothSpeed = 0;
    let smoothQ = 0;
    let stripWidth = 0;
    let lettersWidth = 0;
    let B = 2.2;
    let destroyed = false;

    const isNarrow = () =>
      window.innerWidth < 768 || window.innerWidth <= window.innerHeight;

    const layoutEdge = (q: number) => {
      const vh = window.innerHeight;
      const narrow = isNarrow();
      const endEdge = narrow ? 0.46 : EDGE_END;
      const edge = lerp(EDGE_START, endEdge, q);
      track.style.setProperty("--edge-px", `${edge * vh}px`);
      return edge * vh;
    };

    const layoutVan = (q: number, edgePx: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const narrow = isNarrow();

      // Compact van — pullback from close to settled (~22–28% width)
      const widthPct = lerp(
        narrow ? 58 : 30,
        narrow ? 48 : 24,
        q,
      );
      const leftPct = lerp(narrow ? 21 : 34, narrow ? 26 : 36, q);

      van.style.width = `${widthPct}vw`;
      van.style.maxWidth = `${Math.min(380, vw * 0.28)}px`;
      van.style.left = `${leftPct}%`;
      // Sit wheels on the rising band edge
      van.style.bottom = `${Math.max(0, vh - edgePx - vh * 0.005)}px`;
      van.style.transform = "translateY(0)";
    };

    const measure = () => {
      stripWidth = strip.scrollWidth;
      lettersWidth = letters.scrollWidth;
      const vw = window.innerWidth;
      B = ((stripWidth + 0.45 * vw) / vw) * 1.1;
      const vh = window.innerHeight;
      track.style.height = `${(1 + A + B) * vh}px`;
      const edgePx = layoutEdge(smoothQ);
      layoutVan(smoothQ, edgePx);
    };

    const updateCardSweeps = () => {
      const vw = window.innerWidth;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const left = card.getBoundingClientRect().left;
        const s = Math.min(
          1.6,
          Math.max(-0.4, (0.98 - left / vw) / 0.3),
        );
        const pct = s * 100;
        card.style.setProperty("--kv-s-white", `${pct - 34}%`);
        card.style.setProperty("--kv-s-orange", `${pct - 6}%`);
        card.style.setProperty("--kv-s-clear", `${pct + 26}%`);
      });
    };

    const tick = () => {
      if (destroyed) return;
      const vh = window.innerHeight;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const scrollY = Math.max(0, window.scrollY - trackTop);
      const now = performance.now();
      const dt = Math.max(0.016, (now - lastT) / 1000);
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      lastT = now;

      const q = Math.min(1, Math.max(0, scrollY / (A * vh)));
      smoothQ += (q - smoothQ) * 0.2;

      const edgePx = layoutEdge(smoothQ);
      layoutVan(smoothQ, edgePx);

      const settled = q >= 0.94 ? 1 : 0;
      track.style.setProperty("--ph", String(settled));

      const rawSpeed = Math.min(99, Math.abs(dy) / dt / 32);
      smoothSpeed += (rawSpeed - smoothSpeed) * 0.18;
      if (settled) {
        const n = Math.round(smoothSpeed).toString().padStart(2, "0");
        if (speedRef.current && speedRef.current.textContent !== `${n} KM/H`) {
          setSpeedLabel(n);
        }
      }

      const r = Math.min(
        1,
        Math.max(0, (scrollY - A * vh) / (B * vh || 1)),
      );
      const vw = window.innerWidth;
      const stripX = vw - r * (stripWidth + 0.45 * vw);
      const lettersX = vw - r * (lettersWidth + vw);
      strip.style.transform = `translate3d(${stripX}px, 0, 0)`;
      letters.style.transform = `translate3d(${lettersX}px, 0, 0)`;

      updateCardSweeps();
      raf = requestAnimationFrame(tick);
    };

    const params = new URLSearchParams(window.location.search);
    if (params.get("rec") === "1") {
      const start = performance.now();
      const driveRec = (now: number) => {
        if (destroyed) return;
        const t = (now - start) / 1000;
        let p = 0;
        if (t < 0.44) p = 0.04;
        else if (t < 10.56) {
          const u = (t - 0.44) / (10.56 - 0.44);
          const e = u * u * (3 - 2 * u);
          p = 0.04 + e * 0.92;
        } else p = 0.96;
        const vh = window.innerHeight;
        const total = (1 + A + B) * vh;
        const trackTop = track.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, trackTop + p * (total - vh));
        if (t < 11) requestAnimationFrame(driveRec);
      };
      requestAnimationFrame(driveRec);
    }

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const onVanLoad = () => measure();
    van.addEventListener("load", onVanLoad);

    measure();
    document.fonts?.ready?.then(() => {
      if (!destroyed) measure();
    });
    raf = requestAnimationFrame(tick);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      van.removeEventListener("load", onVanLoad);
    };
  }, []);

  return (
    <section
      className="kv-track"
      ref={trackRef}
      aria-label="KV freight services scroll story"
    >
      <div className="kv-scene" id="kv">
        <h2 className="kv-letters" ref={lettersRef}>
          OUR SERVICES
        </h2>

        <img
          ref={vanRef}
          className="kv-van"
          src={VAN_SRC}
          alt="A.T.R Heating and Cooling service van"
          draggable={false}
        />

        <p className="kv-speed" ref={speedRef}>
          {speedLabel} KM/H
        </p>

        <div className="kv-band">
          <div className="kv-strip" ref={stripRef}>
            <div className="kv-lead">
              <h3 className="kv-headline">
                EVERYTHING YOUR
                <br />
                HOME NEEDS.
                <br />
                <span className="kv-headline-accent">UNDER ONE ROOF.</span>
              </h3>
              <div className="kv-lead-copy">
                <p>
                  From heating and cooling to installation, maintenance, repairs,
                  and plumbing — dependable HVAC solutions for year-round comfort.
                </p>
                <p>
                  One local team means one call, clear answers, and service you
                  can trust across Cincinnati and surrounding areas.
                </p>
              </div>
            </div>

            <div className="kv-cards">
              {CARDS.map((card, i) => (
                <article
                  key={card.title}
                  className="kv-card"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                >
                  <div className="kv-card-icon">
                    <CardIcon type={card.icon} />
                  </div>
                  <h4 className="kv-card-title">{card.title}</h4>
                  <p className="kv-card-body">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KvFreightHero;
