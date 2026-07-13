import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseMantineTable() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/mantine": "latest",
        "@refinedev/react-table": "latest",
        "@tanstack/react-table": "latest",
        "@mantine/core": "^5.10.4",
        "@tabler/icons-react": "^3.1.0",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/product-table.tsx": {
          code: ProductTableTsxCode,
          hidden: false,
          active: true,
        },
        "/column-sorter.tsx": {
          code: ColumnSorterTsxCode,
          hidden: false,
        },
        "/column-filter.tsx": {
          code: ColumnFilterTsxCode,
          hidden: false,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { MantineProvider, Global } from "@mantine/core";
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <MantineProvider
                withNormalizeCSS
                withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine dataProvider={dataProvider(API_URL)}>
                <ProductTable />
            </Refine>
        </MantineProvider>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Box, Group, Table, Pagination } from "@mantine/core";

import { ColumnSorter } from "./column-sorter.tsx";
import { ColumnFilter } from "./column-filter.tsx";

export const ProductTable: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IProduct>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "price",
                header: "Price",
                accessorKey: "price",
                meta: {
                    filterOperator: "eq",
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        refineCoreProps: {
            resource: "products",
        },
        columns,
    });

    return (
        <div style={{ padding: "4px" }}>
            <h2>Products</h2>
            <Table highlightOnHover>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <Group spacing="xs" noWrap>
                                                <Box>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Box>
                                                <Group spacing="xs" noWrap>
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </Group>
                                            </Group>
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
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </div>
    );
};

interface IProduct {
    id: number;
    name: string;
    price: string;
}

`.trim();

export const ColumnSorterTsxCode = `
import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconSelector, IconChevronUp } from "@tabler/icons-react";

export interface ColumnButtonProps {
    column: Column<any, any>; // eslint-disable-line
}

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <ActionIcon
            size="xs"
            onClick={column.getToggleSortingHandler()}
            style={{
                transition: "transform 0.25s",
                transform: \`rotate(\${sorted === "asc" ? "180" : "0"}deg)\`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {!sorted && <IconSelector size={18} />}
            {sorted === "asc" && <IconChevronDown size={18} />}
            {sorted === "desc" && <IconChevronUp size={18} />}
        </ActionIcon>
    );
};
`.trim();

export const ColumnFilterTsxCode = `
import React, { useState } from "react";
import { Column } from "@tanstack/react-table";
import { TextInput, Menu, ActionIcon, Stack, Group } from "@mantine/core";
import { IconFilter, IconX, IconCheck } from "@tabler/icons-react";

interface ColumnButtonProps {
    column: Column<any, any>; // eslint-disable-line
}

export const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
    // eslint-disable-next-line
    const [state, setState] = useState(null as null | { value: any });

    if (!column.getCanFilter()) {
        return null;
    }

    const open = () =>
        setState({
            value: column.getFilterValue(),
        });

    const close = () => setState(null);

    // eslint-disable-next-line
    const change = (value: any) => setState({ value });

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    const renderFilterElement = () => {
        // eslint-disable-next-line
        const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

        if (!FilterComponent && !!state) {
            return (
                <TextInput
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return <FilterComponent value={state?.value} onChange={change} />;
    };

    return (
        <Menu
            opened={!!state}
            position="bottom"
            withArrow
            transition="scale-y"
            shadow="xl"
            onClose={close}
            width="256px"
            withinPortal
        >
            <Menu.Target>
                <ActionIcon
                    size="xs"
                    onClick={open}
                    variant={column.getIsFiltered() ? "light" : "transparent"}
                    color={column.getIsFiltered() ? "primary" : "gray"}
                >
                    <IconFilter size={18} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {!!state && (
                    <Stack p="xs" spacing="xs">
                        {renderFilterElement()}
                        <Group position="right" spacing={6} noWrap>
                            <ActionIcon
                                size="md"
                                color="gray"
                                variant="outline"
                                onClick={clear}
                            >
                                <IconX size={18} />
                            </ActionIcon>
                            <ActionIcon
                                size="md"
                                onClick={save}
                                color="primary"
                                variant="outline"
                            >
                                <IconCheck size={18} />
                            </ActionIcon>
                        </Group>
                    </Stack>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

`.trim();
