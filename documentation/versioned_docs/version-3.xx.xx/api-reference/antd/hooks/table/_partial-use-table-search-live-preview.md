```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";

import {
    List,
    Table,
    TagField,
    useTable,
    // highlight-start
    Form,
    SaveButton,
    Input,
    // highlight-end
} from "@pankod/refine-antd";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

interface ISearch {
    title: string;
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, searchFormProps } = useTable<IPost, HttpError, ISearch>(
        {
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
        },
    );

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
