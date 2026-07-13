import React from "react";
import type { MutationMode } from "@refinedev/core";
import { Radio, RadioGroup, VStack, Stack, Text, Box } from "@chakra-ui/react";

interface Props {
  currentMutationMode: MutationMode;
  onMutationModeChange: (mode: MutationMode) => void;
}

const MutationModePicker: React.FC<Props> = ({
  currentMutationMode,
  onMutationModeChange,
}) => {
  return (
    <Box
      boxShadow="dark-lg"
      p="6"
      rounded="md"
      sx={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "8px 16px",
      }}
    >
      <VStack align="center">
        <RadioGroup
          name="mutation-mode"
          onChange={onMutationModeChange}
          value={currentMutationMode}
        >
          <Stack direction="row">
            <Radio value={"pessimistic"}>Pessimistic</Radio>
            <Radio value={"optimistic"}>Optimistic</Radio>
            <Radio value={"undoable"}>Undoable</Radio>
          </Stack>
        </RadioGroup>
        <Text>
          <a
            href="https://refine.dev/docs/advanced-tutorials/mutation-mode/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Refer to the mutation mode documentation for more information. →
          </a>
        </Text>
      </VStack>
    </Box>
  );
};

export default MutationModePicker;
