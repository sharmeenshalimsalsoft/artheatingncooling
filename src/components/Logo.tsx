import { Link } from "react-router";
import { BUSINESS } from "../constants/content";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
};

const Logo = ({ className = "", variant = "default" }: LogoProps) => {
  const textColor = variant === "light" ? "text-white" : "text-navy";

  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 group ${className}`}
      aria-label={BUSINESS.name}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 40 40"
          className="h-7 w-7 text-white"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 22 L20 10 L32 22 V32 H8 V22Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path
            d="M16 22.5c0-2.2 1.5-3.5 2.2-5 .8 1.6 1.8 2.5 1.8 4.2a2 2 0 1 1-4 0z"
            fill="currentColor"
          />
          <path
            d="M24 18.5v7M21 20l3-2.5 3 2.5M21 24l3 2.5 3-2.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={`leading-tight ${textColor}`}>
        <span className="block text-[15px] font-bold tracking-wide sm:text-base">
          A.T.R
        </span>
        <span className="block text-[10px] font-medium tracking-[0.04em] uppercase opacity-80 sm:text-[11px]">
          Heating and Cooling
        </span>
      </span>
    </Link>
  );
};

export default Logo;
