---
id: migration-guide
title: Migration Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

## 2.0.XX to 3.0.XX

### Motivation behind breaking changes

One of the big requests we received from the Community after we released the first version of **refine** was that **refine** could be used with different UI frameworks other than Ant Design.
We are happy to announce that you can use it as **refine** `Headless` on top of these requests. Now **refine** is a framework and works in harmony with the any UI framework you choose. At the same time, all projects made with Refine@2 are also Refine@3 compatible.

With **refine** 3.x.x **headless** version, we have released two new packages named `@pankod/refine-core` and `@pankod/refine-antd`. The `refine-core` package includes UI independent hooks and components. The `refine-antd` package includes Ant Design components and there are table, form, select, etc hooks and components compatible with `@pankod/refine-core`.

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

[`@pankod/refine-codemod`][refine-codemod] package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `2.x.x` to `3.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @pankod/refine-codemod refine2-to-refine3
```

And it's done. Now your project uses `refine@3.x.x`.

## Migrating your project manually

### Updating the packages

Packages used by your app must be updated to `^3.xx.xx`

@pankod/refine has been deprecated with **refine** 3.x.x version. You must now use `@pankod/refine-core` and `@pankod/refine-antd`.

```bash
npm uninstall @pankod/refine

npm i @pankod/refine-core @pankod/refine-antd
```

export const Packages = () => {
const packages = [
"@pankod/refine-airtable",
"@pankod/refine-graphql",
"@pankod/refine-hasura",
"@pankod/refine-nestjsx-crud",
"@pankod/refine-nextjs-router",
"@pankod/refine-react-router",
"@pankod/refine-simple-rest",
"@pankod/refine-strapi",
"@pankod/refine-strapi-v4",
"@pankod/refine-strapi-graphql",
"@pankod/refine-supabase",
"@pankod/refine-appwrite",
"@pankod/refine-ably",
]
return (
<Tabs
defaultValue="@pankod/refine-airtable"
values={packages.map(p => ({
label: p, value: p
}))} >{
packages.map(p =>
<TabItem value={p}>
<CodeBlock className="language-bash">{`npm i ${p}@latest`}</CodeBlock>
</TabItem>
)
}
</Tabs>
)
}

<Packages/>

:::danger
Make sure your using packages are version of 3.x.x otherwise you may get errors.
:::

### Change Import

UI independent import packages have been migrated to the `refine-core` package with version **refine** 3.x.x.

<details>
<summary>Show All Core Imports</summary>
<p>

