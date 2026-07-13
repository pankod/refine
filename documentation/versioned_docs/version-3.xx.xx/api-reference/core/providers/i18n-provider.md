---
id: i18n-provider
title: i18n Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** can work with any i18n framework, but an `i18nProvider` must be created, based on the chosen library.

The default language of **refine** is currently English. If you want to use other languages, follow the instructions in the next sections. If your application is in English, you don't need to create an `i18nProvider`.

## Usage

If you want to add i18n support in the app, **refine** expects the `i18nProvider` type as follows.

```ts
import { I18nProvider } from "@pankod/refine-core";

const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => string,
  changeLocale: (lang: string, options?: any) => Promise,
  getLocale: () => string,
};
```

After creating a `i18nProvider`, you can pass it to the `<Refine>` component.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import i18nProvider from "./i18nProvider";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      i18nProvider={i18nProvider}
      resources={[{ name: "posts" }]}
    />
  );
};
```

`i18nProvider` allows us to put translation features to the followings hooks:

- [`useTranslate`][use-translate] shows translation between different languages.
- [`useSetLocale`][use-setlocale] changes locale at runtime.
- [`useGetLocale`][use-getlocale] getting current locale.

## Example

:::tip
We recommend using [`create refine-app`][create-refine-app] to initialize your refine projects. It configures the project according to your needs including the i18n provider.
:::

:::caution
This example is for SPA react apps, for Next.js [refer to i18n Nextjs example ][i18nnextjs]
:::

Let's add multi-language support using the [`react-i18next`][react-i18next] framework. At the end of our example, our application will support both German and English.

[Refer to the react-i18next docs for detailed information &#8594](https://react.i18next.com/getting-started)

### Installation

Run the following command within your project directory to install both [`react-i18next`][react-i18next] and `i18next` packages :

<InstallPackagesCommand args="react-i18next i18next"/>

### Creating i18n Instance

First, we will create an i18n instance using [`react-i18next`][react-i18next].

```ts title="src/i18n.ts"
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // https://react.i18next.com/latest/using-with-hooks
import Backend from "i18next-http-backend"; // adding lazy loading for translations, more information here: https://github.com/i18next/i18next-http-backend
import detector from "i18next-browser-languagedetector"; // auto detect the user language, more information here: https://github.com/i18next/i18next-browser-languageDetector

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "de"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // locale files path
    },
    defaultNS: "common",
    fallbackLng: ["en", "de"],
  });

export default i18n;
```

### Wraping app with React.Suspense

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

:::tip
We use `React.Suspense` because it improves performance by preventing the app from rendering unnecessarily.
:::

### Creating i18n Provider

Next, we will include the i18n instance and create the `i18nProvider` using [`react-i18next`][react-i18next].

```tsx title="src/App.tsx"
// highlight-next-line
import { Refine, I18nProvider } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
// highlight-next-line
import { useTranslation } from "react-i18next";

