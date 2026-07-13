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
    // highlight-next-line
    useMany,
    HttpError,
} from "@pankod/refine-core";

// highlight-start
interface ICategory {
    id: number;
    title: string;
}
// highlight-end

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    // highlight-start
    category: {
        id: number;
    };
    // highlight-end
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableQueryResult } = useTable<IPost, HttpError>();
    const posts = tableQueryResult?.data?.data ?? [];

    // highlight-start
    // Fetches the category of each post. It uses the useMany hook to fetch the category data from the API.
    const { data: categoryData, isLoading: categoryIsLoading } = useMany<
        ICategory,
        HttpError
    >({
        resource: "categories",
        // Creates the array of ids. This will filter and fetch the category data for the relevant posts.
        ids: posts.map((item) => item?.category?.id),
        queryOptions: {
            // Set to true only if the posts array is not empty.
            enabled: !!posts.length,
        },
    });
    // highlight-end

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
                        {/* highlight-next-line */}
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>{new Date(post.createdAt).toDateString()}</td>
                            {/* highlight-start */}
                            <td>
                                {categoryIsLoading
                                    ? "loading..."
                                    : // Gets the title of the category from the categoryData object, which is the result of    the useMany hook.
                                      categoryData?.data.find(
                                          (item) =>
                                              item.id === post.category.id,
                                      )?.title || "-"}
                            </td>
                            {/* highlight-end */}
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
