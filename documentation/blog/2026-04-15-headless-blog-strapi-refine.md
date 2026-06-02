---
title: "Building a Headless Blog with Strapi and Refine"
description: "Learn how to build a headless blog application using Strapi as the CMS and Refine as the React admin framework. Full walkthrough covering setup, CRUD operations, and content management."
slug: headless-blog-strapi-refine
authors: ozgur
category: "Tutorials"
tags: [strapi, react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-04-14-headless-strapi/banner.png
hide_table_of_contents: false
---

If you've ever managed a blog through a monolithic CMS, you know the feeling of being stuck between the content and the presentation layer. Every small change to the frontend means touching the backend, and vice versa. Headless CMS tools solve this by separating the two entirely, and when you pair one with a framework that's built for data-heavy UIs, you get a blog management system that's genuinely pleasant to work with.

In this tutorial, we'll build a headless blog application using [Strapi](https://strapi.io/) as the content management system and [Refine](https://refine.dev/) as the React-based admin panel. Strapi handles storing and serving the content through a REST API, and Refine handles the interface where you create, edit, and manage your blog posts. By the end, you'll have a working blog admin panel with full CRUD capabilities.

<!--truncate-->

## What Is a Headless CMS?

A headless CMS is a content management system that provides content through an API without dictating how that content is displayed. Unlike WordPress or similar platforms where the CMS controls both the content and the rendered output, a headless CMS only handles the backend: content modeling, storage, user permissions, and API delivery.

This means you can build your frontend with whatever technology you want. A React app, a mobile application, a static site generator, or all three at once, consuming the same content API. For a blog specifically, this gives you complete control over how posts appear on the public site while keeping the authoring experience clean and structured.

## Why Strapi and Refine?

Strapi is one of the most popular open-source headless CMS platforms. It gives you a visual content-type builder, an auto-generated REST and GraphQL API, role-based access control, and a media library, all running on your own infrastructure. You define your content models (like "Blog Post" with a title, body, cover image, and category), and Strapi generates the API endpoints and admin panel for you.

Refine is an open-source React framework designed for building data-intensive applications like admin panels, dashboards, and internal tools. It provides out-of-the-box support for data fetching, routing, authentication, and access control, with integrations for UI libraries like [Ant Design](https://ant.design/), [Material UI](https://mui.com/), and [Mantine](https://mantine.dev/).

The two fit together naturally. Strapi exposes a REST API for your blog content, and Refine's [Strapi data provider](https://github.com/refinedev/refine/tree/master/packages/strapi-v4) (`@refinedev/strapi-v4`) translates Refine's data hooks into Strapi-compatible API calls. You don't have to manually write fetch logic or handle pagination, filtering, and sorting yourself.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js v20 (Strapi v4 does not support Node 22+, so if you're on a newer version, use [nvm](https://github.com/nvm-sh/nvm) to switch: `nvm install 20 && nvm use 20`)
- npm or pnpm
- A code editor

Some familiarity with React and TypeScript will help, but the tutorial walks through each step in detail.

## Setting Up the Refine Project

Since Refine's CLI ships with built-in Strapi support, we'll start by scaffolding the frontend. This gives us a project that's already wired up with the Strapi data provider and auth helpers, so we can focus on building the backend it needs afterward.

```bash
npm create refine-app@latest refine-blog-admin
```

The CLI will walk you through a series of prompts. Select the following:

- **Choose a project template:** vite
- **Choose your backend service to connect:** Strapi v4
- **Do you want to use a UI Framework?:** Ant Design
- **Do you want to add example pages?:** (your preference, either works)
- **Choose a package manager:** npm

You can skip the email prompt at the end if you'd like.

Selecting **Strapi v4** as the backend gives us a project that already includes `@refinedev/strapi-v4` and the related auth setup. Navigate in:

```bash
cd refine-blog-admin
```

If for some reason the Strapi data provider wasn't included (for example, if you started from a plain Vite template), you can install it manually:

```bash
npm install @refinedev/strapi-v4 axios
```

### Configuring the Data Provider

Open your `App.tsx` and configure the Strapi data provider so it points to your running Strapi instance:

```tsx
import { Refine, Authenticated } from "@refinedev/core";
import { DataProvider, AuthHelper } from "@refinedev/strapi-v4";
import routerProvider from "@refinedev/react-router";
import axios from "axios";

const API_URL = "http://localhost:1337";

const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(`${API_URL}/api`);

// Add auth token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("strapi-jwt-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const App = () => {
  return (
    <Refine
      dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
          show: "/posts/show/:id",
        },
      ]}
    >
      {/* Routes will go here */}
    </Refine>
  );
};
```

The key piece here is `DataProvider(`${API_URL}/api`, axiosInstance)`. This creates a data provider that knows how to talk to Strapi's REST API. The axios interceptor attaches the JWT token from localStorage to every request, so authenticated routes work seamlessly.

### Setting Up the Auth Provider

For the authentication layer, we'll use Strapi's built-in auth system. Create an `authProvider` that uses the `AuthHelper`:

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await strapiAuthHelper.login(email, password);
      localStorage.setItem("strapi-jwt-token", data.jwt);
      return { success: true, redirectTo: "/" };
    } catch (error) {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("strapi-jwt-token");
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    const token = localStorage.getItem("strapi-jwt-token");
    return token
      ? { authenticated: true }
      : { authenticated: false, redirectTo: "/login" };
  },
  getIdentity: async () => {
    const token = localStorage.getItem("strapi-jwt-token");
    if (!token) return null;
    const { data } = await strapiAuthHelper.me(token);
    return data;
  },
  onError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      return { logout: true, redirectTo: "/login" };
    }
    return {};
  },
};
```

Note that the `login` function receives `email` (not `identifier`) because Refine's `<AuthPage type="login" />` sends the form data with an `email` field. Strapi's `AuthHelper.login()` accepts this as the identifier.

Then pass it to the `<Refine>` component:

```tsx
<Refine
  dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
  authProvider={authProvider}
  routerProvider={routerProvider}
  resources={[/* ... */]}
