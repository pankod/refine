import React from "react";

import type { TPixel, TCanvas } from "../../types";
import { DEFAULT_SCALE, PIXEL_SIZE } from "../../utility/constants";

type CanvasItemProps = {
  canvas: TCanvas;
  pixels: TPixel[] | undefined;
  scale?: number;
  border?: boolean;
  active?: boolean;
  onPixelClick?: (x: number, y: number) => void;
};

export const CanvasItem: React.FC<CanvasItemProps> = ({
  canvas: { width, height },
  pixels,
  scale = DEFAULT_SCALE,
  border = true,
  active = true,
  onPixelClick,
}) => {
  return (
    <div>
      {Array.from({ length: height }).map((_, i) => (
        <div key={`row-${i}`} style={{ display: "flex" }}>
          {Array.from({ length: width }).map((_, j) => (
            <div key={`row-${i}-col-${j}`}>
              <div
                onClick={() => {
                  if (onPixelClick && active) {
                    onPixelClick(j, i);
                  }
                }}
                style={{
                  cursor: active ? "pointer" : undefined,
                  width: PIXEL_SIZE * scale,
                  height: PIXEL_SIZE * scale,
                  border: border ? "0.5px solid rgba(0,0,0,0.05)" : undefined,
                  background:
                    pixels?.find((el) => el.x === j && el.y === i)?.color ??
                    "transparent",
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
