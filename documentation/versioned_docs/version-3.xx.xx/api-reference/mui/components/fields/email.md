---
id: email
title: Email
swizzle: true
---

This field is used to display email values. It uses the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component of [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) from Material UI.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<EmailField>` with the example in the user list.

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  EmailField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "firstName", headerName: "First Name", minWidth: 80 },
  { field: "lastName", headerName: "Last Name", minWidth: 80 },
  {
    field: "email",
    headerName: "Email Address",
    renderCell: function render({ row }) {
      // highlight-start
      return <EmailField value={row.email} />;
      // highlight-end
    },
    minWidth: 100,
    flex: 1,
  },
];

const UsersList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IUser>();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

interface IUSer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
// visible-block-end

render(
  <RefineMuiDemo
    resources={[
      {
        name: "users",
        list: UsersList,
      },
    ]}
  />,
);
```

:::tip
`<EmailField>` uses "mailto:" in the href prop of the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component. For this reason, clicking `<EmailField>` opens your device's default mail application.
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/EmailField"/>

:::tip External Props
It also accepts all props of Material UI [Link](https://mui.com/material-ui/react-link/#main-content).
:::
