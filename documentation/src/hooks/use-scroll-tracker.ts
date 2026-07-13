import { useState, useEffect } from "react";

const useScrollTracker = (
  trackScrollDepths?: number[],
  callback?: (params: {
    scrollY: number;
    scrollPercent: number;
    remainingDepths: Array<number>;
  }) => void,
): { scrollY: number } => {
  const [state, setState] = useState({
    scrollDepths: trackScrollDepths,
    scrollY: 0,
  });

  const { scrollDepths, scrollY } = state;

  useEffect(() => {
    if (typeof window === "undefined" || window.pageYOffset === 0) {
      return;
    }
    setState((oldState) => ({
      ...oldState,
      scrollY: window.pageYOffset,
    }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const endScrollTracker = () =>
      window.removeEventListener("scroll", handleScroll);

    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;

      const scrollTop = h.scrollTop || b.scrollTop;
      const scrollHeight = h.scrollHeight || b.scrollHeight;
      const clientHeight = h.clientHeight;

      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollDepths) {
        const nextMinDepth = Math.min(...scrollDepths, scrollHeight);

        if (scrollPercent >= nextMinDepth) {
          const updatedScrollDepths = scrollDepths.filter(
            (depth) => depth !== nextMinDepth,
          );

          if (updatedScrollDepths.length === 0) {
            endScrollTracker();
          }

          if (callback) {
            callback({
              scrollY: nextMinDepth,
              scrollPercent,
              remainingDepths: updatedScrollDepths,
            });
          }
          setState({
            scrollY: nextMinDepth,
            scrollDepths: updatedScrollDepths,
          });
        }
      } else {
        setState({ ...state, scrollY: scrollPercent });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return endScrollTracker;
  }, [scrollDepths, scrollY, state]);

  return { scrollY };
};

export default useScrollTracker;
