import React from "react";
import type { Placement } from "src/interfaces/placement";
import {
  getDefaultPanelSize,
  getMaxPanelHeight,
  getMaxPanelWidth,
  getPanelPosition,
  getPanelToggleTransforms,
  MIN_PANEL_HEIGHT,
  MIN_PANEL_WIDTH,
  roundToEven,
} from "src/utilities";
import { ResizeHandleIcon } from "./icons/resize-handle-icon";

type Props = {
  placement: Placement;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  children: ({ resizing }: { resizing: string | null }) => React.ReactNode;
  onResize?: (width: number, height: number) => void;
  visible?: boolean;
};

export const ResizablePane = ({ placement, visible, children }: Props) => {
  const [hover, setHover] = React.useState(false);
  const [resizing, setResizing] = React.useState<
    "lx" | "rx" | "ty" | "by" | null
  >(null);
  const [resizePosition, setResizePosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [panelSize, setPanelSize] = React.useState<
    Record<"width" | "height", number>
  >(() => {
    const defaultSize = getDefaultPanelSize(placement);

    return {
      width: roundToEven(defaultSize.width),
      height: roundToEven(defaultSize.height),
    };
  });

  React.useEffect(() => {
    const handleResize = () => {
      setPanelSize((p) => {
        const defaultSize = getDefaultPanelSize(placement, p);

        return {
          width: roundToEven(defaultSize.width),
          height: roundToEven(defaultSize.height),
        };
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [placement]);

  React.useEffect(() => {
    const handleMouseUp = () => {
      setResizing(null);
    };

    if (resizing !== null) {
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }

    return;
  }, [resizing]);

  React.useEffect(() => {
    const currentCursor = document.body.style.cursor;

    if (resizing?.includes("x")) {
      document.body.style.cursor = "col-resize";
    } else if (resizing?.includes("y")) {
      document.body.style.cursor = "row-resize";
    }

    return () => {
      document.body.style.cursor = currentCursor;
    };
  }, [resizing]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing?.[1] === "x") {
        const diff = e.clientX - (resizePosition?.x ?? e.clientX);
        const newWidth =
          panelSize.width + (resizing === "lx" ? -diff : diff) * 2;

        setPanelSize((p) => ({
          ...p,
          width: roundToEven(
            Math.min(
              getMaxPanelWidth(placement),
              Math.max(MIN_PANEL_WIDTH, newWidth),
            ),
          ),
        }));
      } else if (resizing?.[1] === "y") {
        const diff = e.clientY - (resizePosition?.y ?? e.clientY);
        const newHeight =
          panelSize.height + (resizing === "ty" ? -diff : diff) * 1;

        setPanelSize((p) => ({
          ...p,
          height: roundToEven(
            Math.min(
              getMaxPanelHeight(placement),
              Math.max(MIN_PANEL_HEIGHT, newHeight),
            ),
          ),
        }));
      }
    };

    if (resizing !== null) {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return;
  }, [resizing, placement]);

  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        transitionProperty: "transform, opacity",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "0.2s",
        ...getPanelPosition(placement),
        opacity: visible ? 1 : 0,
        transform: `${
          getPanelPosition(placement).transform
        } ${getPanelToggleTransforms(visible ?? false)}`,
        ...panelSize,
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {children({ resizing })}
      {/*  */}
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "10px",
            height: "26px",
            transform: "translateY(-13px) translateX(-5px)",
            cursor: "col-resize",
            transition: "opacity ease-in-out 0.2s",
            pointerEvents: hover || resizing ? "auto" : "none",
            opacity: hover || resizing ? 1 : 0,
          }}
          onMouseDown={(event) => {
            setResizing("lx");
            setResizePosition({
              x: event.clientX,
              y: event.clientY,
            });

            event.preventDefault();
          }}
        >
          <ResizeHandleIcon />
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            width: "10px",
            height: "26px",
            transform: "translateY(-13px) translateX(5px)",
            cursor: "col-resize",
            transition: "opacity ease-in-out 0.2s",
            pointerEvents: hover || resizing ? "auto" : "none",
            opacity: hover || resizing ? 1 : 0,
          }}
          onMouseDown={(event) => {
            setResizing("rx");
            setResizePosition({
              x: event.clientX,
              y: event.clientY,
            });

            event.preventDefault();
          }}
        >
          <ResizeHandleIcon />
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "26px",
            height: "10px",
            transform: "translateY(-5px) translateX(-13px)",
            cursor: "row-resize",
            transition: "opacity ease-in-out 0.2s",
            pointerEvents: hover || resizing ? "auto" : "none",
            opacity: hover || resizing ? 1 : 0,
          }}
          onMouseDown={(event) => {
            setResizing("ty");
            setResizePosition({
              x: event.clientX,
              y: event.clientY,
            });

            event.preventDefault();
          }}
        >
          <ResizeHandleIcon
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "13px 13px",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: "26px",
            height: "10px",
            transform: "translateY(5px) translateX(-13px)",
            cursor: "row-resize",
            transition: "opacity ease-in-out 0.2s",
            pointerEvents: hover || resizing ? "auto" : "none",
            opacity: hover || resizing ? 1 : 0,
          }}
          onMouseDown={(event) => {
            setResizing("by");
            setResizePosition({
              x: event.clientX,
              y: event.clientY,
            });

            event.preventDefault();
          }}
        >
          <ResizeHandleIcon
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "13px 13px",
            }}
          />
        </div>
      </React.Fragment>
    </div>
  );
};
