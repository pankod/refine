---
title: "MUI Email Field Component | UI Component in Refine v5"
display_title: "Email"
sidebar_label: "Email"
description: "Implement Email Field in Refine v5. Learn the key steps. Explore customization options for material for polished admin UIs. Real-world snippets included."
swizzle: true
---

This field is used to display the email values. It uses the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component of [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) from Material UI.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

Let's see how we can use `<EmailField>` with the example in the user list:

```tsx live url=http://localhost:3000/users previewHeight=340px
setInitialRoutes(["/users"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "firstName", headerName: "First Name", minWidth: 80 },
  { field: "lastName", headerName: "Last Name", minWidth: 80 },
  {
    field: "email",
    headerName: "Email Address",
    display: "flex",
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
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "users",
          list: "/users",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/users"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<UsersList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Implementation Tips

`<EmailField>` uses "mailto:" in the href prop of the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component. For this reason, clicking `<EmailField>` opens your device's default mail application.

:::

## API Reference

### Properties

<PropsTable module="@refinedev/mui/EmailField"/>

:::simple External Props

It also accepts all props of Material UI [Link](https://mui.com/material-ui/react-link/#main-content).

:::
