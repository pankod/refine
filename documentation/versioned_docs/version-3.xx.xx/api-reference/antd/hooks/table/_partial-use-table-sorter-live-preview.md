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
    // highlight-next-line
    getDefaultSortOrder,
} from "@pankod/refine-antd";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    // highlight-start
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
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
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    // highlight-end
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    // highlight-start
                    sorter={{ multiple: 1 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
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