>
```

## Setting Up Strapi

Now that the Refine frontend is scaffolded, let's set up the Strapi backend it will connect to. Make sure you're on Node 20 (run `node -v` to check), then open a new terminal and run:

```bash
npx create-strapi-app@4 strapi-blog --quickstart
```

The `--quickstart` flag sets up Strapi with a SQLite database and starts the development server automatically. If the CLI asks whether you'd like to log in or sign up for Strapi Cloud, select **Skip**.

If you didn't use `--quickstart` or the server isn't running, navigate into the project and start it:

```bash
cd strapi-blog
npm run develop
```

Strapi starts on `http://localhost:1337` by default. The first time you open it, you'll be asked to create an admin account. Fill in your details and log in to the admin panel.

### Creating the Blog Post Content Type

Now we need to define what a blog post looks like. In the Strapi admin panel:

1. Go to **Content-Type Builder** in the sidebar.
2. Click **Create new collection type**.
3. Name it `Post`.
4. Add the following fields:

| Field Name | Type                 | Notes                              |
| ---------- | -------------------- | ---------------------------------- |
| `title`    | Text (Short)         | Required                           |
| `content`  | Rich text (Markdown) | The main body of the blog post     |
| `slug`     | Text (Short)         | Unique, used for URLs              |
| `cover`    | Media (Single)       | Cover image for the post           |
| `category` | Enumeration          | Values: `tech`, `tutorial`, `news` |
| `status`   | Enumeration          | Values: `draft`, `published`       |

5. Click **Save**. Strapi will restart to apply the changes.

> **Important:** For the `content` field, make sure you pick **Rich text (Markdown)**, not the default Blocks editor. Our Refine form uses a plain `<Input.TextArea>`, which works with Markdown (stored as a string) but not with the Blocks format (stored as structured JSON).

### Setting Up API Permissions

By default, Strapi's API is locked down. We need to open up the endpoints for our Refine app to access.

Go to **Settings > Users & Permissions Plugin > Roles**, then click on the **Authenticated** role. Under the **Post** section, enable all actions: `find`, `findOne`, `create`, `update`, and `delete`. Save the changes.

For the **Public** role, enable only `find` and `findOne` if you want unauthenticated read access to your blog posts.

### Creating an API User

