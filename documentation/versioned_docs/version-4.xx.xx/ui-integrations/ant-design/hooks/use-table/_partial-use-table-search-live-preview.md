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
  // highlight-start
  SaveButton,
  // highlight-end
} from "@refinedev/antd";
import {
  Table,
  // highlight-start
  Form,
  Input,
  // highlight-end
} from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
}

interface ISearch {
  title: string;
}

const PostList: React.FC = () => {
  const { tableProps, searchFormProps } = useTable<IPost, HttpError, ISearch>({
    // highlight-start
    onSearch: (values) => {
      return [
        {
          field: "title",
          operator: "contains",
          value: values.title,
        },
      ];
    },
    // highlight-end
  });

  return (
    <List>
      {/* highlight-start */}
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="title">
          <Input placeholder="Search by title" />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      {/* highlight-end */}
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
