---
id: url
title: Url
swizzle: true
---

This field lets you embed a link. It uses Material UI [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) and [`Link`](https://mui.com/material-ui/react-link/#main-content) components. You can pass a URL in its `value` prop and you can show a text in its place by passing any `children`.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<UrlField>` with an example:

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  UrlField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "image",
    headerName: "Image URL",
    renderCell: function render({ row }) {
      // highlight-start
      return <UrlField value={row.image[0].url} />;
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
  image: IImage[];
}

interface IImage {
  url: string;
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

<PropsTable module="@pankod/refine-mui/UrlField" value-description="URL for link to reference to"/>

:::tip External Props
It also accepts all props of Material UI [Link](https://mui.com/material-ui/react-link/#main-content).
:::
