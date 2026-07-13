```css live shared
body {
  padding: 4px;
  background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { HttpError } from "@refinedev/core";

import {
  List,
  TagField,
  useTable,
  // highlight-next-line
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table } from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
}

const PostList: React.FC = () => {
  // highlight-start
  const { tableProps, sorters } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
  // highlight-end

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          // highlight-start
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          // highlight-end
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          // highlight-start
          sorter={{ multiple: 1 }}
          defaultSortOrder={getDefaultSortOrder("title", sorters)}
          // highlight-end
        />
        <Table.Column dataIndex="content" title="Content" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <TagField value={value} />}
        />
      </Table>
    </List>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```
