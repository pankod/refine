import {
  Show,
  TagField,
  TextField,
  ImageField,
  EmailField,
  UrlField,
  BooleanField,
  DateField,
  MarkdownField,
  NumberField,
} from "@refinedev/antd";
import { Typography } from "antd";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  accessor,
  printImports,
  toSingular,
  noOp,
  getVariableName,
  translatePrettyString,
  getMetaProps,
  idQuoteWrapper,
  deepHasKey,
} from "../../utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { SharedCodeViewer } from "../../components/shared-code-viewer";

import type {
  InferencerResultComponent,
  InferField,
  ImportElement,
  RendererContext,
} from "../../types";

/**
 * a renderer function for show page in Ant Design
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
    ["Show", "@refinedev/antd"],
    ["Typography", "antd"],
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
        imports.push(["TagField", "@refinedev/antd"]);

        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {${variableIsLoading} && ${variableDataLength} ? <>Loading...</> : (
                    <>
                    ${(() => {
                      if (field.relationInfer) {
                        if (field.relationInfer?.accessor) {
                          if (Array.isArray(field.relationInfer.accessor)) {
                            return `<span title="Inferencer failed to render this field. (Unsupported nesting)">Cannot Render</span>`;
                          }
                          const mapItemName = toSingular(field.resource?.name);
                          const val = accessor(
                            mapItemName,
                            undefined,
                            field.relationInfer.accessor,
                          );
                          return `{record?.${field.key}?.length ? ${variableName}?.data?.map((${mapItemName}: any) => <TagField key={${val}} value={${val}} />) : <></>}`;
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
                `;
      }

      if (field.fieldable) {
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <TextField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                )}} />
                `;
      }

      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
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
                
                `;
    }
    return undefined;
  };

  const textFields = (field: InferField) => {
    if (field.type === "text") {
      imports.push(
        ["TagField", "@refinedev/antd"],
        ["TextField", "@refinedev/antd"],
      );
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {${accessor(recordName, field.key)}?.map((item: any) => (
                    <TagField value={${val}} key={${val}} />
                ))}
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <TextField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                )}} />
            `;
    }
    return undefined;
  };

  const imageFields = (field: InferField) => {
    if (field.type === "image") {
      imports.push(["ImageField", "@refinedev/antd"]);
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {${accessor(recordName, field.key)}?.map((item: any) => (
                    <ImageField style={{ maxWidth: 200 }} value={${val}} key={${val}} />
                ))}
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <ImageField style={{ maxWidth: 200 }} value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  " + ",
                )}} />
                `;
    }
    return undefined;
  };

  const emailFields = (field: InferField) => {
    if (field.type === "email") {
      imports.push(
        ["TagField", "@refinedev/antd"],
        ["EmailField", "@refinedev/antd"],
      );
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <>
                {${accessor(recordName, field.key)}?.map((item: any) => (
                    <TagField value={${val}} key={${val}} />
                ))}
                </>
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <EmailField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  " + ",
                )}} />
            `;
    }
    return undefined;
  };

  const urlFields = (field: InferField) => {
    if (field.type === "url") {
      imports.push(
        ["TagField", "@refinedev/antd"],
        ["UrlField", "@refinedev/antd"],
      );
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {${accessor(recordName, field.key)}?.map((item: any) => (
                    <TagField value={${val}} key={${val}} />
                ))}
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <UrlField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  " + ",
                )}} />
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      imports.push(
        ["TagField", "@refinedev/antd"],
        ["BooleanField", "@refinedev/antd"],
      );
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {(${accessor(recordName, field.key)} as any[])?.map((item, index) => (
                    <BooleanField value={${val}} key={index} />
                ))}
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <BooleanField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  " && ",
                )}} />
            `;
    }
    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      imports.push(["DateField", "@refinedev/antd"]);
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {${accessor(recordName, field.key)}?.map((item: any) => (
                    <DateField value={${val}} key={${val}} />
                ))}
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <DateField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  " + ' ' + ",
                )}} />
            `;
    }
    return undefined;
  };

  const richtextFields = (field: InferField) => {
    if (field.type === "richtext") {
      imports.push(["MarkdownField", "@refinedev/antd"]);
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <MarkdownField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  ' + " " + ',
                )}} />
            `;
    }

    return undefined;
  };

  const numberFields = (field: InferField) => {
    if (field.type === "number") {
      imports.push(["NumberField", "@refinedev/antd"]);
      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor);
        return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                {${accessor(recordName, field.key)}?.map((item: any) => (
                    <TagField value={${val}} key={${val}} />
                ))}
            `;
      }
      return jsx`
                <Title level={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <NumberField value={${accessor(
                  recordName,
                  field.key,
                  field.accessor,
                  ' + " " + ',
                )} ?? ""} />
            `;
    }
    return undefined;
  };

  const renderedFields: Array<string | undefined> = fields.map((field) => {
    switch (field?.type) {
      case "text":
        return textFields(field);
      case "number":
        return numberFields(field);
      case "richtext":
        return richtextFields(field);
      case "email":
        return emailFields(field);
      case "image":
        return imageFields(field);
      case "date":
        return dateFields(field);
      case "boolean":
        return booleanFields(field);
      case "url":
        return urlFields(field);
      case "relation":
        return renderRelationFields(field);
      default:
        return undefined;
    }
  });

  noOp(imports);

  const useTranslateHook = i18n && "const translate = useTranslate();";

  return jsx`
    ${printImports(imports)}
    
    const { Title } = Typography;

    export const ${COMPONENT_NAME} = () => {
        ${useTranslateHook}
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
            : getMetaProps(resource?.identifier ?? resource?.name, meta, [
                  "getOne",
                ])
              ? `{${getMetaProps(resource?.identifier ?? resource?.name, meta, [
                  "getOne",
                ])}}`
              : ""
        });
    

        ${relationHooksCode}

        return (
            <Show isLoading={isLoading}>
                ${renderedFields.join("")}
            </Show>
        );
    };
    `;
};

/**
 * @experimental This is an experimental component
 */
export const ShowInferencer: InferencerResultComponent = createInferencer({
  type: "show",
  additionalScope: [
    [
      "@refinedev/antd",
      "RefineAntd",
      {
        Show,
        TagField,
        TextField,
        ImageField,
        EmailField,
        UrlField,
        BooleanField,
        DateField,
        MarkdownField,
        NumberField,
      },
    ],
    ["antd", "AntdPackage", { Typography }],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
