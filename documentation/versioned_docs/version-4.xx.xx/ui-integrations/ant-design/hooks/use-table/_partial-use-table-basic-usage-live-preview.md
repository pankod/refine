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

import { List, TagField, useTable } from "@refinedev/antd";
import { Table } from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
}

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost, HttpError>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
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

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
    },
  ],
});

render(<RefineAntdDemo />);
```
