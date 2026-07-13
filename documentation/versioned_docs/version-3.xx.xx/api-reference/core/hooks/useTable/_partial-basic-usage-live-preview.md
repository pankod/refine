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
import {
    IResourceComponentsProps,
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
    const { tableQueryResult } = useTable<IPost, HttpError>();
    const posts = tableQueryResult?.data?.data ?? [];

    if (tableQueryResult?.isLoading) {
        return <div>Loading...</div>;
    }

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
                    {posts.map((post) => (
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
