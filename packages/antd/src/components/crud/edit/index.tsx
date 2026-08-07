import React from "react";

import { Card, Space, Spin } from "antd";
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

import {
  DeleteButton,
  RefreshButton,
  ListButton,
  SaveButton,
  Breadcrumb,
  PageHeader,
  type ListButtonProps,
  type RefreshButtonProps,
  type DeleteButtonProps,
  type SaveButtonProps,
  AutoSaveIndicator,
} from "@components";
import type { EditProps } from "../types";

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/edit} for more details.
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
  dataProviderName,
  breadcrumb: breadcrumbFromProps,
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
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext();
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
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: identifier,
        mutationMode,
        onSuccess: () => {
          go({ to: goListPath });
        },
        recordItemId: id,
        dataProviderName,
        ...deleteButtonPropsFromProps,
      }
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
            `${identifier}.titles.edit`,
            `Edit ${getUserFriendlyName(
              resource?.meta?.label ?? identifier,
              "singular",
            )}`,
          )
        }
        extra={
          <Space wrap {...(headerButtonProps ?? {})}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultHeaderButtons,
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
            actions={[
              <Space
                key="footer-buttons"
                wrap
                style={{
                  float: "right",
                  marginRight: 24,
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
              </Space>,
            ]}
            {...(contentProps ?? {})}
          >
            {children}
          </Card>
        </Spin>
      </PageHeader>
    </div>
  );
};
