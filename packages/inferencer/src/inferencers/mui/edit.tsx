import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Controller } from "react-hook-form";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  accessor,
  printImports,
  isIDKey,
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
  ImportElement,
  RendererContext,
} from "../../types";

/**
 * a renderer function for edit page in Material UI
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
  const imports: Array<ImportElement> = [
    ["Edit", "@refinedev/mui"],
    ["Box", "@mui/material"],
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
        imports.push(["useAutocomplete", "@refinedev/mui"]);
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

        return `
                const { autocompleteProps: ${getVariableName(
                  field.key,
                  "AutocompleteProps",
                )} } =
                useAutocomplete({
                    resource: "${field.resource.name}",
                    defaultValue: ${val},
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
      imports.push(
        ["Autocomplete", "@mui/material"],
        ["Controller", "react-hook-form"],
      );
      const variableName = getVariableName(field.key, "AutocompleteProps");

      const optionLabelProperty = field.relationInfer
        ? field.relationInfer.accessor
          ? typeof field.relationInfer.accessor === "string"
            ? field.relationInfer.accessor
            : field.relationInfer.accessor[0]
          : "title"
        : "title";

      // check optionLabelProperty can be accessed via dot notation
      const isBracketNotation =
        optionLabelProperty.includes(".") ||
        optionLabelProperty.includes("[") ||
        optionLabelProperty.includes("]") ||
        optionLabelProperty.includes("-");

      const optionLabelItemValue = field.accessor
        ? accessor("item", undefined, field.accessor, false)
        : "(item?.id ?? item)";

      const optionEqualValue = field.accessor
        ? accessor("value", undefined, field.accessor, false)
        : "(value?.id ?? value)";

      const optionChangeValue = field.accessor
        ? "value"
        : field.multiple
          ? "value?.map((item: any) => item?.id ?? item)"
          : "value?.id ?? value";

      return jsx`
                <Controller
                    control={control}
                    name="${dotAccessor(field.key, undefined)}"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    ${
                      field.multiple
                        ? "defaultValue={[] as any}"
                        : "defaultValue={null as any}"
                    }
                    render={({ field }) => (
                        <Autocomplete
                            {...${variableName}}
                            {...field}
                            ${field.multiple ? "multiple" : ""}
                            onChange={(_, value) => {
                                field.onChange(${optionChangeValue});
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    ${variableName}?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            ${optionLabelItemValue}?.toString(),
                                    )?.${
                                      isBracketNotation
                                        ? `["${optionLabelProperty}"]`
                                        : optionLabelProperty
                                    } ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === ${optionEqualValue}?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label=${translatePrettyString({
                                      resource,
                                      field,
                                      i18n,
                                    })}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!${accessor(
                                      "(errors as any)",
                                      field.key,
                                      field.accessor,
                                      false,
                                    )}}
                                    helperText={${accessor(
                                      "(errors as any)",
                                      field.key,
                                      field.accessor,
                                      false,
                                    )}?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
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
      imports.push(["TextField", "@mui/material"]);

      if (field.multiple) {
        imports.push(["Box", "@mui/material"]);

        const val = dotAccessor(field.key, "${index}", field.accessor);

        const errorVal = `${accessor(
          "(errors as any)",
          field.key,
          undefined,
          false,
        )}?.[index]`;

        return `
                    <Box sx={{display: "flex", gap: 1}}>
                        {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                            <TextField
                                key={index}
                                {...register(\`${val}\`, {
                                    required: "This field is required",
                                    ${
                                      field.type === "number"
                                        ? "valueAsNumber: true,"
                                        : ""
                                    }
                                })}
                                error={!!${errorVal}}
                                helperText={${errorVal}?.message as string}
                                margin="normal"
                                fullWidth
                                slotProps={{
                                    inputLabel: {
                                         shrink: true,
                                    },
                                }}
                                ${
                                  field.type !== "date" &&
                                  field.type !== "richtext"
                                    ? `type="${field.type}"`
                                    : ""
                                }
                                ${field.type === "richtext" ? "multiline" : ""}
                                label=${translatePrettyString({
                                  resource,
                                  field,
                                  i18n,
                                })}
                                name={\`${dotAccessor(
                                  field.key,
                                  undefined,
                                  field.accessor,
                                )}.\${index}\`}
                            />
                        ))}
                    </Box>
                `;
      }
      return jsx`
                <TextField
                    {...register("${dotAccessor(
                      field.key,
                      undefined,
                      field.accessor,
                    )}", {
                        required: "This field is required",
                        ${field.type === "number" ? "valueAsNumber: true," : ""}
                    })}
                    error={!!${accessor(
                      "(errors as any)",
                      field.key,
                      field.accessor,
                      false,
                    )}}
                    helperText={${accessor(
                      "(errors as any)",
                      field.key,
                      field.accessor,
                      false,
                    )}?.message}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    ${
                      field.type !== "date" && field.type !== "richtext"
                        ? `type="${field.type}"`
                        : ""
                    }
                    ${field.type === "richtext" ? "multiline" : ""}
                    label=${translatePrettyString({
                      resource,
                      field,
                      i18n,
                    })}
                    name="${dotAccessor(field.key, undefined, field.accessor)}"
                    ${isIDKey(field.key) ? "disabled" : ""}
                />
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      imports.push(
        ["Checkbox", "@mui/material"],
        ["FormControlLabel", "@mui/material"],
        ["Controller", "react-hook-form"],
      );

      if (field.multiple) {
        imports.push(["Box", "@mui/material"]);

        const val = dotAccessor(field.key, "${index}", field.accessor);

        return `
                    <Box sx={{display: "flex", gap: 1}}>
                        {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                            <Controller
                                key={index}
                                control={control}
                                name={\`${val}\`}
                                // eslint-disable-next-line
                                defaultValue={null as any}
                                render={({ field }) => (
                                    <FormControlLabel label=${translatePrettyString(
                                      {
                                        resource,
                                        field,
                                        i18n,
                                      },
                                    )} control={
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(event) => {
                                                field.onChange(event.target.checked);
                                            }}
                                        />
                                    } />
                                )}
                            />
                        ))}
                    </Box>
                `;
      }

      return jsx`
                <Controller
                    control={control}
                    name="${dotAccessor(field.key, undefined, field.accessor)}"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel label=${translatePrettyString({
                          resource,
                          field,
                          i18n,
                        })} control={
                            <Checkbox
                                {...field}
                                checked={field.value}
                                onChange={(event) => {
                                    field.onChange(event.target.checked);
                                }}
                            />
                        } />
                    )}
                />
            `;
    }
    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      const basicRender = basicInputFields(field);

      return `
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                ${basicRender}
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
            saveButtonProps,
            refineCore: { query },
            register,
            control,
            formState: { errors },
        } = useForm(
            ${
              isCustomPage
                ? `{
                refineCoreProps: {
                    resource: "${resource.name}",
                    id: ${idQuoteWrapper(id)},
                    action: "edit",
                    ${getMetaProps(
                      resource?.identifier ?? resource?.name,
                      meta,
                      ["update", "getOne"],
                    )}
                }
            }`
                : getMetaProps(resource?.identifier ?? resource?.name, meta, [
                      "update",
                      "getOne",
                    ])
                  ? `{ refineCoreProps: { ${getMetaProps(
                      resource?.identifier ?? resource?.name,
                      meta,
                      ["update", "getOne"],
                    )} }
              }`
                  : ""
            }
        );

        const ${recordName} = query?.data?.data;

        ${relationHooksCode}

        return (
            <Edit saveButtonProps={saveButtonProps}>
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column" }}
                    autoComplete="off"
                >
                    ${renderedFields.join("")}
                </Box>
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
    ["@refinedev/mui", "RefineMui", { Edit, useAutocomplete }],
    ["@refinedev/react-hook-form", "RefineReactHookForm", { useForm }],
    [
      "@mui/material",
      "MuiMaterial",
      { Box, Autocomplete, TextField, Checkbox, FormControlLabel },
    ],
    ["react-hook-form", "ReactHookForm", { Controller }],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
