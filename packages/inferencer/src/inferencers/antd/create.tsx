import { Create, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
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
  getOptionLabel,
  getVariableName,
  translatePrettyString,
  getMetaProps,
  shouldDotAccess,
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
 * a renderer function for create page in Ant Design
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
    ["React", "react", true],
    ["Create", "@refinedev/antd"],
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
      if (isIDKey(field.key)) {
        return undefined;
      }

      if (field.multiple) {
        return undefined;
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
                    <Input  />
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
        return undefined;
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
        return undefined;
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
                      action: "create",
                      ${getMetaProps(
                        resource.identifier ?? resource.name,
                        meta,
                        ["create", "getOne"],
                      )}
                  }`
            : getMetaProps(resource?.identifier ?? resource?.name, meta, [
                  "create",
                  "getOne",
                ])
              ? `{
                  ${getMetaProps(resource?.identifier ?? resource?.name, meta, [
                    "create",
                    "getOne",
                  ])}
              }`
              : ""
        });
    
        ${relationHooksCode}

        return (
            <Create saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    ${renderedFields.join("")}
                </Form>
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
    [
      "@refinedev/antd",
      "RefineAntd",
      { Create, useForm, useSelect, getValueFromEvent },
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