The admin account you just created is for Strapi's admin panel only. The Refine app authenticates through Strapi's Users & Permissions plugin (`/auth/local`), which uses a separate user system. You need to create an API user for the Refine login to work.

Go to **Content Manager > User** and click **Create new entry**. Fill in:

- **Username:** any value (e.g., `blogger`)
- **Email:** the email you'll use to log in from Refine
- **Password:** your chosen password
- **Confirmed:** toggle this ON (otherwise login will fail)
- **Role:** Authenticated

Save the entry. These are the credentials you'll use when logging into the Refine app later.

### Adding Some Sample Content

While you're in the admin panel, add a few sample blog posts. Go to **Content Manager > Post** and create 3-4 entries with different titles, categories, and statuses. This gives us data to work with when we build the Refine interface.

## Building the Blog Post List Page

With Strapi running and populated with sample data, let's head back to the Refine project and build the page that lists all blog posts. Create a file at `src/pages/posts/list.tsx`:

```tsx
import {
  List,
  useTable,
  TagField,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const PostList = () => {
  const { tableProps } = useTable({
    meta: {
      populate: ["cover"],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column
          dataIndex="category"
          title="Category"
          render={(value: string) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => (
            <TagField
              value={value}
              color={value === "published" ? "green" : "orange"}
            />
          )}
        />
        <Table.Column
          title="Actions"
          render={(_: any, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```

A few things to note here. The `meta: { populate: ["cover"] }` in `useTable` tells the Strapi data provider to include the cover image relation in the response, since Strapi doesn't include related fields by default.

The `List`, `useTable`, `TagField`, and button components come from `@refinedev/antd`, while `Table` and `Space` come from `antd` directly. Refine provides the data-aware hooks and CRUD wrappers, Ant Design provides the base UI components.

The `useTable` hook handles fetching, pagination, sorting, and filtering, and the `<Table>` component renders the data. The action buttons for edit, show, and delete are built into Refine's Ant Design integration.

## Building the Create and Edit Pages

Next, let's build the form for creating new blog posts. Create `src/pages/posts/create.tsx`:

