import React from "react";
import {
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useResourceParams,
  useBack,
} from "@refinedev/core";
import { Box, Heading, HStack, IconButton, Spinner } from "@chakra-ui/react";

// We use @tabler/icons for icons but you can use any icon library you want.
import { IconArrowLeft } from "@tabler/icons-react";

import { Breadcrumb, SaveButton, type SaveButtonProps } from "@components";
import type { CreateProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

export const Create: React.FC<CreateProps> = (props) => {
  const {
    children,
    saveButtonProps: saveButtonPropsFromProps,
    isLoading,
    resource: resourceFromProps,
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
  const getUserFriendlyName = useUserFriendlyName();
  const { resource, action, identifier } = useResourceParams();

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultFooterButtons = <SaveButton {...saveButtonProps} />;

  const buttonBack =
    goBackFromProps === (false || null) ? null : (
      <IconButton
        aria-label="back"
        variant="ghost"
        size="sm"
        onClick={
          action !== "list" || typeof action !== "undefined" ? back : undefined
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
          defaultButtons: null,
        })
      : headerButtonsFromProps
    : null;

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({
          defaultButtons: defaultFooterButtons,
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
          `${identifier}.titles.create`,
          `Create ${getUserFriendlyName(
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
        mt="8"
        {...footerButtonProps}
      >
        {footerButtons}
      </Box>
    </Box>
  );
};
