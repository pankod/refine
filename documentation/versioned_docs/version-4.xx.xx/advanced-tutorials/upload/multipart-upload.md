---
id: multipart-upload
title: "Multipart File Uploads | Refine v4 Media Management"
display_title: "Multipart Upload"
sidebar_label: "Multipart Upload"
description: "Learn how to handle large file uploads using Multipart/form-data in Refine v4. Essential guide for cloud storage and API integrations."
---

```tsx live shared
import { Refine } from "@refinedev/core";
import { AuthPage, RefineThemes, ThemedLayoutV2, ErrorComponent, useNotificationProvider } from "@refinedev/antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

import {
    useMany as CoreUseMany,
    useShow as RefineCoreUseShow,
    useOne as RefineCoreUseOne,
    useApiUrl as RefineCoreUseApiUrl,
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
    getValueFromEvent as RefineAntdGetValueFromEvent,
} from "@refinedev/antd";
import {
    Table as AntdTable,
    Space as AntdSpace,
    Form as AntdForm,
    Select as AntdSelect,
    Input as AntdInput,
    Typography as AntdTypography,
    Upload as AntdUpload,
} from "antd";

const PostList: React.FC = () => {
    const { tableProps, sorter } = RefineAntdUseTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
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
                <AntdTable.Column
                    dataIndex="id"
                    title="ID"
                />
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
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
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

    const { selectProps: categorySelectProps } = RefineAntdUseSelect<ICategory>(
        {
            resource: "categories",
        },
    );

    const apiUrl = RefineCoreUseApiUrl();

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
                <AntdForm.Item label="Image">
                    <AntdForm.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={RefineAntdGetValueFromEvent}
                        noStyle
                    >
                        <AntdUpload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </AntdUpload.Dragger>
                    </AntdForm.Item>
                </AntdForm.Item>
            </AntdForm>
        </RefineAntdCreate>
    );
};

const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps, query } =
        RefineAntdUseForm<IPost>();

    const postData = query?.data?.data;
    const { selectProps: categorySelectProps } = RefineAntdUseSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const apiUrl = RefineCoreUseApiUrl();

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
                <AntdForm.Item label="Image">
                    <AntdForm.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={RefineAntdGetValueFromEvent}
                        noStyle
                    >
                        <AntdUpload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </AntdUpload.Dragger>
                    </AntdForm.Item>
                </Form.Item>
            </AntdForm>
        </RefineAntdEdit>
    );
};

const PostShow: React.FC = () => {
    const { queryResult } = RefineCoreUseShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } =
        RefineCoreUseOne<ICategory>({
            resource: "categories",
            id: record?.category?.id || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    return (
        <RefineAntdShow isLoading={isLoading}>
            <AntdTypography.Title level={5}>Id</AntdTypography.Title>
            <AntdTypography.Text>{record?.id}</AntdTypography.Text>

            <AntdTypography.Title level={5}>
                AntdTypography.Title
            </AntdTypography.Title>
            <AntdTypography.Text>{record?.title}</AntdTypography.Text>

            <AntdTypography.Title level={5}>Category</AntdTypography.Title>
            <AntdTypography.Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </AntdTypography.Text>

            <AntdTypography.Title level={5}>Content</AntdTypography.Title>
            <AntdTypography.Text>{record?.content}</AntdTypography.Text>
        </RefineAntdShow>
    );
};
```

We will demonstrate how to perform a multipart upload with **Refine**.

Let's start with the `creation form` first.

### Create Form

Let's add the image field to the post `creation form`.

```tsx title="pages/posts/create.tsx"
import {
  // highlight-start
  useApiUrl,
  // highlight-end
} from "@refinedev/core";
import {
  // highlight-start
  getValueFromEvent,
  // highlight-end
  Create,
  useForm,
} from "@refinedev/antd";
import {
  // highlight-next-line
  Upload,
  Form,
  Input,
} from "antd";

export const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  // highlight-next-line
  const apiUrl = useApiUrl();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            // highlight-next-line
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            // highlight-start
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/media/upload`}
              listType="picture"
              maxCount={5}
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
            // highlight-end
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};

interface IPost {
  id: number;
  title: string;
  image: [
    {
      uid: string;
      name: string;
      url: string;
      status: "error" | "success" | "done" | "uploading" | "removed";
    },
  ];
}
```

<br />

:::tip

We can reach the API URL by using the [`useApiUrl`](/core/docs/data/hooks/use-api-url) hook.

:::

It will look like this.

```tsx live previewOnly url=http://localhost:5173 previewHeight=600px
setInitialRoutes(["/posts/create"]);

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
              create: "/posts/create",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
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