import { PostList } from "pages/posts";

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
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      // highlight-next-line
      i18nProvider={i18nProvider}
      resources={[{ name: "posts", list: PostList }]}
    />
  );
};
```

After we pass the `i18nProvider` to the `<Refine>` component, translation hooks([`useTranslate`][use-translate], [`useSetLocale`][use-setlocale], [`useGetLocale`][use-getlocale]) are fully ready to use.

### Adding Translations Files

Before we get started, let's look at the translations that **refine** uses in components.

<details>
<summary>Show translation file</summary>

```json
{
  "pages": {
    "login": {
      "title": "Sign in to your account",
      "signin": "Sign in",
      "signup": "Sign up",
      "divider": "or",
      "fields": {
        "email": "Email",
        "password": "Password"
      },
      "errors": {
        "validEmail": "Invalid email address"
      },
      "buttons": {
        "submit": "Login",
        "forgotPassword": "Forgot password?",
        "noAccount": "Don’t have an account?",
        "rememberMe": "Remember me"
      }
    },
    "forgotPassword": {
      "title": "Forgot your password?",
      "fields": {
        "email": "Email"
      },
      "errors": {
        "validEmail": "Invalid email address"
      },
      "buttons": {
        "submit": "Send reset instructions"
      }
    },
    "register": {
      "title": "Sign up for your account",
      "fields": {
        "email": "Email",
        "password": "Password"
      },
      "errors": {
        "validEmail": "Invalid email address"
      },
      "buttons": {
        "submit": "Register",
        "haveAccount": "Have an account?"
      }
    },
    "updatePassword": {
      "title": "Update password",
      "fields": {
        "password": "New Password",
        "confirmPassword": "Confirm new password"
      },
      "errors": {
        "confirmPasswordNotMatch": "Passwords do not match"
      },
      "buttons": {
        "submit": "Update"
      }
    },
    "error": {
      "info": "You may have forgotten to add the {{action}} component to {{resource}} resource.",
      "404": "Sorry, the page you visited does not exist.",
      "resource404": "Are you sure you have created the {{resource}} resource.",
      "backHome": "Back Home"
    }
  },
  "actions": {
    "list": "List",
    "create": "Create",
    "edit": "Edit",
    "show": "Show"
  },
  "buttons": {
    "create": "Create",
    "save": "Save",
    "logout": "Logout",
    "delete": "Delete",
    "edit": "Edit",
    "cancel": "Cancel",
    "confirm": "Are you sure?",
    "filter": "Filter",
    "clear": "Clear",
    "refresh": "Refresh",
    "show": "Show",
    "undo": "Undo",
    "import": "Import",
    "clone": "Clone",
    "notAccessTitle": "You don't have permission to access"
  },
  "warnWhenUnsavedChanges": "Are you sure you want to leave? You have unsaved changes.",
  "notifications": {
    "success": "Successful",
    "error": "Error (status code: {{statusCode}})",
    "undoable": "You have {{seconds}} seconds to undo",
    "createSuccess": "Successfully created {{resource}}",
    "createError": "There was an error creating {{resource}} (status code: {{statusCode}})",
    "deleteSuccess": "Successfully deleted {{resource}}",
    "deleteError": "Error when deleting {{resource}} (status code: {{statusCode}})",
    "editSuccess": "Successfully edited {{resource}}",
    "editError": "Error when editing {{resource}} (status code: {{statusCode}})",
    "importProgress": "Importing: {{processed}}/{{total}}"
  },
  "loading": "Loading",
  "tags": {
    "clone": "Clone"
  },
  "dashboard": {
    "title": "Dashboard"
  }
}
```

</details>

All components of **refine** supports i18n. If you want to change the **refine** component texts, you can create your own translation file with reference to the keys above.

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

```json title="/locales/en/common.json"
{
  "pages": {
    "login": {
      "title": "Sign in to your account",
      "signin": "Sign in",
      "signup": "Sign up",
      "divider": "or",
      "fields": {
        "email": "Email",
        "password": "Password"
      },
      "errors": {
        "validEmail": "Invalid email address"
      },
      "buttons": {
        "submit": "Login",
        "forgotPassword": "Forgot password?",
        "noAccount": "Don’t have an account?",
        "rememberMe": "Remember me"
      }
    },
    "forgotPassword": {
      "title": "Forgot your password?",
      "fields": {
        "email": "Email"
      },
      "errors": {
        "validEmail": "Invalid email address"
      },
      "buttons": {
        "submit": "Send reset instructions"
      }
    },
    "register": {
      "title": "Sign up for your account",
      "fields": {
        "email": "Email",
        "password": "Password"
      },
      "errors": {
        "validEmail": "Invalid email address"
      },
      "buttons": {
        "submit": "Register",
        "haveAccount": "Have an account?"
      }
    },
    "updatePassword": {
      "title": "Update password",
      "fields": {
        "password": "New Password",
        "confirmPassword": "Confirm new password"
      },
      "errors": {
        "confirmPasswordNotMatch": "Passwords do not match"
      },
      "buttons": {
        "submit": "Update"
      }
    },
    "error": {
      "info": "You may have forgotten to add the {{action}} component to {{resource}} resource.",
      "404": "Sorry, the page you visited does not exist.",
      "resource404": "Are you sure you have created the {{resource}} resource.",
      "backHome": "Back Home"
    }
  },
  "actions": {
    "list": "List",
    "create": "Create",
    "edit": "Edit",
    "show": "Show"
  },
  "buttons": {
    "create": "Create",
    "save": "Save",
    "logout": "Logout",
    "delete": "Delete",
    "edit": "Edit",
    "cancel": "Cancel",
    "confirm": "Are you sure?",
    "filter": "Filter",
    "clear": "Clear",
    "refresh": "Refresh",
    "show": "Show",
    "undo": "Undo",
    "import": "Import",
    "clone": "Clone",
    "notAccessTitle": "You don't have permission to access"
  },
  "warnWhenUnsavedChanges": "Are you sure you want to leave? You have unsaved changes.",
  "notifications": {
    "success": "Successful",
    "error": "Error (status code: {{statusCode}})",
    "undoable": "You have {{seconds}} seconds to undo",
    "createSuccess": "Successfully created {{resource}}",
    "createError": "There was an error creating {{resource}} (status code: {{statusCode}})",
    "deleteSuccess": "Successfully deleted {{resource}}",
    "deleteError": "Error when deleting {{resource}} (status code: {{statusCode}})",
    "editSuccess": "Successfully edited {{resource}}",
    "editError": "Error when editing {{resource}} (status code: {{statusCode}})",
    "importProgress": "Importing: {{processed}}/{{total}}"
  },
  "loading": "Loading",
  "tags": {
    "clone": "Clone"
  },
  "dashboard": {
    "title": "Dashboard"
  },
  "posts": {
    "posts": "Posts",
    "fields": {
      "id": "Id",
      "title": "Title",
      "category": "Category",
      "status": {
        "title": "Status",
        "published": "Published",
        "draft": "Draft",
        "rejected": "Rejected"
      },
      "content": "Content",
      "createdAt": "Created At"
    },
    "titles": {
      "create": "Create Post",
      "edit": "Edit Post",
      "list": "Posts",
      "show": "Show Post"
    }
  },
  "table": {
    "actions": "Actions"
  }
}
```

</details>

</TabItem>
<TabItem value="de">

<details>
<summary>Show translation file</summary>

```json title="/locales/de/common.json"
{
  "pages": {
    "login": {
      "title": "Melden Sie sich bei Ihrem Konto an",
      "signin": "Einloggen",
      "signup": "Anmelden",
      "divider": "oder",
      "fields": {
        "email": "Email",
        "password": "Passwort"
      },
      "errors": {
        "validEmail": "Ungültige E-Mail-Adresse"
      },
      "buttons": {
        "submit": "Anmeldung",
        "forgotPassword": "Passwort vergessen?",
        "noAccount": "Sie haben kein Konto?",
        "rememberMe": "Erinnere dich an mich"
      }
    },
    "forgotPassword": {
      "title": "Haben Sie Ihr Passwort vergessen?",
      "fields": {
        "email": "Email"
      },
      "errors": {
        "validEmail": "Ungültige E-Mail-Adresse"
      },
      "buttons": {
        "submit": "Anweisungen zum Zurücksetzen senden"
      }
    },
    "register": {
      "title": "Registrieren Sie sich für Ihr Konto",
      "fields": {
        "email": "Email",
        "password": "Passwort"
      },
      "errors": {
        "validEmail": "Ungültige E-Mail-Adresse"
      },
      "buttons": {
        "submit": "Registrieren",
        "haveAccount": "Ein Konto haben?"
      }
    },
    "updatePassword": {
      "title": "Kennwort aktualisieren",
      "fields": {
        "password": "Neues Passwort",
        "confirmPassword": "Bestätige neues Passwort"
      },
      "errors": {
        "confirmPasswordNotMatch": "Passwörter stimmen nicht überein"
      },
      "buttons": {
        "submit": "Aktualisieren"
      }
    },
    "error": {
      "info": "Sie haben vergessen, {{action}} component zu {{resource}} hinzufügen.",
      "404": "Leider existiert diese Seite nicht.",
      "resource404": "Haben Sie die {{resource}} resource erstellt?",
      "backHome": "Zurück"
    }
  },
  "actions": {
    "list": "Aufführen",
    "create": "Erstellen",
    "edit": "Bearbeiten",
    "show": "Zeigen"
  },
  "buttons": {
    "create": "Erstellen",
    "save": "Speichern",
    "logout": "Abmelden",
    "delete": "Löschen",
    "edit": "Bearbeiten",
    "cancel": "Abbrechen",
    "confirm": "Sicher?",
    "filter": "Filter",
    "clear": "Löschen",
    "refresh": "Erneuern",
    "show": "Zeigen",
    "undo": "Undo",
    "import": "Importieren",
    "clone": "Klon",
    "notAccessTitle": "Sie haben keine zugriffsberechtigung"
  },
  "warnWhenUnsavedChanges": "Nicht gespeicherte Änderungen werden nicht übernommen.",
  "notifications": {
    "success": "Erfolg",
    "error": "Fehler (status code: {{statusCode}})",
    "undoable": "Sie haben {{seconds}} Sekunden Zeit für Undo.",
    "createSuccess": "{{resource}} erfolgreich erstellt.",
    "createError": "Fehler beim Erstellen {{resource}} (status code: {{statusCode}})",
    "deleteSuccess": "{{resource}} erfolgreich gelöscht.",
    "deleteError": "Fehler beim Löschen {{resource}} (status code: {{statusCode}})",
    "editSuccess": "{{resource}} erfolgreich bearbeitet.",
    "editError": "Fehler beim Bearbeiten {{resource}} (status code: {{statusCode}})",
    "importProgress": "{{processed}}/{{total}} importiert"
  },
  "loading": "Wird geladen",
  "tags": {
    "clone": "Klon"
  },
  "dashboard": {
    "title": "Dashboard"
  },
  "posts": {
    "posts": "Einträge",
    "fields": {
      "id": "Id",
      "title": "Titel",
      "category": "Kategorie",
      "status": {
        "title": "Status",
        "published": "Veröffentlicht",
        "draft": "Draft",
        "rejected": "Abgelehnt"
      },
      "content": "Inhalh",
      "createdAt": "Erstellt am"
    },
    "titles": {
      "create": "Erstellen",
      "edit": "Bearbeiten",
      "list": "Einträge",
      "show": "Eintrag zeigen"
    }
  },
  "table": {
    "actions": "Aktionen"
  }
}
```

</details>

</TabItem>
</Tabs>

:::tip
We can override refine's default texts by changing the `common.json` files in the example above.
:::

### Changing The Locale

Next, we will create a `<Header>` component. This component will allow us to change the language.

```tsx title="src/components/header.tsx"
import { useGetLocale, useSetLocale } from "@pankod/refine-core";
import {
  AntdLayout,
  Space,
  Menu,
  Button,
  Icons,
  Dropdown,
  Avatar,
} from "@pankod/refine-antd";
import { useTranslation } from "react-i18next";

