import React from "react";

import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useDroppable, type UseDroppableArguments } from "@dnd-kit/core";
import { Badge, Button, Skeleton, Space } from "antd";

import { Text } from "@/components";

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDroppableArguments["data"];
  onAddClick?: (args: { id: string }) => void;
};

export const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          padding: "12px",
        }}
      >
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "auto",
          border: "2px dashed transparent",
          borderColor: isOver ? "#00000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const KanbanColumnSkeleton = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          padding: "12px",
        }}
      >
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Skeleton.Button size="small" style={{ width: "125px" }} />
          <Button
            disabled
            type="text"
            shape="circle"
            icon={
              <MoreOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
            }
          />
          <Button disabled shape="circle" icon={<PlusOutlined />} />
        </Space>
      </div>
      <div
        style={{
          flex: 1,
          border: "2px dashed transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
