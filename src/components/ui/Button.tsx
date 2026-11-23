import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "../icons/Icons";

type Variant = "primary" | "outline" | "outline-white" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  showArrow?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  to: string;
  href?: undefined;
  type?: undefined;
  onClick?: () => void;
};

type ButtonAsAnchor = CommonProps & {
  href: string;
  to?: undefined;
  type?: undefined;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-white hover:bg-bright-orange shadow-md shadow-orange/25 border border-transparent",
  outline:
    "bg-transparent text-orange border-2 border-orange hover:bg-orange hover:text-white",
  "outline-white":
    "bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-navy",
  ghost: "bg-transparent text-navy hover:text-orange border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm sm:text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  showArrow = false,
  className = "",
  ...props
}: ButtonProps) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <ArrowRightIcon size={16} className="shrink-0" />}
    </>
  );

  if ("to" in props && props.to) {
    const { to, onClick } = props;
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <a href={href} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} {...buttonProps} className={classes}>
      {content}
    </button>
  );
};

export default Button;
