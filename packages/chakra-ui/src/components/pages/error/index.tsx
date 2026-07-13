import React, { useEffect, useState } from "react";
import type { RefineErrorPageProps } from "@refinedev/ui-types";
import { useGo, useResourceParams, useTranslate } from "@refinedev/core";
import {
  Box,
  Heading,
  Text,
  Tooltip,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons-react";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const go = useGo();

  const { action, resource } = useResourceParams();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          "pages.error.info",
          {
            action,
            resource: resource?.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
        ),
      );
    }
  }, [resource, action]);

  const color = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="calc(100vh - 150px)"
    >
      <Heading fontWeight={900} fontSize={[120, 160, 220]} color={color}>
        404
      </Heading>
      <Stack direction={["column", "row"]} alignItems="center" spacing={2}>
        <Text color={color} fontSize="xl" align="center">
          {translate(
            "pages.error.404",
            "Sorry, the page you visited does not exist.",
          )}
        </Text>
        {errorMessage && (
          <Tooltip openDelay={0} label={errorMessage}>
            <IconButton
              aria-label="info"
              color={color}
              data-testid="error-component-tooltip"
            >
              <IconInfoCircle />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Button
        mt={6}
        variant="outline"
        onClick={() => {
          go({ to: "/" });
        }}
      >
        {translate("pages.error.backHome", "Back Home")}
      </Button>
    </Box>
  );
};
