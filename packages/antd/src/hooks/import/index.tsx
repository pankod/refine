import React from "react";
import {
  type ButtonProps,
  notification,
  type UploadProps,
  Progress,
} from "antd";
import {
  useTranslate,
  useResourceParams,
  type BaseRecord,
  type HttpError,
  useImport as useImportCore,
  type UseImportReturnType,
  type ImportOptions,
} from "@refinedev/core";

/**
 * `useImport` hook allows you to handle your csv import logic easily.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/import/useImport} for more details.
 *
 * @typeParam TItem - Interface of parsed csv data
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useImport = <
  TItem = any,
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = any,
>({
  resource: resourceFromProp,
  mapData = (item) => item as unknown as TVariables,
  paparseOptions,
  batchSize = Number.MAX_SAFE_INTEGER,
  onFinish,
  meta,
  dataProviderName,
  onProgress: onProgressFromProp,
}: ImportOptions<TItem, TVariables, TData> = {}): Omit<
  UseImportReturnType<TData, TVariables, TError>,
  "handleChange" | "inputProps"
> & {
  uploadProps: UploadProps;
  buttonProps: ButtonProps;
} => {
  const t = useTranslate();

  const { resource } = useResourceParams({ resource: resourceFromProp });

  const { mutationResult, isLoading, handleChange } = useImportCore<
    TItem,
    TData,
    TError,
    TVariables
  >({
    resource: resource?.identifier ?? resource?.name,
    mapData,
    paparseOptions,
    batchSize,
    meta,
    dataProviderName,
    onFinish,
    onProgress:
      onProgressFromProp ??
      (({ totalAmount, processedAmount }) => {
        if (totalAmount > 0 && processedAmount > 0) {
          const description = (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "-7px",
              }}
            >
              <Progress
                type="circle"
                percent={Math.floor((processedAmount / totalAmount) * 100)}
                size={50}
                strokeColor="#1890ff"
                status="normal"
              />
              <span style={{ marginLeft: 8, width: "100%" }}>
                {t(
                  "notifications.importProgress",
                  {
                    processed: processedAmount,
                    total: totalAmount,
                  },
                  `Importing: ${processedAmount}/${totalAmount}`,
                )}
              </span>
            </div>
          );

          notification.open({
            description,
            message: null,
            key: `${resource}-import`,
            duration: 0,
          });

          if (processedAmount >= totalAmount) {
          }

          if (processedAmount === totalAmount) {
            setTimeout(() => {
              notification.destroy(`${resource}-import`);
            }, 4500);
          }
        }
      }),
  });

  return {
    uploadProps: {
      onChange: handleChange,
      beforeUpload: () => false,
      showUploadList: false,
      accept: ".csv",
    },
    buttonProps: {
      type: "default",
      loading: isLoading,
    },
    mutationResult,
    isLoading,
  };
};
