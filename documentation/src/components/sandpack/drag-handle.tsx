import clsx from "clsx";
import React from "react";

type Props = {
  horizontalSize: number;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const DragHandle = ({ horizontalSize, onMouseDown }: Props) => {
  return (
    <div
      className={clsx(
        "resize-handler",
        "hidden",
        "md:block",
        "absolute",
        "z-[3]",
        "top-0",
        "bottom-0",
        "w-2.5",
        "cursor-ew-resize",
      )}
      data-direction="horizontal"
      onMouseDown={onMouseDown}
      style={{
        left: `calc(${horizontalSize}% - 5px)`,
      }}
    />
  );
};
