import React from "react";

import {
  useTranslate,
  useUserFriendlyName,
  useResourceParams,
} from "@refinedev/core";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { CreateButton, Breadcrumb, type CreateButtonProps } from "@components";

import type { ListProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const List: React.FC<ListProps> = ({
  title,
  canCreate,
  children,
  createButtonProps: createButtonPropsFromProps,
  resource: resourceFromProps,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
}) => {
  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const isCreateButtonVisible =
    canCreate ?? (!!resource?.create || createButtonPropsFromProps);

  const breadcrumb = breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />;

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? {
        resource: identifier,
        ...createButtonPropsFromProps,
      }
    : undefined;

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  return (
    <Card {...(wrapperProps ?? {})}>
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
                `${identifier}.titles.list`,
                getUserFriendlyName(
                  resource?.meta?.label ?? identifier,
                  "plural",
                ),
              )}
            </Typography>
          )
        }
        action={
          <Box display="flex" gap="16px" {...headerButtonProps}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultHeaderButtons,
                    createButtonProps,
                  })
                : headerButtons
              : defaultHeaderButtons}
          </Box>
        }
        {...(headerProps ?? {})}
      />
      <CardContent {...(contentProps ?? {})}>{children}</CardContent>
    </Card>
  );
};
