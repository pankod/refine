import { useEffect, useState } from "react";

const getIsMobile = (breakpoint: number) =>
  typeof window !== "undefined" ? window.innerWidth <= breakpoint : false;

type UseIsMobileProps = {
  breakpoint?: number;
};

export default function useIsMobile({
  breakpoint = 768,
}: UseIsMobileProps = {}) {
  const [isMobile, setIsMobile] = useState(getIsMobile(breakpoint));

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile(breakpoint));
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", onResize);
      }
    };
  }, []);

  return isMobile;
}
