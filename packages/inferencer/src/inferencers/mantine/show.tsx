import {
  Show,
  TagField,
  TextField,
  EmailField,
  UrlField,
  BooleanField,
  DateField,
  MarkdownField,
  NumberField,
} from "@refinedev/mantine";
import { Title, Group, Image } from "@mantine/core";

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
  ImportElement,
  InferencerResultComponent,
  InferField,
  RendererContext,
} from "../../types";

/**
 * a renderer function for show page in Mantine
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
    ["useShow", "@refinedev/core"],
    ["Show", "@refinedev/mantine"],
    ["Title", "@mantine/core"],
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
        imports.push(
          ["TagField", "@refinedev/mantine"],
          ["Group", "@mantine/core"],
        );

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
                            console.log(
                              "@refinedev/inferencer: Inferencer failed to render this field",
                              {
                                key: field.key,
                                relation: field.relationInfer,
                              },
                            );

                            return `<span title="Inferencer failed to render this field. (Unsupported nesting)">Cannot Render</span>`;
                          }
                          const mapItemName = toSingular(field.resource?.name);
                          const val = accessor(
                            mapItemName,
                            undefined,
                            field.relationInfer.accessor,
                          );
                          return `
                                    {record?.${field.key}?.length ? <Group spacing="xs">
                                        {${variableName}?.data?.map((${mapItemName}: any) => <TagField key={${val}} value={${val}} />)}
                                    </Group> : <></>}
                                    `;
                        }
                        console.log(
                          "@refinedev/inferencer: Inferencer failed to render this field",
                          {
                            key: field.key,
                            relation: field.relationInfer,
                          },
                        );

                        return `<span title="Inferencer failed to render this field (Cannot find key)">Cannot Render</span>`;
                      }
                      console.log(
                        "@refinedev/inferencer: Inferencer failed to render this field",
                        { key: field.key },
                      );

                      return `<span title="Inferencer failed to render this field (Cannot find relation)">Cannot Render</span>`;
                    })()}
                    </>
                )}
                `;
      }

      if (field.fieldable) {
        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
                <Title my="xs" order={5}>${translatePrettyString({
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

                          return `<span title="Inferencer failed to render this field (Cannot find key)">Cannot Render</span>`;
                        }
                        return `{${variableName}}`;
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
      imports.push(["TextField", "@refinedev/mantine"]);

      if (field.multiple) {
        imports.push(
          ["TagField", "@refinedev/mantine"],
          ["Group", "@mantine/core"],
        );

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
      imports.push(["Image", "@mantine/core"]);

      if (field.multiple) {
        imports.push(["Group", "@mantine/core"]);

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <Image sx={{ maxWidth: 200 }} src={${val}} key={${val}} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Image sx={{ maxWidth: 200 }} src={${accessor(
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
      imports.push(["EmailField", "@refinedev/mantine"]);

      if (field.multiple) {
        imports.push(
          ["TagField", "@refinedev/mantine"],
          ["Group", "@mantine/core"],
        );

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
      imports.push(["UrlField", "@refinedev/mantine"]);

      if (field.multiple) {
        imports.push(
          ["TagField", "@refinedev/mantine"],
          ["Group", "@mantine/core"],
        );

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
      imports.push(["BooleanField", "@refinedev/mantine"]);

      if (field.multiple) {
        imports.push(
          ["TagField", "@refinedev/mantine"],
          ["Group", "@mantine/core"],
        );

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                        <TagField value={${val}} key={index} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
      imports.push(["DateField", "@refinedev/mantine"]);

      if (field.multiple) {
        imports.push(["Group", "@mantine/core"]);

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <DateField value={${val}} key={${val}} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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
      imports.push(["MarkdownField", "@refinedev/mantine"]);

      return jsx`
                <Title mt="xs" order={5}>${translatePrettyString({
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
      imports.push(["NumberField", "@refinedev/mantine"]);

      if (field.multiple) {
        imports.push(
          ["TagField", "@refinedev/mantine"],
          ["Group", "@mantine/core"],
        );

        const val = accessor("item", undefined, field.accessor);

        return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</Title>
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                </Group>
            `;
      }
      return jsx`
                <Title my="xs" order={5}>${translatePrettyString({
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

  noOp(imports);
  const useTranslateHook = i18n && "const translate = useTranslate();";

  return jsx`
    ${printImports(imports)}
    
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
        : getMetaProps(resource?.identifier ?? resource?.name, meta, ["getOne"])
          ? `{ ${getMetaProps(resource?.identifier ?? resource?.name, meta, [
              "getOne",
            ])} }`
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
      "@refinedev/mantine",
      "RefineMantine",
      {
        Show,
        TagField,
        TextField,
        EmailField,
        UrlField,
        BooleanField,
        DateField,
        MarkdownField,
        NumberField,
      },
    ],
    ["@mantine/core", "MantineCore", { Title, Group, Image }],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