const { DownOutlined } = Icons;

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();

  const currentLocale = locale();

  const menu = (
    <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
      {[...(i18n.languages || [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          onClick={() => changeLanguage(lang)}
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
    <AntdLayout.Header
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
    </AntdLayout.Header>
  );
};
```

<br/>

Then, we will pass `<Header>` to the `<Refine>` component as a property.

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import "./i18n";

import { PostList } from "pages/posts";

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
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      i18nProvider={i18nProvider}
      // highlight-next-line
      Header={Header}
      resources={[{ name: "posts", list: PostList }]}
    />
  );
};
```

<br />

Finally, we will create the `<PostList>` page and then we will translate texts using `useTranslate`.

```tsx title="src/App.tsx"
import {
  // highlight-next-line
  useTranslate,
  useMany,
} from "@pankod/refine-core";
import {
  List,
  Table,
  TextField,
  useTable,
  Space,
  EditButton,
  ShowButton,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
  // highlight-next-line
  const translate = useTranslate();
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

<br/>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/i18n/changing-language.avif" alt="Language change action" />

## Methods

### translate

`translate` takes parameters and passes them to the provided `i18nProvider` and expects a string as a return value.

It has two [function signatures](https://developer.mozilla.org/en-US/docs/Glossary/Signature/Function) with different parameters, which is known as function overloading.

```ts
function translate(key: string, options?: any, defaultMessage?: string): string;
function translate(key: string, defaultMessage?: string): string;
```

It means that you can use it in two different ways. The first one is to pass the `key`, `options`, and, `defaultMessage` as parameters. The second one is to pass the `key` and `defaultMessage` parameters. The `options` parameter is optional.

- Example of the `key` and `defaultMessage` function signature

```tsx
import { I18nProvider } from "@pankod/refine-core";
import { useTranslation } from "react-i18next";

// ...

const { t } = useTranslation();

const i18nProvider: I18nProvider = {
  translate: (key: string, defaultMessage?: string) => t(key, defaultMessage),
  // ...
};

// ...
```

```tsx
import { useTranslate } from "@pankod/refine-core";

// ...

const translate = useTranslate();

// ...

translate("posts.fields.title", "Title");

// ...
```

- Example of the `key`, `options` and, `defaultMessage` function signature

```tsx
import { I18nProvider } from "@pankod/refine-core";
import { useTranslation } from "react-i18next";

// ...

const { t } = useTranslation();

const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) =>
    t(key, defaultMessage, options),
  // ...
};

// ...
```

```tsx
import { useTranslate } from "@pankod/refine-core";

// ...

const translate = useTranslate();

// ...

const title = translate("posts.fields.title", { ns: "resources" }, "Title");

// ...
```

You can use the [`useTranslate`][use-translate] hook to call `translate` method.

### changeLocale

`translate` takes parameters and passes them to the provided `i18nProvider` and expects a Promise as a return value.

```ts
changeLocale: (locale: string, options?: any) => Promise<any>;
```

You can use the [`useSetLocale`][use-setlocale] hook to call `changeLocale` method.

### getLocale

`getLocale` expects a string as a return value. It should return the current locale from your `i18nProvider`.

```ts
getLocale: () => string;
```

You can use the [`useGetLocale`][use-getlocale] hook to call `getLocale` method.

## Example

<CodeSandboxExample path="i18n-react" />

[i18nnextjs]: /core/docs/examples/i18n/i18n-nextjs
[react-i18next]: https://react.i18next.com/
[create-refine-app]: /core/docs/3.xx.xx/getting-started/quickstart/
[use-translate]: /core/docs/3.xx.xx/api-reference/core/hooks/translate/useTranslate/
[use-getlocale]: /core/docs/3.xx.xx/api-reference/core/hooks/translate/useGetLocale/
[use-setlocale]: /core/docs/3.xx.xx/api-reference/core/hooks/translate/useSetLocale/
