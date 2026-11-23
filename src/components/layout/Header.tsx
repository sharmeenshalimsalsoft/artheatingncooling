import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { BUSINESS, PAGE_LINKS, SERVICES } from "../../constants/content";
import Logo from "../Logo";
import Button from "../ui/Button";
import {
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "../icons/Icons";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-[15px] font-medium transition-colors duration-200 hover:text-orange ${
      isActive ? "text-orange" : "text-navy"
    }`;

  return (
    <header className="relative z-50">
      <div className="bg-deep-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-2 text-white/90">
              <MapPinIcon size={15} className="shrink-0 text-white" />
              <span className="truncate text-xs sm:text-sm">
                {BUSINESS.location}
              </span>
            </span>
            <span className="hidden items-center gap-2 text-white/90 md:inline-flex">
              <ClockIcon size={15} className="shrink-0 text-white" />
              <span>{BUSINESS.hours}</span>
            </span>
          </div>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-bright-orange sm:px-4 sm:text-sm"
          >
            <PhoneIcon size={14} />
            {BUSINESS.phone}
          </a>
        </div>
      </div>

      <div
        className={`border-b border-black/5 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main">
            {PAGE_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `${linkClass({ isActive })} inline-flex items-center gap-1`
                    }
                  >
                    {link.label}
                    <ChevronDownIcon
                      size={14}
                      className={`transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </NavLink>
                  <div
                    className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-black/5 bg-white py-2 shadow-xl">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services#${service.id}`}
                          className="block px-4 py-2.5 text-sm text-navy transition-colors hover:bg-light-grey hover:text-orange"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={link.path} to={link.path} className={linkClass}>
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              to="/contact#quote"
              showArrow
              size="sm"
              className="hidden lg:inline-flex"
            >
              Request a Quote
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-light-grey lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-[104px] z-40 bg-white transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col gap-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
          {PAGE_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.path} className="border-b border-black/5 pb-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-navy"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  {link.label}
                  <ChevronDownIcon
                    size={18}
                    className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {servicesOpen && (
                  <div className="mb-2 space-y-1 pl-3">
                    <Link
                      to="/services"
                      className="block py-2 text-sm font-medium text-orange"
                      onClick={() => setMobileOpen(false)}
                    >
                      All Services
                    </Link>
                    {SERVICES.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services#${service.id}`}
                        className="block py-2 text-sm text-navy/80"
                        onClick={() => setMobileOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `border-b border-black/5 py-3 text-base font-medium ${
                    isActive ? "text-orange" : "text-navy"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ),
          )}
          <div className="mt-6">
            <Button to="/contact#quote" showArrow className="w-full" size="lg">
              Request a Quote
            </Button>
          </div>
          <div className="mt-6 space-y-3 rounded-xl bg-light-grey p-4 text-sm text-navy/80">
            <p className="inline-flex items-center gap-2">
              <ClockIcon size={15} className="text-orange" />
              {BUSINESS.hours}
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-orange"
            >
              <PhoneIcon size={15} />
              {BUSINESS.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