```tsx
[
  "Authenticated",
  "AuthenticatedProps",
  "CanAccess",
  "CanAccessProps",
  "Refine",
  "RefineProps",
  "LayoutWrapperProps",
  "LayoutWrapper",
  "LayoutProps",
  "DefaultLayout",
  "RouteChangeHandler",
  "UndoableQueue",
  "defaultAccessControlContext",
  "AccessControlContext",
  "AccessControlContextProvider",
  "CanParams",
  "CanReturnType",
  "IAccessControlContext",
  "TLogoutVariables",
  "TLogoutData",
  "IAuthContext",
  "Pagination",
  "Search",
  "CrudOperators",
  "CrudFilter",
  "CrudSort",
  "CrudFilters",
  "CrudSorting",
  "CustomResponse",
  "GetListResponse",
  "CreateResponse",
  "CreateManyResponse",
  "UpdateResponse",
  "UpdateManyResponse",
  "GetOneResponse",
  "GetManyResponse",
  "DeleteOneResponse",
  "DeleteManyResponse",
  "IDataContext",
  "IDataContextProvider",
  "defaultDataProvider",
  "DataContext",
  "DataContextProvider",
  "ILiveContext",
  "ILiveContextProvider",
  "LiveContext",
  "LiveContextProvider",
  "defaultNotificationProvider",
  "NotificationContext",
  "NotificationContextProvider",
  "RefineContext",
  "RefineContextProvider",
  "ResourceContext",
  "ResourceContextProvider",
  "IResourceContext",
  "OptionsProps",
  "ResourceProps",
  "IResourceComponentsProps",
  "IResourceComponents",
  "IResourceItem",
  "RouterContext",
  "RouterContextProvider",
  "IRouterProvider",
  "IRouterContext",
  "PromptProps",
  "TranslationContext",
  "TranslationContextProvider",
  "Translate",
  "I18nProvider",
  "ITranslationContext",
  "UnsavedWarnContext",
  "UnsavedWarnContextProvider",
  "IUnsavedWarnContext",
  "importCSVMapper",
  "userFriendlyResourceName",
  "userFriendlySecond",
  "parseTableParams",
  "parseTableParamsFromQuery",
  "stringifyTableParams",
  "compareFilters",
  "unionFilters",
  "setInitialFilters",
  "file2Base64",
  "UseCanProps",
  "useCan",
  "useCanWithoutCache",
  "useAuthenticated",
  "useCheckError",
  "useGetIdentity",
  "useIsAuthenticated",
  "UseLoginReturnType",
  "useLogin",
  "useLogout",
  "usePermissions",
  "useIsExistAuthentication",
  "unionFilters",
  "useApiUrl",
  "UseCreateReturnType",
  "useCreate",
  "UseCreateManyReturnType",
  "useCreateMany",
  "UseCustomProps",
  "useCustom",
  "useDelete",
  "useDeleteMany",
  "UseListProps",
  "useList",
  "UseManyProps",
  "useMany",
  "UseOneProps",
  "useOne",
  "UseUpdateReturnType",
  "useUpdate",
  "useUpdateMany",
  "CSVDownloadProps",
  "LabelKeyObject",
  "useExport",
  "Authenticated",
  "CanAccess",
  "LayoutWrapper",
  "Refine",
  "RouteChangeHandler",
  "UndoableQueue",
  "file2Base64",
  "importCSVMapper",
  "parseTableParams",
  "parseTableParamsFromQuery",
  "setInitialFilters",
  "stringifyTableParams",
  "unionFilters",
  "useApiUrl",
  "useAuthenticated",
  "useCacheQueries",
  "useCan",
  "useCanWithoutCache",
  "useCancelNotification",
  "useCheckError",
  "useCreate",
  "useCreateMany",
  "useCustom",
  "useDelete",
  "useDeleteMany",
  "useExport",
  "useGetIdentity",
  "useGetLocale",
  "useGetManyQueries",
  "useGetOneQueries",
  "useHandleNotification",
  "useIsAuthenticated",
  "useIsExistAuthentication",
  "useList",
  "useListResourceQueries",
  "useLiveMode",
  "useLogin",
  "useLogout",
  "useMany",
  "useMutationMode",
  "useNavigation",
  "useNotification",
  "useOne",
  "usePermissions",
  "usePublish",
  "useRedirectionAfterSubmission",
  "useRefineContext",
  "useResource",
  "useResourceSubscription",
  "useResourceWithRoute",
  "useRouterContext",
  "useSetLocale",
  "useShow",
  "useSubscription",
  "useSyncWithLocation",
  "useTitle",
  "useTranslate",
  "useUpdate",
  "useUpdateMany",
  "useWarnAboutChange",
  "userFriendlyResourceName",
  "AuthenticatedProps",
  "CanAccessProps",
  "RefineProps",
  "LayoutWrapperProps",
  "LiveModeProps",
  "UseResourceSubscriptionProps",
  "PublishType",
  "UseSubscriptionProps",
  "LiveEvent",
  "HistoryType",
  "UseRedirectionAfterSubmissionType",
  "UseWarnAboutChangeType",
  "UseMutationModeType",
  "useRefineContext",
  "UseSyncWithLocationType",
  "TitleProps",
  "UseResourceType",
  "useResourceWithRoute",
  "useShowReturnType",
  "useShowProps",
  "UseGetLocaleType",
  "Fields",
  "NestedField",
  "QueryBuilderOptions",
  "MetaDataQuery",
  "VariableOptions",
  "HttpError",
  "BaseRecord",
  "Option",
  "MapDataFn",
  "MutationMode",
  "IUndoableQueue",
  "RedirectionTypes",
  "ResourceErrorRouterParams",
  "ResourceRouterParams",
  "SuccessErrorNotification",
  "OpenNotificationParams",
  "AuthProvider",
];
```

</p>
</details>

All of the imports defined above must now be imported from `@pankod/refine-core`. UI related imports and other imports are now in `@pankod/refine-antd`.

