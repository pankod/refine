import { useState } from "react";

import papaparse from "papaparse";
import warnOnce from "warn-once";

import {
  downloadInBrowser,
  pickDataProvider,
  useUserFriendlyName,
} from "@definitions";
import { useDataProvider, useMeta, useResourceParams } from "@hooks";

import type {
  BaseRecord,
  CrudFilter,
  CrudSort,
  MetaQuery,
} from "../../contexts/data/types";
import type { MapDataFn } from "./types";

type UseExportOptionsType<
  TData extends BaseRecord = BaseRecord,
  TVariables = any,
> = {
  /**
   * Resource name for API data interactions
   * @default Resource name that it reads from route
   */
  resource?: string;
  /**
   * A mapping function that runs for every record. Mapped data will be included in the file contents
   */
  mapData?: MapDataFn<TData, TVariables>;
  /**
   *  Sorts records
   */
  sorters?: CrudSort[];
  /**
   *  Filters records
   */
  filters?: CrudFilter[];
  maxItemCount?: number;
  /**
   *  Requests to fetch data are made as batches by page size. By default, it is 20. Used for `getList` method of `DataProvider`
   */
  pageSize?: number;
  /**
   *  Used for exporting options
   *  @type [UnparseConfig](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/papaparse)
   */
  unparseConfig?: papaparse.UnparseConfig;
  /**
   *  Metadata query for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  /**
   *  Callback to handle error events of this hook
   */
  onError?: (error: any) => void;
  /**
   *  Whether to generate download of the CSV in browser environments, defaults to true.
   */
  download?: boolean;
  /**
   * Custom filename for the export file
   */
  filename?: string;
  /**
   * Whether to use text file format instead of CSV
   * @default false
   */
  useTextFile?: boolean;
  /**
   * Whether to include BOM (Byte Order Mark) in the file
   * @default true
   */
  useBom?: boolean;
  /**
   * Title to be shown at the top of the exported file
   */
  title?: string;
  /**
   * Whether to show the title in the exported file
   * @default false
   */
  showTitle?: boolean;
};

type UseExportReturnType = {
  isLoading: boolean;
  triggerExport: () => Promise<string | undefined>;
};

/**
 * `useExport` hook allows you to make your resources exportable.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/import-export/useExport} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TVariables - Values for params.
 *
 */
export const useExport = <
  TData extends BaseRecord = BaseRecord,
  TVariables = any,
>({
  resource: resourceFromProps,
  sorters,
  filters,
  maxItemCount,
  pageSize = 20,
  mapData = (item) => item as any,
  unparseConfig,
  meta,
  dataProviderName,
  onError,
  download,
  filename: customFilename,
  useTextFile = false,
  useBom = true,
  title = "My Generated Report",
  showTitle = false,
}: UseExportOptionsType<TData, TVariables> = {}): UseExportReturnType => {
  const [isLoading, setIsLoading] = useState(false);

  const dataProvider = useDataProvider();
  const getMeta = useMeta();
  const { resource, resources, identifier } = useResourceParams({
    resource: resourceFromProps,
  });
  const getFriendlyName = useUserFriendlyName();

  const defaultFilename = `${getFriendlyName(
    identifier,
    "plural",
  )}-${new Date().toLocaleString()}`;

  const filename = customFilename ?? defaultFilename;

  const { getList } = dataProvider(
    pickDataProvider(identifier, dataProviderName, resources),
  );

  const combinedMeta = getMeta({
    resource,
    meta: meta,
  });

  const triggerExport = async () => {
    setIsLoading(true);

    let rawData: BaseRecord[] = [];

    let currentPage = 1;
    let preparingData = true;
    while (preparingData) {
      try {
        const { data, total } = await getList<TData>({
          resource: resource?.name ?? "",
          filters,
          sorters: sorters ?? [],
          pagination: {
            currentPage,
            pageSize,
            mode: "server",
          },
          meta: combinedMeta,
        });

        currentPage++;

        rawData.push(...data);

        if (maxItemCount && rawData.length >= maxItemCount) {
          rawData = rawData.slice(0, maxItemCount);
          preparingData = false;
        }

        if (total === rawData.length) {
          preparingData = false;
        }
      } catch (error) {
        setIsLoading(false);
        preparingData = false;

        onError?.(error);

        return;
      }
    }

    // Use provided unparseConfig or create default one
    const finalUnparseConfig: papaparse.UnparseConfig = {
      // Default settings for better compatibility
      quotes: true,
      header: true,
      ...unparseConfig,
    };

    let csv = papaparse.unparse(
      rawData.map(mapData as any),
      finalUnparseConfig,
    );
    if (showTitle) {
      csv = `${title}\r\n\n${csv}`;
    }

    if (typeof window !== "undefined" && csv.length > 0 && (download ?? true)) {
      const fileExtension = useTextFile ? ".txt" : ".csv";
      const fileType = `text/${useTextFile ? "plain" : "csv"};charset=utf8;`;
      const downloadFilename = `${filename.replace(/ /g, "_")}${fileExtension}`;

      downloadInBrowser(
        downloadFilename,
        `${useBom ? "\ufeff" : ""}${csv}`,
        fileType,
      );
    }

    setIsLoading(false);
    return csv;
  };

  return {
    isLoading,
    triggerExport,
  };
};
