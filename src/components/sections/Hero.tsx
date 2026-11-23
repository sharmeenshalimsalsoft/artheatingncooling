import { motion } from "motion/react";
import Button from "../ui/Button";
import { easeOut, springSoft } from "../motion/Reveal";

const BG_URL = "/images/hero-bg.jpg";
const PORTRAIT_URL = "/images/atr-technician-cutout.png";

const MARQUEE_TEXT = "A.T.R \u2014 Heating\u00A0";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-[100dvh] w-full overflow-hidden bg-black font-hn text-cream"
    >
      <motion.img
        src={BG_URL}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.35, ease: easeOut }}
      />

      <div className="absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]">
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
          <span className="pr-[6vw]">{MARQUEE_TEXT}</span>
          <span className="pr-[6vw]">{MARQUEE_TEXT}</span>
        </div>
      </div>

      <motion.img
        src={PORTRAIT_URL}
        alt="A.T.R Heating and Cooling technician"
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[90%] w-auto max-w-[min(92vw,720px)] -translate-x-1/2 object-contain object-bottom"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springSoft, delay: 0.15 }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[21] bg-gradient-to-r from-black/70 via-black/20 to-black/35"
        aria-hidden
      />

      <motion.div
        className="absolute inset-x-0 bottom-[3.25rem] z-30 px-6 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:bottom-14 sm:px-10 lg:max-w-xl"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.45 }}
      >
        <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-cream/90 uppercase">
          HEATING · COOLING · PLUMBING
        </p>
        <h1 className="font-hn text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          Your Comfort.
          <br />
          <span className="text-orange">Our Commitment.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/85 sm:text-base">
          Reliable HVAC and plumbing solutions for homes and businesses in
          Cincinnati.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button to="/#contact" showArrow size="lg">
            Request a Quote
          </Button>
          <Button to="/#services" variant="outline-white" size="lg">
            Our Services
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
