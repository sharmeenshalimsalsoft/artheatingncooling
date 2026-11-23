import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useNavigate } from "react-router";
import { BUSINESS, NAV_LINKS } from "../../constants/content";
import Logo from "../Logo";
import Button from "../ui/Button";
import "./Navbar.css";

type Bubble = { x: number; y: number; w: number; h: number; ready: boolean };

type PillProps = {
  activeId: string;
  hotId: string;
  onHotChange: (id: string) => void;
  onSelect: (sectionId: string) => void;
  compact?: boolean;
};

function AnimatedPill({
  activeId,
  hotId,
  onHotChange,
  onSelect,
  compact = false,
}: PillProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [bubble, setBubble] = useState<Bubble>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    ready: false,
  });

  const measure = useCallback((id: string) => {
    const rail = railRef.current;
    const el = itemRefs.current.get(id);
    if (!rail || !el) return;
    const railBox = rail.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setBubble({
      x: box.left - railBox.left,
      y: box.top - railBox.top,
      w: box.width,
      h: box.height,
      ready: true,
    });
  }, []);

  useLayoutEffect(() => {
    measure(hotId);
  }, [hotId, compact, measure]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onResize = () => measure(hotId);
    const ro = new ResizeObserver(onResize);
    ro.observe(rail);
    itemRefs.current.forEach((el) => ro.observe(el));
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [hotId, measure]);

  const bubbleStyle: CSSProperties = {
    width: bubble.w,
    height: bubble.h,
    transform: `translate3d(${bubble.x}px, ${bubble.y}px, 0)`,
    opacity: bubble.ready ? 1 : 0,
  };

  return (
    <div
      ref={railRef}
      className={`k4l-pill${compact ? " k4l-pill--compact" : ""}`}
      onMouseLeave={() => onHotChange(activeId)}
      role="navigation"
      aria-label="Section links"
    >
      <span className="k4l-pill-bubble" style={bubbleStyle} aria-hidden />
      {NAV_LINKS.map((link) => {
        const isHot = hotId === link.sectionId;
        return (
          <button
            key={link.sectionId}
            type="button"
            ref={(node) => {
              if (node) itemRefs.current.set(link.sectionId, node);
              else itemRefs.current.delete(link.sectionId);
            }}
            className={`k4l-pill-item${isHot ? " is-hot" : ""}`}
            aria-current={activeId === link.sectionId ? "true" : undefined}
            onMouseEnter={() => onHotChange(link.sectionId)}
            onFocus={() => onHotChange(link.sectionId)}
            onClick={() => onSelect(link.sectionId)}
          >
            <span className="k4l-pill-label-full">{link.label}</span>
            <span className="k4l-pill-label-short">{link.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(NAV_LINKS[0].sectionId);
  const [hotId, setHotId] = useState(NAV_LINKS[0].sectionId);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.sectionId),
    ).filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top?.target?.id) return;
        setActiveId(top.target.id);
        setHotId(top.target.id);
      },
      { root: null, rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(sectionId);
        setHotId(sectionId);
        navigate({ hash: `#${sectionId}` }, { replace: true });
      }
    },
    [navigate],
  );

  return (
    <header
      className={`k4l-nav-shell k4l-nav-shell--bottom${scrolled ? " is-scrolled" : ""}`}
    >
      <div className="k4l-nav-inner">
        <div className="k4l-nav-brand">
          <Logo variant={scrolled ? "default" : "light"} />
          <span className="sr-only">{BUSINESS.name}</span>
        </div>

        <div className="k4l-nav-center">
          <AnimatedPill
            activeId={activeId}
            hotId={hotId}
            onHotChange={setHotId}
            onSelect={scrollToSection}
          />
        </div>

        <div className="k4l-nav-actions">
          <Button href={BUSINESS.phoneHref} variant="ghost" size="sm">
            Call Us
          </Button>
          <Button
            to="/#contact"
            showArrow
            size="sm"
            onClick={() => scrollToSection("contact")}
          >
            Request a Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
