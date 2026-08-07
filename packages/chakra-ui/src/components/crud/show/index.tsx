import React from "react";
import {
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useResourceParams,
  useToPath,
  useBack,
  useGo,
} from "@refinedev/core";
import { Box, IconButton, HStack, Heading, Spinner } from "@chakra-ui/react";

// We use @tabler/icons for icons but you can use any icon library you want.
import { IconArrowLeft } from "@tabler/icons-react";

import {
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Breadcrumb,
  type ListButtonProps,
  type EditButtonProps,
  type DeleteButtonProps,
  type RefreshButtonProps,
} from "@components";
import type { ShowProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

export const Show: React.FC<ShowProps> = (props) => {
  const {
    children,
    resource: resourceFromProps,
    recordItemId,
    canDelete,
    deleteButtonProps: deleteButtonPropsFromProps,
    canEdit,
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
  } = props;
  const translate = useTranslate();
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();

  const back = useBack();
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();
  const {
    resource,
    identifier,
    action,
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
  const hasDelete =
    canDelete ?? (resource?.meta?.canDelete || deleteButtonPropsFromProps);

  const isDeleteButtonVisible = hasDelete && typeof id !== "undefined";

  const isEditButtonVisible =
    canEdit ?? resource?.meta?.canEdit ?? !!resource?.edit;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
      }
    : undefined;
  const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
    ? {
        colorScheme: "brand",
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
        recordItemId: id,
      }
    : undefined;
  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
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
    resource: identifier,
    recordItemId: id,
    dataProviderName,
  };

  const defaultHeaderButtons = (
    <>
      {listButtonProps && <ListButton {...listButtonProps} />}
      {isEditButtonVisible && (
        <EditButton colorScheme="brand" {...editButtonProps} />
      )}
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
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
          deleteButtonProps,
          editButtonProps,
          listButtonProps,
          refreshButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({ defaultButtons: null })
      : footerButtonsFromProps
    : null;

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
          `${identifier}.titles.show`,
          `Show ${getUserFriendlyName(
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
          <HStack>
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
