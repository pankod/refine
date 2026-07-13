---
id: antd-custom-theme
title: Theme
---

```tsx live shared
import React from "react";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";

import {
  List,
  Show,
  Create,
  Edit,
  ShowButton,
  EditButton,
  Table,
  useTable,
  Space,
  TextField,
  Form,
  Input,
  useForm,
  Typography,
} from "@pankod/refine-antd";

const { Title, Text } = Typography;

const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

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
      </Form>
    </Create>
  );
};

const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
  );
};

const PostEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

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
      </Form>
    </Edit>
  );
};

const IconSun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-sun"
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
    <circle cx={12} cy={12} r={4}></circle>
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
  </svg>
);

const IconMoonStars = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-moon-stars"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
    <path d="M19 11h2m-1 -1v2"></path>
  </svg>
);

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft";
  category: { id: number };
}
```

Ant Design allows you to customize design tokens to satisfy UI diversity from business or brand requirements, including primary color, border radius, border color, etc.
Design Tokens are the smallest element that affects the theme. By modifying the Design Token, we can present various themes or components.

[Refer to the Ant Design documentation for more information about customizing Ant Design theme. &#8594](https://ant.design/docs/react/customize-theme)

## Theme customization

[`<ConfigProvider/>`](https://ant.design/components/config-provider/#components-config-provider-demo-theme) component can be used to change theme. It is not required if you decide to use the default theme.

### Overriding the themes

You can override or extend the default themes. You can also create your own theme. Let's see how to do this.

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import {
  useNotificationProvider,
  Layout,
  ErrorComponent,
  ConfigProvider,
} from "@pankod/refine-antd";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    // highlight-start
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadius: 0,
          },
          Typography: {
            colorTextHeading: "#1890ff",
          },
        },
        token: {
          colorPrimary: "#f0f",
        },
      }}
    >
      {/* highlight-end */}
      <Refine
        dataProvider={dataProvider(API_URL)}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEdit,
            show: PostShow,
          },
        ]}
        notificationProvider={useNotificationProvider}
        Layout={Layout}
        catchAll={<ErrorComponent />}
      />
      // highlight-next-line
    </ConfigProvider>
  );
};

// visible-block-end
render(<App />);
```

### Use Preset Algorithms

Themes with different styles can be quickly generated by modifying algorithm. Ant Design 5.0 provides three sets of [preset algorithms by default](https://ant.design/docs/react/customize-theme#theme-presets), which are default algorithm `theme.defaultAlgorithm`, dark algorithm `theme.darkAlgorithm` and compact algorithm `theme.compactAlgorithm`. You can switch algorithms by modifying the algorithm property of theme in [`<ConfigProvider/>`](https://ant.design/components/config-provider/#components-config-provider-demo-theme).

[Refer to the Ant Design documentation for more information about customizing Ant Design theme. &#8594](https://ant.design/docs/react/customize-theme#use-preset-algorithms)

#### Switching to dark theme

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { FC, useState } from "react";
import { Button } from "@pankod/refine-antd";
import { Refine } from "@pankod/refine-core";
import {
  useNotificationProvider,
  Layout,
  ErrorComponent,
  ConfigProvider,
  // highlight-next-line
  theme,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

import "@pankod/refine-antd/dist/reset.min.css";

// highlight-start
interface HeaderProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <Space
      direction="vertical"
      align="end"
      style={{
        padding: "1rem",
      }}
    >
      <Button
        onClick={() => {
          props.setTheme(props.theme === "light" ? "dark" : "light");
        }}
        icon={props.theme === "light" ? <IconMoonStars /> : <IconSun />}
      />
    </Space>
  );
};
// highlight-end

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  // highlight-next-line
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  return (
    <ConfigProvider
      // highlight-next-line
      theme={{
        algorithm:
          currentTheme === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
      }}
    >
      <Refine
        dataProvider={dataProvider(API_URL)}
        routerProvider={routerProvider}
        // highlight-start
        Header={() => (
          <Header theme={currentTheme} setTheme={setCurrentTheme} />
        )}
        // highlight-end
        resources={[
          {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEdit,
            show: PostShow,
          },
        ]}
        notificationProvider={useNotificationProvider}
        Layout={Layout}
        catchAll={<ErrorComponent />}
      />
    </ConfigProvider>
  );
};

// visible-block-end
render(<App />);
```

## Example

<CodeSandboxExample path="customization-theme-antd" />
