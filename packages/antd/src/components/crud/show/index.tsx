import React from "react";
import { Card, Space, Spin } from "antd";
import {
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useResourceParams,
  useToPath,
  useBack,
  useGo,
} from "@refinedev/core";

import {
  EditButton,
  DeleteButton,
  RefreshButton,
  ListButton,
  Breadcrumb,
  PageHeader,
  type ListButtonProps,
  type EditButtonProps,
  type DeleteButtonProps,
  type RefreshButtonProps,
} from "@components";
import type { ShowProps } from "../types";

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/show} for more details.
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
  dataProviderName,
  breadcrumb: breadcrumbFromProps,
  contentProps,
  headerProps,
  wrapperProps,
  headerButtons,
  footerButtons,
  footerButtonProps,
  headerButtonProps,
  goBack: goBackFromProps,
}) => {
  const translate = useTranslate();
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();

  const back = useBack();
  const go = useGo();
  const getUserFriendlyName = useUserFriendlyName();

  const {
    resource,
    action,
    id: idFromParams,
    identifier,
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

  const isEditButtonVisible = canEdit ?? !!resource?.edit;

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        resource: identifier,
      }
    : undefined;
  const editButtonProps: EditButtonProps | undefined = isEditButtonVisible
    ? {
        ...(isLoading ? { disabled: true } : {}),
        type: "primary",
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
      {hasList && <ListButton {...listButtonProps} />}
      {isEditButtonVisible && <EditButton {...editButtonProps} />}
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </>
  );

  return (
    <div {...(wrapperProps ?? {})}>
      <PageHeader
        backIcon={goBackFromProps}
        onBack={
          action !== "list" && typeof action !== "undefined" ? back : undefined
        }
        title={
          title ??
          translate(
            `${identifier}.titles.show`,
            `Show ${getUserFriendlyName(
              resource?.meta?.label ?? identifier,
              "singular",
            )}`,
          )
        }
        extra={
          <Space key="extra-buttons" wrap {...(headerButtonProps ?? {})}>
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
          </Space>
        }
        breadcrumb={
          typeof breadcrumb !== "undefined" ? <>{breadcrumb}</> : <Breadcrumb />
        }
        {...(headerProps ?? {})}
      >
        <Spin spinning={isLoading}>
          <Card
            variant="borderless"
            actions={
              footerButtons
                ? [
                    <Space key="footer-buttons" wrap {...footerButtonProps}>
                      {typeof footerButtons === "function"
                        ? footerButtons({
                            defaultButtons: null,
                          })
                        : footerButtons}
                    </Space>,
                  ]
                : undefined
            }
            {...(contentProps ?? {})}
          >
            {children}
          </Card>
        </Spin>
      </PageHeader>
    </div>
  );
};