```tsx
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Slug is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <Input.TextArea rows={12} />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            options={[
              { label: "Tech", value: "tech" },
              { label: "Tutorial", value: "tutorial" },
              { label: "News", value: "news" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

The edit page is almost identical but uses `<Edit>` instead of `<Create>`. Create `src/pages/posts/edit.tsx`:

```tsx
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const PostEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Slug is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <Input.TextArea rows={12} />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            options={[
              { label: "Tech", value: "tech" },
              { label: "Tutorial", value: "tutorial" },
              { label: "News", value: "news" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

Refine's `useForm` hook does the heavy lifting here. On the create page, it sends a POST request to Strapi when the form is submitted. On the edit page, it automatically fetches the existing record, populates the form fields, and sends a PUT request on save. You don't have to write any of that logic yourself.

## Building the Show Page

For viewing a single post, create `src/pages/posts/show.tsx`:

```tsx
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Image } from "antd";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query } = useShow({
    meta: {
      populate: ["cover"],
    },
  });
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Slug</Title>
      <Text>{record?.slug}</Text>

      <Title level={5}>Category</Title>
      <Tag>{record?.category}</Tag>

      <Title level={5}>Status</Title>
      <Tag color={record?.status === "published" ? "green" : "orange"}>
        {record?.status}
      </Tag>

      {record?.cover && (
        <>
          <Title level={5}>Cover Image</Title>
          <Image width={400} src={record.cover?.url} alt={record.title} />
        </>
      )}

      <Title level={5}>Content</Title>
      <Text>{record?.content}</Text>
    </Show>
  );
};
```

Again, the `meta.populate` option tells Strapi to include the cover image data in the response. The `useShow` hook fetches the record by ID (extracted from the URL) and gives us the data to render.

## Wiring Up the Routes

Now we need to connect these pages to routes. Here's the complete `App.tsx` that brings everything together, including the data provider, auth provider, and all route definitions:

```tsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Refine, Authenticated } from "@refinedev/core";
import type { AuthProvider } from "@refinedev/core";
import { ThemedLayout, AuthPage } from "@refinedev/antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { DataProvider, AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";

import { PostList } from "./pages/posts/list";
import { PostCreate } from "./pages/posts/create";
import { PostEdit } from "./pages/posts/edit";
import { PostShow } from "./pages/posts/show";

const API_URL = "http://localhost:1337";

const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(`${API_URL}/api`);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("strapi-jwt-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await strapiAuthHelper.login(email, password);
      localStorage.setItem("strapi-jwt-token", data.jwt);
      return { success: true, redirectTo: "/" };
    } catch (error) {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("strapi-jwt-token");
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    const token = localStorage.getItem("strapi-jwt-token");
    return token
      ? { authenticated: true }
      : { authenticated: false, redirectTo: "/login" };
  },
  getIdentity: async () => {
    const token = localStorage.getItem("strapi-jwt-token");
    if (!token) return null;
    const { data } = await strapiAuthHelper.me(token);
    return data;
  },
  onError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      return { logout: true, redirectTo: "/login" };
    }
    return {};
  },
};

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" fallback={<Outlet />}>
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              </Authenticated>
            }
          >
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/posts/show/:id" element={<PostShow />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
```

A few important details about the routing setup:

- The `<Authenticated>` component requires a `key` prop. This ensures React properly unmounts and remounts the component when auth state changes, preventing stale content from rendering.
- The layout component is `ThemedLayout` from `@refinedev/antd`. This provides the sidebar navigation and header automatically.
- The login route uses `<NavigateToResource>` as the children of `<Authenticated>`. This means: if the user is already logged in and visits `/login`, they get redirected to the posts list. If they're not logged in, the `fallback` renders the `<Outlet>`, which shows the login form.

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. You'll be redirected to the login page. Enter the email and password of the API user you created in the "Creating an API User" step (not your Strapi admin credentials). After logging in, you'll see the posts list populated with the sample content you added earlier.

## Handling Media Uploads

One thing that makes a blog feel complete is cover image management. Refine's Strapi data provider comes with helper utilities for handling file uploads. Let's add a cover image upload field to the create and edit forms.

First, update your create page to include a file upload field:

```tsx
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

const API_URL = "http://localhost:1337";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          return formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        {/* ...other fields... */}
        <Form.Item label="Cover Image">
          <Form.Item
            name="cover"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/api/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(
                  "strapi-jwt-token",
                )}`,
              }}
              listType="picture"
            >
              <p>Drag and drop a cover image here</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
```

Both `getValueProps` and `mediaUploadMapper` come from `@refinedev/strapi-v4`, not from `@refinedev/antd`. The `mediaUploadMapper` function converts the upload response (which includes the Strapi file ID) into the format Strapi expects when associating media with a content entry. The `getValueProps` helper normalizes the file data for Ant Design's Upload component. Together, they handle the entire upload flow without you needing to manage file IDs manually.

## Working with Strapi's Meta Options

The Strapi data provider supports several meta options that give you fine-grained control over API requests. These are passed through the `meta` property on Refine's data hooks.

**Population** controls which relations are included in the response. By default, Strapi doesn't include any relations:

```tsx
const { tableProps } = useTable({
  meta: {
    populate: ["cover", "author", "tags"],
  },
});
```

**Field selection** lets you request only specific fields, which can improve performance for large content types:

```tsx
const { tableProps } = useTable({
  meta: {
    fields: ["title", "slug", "status"],
  },
});
```

**Locale** support works if you've enabled i18n in your Strapi project:

```tsx
const { tableProps } = useTable({
  meta: {
    locale: "fr",
  },
});
```

These options are available on all data hooks: `useTable`, `useForm`, `useShow`, `useList`, `useOne`, and `useMany`.

## Adding Filtering and Sorting

One of the nice things about combining Refine with Strapi is that filtering and sorting just work. Refine's table hooks support server-side filtering out of the box, and the Strapi data provider translates those filters into Strapi's query format.

To add a search bar that filters posts by title, update the list page:

```tsx
import { List, useTable, TagField, FilterDropdown } from "@refinedev/antd";
import { Table, Input } from "antd";

export const PostList = () => {
  const { tableProps } = useTable({
    meta: {
      populate: ["cover"],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" sorter />
        <Table.Column
          dataIndex="title"
          title="Title"
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search title" />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column
          dataIndex="category"
          title="Category"
          render={(value: string) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => (
            <TagField
              value={value}
              color={value === "published" ? "green" : "orange"}
            />
          )}
        />
      </Table>
    </List>
  );
};
```

Adding `sorter` to a column enables click-to-sort. The `FilterDropdown` component provides an inline filter UI. When a user types in the search box, Refine sends the filter to Strapi, which handles the actual query on the database side. No client-side filtering needed.

## What You've Built

At this point, you have a fully functional blog admin panel:

- **Authentication** through Strapi's user system
- **List view** with paginated, sortable, and filterable blog posts
- **Create and edit forms** with validation and media upload
- **Detail view** for reading individual posts
- **Delete capability** with confirmation dialogs

The Strapi backend serves as both the content store and the API layer, while Refine handles the entire admin interface. Every CRUD operation flows through Refine's data provider, which translates it into the correct Strapi API call.

To display these posts on a public-facing blog, you'd build a separate frontend (a Next.js site, a Gatsby blog, or even a simple HTML page) that calls Strapi's public API endpoints. The admin panel we built here is purely for content management.

## Where to Go from Here

There's plenty you can add to this setup. Rich text editing with a proper WYSIWYG editor (like TipTap or CKEditor) would make content authoring much more comfortable. You could add categories and tags as separate collection types in Strapi with proper relations, instead of using enumeration fields. Image optimization through Strapi plugins would improve your blog's performance on the public site.

On the Refine side, you could implement role-based access control so editors can create drafts but only admins can publish. Refine has built-in support for this through its `accessControlProvider`. You could also add a dashboard page with post statistics, or integrate Refine's audit log to track content changes.

The full source code for the Strapi data provider is available in the [Refine GitHub repository](https://github.com/refinedev/refine/tree/master/packages/strapi-v4), and you can find a working example project in the [examples directory](https://github.com/refinedev/refine/tree/master/examples/data-provider-strapi-v4).

## Frequently Asked Questions

### Does Refine only work with Strapi?

No. Refine is backend-agnostic and supports many data providers out of the box, including REST APIs, GraphQL, Supabase, Appwrite, Airtable, NestJS, and more. The Strapi data provider is just one integration. You can also write your own custom data provider for any API.

### Which Strapi version should I use?

This tutorial uses Strapi v4, which is what `@refinedev/strapi-v4` is built and tested for. Refine does not officially support Strapi v5. Running `npx create-strapi-app@4` installs the latest v4 release. Note that Strapi v4 requires Node.js 20 (Node 18 is EOL and Node 22+ is not supported), so use [nvm](https://github.com/nvm-sh/nvm) to switch before installing Strapi if needed. The data provider supports features like field selection, deep population, locale, and publication state. There's also a legacy `@refinedev/strapi` package for Strapi v3, but v3 is no longer actively maintained by the Strapi team.

### Can I use a different UI library instead of Ant Design?

Yes. Refine supports Material UI, Mantine, and Chakra UI as alternatives to Ant Design. You can also go completely headless and build your own UI from scratch. The data provider and auth provider work the same way regardless of which UI library you choose.

### How do I deploy this setup?

Strapi and the Refine app are deployed separately. Strapi can be deployed to any Node.js hosting (Railway, Render, a VPS, or a container platform). The Refine app is a standard React application that can be deployed as a static site to Vercel, Netlify, Cloudflare Pages, or served from any web server. Just update the `API_URL` to point to your production Strapi instance.

### Do I need to handle CORS configuration?

Yes. When your Refine frontend and Strapi backend run on different domains (which they will in production), you'll need to configure CORS in Strapi. In your Strapi project, edit `config/middlewares.js` and update the `strapi::cors` middleware to allow your frontend's origin. During local development, Strapi allows `localhost` by default, so you shouldn't run into issues.

### Can I use GraphQL instead of REST?

Yes. Strapi supports GraphQL through an official plugin, and Refine has a separate GraphQL data provider. You'd use `@refinedev/graphql` instead of `@refinedev/strapi-v4`. The Refine hooks and components work exactly the same way, only the data provider changes.
