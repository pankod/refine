---
id: tag
title: Tag
swizzle: true
---

This field lets you display a value in a tag. It uses Material UI [`<Chip>`](https://mui.com/material-ui/react-chip/#main-content) component.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use it in a basic list page:

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  TagField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "status",
    headerName: "Status",
    renderCell: function render({ row }) {
      // highlight-start
      return <TagField value={row.status} />;
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
  status: "published" | "draft" | "rejected";
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

<PropsTable module="@pankod/refine-mui/TagField" value-description="Tag content" />

:::tip External Props
It also accepts all props of Material UI [Chip](https://mui.com/material-ui/react-chip/#main-content).
:::
