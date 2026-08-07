import React from "react";

import {
  useMutationMode,
  useTranslate,
  useUserFriendlyName,
  useToPath,
  useResourceParams,
  useBack,
  useGo,
} from "@refinedev/core";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { alpha } from "@mui/system";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  DeleteButton,
  RefreshButton,
  ListButton,
  SaveButton,
  Breadcrumb,
  type ListButtonProps,
  type RefreshButtonProps,
  type DeleteButtonProps,
  type SaveButtonProps,
  AutoSaveIndicator,
} from "@components";
import type { EditProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/edit} for more details.
 */
export const Edit: React.FC<EditProps> = ({
  title,
  saveButtonProps: saveButtonPropsFromProps,
  mutationMode: mutationModeProp,
  recordItemId,
  children,
  deleteButtonProps: deleteButtonPropsFromProps,
  canDelete,
  resource: resourceFromProps,
  isLoading = false,
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
  autoSaveProps,
}) => {
  const translate = useTranslate();
  const { mutationMode: mutationModeContext } = useMutationMode();
  const mutationMode = mutationModeProp ?? mutationModeContext;

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
  const isDeleteButtonVisible =
    canDelete ?? (resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
      }
    : undefined;

  const refreshButtonProps: RefreshButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    resource: identifier,
    recordItemId: id,
    dataProviderName,
  };

  const defaultHeaderButtons = (
    <Box display="flex" flexDirection="row" alignItems="center">
      {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
      {hasList && <ListButton {...listButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </Box>
  );

  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? ({
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
        mutationMode,
        variant: "outlined",
        onSuccess: () => {
          go({ to: goListPath });
        },
        recordItemId: id,
        dataProviderName,
        ...deleteButtonPropsFromProps,
      } as const)
    : undefined;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultFooterButtons = (
    <>
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <SaveButton {...saveButtonProps} />
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
                `${identifier}.titles.edit`,
                `Edit ${getUserFriendlyName(
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
                deleteButtonProps,
                saveButtonProps,
              })
            : footerButtons
          : defaultFooterButtons}
      </CardActions>
    </Card>
  );
};
