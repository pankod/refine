import React from "react";

import { Alert, Center } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

import type { CreateInferencerConfig } from "../../types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
  error,
}) => {
  if (error) {
    return (
      <Center style={{ minHeight: 300 }}>
        <Alert title="Error" color="red" icon={<IconAlertCircle />}>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled */}
          <div dangerouslySetInnerHTML={{ __html: error ?? "" }} />
        </Alert>
      </Center>
    );
  }

  return null;
};
