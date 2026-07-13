---
title: "Mantine Email Field Component | UI Component in Refine v5"
display_title: "Email"
sidebar_label: "Email"
description: "Set up Email Field in Refine v5. Learn best practices. Learn integrate React UI library, components for polished admin UIs. See practical code samples."
swizzle: true
---

This field is used to display email values. It uses the [`<Anchor>`](https://mantine.dev/core/anchor) component of Mantine.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<EmailField>` with the example in the user list.

```tsx live url=http://localhost:3000/users previewHeight=420px hideCode
setInitialRoutes(["/users"]);

// visible-block-start
import { List, EmailField } from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

const UserList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "firstName",
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        id: "lastName",
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        cell: function render({ getValue }) {
          return (
            // highlight-next-line
            <EmailField value={getValue()} />
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },
    refineCore: { setCurrentPage, pageCount, currentPage },
  } = useTable({
    columns,
  });

  return (
    <List>
      <Table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={currentPage}
        onChange={setCurrentPage}
      />
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
    <RefineMantineDemo
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
          <ReactRouter.Route index element={<UserList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Implementation Tips

`<EmailField>` uses "mailto:" in the href prop of the [`<Anchor>`](https://mantine.dev/core/anchor) component. For this reason, clicking `<EmailField>` opens your device's default mail application.

:::

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/EmailField" />

[Refer to the documentation for the rest of Anchor properties. &#8594](https://mantine.dev/core/anchor?t=props)
