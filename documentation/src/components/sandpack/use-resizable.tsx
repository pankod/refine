import React from "react";

export const useResizable = ({
  initialSize = 50,
}: {
  initialSize?: number;
}) => {
  const [size, setSize] = React.useState<number>(initialSize);
  const dragEventTargetRef = React.useRef<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const onDragMove = (event: MouseEvent): void => {
    if (!dragEventTargetRef.current) return;

    const container = dragEventTargetRef.current.parentElement as
      | HTMLDivElement
      | undefined;

    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const offset = ((event.clientX - left) / width) * 100;
    const boundaries = Math.min(Math.max(offset, 25), 75);

    setSize(boundaries);

    container.querySelectorAll(".sp-stack").forEach((item) => {
      (item as HTMLDivElement).style.pointerEvents = "none";
    });
  };

  const stopDragging = (): void => {
    const container = dragEventTargetRef.current?.parentElement as
      | HTMLDivElement
      | undefined;

    if (!container) return;

    container.querySelectorAll(".sp-stack").forEach((item) => {
      (item as HTMLDivElement).style.pointerEvents = "";
    });

    dragEventTargetRef.current = null;
  };

  React.useEffect(() => {
    document.body.addEventListener("mousemove", onDragMove);
    document.body.addEventListener("mouseup", stopDragging);

    return (): void => {
      document.body.removeEventListener("mousemove", onDragMove);
      document.body.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  const onHandleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      dragEventTargetRef.current = event.target as HTMLDivElement;
    },
    [],
  );

  return {
    horizontalSize: size,
    onHandleMouseDown,
  };
};
