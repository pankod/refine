import { Create, useForm, useSelect } from "@refinedev/mantine";
import {
  MultiSelect,
  Select,
  TextInput,
  Checkbox,
  Textarea,
  NumberInput,
} from "@mantine/core";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  printImports,
  isIDKey,
  getOptionLabel,
  dotAccessor,
  noOp,
  getVariableName,
  translatePrettyString,
  getMetaProps,
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
 * a renderer function for create page in Mantine
 * @internal used internally from inferencer components
 */
export const renderer = ({
  resource,
  fields,
  meta,
  isCustomPage,
  i18n,
}: RendererContext) => {
  const COMPONENT_NAME = componentName(
    resource.meta?.label ?? resource.name,
    "create",
  );
  const imports: Array<
    [element: string, module: string, isDefaultImport?: boolean]
  > = [
    ["Create", "@refinedev/mantine"],
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

        return `
                const { selectProps: ${getVariableName(
                  field.key,
                  "SelectProps",
                )} } =
                useSelect({
                    resource: "${field.resource.name}",
                    ${getOptionLabel(field)}
                    ${getMetaProps(
                      field?.resource?.identifier ?? field?.resource?.name,
                      meta,
                      ["getList"],
                    )}
                });
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
      if (isIDKey(field.key)) {
        return undefined;
      }

      imports.push(["TextInput", "@mantine/core"]);

      initialValues = {
        ...initialValues,
        [field.key]: field.multiple ? [] : "",
      };

      if (field.multiple) {
        return undefined;
      }

      return jsx`
                <TextInput mt="sm" label=${translatePrettyString({
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
        return undefined;
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
                ${textInputRender ?? ""}
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
        return undefined;
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
      if (isIDKey(field.key)) {
        return undefined;
      }

      imports.push(["NumberInput", "@mantine/core"]);

      initialValues = {
        ...initialValues,
        [field.key]: field.multiple ? [] : "",
      };

      if (field.multiple) {
        return undefined;
      }

      return jsx`
                <NumberInput mt="sm" label=${translatePrettyString({
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
        const { getInputProps, saveButtonProps, setFieldValue, refineCore: { formLoading } } = useForm({
            initialValues: ${JSON.stringify(initialValues)},
            ${
              isCustomPage
                ? `refineCoreProps: {
                        resource: "${resource.name}",
                        action: "create",
                        ${getMetaProps(
                          resource.identifier ?? resource.name,
                          meta,
                          ["create", "getOne"],
                        )}
                    }`
                : getMetaProps(resource.identifier ?? resource.name, meta, [
                      "create",
                      "getOne",
                    ])
                  ? `refineCoreProps: { ${getMetaProps(
                      resource.identifier ?? resource.name,
                      meta,
                      ["create", "getOne"],
                    )} }`
                  : ""
            }
        });
    
        ${relationHooksCode}

        return (
            <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
                ${renderedFields.join("")}
            </Create>
        );
    };
    `;
};

/**
 * @experimental This is an experimental component
 */
export const CreateInferencer: InferencerResultComponent = createInferencer({
  type: "create",
  additionalScope: [
    ["@refinedev/mantine", "RefineMantine", { Create, useForm, useSelect }],
    [
      "@mantine/core",
      "MantineCore",
      { MultiSelect, Select, TextInput, Checkbox, Textarea, NumberInput },
    ],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
