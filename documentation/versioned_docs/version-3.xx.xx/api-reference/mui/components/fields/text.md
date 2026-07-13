---
id: text
title: Text
swizzle: true
---

This field lets you show basic text. It uses Material UI [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) component.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how to use it in a basic list page:

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    // highlight-next-line
    TextFieldComponent,
} from "@pankod/refine-mui";

const columns: GridColumns = [
    { field: "id", headerName: "ID", type: "number" },
    {
        field: "title",
        headerName: "Title",
        renderCell: function render({ row }) {
            // highlight-start
            return <TextFieldComponent, value={row.title} />;
            // highlight-end
        },
        minWidth: 100,
        flex: 1,
    },
];

const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
}
// visible-block-end

render(
    <RefineMuiDemo
        resources={[
            {
                name: "posts",
                list: PostsList,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/TextField" />

:::tip External Props
It also accepts all props of Material UI [Typography](https://mui.com/material-ui/react-typography/#main-content).
:::
