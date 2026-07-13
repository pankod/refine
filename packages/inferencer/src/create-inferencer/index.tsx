import React, { useContext } from "react";
import { useResourceParams, TranslationContext } from "@refinedev/core";

import type {
  CreateInferencer,
  InferencerComponentProps,
  InferencerResultComponent,
  InferField,
} from "../types";

import { composeInferencers } from "../compose-inferencers";
import { composeTransformers } from "../compose-transformers";

import { defaultElements } from "../field-inferencers";
import { defaultTransformers } from "../field-transformers";
import { LiveComponent } from "../components";
import { useInferFetch } from "../use-infer-fetch";
import { useRelationFetch } from "../use-relation-fetch";

import { prepareLiveCode, componentName, removeHiddenCode } from "../utilities";

/**
 * CreateInferencer is a function that creates a Inferencer component.
 *
 * Inferencer will handle the data fetching and the infering parts,
 * then it will invoke the `renderer` function to generate the code.
 * The generated code will be used to render the component by `react-live`.
 * Its required to havee`additionalScope` prop when using packages other than `react` and `@refinedev/core`.
 *
 * @param config - Inferencer configuration.
 * @param config.type - Infering type.
 * @param config.additionalScope - Additional scope for live code.
 * @param config.renderer - String renderer for Inferencer.
 * @param config.fieldTransformers - Field transformers.
 * @param config.customElements - Field inferencers.
 * @param config.codeViewerComponent - Code viewer component.
 * @param config.errorComponent - Error component.
 * @param config.loadingComponent - Loading component.
 */
