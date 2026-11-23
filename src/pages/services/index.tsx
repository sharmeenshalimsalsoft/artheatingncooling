import { useEffect } from "react";
import { useLocation } from "react-router";
import { SERVICES } from "../../constants/content";
import PageHero from "../../components/sections/PageHero";
import CredentialsBanner from "../../components/sections/CredentialsBanner";
import ContactSection from "../../components/sections/ContactSection";
import Button from "../../components/ui/Button";
import {
  DropletsIcon,
  FlameIcon,
  SettingsIcon,
  SnowflakeIcon,
  ToolIcon,
  WrenchIcon,
} from "../../components/icons/Icons";

const iconMap = {
  flame: FlameIcon,
  snowflake: SnowflakeIcon,
  wrench: WrenchIcon,
  settings: SettingsIcon,
  tool: ToolIcon,
  droplets: DropletsIcon,
} as const;

const Services = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete HVAC & Plumbing Services"
        description="From installation to repairs and ongoing maintenance, A.T.R Heating and Cooling provides dependable solutions year-round."
      />

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            const reverse = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-36 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div
                  className={`overflow-hidden rounded-2xl ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className={reverse ? "lg:order-1" : ""}>
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white">
                    <Icon size={20} />
                  </span>
                  <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-navy/70">
                    {service.description}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-navy/70">
                    Serving residential and commercial customers throughout
                    Cincinnati and surrounding areas with professional,
                    dependable workmanship.
                  </p>
                  <div className="mt-6">
                    <Button to="/contact#quote" showArrow>
                      Request a Quote
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CredentialsBanner />
      <ContactSection />
    </>
  );
};

export default Services;
