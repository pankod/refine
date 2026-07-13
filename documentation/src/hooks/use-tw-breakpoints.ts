import React from "react";

/**
 * tailwindcss breakpoints
 * xs: 360px
 * sm: 640px
 * md: 768px
 * lg: 1024px
 * xl: 1280px
 *
 * landing breakpoints
 * xs: 360px
 * sm: 720px
 * md: 960px
 * lg: 1296px
 * xl: 1440px
 */
const breakpoints = {
  landing: [375, 720, 960, 1296, 1440, 1584],
  tw: [360, 640, 768, 1024, 1280, 1536],
};

/**
 * check tailwindcss breakpoints with matchMedia and addEventListener
 */

export type TWBreakpoints = Record<
  "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
  boolean
>;

type Props = {
  variant: "landing" | "tw";
};

export const useTWBreakpoints = (
  props: Props = {
    variant: "tw",
  },
): TWBreakpoints => {
  const [xs, setXs] = React.useState(true);
  const [sm, setSm] = React.useState(true);
  const [md, setMd] = React.useState(true);
  const [lg, setLg] = React.useState(true);
  const [xl, setXl] = React.useState(true);
  const [xxl, setXxl] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const [xsQuery, smQuery, mdQuery, lgQuery, xlQuery, xxlQuery] =
        breakpoints[props.variant].map((bp) =>
          window.matchMedia(`(min-width: ${bp}px)`),
        );

      const xsHandler = (e: MediaQueryListEvent) => {
        setXs(e.matches);
      };
      const smHandler = (e: MediaQueryListEvent) => {
        setSm(e.matches);
      };
      const mdHandler = (e: MediaQueryListEvent) => {
        setMd(e.matches);
      };
      const lgHandler = (e: MediaQueryListEvent) => {
        setLg(e.matches);
      };
      const xlHandler = (e: MediaQueryListEvent) => {
        setXl(e.matches);
      };
      const xxlHandler = (e: MediaQueryListEvent) => {
        setXxl(e.matches);
      };

      xsQuery.addEventListener("change", xsHandler);
      smQuery.addEventListener("change", smHandler);
      mdQuery.addEventListener("change", mdHandler);
      lgQuery.addEventListener("change", lgHandler);
      xlQuery.addEventListener("change", xlHandler);
      xxlQuery.addEventListener("change", xxlHandler);

      setXs(xsQuery.matches);
      setSm(smQuery.matches);
      setMd(mdQuery.matches);
      setLg(lgQuery.matches);
      setXl(xlQuery.matches);
      setXxl(xxlQuery.matches);

      return () => {
        smQuery.removeEventListener("change", smHandler);
        mdQuery.removeEventListener("change", mdHandler);
        lgQuery.removeEventListener("change", lgHandler);
        xlQuery.removeEventListener("change", xlHandler);
        xxlQuery.removeEventListener("change", xxlHandler);
      };
    }
  }, []);

  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};
