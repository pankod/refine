---
title: How to Build a React Admin Panel with Mantine and Strapi
description: We'll be building a simple React Admin Panel with Refine and Mantine using Strapi as a backend service.
slug: react-admin-panel
authors: joseph_mawa
category: "How To Build"
tags: [react, admin-panel]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fsocial.png
hide_table_of_contents: false
featured_image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Ffeatured.png
last_update: 2023-11-30
---

## Introduction

Building complex, data-intensive front-end user interfaces(UIs) such as admin panels, dashboards, and other internal tools from scratch can be a daunting and laborious process. React frameworks such as [Refine](https://github.com/refinedev/refine) make the process easier because that is a problem they are attempting to solve.

Refine is a free, open-source, and MIT-licensed React framework for building CRUD apps. It has integrations for popular UI frameworks and design systems such as Material UI, Chakra UI, Ant Design, and Mantine. You can build any CRUD app like React admin panel.

Though it comes with several features out of the box, Refine is customizable. If you don't fancy any of the above UI frameworks or design systems, you can also use "headless" refine.

Every data-intensive front-end application must source data from somewhere. Refine has integrations for popular content management systems and cloud databases such as Strapi, Hasura, and Firebase.

All the above integrations are opt-in. In this article, we will build a simple React Admin Panel using refine. We will use [Mantine](https://mantine.dev/) as the UI component library and [Strapi](https://strapi.io/) as our back-end service.

## What is Strapi?

[Strapi](https://strapi.io/) is a popular open-source headless CMS built using Node. It is flexible and has an intuitive UI. The Refine ecosystem has data providers for the most popular content management systems, such as Strapi, and cloud databases like Firebase and Supabase.

While creating a project using the Refine command line tool, select Strapi as your back-end service. The Refine command line tool will bootstrap a Refine application with all the requisite packages and functionalities.

You don't need a Strapi instance to learn how to use Strapi with refine. The Refine ecosystem has a [fake Strapi API](https://automatic-sweltering-dog.strapiapp.com) that you can use when learning to integrate Strapi in a Refine project.

The Refine command line tool will install the `@refinedev/strapi-v4` data provider when you choose it as your back-end service during project creation. You can then import and use it in your application like so:

```tsx
import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

function App() {
  return (
    <Refine
      ...
      dataProvider={DataProvider(`${process.env.API_URL}/api`, axiosInstance)}
    />
  );
}
```

## What is Mantine?

[Mantine](https://mantine.dev/) is a free, open-source MIT-licensed React components library. Mantine can help you build fully functional and accessible web applications fast. You can use it with most modern React frameworks such as Next, Gatsby, and Remix.

As highlighted above, one of the benefits of using Refine is the built-in support for most of the popular design systems, UI frameworks, and component libraries. Mantine is one of the component libraries for which Refine has built-in support.

When creating a Refine application using `npm create refine-app`, select Mantine as the UI framework in the command prompt. The Refine command line tool will bootstrap a Refine application and install the necessary Mantine packages.

You can then import the Refine Mantine components and hooks you want to use from the `@refinedev/mantine` package like so:

```ts
import { Edit, useForm, useSelect } from "@refinedev/mantine";
```

The Refine ecosystem comprises several hooks and components for Mantine. You can read the Refine [Mantine API documentation](https://refine.dev/core/docs/api-reference/mantine/) for more on the different Mantine hooks and Components and how to use them.

## Create a new Refine app

In this article, you will learn to create a simple React admin panel with Refine and Mantine using Strapi as a headless content management system.

Let's use the `npm create refine-app` command to interactively initialize the project.

```bash
npm create refine-app@latest refine-with-strapi-mantine
```

Select the following options when prompted:

```bash
✔ Choose a project template · refine-vite
✔ What would you like to name your project?: · refine-with-strapi-mantine
✔ Choose your backend service to connect: · Strapi v4
✔ Do you want to use a UI Framework?: · Mantine
✔ Do you want to add example pages?: · No
✔ Do you need i18n (Internationalization) support?: · No
✔ Choose a package manager: · npm
```

Once the setup is complete, navigate to the project folder and start your app with:

```bash
npm run dev
```

After the app has started, you should see the following page:

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-02-23-refine-strapi-mantine/welcome.jpeg"  alt="Refine Mantine starter screen" />

If your landing page is similar to the screenshot above, you have successfully created a Refine project. We will build a React admin panel by modifying the project you have just created.

## Built-in Refine hooks and components for Mantine

Refine has several built-in hooks and components for Mantine. Most built-in Refine Mantine hooks and components directly export or use their corresponding core Mantine hooks and components internally.

You can read the Refine [Mantine API documentation](https://refine.dev/core/docs/api-reference/mantine/) for more and how to use them.

## `useForm` - For form management

One of the hooks we will use a lot in this article is the [`useForm`](https://refine.dev/core/docs/api-reference/mantine/hooks/form/useForm/) hook. As its name suggests, you can use it to manage forms when working with Mantine and refine. It is based on and has all the features of the core Mantine and Refine `useForm` hooks with additional features.

The Refine documentation does a great job of explaining the `useForm` hook. Check it out to understand the `useForm` hook in-depth and how to use it.

```tsx
import { useForm } from "@refinedev/mantine";

const { saveButtonProps, getInputProps } = useForm({
  initialValues: {
    title: "",
    status: "",
  },
  validate: {
    title: (value) =>
      value.length < 2
        ? "Post title should be atleast 2 characters long"
        : null,
    status: (value) => (value.length <= 0 ? "Status is required" : null),
  },
});
```

## `useTable` - For table management

Another hook that we will use in this article is the [`useTable`](https://refine.dev/core/docs/packages/documentation/react-table/) hook. It is part of the [@refinedev/react-table](https://github.com/refinedev/refine/tree/main/packages/react-table) package. The `@refinedev/react-table` package is an adapter for the [TanStack Table](https://tanstack.com/table/v8). It has all the features of the [TanStack Table](https://tanstack.com/table/v8) package out of the box. It also has features for filtering, sorting, and pagination.

Similarly, we will use basic layout and UI components such as `List`, `Create`, `Edit`, and `Show`. As I pointed out above, the Refine documentation explains them well. Refer to the appropriate sections of the Refine documentation to understand a component that might be unfamiliar to you.

## How to build a React admin panel with Refine, Mantine and Strapi

In this section, we will build a React admin panel with CRUD functionality using Refine, Mantine and Strapi. We will utilize a fake [Strapi version 4 API](https://automatic-sweltering-dog.strapiapp.com/api). Follow the steps below if you have created a Refine project by following the steps under the "Create a new Refine app" section above.

### How to list records

We need to fetch the list of posts from our Strapi API and display it when you log in. Let us start by creating an interface for the data from our Strapi API. Create a `src/interfaces/index.d.ts` file. You can copy and paste the code below into it.

```ts title="src/interfaces/index.d.ts"
export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: ICategory;
  createdAt: string;
}
```

The above interface should give you an idea of the shape of the data returned from the API. The Strapi API has the `posts` and `categories` collections. There is a relation between the two collection types. Read the [documentation](https://refine.dev/core/docs/packages/documentation/data-providers/strapi-v4/) to understand how the Strapi version 4 data provider works.

Since we will work with blog posts, let us create a `posts` directory and keep all our component files in it. Create an `src/pages/posts/list.tsx` file and copy and paste the code below into it.

<details>

<summary>Show code</summary>

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, DateField } from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";

import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },

      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return <DateField format="LL" value={getValue<string>()} />;
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
      <Table highlightOnHover striped withBorder withColumnBorders>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
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
```

</details>

In the `<PostList />` component above, we used the [`useTable`](https://refine.dev/core/docs/packages/documentation/react-table) hook from the `@refinedev/react-table` package. The `useTable` hook is headless by design. Therefore, the responsibility for managing the UI lies with you.

We imported several other UI components from the `@refinedev/mantine` package. I won't explain them here. Read the [Refine Mantine](https://refine.dev/core/docs/api-reference/mantine/) or the core [Mantine](https://mantine.dev/guides/cra/) documentation.

Create a `src/pages/posts/index.tsx` file and add the following export statement to it.

```ts title="src/pages/posts/index.ts"
export * from "./list";
```

## Adding resources and connect pages to Refine app

Now we are ready to start connecting to our API by adding a resource to our application

[Refer to documentation for more info about `resources` concept](https://refine.dev/core/docs/guides-concepts/general-concepts/#resource-concept)

Finally, replace the `src/App.tsx` file with the code below:

<details>

<summary>src/App.tsx</summary>

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  RefineThemes,
  ThemedLayout,
  AuthPage,
} from "@refinedev/mantine";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import {
  MantineProvider,
  Global,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

import { Header } from "./components/header";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostList } from "./pages/posts";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              ...RefineThemes.Blue,
              colorScheme: colorScheme,
            }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "posts",
                    list: "/posts",
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
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="posts" />}
                    />

                    <Route path="/posts">
                      <Route index element={<PostList />} />
                    </Route>
                  </Route>

                  <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource resource="posts" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<AuthPage type="login" />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

</details>

**In the code above:**

We defined the `resources` property of the `<Refine />` component. It just defines the routes for the CRUD pages. The routes are used by **Refine** hooks and components. For example, the [`useNavigation`](https://refine.dev/core/docs/api-reference/core/hooks/navigation/useNavigation/) hook uses the `list`, `create`, `edit`, and `show` routes to navigate between the pages. Also, data hooks like [`useTable`](https://refine.dev/core/docs/api-reference/core/hooks/useTable/) use the resource name when you don't pass the `resource` prop.

You can refer to the [`<Refine />`](https://refine.dev/core/docs/api-reference/core/components/refine-config/) component documentation for more information on the available props.

We'll use [React Router v6](https://refine.dev/core/docs/packages/documentation/routers/react-router-v6/) for routing in our application. Refine provides router bindings and utilities for React Router v6. It is built on top of the `react-router-dom` and it provides easy integration between Refine and `react-router-dom`.

We used to `<Route />` components to define the routes for rendering the CRUD pages and authentication pages. For protected routes, we used the [`<Authenticated />`](https://refine.dev/core/docs/api-reference/core/components/auth/authenticated) component. The `<Authenticated />` component will redirect the user to the login page if they are not logged in.

Finally, we used the [`<ThemedLayout />`](https://refine.dev/core/docs/api-reference/mantine/components/mantine-themed-layout/) component to wrap protected routes.

After modifying your code, let's update the `src/constants.ts` to use the fake Strapi API. You can copy and paste the code below into it.

```ts title="src/constants.ts"
export const API_URL = "https://automatic-sweltering-dog.strapiapp.com";
export const TOKEN_KEY = "strapi-jwt-token";
```

### Understanding the `authProvider` concept

Similarly, `npm create refine-app` bootstraps a Refine application with default `authProvider`. You should have the `src/authProvider.ts` file if you created the application using `npm create refine-app` while following the steps above.

Of particular interest is the `login` method of the `authProvider`. We will use email and password to log into our application. Be sure the `login` method has the code below.

```ts title="src/authProvider.ts"
import type { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, status } = await strapiAuthHelper.login(email, password);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);

      // set header axios instance
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.jwt}`;

      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  //...
};
```

After these changes, you should be able to log into your application. Open the browser and navigate to `http://localhost:5173`.

For this demonstration, use the credentials below to log into an existing account. It is a fake Strapi instance set up for development. Be sure to use it responsibly.

> Email: demo@refine.dev
> Password: demodemo

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-02-23-refine-strapi-mantine/login-page.jpeg"  alt="Login page for Strapi demo" className="border border-gray-200 rounded" />

When you log into your Refine application, you should have a table similar to the image below. Though still incomplete, it is a simple React admin panel.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-list.jpeg"  alt="Posts list table" />

### How to handle relational data

As highlighted in the previous section, our Strapi API has `posts` and `categories` collections with relational fields. However, Strapi version 4 doesn't populate relational data out of the box when fetching entries in a collection.

[Refer to documentation for more info about relation populate.](https://refine.dev/core/docs/packages/documentation/data-providers/strapi-v4/#relations-population)

[Refer to tutorial section for more info about handling relationships.](https://refine.dev/core/docs/guides-concepts/data-fetching)

Therefore, for our data provider to return the categories for each post, we need to specify using the `populate` field of the `meta` property in the object we pass to the `useTable` hook.

```tsx title="src/pages/posts/list.tsx"
//...
import { useTable } from "@refinedev/react-table";

//...

const {
  getHeaderGroups,
  getRowModel,
  refineCore: { setCurrentPage, pageCount, currentPage },
} = useTable({
  columns,
  //highlight-start
  refineCoreProps: {
    meta: {
      populate: ["category"],
    },
  },
  //highlight-end
});
//...
```

After modifying your code, like in the example above, the data provider will also fetch the category for each post. Each post object in the array that the `useTable` hook returns will contain the category field.

Since each post object now has a category field, we need to add a category column to our table. Modify the column array, which you passed to the `useTable` hook, to include the `Category` column like in the example below.

```tsx title="src/pages/posts/list.tsx"
//...
const columns = React.useMemo<ColumnDef<IPost>[]>(
  () => [
    //...
    //highlight-start
    {
      id: "category",
      header: "Category",
      accessorFn: ({ category }) => {
        return category?.title;
      },
    },
    //highlight-end
  ],
  [],
);
//...
```

The code above should modify your table to include a Category column like the image below.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-list-with-category.jpeg"  alt="Posts list with category column" />

### How to create a record

In the previous sections, you learned how to fetch the list of posts from the Strapi API whenever the user logs in. However, in an React admin panel, you should also be able to create a new record. And that is what you will learn in this section.

By default, Refine adds a create button to the `<List />` component. You should see it in the top right corner. However, clicking the create button will open a non-existent page.

We need to create a component that will render when a user clicks the create button. The component will contain the form we shall use to create a new post. Create the `src/pages/posts/create.tsx` file. You can copy and paste the code below into it.

<details>
<summary>Show code</summary>

```tsx title="src/pages/posts/create.tsx"
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { TextInput, Select } from "@mantine/core";

import { ICategory } from "../../interfaces";

export const PostCreate = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      title: "",
      category: {
        id: "",
      },
      status: "",
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Title should be atleast 5 characters long" : null,
      category: {
        id: (value) => (value.length <= 0 ? "Title is required" : null),
      },
      status: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        mt="sm"
        required={true}
        label="Title"
        {...getInputProps("title")}
      />
      <Select
        mt={8}
        label="Status"
        required={true}
        placeholder="Pick one"
        {...getInputProps("status")}
        data={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Rejected", value: "rejected" },
        ]}
      />
      <Select
        mt={8}
        label="Category"
        required={true}
        placeholder="Select category"
        {...getInputProps("category.id")}
        {...selectProps}
      />
    </Create>
  );
};
```

</details>

In the above example, we used the `useForm` hook to manage the form. We passed the initial input values and field validation methods to the `useForm` hook.

Open the `src/pages/posts/index.tsx` file you created in one of the previous sub-sections and add the export statement below.

```tsx title="src/pages/posts/index.tsx"
//...
//highlight-next-line
export * from "./create";
```

You can now import the `<PostCreate />` component into the `src/App.tsx` file. You can simply copy-paste the highlighted code below:

```tsx title="src/App.tsx"
// ...
//highlight-next-line
import { PostList, PostCreate } from "./pages/posts";

function App() {
  //...
  return (
    //...
    <Refine
      //...
      resources={[
        {
          name: "posts",
          list: "/posts",
          //highlight-next-line
          create: "/posts/create",
        },
      ]}
    >
      <Routes>
        {/*...*/}
        <Route path="/posts">
          <Route index element={<PostList />} />
          //highlight-next-line
          <Route path="create" element={<PostCreate />} />
        </Route>
        {/*...*/}
      </Routes>
      {/*...*/}
    </Refine>
    //...
  );
}

export default App;
```

Clicking the create button will now navigate you to the `/posts/create` page. The `/posts/create` page looks like the image below. You can use it to create a new post. After filling and submitting the form with details of your post, it should now be available in the list of all posts.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-create.jpeg"  alt="Create post form" />

### How to edit a record

In the previous section, we looked at creating a new post. It is also possible to edit an existing record. To edit records in our table, let us add an `Actions` column. The column will have a button to edit the contents of each row in the table.

To add a new column to our table, add a column object to the `columns` array we created in the `<PostList />` component. We will render an `<EditButton />` in our new column.

```tsx title="src/pages/posts/list.tsx"
//...
import { EditButton } from "@refinedev/mantine";
import { Group } from "@mantine/core";

//...

const columns = React.useMemo<ColumnDef<IPost>[]>(
  () => [
    //...
    {
      id: "actions",
      accessorKey: "id",
      header: "Actions",
      cell: ({ getValue }) => {
        return (
          <Group>
            <EditButton
              hideText
              size="xs"
              recordItemId={getValue() as number}
              variant="subtle"
            />
          </Group>
        );
      },
    },
  ],
  [],
);

//...
```

After adding the code above, your table should include the `Actions` column. Clicking the edit button at the moment will again redirect you to a non-existent page.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-list-with-action.jpeg"  alt="Posts list with action buttons" />

<br/>

Let us create the component that will render when a user clicks the edit button. The component will contain a form for editing the contents of a specific record in our collection.

Create the `src/pages/posts/edit.tsx` file into which copy and paste the code below.

<details>
<summary>Show code</summary>

```tsx title="src/pages/posts/edit.tsx"
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { TextInput, Select } from "@mantine/core";

import { ICategory } from "../../interfaces";

export const PostEdit = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { query },
  } = useForm({
    initialValues: {
      id: "",
      title: "",
      category: {
        id: "",
      },
    },
    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Title should be atleast 5 characters long" : null,
      category: {
        id: (value) => (value.length <= 0 ? "Title is required" : null),
      },
    },
  });

  const postData = query?.data?.data;
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" required label="Title" {...getInputProps("title")} />
      <Select
        mt={8}
        label="Category"
        required
        placeholder="Select category"
        {...selectProps}
        {...getInputProps("category.id")}
      />
    </Edit>
  );
};
```

</details>

Add the export statement below to the `src/pages/posts/index.tsx` file.

```tsx title="src/pages/posts/index.tsx"
//...
//highlight-next-line
export * from "./edit";
```

Now, you can import the `<PostEdit />` component into the `src/App.tsx` file. You can simply copy-paste the highlighted code below:

```tsx title="src/App.tsx"
// ...
//highlight-next-line
import { PostList, PostCreate, PostEdit } from "./pages/posts";

function App() {
  //...
  return (
    //...
    <Refine
      //...
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          //highlight-next-line
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <Routes>
        {/*...*/}
        <Route path="/posts">
          <Route index element={<PostList />} />
          <Route path="create" element={<PostCreate />} />
          //highlight-next-line
          <Route path="edit/:id" element={<PostEdit />} />
        </Route>
        {/*...*/}
      </Routes>
      {/*...*/}
    </Refine>
    //...
  );
}

export default App;
```

Clicking the edit button should now redirect you to a page for editing the contents of a specific record. The edit page will look like the image below.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-edit.jpeg"  alt="Edit post form" />

### How to delete a record

You can use two methods to delete records in a collection. These methods are:

- Using the delete action button on each table row
- Using the delete button on the edit page

#### How to add delete action button on each table row

We will add the `<DeleteButton />` we imported above to every row in our table under the `Actions` column. The columns array we declared while creating the table in one of the sections above contains an object with the id `actions`. That object defines our `Actions` column. We will add the `<DeleteButton />` to it.

The cell method of the `Actions` column object returns the `<Group />` Mantine UI component. Add the `<DeleteButton />` so that it is a child of the `<Group />` component like so:

```tsx title="src/pages/posts/list.tsx"
//...
//highlight-next-line
import { EditButton, DeleteButton } from "@refinedev/mantine";
import { Group } from "@mantine/core";

//...

const columns = React.useMemo<ColumnDef<IPost>[]>(
  () => [
    //...
    {
      id: "actions",
      accessorKey: "id",
      header: "Actions",
      cell: ({ getValue }) => {
        return (
          <Group>
            <EditButton
              hideText
              size="xs"
              recordItemId={getValue() as number}
              variant="subtle"
            />
            //highlight-start
            <DeleteButton
              hideText
              size="xs"
              recordItemId={getValue() as number}
              variant="subtle"
            />
            //highlight-end
          </Group>
        );
      },
    },
  ],
  [],
);

//...
```

After making the above changes, your table will have the delete action button like in the image below. Click the delete button to delete a specific record.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-delete.jpeg"  alt="Delete confirmation modal for a post" />

#### How to add delete button on the edit page

Instead of adding a delete button to each row in a table, you can also add it to the edit page. This time, we will modify the `resources` prop of the `<Refine />` component. Add the `meta.canDelete` prop to the `posts` resource like so:

```tsx title="src/App.tsx"
// ...

function App() {
  //...
  return (
    //...
    <Refine
      //...
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
          //highlight-start
          meta: {
            canDelete: true,
          },
          //highlight-end
        },
      ]}
    >
      {/*...*/}
    </Refine>
    //...
  );
}

export default App;
```

Your edit page should now include a delete button on the bottom right.

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fpost-candelete.jpeg"  alt="Edit page with delete button enabled" />

## How to implement mutation mode

Mutation mode is a handy feature in Refine when performing side effects. It can help you provide a better user experience to your clients. You can configure your Refine app to use any of the three mutation modes below.

- Pessimistic
- Optimistic
- Undoable

### Pessimistic mutation mode

With pessimistic mutation mode, Refine initiates the mutation immediately. It applies UI updates and redirects after the mutation update returns successfully. The pessimistic mode is the default mutation mode.

### Optimistic mutation mode

When using the optimistic mutation mode, Refine applies the mutation locally and immediately updates UI and redirects without waiting for a response from the server. It updates the UI accordingly in case there is an error.

### Undoable mutation mode

With the undoable mutation mode, Refine applies the mutation locally, updates the UI, and redirects. It then waits for a customizable timeout before making the mutation. You can cancel the mutation update within the timeout. It also updates the UI if the mutation update returns an error.

You can configure the mutation mode using the `options` prop of the `<Refine />` component.

```tsx title="src/App.tsx"
// ...

function App() {
  //...
  return (
    //...
    <Refine
      //...
      options={{ mutationMode: "optimistic" }}
    >
      {/*...*/}
    </Refine>
    //...
  );
}

export default App;
```

## How to share the current page with filters

With Refine, it is possible to sync the URL with the contents of a page. Assuming the `posts` page has a multi-page table sorted in ascending order, you can display the currently active page and the sort order in the URL using query parameters.

By default, `npm create refine-app` bootstraps a Refine application with the `syncWithLocation` option set to `true`. You can review the code in the `src/App.tsx` file to confirm.

```tsx title="src/App.tsx"
// ...

function App() {
  //...
  return (
    //...
    <Refine
      //...
      options={{ syncWithLocation: true }}
    >
      {/*...*/}
    </Refine>
    //...
  );
}

export default App;
```

## Using the Refine Mantine Inferencer

In the previous sections, we performed CRUD operations by building components from scratch. The Refine ecosystem has the [Inferencer](https://refine.dev/core/docs/api-reference/mantine/components/inferencer/) package for generating CRUD pages based on the responses from your API.

The sole purpose of the Inferencer is to set you off by generating CRUD pages. You can then customize the components to suit your needs. Depending on your design system or component library, import Inferencer from the `@refinedev/inferencer` package.

Since we are using Mantine as our components library, import and add `<MantineInferencer />` to the `resources` prop of the `<Refine />` component like so:

<details>

<summary>src/App.tsx</summary>

```tsx title="src/App.tsx"
// ...
//highlight-start
import {
  MantineListInferencer,
  MantineCreateInferencer,
  MantineEditInferencer,
  MantineShowInferencer,
  InferField,
} from "@refinedev/inferencer/mantine";
//highlight-end

//highlight-start
const fieldTransformer = (field: InferField) => {
  if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
    return false;
  }

  return field;
};
//highlight-end

function App() {
  //...
  return (
    //...
    <Refine
      //...
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
          show: "/posts/show/:id",
          meta: {
            canDelete: true,
          },
        },
        //highlight-start
        {
          name: "categories",
          list: "/categories",
          create: "/categories/create",
          edit: "/categories/edit/:id",
          show: "/categories/show/:id",
          meta: {
            canDelete: true,
          },
        },
        //highlight-end
      ]}
    >
      <Routes>
        {/*...*/}
        <Route path="/posts">
          <Route index element={<PostList />} />
          <Route path="create" element={<PostCreate />} />
          <Route path="edit/:id" element={<PostEdit />} />
        </Route>
        //highlight-start
        <Route path="/categories">
          <Route
            index
            element={
              <MantineListInferencer fieldTransformer={fieldTransformer} />
            }
          />
          <Route
            path="create"
            element={
              <MantineCreateInferencer fieldTransformer={fieldTransformer} />
            }
          />
          <Route
            path="edit/:id"
            element={
              <MantineEditInferencer fieldTransformer={fieldTransformer} />
            }
          />
          <Route
            path="show/:id"
            element={
              <MantineShowInferencer fieldTransformer={fieldTransformer} />
            }
          />
        </Route>
        //highlight-end
        {/*...*/}
      </Routes>
      {/*...*/}
    </Refine>
    //...
  );
}

export default App;
```

</details>

The code above will generate CRUD pages for you out of the box. Each of the other design systems or component libraries which Refine supports has its corresponding Inferencer. Import and add it to your `<Refine />` component as in the above example.

## Conclusion

When looking to build a React admin panel, Refine is one of the react frameworks worth exploring. As highlighted above, it supports most of the popular design systems and UI frameworks like Material UI, Ant design, Chakra UI, and Mantine.

Furthermore, Refine has out-of-the-box support for authentication, i18n, routing, and state management. The Refine command line tool can get you up and running instantly with all the necessary configurations for a basic Refine project. You can modify the default settings to suit your needs.

All the Refine features I have highlighted above will significantly increase your development speed, improve your development experience and reduce time to production, especially when building complex front-end applications.

## Live CodeSandbox Example

<CodeSandboxExample path="blog-refine-mantine-strapi" />

---
