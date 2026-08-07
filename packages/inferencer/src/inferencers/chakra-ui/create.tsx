import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  accessor,
  printImports,
  toSingular,
  isIDKey,
  dotAccessor,
  getOptionLabel,
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
  ImportElement,
  RendererContext,
} from "../../types";

/**
 * a renderer function for create page in Chakra UI
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
  const imports: Array<ImportElement> = [
    ["Create", "@refinedev/chakra-ui"],
    ["FormControl", "@chakra-ui/react"],
    ["FormLabel", "@chakra-ui/react"],
    ["FormErrorMessage", "@chakra-ui/react"],
    ["useForm", "@refinedev/react-hook-form"],
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
        imports.push(["useSelect", "@refinedev/core"]);

        return `
                const { options: ${getVariableName(field.key, "Options")} } =
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
      imports.push(["useSelect", "@refinedev/core"]);
      imports.push(["Select", "@chakra-ui/react"]);

      const variableName = getVariableName(field.key, "Options");

      return jsx`
            <FormControl mb="3" isInvalid={!!errors?.${dotAccessor(
              field.key,
              undefined,
            )}}>
                <FormLabel>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</FormLabel>
                <Select
                    placeholder="Select ${toSingular(field.resource.name)}"
                    {...register("${dotAccessor(
                      field.key,
                      undefined,
                      field.accessor,
                    )}", {
                        required: "This field is required",
                    })}
                >
                    {${variableName}?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {${accessor(
                      "(errors as any)",
                      field.key,
                      field.accessor,
                      false,
                    )}?.message as string}
                </FormErrorMessage>
            </FormControl>
            `;
    }
    return undefined;
  };

  const basicInputFields = (field: InferField) => {
    if (
      field.type === "text" ||
      field.type === "url" ||
      field.type === "email" ||
      field.type === "number" ||
      field.type === "date" ||
      field.type === "richtext"
    ) {
      if (isIDKey(field.key)) {
        return undefined;
      }

      imports.push(["Input", "@chakra-ui/react"]);

      if (field.multiple) {
        return undefined;
      }

      return jsx`
                <FormControl mb="3" isInvalid={!!${accessor(
                  "(errors as any)",
                  field.key,
                  field.accessor,
                  false,
                )}}>
                    <FormLabel>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</FormLabel>
                    <Input
                        ${
                          field.type !== "date" && field.type !== "richtext"
                            ? `type="${field.type}"`
                            : ""
                        }
                        {...register("${dotAccessor(
                          field.key,
                          undefined,
                          field.accessor,
                        )}", {
                            required: "This field is required",
                            ${
                              field.type === "number"
                                ? "valueAsNumber: true,"
                                : ""
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {${accessor(
                          "(errors as any)",
                          field.key,
                          field.accessor,
                          false,
                        )}?.message as string}
                    </FormErrorMessage>
                </FormControl>
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      imports.push(["Checkbox", "@chakra-ui/react"]);

      if (field.multiple) {
        return undefined;
      }

      return jsx`
                <FormControl mb="3" isInvalid={!!${accessor(
                  "errors",
                  field.key,
                  field.accessor,
                  false,
                )}}>
                    <FormLabel>${translatePrettyString({
                      resource,
                      field,
                      i18n,
                      noQuotes: true,
                    })}</FormLabel>
                    <Checkbox
                        {...register("${dotAccessor(
                          field.key,
                          undefined,
                          field.accessor,
                        )}", {
                            required: "This field is required",
                        })}
                    />
                    <FormErrorMessage>
                        {${accessor("errors", field.key, field.accessor, false)}?.message as string}
                    </FormErrorMessage>
                </FormControl>
               
            `;
    }
    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      const basicRender = basicInputFields(field);

      return `
                {/* 
                    DatePicker component is not included in "@refinedev/chakra-ui" package.
                    To use a <DatePicker> component, you can examine the following links:
                    
                    - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                    - https://github.com/wojtekmaj/react-date-picker
                */}
                ${basicRender ?? ""}
                `;
    }
    return undefined;
  };

  const renderedFields: Array<string | undefined> = fields.map((field) => {
    switch (field?.type) {
      case "text":
      case "number":
      case "email":
      case "url":
      case "richtext":
        return basicInputFields(field);
      case "date":
        return dateFields(field);
      case "boolean":
        return booleanFields(field);
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
    
    export const ${COMPONENT_NAME} = () => {
        ${useTranslateHook}
        const {
            refineCore: { formLoading },
            saveButtonProps,
            register,
            formState: { errors },
        } = useForm(
            ${
              isCustomPage
                ? `
            { 
                refineCoreProps: {
                    resource: "${resource.name}",
                    action: "create",
                    ${getMetaProps(resource.identifier ?? resource.name, meta, [
                      "create",
                      "getOne",
                    ])}
                }
            }`
                : getMetaProps(resource.identifier ?? resource.name, meta, [
                      "create",
                      "getOne",
                    ])
                  ? `{
                        refineCoreProps: { ${getMetaProps(
                          resource.identifier ?? resource.name,
                          meta,
                          ["create", "getOne"],
                        )} }
                        }`
                  : ""
            }
        );
    
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
    ["@refinedev/chakra-ui", "RefineChakraUI", { Create }],
    ["@refinedev/react-hook-form", "RefineReactHookForm", { useForm }],
    [
      "@chakra-ui/react",
      "ChakraUI",
      {
        FormControl,
        FormLabel,
        FormErrorMessage,
        Select,
        Input,
        Checkbox,
      },
    ],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
