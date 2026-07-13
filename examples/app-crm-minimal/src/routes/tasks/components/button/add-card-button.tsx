import React from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { Text } from "@/components";

interface Props {
  onClick: () => void;
}

export const KanbanAddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <Button
      size="large"
      icon={<PlusSquareOutlined className="md" />}
      style={{
        margin: "16px",
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      {children ?? (
        <Text size="md" type="secondary">
          Add new card
        </Text>
      )}
    </Button>
  );
};
