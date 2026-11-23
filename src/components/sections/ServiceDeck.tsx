import { useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  DropletsIcon,
  FlameIcon,
  SettingsIcon,
  SnowflakeIcon,
  ToolIcon,
  WrenchIcon,
} from "../icons/Icons";

const iconMap = {
  flame: FlameIcon,
  snowflake: SnowflakeIcon,
  wrench: WrenchIcon,
  settings: SettingsIcon,
  tool: ToolIcon,
  droplets: DropletsIcon,
} as const;

export type DeckService = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: keyof typeof iconMap;
};

type ServiceDeckProps = {
  items: readonly DeckService[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
  spread?: boolean;
  interactive?: boolean;
};

const softSpring = {
  type: "spring" as const,
  stiffness: 160,
  damping: 24,
  mass: 1,
};

const stackOffset = (depth: number) => ({
  y: depth * 10,
  scale: 1 - depth * 0.04,
  rotate: depth * -1.1,
  opacity: depth > 3 ? 0.55 : 1,
});

const orderFromActive = (total: number, front: number) => {
  const safe = ((front % total) + total) % total;
  return Array.from({ length: total }, (_, i) => (safe + i) % total);
};

const ServiceDeck = ({
  items,
  activeIndex,
  onActiveChange,
  spread = false,
  interactive = true,
}: ServiceDeckProps) => {
  const total = items.length;

  const order = useMemo(
    () => orderFromActive(total, activeIndex),
    [total, activeIndex],
  );

  const stack = useMemo(
    () => order.map((index) => items[index]),
    [order, items],
  );

  const advance = () => {
    if (!interactive || spread) return;
    onActiveChange((activeIndex + 1) % total);
  };

  if (spread) {
    return (
      <div className="mx-auto grid w-full grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-3">
        {items.map((service, i) => {
          const Icon = iconMap[service.icon];
          const isActive = i === activeIndex;
          return (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isActive ? 1.015 : 1,
              }}
              transition={{
                ...softSpring,
                delay: i * 0.04,
              }}
              className={`group flex flex-col overflow-hidden rounded-lg border bg-white transition-[box-shadow,border-color,ring] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? "border-orange/55 ring-2 ring-orange/35 shadow-[0_8px_22px_rgba(244,90,10,0.18)]"
                  : "border-navy/12 shadow-[0_6px_18px_rgba(13,41,70,0.1)]"
              }`}
            >
              <div className="relative aspect-[2.4/1] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange text-white shadow-md">
                  <Icon size={10} />
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2 py-1.5 sm:px-2.5 sm:py-1.5">
                <h3 className="text-[11px] font-bold leading-snug text-navy sm:text-xs">
                  {service.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 flex-1 text-[9px] leading-relaxed text-navy/65 sm:text-[10px]">
                  {service.description}
                </p>
                <div className="mt-1 flex justify-end">
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange text-white transition-transform duration-300 hover:scale-110"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <ArrowRightIcon size={10} />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[260px] flex-col items-center sm:max-w-[300px] lg:max-w-[320px]">
      <div className="relative h-[320px] w-full max-w-[240px] sm:h-[360px] sm:max-w-[280px] lg:h-[380px] lg:max-w-[300px]">
        {stack.map((service, depth) => {
          const Icon = iconMap[service.icon];
          const isFront = depth === 0;
          const offset = stackOffset(depth);

          return (
            <motion.article
              key={service.id}
              role={isFront && interactive ? "button" : undefined}
              tabIndex={isFront && interactive ? 0 : -1}
              aria-label={
                isFront
                  ? `${service.title}. Tap to show the next service.`
                  : service.title
              }
              onClick={isFront && interactive ? advance : undefined}
              onKeyDown={
                isFront && interactive
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        advance();
                      }
                    }
                  : undefined
              }
              initial={false}
              animate={{
                y: offset.y,
                scale: offset.scale,
                rotate: offset.rotate,
                opacity: offset.opacity,
                zIndex: total - depth,
              }}
              transition={softSpring}
              className={`absolute inset-x-0 top-0 flex flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_12px_28px_rgba(13,41,70,0.12)] will-change-transform ${
                isFront && interactive
                  ? "cursor-pointer"
                  : "pointer-events-none"
              }`}
              style={{ originX: 0.5, originY: 0.85 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <span className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange text-white shadow-md sm:h-9 sm:w-9">
                  <Icon size={14} />
                </span>
                {isFront && (
                  <span className="absolute top-2 right-2 rounded-full bg-black/45 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-cream uppercase backdrop-blur-sm">
                    Tap
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <h3 className="text-base font-bold leading-snug text-navy sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-navy/65 sm:text-sm">
                  {service.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceDeck;
