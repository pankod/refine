---
title: "Command Palette Integration Guide | Packages in Refine v5"
display_title: "Command Palette"
sidebar_label: "Command Palette"
description: "Explore how to implement Command Palette in Refine v5. Learn access and control for real-world React admin panels. Explore with code snippets."
---

```tsx live shared
import {
  useMany as CoreUseMany,
  useShow as RefineCoreUseShow,
  useOne as RefineCoreUseOne,
} from "@refinedev/core";
import {
  List as RefineAntdList,
  TextField as RefineAntdTextField,
  TagField as RefineAntdTagField,
  useTable as RefineAntdUseTable,
  EditButton as RefineAntdEditButton,
  ShowButton as RefineAntdShowButton,
  getDefaultSortOrder as RefineAntdGetDefaultSortOrder,
  useForm as RefineAntdUseForm,
  useSelect as RefineAntdUseSelect,
  Create as RefineAntdCreate,
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
  const { tableProps } = RefineAntdUseTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.categoryId) ?? [];
  const { data, isLoading } = CoreUseMany<ICategory>({
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
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <AntdTable.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <RefineAntdTagField value={value} />}
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
    resource: "61bc4afa9ee2c",
    optionLabel: "title",
    optionValue: "id",
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
          name="categoryId"
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
    defaultValue: postData?.categoryId,
    resource: "61c43adc284ac",
    optionLabel: "title",
    optionValue: "id",
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
          name="categoryId"
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

const PostShow: React.FC = () => {
  const { query } = RefineCoreUseShow<IPost>();
  const { isLoading } = query;
  const post = query?.data?.data;

  const { data: category, isLoading: categoryIsLoading } =
    RefineCoreUseOne<ICategory>({
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

Refine supports the command palette feature and use the
[**kbar**][kbar]. **kbar** is a fully extensible `cmd` + `k`(MacOS) or `ctrl` + `k`(Linux/Windows) interface for your site.

## Installation

Install the [@refinedev/kbar][refine-kbar] library.

<InstallPackagesCommand args="@refinedev/kbar"/>

## Usage

First of all, you need to import the `@refinedev/kbar` library and we will use `RefineKbarProvider` to wrap the whole application.

After that, we should mount the `RefineKbar` component inside the `<Refine>` component.

```tsx tile="app.tsx"
// highlight-next-line
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      // highlight-next-line
      <RefineKbarProvider>
        <Refine
        //...
        >
          {/*...*/}
          {/* highlight-next-line */}
          <RefineKbar />
        </Refine>
        // highlight-next-line
      </RefineKbarProvider>
    </BrowserRouter>
  );
};
```

You can click on the live preview area and test how it works with `cmd` + `k`(MacOS) or `ctrl` + `k`(Linux/Windows).

```tsx live previewOnly url=http://localhost:5173 previewHeight=650px
setInitialRoutes(["/posts"]);
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ThemedLayout,
  RefineThemes,
  useNotificationProvider,
  List,
  EditButton,
  ShowButton,
  useTable,
  AuthPage,
  ErrorComponent,
} from "@refinedev/antd";
import { ConfigProvider, Layout, Table, Space } from "antd";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <RefineKbarProvider>
          <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
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
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              liveMode: "auto",
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
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
              </Route>
            </Routes>
            <RefineKbar />
          </Refine>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};
render(<App />);
```

## Access Control

`refine-kbar` respects the access control settings of your App. To learn more about access control, please refer to the [Access Control Provider][access-control] section of the documentation. Also, we can use the `canDelete` in the `resources` to check the delete accessibility of the command palette.

For more information check out the source code of [`refine-kbar`][refine-kbar] package

## Actions

`refine-kbar` uses your resources to create default actions. Which includes; `list`, `create`, `edit`, `show` and `delete`. It will hide the current action of the page you are in.

## Custom Actions

If we want to add custom actions to the command palette, we can use the `createAction` and `useRegisterActions` of the `refine-kbar`.
check the [`refine-finefoods`][refine-finefoods] example.

Also you can find more information about actions in the [`kbar`][kbar-actions] package.

You can use the `createAction` to create a new action and use the `useRegisterActions` to register the action to the command palette.

```tsx title="Custom action example"
import { createAction, useRegisterActions } from "@refinedev/kbar";

const customAction = createAction({
  name: "my custom action",
  section: "custom-actions",
  perform: () => {
    console.log("onSelect my custom action");
  },
  priority: Priority.HIGH,
});

useRegisterActions(customAction);
```

:::simple Good to know

Since `refine-kbar` exports the [`kbar`](https://github.com/timc1/kbar), you use all of its features

:::

## Example

<CodeSandboxExample path="command-palette-kbar" />

[kbar]: https://github.com/timc1/kbar
[kbar-actions]: https://kbar.vercel.app/docs/concepts/actions
[refine-kbar]: https://github.com/refinedev/refine/tree/main/packages/kbar
[access-control]: /core/docs/authorization/access-control-provider
[usecanwithoutcache]: https://github.com/refinedev/refine/blob/main/packages/core/src/hooks/accessControl/useCanWithoutCache.ts
[refine-finefoods]: https://github.com/refinedev/refine/blob/main/examples/finefoods-material-ui/src/hooks/useOrderCustomKbarActions/index.tsx
