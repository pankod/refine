---
title: "i18n Concepts | Internationalization in Refine"
display_title: "Internationalization (i18n)"
sidebar_label: "Internationalization (i18n)"
description: "Master multi-language support. Learn the core concepts of implementing i18n in Refine v4 for global React applications."
---

import I18nHeadless from './i18n-headless.tsx';
import TranslationFileEN from '../../partials/\_partial-translation-file-en.md';
import TranslationFileDE from '../../partials/\_partial-translation-file-de.md';

Internationalization (i18n) is a process that allows software applications to be localized for different regions and languages. Refine can work with any i18n framework, but needs an [`i18nProvider`](/core/docs/i18n/i18n-provider) to be created based on the chosen library.

## i18n Provider

[`i18nProvider`](/core/docs/i18n/i18n-provider) centralizes localization process in Refine applications. With flexible interface you can use any i18n library you want.

Here is the basic example `i18nProvider` with [react-i18next](https://react.i18next.com/). We will explain the details in the following sections.

<I18nHeadless />

## Example

:::simple Good to know

- We will use the [Ant Design](https://ant.design/) UI library in this example. You can use any UI library you want.
- We recommend using [`create refine-app`][create-refine-app] to initialize your Refine projects as it configures the project according to your needs, i18n support included if you choose it in the CLI
- For more information, refer to the [react-i18next documentation&#8594](https://react.i18next.com/getting-started)
- This example is for SPA react apps, for Next.js refer to [i18n Next.js example&#8594][i18nnextjs]

:::

First of all, Refine expects the `i18nProvider` type as follows:

```ts
import { I18nProvider } from "@refinedev/core";

const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => string,
  changeLocale: (lang: string, options?: any) => Promise,
  getLocale: () => string,
};
```

After creating a `i18nProvider`, you can pass it to the `<Refine />` component:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import i18nProvider from "./i18nProvider";

const App: React.FC = () => {
  return (
    <Refine
      // highlight-next-line
      i18nProvider={i18nProvider}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

This will allow us to put translation features to the [`useTranslation`][use-translation] hook

Let's add multi-language support to our application using the `react-i18next` framework. When we are done, our application will support both German and English.

### Installation

To install both `react-i18next` and `i18next` packages, run the following command within your project directory:

<InstallPackagesCommand args="react-i18next i18next i18next-http-backend i18next-browser-languagedetector"/>

### Creating the i18n Instance

First, we will create an i18n instance using `react-i18next`.

```ts title="src/i18n.ts"
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // https://react.i18next.com/latest/using-with-hooks
import Backend from "i18next-http-backend"; // For lazy loading for translations: https://github.com/i18next/i18next-http-backend
import detector from "i18next-browser-languagedetector"; // For auto detecting the user language: https://github.com/i18next/i18next-browser-languageDetector

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "de"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // locale files path
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: ["en", "de"],
  });

export default i18n;
```

### Wrapping the app with React.Suspense

Then we will import the i18n instance we created and wrap the application with `React.Suspense`.

```tsx title="src/index.tsx"
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// highlight-next-line
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    // highlight-start
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
    // highlight-end
  </React.StrictMode>,
);
```

### Creating the i18n Provider

Next, we will include the i18n instance and create the `i18nProvider` using `react-i18next`.

```tsx title="src/App.tsx"
// highlight-next-line
import type { I18nProvider } from "@refinedev/core";
import { Refine } from "@refinedev/core";
// highlight-next-line
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  // highlight-start
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any) => t(key, options),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  // highlight-end

  return (
    <Refine
      // highlight-next-line
      i18nProvider={i18nProvider}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

After we pass the `i18nProvider` to the `<Refine />` component, [`useTranslation`][use-translation] hook will be ready for use.

### Adding the Translations Files

Before we get started, let's look at which parts are going to be translated:

<details>
<summary>The translation file</summary>

 <TranslationFileEN />

</details>

Now, let's add the language files:

```
|-- public
|   |-- locales
|       |-- en
|       |   |-- common.json
|       |-- de
|           |-- common.json
|-- src
|-- package.json
|-- tsconfig.json
```

<Tabs
defaultValue="en"
values={[{ label: "English", value: "en" }, { label: "German", value: "de" }]}>
<TabItem value="en">

<details>
<summary>Show translation file</summary>

<TranslationFileEN />

</details>

</TabItem>
<TabItem value="de">

<details>
<summary>Show translation file</summary>

<TranslationFileDE />

</details>

</TabItem>
</Tabs>

All of Refine's components support i18n, meaning that if you want to change their text, you can create your own translation files with the reference to the keys above. We can override Refine's default texts by changing the `common.json` files in the example above.

### Changing The Locale

Next, we will create a `<Header />` component. This component will allow us to change the language.

```tsx title="src/components/header.tsx"
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "@refinedev/core";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { getLocale, changeLocale } = useTranslation();
  const currentLocale = getLocale();

  const menu = (
    <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
      {[...(i18n.languages || [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          onClick={() => changeLocale(lang)}
          icon={
            <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
            </span>
          }
        >
          {lang === "en" ? "English" : "German"}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "48px",
        backgroundColor: "#FFF",
      }}
    >
      <Dropdown overlay={menu}>
        <Button type="link">
          <Space>
            <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
            {currentLocale === "en" ? "English" : "German"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Layout.Header>
  );
};
```

<br/>

Then, we will pass `<Header>` to our `<Layout>` component.

```tsx title="src/App.tsx"
import { Refine, Resource } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

import { useTranslation } from "react-i18next";

import "./i18n";

// highlight-next-line
import { Header } from "components";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, options?: any) => t(key, options),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Refine
            i18nProvider={i18nProvider}
            /* ... */
        >
            <ThemedLayoutV2
                // highlight-next-line
                header={<Header />}
            >
                {/* ... */}
            </Layout>
        </Refine>
    );
};
```

<br />

Finally, we will create the `<PostList>` page and then we will translate texts using [`useTranslation`][use-translation].

```tsx title="src/App.tsx"
import {
  // highlight-next-line
  useTranslation,
  useMany,
} from "@refinedev/core";
import {
  List,
  useTable,
  TextField,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
  // highlight-next-line
  const { translate } = useTranslation();
  const { tableProps } = useTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex="title"
          // highlight-next-line
          title={translate("posts.fields.title")}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          // highlight-next-line
          title={translate("posts.fields.category")}
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <Table.Column<IPost>
          // highlight-next-line
          title={translate("table.actions")}
          dataIndex="actions"
          key="actions"
          render={(_value, record) => (
            <Space>
              <EditButton size="small" recordItemId={record.id} />
              <ShowButton size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```

```ts title="interfaces/index.d.ts"
export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}
```

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/i18n/changing-language.avif" alt="Language change action" />

## Translation file

All of Refine's components supports `i18n`, meaning that if you want to change their text, you can create your own translation files to override Refine's default texts.

Here is the list of all translation keys that you can override:

<details>
<summary>Show translation file</summary>

<TranslationFileEN />

</details>

[i18nnextjs]: /core/docs/examples/i18n/i18n-nextjs
[react-i18next]: https://react.i18next.com/
[create-refine-app]: /core/docs/getting-started/quickstart
[use-translation]: /core/docs/i18n/hooks/use-translation
