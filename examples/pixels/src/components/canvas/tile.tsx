import React from "react";
import { Link } from "@refinedev/core";
import { Skeleton } from "antd";
import { CanvasItem, DisplayCanvas } from "./index";
import { Contributors } from "../../components/avatar";
import type { Canvas } from "../../types";

type CanvasTileProps = {
  canvas: Canvas;
};

export const CanvasTile: React.FC<CanvasTileProps> = ({ canvas }) => {
  return (
    <DisplayCanvas canvas={canvas}>
      {(pixels) =>
        pixels ? (
          <Link
            key={canvas.id}
            className="canvas-item"
            go={{
              to: {
                resource: "canvases",
                action: "show",
                id: canvas.id,
              },
            }}
          >
            <CanvasItem
              canvas={canvas}
              pixels={pixels}
              scale={25 / canvas.width}
              active={false}
            />
            <Contributors pixels={pixels} />
          </Link>
        ) : (
          <Skeleton paragraph={{ rows: 8 }} />
        )
      }
    </DisplayCanvas>
  );
};
