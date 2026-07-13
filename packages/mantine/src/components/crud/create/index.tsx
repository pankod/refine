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
  useRefineContext,
  useResourceParams,
  useUserFriendlyName,
  useTranslate,
} from "@refinedev/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { SaveButton, Breadcrumb, type SaveButtonProps } from "@components";
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

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const loadingOverlayVisible = isLoading ?? saveButtonProps?.disabled ?? false;

  const defaultFooterButtons = <SaveButton {...saveButtonProps} />;

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

  return (
    <Card p="md" {...wrapperProps}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      <Group position="apart" align="center" {...headerProps}>
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
                  `${identifier}.titles.create`,
                  `Create ${getUserFriendlyName(
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
