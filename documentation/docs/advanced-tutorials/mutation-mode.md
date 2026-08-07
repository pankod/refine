---
id: mutation-mode
title: "Mutation Mode Tutorial | Best Practices in Refine v5"
display_title: "Mutation Mode"
sidebar_label: "Mutation Mode"
description: "Set up Mutation Mode in Refine v5. Learn best practices. Explore production tips for optimistic updates, cache for production-ready workflows."
---

```tsx live shared
import { Refine } from "@refinedev/core";
import {
  AuthPage,
  RefineThemes,
  ThemedLayout,
  ErrorComponent,
  useNotificationProvider,
} from "@refinedev/antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

import {
  useMany as CoreUseMany,
  useShow as RefineCoreUseShow,
  useOne as RefineCoreUseOne,
} from "@refinedev/core";
import {
  List as RefineAntdList,
  TextField as RefineAntdTextField,
  useTable as RefineAntdUseTable,
  EditButton as RefineAntdEditButton,
  ShowButton as RefineAntdShowButton,
  useForm as RefineAntdUseForm,
  useSelect as RefineAntdUseSelect,
  Create as RefineAntdCreate,
  Edit as RefineAntdEdit,
  Show as RefineAntdShow,
} from "@refinedev/antd";
import {
  Table as AntdTable,
  Space as AntdSpace,
  Form as AntdForm,
  Select as AntdSelect,
  Input as AntdInput,
  Typography as AntdTypography,
} from "antd";

const PostList: React.FC = () => {
  const { tableProps } = RefineAntdUseTable<IPost>({
    sorters: {
      initial: [
        {
          field: "$id",
          order: "asc",
        },
      ],
    },
  });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const {
    result,
    query: { isLoading },
  } = CoreUseMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <RefineAntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="id" title="ID" />
        <AntdTable.Column dataIndex="title" title="Title" />
        <AntdTable.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <RefineAntdTextField value="Loading..." />;
            }

            return (
              <RefineAntdTextField
                value={result?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <AntdTable.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <RefineAntdEditButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <RefineAntdShowButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </RefineAntdList>
  );
};

const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = RefineAntdUseForm<IPost>();

  const { selectProps: categorySelectProps } = RefineAntdUseSelect<ICategory>({
    resource: "categories",
  });

  return (
    <RefineAntdCreate saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdSelect {...categorySelectProps} />
        </AntdForm.Item>
        <AntdForm.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput.TextArea />
        </AntdForm.Item>
      </AntdForm>
    </RefineAntdCreate>
  );
};

const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps, query } = RefineAntdUseForm<IPost>();

  const postData = query?.data?.data;
  const { selectProps: categorySelectProps } = RefineAntdUseSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    <RefineAntdEdit saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdSelect {...categorySelectProps} />
        </AntdForm.Item>
        <AntdForm.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput.TextArea />
        </AntdForm.Item>
      </AntdForm>
    </RefineAntdEdit>
  );
};

const PostShow: React.FC = () => {
  const {
    result: post,
    query: { data, isLoading },
  } = RefineCoreUseShow<IPost>();

  const {
    result: category,
    query: { isLoading: categoryIsLoading },
  } = RefineCoreUseOne<ICategory>({
    resource: "categories",
    id: post?.category?.id || "",
    queryOptions: {
      enabled: !!post,
    },
  });

  return (
    <RefineAntdShow isLoading={isLoading}>
      <AntdTypography.Title level={5}>Id</AntdTypography.Title>
      <AntdTypography.Text>{post?.id}</AntdTypography.Text>

      <AntdTypography.Title level={5}>
        AntdTypography.Title
      </AntdTypography.Title>
      <AntdTypography.Text>{post?.title}</AntdTypography.Text>

      <AntdTypography.Title level={5}>Category</AntdTypography.Title>
      <AntdTypography.Text>
        {categoryIsLoading ? "Loading..." : category?.title}
      </AntdTypography.Text>

      <AntdTypography.Title level={5}>Content</AntdTypography.Title>
      <AntdTypography.Text>{post?.content}</AntdTypography.Text>
    </RefineAntdShow>
  );
};
```

## Overview

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.
Each mode corresponds to a different type of user experience.

## Modes

We'll show usages of modes with editing a record examples.

### pessimistic

The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfully.

You can experience an example of this below using the edit page.

```tsx live previewOnly url=http://localhost:5173/posts previewHeight=600px
setInitialRoutes(["/posts"]);

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route index element={<NavigateToResource />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

> When the user clicks on save button, request to the API happens directly and after successful response, list page updates with newly edited record.

<br />

### optimistic

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is successful. If mutation returns with error, UI updates to show data prior to the mutation.

```tsx live previewOnly url=http://localhost:5173/posts previewHeight=600px
setInitialRoutes(["/posts"]);

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{ mutationMode: "optimistic" }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route index element={<NavigateToResource />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

> When the user clicks on save button, request to the API happens directly and list page updates with edited data immediately without waiting API response.

<br />

### undoable

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is successful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.

```tsx live previewOnly url=http://localhost:5173/posts previewHeight=600px
setInitialRoutes(["/posts"]);

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{ mutationMode: "undoable" }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route index element={<NavigateToResource />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

> When the user clicks on save button, request isn't sent to API immediately however list page updates with edited data. It waits for a period of time while the user can cancel the mutation. If the mutation is cancelled, locally applied edit is undone.

## Usage

Mutation mode can be set application-wide in [`<Refine>`](/core/docs/core/refine-component#mutationmode) component.

```tsx title="App.tsx"
<Refine
    ...
    options={{ mutationMode: "optimistic" }}
/>
```

> Its default value is `pessimistic`.

<br />

It can also be set in supported [data hooks](/core/docs/data/hooks/use-update#mutation-mode) and [form hooks](/core/docs/data/hooks/use-form/#properties) for fine-grained configuration.

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate } = useUpdate();

mutate({
  resource: "categories",
  id: "2",
  values: { title: "New Category Title" },
  // highlight-next-line
  mutationMode: "optimistic",
});
```

> Mutation mode passed to `<Refine>` will be overridden by the mutation mode passed to data or form hooks and components.

### Supported data hooks

- [`useUpdate` &#8594](/core/docs/data/hooks/use-update/)
- [`useUpdateMany` &#8594](/core/docs/data/hooks/use-update-many/)
- [`useDelete` &#8594](/core/docs/data/hooks/use-delete/)
- [`useDeleteMany` &#8594](/core/docs/data/hooks/use-delete-many/)

<br />

## Example

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design', value: 'antd'},
{label: 'Chakra UI', value: 'chakra-ui'},
{label: 'Mantine', value: 'mantine'},
{label: 'Material UI', value: 'material-ui'}
]}>

<TabItem value="antd">

<CodeSandboxExample path="form-antd-mutation-mode" />

</TabItem>

<TabItem value="chakra-ui">

<CodeSandboxExample path="form-chakra-ui-mutation-mode" />

</TabItem>

<TabItem value="mantine">

<CodeSandboxExample path="form-mantine-mutation-mode" />

</TabItem>

<TabItem value="material-ui">

<CodeSandboxExample path="form-material-ui-mutation-mode" />

</TabItem>

</Tabs>
