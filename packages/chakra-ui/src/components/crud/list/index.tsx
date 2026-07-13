import React from "react";
import {
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useResourceParams,
} from "@refinedev/core";

import { Box, Heading } from "@chakra-ui/react";

import { CreateButton, Breadcrumb, type CreateButtonProps } from "@components";
import type { ListProps } from "../types";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

export const List: React.FC<ListProps> = (props) => {
  const {
    canCreate,
    children,
    createButtonProps: createButtonPropsFromProps,
    resource: resourceFromProps,
    wrapperProps,
    contentProps,
    headerProps,
    headerButtonProps,
    headerButtons: headerButtonsFromProps,
    breadcrumb: breadcrumbFromProps,
    title,
  } = props;
  const translate = useTranslate();
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const isCreateButtonVisible =
    canCreate ?? (!!resource?.create || createButtonPropsFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? {
        resource: identifier,
        ...createButtonPropsFromProps,
      }
    : undefined;

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  const headerButtons = headerButtonsFromProps
    ? typeof headerButtonsFromProps === "function"
      ? headerButtonsFromProps({
          defaultButtons: defaultHeaderButtons,
          createButtonProps,
        })
      : headerButtonsFromProps
    : defaultHeaderButtons;

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
          `${identifier}.titles.list`,
          getUserFriendlyName(resource?.meta?.label ?? identifier, "plural"),
        )}
      </Heading>
    );
  };

  return (
    <Box bg="chakra-body-bg" borderRadius="md" px="4" py="3" {...wrapperProps}>
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
          {renderTitle()}
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
      <Box {...contentProps}>{children}</Box>
    </Box>
  );
};
