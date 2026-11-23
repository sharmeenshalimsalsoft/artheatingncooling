import { ABOUT_TEXT, BUSINESS } from "../../constants/content";
import PageHero from "../../components/sections/PageHero";
import CredentialsBanner from "../../components/sections/CredentialsBanner";
import ContactSection from "../../components/sections/ContactSection";
import Button from "../../components/ui/Button";

const About = () => {
  return (
    <>
      <PageHero
        eyebrow="About A.T.R"
        title="A Trusted Local HVAC & Plumbing Contractor"
        description="Locally operated sole proprietorship serving Cincinnati homeowners and businesses."
        image="/images/about.jpg"
      />

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/about.jpg"
              alt="Residential HVAC unit beside a home"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-orange uppercase">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Built on Dependable Local Service
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-navy/70">
              {ABOUT_TEXT.split("\n\n").map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                `${BUSINESS.experienceYears} years of industry experience`,
                "EPA Licensed",
                "Cincinnati Contractor Registration/License",
                "Residential & commercial service",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm font-medium text-navy"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to="/contact#quote" showArrow>
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-grey py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-navy">How We Work</h2>
            <p className="mt-3 text-navy/65">
              Straightforward service from a local contractor focused on your
              comfort and property.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell Us What You Need",
                text: "Reach out by phone or quote form and describe your heating, cooling, or plumbing concern.",
              },
              {
                step: "02",
                title: "Professional Assessment",
                text: "We evaluate the issue and recommend practical solutions suited to your home or business.",
              },
              {
                step: "03",
                title: "Dependable Service",
                text: "Work is completed with professional workmanship focused on lasting comfort and performance.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="text-sm font-bold text-orange">{item.step}</span>
                <h3 className="mt-2 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CredentialsBanner />
      <ContactSection />
    </>
  );
};

export default About;
