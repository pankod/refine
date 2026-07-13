---
title: Using Material UI DataGrid component with Refine app
description: How to use Material UI DataGrid component with Refine apps?
slug: mui-datagrid-refine
authors: michael
category: "Ecosystem / Integrations"
tags: [material-ui, admin-panel]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/social.png
hide_table_of_contents: false
last_update: 2022-10-14
---

## Introduction

In this article, we'll show how to use Material UI [`<DataGrid />`](https://mui.com/x/react-data-grid/) component and Refine's [`useDataGrid`](https://refine.dev/core/docs/ui-frameworks/mui/hooks/useDataGrid/) hook to render data from a mock API server in tabular form using a Refine application.

[Refine](https://github.com/refinedev/refine) is a React-based framework for rapidly developing data-driven applications through a collection of helper `hooks`, `components`, and with out-of-box support packages. Additionally, it provides a clean interface for integrating with popular UI frameworks such as Material UI, Ant Design, Mantine, and Chakra UI.

Material UI is a React UI component library with a rich set of components and tools for bootstrapping elegant user interfaces. We'll use the `<DataGrid />` component to render a list of employees from a mock server. We'll also look at some of the properties and custom configurations that can be used with the component.

Steps we’ll cover:

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Create a new Refine app](#create-a-new-refine-app)
- [Creating mock API with Mockaroo and My JSON Server](#creating-mock-api-with-mockaroo-and-my-json-server)
- [Material UI DataGrid component](#material-ui-datagrid-component)
- [Adding styled-components](#adding-styled-components)
- [Refine's `useDataGrid` hook](#refines-usedatagrid-hook)
- [Rendering data with the `<DataGrid />` component](#rendering-data-with-the-datagrid--component)
- [Pagination, Filtering, and Sorting using the `useDataGrid` hook](#pagination-filtering-and-sorting-using-the-usedatagrid-hook)
  - [Pagination](#pagination)
  - [Sorting](#sorting)
    - [Initial sort order](#initial-sort-order)
    - [Controlled sorting](#controlled-sorting)
  - [Filtering](#filtering)
    - [Controlled filtering](#controlled-filtering)
- [Conclusion](#conclusion)
- [Live CodeSandbox Example](#live-codesandbox-example)

## Prerequisites

To follow along with this tutorial, we assume you have the following:

- Basic knowledge of React and TypeScript
- Node.js installed on your machine
- A code editor of your choice (VSCode, Sublime Text, etc.)

If you don't familiar with Refine, we recommend you to check out the [Refine tutorial](https://refine.dev/core/tutorial) to get started.

## Create a new Refine app

We'll use the `npm create refine-app` command to interactively initialize the project.

```bash
npm create refine-app@latest datagrid-with-refine
```

Select the following options when prompted:

```bash
✔ Choose a project template · refine-vite
✔ What would you like to name your project?: · datagrid-with-refine
✔ Choose your backend service to connect: · REST API
✔ Do you want to use a UI Framework?: · Material UI
✔ Do you want to add example pages?: · No
✔ Do you need any Authentication logic?: · None
✔ Do you need i18n (Internationalization) support?: · No
✔ Choose a package manager: · npm
```

Once the setup is complete, navigate to the project folder and start your app with:

```bash
npm run dev
```

After the app has started, you should see the following page:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/welcome-page.jpeg" alt="Refine app welcome page" />

## Creating mock API with Mockaroo and My JSON Server

The fake employee data we're going to render in the `<DataGrid />` component will be created with [Mockaroo](https://www.mockaroo.com/) and [My JSON Server](https://my-json-server.typicode.com/).

Mockaroo is a random fake data generator for generating up to 1,000 realistic test data in JSON, CSV, and other formats.

My JSON Server is a fake online REST Server for prototyping application APIs without a backend. The REST Server for the JSON data we'll use in this tutorial is hosted [here](https://my-json-server.typicode.com/Mich45/employee-data), and the fake JSON data created with Mockaroo is on [GitHub](https://github.com/Mich45/employee-data/blob/main/db.json).

## Material UI DataGrid component

The Material UI DataGrid component is an extendable and feature-rich component used to display tabular data in React applications. Some of its powerful features include automatic pagination, table data filtering and sorting, and many other cool features.

The component is available in two versions, the MIT `<DataGrid />` and Commercial `<DataGridPro />` (Pro and Premium) versions. The MIT version is free-to-use while the commercial version is paid and extends the features of the MIT version such as the ability to filter and sort multiple columns at the same time.

The `<DataGrid />` component requires two mandatory properties namely: `rows` and `columns`. The `columns` prop accepts an array of fields which are used as the table header while the `rows` prop accepts an array of objects (data) to be rendered within the table rows.

The following example shows a basic usage of the `<DataGrid />` component:

```javascript
<DataGrid
  columns={[{ field: "name" }]}
  rows={[
    { id: 1, name: "React" },
    { id: 2, name: "MUI X" },
  ]}
/>
```

Although **Refine** is a headless framework that can be used with any UI framework of choice. This means that we can use the `<DataGrid />` component in our Refine application without having to worry about integrating it with the framework.

We'll see how to leverage these components with Refine's [`useDataGrid`](https://refine.dev/core/docs/api-reference/mui/hooks/useDataGrid/) hook in our Refine app in the coming sections.

<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="Support Refine on GitHub banner" />
</a>

## Adding styled-components

We'll use `styled-components` to style our app, as Refine doesn't control how we choose to style our applications. So let's go ahead and install it with its types definition as follows:

```bash
npm install styled-components && npm install --save-dev @types/styled-components
```

Next, create `pages` folder under the `src`. This is where we'll create our page components.

Then, create `<Layout />` component in the `src/components/layout` folder with the following code:

```tsx title="src/components/layout/index.tsx"
import React from "react";
import { LayoutProps } from "@refinedev/core";
import styled from "styled-components";

import { Header } from "../header";

const Wrapper = styled.div`
  width: 80%;
  margin: 50px auto;
  height: 100%;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
```

In the above code, we're creating a styled div to wrap our app content through the `children` prop and then aligning it in the center of the page.

## Refine's `useDataGrid` hook

In addition to integrating Material UI components, **Refine** provides a clean interface through the [`useDataGrid`](https://refine.dev/core/docs/api-reference/mui/hooks/useDataGrid/) hook for implementing some properties that can be used with MUI X `<DataGrid />` component. The hook simplifies working with features such as pagination, sorting, and filtering which come as out-of-box.

For instance, if you have a page component where you want to render tabular data, you might do something like the below:

```tsx title="src/pages/example.tsx"
import React from "react";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const Table: React.FC = () => {
  const { dataGridProps } = useDataGrid();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "Age",
      headerName: "Age",
    },
  ];

  return <DataGrid {...dataGridProps} columns={columns} autoHeight />;
};

export default Table;
```

It's important to note that in the above example, we're not passing the `rows` prop to the `<DataGrid />` component. This is because the `dataGridProps` variable automatically injects the `rows` values into the `<DataGrid />` component through the native `<Refine />` component's `dataProvider` prop available in the `src/App.tsx` file of your Refine application.

The `dataProvider` prop is used to read data from an API endpoint and then make the data available in the entire application.

[Refer to Refine data provider documentation for detailed usage](https://refine.dev/core/docs/core/providers/data-provider/)

## Rendering data with the `<DataGrid />` component

We'll use the mock API we created with Mockaroo and My JSON Server as the data source for our `<DataGrid />` component.

To get started, create a file named `employees.tsx` in the `src/pages` folder and add the following code:

```tsx title="src/pages/employees.tsx"
import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const EmployeeList: React.FC = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 30 },
      {
        field: "full_name",
        headerName: "Full Name",
        minWidth: 150,
        flex: 1,
        valueGetter: (_, row) => `${first_name || ""} ${last_name || ""}`,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
      },
      {
        field: "department",
        headerName: "Department",
        minWidth: 150,
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 150,
      },
      {
        field: "level",
        headerName: "Level",
        minWidth: 110,
      },
    ],
    [],
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        checkboxSelection
        columns={columns}
        autoHeight
      />
    </List>
  );
};

export default EmployeeList;
```

Let's understand what's going on the above code:

The `columns` variable defines the column fields for our data. We also wrapped the fields in a `React.Memo` higher order component for memoizing the values and then created fields for each of the properties from our resource endpoint. We also used the `valueGetter` attribute to compose a value from two different fields.

Next, replace the `src/App.tsx` file with the following code:

<details>

<summary>src/App.tsx</summary>

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import { ColorModeContextProvider } from "./contexts/color-mode";
import Layout from "./components/layout";
import EmployeeList from "./pages/employees";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(
                "https://my-json-server.typicode.com/Mich45/employee-data",
              )}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              resources={[
                {
                  name: "employees",
                  list: "/employees",
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="employees" />}
                  />

                  <Route path="/employees" element={<EmployeeList />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

</details>

Here's a breakdown of what is going on in the code:

The `<Refine />` component accepts a `dataProvider` prop which specifies the source of our data (the fake REST API we created earlier), and a `resources` prop which takes an array of object properties:

- The `name` property is the name of the resource we are expecting from the REST API - this value must match the resource we created in the REST API. In our case, `employees`.
- The `list` property takes a string value which is the path to render the `<EmployeeList />` component. In our case, `/employees`.

You can refer to the [`<Refine />`](https://refine.dev/core/docs/api-reference/core/components/refine-config/) component documentation for more information on the available props.

With `<Route />` components, we defined the routes to render the `<EmployeeList />` component when the `/employees` path is visited. Additionally, we used the [`<NavigateToResource />`](https://refine.dev/core/docs/packages/documentation/routers/react-router-v6/#navigatetoresource) component to redirect to the `/employees` path when the `/` path is visited.

Finally, we used the `<Layout />` component we created in the previous section to wrap the defined routes.

Now, if you navigate to `http://localhost:5173`, you should see the following:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/employees-list.jpeg" alt="Employee list in MUI DataGrid" />

<br/>

Voila! We've successfully displayed our data from a REST API in a MUI X DataGrid component. In the next section we'll look at how we can use the `useDataGrid` hook to simplify operations such as pagination, sorting, and filtering.

## Pagination, Filtering, and Sorting using the `useDataGrid` hook

The `useDataGrid` hook simplifies operations such as pagination, sorting, and filtering on the `<DataGrid />` component through a flexible API. In this part, we'll leverage the hook to add pagination, sorting, and filter features to our employees table data.

### Pagination

Pagination lets us display a certain number of rows on a DataGrid at a time and is enabled by default. It cannot be disabled either. It is available at the bottom of the DataGrid component like so:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/pagination.jpeg" alt="DataGrid pagination controls" />

For example, our employees list has a total of 28 rows, but we may want to render just 5 rows per page. Here’s a demo showing how we can render 5 rows of items on the initial page render with the `pagination.pageSize` property (defaults to 25).

This is similar to using the `initialState` prop on the DataGrid component. We can also define how many rows the user can choose to view per page using the `rowsPerPageOptions` prop.

Update the `employees.tsx` with the following codes:

```tsx title="src/pages/employees.tsx"
//...
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const EmployeeList: React.FC = () => {
  const { dataGridProps } = useDataGrid({
    // highlight-next-line
    pagination: { pageSize: 5 },
  });

  //...

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        checkboxSelection
        columns={columns}
        autoHeight
        //highlight-next-line
        pageSizeOptions={[5, 10, 20]}
      />
    </List>
  );
};

export default EmployeeList;
```

Which renders our grid like this:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/page-size.jpeg" alt="DataGrid page size selector" />

:::caution

By default, `syncWithLocation` is set to `true` in the `<Refine />` component. This means that the `pagination` property will be overridden by the `pageSize` query parameter in the URL. If you don't see your pagination settings reflected in the grid, remove the `pageSize` query parameter from the URL and reload the page.

:::

You can refer to the MU X DataGrid [documentation](https://mui.com/x/react-data-grid/pagination/) for more information on the pagination feature.

### Sorting

The DataGrid component lets us sort the data in the rows based on one criterion at a time. Sorting is enabled for all columns by default in the MIT version and can also be disabled either for all columns or a single column.

We can sort the rows in three orders: ascending (ASC), descending (DESC) or null (sorting will be disabled).

To sort the rows, click or hover on any column header, this displays an arrow indicator pointing up or down depending on your sorting order. When it's ascending the arrow points upward, and points downward for descending. Alternatively, we can also access it from the grid column menu.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/sort.jpeg" alt="DataGrid sorting example" />

#### Initial sort order

We can initialize a sorting order for each or all fields in the grid using the `sorters` property of the `useDataGrid` component. This lets us sort the rows on the initial page render.

```tsx title="src/pages/employees/employees.tsx"
const { dataGridProps } = useDataGrid({
  sorters: {
    initial: [{ field: "level", order: "desc" }],
  },
});
```

The above example will sort the rows using the _level_ column on the initial render in descending order like so:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/sort-with-level.jpeg" alt="DataGrid sorted by level column" />

#### Controlled sorting

We can also sort rows externally using the `setSorter` function from the `useDataGrid` hook. The following code shows how we can sort the rows by clicking on custom buttons outside the DataGrid component.

```tsx title="src/pages/employees.tsx"
import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//highlight-start
import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
//highlight-end

//highlight-start
const ButtonsWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;
//highlight-end

const EmployeeList: React.FC = () => {
  //highlight-next-line
  const { dataGridProps, setSorters } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 30 },
      {
        field: "full_name",
        headerName: "Full Name",
        minWidth: 150,
        flex: 1,
        valueGetter: (_, row) =>
          `${row.first_name || ""} ${row.last_name || ""}`,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
      },
      {
        field: "department",
        headerName: "Department",
        minWidth: 150,
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 150,
      },
      {
        field: "level",
        headerName: "Level",
        minWidth: 110,
      },
    ],
    [],
  );

  //highlight-start
  const handleSorting = (order: "asc" | "desc") => {
    setSorters([
      {
        field: "level",
        order,
      },
    ]);
  };
  //highlight-end

  return (
    <List>
      //highlight-start
      <ButtonsWrapper>
        <ButtonGroup variant="outlined">
          <Button onClick={() => handleSorting("asc")}>Asc</Button>
          <Button onClick={() => handleSorting("desc")}>Desc</Button>
        </ButtonGroup>
      </ButtonsWrapper>
      //highlight-end
      <DataGrid
        {...dataGridProps}
        checkboxSelection
        columns={columns}
        autoHeight
      />
    </List>
  );
};

export default EmployeeList;
```

Here's a GIF showing the result of the above example.

<div className="flex justify-center">
    <img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/controlled-sort.avif" alt="External sort controls for DataGrid" />
</div>

You can refer to MU X DataGrid [documentation](https://mui.com/x/react-data-grid/sorting/) for more information on the sorting feature.

### Filtering

Filtering lets us search the rows for values in the `<DataGrid />` component based on one criterion at a time.

We can access the sort feature by either clicking on the _filter_ item in the column menu:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/filter-column.jpeg" alt="DataGrid column filter menu" />

<br/>

or by using the filter button in the grid toolbar:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/filter-toolbar.jpeg" alt="DataGrid toolbar filter panel" />

<br/>

You can import the `<GridToolbar />` component and use it like so:

```tsx title="src/pages/employees.tsx"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

<DataGrid
  {...dataGridProps}
  checkboxSelection
  columns={columns}
  slots={{ toolbar: GridToolbar }}
  autoHeight
/>;
```

The filter feature works by searching the rows for values that match a given filter operator. The list of operators which can be used in the _sortModel_ can be found [here](https://refine.dev/core/docs/core/interfaceReferences/#crudfilters).

For instance in our employees table we can filter the _department_ column for rows that contain a `Support` value by using any of the above methods.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/filter-value.jpeg" alt="Filter by department value" />

<br/>

Here's the code for the above example. Update the `employees.tsx` with highlighted code.

```tsx title="src/pages/employees.tsx"
import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
//highlight-next-line
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const EmployeeList: React.FC = () => {
  const { dataGridProps } = useDataGrid();

  //...

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        //highlight-next-line
        slots={{ toolbar: GridToolbar }}
        autoHeight
      />
    </List>
  );
};

export default EmployeeList;
```

`dataGridProps` provides the `filterMode`, `filterModel` and `onFilterModelChange` properties which can be used to control the filter state of the `<DataGrid />` component.

#### Controlled filtering

We can also choose to filter the table externally by using the `setFilters` function of the `useDataGrid` hook to set a filter state. The function accepts three properties to filter the table.

1. `field` - the column field in the table to apply the filter
2. `operator` - the criterion to filter the table
3. `value` - the value to search for

Here's an example showing how we can use a custom checkbox to search the rows for employees with _role_ that equals **Recruiter**.

Update the `employees.tsx` with highlighted code:

```tsx title="src/pages/employees.tsx"
import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
//highlight-start
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//highlight-end

const EmployeeList: React.FC = () => {
  //highlight-next-line
  const { dataGridProps, setFilters } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", minWidth: 30 },
      {
        field: "full_name",
        headerName: "Full Name",
        minWidth: 150,
        flex: 1,
        valueGetter: (_, row) =>
          `${row.first_name || ""} ${row.last_name || ""}`,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
      },
      {
        field: "department",
        headerName: "Department",
        minWidth: 150,
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 150,
      },
      {
        field: "level",
        headerName: "Level",
        minWidth: 110,
      },
    ],
    [],
  );

  //highlight-start
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setFilters([
      {
        field: "role",
        value: checked ? "Recruiter" : undefined,
        operator: "eq",
      },
    ]);
  };
  //highlight-end

  return (
    <List>
      //highlight-start
      <FormControlLabel
        label="Filter Employees with Recruiter Role"
        control={<Checkbox onChange={handleFilter} />}
      />
      //highlight-end
      <DataGrid
        {...dataGridProps}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        autoHeight
      />
    </List>
  );
};
export default EmployeeList;
```

Which gives the following result when you click on the checkbox:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-23-mui-usedatagrid/controlled-filter.jpeg" alt="External filter checkbox for recruiter role" />

You can refer to MU X DataGrid [filtering documentation](https://mui.com/x/react-data-grid/filtering/) for more information on the filtering feature.

## Conclusion

In this article we introduced you to the MUI X `<DataGrid />` component and how to use it to render tabular data. We also learned how to simplify operations such as pagination, sorting and filtering on the component using the `useDataGrid` hook.

We hope this article helps you in getting started with the `<DataGrid />` component in your Refine applications.

Where to go next? Check the useDataGrid hook [documentation](https://refine.dev/core/docs/ui-frameworks/mui/hooks/useDataGrid/) and the MUI X `<DataGrid />` [documentation](https://mui.com/x/react-data-grid/) for additional usage information and reference.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

## Live CodeSandbox Example

<CodeSandboxExample path="blog-material-ui-datagrid" />
