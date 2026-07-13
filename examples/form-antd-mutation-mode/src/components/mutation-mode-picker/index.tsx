import React from "react";
import type { MutationMode } from "@refinedev/core";
import { Radio, Space, Typography } from "antd";

interface Props {
  currentMutationMode: MutationMode;
  onMutationModeChange: (mode: MutationMode) => void;
}

const MutationModePicker: React.FC<Props> = ({
  currentMutationMode,
  onMutationModeChange,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "8px 16px",
        borderRadius: "8px",
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Space direction="vertical" align="center">
        <Radio.Group
          onChange={(e) => onMutationModeChange(e.target.value)}
          value={currentMutationMode}
        >
          <Radio value={"pessimistic"}>Pessimistic</Radio>
          <Radio value={"optimistic"}>Optimistic</Radio>
          <Radio value={"undoable"}>Undoable</Radio>
        </Radio.Group>
        <Typography.Text type="secondary">
          <a
            href="https://refine.dev/docs/advanced-tutorials/mutation-mode/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Refer to the mutation mode documentation for more information. →
          </a>
        </Typography.Text>
      </Space>
    </div>
  );
};

export default MutationModePicker;
