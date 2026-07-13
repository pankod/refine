```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
    IResourceComponentsProps,
    HttpError,
    useMany,
    getDefaultFilter,
} from "@pankod/refine-core";

import {
    List,
    Table,
    TagField,
    useTable,
    // highlight-start
    useSelect,
    FilterDropdown,
    Select,
    // highlight-end
} from "@pankod/refine-antd";

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
    // highlight-start
    category: {
        id: number;
    };
    // highlight-end
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, filters } = useTable<IPost, HttpError>();

    // highlight-start
    // Creates the array of ids. This will filter and fetch the category data for the relevant posts.
    const categoryIds =
        tableProps.dataSource?.map((p) => p.category.id.toString()) || [];
    // Fetches the category of each post. It uses the useMany hook to fetch the category data from the API.
    const { data, isFetching } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            // Set to true only if the posts array is not empty.
            enabled: categoryIds.length > 0,
        },
    });
    // highlight-end

    // highlight-start
    // Creates the props by needed the select component for filtering the posts by category.
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters, "in"),
    });
    // highlight-end

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="content" title="Content" />
                {/* highlight-start */}
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isFetching) return "loading...";
                        // Gets the title of the category from the data object, which is the result of the useMany hook.
                        return data?.data.find((p) => p.id === value)?.title;
                    }}
                    filterDropdown={(props: FilterDropdownProps) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys) =>
                                selectedKeys.map((i) => parseInt(i.toString()))
                            }
                        >
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                {/* highlight-end */}
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
