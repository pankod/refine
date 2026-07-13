import { useEffect, useState } from "react";

import chunk from "lodash/chunk";
import papaparse from "papaparse";

import { importCSVMapper, sequentialPromises } from "@definitions";
import { useCreate, useCreateMany, useMeta, useResourceParams } from "@hooks";

import type {
  BaseRecord,
  HttpError,
  MetaQuery,
} from "../../contexts/data/types";
import type { UseCreateReturnType } from "../../hooks/data/useCreate";
import type { UseCreateManyReturnType } from "../../hooks/data/useCreateMany";
import type { MapDataFn } from "../export/types";

export type ImportSuccessResult<TVariables, TData> = {
  request: TVariables[];
  type: "success";
  response: TData[];
};

export type ImportErrorResult<TVariables> = {
  request: TVariables[];
  type: "error";
  response: HttpError[];
};

export type OnFinishParams<TVariables, TData> = {
  succeeded: ImportSuccessResult<TVariables, TData>[];
  errored: ImportErrorResult<TVariables>[];
};

export type OnProgressParams = {
  totalAmount: number;
  processedAmount: number;
};

export type ImportOptions<
  TItem,
  TVariables = any,
  TData extends BaseRecord = BaseRecord,
> = {
  /**
   * Resource name for API data interactions.
   * @default Resource name that it reads from route
   */
  resource?: string;
  /**
   * A mapping function that runs for every record. Mapped data will be included in the file contents.
   */
  mapData?: MapDataFn<TItem, TVariables>;
  /**
   * Custom Papa Parse options.
   * @type [`ParseConfig`](https://www.papaparse.com/docs)
   */
  paparseOptions?: papaparse.ParseConfig;
  /**
   * Requests batch size. If it is 1, all records are sent one by one. By default, it is [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) to send all records in one batch. If it is more than 1, `createMany` should be implemented on DataProvider.
   */
  batchSize?: number;
  /**
   * Called with errors and successful responses when all requests are sent.
   */
  onFinish?: (results: OnFinishParams<TVariables, TData>) => void;
  /**
   *  Metadata query for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   *  Metadata query for `dataProvider`
  /**
   *  A callback function that returns a current state of uploading process.
   *
   *  Ex: `percentage = onProgressParams.processedAmount / onProgressParams.totalAmount * 100`
   */
  onProgress?: (onProgressParams: OnProgressParams) => void;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
};

export type CreatedValuesType<TVariables, TData> =
  | ImportSuccessResult<TVariables, TData>
  | ImportErrorResult<TVariables>;

export type HandleChangeType<TVariables, TData> = (onChangeParams: {
  file: Partial<File>;
}) => Promise<CreatedValuesType<TVariables, TData>[]>;