```diff title="App.tsx"
- import { Refine } from "@pankod/refine";
+ import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-json-server";

- import "@pankod/refine/dist/styles.min.css";
+ import "@pankod/refine-antd/dist/reset.css"

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        />
    );
};
```

<details>
<summary>List Page Example</summary>
<p>

```diff title="PostList.tsx"
- import {
-    IResourceComponentsProps,
-    useMany,
-    List,
-    TextField,
-    TagField,
-    DateField,
-    Table,
-    useTable,
-    Space,
-    EditButton,
-    ShowButton,
-    FilterDropdown,
-    Select,
-    useSelect,
-    DeleteButton,
- } from "@pankod/refine"

+ import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

+ import {
+    List,
+    TextField,
+    TagField,
+    DateField,
+    Table,
+    useTable,
+    Space,
+    EditButton,
+    ShowButton,
+    FilterDropdown,
+    Select,
+    useSelect,
+    DeleteButton,
+} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => {
                        return (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};

```

</p>
</details>

### `notificationProvider`

With **refine** 3.x.x, you can include and use different notification libraries in your project. The use of `notificationProvider` with Ant Design should be as below.

```tsx
import { Refine } from "@pankod/refine-core";
//highlight-start
import { notificationProvider } from "@pankod/refine-antd";
//highlight-end
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostEdit, PostCreate, PostShow } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
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
          canDelete: true,
        },
      ]}
      //highlight-start
      notificationProvider={useNotificationProvider}
      //highlight-end
    />
  );
};
```

### `Layout` and `ErrorComponent`

If you are using the default `layout` of **refine**, you need to import and define it from the `refine-antd` package as in the example below.

```tsx
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  useNotificationProvider,
  //highlight-start
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
//highlight-end
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      authProvider={authProvider}
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
      //highlight-start
      Layout={Layout}
      catchAll={<ErrorComponent />}
      //highlight-end
    />
  );
};
```

### Default `LoginPage`

If you are using **refine**'s default login page while using AuthProvider, you must now import and define `LoginPage` from `@pankod/refine-antd`.

```tsx
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  useNotificationProvider,
  //highlight-next-line
  LoginPage,
  Layout,
  ErrorComponent,
  //highlight-next-line
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostEdit, PostShow } from "pages/posts";
import { DashboardPage } from "pages/dashboard";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      authProvider={authProvider}
      dataProvider={dataProvider(API_URL)}
      routerProvider={routerProvider}
      DashboardPage={DashboardPage}
      resources={[
        {
          name: "posts",
          list: PostList,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
      notificationProvider={useNotificationProvider}
      //highlight-next-line
      LoginPage={LoginPage}
      Layout={Layout}
      catchAll={<ErrorComponent />}
    />
  );
};

export default App;
```

### `configProviderProps` to `ConfigProvider`

configProviderProps has been deprecated. Instead we use `ConfigProvider` which is included in the `refine-antd` package. If you are using `ConfigProvider` you need to wrap `Refine` component as below.

```diff
import { Refine } from "@pankod/refine-core";
import {
    useNotificationProvider,
+   ConfigProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
+       <ConfigProvider direction={"rtl"}>
            <Refine
                dataProvider={dataProvider(API_URL)}
                routerProvider={routerProvider}
-               configProviderProps={{
-                   direction: "rtl",
-               }}
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
+       </ConfigProvider>
    );
};
```

### `setEditId` to `setId` & `editId` to `id`

Change the use `setEditId` and `editId` used in `useEditableTable`, `useModalForm`, and `useDrawerForm`.

- `setEditId` -> `setId`

- `editId` -> `id`

```diff title="PostList"
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    Form,
    Space,
    Button,
    SaveButton,
    EditButton,
    Input,
    TextField,
    useEditableTable,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableProps,
        formProps,
        isEditing,
-       setEditId,
+       setId,
-       editId,
+       id,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
    } = useEditableTable<IPost>();
};
```

[refine-codemod]: https://github.com/refinedev/refine/tree/v3/packages/codemod
[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[resources]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#resources
[routerprovider]: /core/docs/3.xx.xx/api-reference/core/providers/router-provider
[custompages]: /advanced-tutorials/custom-pages
