import React from "react";
import clsx from "clsx";

// =============================================================================
// Types
// =============================================================================

// =============================================================================
// Types
// =============================================================================

/**
 * Represents a single Table of Contents (TOC) entry.
 * - id: The anchor id of the heading in the document
 * - value: The HTML string for the heading text
 * - level: The heading level (e.g. 2 for h2, 3 for h3)
 */
interface TocItem {
  id: string;
  value: string;
  level: number;
}

/**
 * SVG path and dimensions for the TOC line indicator.
 */
interface SvgData {
  path: string;
  width: number;
  height: number;
}

/**
 * Position and height of the active highlight (thumb) in the TOC.
 */
interface ThumbPosition {
  top: number;
  height: number;
}

const MIN_SCROLLABLE_OVERFLOW_PX = 8;

// =============================================================================
// Constants & Helpers
// =============================================================================

/**
 * Returns the horizontal offset (x position) for the SVG line based on heading depth.
 * Deeper headings are indented further right.
 */
/**
 * Returns the horizontal offset (x position) for the SVG line based on heading depth.
 * Deeper headings are indented further right.
 */
const getLineOffset = (depth: number): number => {
  if (depth <= 2) return 1;
  if (depth === 3) return 9;
  return 9;
};

/**
 * Returns Tailwind padding class for each heading level.
 */
/**
 * Returns Tailwind padding class for each heading level.
 */
const getItemPaddingLeft = (level: number): string => {
  const paddings: Record<number, string> = {
    2: "pl-[24px]",
    3: "pl-[36px]",
    4: "pl-[44px]",
    5: "pl-[52px]",
  };
  return paddings[level] ?? paddings[2];
};

/**
 * Creates an inline SVG data URL for use as a CSS mask.
 */
/**
 * Creates an inline SVG data URL for use as a CSS mask.
 */
const createSvgMask = (svg: SvgData): string => {
  const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svgMarkup)}")`;
};

// =============================================================================
// Hooks
// =============================================================================

/**
 * Returns TOC and a boolean indicating if TOC exists.
 */
export const useTOC = (toc: TocItem[]) => {
  return {
    toc,
    hasTOC: toc.length > 0,
  };
};

/**
 * Builds SVG path data by measuring TOC item positions.
 * Creates vertical lines for each item with diagonal transitions between different indent levels.
 */
/**
 * Builds SVG path data for the TOC line indicator by measuring TOC item positions.
 * Draws vertical lines for each item, with diagonal transitions between indent levels.
 */
const useSvgPath = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  toc: TocItem[],
): SvgData | undefined => {
  const [svg, setSvg] = React.useState<SvgData>();

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measureAndBuildPath = () => {
      const items = container.querySelectorAll("[data-toc-item]");
      const list = container.querySelector<HTMLElement>("[data-toc-list]");
      if (!items.length) return;
      if (!list) return;

      const containerRect = container.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      const contentBottom = listRect.bottom - containerRect.top;
      const containerHeight = container.clientHeight;
      const lineBottom = Math.max(contentBottom, containerHeight);
      const pathCommands: string[] = [];
      let maxWidth = 0;
      let totalHeight = 0;
      let prevOffset = -1;
      let prevBottom = 0;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const styles = getComputedStyle(item);
        const paddingTop = Number.parseFloat(styles.paddingTop);
        const paddingBottom = Number.parseFloat(styles.paddingBottom);

        // Calculate top and bottom of the item relative to the container
        const top = rect.top - containerRect.top + paddingTop;
        const bottom = rect.bottom - containerRect.top - paddingBottom;
        const offset = getLineOffset(toc[index]?.level ?? 2);

        maxWidth = Math.max(offset, maxWidth);
        totalHeight = Math.max(totalHeight, bottom);

        if (index === 0) {
          // First item: start the path
          pathCommands.push(`M${offset} ${top}`);
        } else if (offset !== prevOffset) {
          // Level changed: draw a lightly curved transition
          const deltaY = top - prevBottom;
          const directionY = Math.sign(deltaY) || 1;
          const curveStrength = Math.min(
            8,
            // Math.abs(deltaY) * 0.45,
            // Math.abs(offset - prevOffset) * 0.45,
          );

          if (curveStrength > 0) {
            pathCommands.push(
              `C${prevOffset} ${
                prevBottom + directionY * curveStrength
              } ${offset} ${top - directionY * curveStrength} ${offset} ${top}`,
            );
          } else {
            pathCommands.push(`L${offset} ${top}`);
          }
        }

        // Draw vertical line for this item
        pathCommands.push(`L${offset} ${bottom}`);

        prevOffset = offset;
        prevBottom = bottom;
      });

      // Extend the line to the bottom of the TOC area
      if (prevOffset >= 0 && lineBottom > prevBottom) {
        pathCommands.push(`L${prevOffset} ${lineBottom}`);
      }

      // Add a tiny buffer so the final line cap is not clipped by the mask bounds
      totalHeight = Math.max(totalHeight, lineBottom) + 1;

      setSvg({
        path: pathCommands.join(" "),
        width: maxWidth + 1,
        height: totalHeight,
      });
    };

    // Recalculate path on resize
    const observer = new ResizeObserver(measureAndBuildPath);
    measureAndBuildPath();
    observer.observe(container);
    const list = container.querySelector<HTMLElement>("[data-toc-list]");
    if (list) {
      observer.observe(list);
    }

    return () => observer.disconnect();
  }, [toc, containerRef]);

  return svg;
};

