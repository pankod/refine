import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  accessor,
  printImports,
  noOp,
  getVariableName,
  translatePrettyString,
  translateActionTitle,
  translateButtonTitle,
  getMetaProps,
  idQuoteWrapper,
  deepHasKey,
} from "../../utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { SharedCodeViewer } from "../../components/shared-code-viewer";

import type {
  ImportElement,
  InferencerResultComponent,
  InferField,
  RendererContext,
} from "../../types";

/**
 * a renderer function for show page with unstyled html elements
 * @internal used internally from inferencer components
 */
export const renderer = ({
  resource,
  fields,
  meta,
  isCustomPage,
  id,
  i18n,
}: RendererContext) => {
  const COMPONENT_NAME = componentName(
    resource.meta?.label ?? resource.name,
    "show",
  );
  const recordName = "record";
  const imports: Array<ImportElement> = [
    ["React", "react", true],
    ["useShow", "@refinedev/core"],
    ["useResourceParams", "@refinedev/core"],
    ["useNavigation", "@refinedev/core"],
  ];

  if (i18n) {
    imports.push(["useTranslate", "@refinedev/core"]);
  }

  // has gqlQuery or gqlMutation in "meta"
  const hasGql = deepHasKey(meta || {}, ["gqlQuery", "gqlMutation"]);
  if (hasGql) {
    imports.push(["gql", "graphql-tag", true]);
  }

  const relationFields: (InferField | null)[] = fields.filter(
    (field) => field?.relation && !field?.fieldable && field?.resource,
  );

  const relationHooksCode = relationFields
    .filter(Boolean)
    .map((field) => {
      if (field?.relation && !field.fieldable && field.resource) {
        if (field.multiple) {
          imports.push(["useMany", "@refinedev/core"]);
          let ids = accessor(recordName, field.key);

          if (field.accessor) {
            ids = `${accessor(
              recordName,
              field.key,
            )}?.map((item: any) => ${accessor(
              "item",
              undefined,
              field.accessor,
            )})`;
          }

          return `
                const {
                  result: ${getVariableName(field.key, "Data")},
                  query: { isLoading: ${getVariableName(field.key, "IsLoading")} },
                } =
                useMany({
                    resource: "${field.resource.name}",
                    ids: ${ids} || [],
                    queryOptions: {
                        enabled: !!${recordName} && !!${ids}?.length,
                    },
                    ${getMetaProps(
                      field?.resource?.identifier ?? field?.resource?.name,
                      meta,
                      ["getMany"],
                    )}
                });
                `;
        }
        imports.push(["useOne", "@refinedev/core"]);
        return `
                const { result: ${getVariableName(
                  field.key,
                  "Data",
                )}, query: {isLoading: ${getVariableName(
                  field.key,
                  "IsLoading",
                )} }}  =
                useOne({
                    resource: "${field.resource.name}",
                    id: ${accessor(
                      recordName,
                      field.key,
                      field.accessor,
                      false,
                    )} || "",
                    queryOptions: {
                        enabled: !!${recordName},
                    },
                    ${getMetaProps(
                      field?.resource?.identifier ?? field?.resource?.name,
                      meta,
                      ["getOne"],
                    )}
                });
            `;
      }
      return undefined;
    })
    .filter(Boolean);

  const renderRelationFields = (field: InferField) => {
    if (field.relation && field.resource) {
      const variableName = getVariableName(field.key, "Data");
      const variableIsLoading = getVariableName(field.key, "IsLoading");

      if (field.multiple) {
        const variableDataLength = `${accessor(recordName, field.key)}?.length`;
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                    {${variableIsLoading} && ${variableDataLength} ? <>Loading...</> : (
                        <>
                        ${(() => {
                          if (field.relationInfer) {
                            if (field.relationInfer?.accessor) {
                              if (Array.isArray(field.relationInfer.accessor)) {
                                console.log(
                                  "@refinedev/inferencer: Inferencer failed to render this field",
                                  {
                                    key: field.key,
                                    relation: field.relationInfer,
                                  },
                                );

                                return `<span title="Inferencer failed to render this field. (Unsupported nesting)">Cannot Render</span>`;
                              }
                              const mapItemName = getVariableName(field.key);
                              const val = accessor(
                                mapItemName,
                                undefined,
                                field.relationInfer.accessor,
                              );
                              return jsx`
                                            {record?.${field.key}?.length ? ${variableName}?.data?.map((${mapItemName}: any) => <li key={${val}}>{${val}}</li>) : <></>}
                                        `;
                            }
                            console.log(
                              "@refinedev/inferencer: Inferencer failed to render this field",
                              {
                                key: field.key,
                                relation: field.relationInfer,
                              },
                            );

                            return `<span title="Inferencer failed to render this field. (Cannot find key)">Cannot Render</span>`;
                          }
                          console.log(
                            "@refinedev/inferencer: Inferencer failed to render this field",
                            {
                              key: field.key,
                              relation: field.relationInfer,
                            },
                          );

                          return `<span title="Inferencer failed to render this field (Cannot find relation)">Cannot Render</span>`;
                        })()}
                        </>
                    )}
                    </ul>
                </div>
                `;
      }

      if (field.fieldable) {
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <div>{${accessor(recordName, field.key, field.accessor)}}</div>
                </div>
                `;
      }

      return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <div>
                    {${variableIsLoading} ? <>Loading...</> : (
                        <>
                        ${(() => {
                          if (field.relationInfer) {
                            if (field.relationInfer?.accessor) {
                              if (Array.isArray(field.relationInfer.accessor)) {
                                return `{${accessor(
                                  `${variableName}`,
                                  undefined,
                                  field.relationInfer.accessor,
                                  ' + " " + ',
                                )}}`;
                              }
                              return `{${variableName}?.${field.relationInfer.accessor}}`;
                            }
                            const cannotRender =
                              field?.relationInfer?.type === "object" &&
                              !field?.relationInfer?.accessor;

                            if (cannotRender) {
                              console.log(
                                "@refinedev/inferencer: Inferencer failed to render this field",
                                {
                                  key: field.key,
                                  relation: field.relationInfer,
                                },
                              );
                            }

                            return cannotRender
                              ? `<span title="Inferencer failed to render this field. (Cannot find key)">Cannot Render</span>`
                              : `{${variableName}}`;
                          }
                          return `{${variableName}?.id}`;
                        })()}
                        </>
                    )}
                    </div>
                </div>
                `;
    }
    return undefined;
  };

  const textFields = (field: InferField) => {
    if (field.type === "text") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                        {${accessor(recordName, field.key)}?.map((item: any) => (
                            <li key={${val}}>
                                {${val}}
                            </li>
                        ))}
                    </ul>
                </div>
            `;
      }
      return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <div>
                    {${accessor(recordName, field.key, field.accessor)}}
                    </div>
                </div>
            `;
    }
    return undefined;
  };

  const imageFields = (field: InferField) => {
    if (field.type === "image") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <li key={${val}}>
                            <img style={{ maxWidth: 200 }} src={${val}}/>
                        </li>
                    ))}
                    </ul>
                </div>
            `;
      }
      return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <img src={{ maxWidth: 200 }} src={${accessor(
                      recordName,
                      field.key,
                      field.accessor,
                      " + ",
                    )}} />
                </div>
                `;
    }
    return undefined;
  };

  const emailFields = (field: InferField) => {
    if (field.type === "email") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                        {${accessor(recordName, field.key)}?.map((item: any) => (
                            <li key={${val}}>
                                <a href={"mailto:" + ${val}}>{${val}}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            `;
      }
      return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <div>
                        <a href={"mailto:" + ${accessor(
                          recordName,
                          field.key,
                          field.accessor,
                          " + ",
                        )}}>
                            {${accessor(
                              recordName,
                              field.key,
                              field.accessor,
                              " + ",
                            )}}
                        </a>
                    </div>
                </div>
            `;
    }
    return undefined;
  };

  const urlFields = (field: InferField) => {
    if (field.type === "url") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                        {${accessor(recordName, field.key)}?.map((item: any) => (
                            <li key={${val}}>
                                <a href={${val}}>{${val}}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            `;
      }
      return jsx`
            <div style={{ marginTop: "6px" }}>
                <h5>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</h5>
                <div>
                    <a href={${accessor(
                      recordName,
                      field.key,
                      field.accessor,
                      " + ",
                    )}} target="_blank" rel="noreferrer">
                        {${accessor(
                          recordName,
                          field.key,
                          field.accessor,
                          " + ",
                        )}}
                    </a>
                </div>
            </div>
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                        {${accessor(recordName, field.key)}?.map((item: any) => (
                            <li key={${val}}>
                                {${val} ? "Yes" : "No"}
                            </li>
                        ))}
                    </ul>
                </div>
            `;
      }
      return jsx`
            <div style={{ marginTop: "6px" }}>
                <h5>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</h5>
                <div>
                {${accessor(recordName, field.key, field.accessor, " && ")} ? "Yes" : "No"}
                </div>
            </div>
            `;
    }
    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <li key={${val}}>
                            {(new Date(${val})).toLocaleString(undefined, { timeZone: "UTC" })}
                        </li>
                    ))}
                    </ul>
                </div>
            `;
      }
      return jsx`
            <div style={{ marginTop: "6px" }}>
                <h5>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</h5>
                <div>
                    {(new Date(${accessor(
                      recordName,
                      field.key,
                      field.accessor,
                      " + ' ' + ",
                    )})).toLocaleString(undefined, { timeZone: "UTC" })}
                </div>
            </div>
            `;
    }
    return undefined;
  };

  const richtextFields = (field: InferField) => {
    if (field.type === "richtext") {
      return jsx`
            <div style={{ marginTop: "6px" }}>
                <h5>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</h5>
                <p>
                {${accessor(recordName, field.key, field.accessor, ' + " " + ')}}
                </p>
            </div>
            `;
    }

    return undefined;
  };

  const numberFields = (field: InferField) => {
    if (field.type === "number") {
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <ul>
                        {${accessor(recordName, field.key)}?.map((item: any) => (
                        <li key={${val}}>
                            {${val}}
                        </li>
                        ))}
                    </ul>
                </div>
                `;
      }
      return jsx`
                <div style={{ marginTop: "6px" }}>
                    <h5>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</h5>
                    <div>
                    {${accessor(
                      recordName,
                      field.key,
                      field.accessor,
                      ' + " " + ',
                    )} ?? ""}
                    </div>
                </div>
            `;
    }
    return undefined;
  };

  const wrapper = (code?: string) => {
    if (code) {
      return jsx`
                ${code}
            `;
    }
    return undefined;
  };

  const renderedFields: Array<string | undefined> = fields.map((field) => {
    switch (field?.type) {
      case "text":
        return wrapper(textFields(field));
      case "number":
        return wrapper(numberFields(field));
      case "richtext":
        return wrapper(richtextFields(field));
      case "email":
        return wrapper(emailFields(field));
      case "image":
        return wrapper(imageFields(field));
      case "date":
        return wrapper(dateFields(field));
      case "boolean":
        return wrapper(booleanFields(field));
      case "url":
        return wrapper(urlFields(field));
      case "relation":
        return wrapper(renderRelationFields(field));
      default:
        return undefined;
    }
  });

  const canEdit = resource?.meta?.canEdit;
  const canList = !!resource?.list;

  noOp(imports);
  const useTranslateHook = i18n && "const translate = useTranslate();";

  return jsx`
    ${printImports(imports)}
    
    export const ${COMPONENT_NAME} = () => {
        ${useTranslateHook}
        const { edit, list } = useNavigation();
        ${isCustomPage ? "" : "const { id } = useResourceParams();"}
        const {     result: ${recordName},
    query: { isLoading }, } = useShow(${
      isCustomPage
        ? `{ 
                    resource: "${resource.name}", 
                    id: ${idQuoteWrapper(id)},
                    ${getMetaProps(
                      resource?.identifier ?? resource?.name,
                      meta,
                      ["getOne"],
                    )}
                }`
        : getMetaProps(resource?.identifier ?? resource?.name, meta, ["getOne"])
          ? `{ ${getMetaProps(resource?.identifier ?? resource?.name, meta, [
              "getOne",
            ])} }`
          : ""
    });
    
        ${relationHooksCode}

        return (
            <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>${translateActionTitle({
                  resource,
                  action: "show",
                  i18n,
                })}</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                ${
                  canList
                    ? jsx`<button onClick={() => list("${
                        resource.name
                      }")}>${translateActionTitle({
                        resource,
                        action: "list",
                        i18n,
                      })}</button>`
                    : ""
                }
                ${
                  canEdit
                    ? jsx`<button onClick={() => edit("${resource.name}", ${
                        isCustomPage ? `"${id}"` : "id ?? ''"
                      })}>${translateButtonTitle({
                        action: "edit",
                        i18n,
                        noQuotes: true,
                      })}</button>`
                    : ""
                }
                </div>
            </div>
                <div>
                    ${renderedFields.join("")}
                </div>
            </div>
        );
    };
    `;
};

/**
 * @experimental This is an experimental component
 */
export const ShowInferencer: InferencerResultComponent = createInferencer({
  type: "show",
  additionalScope: [],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
