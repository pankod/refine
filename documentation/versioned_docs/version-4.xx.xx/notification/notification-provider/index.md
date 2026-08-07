---
title: "Notification Provider | Refine v4 Feedback System"
display_title: "Notification Provider"
sidebar_label: "Notification Provider"
description: "Set up custom notification providers in Refine v4. Integrate libraries like React Toastify or Ant Design Notifications for user feedback."
---

Refine let's you set a notification API by providing the `notificationProvider` property to the `<Refine>` component.

`notificationProvider` is an object with close and open methods. Refine uses these methods to show and hide notifications. These methods can be called from anywhere in the application with [`useNotification`](/core/docs/notification/hooks/use-notification) hook.

A `notificationProvider` must include following methods:

```tsx
const notificationProvider = {
  open: () => {},
  close: () => {},
};
```

And these methods types like this:

```tsx
interface NotificationProvider {
  open: (params: OpenNotificationParams) => void;
  close: (key: string) => void;
}

interface OpenNotificationParams {
  key?: string;
  message: string;
  type: "success" | "error" | "progress";
  description?: string;
  cancelMutation?: () => void;
  undoableTimeout?: number;
}
```

## Usage

To use `notificationProvider` in Refine, we have to pass the `notificationProvider` to the `<Refine>` component.

```tsx
import { Refine, NotificationProvider } from "@refinedev/core";

//highlight-start
const notificationProvider: NotificationProvider = {
  open: () => {},
  close: () => {},
};
//highlight-end

const App = () => {
  return (
    <Refine
      //highlight-next-line
      notificationProvider={notificationProvider}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

By default, Refine doesn't require `notificationProvider` configuration.

If a `notificationProvider` property is not provided, Refine will use the default `notificationProvider`, which lets the app work without a notification.
If your app doesn't require `notification`, no further setup is necessary for the app to work.

## Built-in Notification Providers

If you're looking for a complete notification infrastructure, Refine has out-of-the-box support for the libraries below:

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design', value: 'antd'},
{label: 'Material UI', value: 'mui'},
{label: 'Mantine', value: 'mantine'},
{label: 'Chakra UI', value: 'chakra'},
]}>

  <TabItem value="antd">

```tsx
import { useNotificationProvider } from "@refinedev/antd";

