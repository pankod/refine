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
  InferencerResultComponent,
  InferField,
  ImportElement,
  RendererContext,
} from "../../types";

/**
 * a renderer function for edit page with unstyled html elements
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
    ["React", "react", true],
    ["useNavigation", "@refinedev/core"],
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
                const { options: ${getVariableName(field.key, "Options")} } =
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

                React.useEffect(() => {
                    setValue("${dotAccessor(
                      field.key,
                      undefined,
                      field.accessor,
                    )}", ${val});
                }, [${getVariableName(field.key, "Options")}]);
            `;
      }
      return undefined;
    })
    .filter(Boolean);

  const renderRelationFields = (field: InferField) => {
    if (field.relation && field.resource) {
      imports.push(["useSelect", "@refinedev/core"]);

      const variableName = getVariableName(field.key, "Options");

      return jsx`
            <label>
                <span style={{ marginRight: "8px" }}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</span>
                <select
                    placeholder="Select ${toSingular(field.resource.name)}"
                    {...register("${dotAccessor(
                      field.key,
                      undefined,
                      field.accessor,
                    )}", {
                        required: ${
                          field.multiple ? "false" : '"This field is required"'
                        },
                    })}
                >
                    {${variableName}?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span style={{ color: "red" }}>
                    {${accessor(
                      "(errors as any)",
                      field.key,
                      field.accessor,
                      false,
                    )}?.message as string}
                </span>
            </label>
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
      if (field.multiple) {
        const val = dotAccessor(field.key, "${index}", field.accessor);

        const valError = accessor(
          `${accessor(
            "(errors as any)",
            field.key,
            undefined,
            false,
          )}?.[index]`,
          undefined,
          field.accessor,
        );

        return `
                    <>
                        {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                            <label key={index}>
                                <span style={{ marginRight: "8px" }}>
                                    ${translatePrettyString({
                                      resource,
                                      field,
                                      i18n,
                                      noQuotes: true,
                                    })}
                                </span>
                                <input ${
                                  field.type !== "richtext"
                                    ? `
                                type="${
                                  field.type !== "date" ? field.type : "text"
                                }"
                                `
                                    : ""
                                } {...register(\`${val}\`, { required: "This field is required", ${
                                  field.type === "number"
                                    ? "valueAsNumber: true,"
                                    : ""
                                } })} />
                                <span style={{color: "red"}}>
                                {${accessor(valError, "message")} as string}
                                </span>
                            </label>
                        ))}
                    </>
                `;
      }
      const inp = field.type === "richtext" ? "textarea" : "input";
      return jsx`
            <label>
                <span style={{ marginRight: "8px" }}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</span>
                <${inp}
                ${isIDKey(field.key) ? "disabled" : ""}
                ${
                  field.type !== "date" && field.type !== "richtext"
                    ? `type="${field.type}"`
                    : ""
                }
                ${
                  inp === "textarea"
                    ? `
                    rows={5}
                    cols={33}
                    style={{ verticalAlign: "top" }}
                `
                    : ""
                }
                {...register("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}", {
                    required: "This field is required",
                    ${field.type === "number" ? "valueAsNumber: true," : ""}
                })}
                />
                <span style={{ color: "red" }}>
                {${accessor(
                  "(errors as any)",
                  field.key,
                  field.accessor,
                  false,
                )}?.message as string}
                </span>
            </label>
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      if (field.multiple) {
        const val = dotAccessor(field.key, undefined, field.accessor);

        const errorVal = `${accessor(
          "(errors as any)",
          field.key,
          undefined,
          false,
        )}?.[index]`;

        return `
                    <>
                        {${accessor(recordName, field.key)}?.map((item: any, index: number) => (
                            <label key={index}>
                            <span style={{ marginRight: "8px" }}>
                            ${translatePrettyString({
                              resource,
                              field,
                              i18n,
                              noQuotes: true,
                            })}
                            </span>
                            <input
                                type="checkbox"
                                {...register(\`${val}.\${index}\`, {
                                    required: "This field is required",
                                })}
                            />
                            <span style={{ color: "red" }}>
                                {${errorVal}?.message as string}
                            </span>
                        ))}
                    </>
                `;
      }

      return jsx`
            <label>
                <span style={{ marginRight: "8px" }}>${translatePrettyString({
                  resource,
                  field,
                  i18n,
                  noQuotes: true,
                })}</span>
                <input type="checkbox" {...register("${dotAccessor(
                  field.key,
                  undefined,
                  field.accessor,
                )}", {
                    required: "This field is required",
                })} />
                <span style={{ color: "red" }}>
                    {${accessor("errors", field.key, field.accessor, false)}?.message as string}
                </span>
            </label>
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
      case "date":
        return basicInputFields(field);
      case "boolean":
        return booleanFields(field);
      case "relation":
        return renderRelationFields(field);
      default:
        return undefined;
    }
  });

  const canList = !!resource.list;

  noOp(imports);
  const useTranslateHook = i18n && "const translate = useTranslate();";

  return jsx`
    ${printImports(imports)}
    
    export const ${COMPONENT_NAME} = () => {
        ${useTranslateHook}
        ${
          canList
            ? `
        const { list } = useNavigation();
        `
            : ""
        }
        const {
            refineCore: { onFinish, formLoading, query },
            register,
            handleSubmit,
            setValue,
            formState: { errors },
        } = useForm(
            ${
              isCustomPage
                ? `
            { 
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
                  ? `{ refineCoreProps: {
                        ${getMetaProps(
                          resource?.identifier ?? resource?.name,
                          meta,
                          ["update", "getOne"],
                        )}
                    } }`
                  : ""
            }
        );
    
        const ${recordName} = query?.data?.data;
    
        ${relationHooksCode}

        return (
            <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: ${
                  canList ? '"space-between"' : '"flex-start"'
                } }}>
                    <h1>${translateActionTitle({
                      resource,
                      action: "edit",
                      i18n,
                    })}</h1>
                    ${
                      canList
                        ? jsx`
                    <div>
                        <button
                                onClick={() => {
                                    list("${resource.name}");
                                }}
                        >
                            ${translateActionTitle({
                              resource,
                              action: "list",
                              i18n,
                            })}
                        </button>
                    </div>
                    `
                        : ""
                    }
                </div>
                <form onSubmit={handleSubmit(onFinish)}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        ${renderedFields.join("")}
                        <div>
                            <input type="submit" value=${translateButtonTitle({
                              action: "save",
                              i18n,
                            })} />
                        </div>
                    </div>
                </form>
            </div>
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
    ["@refinedev/react-hook-form", "RefineReactHookForm", { useForm }],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
