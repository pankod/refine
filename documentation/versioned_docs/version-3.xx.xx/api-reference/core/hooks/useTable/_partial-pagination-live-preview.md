```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
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
    const {
        tableQueryResult,
        // highlight-start
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
        // highlight-end
    } = useTable<IPost, HttpError>();

    // Fetches the posts for the current page
    const posts = tableQueryResult?.data?.data ?? [];
    // highlight-start
    // Checks if there is a next page available
    const hasNext = current < pageCount;
    // Checks if there is a previous page available
    const hasPrev = current > 1;
    // highlight-end

    return (
        <div>
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
            {/* highlight-start */}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <div>
                    <button onClick={() => setCurrent(1)} disabled={!hasPrev}>
                        First
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => prev - 1)}
                        disabled={!hasPrev}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => prev + 1)}
                        disabled={!hasNext}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => setCurrent(pageCount)}
                        disabled={!hasNext}
                    >
                        Last
                    </button>
                </div>
                <span>
                    Page{" "}
                    <strong>
                        {current} of {pageCount}
                    </strong>
                </span>
                <span>
                    Go to page:
                    <input
                        type="number"
                        defaultValue={current + 1}
                        onChange={(e) => {
                            const value = e.target.value
                                ? Number(e.target.value)
                                : 1;
                            setCurrent(value);
                        }}
                    />
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        const value = e.target.value
                            ? Number(e.target.value)
                            : 10;
                        setPageSize(value);
                    }}
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
            {/* highlight-end */}
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
