import React, { type ReactElement } from "react";
import { useList } from "@refinedev/core";

import type { Canvas } from "../../types/canvas";
import type { Pixel } from "../../types/pixel";

type DisplayCanvasProps = {
  canvas: Canvas;
  children: (pixels: Pixel[] | undefined) => ReactElement;
};

export const DisplayCanvas: React.FC<DisplayCanvasProps> = ({
  canvas: { id },
  children,
}) => {
  const { result: data } = useList<Pixel>({
    resource: "pixels",
    liveMode: "auto",
    meta: {
      select: "*, users(id, full_name, avatar_url)",
    },
    filters: [
      {
        field: "canvas_id",
        operator: "eq",
        value: id,
      },
    ],
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    pagination: {
      mode: "off",
    },
  });

  const pixels = data?.data;

  return <>{children(pixels)}</>;
};