return (
  <Refine
    //...
    notificationProvider={useNotificationProvider}
  />
);
```

  </TabItem>

  <TabItem value="mui">

```tsx
import {
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

return (
  <RefineSnackbarProvider>
    <Refine
      //...
      notificationProvider={useNotificationProvider}
    />
  </RefineSnackbarProvider>
);
```

  </TabItem>

  <TabItem value="mantine">

```tsx
import { useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";

return (
  <NotificationsProvider position="top-right">
    <Refine
      //...
      notificationProvider={useNotificationProvider}
    />
  </NotificationsProvider>
);
```

  </TabItem>

  <TabItem value="chakra">

```tsx
import { useNotificationProvider } from "@refinedev/chakra-ui";

return (
  <Refine
    //...
    notificationProvider={useNotificationProvider()}
  />
);
```

  </TabItem>
</Tabs>

## Creating a `notificationProvider` from scratch

We will now build a simple `notificationProvider` from scratch to show the logic of how `notificationProvider` methods interact with the app. For this, we will use the [`react-toastify`](https://github.com/fkhadra/react-toastify) package, which is very **popular** in the **React Ecosystem**. If you want to use another notification library, you can use the same approach.

Before we start, we need set up the `react-toastify` requirements.

```tsx
import { Refine } from "@refinedev/core";

//highlight-start
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//highlight-end

const App: React.FC = () => {
  return (
    <Refine
    /* ...*/
    >
      {/* ... */}
      {/* highlight-start */}
      <ToastContainer />
      {/* highlight-end */}
    </Refine>
  );
};

export default App;
```

### open

Refine calls this method when it wants to open a notification. It also helps you to get the right notification by sending some parameters to the Refine open method. For example, `message`, `description`, etc.

Here we open a notification with [`react-toastify`](https://github.com/fkhadra/react-toastify):

```tsx
import { toast } from "react-toastify";

const notificationProvider: NotificationProvider = {
  open: ({ message, key, type }) => {
    toast(message, {
      toastId: key,
      type,
    });
  },
};
```

Let's make it so that the previous notification is updated when the notification is called again with the same `key` instead of creating a new one each time. We can use `toast.isActive(key)` for this since it returns `true` if the notification is still active.

```tsx
import { toast } from "react-toastify";

const notificationProvider: NotificationProvider = {
  open: ({ message, key, type }) => {
    //highlight-start
    if (toast.isActive(key)) {
      toast.update(key, {
        render: message,
        type,
      });
    } else {
      //highlight-end
      toast(message, {
        toastId: key,
        type,
      });
    }
  },
};
```

Now, let's create a custom notification when the mutation mode is `undoable`. In this case, Refine sends the notification's type as `progress` as well as `cancelMutation` and `undoableTimeout`.

`undoableTimeout` decreases by 1 every second until it reaches 0, at which point the notification is closed. The `open` method is called again with the same`key` each countdown. So, the notification should be updated with the new`undoableTimeout` value.

```tsx
import { toast } from "react-toastify";

const notificationProvider: NotificationProvider = {
  open: ({ message, key, type }) => {
    //highlight-start
    if (type === "progress") {
      if (toast.isActive(key)) {
        toast.update(key, {
          progress: undoableTimeout && (undoableTimeout / 10) * 2,
          render: (
            <UndoableNotification
              message={message}
              cancelMutation={cancelMutation}
            />
          ),
          type: "default",
        });
      } else {
        toast(
          <UndoableNotification
            message={message}
            cancelMutation={cancelMutation}
          />,
          {
            toastId: key,
            updateId: key,
            closeOnClick: false,
            closeButton: false,
            autoClose: false,
            progress: undoableTimeout && (undoableTimeout / 10) * 2,
          },
        );
      }
    } else {
      //highlight-end
      if (toast.isActive(key)) {
        toast.update(key, {
          render: message,
          //highlight-start
          closeButton: true,
          autoClose: 5000,
          //highlight-end
          type,
        });
      } else {
        toast(message, {
          toastId: key,
          type,
        });
      }
    }
  },
};
```

<details><summary>See UndoableNotification Component</summary>
<p>

```tsx
type UndoableNotification = {
  message: string;
  cancelMutation?: () => void;
  closeToast?: () => void;
};

export const UndoableNotification: React.FC<UndoableNotification> = ({
  closeToast,
  cancelMutation,
  message,
}) => {
  return (
    <div>
      <p>{message}</p>
      <button
        onClick={() => {
          cancelMutation?.();
          closeToast?.();
        }}
      >
        Undo
      </button>
    </div>
  );
};
```

:::note

We add `closeButton` and `autoClose` for progress notifications, which are not closable by default to allow users to close them when the progress is done.

:::

</p>
</details>

The `open` method then will be accessible via [`useNotification`](/core/docs/notification/hooks/use-notification) hook.

```tsx
import { useNotification } from "@refinedev/core";

const { open } = useNotification();

open?.({
  type: "success",
  message: "Hey",
  description: "I <3 Refine",
  key: "unique-id",
});
```

### close

Refine calls this method when it wants to close a notification. Refine pass the `key` of the notification to the `close` method. So, we can handle the notification close logic with this `key`.

```tsx
import { toast } from "react-toastify";

const notificationProvider: NotificationProvider = {
  //...
  close: (key) => toast.dismiss(key),
};
```

`close` method then will be accessible via [`useNotification`](/core/docs/notification/hooks/use-notification) hook.

```tsx
import { useNotification } from "@refinedev/core";

const { close } = useNotification();

close?.("displayed-notification-key");
```

## Example

<CodeSandboxExample path="with-react-toastify" />
