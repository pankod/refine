import type { Placement } from "src/interfaces/placement";

export const getPanelToggleTransforms = (visible: boolean) => {
  return visible ? "scaleX(1) translateY(0)" : "scaleX(0) translateY(25vw)";
};

export const SIZE = 50;
export const BUFFER = 10;

const PREFERRED_DEFAULT_WIDTH = () =>
  typeof window !== "undefined" ? window.innerWidth * 0.7 : 1440 * 0.7; // 70% of window width
const PREFERRED_DEFAULT_HEIGHT = () =>
  typeof window !== "undefined" ? window.innerHeight * 0.7 : 900 * 0.7; // 70% of window height

export const MIN_PANEL_WIDTH = 640;
export const MIN_PANEL_HEIGHT = 360;

export const getPinButtonTransform = (hover?: boolean) => {
  return `translateY(${hover ? "0" : "50%"})`;
};

export const getPanelPosition = (placement: Placement) => {
  switch (placement) {
    case "left":
      return {
        left: `calc(${SIZE}px + ${BUFFER}px)`,
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "right":
      return {
        right: `calc(${SIZE}px + ${BUFFER}px)`,
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "top":
      return {
        left: "50%",
        top: `calc(${SIZE}px + ${BUFFER}px)`,
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        left: "50%",
        bottom: `calc(${SIZE}px + ${BUFFER}px)`,
        transform: "translateX(-50%)",
      };
  }
};

export const getMaxPanelWidth = (placement: Placement) => {
  switch (placement) {
    case "left":
    case "right":
      return (
        -BUFFER -
        SIZE -
        BUFFER +
        (typeof window !== "undefined" ? window.innerWidth : 1440) -
        BUFFER
      );
    case "top":
    case "bottom":
      return (
        -BUFFER +
        (typeof window !== "undefined" ? window.innerWidth : 1440) -
        BUFFER
      );
  }
};

export const getMaxPanelHeight = (placement: Placement) => {
  switch (placement) {
    case "left":
    case "right":
      return (
        -BUFFER +
        (typeof window !== "undefined" ? window.innerHeight : 900) -
        BUFFER
      );
    case "top":
    case "bottom":
      return (
        -BUFFER -
        SIZE -
        BUFFER +
        (typeof window !== "undefined" ? window.innerHeight : 900) -
        BUFFER
      );
  }
};

export const getDefaultPanelSize = (
  placement: Placement,
  preferredSize?: { width: number; height: number },
): { width: number; height: number } => {
  const defaultPreferred = {
    width: PREFERRED_DEFAULT_WIDTH(),
    height: PREFERRED_DEFAULT_HEIGHT(),
  };

  const maxPanelWidth = getMaxPanelWidth(placement);
  const maxPanelHeight = getMaxPanelHeight(placement);

  const width = Math.min(
    maxPanelWidth,
    (preferredSize ?? defaultPreferred).width,
  );
  const height = Math.min(
    maxPanelHeight,
    (preferredSize ?? defaultPreferred).height,
  );

  return {
    width: width,
    height: height,
  };
};

export const roundToEven = (num: number) => {
  const rounded = Math.round(num);
  return rounded % 2 === 0 ? rounded : rounded + 1;
};
