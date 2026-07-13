import React from "react";

import {
  useTranslate,
  useUserFriendlyName,
  useBack,
  useResourceParams,
} from "@refinedev/core";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { alpha } from "@mui/system";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Breadcrumb, SaveButton, type SaveButtonProps } from "@components";
import type { CreateProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/create} for more details.
 */
export const Create: React.FC<CreateProps> = ({
  title,
  children,
  saveButtonProps: saveButtonPropsFromProps,
  resource: resourceFromProps,
  isLoading = false,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
  footerButtonProps,
  footerButtons,
  goBack: goBackFromProps,
}) => {
  const translate = useTranslate();
  const back = useBack();
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, action, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const breadcrumb = breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultFooterButtons = <SaveButton {...saveButtonProps} />;

  return (
    <Card
      {...(wrapperProps ?? {})}
      sx={{
        position: "relative",
        ...wrapperProps?.sx,
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            // this is needed to support custom themes, dark mode etc.
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.4),
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {breadcrumbComponent}
      <CardHeader
        sx={{
          display: "flex",
          flexWrap: "wrap",
          ".MuiCardHeader-action": {
            margin: 0,
            alignSelf: "center",
          },
        }}
        title={
          title ?? (
            <Typography
              variant="h5"
              className={RefinePageHeaderClassNames.Title}
            >
              {translate(
                `${identifier}.titles.create`,
                `Create ${getUserFriendlyName(
                  resource?.meta?.label ?? identifier,
                  "singular",
                )}`,
              )}
            </Typography>
          )
        }
        avatar={
          typeof goBackFromProps !== "undefined" ? (
            goBackFromProps
          ) : (
            <IconButton
              onClick={
                action !== "list" || typeof action !== "undefined"
                  ? back
                  : undefined
              }
            >
              <ArrowBackIcon />
            </IconButton>
          )
        }
        action={
          headerButtons ? (
            <Box display="flex" gap="16px" {...(headerButtonProps ?? {})}>
              {headerButtons
                ? typeof headerButtons === "function"
                  ? headerButtons({
                      defaultButtons: null,
                    })
                  : headerButtons
                : null}
            </Box>
          ) : undefined
        }
        {...(headerProps ?? {})}
      />
      <CardContent {...(contentProps ?? {})}>{children}</CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          padding: "16px",
        }}
        {...(footerButtonProps ?? {})}
      >
        {footerButtons
          ? typeof footerButtons === "function"
            ? footerButtons({
                defaultButtons: defaultFooterButtons,
                saveButtonProps,
              })
            : footerButtons
          : defaultFooterButtons}
      </CardActions>
    </Card>
  );
};
