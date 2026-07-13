import React from "react";

import {
  DragOverlay,
  useDraggable,
  type UseDraggableArguments,
} from "@dnd-kit/core";

interface Props {
  id: string;
  data?: UseDraggableArguments["data"];
}

export const KanbanItem = ({
  children,
  id,
  data,
}: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}
      >
        {children}
      </div>
      {active?.id === id && (
        // antd sider has z-index of 999
        <DragOverlay zIndex={1000}>
          <div
            style={{
              borderRadius: "8px",
              boxShadow:
                "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)",
              cursor: "grabbing",
            }}
          >
            {children}
          </div>
        </DragOverlay>
      )}
    </div>
  );
};