export type UseImportInputPropsType = {
  type: "file";
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type UseImportReturnType<
  TData extends BaseRecord = BaseRecord,
  TVariables = {},
  TError extends HttpError = HttpError,
> = {
  inputProps: UseImportInputPropsType;
  mutationResult:
    | UseCreateReturnType<TData, TError, TVariables>
    | UseCreateManyReturnType<TData, TError, TVariables>;
  isLoading: boolean;
  handleChange: HandleChangeType<TVariables, TData>;
};

/**
 * `useImport` hook allows you to handle your csv import logic easily.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/import-export/useImport} for more details.
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
  resource: resourceFromProps,
  mapData = (item) => item as unknown as TVariables,
  paparseOptions,
  batchSize = Number.MAX_SAFE_INTEGER,
  onFinish,
  meta,
  onProgress,
  dataProviderName,
}: ImportOptions<TItem, TVariables, TData> = {}): UseImportReturnType<
  TData,
  TVariables,
  TError
> => {
  const [processedAmount, setProcessedAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const getMeta = useMeta();

  const createMany = useCreateMany<TData, TError, TVariables>();
  const create = useCreate<TData, TError, TVariables>();

  const combinedMeta = getMeta({
    resource,
    meta: meta,
  });

  let mutationResult:
    | UseCreateReturnType<TData, TError, TVariables>
    | UseCreateManyReturnType<TData, TError, TVariables>;

  if (batchSize === 1) {
    mutationResult = create;
  } else {
    mutationResult = createMany;
  }

  const handleCleanup = () => {
    setTotalAmount(0);
    setProcessedAmount(0);
    setIsLoading(false);
  };

  const handleFinish = (
    createdValues: CreatedValuesType<TVariables, TData>[],
  ) => {
    const result = {
      succeeded: createdValues.filter(
        (item) => item.type === "success",
      ) as unknown as ImportSuccessResult<TVariables, TData>[],
      errored: createdValues.filter(
        (item) => item.type === "error",
      ) as unknown as ImportErrorResult<TVariables>[],
    };

    onFinish?.(result);
    setIsLoading(false);
  };

  useEffect(() => {
    onProgress?.({ totalAmount, processedAmount });
  }, [totalAmount, processedAmount]);

  const handleChange: HandleChangeType<TVariables, TData> = ({ file }) => {
    handleCleanup();
    return new Promise<CreatedValuesType<TVariables, TData>[]>((resolve) => {
      setIsLoading(true);
      papaparse.parse(file as any, {
        complete: async ({ data }: { data: unknown[][] }) => {
          const values = importCSVMapper(data, mapData);

          setTotalAmount(values.length);

          if (batchSize === 1) {
            // Create Processor Functions
            const valueFns = values.map((value) => {
              const fn = async () => {
                const response = await create.mutateAsync({
                  resource: identifier ?? "",
                  values: value,
                  successNotification: false,
                  errorNotification: false,
                  dataProviderName,
                  meta: combinedMeta,
                });

                return { response, value };
              };
              return fn;
            });
            // Sequentially run processor functions and process resolves/rejects
            const createdValues = await sequentialPromises(
              valueFns,
              ({ response, value }) => {
                setProcessedAmount((currentAmount) => {
                  return currentAmount + 1;
                });

                return {
                  response: [response.data],
                  type: "success",
                  request: [value],
                } as ImportSuccessResult<TVariables, TData>;
              },
              (error: HttpError, index) => {
                return {
                  response: [error],
                  type: "error",
                  request: [values[index]],
                } as ImportErrorResult<TVariables>;
              },
            );
            // Resolve with created values
            resolve(createdValues);
          } else {
            // Create Chunks
            const chunks = chunk(values, batchSize);
            // Create Chunk Processor Functions
            const chunkedFns = chunks.map((chunkedValues) => {
              const fn = async () => {
                const response = await createMany.mutateAsync({
                  resource: identifier ?? "",
                  values: chunkedValues,
                  successNotification: false,
                  errorNotification: false,
                  dataProviderName,
                  meta: combinedMeta,
                });

                return {
                  response,
                  value: chunkedValues,
                  currentBatchLength: chunkedValues.length,
                };
              };

              return fn;
            });
            // Sequentially run chunked functions and process resolves/rejects
            const createdValues = await sequentialPromises(
              chunkedFns,
              ({ response, currentBatchLength, value }) => {
                setProcessedAmount((currentAmount) => {
                  return currentAmount + currentBatchLength;
                });

                return {
                  response: response.data,
                  type: "success",
                  request: value,
                } as ImportSuccessResult<TVariables, TData>;
              },
              (error: HttpError, index) => {
                return {
                  response: [error],
                  type: "error",
                  request: chunks[index],
                } as ImportErrorResult<TVariables>;
              },
            );
            // resolve with all created values
            resolve(createdValues);
          }
        },

        ...paparseOptions,
      });
    }).then((createdValues) => {
      handleFinish(createdValues);
      return createdValues;
    });
  };

  return {
    inputProps: {
      type: "file",
      accept: ".csv",
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          handleChange({ file: event.target.files[0] });
        }
      },
    },
    mutationResult,
    isLoading,
    handleChange,
  };
};
