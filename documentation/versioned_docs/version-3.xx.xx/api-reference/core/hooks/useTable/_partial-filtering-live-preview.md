```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import React, { useMemo } from "react";
import {
    IResourceComponentsProps,
    useMany,
    useTable,
    HttpError,
} from "@pankod/refine-core";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableQueryResult, filters, setFilters } = useTable<
        IPost,
        HttpError
    >();

    // Fetches the posts for the current page
    const posts = tableQueryResult?.data?.data ?? [];

    // Gets the current filter values for the fields
    // highlight-start
    const currentFilterValues = useMemo(() => {
        // Filters can be a LogicalFilter or a ConditionalFilter. ConditionalFilter not have field property. So we need to filter them.
        // We use flatMap for better type support.
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
            id: logicalFilters.find((item) => item.field === "id")?.value || "",
            status:
                logicalFilters.find((item) => item.field === "status")?.value ||
                "",
        };
    }, [filters]);
    // highlight-end

    return (
        <div>
            {/* highlight-start */}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "4px",
                }}
            >
                <input
                    placeholder="Search by title"
                    value={currentFilterValues.title}
                    onChange={(e) => {
                        setFilters([
                            {
                                field: "title",
                                operator: "contains",
                                value: !!e.currentTarget.value
                                    ? e.currentTarget.value
                                    : undefined,
                            },
                        ]);
                    }}
                />
                <input
                    placeholder="Search by id"
                    value={currentFilterValues.id}
                    onChange={(e) => {
                        setFilters([
                            {
                                field: "id",
                                operator: "eq",
                                value: !!e.currentTarget.value
                                    ? e.currentTarget.value
                                    : undefined,
                            },
                        ]);
                    }}
                />

                <select
                    value={currentFilterValues.status}
                    onChange={(e) =>
                        setFilters(
                            [
                                {
                                    field: "status",
                                    operator: "eq",
                                    value: !!e.currentTarget.value
                                        ? e.currentTarget.value
                                        : undefined,
                                },
                            ],
                            "replace",
                        )
                    }
                >
                    <option value="">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            {/* highlight-end */}
            <h1>Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>{new Date(post.createdAt).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
