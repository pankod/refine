import React from "react";
import {
  type AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import { Text } from "@chakra-ui/react";
import {
  IconDots,
  IconRefresh,
  IconCircleCheck,
  IconExclamationCircle,
} from "@tabler/icons-react";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        translationKey="autoSave.success"
        defaultMessage="saved"
        icon={<IconCircleCheck size="18px" />}
      />
    ),
    error = (
      <Message
        translationKey="autoSave.error"
        defaultMessage="auto save failure"
        icon={<IconExclamationCircle size="18px" />}
      />
    ),
    loading = (
      <Message
        translationKey="autoSave.loading"
        defaultMessage="saving..."
        icon={<IconRefresh size="18px" />}
      />
    ),
    idle = (
      <Message
        translationKey="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<IconDots size="18px" />}
      />
    ),
  } = {},
}) => {
  return (
    <AutoSaveIndicatorCore
      status={status}
      elements={{
        success,
        error,
        loading,
        idle,
      }}
    />
  );
};

const Message = ({
  translationKey,
  defaultMessage,
  icon,
}: {
  translationKey: string;
  defaultMessage: string;
  icon: React.ReactNode;
}) => {
  const translate = useTranslate();

  return (
    <Text
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      color="gray.700"
      marginRight="2"
      fontSize="sm"
    >
      {translate(translationKey, defaultMessage)}
      <span style={{ marginLeft: "3px" }}>{icon}</span>
    </Text>
  );
};
