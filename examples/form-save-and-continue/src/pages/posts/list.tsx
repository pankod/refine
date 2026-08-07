import { useTable, useNavigation } from "@refinedev/core";

import type { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const { tableQuery: tableQueryResult } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
  const { edit, create } = useNavigation();

  return (
    <div>
      <button onClick={() => create("posts")}>Create Post</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
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
