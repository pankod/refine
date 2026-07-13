import React, { useEffect, useState } from "react";
import { useGo, useResourceParams, useTranslate } from "@refinedev/core";
import type { RefineErrorPageProps } from "@refinedev/ui-types";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import Info from "@mui/icons-material/Info";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const go = useGo();

  const { resource, action } = useResourceParams();

  const translate = useTranslate();

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
  }, [action, resource]);

  return (
    <Grid display="flex" justifyContent="center" alignItems="center" mt={20}>
      <Grid container direction="column" display="flex" alignItems="center">
        <Typography variant="h1">404</Typography>
        <Stack direction="row" spacing="2">
          <Typography>
            {translate(
              "pages.error.404",
              "Sorry, the page you visited does not exist.",
            )}
          </Typography>

          {errorMessage && (
            <Tooltip title={errorMessage}>
              <Info data-testid="error-component-tooltip" />
            </Tooltip>
          )}
        </Stack>
        <Button
          onClick={() => {
            go({ to: "/" });
          }}
        >
          {translate("pages.error.backHome", "Back Home")}
        </Button>
      </Grid>
    </Grid>
  );
};
