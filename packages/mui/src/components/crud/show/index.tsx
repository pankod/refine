import React from "react";
import {
  useTranslate,
  useUserFriendlyName,
  useBack,
  useGo,
  useResourceParams,
  useToPath,
} from "@refinedev/core";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { alpha } from "@mui/system";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  DeleteButton,
  RefreshButton,
  ListButton,
  EditButton,
  Breadcrumb,
  type ListButtonProps,
  type EditButtonProps,
  type DeleteButtonProps,
  type RefreshButtonProps,
} from "@components";
import type { ShowProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/show} for more details.
 */
export const Show: React.FC<ShowProps> = ({
  title,
  canEdit,
  canDelete,
  deleteButtonProps: deleteButtonPropsFromProps,
  isLoading = false,
  children,
  resource: resourceFromProps,
  recordItemId,
  breadcrumb: breadcrumbFromProps,
  dataProviderName,
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
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();

  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResourceParams({ resource: resourceFromProps, id: recordItemId });

  const goListPath = useToPath({
    resource,
    action: "list",
  });

  const id = recordItemId ?? idFromParams;

  const breadcrumb = breadcrumbFromProps;

  const hasList = resource?.list && !recordItemId;
  const hasDelete =
    canDelete ?? (resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const isDeleteButtonVisible = hasDelete && typeof id !== "undefined";

  const isEditButtonVisible =
    canEdit ?? resource?.meta?.canEdit ?? !!resource?.edit;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier ?? resource?.name,
      }
    : undefined;
  const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier ?? resource?.name,
        recordItemId: id,
      }
    : undefined;
  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier ?? resource?.name,
        recordItemId: id,
        onSuccess: () => {
          go({ to: goListPath });
        },
        dataProviderName,
        ...deleteButtonPropsFromProps,
      }
    : undefined;
  const refreshButtonProps: RefreshButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    resource: identifier ?? resource?.name,
    recordItemId: id,
    dataProviderName,
  };

  const defaultHeaderButtons = (
    <>
      {hasList && <ListButton {...listButtonProps} />}
      {isEditButtonVisible && <EditButton {...editButtonProps} />}
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </>
  );

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
                `${identifier}.titles.show`,
                `Show ${getUserFriendlyName(
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
                action !== "list" && typeof action !== "undefined"
                  ? back
                  : undefined
              }
            >
              <ArrowBackIcon />
            </IconButton>
          )
        }
        action={
          <Box display="flex" gap="16px" {...(headerButtonProps ?? {})}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultHeaderButtons,
                    deleteButtonProps,
                    editButtonProps,
                    listButtonProps,
                    refreshButtonProps,
                  })
                : headerButtons
              : defaultHeaderButtons}
          </Box>
        }
        {...(headerProps ?? {})}
      />
      <CardContent {...(contentProps ?? {})}>{children}</CardContent>
      <CardActions sx={{ padding: "16px" }} {...(footerButtonProps ?? {})}>
        {footerButtons
          ? typeof footerButtons === "function"
            ? footerButtons({ defaultButtons: null })
            : footerButtons
          : null}
      </CardActions>
    </Card>
  );
};
