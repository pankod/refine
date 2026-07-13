```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                //highlight-start
                meta: {
                    filterOperator: "contains",
                },
                //highlight-end
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                //highlight-start
                meta: {
                    filterOperator: "contains",
                },
                //highlight-end
            },
            {
                id: "createdAt",
                header: "CreatedAt",
                accessorKey: "createdAt",
            },
        ],
        [],
    );

    const { getHeaderGroups, getRowModel } = useTable({
        columns,
    });

    return (
        <table>
            <thead>
                {getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            <div>
                                                {/* highlight-start */}
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
                                                {/* highlight-end */}
                                            </div>
                                        </>
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
        </table>
    );
};

// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```
