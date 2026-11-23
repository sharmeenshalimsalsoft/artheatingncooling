import { WHY_CHOOSE } from "../../constants/content";
import PageHero from "../../components/sections/PageHero";
import CredentialsBanner from "../../components/sections/CredentialsBanner";
import ContactSection from "../../components/sections/ContactSection";
import Button from "../../components/ui/Button";
import { publicAsset } from "../../utils/publicAsset";
import {
  BuildingIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "../../components/icons/Icons";

const whyIcons = {
  shield: ShieldCheckIcon,
  users: UsersIcon,
  zap: ZapIcon,
  building: BuildingIcon,
} as const;

const WhyChooseUs = () => {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="Why Choose A.T.R Heating and Cooling?"
        description="Professional service, dependable solutions, and experience you can trust."
      />

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-light-grey p-6 sm:p-10 lg:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              {WHY_CHOOSE.map((item) => {
                const Icon = whyIcons[item.icon];
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                      <Icon size={22} />
                    </span>
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/65">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-navy">
                Local Experience. Personal Service.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                A.T.R Heating and Cooling is a sole proprietorship with 7 years
                of hands-on HVAC and plumbing experience. We serve residential
                homeowners, offices, and commercial properties across Cincinnati
                and surrounding areas with one professional service van and a
                focus on dependable results.
              </p>
              <p className="mt-3 text-base leading-relaxed text-navy/70">
                We are EPA licensed and hold Cincinnati Contractor
                Registration/License for commercial and business projects.
              </p>
              <div className="mt-8">
                <Button to="/contact#quote" showArrow>
                  Request a Quote
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={publicAsset("images/why-choose.jpg")}
                alt="HVAC technician providing professional service"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <CredentialsBanner />
      <ContactSection />
    </>
  );
};

export default WhyChooseUs;
