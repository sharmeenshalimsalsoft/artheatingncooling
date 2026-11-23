import { motion } from "motion/react";
import { easeOut } from "../motion/Reveal";
import { publicAsset } from "../../utils/publicAsset";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
};

const PageHero = ({
  eyebrow,
  title,
  description,
  image = publicAsset("images/hero.jpg"),
}: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-deep-navy py-12 sm:py-14">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/90 to-deep-navy/60" />
      <motion.div
        className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-orange uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
