import {
  List,
  usePagination,
  TagField,
  EmailField,
  UrlField,
  BooleanField,
  DateField,
  MarkdownField,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  IconButton,
  Box,
  Image,
} from "@chakra-ui/react";
import { useTable } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

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
 * a renderer function for list page in Chakra UI
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
    ["List", "@refinedev/chakra-ui"],
    ["TableContainer", "@chakra-ui/react"],
    ["Table", "@chakra-ui/react"],
    ["Thead", "@chakra-ui/react"],
    ["Tr", "@chakra-ui/react"],
    ["Th", "@chakra-ui/react"],
    ["Tbody", "@chakra-ui/react"],
    ["Td", "@chakra-ui/react"],
    ["HStack", "@chakra-ui/react"],
    ["Button", "@chakra-ui/react"],
    ["IconButton", "@chakra-ui/react"],
    ["usePagination", "@refinedev/chakra-ui"],
    ["Box", "@chakra-ui/react"],
    ["IconChevronRight", "@tabler/icons-react"],
    ["IconChevronLeft", "@tabler/icons-react"],
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
      const variableName = `${getVariableName(field.key, "Data")}`;

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
        imports.push(["TagField", "@refinedev/chakra-ui"]);
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

                    const ${getVariableName(field.key, "")} = getValue<any[]>()?.map((item) => {
                                return meta.${getVariableName(
                                  field.key,
                                  "Data",
                                )}?.data?.find(
                            (resourceItems) => resourceItems.id === ${accessor(
                              "item",
                              undefined,
                              field.accessor,
                            )}
                        );
                    })


                    return (
                        <HStack>
                            {${getVariableName(field.key, "")}?.map((item, index) => (
                                <TagField key={index} value={${val}} />
                            ))}
                        </HStack>
                    )
                }
            `;
      } else {
        if (field?.relationInfer) {
          const cannotRender =
            field?.relationInfer?.type === "object" &&
            !field?.relationInfer?.accessor;

          if (!cannotRender) {
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
                          "",
                        )} = meta.${variableName}?.data?.find(
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
      imports.push(["Image", "@chakra-ui/react"]);

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
                                <HStack>
                                    {getValue<any[]>()?.map((item, index) => (
                                        <Image src={${val}} key={index} sx={{ height: "50px", maxWidth: "100px" }} />
                                    ))}
                                </HStack>
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
      imports.push(["EmailField", "@refinedev/chakra-ui"]);

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
        imports.push(["TagField", "@refinedev/chakra-ui"]);

        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <HStack>
                                {getValue<any[]>()?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                            </HStack>
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
      imports.push(["UrlField", "@refinedev/chakra-ui"]);

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
        imports.push(["TagField", "@refinedev/chakra-ui"]);

        const val = accessor("item", undefined, field.accessor, " + ");

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <HStack>
                                {getValue<any[]>()?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                            </HStack>
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
      imports.push(["BooleanField", "@refinedev/chakra-ui"]);

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
                            <HStack>
                                {getValue<any[]>()?.map((item, index) => (
                                    <BooleanField value={${val}} key={index} />
                                ))}
                            </HStack>
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
      imports.push(["DateField", "@refinedev/chakra-ui"]);

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
                            <HStack>
                                {getValue<any[]>()?.map((item, index) => (
                                    <DateField value={${val}} key={index} />
                                ))}
                            </HStack>
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
      imports.push(["MarkdownField", "@refinedev/chakra-ui"]);

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
                            <HStack>
                                {getValue<string[]>()?.map((item, index) => (
                                    <MarkdownField value={${val}} key={index} />
                                ))}
                            </HStack>
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
        imports.push(["TagField", "@refinedev/chakra-ui"]);

        const val = accessor("item", undefined, field.accessor, ' + " " + ');

        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <HStack>
                                {getValue<any[]>()?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                            </HStack>
                        )
                    }
                `;
      }

      if (!field.multiple && Array.isArray(field.accessor)) {
        cell = `
                    cell: function render({ getValue }) {
                        return (
                            <>{${accessor(
                              "getValue<any>()",
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
    imports.push(["EditButton", "@refinedev/chakra-ui"]);
  }
  if (canShow) {
    imports.push(["ShowButton", "@refinedev/chakra-ui"]);
  }
  if (canDelete) {
    imports.push(["DeleteButton", "@refinedev/chakra-ui"]);
  }

  const actionButtons =
    canEdit || canShow || canDelete
      ? jsx`
    {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
            return (
                <HStack>
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
                        ? jsx`
                    <EditButton
                        hideText
                        recordItemId={getValue() as string}
                    />
                    `
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
                </HStack>
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
                setOptions
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
                <TableContainer whiteSpace="pre-line">
                    <Table variant="simple">
                        <Thead>
                            {getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th key={header.id}>
                                            {!header.isPlaceholder && (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )
                                            )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                            {getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Pagination
                    current={currentPage}
                    pageCount={pageCount}
                    setCurrent={setCurrentPage}
                />
            </List>   
        );
    };

    type PaginationProps = {
        current: number;
        pageCount: number;
        setCurrent: (page: number) => void;
    };

    const Pagination: React.FC<PaginationProps> = ({
        current,
        pageCount,
        setCurrent,
    }) => {
        const pagination = usePagination({
            current,
            pageCount,
        });
    
        return (
            <Box display="flex" justifyContent="flex-end">
                <HStack my="3" spacing="1">
                    {pagination?.prev && (
                        <IconButton
                            aria-label="previous page"
                            onClick={() => setCurrent(current - 1)}
                            disabled={!pagination?.prev}
                            variant="outline"
                        >
                            <IconChevronLeft size="18" />
                        </IconButton>
                    )}
    
                    {pagination?.items.map((page) => {
                        if (typeof page === "string")
                            return <span key={page}>...</span>;
    
                        return (
                            <Button
                                key={page}
                                onClick={() => setCurrent(page)}
                                variant={page === current ? "solid" : "outline"}
                            >
                                {page}
                            </Button>
                        );
                    })}
                    {pagination?.next && (
                        <IconButton
                            aria-label="next page"
                            onClick={() => setCurrent(current + 1)}
                            variant="outline"
                        >
                            <IconChevronRight size="18" />
                        </IconButton>
                    )}
                </HStack>
            </Box>
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
      "@refinedev/chakra-ui",
      "RefineChakraUI",
      {
        List,
        usePagination,
        TagField,
        EmailField,
        UrlField,
        BooleanField,
        DateField,
        MarkdownField,
        EditButton,
        ShowButton,
        DeleteButton,
      },
    ],
    ["@refinedev/react-table", "RefineReactTable", { useTable }],
    [
      "@tabler/icons-react",
      "TablerIcons",
      { IconChevronRight, IconChevronLeft },
    ],
    [
      "@chakra-ui/react",
      "ChakraUI",
      {
        TableContainer,
        Table,
        Thead,
        Tr,
        Th,
        Tbody,
        Td,
        HStack,
        Button,
        IconButton,
        Box,
        Image,
      },
    ],
    ["@tanstack/react-table", "TanstackReactTable", { flexRender }],
  ],
  codeViewerComponent: SharedCodeViewer,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  renderer,
});