/**
 * Calculates the position of the active highlight thumb.
 * Covers all visible (active) headings.
 */
/**
 * Calculates the position and height of the active highlight (thumb) in the TOC.
 * The thumb covers all currently active (visible) headings.
 */
const useActiveThumb = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  toc: TocItem[],
  activeIds: Set<string>,
  svg: SvgData | undefined,
): ThumbPosition | undefined => {
  const [thumb, setThumb] = React.useState<ThumbPosition>();

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIds.size === 0) {
      setThumb(undefined);
      return;
    }

    const items = container.querySelectorAll("[data-toc-item]");
    const containerRect = container.getBoundingClientRect();

    // Find indices of all active items
    const activeIndices: number[] = [];
    toc.forEach((item, index) => {
      if (activeIds.has(item.id)) {
        activeIndices.push(index);
      }
    });

    if (activeIndices.length === 0) {
      setThumb(undefined);
      return;
    }

    // Get bounding box that covers all active items
    const firstIndex = Math.min(...activeIndices);
    const lastIndex = Math.max(...activeIndices);

    const firstItem = items[firstIndex];
    const lastItem = items[lastIndex];

    if (firstItem && lastItem) {
      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();
      const firstStyles = getComputedStyle(firstItem);
      const lastStyles = getComputedStyle(lastItem);

      const paddingTop = Number.parseFloat(firstStyles.paddingTop);
      const paddingBottom = Number.parseFloat(lastStyles.paddingBottom);

      // Top and bottom of the thumb highlight
      const top = firstRect.top - containerRect.top + paddingTop;
      const bottom = lastRect.bottom - containerRect.top - paddingBottom;

      setThumb({
        top,
        height: bottom - top,
      });
    }
  }, [activeIds, toc, svg, containerRef]);

  return thumb;
};

/**
 * Tracks visible headings based on scroll position.
 * Returns all headings that are currently in the viewport,
 * or the last heading above viewport if none are visible.
 * Defaults to first heading on initial load.
 */
/**
 * Tracks which headings are currently visible in the viewport.
 * Returns all headings that are currently in the viewport,
 * or the last heading above the viewport if none are visible.
 * Defaults to first heading on initial load.
 */
const useVisibleHeadings = (toc: TocItem[]): Set<string> => {
  const [visibleIds, setVisibleIds] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (toc.length === 0) return;

    const calculateVisibleHeadings = () => {
      const viewportTop = 0;
      const viewportBottom = window.innerHeight;
      const visible: string[] = [];
      let lastAboveViewport: string | null = null;

      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // Heading is in viewport
        if (rect.top >= viewportTop && rect.top <= viewportBottom) {
          visible.push(item.id);
        }
        // Track the last heading that's above viewport
        else if (rect.top < viewportTop) {
          lastAboveViewport = item.id;
        }
      }

      // If we have visible headings, use them
      if (visible.length > 0) {
        setVisibleIds(new Set(visible));
      }
      // Otherwise, use the last heading above viewport
      else if (lastAboveViewport) {
        setVisibleIds(new Set([lastAboveViewport]));
      }
      // Fallback to first heading if nothing else
      else if (toc.length > 0) {
        setVisibleIds(new Set([toc[0].id]));
      }
    };

    // Throttle scroll handler to avoid excessive calculations
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateVisibleHeadings();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    calculateVisibleHeadings();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [toc]);

  // Return first heading as fallback if visibleIds is empty
  if (visibleIds.size === 0 && toc.length > 0) {
    return new Set([toc[0].id]);
  }

  return visibleIds;
};

// =============================================================================
// Components
// =============================================================================

/**
 * BlogTOC component renders the Table of Contents sidebar with SVG line indicator and active highlight.
 * - Auto-scrolls to keep the active heading centered
 * - Highlights all visible headings
 */
