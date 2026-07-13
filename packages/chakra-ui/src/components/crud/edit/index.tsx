import React from "react";

import {
  useMutationMode,
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useBack,
  useResourceParams,
  useGo,
  useToPath,
} from "@refinedev/core";

import { Box, Heading, HStack, IconButton, Spinner } from "@chakra-ui/react";

// We use @tabler/icons for icons but you can use any icon library you want.
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
    action,
    id: idFromParams,
    identifier,
  } = useResourceParams({ resource: resourceFromProps });

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
    canDelete ?? (!!resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
      }
    : undefined;

  const refreshButtonProps: RefreshButtonProps | undefined = {
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
    <Box display="flex" flexDirection="row" alignItems="center" gap="2">
      {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
      {hasList && <ListButton {...listButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </Box>
  );

  const defaultFooterButtons = (
    <>
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <SaveButton {...saveButtonProps} />
    </>
  );

  const buttonBack =
    goBackFromProps === (false || null) ? null : (
      <IconButton
        aria-label="back"
        variant="ghost"
        size="sm"
        onClick={
          action !== "list" && typeof action !== "undefined" ? back : undefined
        }
      >
        {typeof goBackFromProps !== "undefined" ? (
          goBackFromProps
        ) : (
          <IconArrowLeft />
        )}
      </IconButton>
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

  const renderTitle = () => {
    if (title === false) return null;

    if (title) {
      if (typeof title === "string" || typeof title === "number") {
        return (
          <Heading
            as="h3"
            size="lg"
            className={RefinePageHeaderClassNames.Title}
          >
            {title}
          </Heading>
        );
      }

      return title;
    }

    return (
      <Heading as="h3" size="lg" className={RefinePageHeaderClassNames.Title}>
        {translate(
          `${identifier}.titles.edit`,
          `Edit ${getUserFriendlyName(
            resource?.meta?.label ?? identifier,
            "singular",
          )}`,
        )}
      </Heading>
    );
  };

  return (
    <Box
      position="relative"
      bg="chakra-body-bg"
      borderRadius="md"
      px="4"
      py="3"
      {...wrapperProps}
    >
      {isLoading && (
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
      <Box
        mb="3"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        gap="3"
        {...headerProps}
      >
        <Box minW={200}>
          {typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</>
          ) : (
            <Breadcrumb />
          )}
          <HStack spacing={2}>
            {buttonBack}
            {renderTitle()}
          </HStack>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "flex-start", md: "flex-end" }}
          gap="2"
          {...headerButtonProps}
        >
          {headerButtons}
        </Box>
      </Box>
      <Box opacity={isLoading ? 0.5 : undefined} {...contentProps}>
        {children}
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        gap="2"
        mt={8}
        {...footerButtonProps}
      >
        {footerButtons}
      </Box>
    </Box>
  );
};
