import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SERVICES } from "../../constants/content";
import ServiceDeck from "./ServiceDeck";
import ServicesWheel from "./ServicesWheel";
import { easeOut } from "../motion/Reveal";

type ServicesSectionProps = {
  showIntro?: boolean;
  limit?: number;
};

type Phase = "stack" | "spreading" | "spread";

const ServicesSection = ({
  showIntro = true,
  limit,
}: ServicesSectionProps) => {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState<Phase>("stack");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState(() => new Set<number>([0]));
  const spreadQueued = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "stack") return;
    if (visited.size < items.length) return;
    if (spreadQueued.current) return;
    spreadQueued.current = true;

    const t = window.setTimeout(() => setPhase("spreading"), 700);
    return () => window.clearTimeout(t);
  }, [visited, phase, items.length]);

  useEffect(() => {
    if (phase !== "spreading") return;
    const t = window.setTimeout(() => setPhase("spread"), 1400);
    return () => window.clearTimeout(t);
  }, [phase]);

  const handleActiveChange = useCallback(
    (index: number) => {
      setActiveIndex(index);

      if (phase !== "stack") return;

      setVisited((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    },
    [phase],
  );

  const isSpread = phase === "spreading" || phase === "spread";
  const autoPlay = inView && (phase === "stack" || phase === "spread");

  return (
    <section
      ref={sectionRef}
      id="services"
      className="overflow-hidden bg-white py-8 sm:py-10 lg:py-12"
    >
      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, clipPath: "inset(12% 8% 12% 8%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        {showIntro && (
          <div className="mx-auto mb-4 max-w-xl text-center sm:mb-5">
            <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-orange uppercase sm:text-xs">
              Our Services
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Complete HVAC & Plumbing Services
            </h2>
          </div>
        )}
      </motion.div>

      <div
        className={`relative transition-[min-height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSpread ? "min-h-[400px] lg:min-h-[440px]" : ""
        }`}
      >
        <ServicesWheel
          activeIndex={activeIndex}
          onActiveChange={handleActiveChange}
          autoPlay={autoPlay}
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            className={`pointer-events-auto transition-[width,max-width,margin] duration-500 ease-out ${
              isSpread
                ? "ml-[min(10vw,88px)] w-full max-w-4xl py-4 sm:ml-[min(12vw,108px)] lg:ml-[min(14vw,132px)]"
                : "w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
            }`}
          >
            <ServiceDeck
                items={items}
                activeIndex={activeIndex}
                onActiveChange={handleActiveChange}
                spread={isSpread}
                interactive={!isSpread}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
