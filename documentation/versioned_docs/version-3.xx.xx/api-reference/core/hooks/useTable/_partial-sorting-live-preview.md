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
    const { tableQueryResult, sorter, setSorter } = useTable<IPost, HttpError>({
        // highlight-start
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        // highlight-end
    });

    // Fetches the posts for the current page
    const posts = tableQueryResult?.data?.data ?? [];

    // Gets the current sort order for the fields
    // highlight-start
    const currentSorterOrders = useMemo(() => {
        return {
            createdAt:
                sorter.find((item) => item.field === "createdAt")?.order ||
                "desc",
            id: sorter.find((item) => item.field === "id")?.order || "desc",
            title:
                sorter.find((item) => item.field === "title")?.order || "asc",
        };
    }, [sorter]);
    // highlight-end

    // highlight-start
    const toggleSort = (field: string) => {
        setSorter([
            {
                field,
                order: currentSorterOrders[field] === "asc" ? "desc" : "asc",
            },
        ]);
    };
    // highlight-end

    return (
        <div>
            {/* highlight-start */}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <button onClick={() => toggleSort("createdAt")}>
                    Sort date by{" "}
                    {currentSorterOrders["createdAt"] === "asc"
                        ? "desc"
                        : "asc"}
                </button>
                <button onClick={() => toggleSort("id")}>
                    Sort id by{" "}
                    {currentSorterOrders["id"] === "asc" ? "desc" : "asc"}
                </button>
                <button onClick={() => toggleSort("title")}>
                    Sort title by{" "}
                    {currentSorterOrders["title"] === "asc" ? "desc" : "asc"}
                </button>
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
