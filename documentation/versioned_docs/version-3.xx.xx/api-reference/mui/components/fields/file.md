---
id: file
title: File
swizzle: true
---

This field is used to display files and it uses the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component of [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) from Material UI.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<FileField>` with the example in the edit page.

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  FileField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "image",
    headerName: "Image",
    renderCell: function render({ row }) {
      // highlight-start
      return (
        <FileField src={row.image[0].url} target="_blank" rel="noopener" />
      );
      // highlight-end
    },
    minWidth: 100,
    flex: 2,
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
  image: [
    {
      url: string;
    },
  ];
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

:::tip
If you don't use `title` prop it will use `src` as `title`
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/FileField"/>

:::tip External Props
It also accepts all props of Material UI [Link](https://mui.com/material-ui/react-link/#main-content).
:::
