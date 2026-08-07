import React from "react";
import { useDataProvider } from "@refinedev/core";

import {
  dataProviderFromResource,
  removeRelationSuffix,
  toPlural,
  toSingular,
} from "../utilities";
import type {
  FieldInferencer,
  InferField,
  InferencerComponentProps,
  ResourceInferenceAttempt,
} from "../types";
import get from "lodash/get";
import { pickMeta } from "../utilities/get-meta-props";

type UseRelationFetchProps = {
  record?: Record<string, unknown>;
  fields?: (InferField | null | false)[];
  infer: FieldInferencer;
  meta?: InferencerComponentProps["meta"];
};

export const useRelationFetch = ({
  record,
  fields,
  infer,
  meta,
}: UseRelationFetchProps) => {
  const dataProvider = useDataProvider();

  const [updatedFields, setUpdatedFields] = React.useState<InferField[]>([]);

  const [initial, setInitial] = React.useState(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const resolver = React.useCallback(
    async (allFields: (InferField | false | null)[]) => {
      console.groupCollapsed(
        "@refinedev/inferencer is trying to detect relations",
      );
      const attempts: Array<ResourceInferenceAttempt> = [];
      setLoading(true);
      try {
        const promises = allFields.map(async (field) => {
          if (field && (field.relation || field.canRelation)) {
            if (record) {
              if (field.relationInfer) {
                return field;
              }
              const dataProviderName = dataProviderFromResource(field.resource);
              const dp = dataProvider(dataProviderName);

              const isMultiple = field.multiple;

              const requestId = Array.isArray(field.accessor)
                ? undefined
                : field.multiple
                  ? (record[field.key] as Array<unknown>).map((el) => {
                      return field.accessor ? get(el, field.accessor) : el;
                    })[0]
                  : field.accessor
                    ? get(record[field.key], field.accessor)
                    : record[field.key];

              if (requestId && field.resource) {
                try {
                  let record: Record<string, unknown> | undefined = {};

                  if (isMultiple && dp.getMany) {
                    const { data } = await dp.getMany({
                      resource: field.resource.name,
                      ids: [requestId],
                      meta: pickMeta(
                        field.resource?.identifier ?? field.resource?.name,
                        meta,
                        ["getMany"],
                      ),
                    });
                    record = data?.[0];
                  } else {
                    const { data } = await dp.getOne({
                      resource: field.resource.name,
                      id: requestId,
                      meta: pickMeta(
                        field.resource?.identifier ?? field.resource?.name,
                        meta,
                        isMultiple ? ["getMany", "getOne"] : ["getOne"],
                      ),
                    });
                    record = data;
                  }

                  attempts.push({
                    status: "success",
                    resource: field.resource.name,
                    field: field.key,
                  });

                  const relationInfer = infer("__", record, {}, infer);

                  return {
                    ...field,
                    relationInfer,
                  };
                } catch (error) {
                  attempts.push({
                    status: "error",
                    resource: field.resource.name,
                    field: field.key,
                  });
                  return {
                    ...field,
                    relationInfer: null,
                  };
                }
              }

              if (requestId) {
                let responseData;
                let isPlural;

                try {
                  let record: Record<string, unknown> | undefined = {};

                  if (isMultiple && dp.getMany) {
                    const { data } = await dp.getMany({
                      resource: toPlural(removeRelationSuffix(field.key)),
                      ids: [requestId],
                      meta: pickMeta(
                        toPlural(removeRelationSuffix(field.key)),
                        meta,
                        ["getMany"],
                      ),
                    });
                    record = data?.[0];
                  } else {
                    const { data } = await dp.getOne({
                      resource: toPlural(removeRelationSuffix(field.key)),
                      id: requestId,
                      meta: pickMeta(
                        toPlural(removeRelationSuffix(field.key)),
                        meta,
                        isMultiple ? ["getMany", "getOne"] : ["getOne"],
                      ),
                    });
                    record = data;
                  }

                  attempts.push({
                    status: "success",
                    resource: toPlural(removeRelationSuffix(field.key)),
                    field: field.key,
                  });

                  responseData = record;
                  isPlural = true;
                } catch (error) {
                  attempts.push({
                    status: "error",
                    resource: toPlural(removeRelationSuffix(field.key)),
                    field: field.key,
                  });

                  let record: Record<string, unknown> | undefined = {};

                  try {
                    if (isMultiple && dp.getMany) {
                      const { data } = await dp.getMany({
                        resource: toSingular(removeRelationSuffix(field.key)),
                        meta: pickMeta(
                          toSingular(removeRelationSuffix(field.key)),
                          meta,
                          ["getMany"],
                        ),
                        ids: [requestId],
                      });
                      record = data?.[0];
                    } else {
                      const { data } = await dp.getOne({
                        resource: toSingular(removeRelationSuffix(field.key)),
                        meta: pickMeta(
                          toSingular(removeRelationSuffix(field.key)),
                          meta,
                          isMultiple ? ["getMany", "getOne"] : ["getOne"],
                        ),
                        id: requestId,
                      });
                      record = data;
                    }

                    attempts.push({
                      status: "success",
                      resource: toSingular(removeRelationSuffix(field.key)),
                      field: field.key,
                    });

                    responseData = record;
                    isPlural = false;
                  } catch (error) {
                    attempts.push({
                      status: "error",
                      resource: toSingular(removeRelationSuffix(field.key)),
                      field: field.key,
                    });

                    return {
                      ...field,
                      relationInfer: null,
                    };
                  }
                }

                const relationInfer = infer("__", responseData, {}, infer);

                const resourceNameWithoutRelationSuffix = removeRelationSuffix(
                  field.key,
                );

                return {
                  ...field,
                  relation: true,
                  type: "relation",
                  resource: {
                    name: isPlural
                      ? toPlural(resourceNameWithoutRelationSuffix)
                      : toSingular(resourceNameWithoutRelationSuffix),
                  },
                  fieldable: false,
                  canRelation: undefined,
                  relationInfer,
                };
              }

              return {
                ...field,
                relationInfer: null,
              };
            }
          }
          return field;
        });

        const results = await Promise.all(promises);

        setUpdatedFields(results.filter((el) => el) as InferField[]);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
      setTimeout(() => {
        console.log(
          `Tried to detect relations with ${
            attempts.length
          } attempts and succeeded with ${
            attempts.filter((el) => el.status === "success").length
          } attempts.`,
        );
        console.groupEnd();

        console.info(
          "@refinedev/inferencer may send multiple requests to your API for nonexistent resources when trying to detect relations. To learn more about how the inferencer works, visit https://refine.dev/docs/packages/documentation/inferencer/#how-it-works",
        );
      }, 500);
    },
    [dataProvider, record],
  );

  React.useEffect(() => {
    setInitial(false);
    if (!loading && fields && fields.length > 0 && updatedFields.length === 0) {
      resolver(fields);
    }
  }, [resolver, loading, fields, resolver]);

  return {
    fields: updatedFields,
    loading,
    initial,
  };
};
