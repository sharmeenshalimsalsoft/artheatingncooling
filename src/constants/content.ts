import { publicAsset } from "../utils/publicAsset";

export const BUSINESS = {
  name: "A.T.R Heating and Cooling",
  shortName: "A.T.R",
  tagline: "HEATING · COOLING · PLUMBING",
  industry: "HVAC & Plumbing Services",
  structure: "Sole Proprietorship",
  experienceYears: 7,
  location: "Cincinnati, OH & Surrounding Areas",
  hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  phone: "(513) 555-0147",
  phoneHref: "tel:+15135550147",
  email: "info@atrheatingandcooling.com",
  emailHref: "mailto:info@atrheatingandcooling.com",
} as const;

/** Marketing nav — home section anchors (liquid-glass pill + scroll spy) */
export const NAV_LINKS: {
  label: string;
  shortLabel: string;
  path: string;
  sectionId: string;
}[] = [
  { label: "Home", shortLabel: "Home", path: "#home", sectionId: "home" },
  {
    label: "Services",
    shortLabel: "Services",
    path: "#services",
    sectionId: "services",
  },
  { label: "About Us", shortLabel: "About", path: "#about", sectionId: "about" },
  {
    label: "Contact Us",
    shortLabel: "Contact",
    path: "#contact",
    sectionId: "contact",
  },
];

/** Full-page routes for footer / inner-page header */
export const PAGE_LINKS: {
  label: string;
  path: string;
  hasDropdown?: boolean;
}[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services", hasDropdown: true },
  { label: "Why Choose Us", path: "/why-choose-us" },
  { label: "Contact Us", path: "/contact" },
];

export const SERVICE_OPTIONS = [
  "Heating Services",
  "Cooling Services",
  "HVAC Installation",
  "HVAC Maintenance",
  "HVAC Repairs",
  "Plumbing Services",
  "Other",
] as const;

export const SERVICES = [
  {
    id: "heating",
    title: "Heating Services",
    description:
      "Keep your property warm and comfortable with reliable heating services and professional solutions.",
    image: publicAsset("images/service-heating.jpg"),
    icon: "flame",
  },
  {
    id: "cooling",
    title: "Cooling Services",
    description:
      "Stay comfortable during warmer months with dependable air conditioning and cooling solutions.",
    image: publicAsset("images/service-cooling.jpg"),
    icon: "snowflake",
  },
  {
    id: "installation",
    title: "HVAC Installation",
    description:
      "Professional HVAC installation solutions designed to deliver reliable performance and indoor comfort.",
    image: publicAsset("images/service-installation.jpg"),
    icon: "wrench",
  },
  {
    id: "maintenance",
    title: "HVAC Maintenance",
    description:
      "Help maintain system efficiency and prevent unexpected issues with routine HVAC maintenance.",
    image: publicAsset("images/service-maintenance.jpg"),
    icon: "settings",
  },
  {
    id: "repairs",
    title: "HVAC Repairs",
    description:
      "Get your heating and cooling systems back on track with dependable troubleshooting and repair services.",
    image: publicAsset("images/service-repairs.jpg"),
    icon: "tool",
  },
  {
    id: "plumbing",
    title: "Plumbing Services",
    description:
      "Reliable plumbing solutions for everyday issues, repairs, and plumbing installations.",
    image: publicAsset("images/service-plumbing.jpg"),
    icon: "droplets",
  },
] as const;

export const CREDENTIALS = [
  { label: "EPA Licensed", icon: "badge" },
  { label: "Cincinnati Contractor\nRegistration / License", icon: "file" },
  { label: "7 Years of\nIndustry Experience", icon: "clock" },
  { label: "Residential &\nCommercial Services", icon: "building" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Licensed & Registered",
    description:
      "EPA licensed with Cincinnati Contractor Registration/License for commercial and business projects.",
    icon: "shield",
  },
  {
    title: "7 Years of Experience",
    description:
      "Seven years of hands-on experience in the HVAC and plumbing industry.",
    icon: "users",
  },
  {
    title: "Reliable & Responsive",
    description:
      "Dependable service focused on professional solutions and customer satisfaction.",
    icon: "zap",
  },
  {
    title: "Residential & Commercial",
    description:
      "HVAC and plumbing solutions for homeowners, offices, and commercial properties.",
    icon: "building",
  },
] as const;

export const ABOUT_TEXT = `A.T.R Heating and Cooling is a locally operated sole proprietorship with 7 years of experience in the HVAC and plumbing industry. We provide heating, cooling, HVAC installation, maintenance, repair, and plumbing services to residential and commercial customers throughout Cincinnati and surrounding areas.

Our focus is on dependable service, professional workmanship, and helping customers maintain comfortable and functional properties.`;
