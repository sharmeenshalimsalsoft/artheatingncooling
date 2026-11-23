import { motion } from "motion/react";
import { CREDENTIALS } from "../../constants/content";
import {
  BuildingIcon,
  ClockIcon,
  FileCheckIcon,
  ShieldCheckIcon,
} from "../icons/Icons";
import { easeOut } from "../motion/Reveal";

const iconMap = {
  badge: ShieldCheckIcon,
  file: FileCheckIcon,
  clock: ClockIcon,
  building: BuildingIcon,
} as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardIn = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const CredentialsBanner = () => {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,rgba(255,105,0,0.14),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(0,0,0,0.12)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <motion.ul
          className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {CREDENTIALS.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.li key={item.label} variants={cardIn}>
                <div className="group flex h-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-orange/30 hover:bg-white/[0.08] hover:shadow-[0_10px_32px_rgba(244,90,10,0.1)] sm:gap-3 sm:px-3.5 sm:py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-orange text-white shadow-[0_2px_8px_rgba(244,90,10,0.45)] ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-[1.04]">
                    <Icon size={13} strokeWidth={2.25} />
                  </span>
                  <p className="whitespace-pre-line text-[13px] font-semibold leading-snug tracking-tight text-white/92 sm:text-sm">
                    {item.label}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default CredentialsBanner;