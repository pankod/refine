import React from "react";

import { Box, Spinner } from "@chakra-ui/react";

import type { CreateInferencerConfig } from "../../types";

export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
  () => {
    return (
      <Box position="relative" bg="chakra-body-bg" minH={120}>
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
    );
  };
