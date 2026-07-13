import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseTanStackTable() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@tanstack/react-table": "latest",
        "@refinedev/react-table": "latest",
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
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <ProductTable />
        </Refine>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

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
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable<IProduct>({
        refineCoreProps: {
            resource: "products",
        },
        columns,
    });

    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? " ↕️"}
                                                </div>
                                            </>
                                        )}
                                        {header.column.getCanFilter() ? (
                                            <div>
                                                <input
                                                    value={
                                                        (header.column.getFilterValue() as string) ??
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        header.column.setFilterValue(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : null}
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
            </table>

            <div>
                <button
                    onClick={() => setPageIndex(0)}
                    disabled={!getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
                    {">"}
                </button>
                <button
                    onClick={() => setPageIndex(getPageCount() - 1)}
                    disabled={!getCanNextPage()}
                >
                    {">>"}
                </button>
                <span>
                    Page
                    <strong>
                        {getState().pagination.pageIndex + 1} of{" "}
                        {getPageCount()}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            setPageIndex(page);
                        }}
                    />
                </span>{" "}
                <select
                    value={getState().pagination.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

interface IProduct {
    id: number;
    name: string;
    price: string;
}

`.trim();
