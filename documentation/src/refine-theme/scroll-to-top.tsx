import React from "react";
import clsx from "clsx";

const RING_RADIUS = 19;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const SCROLL_THRESHOLD = 300;

export const ScrollToTop = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [ripples, setRipples] = React.useState<
    { id: number; x: number; y: number }[]
  >([]);
  const rippleIdRef = React.useRef(0);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        setScrollProgress(Math.min(progress, 1));
        setIsVisible(scrollTop > SCROLL_THRESHOLD);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++rippleIdRef.current;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const strokeDashoffset =
    RING_CIRCUMFERENCE - scrollProgress * RING_CIRCUMFERENCE;

  return (
    <button
      ref={buttonRef}
      id="scroll-to-top-button"
      aria-label="Scroll to top"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "fixed right-5 bottom-6 z-50",
        "md:right-8 md:bottom-8",
        "w-12 h-12",
        "rounded-full",
        "backdrop-blur-md",
        "bg-white/10 dark:bg-white/[0.07]",
        "border border-gray-200/40 dark:border-white/10",
        "shadow-lg",
        "dark:shadow-[0_0_20px_rgba(71,235,235,0.08)]",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-refine-blue",
        "cursor-pointer",
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none",
        "hover:scale-110",
        "active:scale-95",
        "motion-reduce:transition-none",
        "overflow-hidden",
        "relative",
        "group",
      )}
      style={{
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        className={clsx(
          "absolute inset-0 rounded-full",
          "transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
          "bg-gradient-to-br from-refine-blue/20 via-transparent to-refine-cyan-alt/20",
          "dark:from-refine-cyan-alt/15 dark:via-transparent dark:to-refine-green-alt/15",
        )}
      />

      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="22"
          cy="22"
          r={RING_RADIUS}
          stroke="currentColor"
          className="text-gray-300/30 dark:text-white/[0.08]"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="22"
          cy="22"
          r={RING_RADIUS}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className="text-refine-blue dark:text-refine-cyan-alt transition-[stroke-dashoffset] duration-150 ease-out"
          style={{
            strokeDasharray: RING_CIRCUMFERENCE,
            strokeDashoffset,
            stroke: "currentColor",
          }}
        />
      </svg>

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            "transition-transform duration-300 ease-out",
            isHovered ? "-translate-y-0.5" : "translate-y-0",
            "text-gray-700 dark:text-white/90",
          )}
        >
          <path
            d="M4.5 10.5L9 6L13.5 10.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 7L9 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={clsx(
              "transition-all duration-300 ease-out origin-top",
              isHovered
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0",
            )}
          />
        </svg>
      </div>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-refine-blue/30 dark:bg-refine-cyan-alt/25 animate-[scroll-top-ripple_0.6s_ease-out_forwards] pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 4,
            height: 4,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <span
        className={clsx(
          "absolute right-full mr-3 top-1/2 -translate-y-1/2",
          "px-2.5 py-1 rounded-lg",
          "text-xs font-medium whitespace-nowrap",
          "bg-gray-900/90 text-white dark:bg-white/90 dark:text-gray-900",
          "shadow-md",
          "pointer-events-none",
          "hidden md:block",
          "transition-all duration-200",
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2",
          "after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full",
          "after:border-4 after:border-transparent",
          "after:border-l-gray-900/90 dark:after:border-l-white/90",
        )}
      >
        Back to top
      </span>
    </button>
  );
};