We currently require an upload endpoint that accepts multipart uploads. This address should be passed into the `action` property of the `Upload` component.

```json title="[POST] https://api.fake-rest.refine.dev/media/upload"
{
  "file": "binary"
}
```

:::caution

This end-point should be `Content-type: multipart/form-data` and `Form Data: file: binary`.

:::

This end-point should respond similarly.

```json title="[POST] https://api.fake-rest.refine.dev/media/upload"
{
  "url": "https://example.com/uploaded-file.jpeg"
}
```

:::caution

We have to use the `getValueFromEvent` method to convert the uploaded files to [Antd UploadFile](https://ant.design/components/upload/#UploadFile) object.

:::

This data is sent to the API when the form is submitted.

```json title="[POST] https://api.fake-rest.refine.dev/posts"
{
  "title": "Test",
  "image": [
    {
      "uid": "rc-upload-1620630541327-7",
      "name": "greg-bulla-6RD0mcpY8f8-unsplash.jpg",
      "url": "https://refine.ams3.digitaloceanspaces.com/78c82c0b2203e670d77372f4c20fc0e2",
      "type": "image/jpeg",
      "size": 70922,
      "percent": 100,
      "status": "done"
    }
  ]
}
```

:::caution

The following data are required for the [Antd Upload](https://ant.design/components/upload) component and all should be saved.

:::

| Property | Description                              |
| -------- | ---------------------------------------- |
| uid      | Unique id                                |
| name     | File Name                                |
| url      | Download URL                             |
| status   | error, success, done, uploading, removed |

### Edit Form

Let's add the image field to the post editing form.

```tsx title="pages/posts/edit.tsx"
import {
  // highlight-start
  useApiUrl,
  // highlight-end
} from "@refinedev/core";
import {
  // highlight-start
  getValueFromEvent,
  // highlight-end
  Edit,
  useForm,
} from "@refinedev/antd";
import {
  // highlight-next-line
  Upload,
  Form,
  Input,
} from "antd";

export const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  // highlight-next-line
  const apiUrl = useApiUrl();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            // highlight-next-line
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            // highlight-start
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/media/upload`}
              listType="picture"
              maxCount={5}
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
            // highlight-end
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

```tsx live previewOnly url=http://localhost:5173 previewHeight=600px
setInitialRoutes(["/posts/edit/111"]);

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
              create: "/posts/create",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
            },
          ]}
          notificationProvider={useNotificationProvider}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
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

The request, like the one below, is sent for the edit form.

```json title="[GET] https://api.fake-rest.refine.dev/posts/1"
{
  "id": 1,
  "title": "Test",
  "image": [
    {
      "uid": "rc-upload-1620630541327-7",
      "name": "greg-bulla-6RD0mcpY8f8-unsplash.jpg",
      "url": "https://refine.ams3.digitaloceanspaces.com/78c82c0b2203e670d77372f4c20fc0e2",
      "type": "image/jpeg",
      "size": 70922,
      "percent": 100,
      "status": "done"
    }
  ]
}
```

This data is sent to the API when form is submitted.

```json title="[PUT] https://api.fake-rest.refine.dev/posts/1"
{
  "title": "Test",
  "image": [
    {
      "uid": "rc-upload-1620630541327-7",
      "name": "greg-bulla-6RD0mcpY8f8-unsplash.jpg",
      "url": "https://refine.ams3.digitaloceanspaces.com/78c82c0b2203e670d77372f4c20fc0e2",
      "type": "image/jpeg",
      "size": 70922,
      "percent": 100,
      "status": "done"
    }
  ]
}
```

### Uploading State

You may want to disable the "Save" button in the form while the upload is going on. To do this, you can use the `useFileUploadState` hook.

```tsx title="pages/posts/create.tsx"
import { useApiUrl } from "@refinedev/core";
import {
  getValueFromEvent,
  // highlight-next-line
  useFileUploadState,
  Create,
  useForm,
} from "@refinedev/antd";
import { Upload, Form, Input } from "antd";

export const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  // highlight-next-line
  const { isLoading, onChange } = useFileUploadState();

  const apiUrl = useApiUrl();

  return (
    <Create
      // highlight-start
      saveButtonProps={{
        ...saveButtonProps,
        disabled: isLoading,
      }}
      // highlight-end
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/media/upload`}
              listType="picture"
              maxCount={5}
              multiple
              // highlight-next-line
              onChange={onChange}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
```

## Example

<CodeSandboxExample path="upload-antd-multipart" />
