import React from "react";
import {
  Box,
  Card,
  Group,
  ActionIcon,
  Stack,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import {
  useBack,
  useGo,
  useMutationMode,
  useRefineContext,
  useUserFriendlyName,
  useToPath,
  useTranslate,
  useResourceParams,
} from "@refinedev/core";
import { IconArrowLeft } from "@tabler/icons-react";
import {
  DeleteButton,
  ListButton,
  RefreshButton,
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

export const Edit: React.FC<EditProps> = (props) => {
  const {
    children,
    resource: resourceFromProps,
    recordItemId,
    deleteButtonProps: deleteButtonPropsFromProps,
    mutationMode: mutationModeFromProps,
    saveButtonProps: saveButtonPropsFromProps,
    canDelete,
    dataProviderName,
    isLoading,
    footerButtons: footerButtonsFromProps,
    footerButtonProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
    wrapperProps,
    contentProps,
    headerProps,
    goBack: goBackFromProps,
    breadcrumb: breadcrumbFromProps,
    title,
    autoSaveProps,
  } = props;
  const translate = useTranslate();
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();
  const { mutationMode: mutationModeContext } = useMutationMode();
  const mutationMode = mutationModeFromProps ?? mutationModeContext;

  const back = useBack();
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();

  const {
    resource,
    identifier,
    id: idFromParams,
  } = useResourceParams({
    resource: resourceFromProps,
  });

  const goListPath = useToPath({
    resource,
    action: "list",
  });

  const id = recordItemId ?? idFromParams;

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const hasList = resource?.list && !recordItemId;

  const isDeleteButtonVisible =
    canDelete ?? (resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />;

  const loadingOverlayVisible =
    isLoading ?? saveButtonPropsFromProps?.disabled ?? false;

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

  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? ({
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
        mutationMode,
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

  const defaultHeaderButtons = (
    <>
      {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
      {hasList && <ListButton {...listButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </>
  );

  const defaultFooterButtons = (
    <>
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <SaveButton {...saveButtonProps} />
    </>
  );

  const buttonBack =
    goBackFromProps === (false || null) ? null : (
      <ActionIcon onClick={back}>
        {typeof goBackFromProps !== "undefined" ? (
          goBackFromProps
        ) : (
          <IconArrowLeft />
        )}
      </ActionIcon>
    );

  const headerButtons = headerButtonsFromProps
    ? typeof headerButtonsFromProps === "function"
      ? headerButtonsFromProps({
          defaultButtons: defaultHeaderButtons,
          listButtonProps,
          refreshButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({
          defaultButtons: defaultFooterButtons,
          deleteButtonProps,
          saveButtonProps,
        })
      : footerButtonsFromProps
    : defaultFooterButtons;

  return (
    <Card p="md" {...wrapperProps}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      <Group position="apart" {...headerProps}>
        <Stack spacing="xs">
          {breadcrumbComponent}
          <Group spacing="xs">
            {buttonBack}
            {title ?? (
              <Title
                order={3}
                transform="capitalize"
                className={RefinePageHeaderClassNames.Title}
              >
                {translate(
                  `${identifier}.titles.edit`,
                  `Edit ${getUserFriendlyName(
                    resource?.meta?.label ?? identifier,
                    "singular",
                  )}`,
                )}
              </Title>
            )}
          </Group>
        </Stack>
        <Group spacing="xs" {...headerButtonProps}>
          {headerButtons}
        </Group>
      </Group>
      <Box pt="sm" {...contentProps}>
        {children}
      </Box>
      <Group position="right" spacing="xs" mt="md" {...footerButtonProps}>
        {footerButtons}
      </Group>
    </Card>
  );
};
