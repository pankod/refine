---
title: Notifications
---

import { Sandpack, AddNotificationProviderToApp } from "./sandpack.tsx";

<Sandpack>

In this step, we will explore integrating Ant Design's notification system with Refine to deliver notifications to users.

Refine triggers notification in various scenarios, such as when a record is created, updated, or deleted, when there is an error from your data provider or your auth provider. It's important to provide feedback to the user when interacting with the application.

All these notifications are enabled just by providing a `notificationProvider` prop to the `<Refine />` component. A notification provider is responsible from displaying and dismissing notifications as well as handling undoable mutation notifications.

Ant Design provides a notification system that can be used to handle these notifications by using the `useNotificationProvider` export of the `@refinedev/antd` package.

## Adding Notification Provider

To add the notification provider to our application, we need to import the `useNotificationProvider` and pass it to the `notificationProvider` prop of the `<Refine />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
// highlight-next-line
import {
  ThemedLayout,
  ThemedTitle,
  useNotificationProvider,
} from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            // highlight-next-line
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
            ]}
          >
            <Routes>{/* ... */}</Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddNotificationProviderToApp />

Now we're set with the notification provider. You can now create, update, and delete records to see the notifications in action.

In the next step, we'll learn about the `<AuthPage />` components and how to use them to create login pages.

</Sandpack>
