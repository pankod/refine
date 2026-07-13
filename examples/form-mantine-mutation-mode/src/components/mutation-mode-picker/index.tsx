import React from "react";
import type { MutationMode } from "@refinedev/core";
import { Radio, Group, Text, Card } from "@mantine/core";

interface Props {
  currentMutationMode: MutationMode;
  onMutationModeChange: (mode: MutationMode) => void;
}

const MutationModePicker: React.FC<Props> = ({
  currentMutationMode,
  onMutationModeChange,
}) => {
  return (
    <Card
      shadow="sm"
      p={"md"}
      radius="md"
      withBorder
      sx={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Group
        mt={0}
        pt={0}
        mb={8}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          pt: 0,
        }}
      >
        <Radio
          checked={currentMutationMode === "pessimistic"}
          onChange={() => onMutationModeChange("pessimistic")}
          value={"pessimistic"}
          label="Pessimistic"
        />
        <Radio
          checked={currentMutationMode === "optimistic"}
          onChange={() => onMutationModeChange("optimistic")}
          value={"optimistic"}
          label="Optimistic"
        />
        <Radio
          checked={currentMutationMode === "undoable"}
          onChange={() => onMutationModeChange("undoable")}
          value={"undoable"}
          label="Undoable"
        />
      </Group>

      <Text>
        <a
          href="https://refine.dev/docs/advanced-tutorials/mutation-mode/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Refer to the mutation mode documentation for more information. →
        </a>
      </Text>
    </Card>
  );
};

export default MutationModePicker;