export const BlogTOC = (props: { toc: TocItem[] }) => {
  const { toc, hasTOC } = useTOC(props.toc);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const visibleIds = useVisibleHeadings(toc);
  const lastAutoScrollRef = React.useRef<{
    id: string | null;
    footerOverlap: number;
  }>({
    id: null,
    footerOverlap: 0,
  });
  const isInitialRenderRef = React.useRef(true);
  const [footerOverlap, setFooterOverlap] = React.useState(0);
  const [allowTocScroll, setAllowTocScroll] = React.useState(false);
  const [scrollMask, setScrollMask] = React.useState({
    showTop: false,
    showBottom: false,
  });

  // SVG path for the vertical/diagonal line
  const svg = useSvgPath(containerRef, toc);
  // Position and height of the active highlight
  const activeThumb = useActiveThumb(containerRef, toc, visibleIds, svg);

  const updateScrollMask = React.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const maxScrollTop = Math.max(
      scrollContainer.scrollHeight - scrollContainer.clientHeight,
      0,
    );

    if (maxScrollTop <= MIN_SCROLLABLE_OVERFLOW_PX) {
      if (scrollContainer.scrollTop !== 0) {
        scrollContainer.scrollTop = 0;
      }

      setAllowTocScroll((previous) => (previous ? false : previous));
      setScrollMask((previous) => {
        if (!previous.showTop && !previous.showBottom) {
          return previous;
        }

        return { showTop: false, showBottom: false };
      });
      return;
    }

    setAllowTocScroll((previous) => (previous ? previous : true));

    const showTop = scrollContainer.scrollTop > 1;
    const showBottom = scrollContainer.scrollTop < maxScrollTop - 1;

    setScrollMask((previous) => {
      if (previous.showTop === showTop && previous.showBottom === showBottom) {
        return previous;
      }

      return { showTop, showBottom };
    });
  }, []);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let frameId: number | null = null;
    const scheduleScrollMaskUpdate = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateScrollMask();
      });
    };

    scheduleScrollMaskUpdate();
    scrollContainer.addEventListener("scroll", scheduleScrollMaskUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleScrollMaskUpdate, {
      passive: true,
    });

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleScrollMaskUpdate);
      window.removeEventListener("resize", scheduleScrollMaskUpdate);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [updateScrollMask, toc, svg]);

  React.useEffect(() => {
    let frameId: number | null = null;

    const updateFooterOverlap = () => {
      const footerElement = document.querySelector<HTMLElement>(
        "footer[data-blog-footer]",
      );

      if (!footerElement) {
        setFooterOverlap((previous) => (previous === 0 ? previous : 0));
        return;
      }

      const footerTop = footerElement.getBoundingClientRect().top;
      const nextOverlap = Math.max(0, window.innerHeight - footerTop);

      setFooterOverlap((previous) => {
        if (Math.abs(previous - nextOverlap) < 1) {
          return previous;
        }

        return nextOverlap;
      });
    };

    const scheduleFooterOverlapUpdate = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateFooterOverlap();
      });
    };

    scheduleFooterOverlapUpdate();

    window.addEventListener("scroll", scheduleFooterOverlapUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleFooterOverlapUpdate, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", scheduleFooterOverlapUpdate);
      window.removeEventListener("resize", scheduleFooterOverlapUpdate);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollMaskImage = React.useMemo(() => {
    if (!scrollMask.showTop) {
      return "none";
    }

    // Keep only the top fade and remove the bottom fade shadow.
    return "linear-gradient(#0000, #fff 16px, #fff)";
  }, [scrollMask.showTop]);

  // Auto-scroll TOC to keep the first active item centered in the sidebar
  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const itemsContainer = containerRef.current;
    if (!scrollContainer || !itemsContainer || visibleIds.size === 0) return;
    if (!allowTocScroll) return;

    // Find the first active item in the TOC
    let firstActiveId: string | null = null;
    for (const item of toc) {
      if (visibleIds.has(item.id)) {
        firstActiveId = item.id;
        break;
      }
    }
    if (!firstActiveId) return;

    // Prevent unnecessary scrolls unless footer overlap changed and layout height shifted.
    const hasSameActiveId = lastAutoScrollRef.current.id === firstActiveId;
    const hasSameFooterOverlap =
      Math.abs(lastAutoScrollRef.current.footerOverlap - footerOverlap) < 1;

    if (hasSameActiveId && hasSameFooterOverlap) return;

    const items = itemsContainer.querySelectorAll("[data-toc-item]");
    const firstActiveIndex = toc.findIndex((item) => item.id === firstActiveId);
    if (firstActiveIndex === -1 || !items[firstActiveIndex]) return;

    const activeItem = items[firstActiveIndex] as HTMLElement;
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    const activeItemRect = activeItem.getBoundingClientRect();

    // Center the active item in the visible area
    const scrollContainerCenter = scrollContainerRect.height / 2;
    const activeItemCenter =
      activeItemRect.top - scrollContainerRect.top + activeItemRect.height / 2;
    const scrollOffset = activeItemCenter - scrollContainerCenter;

    // Use instant scroll on initial render, smooth after
    scrollContainer.scrollBy({
      top: scrollOffset,
      behavior:
        isInitialRenderRef.current || !hasSameFooterOverlap
          ? "instant"
          : "smooth",
    });

    lastAutoScrollRef.current = {
      id: firstActiveId,
      footerOverlap,
    };
    isInitialRenderRef.current = false;
  }, [visibleIds, toc, footerOverlap, allowTocScroll]);

  return (
    <div
      className={clsx(
        "hidden blog-md:block",
        "w-[340px]",
        !hasTOC && "invisible",
        "not-prose",
      )}
    >
      <div
        className={clsx(
          "fixed top-[64px]",
          "left-[calc(50%+260px)]",
          "w-[340px]",
          "pt-12",
        )}
        style={{
          height: `calc(100vh - 64px - ${footerOverlap}px)`,
        }}
      >
        <div className={clsx("h-full", "flex", "flex-col")}>
          {/* Header */}
          <div
            className={clsx(
              "shrink-0",
              "bg-zinc-50 dark:bg-zinc-900",
              "ml-[0.5px]",
              "relative",
            )}
          >
            <OnThisPageIcon />
            <h2
              className={clsx(
                "font-semibold",
                "text-[0.625rem]",
                "leading-4",
                "tracking-[0.01em]",
                "uppercase",
                "text-zinc-500 dark:text-zinc-400",
                "pl-5",
                "mt-4",
              )}
            >
              On this page
            </h2>
          </div>
          <div
            ref={scrollContainerRef}
            className={clsx(
              "relative flex-1",
              allowTocScroll ? "overflow-auto" : "overflow-hidden",
              "pt-2",
              "mt-4",
            )}
            style={{
              scrollbarWidth: "none",
              WebkitMaskImage: scrollMaskImage,
              maskImage: scrollMaskImage,
            }}
          >
            {/* TOC Container */}
            <div ref={containerRef} className="relative flex-1 h-full">
              {/* SVG Line Indicator */}
              {svg && <TocLineIndicator svg={svg} activeThumb={activeThumb} />}

              {/* TOC Items */}
              <ul
                data-toc-list
                className={clsx(
                  "list-none m-0 p-0 not-prose",
                  "pb-12",
                  "w-[296px]",
                )}
              >
                {toc.map((item) => (
                  <BlogTOCItem
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    level={item.level}
                    isActive={visibleIds.has(item.id)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Renders the SVG line with mask technique and active thumb highlight.
 */
/**
 * Renders the SVG line indicator and the active highlight thumb.
 * Uses a CSS mask to overlay the SVG path.
 */
const TocLineIndicator = ({
  svg,
  activeThumb,
}: {
  svg: SvgData;
  activeThumb?: ThumbPosition;
}) => (
  <div
    className="absolute start-0 top-0 pointer-events-none"
    style={{
      width: svg.width,
      height: svg.height,
      maskImage: createSvgMask(svg),
    }}
  >
    {/* Background line (gray) */}
    <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700" />
    {/* Active thumb highlight */}
    {activeThumb && (
      <div
        className="absolute w-full bg-zinc-900 dark:bg-white transition-[top,height] duration-200"
        style={{
          top: activeThumb.top,
          height: activeThumb.height,
        }}
      />
    )}
  </div>
);

/**
 * Individual TOC item link.
 */
/**
 * Renders a single TOC item as a link.
 * Highlights if active.
 */
export const BlogTOCItem = ({
  id,
  value,
  level,
  isActive,
}: {
  id: string;
  value: string;
  level: number;
  isActive: boolean;
}) => {
  return (
    <a
      href={`#${id}`}
      data-toc-item
      className={clsx(
        "refine-toc-item",
        "py-2",
        "pr-4",
        "first:pt-0",
        "last:pb-0",
        "text-sm",
        "no-underline hover:no-underline",
        "hover:text-zinc-900 dark:hover:text-white",
        "transition-colors duration-200 ease-in-out",
        isActive && "text-zinc-900 dark:text-white",
        !isActive && "text-zinc-500 dark:text-zinc-400 ",
        "block",
        getItemPaddingLeft(level),
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: TOC content is trusted
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

const OnThisPageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    className={clsx(
      "h-4",
      "w-4",
      "text-zinc-500",
      "dark:text-zinc-400",
      "absolute",
      "top-4",
      "-left-2",
    )}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 4.667A2.667 2.667 0 0 0 5.333 2h-4v10H6a2 2 0 0 1 2 2m0-9.333V14m0-9.333A2.667 2.667 0 0 1 10.667 2h4v10H10a2 2 0 0 0-2 2M4 5.333h1.333M4 8h1.333m5.334-2.667H12M10.667 8H12"
    />
  </svg>
);
