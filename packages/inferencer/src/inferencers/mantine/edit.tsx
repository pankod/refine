import { Edit, useForm, useSelect } from "@refinedev/mantine";
import {
  MultiSelect,
  Select,
  TextInput,
  Group,
  Checkbox,
  Textarea,
  NumberInput,
} from "@mantine/core";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  accessor,
  printImports,
  isIDKey,
  getOptionLabel,
  dotAccessor,
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
  RendererContext,
} from "../../types";

/**
 * a renderer function for edit page in Mantine
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
    "edit",
  );
  const recordName = getVariableName(
    resource.meta?.label ?? resource.name,
    "Data",
  );
  const imports: Array<
    [element: string, module: string, isDefaultImport?: boolean]
  > = [
    ["Edit", "@refinedev/mantine"],
    ["useForm", "@refinedev/mantine"],
  ];
  let initialValues: Record<string, any> = {};

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
        imports.push(["useSelect", "@refinedev/mantine"]);

        let val = accessor(recordName, field.key, field.accessor, false);

        if (field.multiple && field.accessor) {
          val = `${accessor(
            recordName,
            field.key,
          )}?.map((item: any) => ${accessor(
            "item",
            undefined,
            field.accessor,
          )})`;
        }

        let effect = "";

        if (field.multiple && field.accessor) {
          effect = `React.useEffect(() => {
                        setFieldValue("${field.key}", ${val});
                    }, [${recordName}]);`;
        }

        return `
                const { selectProps: ${getVariableName(
                  field.key,
                  "SelectProps",
                )} } =
                useSelect({
                    resource: "${field.resource.name}",
                    defaultValue: ${val},
                    ${getOptionLabel(field)}
                    ${getMetaProps(
                      field?.resource?.identifier ?? field?.resource?.name,
                      meta,
                      ["getList"],
                    )}
                });

                ${effect}
            `;
      }
      return undefined;
    })
    .filter(Boolean);

  const renderRelationFields = (field: InferField) => {
    if (field.relation && field.resource) {
      initialValues = {
        ...initialValues,
        [field.key]: field.multiple
          ? []
          : field.accessor
            ? {
                [typeof field.accessor === "string"
                  ? field.accessor
                  : field.accessor[0]]: "",
              }
            : "",
      };

      const variableName = getVariableName(field.key, "SelectProps");

      if (field.multiple) {
        imports.push(["MultiSelect", "@mantine/core"]);

        return jsx`
                    <MultiSelect mt="sm" label=${translatePrettyString({
                      resource,
                      field,
                      i18n,
                    })} {...getInputProps("${dotAccessor(
                      field.key,
                      undefined,
                    )}")} {...${variableName}} filterDataOnExactSearchMatch={undefined} />
                `;
      }

      imports.push(["Select", "@mantine/core"]);

      return jsx`
                <Select mt="sm" label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })} {...getInputProps("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}")} {...${variableName}} />
            `;
    }
    return undefined;
  };

  const textFields = (field: InferField) => {
    if (
      field.type === "text" ||
      field.type === "email" ||
      field.type === "date" ||
      field.type === "url"
    ) {
      imports.push(["TextInput", "@mantine/core"]);

      initialValues = {
        ...initialValues,
        [field.key]: field.multiple ? [] : "",
      };

      if (field.multiple) {
        imports.push(["Group", "@mantine/core"]);

        const val = dotAccessor(field.key, "${index}", field.accessor);

        return `
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                        <TextInput mt="sm" key={index} label=${translatePrettyString(
                          {
                            resource,
                            field,
                            i18n,
                          },
                        )} {...getInputProps(\`${val}\`)} />
                    ))}
                </Group>
                `;
      }

      return jsx`
                <TextInput mt="sm" ${
                  isIDKey(field.key) ? "disabled" : ""
                } label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })} {...getInputProps("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}")} />
            `;
    }
    return undefined;
  };

  const imageFields = (field: InferField) => {
    if (field.type === "image") {
      return jsx`
            {/* 
                Dropzone component is not included in "@refinedev/mantine" package.
                To use a <Dropzone> component, you can follow the official documentation for Mantine.
                
                Docs: https://mantine.dev/others/dropzone/
            */}
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      imports.push(["Checkbox", "@mantine/core"]);

      initialValues = {
        ...initialValues,
        [field.key]: field.multiple ? [] : "",
      };

      if (field.multiple) {
        imports.push(["Group", "@mantine/core"]);

        const val = dotAccessor(field.key, "${index}", field.accessor);

        return `
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                        <Checkbox mt="sm" key={index} label=${translatePrettyString(
                          {
                            resource,
                            field,
                            i18n,
                          },
                        )} {...getInputProps(\`${val}\`, { type: 'checkbox' })} />
                    ))}
                </Group>
                `;
      }

      return jsx`
                <Checkbox mt="sm" label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })} {...getInputProps("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}", { type: 'checkbox' })} />
            `;
    }
    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      const textInputRender = textFields(field);

      return `
                {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}
                ${textInputRender}
            `;
    }
    return undefined;
  };

  const richtextFields = (field: InferField) => {
    if (field.type === "richtext") {
      imports.push(["Textarea", "@mantine/core"]);

      initialValues = {
        ...initialValues,
        [field.key]: field.multiple ? [] : "",
      };

      if (field.multiple) {
        imports.push(["Group", "@mantine/core"]);

        const val = dotAccessor(field.key, "${index}", field.accessor);

        return `
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                        <Textarea mt="sm" key={index} label=${translatePrettyString(
                          {
                            resource,
                            field,
                            i18n,
                          },
                        )} {...getInputProps(\`${val}\`)} />
                    ))}
                </Group>
                `;
      }

      return jsx`
                <Textarea mt="sm" label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })} autosize {...getInputProps("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}")} />
            `;
    }

    return undefined;
  };

  const numberFields = (field: InferField) => {
    if (field.type === "number") {
      imports.push(["NumberInput", "@mantine/core"]);

      initialValues = {
        ...initialValues,
        [field.key]: field.multiple ? [] : "",
      };

      if (field.multiple) {
        imports.push(["Group", "@mantine/core"]);

        const val = dotAccessor(field.key, "${index}", field.accessor);

        return `
                <Group spacing="xs">
                    {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                        <NumberInput mt="sm" key={index} label=${translatePrettyString(
                          {
                            resource,
                            field,
                            i18n,
                          },
                        )} {...getInputProps(\`${val}\`)} />
                    ))}
                </Group>
                `;
      }

      return jsx`
                <NumberInput mt="sm" ${
                  isIDKey(field.key) ? "disabled" : ""
                } label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })} {...getInputProps("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}")}/>
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
      case "url":
      case "text":
      case "email":
        return wrapper(textFields(field));
      case "number":
        return wrapper(numberFields(field));
      case "richtext":
        return wrapper(richtextFields(field));
      case "image":
        return wrapper(imageFields(field));
      case "date":
        return wrapper(dateFields(field));
      case "boolean":
        return wrapper(booleanFields(field));
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
        const { getInputProps, saveButtonProps, setFieldValue, refineCore: { query } } = useForm({
            initialValues: ${JSON.stringify(initialValues)},
            ${
              isCustomPage
                ? `refineCoreProps: {
                        resource: "${resource.name}",
                        id: ${idQuoteWrapper(id)},
                        action: "edit",
                        ${getMetaProps(
                          resource?.identifier ?? resource?.name,
                          meta,
                          ["update", "getOne"],
                        )}  
                    }`
                : getMetaProps(resource?.identifier ?? resource?.name, meta, [
                      "update",
                      "getOne",
                    ])
                  ? `refineCoreProps: { ${getMetaProps(
                      resource?.identifier ?? resource?.name,
                      meta,
                      ["update", "getOne"],
                    )} }
                      `
                  : ""
            }
        });
    
        const ${recordName} = query?.data?.data;
    
        ${relationHooksCode}

        return (
            <Edit saveButtonProps={saveButtonProps}>
                ${renderedFields.join("")}
            </Edit>
        );
    };
    `;
};

/**
 * @experimental This is an experimental component
 */
export const EditInferencer: InferencerResultComponent = createInferencer({
  type: "edit",
  additionalScope: [
    ["@refinedev/mantine", "RefineMantine", { Edit, useForm, useSelect }],
    [
      "@mantine/core",
      "MantineCore",
      {
        MultiSelect,
        Select,
        TextInput,
        Group,
        Checkbox,
        Textarea,
        NumberInput,
      },
    ],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
