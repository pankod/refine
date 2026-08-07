---
title: Notifications
---

import { Sandpack, AddNotificationProviderToApp } from "./sandpack.tsx";

<Sandpack>

Now we've refactored our application with Material UI, we only have one thing left to do: handle notifications.

Refine triggers notification in various scenarios, such as when a record is created, updated, or deleted, when there is an error from your data provider or your auth provider. It's important to provide feedback to the user when interacting with the application.

All these notifications are enabled just by providing a `notificationProvider` prop to the `<Refine />` component. A notification provider is responsible from displaying and dismissing notifications as well as handling undoable mutation notifications.

Material UI provides a `<Snackbar />` component that can be used to display notifications but lacks the built-in ability to manage notifications. To handle the management of notifications, it's recommended to use the `notistack` library, which provides a notification system that can be used to handle these notifications.

`@refinedev/mui` package provides the `<RefineSnackbarProvider />` and `useNotificationProvider` exports to handle notifications and uses `notistack` under the hood to display notifications. You won't be needing to install any separate package for notifications unless you want to provide a custom solution.

## Adding Notification Provider

To add the notification provider to our application, we need to import the `<RefineSnackbarProvider />` and `useNotificationProvider`. We'll wrap our `<Refine />` component with `<RefineSnackbarProvider />` and pass `useNotificationProvider` to the `notificationProvider` prop of the `<Refine />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import {
  RefineThemes,
  ThemedLayout,
  ThemedTitle,
  // highlight-start
  RefineSnackbarProvider,
  useNotificationProvider,
  // highlight-end
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        {/* highlight-next-line */}
        <RefineSnackbarProvider>
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
          {/* highlight-next-line */}
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

<AddNotificationProviderToApp />

Now we're set with the notification provider. You can now create, update, and delete records to see the notifications in action.

In the next step, we'll learn about the `<AuthPage />` components and how to use them to create login pages.

</Sandpack>
