import React from "react";
import {
  useDataProvider,
  useResourceParams,
  useParsed,
  type BaseKey,
} from "@refinedev/core";

import { pickDataProvider, dataProviderFromResource } from "../utilities";
import type { InferencerComponentProps } from "../types";
import { pickMeta } from "../utilities/get-meta-props";

/**
 * This hook will handle the data fetching for the inferencer with `loading` and `initial` states.
 * Data provider functions will be used respectively for the `list`, `show` and `edit` types.
 */
export const useInferFetch = (
  type: "list" | "show" | "edit" | "create",
  resourceNameOrRouteName?: string,
  idFromProps?: string | number,
  meta?: InferencerComponentProps["meta"],
) => {
  const { resource, resources } = useResourceParams({
    resource: resourceNameOrRouteName,
  });

  const { id: idFromURL } = useParsed();

  const id = idFromProps ?? idFromURL;

  const dataProvider = useDataProvider();

  const [error, setError] = React.useState<string | undefined>(undefined);

  const [data, setData] = React.useState<Record<string, unknown> | undefined>(
    undefined,
  );
  const [datas, setDatas] = React.useState<
    Array<Record<string, unknown>> | undefined
  >(undefined);
  const [initial, setInitial] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const resolver = React.useCallback(
    async (recordItemId: BaseKey | undefined) => {
      const dataProviderName =
        dataProviderFromResource(resource) ??
        pickDataProvider(resource?.name, undefined, resources);
      const dp = dataProvider(dataProviderName);

      setLoading(true);
      setError(undefined);

      try {
        if (type === "list" || type === "create") {
          if (resource) {
            const response = await dp.getList({
              resource: resource?.name,
              meta: pickMeta(resource?.identifier ?? resource?.name, meta, [
                "getList",
              ]),
            });
            const r = response.data?.[0];

            if (!r) {
              setError(
                `<p>No records/data found for resource "${resource?.name}".</p>
                            <p>Please check your data provider and resource.</p>
                            <p>For more info, please check the <a href="https://refine.dev/docs/packages/documentation/inferencer/" target="_blank">documentation</a>.</p>`,
              );
            }
            setData(r);
            setDatas(response.data);
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }
        }
        if ((type === "edit" || type === "show") && recordItemId) {
          if (resource) {
            const response = await dp.getOne({
              resource: resource?.name,
              id: recordItemId,
              meta: pickMeta(resource?.identifier ?? resource?.name, meta, [
                "getOne",
              ]),
            });
            const r = response.data;
            if (!r) {
              setError(
                `<p>No records/data found for resource "${resource?.name}".</p>
                            <p>Please check your data provider and resource.</p>
                            <p>For more info, please check the <a href="https://refine.dev/docs/packages/documentation/inferencer/" target="_blank">documentation</a>.</p>`,
              );
            }
            setData(r);
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }
        }
      } catch (error) {
        console.warn(
          "An error occured while fetching the resource data. Please check the error message below:",
          error,
        );
        setError(
          `<p>Something went wrong while fetching the resource data.</p>
                    <p>Please check your data provider and API for resource "${resource?.name}".</p>
                    <p>For more info, please check the <a href="https://refine.dev/docs/packages/documentation/inferencer/" target="_blank">documentation</a>.</p>`,
        );
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    },
    [type, dataProvider, resource, resources],
  );

  React.useEffect(() => {
    setInitial(false);
    if (!loading && !data) {
      resolver(id);
    }
  }, [resolver, id]);

  return {
    data,
    datas,
    loading,
    initial,
    error,
  };
};
