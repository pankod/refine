---
id: boolean
title: Boolean
swizzle: true
---

This field is used to display boolean values. It uses the [`<Tooltip>`](https://mui.com/material-ui/react-tooltip/#main-content) values from Material UI.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx live url=http://localhost:3000/posts previewHeight=340px
const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-x"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={18} y1={6} x2={6} y2={18}></line>
    <line x1={6} y1={6} x2={18} y2={18}></line>
  </svg>
);
const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-check"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M5 12l5 5l10 -10"></path>
  </svg>
);
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  BooleanField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "status",
    headerName: "Published",
    renderCell: function render({ row }) {
      // highlight-start
      return (
        <BooleanField
          value={row.status === "published"}
          trueIcon={<IconX />}
          falseIcon={<IconCheck />}
          valueLabelTrue="published"
          valueLabelFalse="unpublished"
        />
      );
      // highlight-end
    },
    align: "center",
    headerAlign: "center",
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

<PropsTable module="@pankod/refine-mui/BooleanField" 
title-description="The text shown in the tooltip" 
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" 
trueIcon-default="[`<CheckOutlined />`](https://mui.com/material-ui/material-icons/)"
falseIcon-default="[`<CloseOutlined />`](https://mui.com/material-ui/material-icons/)"
/>

:::tip External Props
It also accepts all props of Material UI [Tooltip](https://mui.com/material-ui/react-tooltip/#main-content).
:::
