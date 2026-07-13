import { Edit, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Select, Upload, Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  prettyString,
  accessor,
  printImports,
  isIDKey,
  noOp,
  getVariableName,
  translatePrettyString,
  getMetaProps,
  shouldDotAccess,
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
 * a renderer function for edit page in Ant Design
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
    ["Edit", "@refinedev/antd"],
    ["Form", "antd"],
    ["useForm", "@refinedev/antd"],
    ["Input", "antd"],
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
        imports.push(["useSelect", "@refinedev/antd"]);

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
                const { selectProps: ${getVariableName(
                  field.key,
                  "SelectProps",
                )} } =
                useSelect({
                    resource: "${field.resource.name}",
                    defaultValue: ${val},
                    ${
                      field.relationInfer
                        ? field.relationInfer.accessor
                          ? typeof field.relationInfer.accessor === "string"
                            ? field.relationInfer.accessor !== "title"
                              ? `optionLabel: "${field.relationInfer.accessor}",`
                              : ""
                            : `optionLabel: "${field.relationInfer.accessor[0]}",`
                          : ""
                        : ""
                    }
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
      imports.push(["Select", "antd"]);
      const variableName = getVariableName(field.key, "SelectProps");

      const name = field.accessor
        ? field.multiple
          ? `"${field.key}"`
          : `["${field.key}", "${field.accessor}"]`
        : `"${field.key}"`;

      let valueProps = "";
      let valueEvent = "";

      if (field.accessor && field.multiple) {
        const canDot = shouldDotAccess(`${field.accessor}`);
        valueEvent = `getValueFromEvent={(selected: string[]) => {
                    return selected?.map((item) => ({ ${
                      canDot ? field.accessor : `["${field.accessor}"]`
                    }: item }));
                }}`;
        valueProps = `getValueProps={(value: any[]) => {
                    return {
                        value: value?.map((item) => ${accessor(
                          "item",
                          undefined,
                          field.accessor,
                        )}),
                    };
                }}`;
      }

      return jsx`
                <Form.Item
                    label=${translatePrettyString({
                      resource,
                      field,
                      i18n,
                    })}
                    name={${name}}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    ${valueProps}
                    ${valueEvent}
                >
                    <Select ${
                      field.multiple ? 'mode="multiple"' : ""
                    } {...${variableName}} />
                </Form.Item>             
                `;
    }
    return undefined;
  };

  const basicInputFields = (field: InferField) => {
    if (
      field.type === "text" ||
      field.type === "url" ||
      field.type === "email" ||
      field.type === "number"
    ) {
      if (field.multiple) {
        const val = accessor(field.key, "index", field.accessor)
          .split("?.")
          .map((el) => `"${el}"`)
          .join(", ")
          .replace(/"index"/, "index");

        return `
                    <>
                        {(${accessor(recordName, field.key)} as any[])?.map((item, index) => (
                            <Form.Item
                                key={index}
                                label=${translatePrettyString({
                                  resource,
                                  field,
                                  i18n,
                                })}
                                name={[${val}]}
                            >
                                <Input
                                    type="${field.type}"
                                ${isIDKey(field.key) ? "readOnly disabled" : ""} />
                            </Form.Item>
                        ))}
                    </>
                `;
      }
      return jsx`
                <Form.Item
                    label=${translatePrettyString({
                      resource,
                      field,
                      i18n,
                    })}
                    name={["${field.key}"${
                      field.accessor ? `, "${field.accessor}"` : ""
                    }]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input ${isIDKey(field.key) ? "readOnly disabled" : ""} />
                </Form.Item>
            `;
    }
    return undefined;
  };

  const imageFields = (field: InferField) => {
    if (field.type === "image") {
      imports.push(
        ["Upload", "antd"],
        ["getValueFromEvent", "@refinedev/antd"],
      );
      let valueProps = 'valuePropName="fileList"';

      if (field.multiple && !field.accessor) {
        valueProps =
          "getValueProps={(value) => ({ fileList: value?.map((item: any) => ({ url: item, name: item, uid: item }))})}";
      }

      if (!field.multiple) {
        if (field.accessor) {
          valueProps =
            "getValueProps={(value) => ({ fileList: value ? [value] : [] })}";
        } else {
          valueProps =
            "getValueProps={(value) => ({ fileList: [{ url: value, name: value, uid: value }]})}";
        }
      }

      return jsx`
                <Form.Item label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })}>
                    <Form.Item
                        name="${field.key}"
                        ${valueProps}
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            listType="picture"
                            ${field.multiple ? "multiple" : ""}
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field.type === "boolean") {
      imports.push(["Checkbox", "antd"]);

      if (field.multiple) {
        const val = accessor(field.key, "index", field.accessor)
          .split("?.")
          .map((el) => `"${el}"`)
          .join(", ")
          .replace(/"index"/, "index");

        return `
                    <>
                        {(${accessor(recordName, field.key)} as any[])?.map((item, index) => (
                            <Form.Item
                                key={index}
                                valuePropName="checked"
                                label=${translatePrettyString({
                                  resource,
                                  field,
                                  i18n,
                                })}
                                name={[${val}]}
                            >
                                <Checkbox>${prettyString(field.key)}</Checkbox>
                            </Form.Item>
                        ))}
                    </>
                `;
      }
      return jsx`
                <Form.Item
                    label=${translatePrettyString({
                      resource,
                      field,
                      i18n,
                    })}
                    valuePropName="checked"
                    name={["${field.key}"${
                      field.accessor ? `, "${field.accessor}"` : ""
                    }]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Checkbox>${prettyString(field.key)}</Checkbox>
                </Form.Item>
            `;
    }
    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      imports.push(["DatePicker", "antd"], ["dayjs", "dayjs", true]);

      if (field.multiple) {
        const val = accessor(field.key, "index", field.accessor)
          .split("?.")
          .map((el) => `"${el}"`)
          .join(", ")
          .replace(/"index"/, "index");

        return jsx`
                    <>
                        {(${accessor(recordName, field.key)} as any[])?.map((item, index) => (
                            <Form.Item
                                key={index}
                                label=${translatePrettyString({
                                  resource,
                                  field,
                                  i18n,
                                })}
                                name={[${val}]}
                                getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
                            >
                                <DatePicker />
                            </Form.Item>
                        ))}
                    </>
                `;
      }
      return jsx`
                <Form.Item
                    label=${translatePrettyString({
                      resource,
                      field,
                      i18n,
                    })}
                    name={["${field.key}"${
                      field.accessor ? `, "${field.accessor}"` : ""
                    }]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
                >
                    <DatePicker />
                </Form.Item>
            `;
    }
    return undefined;
  };

  const richtextFields = (field: InferField) => {
    if (field.type === "richtext") {
      return jsx`
            <Form.Item
                label=${translatePrettyString({
                  resource,
                  field,
                  i18n,
                })}
                name="${field.key}"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.TextArea rows={5} />
            </Form.Item>
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
        return basicInputFields(field);
      case "richtext":
        return richtextFields(field);
      case "image":
        return imageFields(field);
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
        const { formProps, saveButtonProps, query } = useForm(${
          isCustomPage
            ? `{
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
              ? `{
                    ${getMetaProps(
                      resource?.identifier ?? resource?.name,
                      meta,
                      ["update", "getOne"],
                    )}
                }`
              : ""
        });
    
        const ${recordName} = query?.data?.data;
    
        ${relationHooksCode}

        return (
            <Edit saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    ${renderedFields.join("")}
                </Form>
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
    [
      "@refinedev/antd",
      "RefineAntd",
      { Edit, useForm, useSelect, getValueFromEvent },
    ],
    ["dayjs", "dayjs", dayjs, true],
    [
      "antd",
      "AntdPackage",
      { Form, Input, Select, Upload, Checkbox, DatePicker },
    ],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
