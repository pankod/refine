import { useTable, useNavigation, useMany } from "@refinedev/core";

import type { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const { tableQuery: tableQueryResult } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
  });
  const { edit, create } = useNavigation();

  const categoryIds =
    tableQueryResult?.data?.data.map((item) => item.category.id) ?? [];
  const {
    result: data,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <div>
      <button onClick={() => create("posts")}>Create Post</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                {isLoading
                  ? "Loading"
                  : data?.data.find((item) => item.id === post.category.id)
                      ?.title}
              </td>
              <td>{post.status}</td>
              <td>
                <button onClick={() => edit("posts", post.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