export const createInferencer: CreateInferencer = ({
  type,
  additionalScope = [],
  customElements = [],
  fieldTransformers = [],
  renderer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  codeViewerComponent: CodeViewerComponent,
}) => {
  const infer = composeInferencers([...defaultElements, ...customElements]);
  const transform = composeTransformers([
    ...defaultTransformers,
    ...fieldTransformers,
  ]);

  const Inferencer = ({
    resourceName,
    fieldTransformer,
    hideCodeViewerInProduction,
    meta,
    id,
  }: {
    resourceName?: string;
    hideCodeViewerInProduction?: boolean;
    fieldTransformer?: InferencerComponentProps["fieldTransformer"];
    meta?: InferencerComponentProps["meta"];
    id?: string | number;
  }) => {
    const { resource, resources } = useResourceParams({
      resource: resourceName,
    });
    const { i18nProvider } = useContext(TranslationContext);

    const { resource: resourceFromURL } = useResourceParams();

    const {
      data: record,
      datas: records,
      loading: recordLoading,
      initial: isInitialLoad,
      error: inferError,
    } = useInferFetch(type, resourceName ?? resource?.name, id, meta);

    const inferSingleField = (
      key: string,
      value: any,
      record: Record<string, unknown>,
    ) => {
      const inferResult = infer(key, value, record, infer, type);

      if (inferResult) {
        if (resource) {
          const transformed = transform(
            [inferResult] as InferField[],
            resources,
            resource,
            record,
            infer,
            type,
          );

          const customTransformedFields = fieldTransformer
            ? transformed.flatMap((field) => {
                const result = fieldTransformer(field);

                return result ? [result] : [];
              })
            : transformed;

          return customTransformedFields?.[0];
        }
      }

      return undefined;
    };

    const inferSingleRecord = (record: Record<string, unknown>) => {
      const inferred = Object.keys(record)
        .map((key) => {
          const value = record[key];

          const inferResult = inferSingleField(key, value, record);

          return inferResult;
        })
        .filter(Boolean);

      return inferred as InferField[];
    };

    const inferMultipleRecords = (records: Record<string, unknown>[]) => {
      // infer each record
      // get the most common one for each field
      // also get the first occurence of the each most common field/key and construct a fresh record from them.
      // return the fresh record and the inferred fields

      const inferred = records.map((record) => inferSingleRecord(record));

      const allUniqueKeys = records
        .flatMap((record) => Object.keys(record))
        .filter((key, index, self) => self.indexOf(key) === index);

      const mostCommonRecord: Record<string, unknown> = {};

      const mostCommonFields = allUniqueKeys.map((key) => {
        const fields = inferred.map((fields) =>
          fields.find((field) => field.key === key),
        );

        const mostCommonField = fields.reduce(
          (acc, field, index) => {
            if (!field) {
              return acc;
            }

            const count = fields.filter(
              (f) => f?.key === field.key && f?.type === field.type,
            ).length;

            if (count > acc.count) {
              mostCommonRecord[key] = records[index][key];

              return {
                count,
                field,
              };
            }

            return acc;
          },
          { count: 0, field: undefined } as {
            count: number;
            field: undefined | InferField;
          },
        );

        return mostCommonField.field;
      });

      const response = {
        commonRecord: mostCommonRecord,
        inferredFields: mostCommonFields,
      };

      return response;
    };

    const [rawResults, recordInUse]: [
      InferField[],
      Record<string, unknown> | undefined,
    ] = React.useMemo(() => {
      if (records && (type === "list" || type === "create")) {
        const inferred = inferMultipleRecords(records);

        return [inferred.inferredFields as InferField[], inferred.commonRecord];
      }
      if (record) {
        const inferred = Object.keys(record)
          .map((key) => {
            const value = record[key];

            const inferResult = infer(key, value, record, infer, type);

            return inferResult;
          })
          .filter(Boolean);

        if (resource) {
          const transformed = transform(
            inferred as InferField[],
            resources,
            resource,
            record,
            infer,
            type,
          );

          const customTransformedFields = fieldTransformer
            ? transformed.flatMap((field) => {
                const result = fieldTransformer(field);

                return result ? [result] : [];
              })
            : transformed;

          return [customTransformedFields, record];
        }

        return [[], record];
      }

      return [[], undefined];
    }, [record, records, resources, resource, fieldTransformer]);

    const {
      fields: results,
      loading: relationLoading,
      // initial: relationInitial,
    } = useRelationFetch({
      record: recordInUse,
      fields: rawResults,
      infer,
      meta,
    });

    const clearedFields = React.useMemo(() => {
      const cleanFields: InferField[] = [];

      results.forEach((f, idx, arr) => {
        if (f.resource) {
          if (
            cleanFields.findIndex(
              (el) => el.resource?.name === f.resource?.name,
            ) > -1
          ) {
            return;
          }
          const duplicates = arr.filter((field, index) => {
            if (index !== idx) {
              const currentFieldHasResource = f.resource;
              const fieldHasResource = field.resource;
              const hasAnyIdentifier =
                field.resource?.identifier || f.resource?.identifier;
              const isSameResource = hasAnyIdentifier
                ? field.resource?.identifier === f.resource?.identifier
                : field.resource?.name === f.resource?.name;

              return (
                currentFieldHasResource && fieldHasResource && isSameResource
              );
            }
            return false;
          });
          if (duplicates.length > 0) {
            if (type === "create" || type === "edit") {
              let toPush: InferField | undefined = undefined;

              [f, ...duplicates].find((el) => {
                if (el.fieldable !== true && toPush === undefined) {
                  toPush = el;
                }
              });
              if (toPush) {
                cleanFields.push(toPush);
              } else {
                cleanFields.push(f);
              }
            } else {
              let toPush: InferField | undefined = undefined;

              [f, ...duplicates].find((el) => {
                if (el.fieldable !== false && toPush === undefined) {
                  toPush = el;
                }
              });

              if (toPush) {
                cleanFields.push(toPush);
              } else {
                cleanFields.push(f);
              }
            }
          } else {
            cleanFields.push(f);
          }
        } else {
          cleanFields.push(f);
        }
      });

      return cleanFields;
    }, [results, type]);

    const code = React.useMemo(() => {
      if (!recordLoading && !relationLoading && !isInitialLoad && resource) {
        return renderer({
          resource,
          resources,
          fields: clearedFields,
          infer,
          meta,
          isCustomPage: resource.name !== resourceFromURL?.name,
          id,
          i18n: !!i18nProvider,
        });
      }
      return "";
    }, [resource, resources, clearedFields, recordLoading, relationLoading]);

    const hiddenCodeViewer =
      process.env.NODE_ENV !== "development" && hideCodeViewerInProduction;

    return (
      <>
        {LoadingComponent && (recordLoading || relationLoading) && (
          <LoadingComponent />
        )}
        {!recordLoading && !relationLoading && (
          <>
            <LiveComponent
              fetchError={
                !recordLoading && inferError
                  ? inferError
                  : !recordLoading && !isInitialLoad && !record
              }
              code={prepareLiveCode(
                code,
                componentName(
                  resource?.meta?.label ?? resource?.name ?? "Resource",
                  type,
                ),
              )}
              errorComponent={ErrorComponent}
              additionalScope={additionalScope}
            />
            {typeof CodeViewerComponent !== "undefined" && !hiddenCodeViewer ? (
              <CodeViewerComponent
                code={removeHiddenCode(code)}
                loading={recordLoading || relationLoading}
              />
            ) : null}
          </>
        )}
      </>
    );
  };

  const InferencerComponent: InferencerResultComponent = ({
    name,
    resource,
    fieldTransformer,
    meta,
    hideCodeViewerInProduction,
    id,
  }) => {
    const { resource: resourceItem } = useResourceParams({
      resource: resource ?? name,
    });

    const key = `${
      resourceItem?.identifier ?? resourceItem?.name
    }-${type}-${id}`;

    return (
      <Inferencer
        hideCodeViewerInProduction={hideCodeViewerInProduction}
        fieldTransformer={fieldTransformer}
        resourceName={resource ?? name}
        meta={meta ?? {}}
        key={key}
        id={id}
      />
    );
  };

  return InferencerComponent;
};
