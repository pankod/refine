import React from "react";
import { RingProgress, Text } from "@mantine/core";

export type RingCountdownProps = {
  undoableTimeout: number;
};

export const RingCountdown: React.FC<RingCountdownProps> = ({
  undoableTimeout,
}) => {
  return (
    <RingProgress
      size={55}
      thickness={4}
      roundCaps
      sections={[{ value: undoableTimeout * 20, color: "primary" }]}
      label={
        <Text weight={700} align="center">
          {undoableTimeout}
        </Text>
      }
    />
  );
};
