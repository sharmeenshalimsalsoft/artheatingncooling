import { BUSINESS } from "../../constants/content";
import PageHero from "../../components/sections/PageHero";
import ContactSection from "../../components/sections/ContactSection";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "../../components/icons/Icons";
import { publicAsset } from "../../utils/publicAsset";

const Contact = () => {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch"
        description="Request a free quote for HVAC or plumbing service in Cincinnati and surrounding areas."
        image={publicAsset("images/contact-bg.jpg")}
      />

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: PhoneIcon,
              label: "Phone",
              value: BUSINESS.phone,
              href: BUSINESS.phoneHref,
            },
            {
              icon: MailIcon,
              label: "Email",
              value: BUSINESS.email,
              href: BUSINESS.emailHref,
            },
            {
              icon: MapPinIcon,
              label: "Service Area",
              value: BUSINESS.location,
            },
            {
              icon: ClockIcon,
              label: "Hours",
              value: BUSINESS.hours,
            },
          ].map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <Icon size={18} />
                </span>
                <p className="text-xs font-semibold tracking-wider text-navy/50 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">{item.value}</p>
              </>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="rounded-2xl border border-black/5 bg-light-grey p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {content}
              </a>
            ) : (
              <div
                key={item.label}
                className="rounded-2xl border border-black/5 bg-light-grey p-5"
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default Contact;
