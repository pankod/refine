import React from "react";
import type { OpenNotificationParams } from "@refinedev/core";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IconRotate2 } from "@tabler/icons-react";

export type UndoableNotificationProps = {
  notificationKey: OpenNotificationParams["key"];
  message: OpenNotificationParams["message"];
  cancelMutation: OpenNotificationParams["cancelMutation"];
  undoableTimeout: OpenNotificationParams["undoableTimeout"];
};

export const UndoableNotification: React.FC<UndoableNotificationProps> = ({
  notificationKey = "",
  message,
  cancelMutation,
  undoableTimeout = 0,
}) => {
  const toast = useToast();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      bg="chakra-body-bg"
      shadow="md"
      minW={320}
      p={2}
    >
      <CircularProgress value={undoableTimeout * 20} color="green">
        <CircularProgressLabel>{undoableTimeout}</CircularProgressLabel>
      </CircularProgress>
      <Text>{message}</Text>
      <IconButton
        aria-label="undo"
        variant="outline"
        onClick={() => {
          cancelMutation?.();
          toast.close(notificationKey);
        }}
      >
        <IconRotate2 size={18} />
      </IconButton>
    </Box>
  );
};
