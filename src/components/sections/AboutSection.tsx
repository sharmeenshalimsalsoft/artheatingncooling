import { motion } from "motion/react";
import { ABOUT_TEXT, WHY_CHOOSE } from "../../constants/content";
import Button from "../ui/Button";
import {
  BuildingIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "../icons/Icons";
import { easeOut, springSoft } from "../motion/Reveal";

const whyIcons = {
  shield: ShieldCheckIcon,
  users: UsersIcon,
  zap: ZapIcon,
  building: BuildingIcon,
} as const;

type AboutSectionProps = {
  showWhyPanel?: boolean;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const AboutSection = ({ showWhyPanel = true }: AboutSectionProps) => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7f8fa] to-white py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-orange/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-8%] h-[360px] w-[360px] rounded-full bg-navy/[0.05] blur-3xl"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div
          className={`grid items-stretch gap-8 lg:gap-10 ${
            showWhyPanel ? "lg:grid-cols-2" : "lg:grid-cols-2"
          }`}
        >
          <motion.div className="flex flex-col" variants={fadeUp}>
            <motion.div
              className="group relative mb-6 overflow-hidden rounded-3xl border border-navy/10 shadow-[0_24px_60px_rgba(13,41,70,0.16)] ring-1 ring-navy/5"
              whileHover={{ scale: 1.01 }}
              transition={springSoft}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy">
                <motion.img
                  src="/images/about-hvac.jpg"
                  alt="HVAC technician servicing an outdoor air conditioning unit"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, ease: easeOut }}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(244,90,10,0.22),transparent_52%)]"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy/55 via-navy/15 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/15 to-transparent" />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-6 left-0 h-14 w-1 rounded-r-full bg-orange shadow-[0_0_22px_rgba(244,90,10,0.55)]"
                aria-hidden
              />
              <motion.div
                className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 sm:right-auto"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5, ease: easeOut }}
              >
                <span className="inline-flex max-w-[min(100%,18rem)] items-center gap-2 rounded-2xl border border-white/20 bg-navy/35 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md sm:text-xs">
                  <span className="flex h-2 w-2 shrink-0 animate-pulse rounded-full bg-orange shadow-[0_0_8px_rgba(244,90,10,0.9)]" />
                  Heating · Cooling · Plumbing
                </span>
                <span className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-medium tracking-wider text-white/90 uppercase backdrop-blur-sm sm:inline">
                  Licensed local pros
                </span>
              </motion.div>
            </motion.div>

            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-orange uppercase">
              About A.T.R
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-[2.1rem]">
              A Trusted Local HVAC & Plumbing Contractor
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-navy/70">
              {ABOUT_TEXT.split("\n\n").map((para, i) => (
                <motion.p
                  key={para.slice(0, 24)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.55, ease: easeOut }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
            <motion.div
              className="mt-6"
              whileHover={{ x: 2 }}
              transition={springSoft}
            >
              <Button to="/about" variant="outline" showArrow>
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {showWhyPanel && (
            <motion.div
              id="why-choose-us"
              className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-navy/8 bg-white/70 p-5 shadow-[0_24px_60px_rgba(13,41,70,0.08)] backdrop-blur-xl sm:p-7 lg:p-8"
              initial={{ opacity: 0, x: 80, rotate: 1.5, filter: "blur(10px)" }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotate: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 0.9,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,90,10,0.08),transparent_55%)]"
                aria-hidden
              />
              <div className="relative">
                <motion.h3
                  className="text-2xl font-bold text-navy sm:text-3xl"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.5, ease: easeOut }}
                >
                  Why Choose A.T.R Heating and Cooling?
                </motion.h3>
                <motion.p
                  className="mt-2 text-navy/65"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.22, duration: 0.5, ease: easeOut }}
                >
                  Professional service, dependable solutions, and experience you
                  can trust.
                </motion.p>

                <motion.div
                  className="mt-7 grid gap-3 sm:gap-3.5"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.14,
                        delayChildren: 0.28,
                      },
                    },
                  }}
                >
                  {WHY_CHOOSE.map((item, i) => {
                    const Icon = whyIcons[item.icon];
                    const fromRight = i % 2 === 0;
                    return (
                      <motion.div
                        key={item.title}
                        className="group flex gap-4 rounded-2xl border border-navy/6 bg-white/80 p-3.5 shadow-sm will-change-transform hover:border-orange/25 hover:shadow-[0_12px_28px_rgba(244,90,10,0.1)] sm:p-4"
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: fromRight ? 120 : -70,
                            y: 48,
                            rotate: fromRight ? 8 : -6,
                            scale: 0.88,
                          },
                          show: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 160,
                              damping: 16,
                              mass: 0.85,
                            },
                          },
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.02,
                          transition: springSoft,
                        }}
                      >
                        <motion.span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange text-white shadow-[0_8px_18px_rgba(244,90,10,0.35)]"
                          variants={{
                            hidden: { scale: 0, rotate: -40 },
                            show: {
                              scale: 1,
                              rotate: 0,
                              transition: {
                                type: "spring",
                                stiffness: 260,
                                damping: 14,
                                delay: 0.08,
                              },
                            },
                          }}
                          whileHover={{ rotate: -8, scale: 1.08 }}
                          transition={springSoft}
                        >
                          <Icon size={18} />
                        </motion.span>
                        <div>
                          <h4 className="font-semibold text-navy transition-colors duration-300 group-hover:text-orange">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-navy/65">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
