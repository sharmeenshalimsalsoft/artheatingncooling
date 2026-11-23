import { Link } from "react-router";
import {
  ArrowRightIcon,
  DropletsIcon,
  FlameIcon,
  SettingsIcon,
  SnowflakeIcon,
  ToolIcon,
  WrenchIcon,
} from "../icons/Icons";

const iconMap = {
  flame: FlameIcon,
  snowflake: SnowflakeIcon,
  wrench: WrenchIcon,
  settings: SettingsIcon,
  tool: ToolIcon,
  droplets: DropletsIcon,
} as const;

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: keyof typeof iconMap;
};

const ServiceCard = ({
  id,
  title,
  description,
  image,
  icon,
}: ServiceCardProps) => {
  const Icon = iconMap[icon];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-[0_8px_30px_rgba(13,41,70,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(13,41,70,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-orange text-white shadow-lg">
          <Icon size={18} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold text-navy">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
          {description}
        </p>
        <div className="mt-4 flex justify-end">
          <Link
            to={`/services#${id}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white transition-transform duration-300 hover:scale-110"
            aria-label={`Learn more about ${title}`}
          >
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
