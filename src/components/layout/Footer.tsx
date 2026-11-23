import { Link } from "react-router";
import { motion } from "motion/react";
import { BUSINESS, PAGE_LINKS, SERVICES } from "../../constants/content";
import Logo from "../Logo";
import { MailIcon, MapPinIcon, PhoneIcon } from "../icons/Icons";
import { easeOut } from "../motion/Reveal";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep-navy text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent"
        aria-hidden
      />
      <motion.div
        className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Local HVAC and plumbing solutions for homes and businesses in
            Cincinnati and surrounding areas. {BUSINESS.experienceYears} years
            of hands-on industry experience.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {PAGE_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-white/75 transition-colors hover:text-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange">
            Services
          </h3>
          <ul className="space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  to={`/services#${service.id}`}
                  className="text-sm text-white/75 transition-colors hover:text-orange"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-orange"
              >
                <PhoneIcon size={15} className="text-orange" />
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a
                href={BUSINESS.emailHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-orange"
              >
                <MailIcon size={15} className="text-orange" />
                {BUSINESS.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPinIcon size={15} className="mt-0.5 shrink-0 text-orange" />
              {BUSINESS.location}
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Sole Proprietorship · Cincinnati, OH</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
