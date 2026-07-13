import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TagField,
  EmailField,
  UrlField,
  BooleanField,
  DateField,
  MarkdownField,
} from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { ScrollArea, Table, Pagination, Group, Image } from "@mantine/core";
import { flexRender } from "@tanstack/react-table";

import { createInferencer } from "../../create-inferencer";
import {
  jsx,
  componentName,
  accessor,
  printImports,
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
  ImportElement,
  InferencerResultComponent,
  InferField,
  RendererContext,
} from "../../types";

const getAccessorKey = (field: InferField) => {
  return Array.isArray(field.accessor) || field.multiple
    ? `accessorKey: "${field.key}"`
    : field.accessor
      ? `accessorKey: "${dotAccessor(field.key, undefined, field.accessor)}"`
      : `accessorKey: "${field.key}"`;
};

/**
 * a renderer function for list page in Mantine
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
    "list",
  );
  const recordName = "tableData?.data";
  const imports: Array<ImportElement> = [
    ["useTable", "@refinedev/react-table"],
    ["ColumnDef", "@tanstack/react-table"],
    ["flexRender", "@tanstack/react-table"],
    ["ScrollArea", "@mantine/core"],
    ["List", "@refinedev/mantine"],
    ["Table", "@mantine/core"],
    ["Pagination", "@mantine/core"],
    ["Group", "@mantine/core"],
    ["EditButton", "@refinedev/mantine"],
    ["ShowButton", "@refinedev/mantine"],
    ["DeleteButton", "@refinedev/mantine"],
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
        imports.push(["GetManyResponse", "@refinedev/core"]);
        imports.push(["useMany", "@refinedev/core"]);

        let idsString = "";

        if (field.multiple) {
          idsString = `[].concat(...(${recordName}?.map((item) => ${accessor(
            "item",
            field.key,
            field.accessor,
            false,
          )}) ?? []))`;
        } else {
          idsString = `${recordName}?.map((item) => ${accessor(
            "item",
            field.key,
            field.accessor,
            false,
          )}) ?? []`;
        }

        return `
                const { result: ${getVariableName(field.key, "Data")} } =
                useMany({
                    resource: "${field.resource.name}",
                    ids: ${idsString},
                    queryOptions: {
                        enabled: !!${recordName},
                    },
                    ${getMetaProps(
                      field?.resource?.identifier ?? field?.resource?.name,
                      meta,
                      ["getMany"],
                    )}
                });
                `;
      }
      return undefined;
    })
    .filter(Boolean);

  const relationVariableNames = relationFields
    ?.map((field) => {
      if (field?.resource) {
        return getVariableName(field.key, "Data");
      }
      return undefined;
    })
    .filter(Boolean);

  const renderRelationFields = (field: InferField) => {
    if (field.relation && field.resource) {
      const variableName = `${getVariableName(field.key, "Data")}?.data`;

      if (Array.isArray(field.accessor)) {
        // not handled - not possible case
        return undefined;
      }

      const id = `id: "${field.key}"`;
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;
      const accessorKey = getAccessorKey(field);

      let cell = "";

      // if multiple, then map it with tagfield
      // if not, then just show the value

      if (field.multiple) {
        imports.push(["TagField", "@refinedev/mantine"]);
        let val = "item";

        // for multiple
        if (field?.relationInfer) {
          val = accessor("item", undefined, field.relationInfer.accessor);
        }

        if (
          field?.relationInfer &&
          field?.relationInfer?.type === "object" &&
          !field?.relationInfer?.accessor
        ) {
          console.log(
            "@refinedev/inferencer: Inferencer failed to render this field",
            {
              key: field.key,
              relation: field.relationInfer,
            },
          );

          return `cell: function render({ getValue }) {
                        return (
                            <span title="Inferencer failed to render this field (Cannot find key)">Cannot Render</span>
                        )
                    }`;
        }

        cell = `cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        ${getVariableName(field.key, "Data")}: GetManyResponse;
                    };

                    const ${getVariableName(field.key)} = getValue<any[]>()?.map((item) => {
                        return meta.${getVariableName(field.key, "Data")}?.data?.find(
                            (resourceItems) => resourceItems.id === ${accessor(
                              "item",
                              undefined,
                              field.accessor,
                            )}
                        );
                    })

                    return (
                        <Group spacing="xs">
                            {${getVariableName(field.key)}?.map((item, index) => (
                                <TagField key={index} value={${val}} />
                            ))}
                        </Group>
                    )
                }
            `;
      } else {
        if (field?.relationInfer) {
          // if relationInfer type is object and accessor is undefined then don't try to render
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

          cell = `cell: function render({ getValue, table }) {
                        const meta = table.options.meta as {
                            ${getVariableName(field.key, "Data")}: GetManyResponse;
                        };

                        const ${getVariableName(
                          field.key,
                        )} = meta.${variableName}?.find(
                            (item) => item.id == getValue<any>(),
                        );

                        return ${
                          cannotRender
                            ? `<span title="Inferencer failed to render this field (Cannot find key)">Cannot Render</span>`
                            : `${accessor(
                                getVariableName(field.key),
                                undefined,
                                field?.relationInfer?.accessor,
                              )} ?? "Loading..."`
                        };
                    },`;
        } else {
          cell = "";
        }
      }

      return `
                {
                    ${id},
                    ${header},
                    ${accessorKey},
                    ${cell}
                }
            `;
    }
    return undefined;
  };

  const imageFields = (field: InferField) => {
    if (field.type === "image") {
      imports.push(["Image", "@mantine/core"]);

      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = jsx`
                cell: function render({ getValue }) {
                    ${field?.accessor ? "try {" : ""}
                        return <Image sx={{ maxWidth: "100px" }} src={${accessor(
                          "getValue<any>()",
                          undefined,
                          Array.isArray(field.accessor)
                            ? field.accessor
                            : undefined,
                          " + ",
                        )}} />
                    ${
                      field?.accessor ? " } catch (error) { return null; }" : ""
                    }
                   
                }
            `;

      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        ${field?.accessor ? "try {" : ""}
                            return (
                                <Group spacing="xs">
                                    {getValue<any[]>()?.map((item, index) => (
                                        <Image src={${val}} key={index} sx={{ maxWidth: "100px" }} />
                                    ))}
                                </Group>
                            )
                        ${
                          field?.accessor
                            ? " } catch (error) { return null; }"
                            : ""
                        }
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }
    return undefined;
  };

  const emailFields = (field: InferField) => {
    if (field.type === "email") {
      imports.push(["EmailField", "@refinedev/mantine"]);

      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = jsx`
                cell: function render({ getValue }) {
                    return <EmailField value={${accessor(
                      "getValue<any>()",
                      undefined,
                      Array.isArray(field.accessor)
                        ? field.accessor
                        : undefined,
                      ' + " " + ',
                    )}} />
                }
            `;

      if (field.multiple) {
        imports.push(["TagField", "@refinedev/mantine"]);

        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <Group spacing="xs">
                                {getValue<any>()?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                            </Group>
                        )
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }
    return undefined;
  };

  const urlFields = (field: InferField) => {
    if (field.type === "url") {
      imports.push(["UrlField", "@refinedev/mantine"]);

      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = jsx`
                cell: function render({ getValue }) {
                    return <UrlField value={${accessor(
                      "getValue<any>()",
                      undefined,
                      Array.isArray(field.accessor)
                        ? field.accessor
                        : undefined,
                      " + ",
                    )}} />
                }
            `;

      if (field.multiple) {
        imports.push(["TagField", "@refinedev/mantine"]);

        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <Group spacing="xs">
                                {getValue<any[]>()?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                            </Group>
                        )
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }
    return undefined;
  };

  const booleanFields = (field: InferField) => {
    if (field?.type === "boolean") {
      imports.push(["BooleanField", "@refinedev/mantine"]);

      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = jsx`
                cell: function render({ getValue }) {
                    return <BooleanField value={${accessor(
                      "getValue<any>()",
                      undefined,
                      Array.isArray(field.accessor)
                        ? field.accessor
                        : undefined,
                      " + ",
                    )}} />
                }
            `;

      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <Group spacing="xs">
                                {getValue<any[]>()?.map((item, index) => (
                                    <BooleanField value={${val}} key={index} />
                                ))}
                            </Group>
                        )
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }

    return undefined;
  };

  const dateFields = (field: InferField) => {
    if (field.type === "date") {
      imports.push(["DateField", "@refinedev/mantine"]);

      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = jsx`
                cell: function render({ getValue }) {
                    return <DateField value={${accessor(
                      "getValue<any>()",
                      undefined,
                      Array.isArray(field.accessor)
                        ? field.accessor
                        : undefined,
                      ' + " " + ',
                    )}} />
                }
            `;

      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <Group spacing="xs">
                                {getValue<any[]>()?.map((item, index) => (
                                    <DateField value={${val}} key={index} />
                                ))}
                            </Group>
                        )
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }
    return undefined;
  };

  const richtextFields = (field: InferField) => {
    if (field?.type === "richtext") {
      imports.push(["MarkdownField", "@refinedev/mantine"]);

      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = jsx`
                cell: function render({ getValue }) {
                    return <MarkdownField value={(${accessor(
                      "getValue<string>()",
                      undefined,
                      Array.isArray(field.accessor)
                        ? field.accessor
                        : undefined,
                    )})?.slice(0, 80) + "..." } />
                }
            `;

      if (field.multiple) {
        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <Group spacing="xs">
                                {getValue<string[]>()?.map((item, index) => (
                                    <MarkdownField value={${val}} key={index} />
                                ))}
                            </Group>
                        )
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }

    return undefined;
  };

  const basicFields = (field: InferField) => {
    if (field && (field.type === "text" || field.type === "number")) {
      const id = `id: "${field.key}"`;
      const accessorKey = getAccessorKey(field);
      const header = `header: ${translatePrettyString({
        resource,
        field,
        i18n,
        noBraces: true,
      })}`;

      let cell = "";

      if (field.multiple) {
        imports.push(["TagField", "@refinedev/mantine"]);

        const val = accessor("item", undefined, field.accessor, ' + " " + ');

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <Group spacing="xs">
                                {getValue<any[]>()?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                            </Group>
                        )
                    }
                `;
      }

      if (!field.multiple && Array.isArray(field.accessor)) {
        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <>{${accessor(
                              "getValue()",
                              field.key,
                              field.accessor,
                            )}}</>
                        );
                    }
                `;
      }

      return `
                {
                    ${id},
                    ${accessorKey},
                    ${header},
                    ${cell}
                }
            `;
    }
    return undefined;
  };

  const { meta: resourceMeta, edit, show } = resource ?? {};

  const canEdit = edit || resourceMeta?.canEdit;
  const canShow = show || resourceMeta?.canShow;
  const canDelete = resourceMeta?.canDelete;

  if (canEdit) {
    imports.push(["EditButton", "@refinedev/mantine"]);
  }
  if (canShow) {
    imports.push(["ShowButton", "@refinedev/mantine"]);
  }
  if (canDelete) {
    imports.push(["DeleteButton", "@refinedev/mantine"]);
  }

  const actionColumnTitle = i18n ? `translate("table.actions")` : `"Actions"`;
  const actionButtons =
    canEdit || canShow || canDelete
      ? jsx`
    {
        id: "actions",
        accessorKey: "id",
        header: ${actionColumnTitle},
        cell: function render({ getValue }) {
            return (
                <Group spacing="xs" noWrap>
                    ${
                      canShow
                        ? jsx`
                    <ShowButton
                        hideText
                        recordItemId={getValue() as string}
                    />
                    `
                        : ""
                    }
                    ${
                      canEdit
                        ? jsx`<EditButton
                        hideText
                        recordItemId={getValue() as string}
                    />`
                        : ""
                    }
                    ${
                      canDelete
                        ? jsx`
                    <DeleteButton
                        hideText
                        recordItemId={getValue() as string}
                    />
                    `
                        : ""
                    }
                </Group>
            );
        },
    },
        `
      : "";

  const renderedFields: Array<string | undefined> = fields.map((field) => {
    switch (field?.type) {
      case "text":
      case "number":
        return basicFields(field);
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
    import React from "react";
    ${printImports(imports)}
    
    export const ${COMPONENT_NAME} = () => {
        ${useTranslateHook}
        const columns = React.useMemo<ColumnDef<any>[]>(() => [
            ${[...renderedFields, actionButtons].filter(Boolean).join(",")}
        ], [${i18n ? "translate" : ""}]);

        const {
            reactTable: {
                getHeaderGroups,
                getRowModel,
                setOptions,
            },
            refineCore: {
                setCurrentPage,
                pageCount,
                currentPage,
                tableQuery: { data: tableData },
            },
        } = useTable({
            columns,
            ${
              isCustomPage
                ? `
            refineCoreProps: {
                resource: "${resource.name}",
                ${getMetaProps(resource?.identifier ?? resource?.name, meta, [
                  "getList",
                ])}
            }
            `
                : getMetaProps(resource?.identifier ?? resource?.name, meta, [
                      "getList",
                    ])
                  ? `refineCoreProps: { ${getMetaProps(
                      resource?.identifier ?? resource?.name,
                      meta,
                      ["getList"],
                    )} },`
                  : ""
            }
        });

        ${relationHooksCode}

        setOptions((prev) => ({
            ...prev,
            meta: {
                ...prev.meta,
                ${relationVariableNames.join(", ")}
            },
        }));

        return (
            <List>
                <ScrollArea>
                    <Table highlightOnHover>
                        <thead>
                            {getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id}>
                                                {!header.isPlaceholder && (
                                                    flexRender(
                                                        header.column
                                                            .columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </ScrollArea>    
                <br />
                <Pagination
                    position="right"
                    total={pageCount}
                    page={currentPage}
                    onChange={setCurrentPage}
                />
            </List>
        );
    };
    `;
};

/**
 * @experimental This is an experimental component
 */
export const ListInferencer: InferencerResultComponent = createInferencer({
  type: "list",
  additionalScope: [
    [
      "@refinedev/mantine",
      "RefineMantine",
      {
        List,
        EditButton,
        ShowButton,
        DeleteButton,
        TagField,
        EmailField,
        UrlField,
        BooleanField,
        DateField,
        MarkdownField,
      },
    ],
    ["@refinedev/react-table", "RefineReactTable", { useTable }],
    [
      "@mantine/core",
      "MantineCore",
      { ScrollArea, Table, Pagination, Group, Image },
    ],
    ["@tanstack/react-table", "TanstackReactTable", { flexRender }],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
