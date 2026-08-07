import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseChakraUITable() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-table": "latest",
        "@tanstack/react-table": "latest",
        "@refinedev/chakra-ui": "latest",
        "@chakra-ui/react": "^2.5.1",
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
        "/pagination.tsx": {
          code: PaginationTsxCode,
          hidden: false,
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
import { ChakraProvider } from "@chakra-ui/react";
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <ChakraProvider>
            <Refine dataProvider={dataProvider(API_URL)}>
                <ProductTable />
            </Refine>
        </ChakraProvider>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
} from "@chakra-ui/react";
import { Pagination } from "./pagination";

import { ColumnSorter } from "./column-sorter";
import { ColumnFilter } from "./column-filter";

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
        <div style={{ padding:"8px" }}>
            <Text fontSize='3xl'>Products</Text>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
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
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
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

export const PaginationTsxCode = `
import { FC } from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import { usePagination } from "@refinedev/chakra-ui";

export const Pagination: FC<PaginationProps> = ({
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
                    <Button
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        Prev
                    </Button>
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
                    <Button
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        Next
                    </Button>
                )}
            </HStack>
        </Box>
    );
};

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};
`.trim();

export const ColumnSorterTsxCode = `
import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

import type { SortDirection } from "@tanstack/react-table";

export interface ColumnButtonProps {
    column: Column<any, any>; // eslint-disable-line
}


export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            icon={<ColumnSorterIcon sorted={sorted} />}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        />
    );
};

const ColumnSorterIcon = ({ sorted }: { sorted: false | SortDirection }) => {
    if (sorted === "asc") return <IconChevronDown size={18} />;
    if (sorted === "desc") return <IconChevronUp size={18} />;
    return <IconSelector size={18} />;
};

`.trim();

export const ColumnFilterTsxCode = `
import React, { useState } from "react";
import {
    Input,
    Menu,
    IconButton,
    MenuButton,
    MenuList,
    VStack,
    HStack,
} from "@chakra-ui/react";
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
                <Input
                    borderRadius="md"
                    size="sm"
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return (
            <FilterComponent
                value={state?.value}
                onChange={(e: any) => change(e.target.value)}
            />
        );
    };

    return (
        <Menu isOpen={!!state} onClose={close}>
            <MenuButton
                onClick={open}
                as={IconButton}
                aria-label="Options"
                icon={<IconFilter size="16" />}
                variant="ghost"
                size="xs"
            />
            <MenuList p="2">
                {!!state && (
                    <VStack align="flex-start">
                        {renderFilterElement()}
                        <HStack spacing="1">
                            <IconButton
                                aria-label="Clear"
                                size="sm"
                                colorScheme="red"
                                onClick={clear}
                            >
                                <IconX size={18} />
                            </IconButton>
                            <IconButton
                                aria-label="Save"
                                size="sm"
                                onClick={save}
                                colorScheme="green"
                            >
                                <IconCheck size={18} />
                            </IconButton>
                        </HStack>
                    </VStack>
                )}
            </MenuList>
        </Menu>
    );
};
`.trim();
