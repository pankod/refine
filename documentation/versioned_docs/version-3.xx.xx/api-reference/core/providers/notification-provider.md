---
id: notification-provider
title: Notification Provider
---

**refine** let's you set a notification API by providing the `notificationProvider` property to the `<Refine>` component.

`notificationProvider` is an object with close and open methods. **refine** uses these methods to show and hide notifications. These methods can be called from anywhere in the application with [`useNotification`](/core/docs/3.xx.xx/api-reference/core/hooks/useNotification/) hook.

An `notificationProvider` must include following methods:

```tsx
const notificationProvider = {
  show: () => {},
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

To use `notificationProvider` in refine, we have to pass the notificationProvider to the `<Refine>` component.

```tsx
import { Refine, NotificationProvider } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

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
      notificationProvider={useNotificationProvider}
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    />
  );
};
```

By default, **refine** doesn't require `notificationProvider` configuration.

If an `notificationProvider` property is not provided, **refine** will use the default `notificationProvider`. This default `notificationProvider` lets the app work without an notification.
If your app doesn't require `notification`, no further setup is necessary for the app to work.

## Built-in Notification Providers

If you're looking for a complete notification infrastructure, **refine** has out-of-the-box support for the libraries below:

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design', value: 'antd'},
{label: 'Material UI', value: 'mui'},
{label: 'Mantine', value: 'mantine'},
{label: 'Chakra UI', value: 'chakra'},
{label: 'Custom', value: 'custom'},
]}>

  <TabItem value="custom">

Create a custom notification provider by following the [guide](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/#creating-an-notificationprovider).

  </TabItem>

  <TabItem value="antd">

```tsx
import { notificationProvider } from "@pankod/refine-antd";

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
} from "@pankod/refine-mui";

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
import {
  useNotificationProvider,
  NotificationsProvider,
} from "@pankod/refine-mantine";

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
import { notificationProvider } from "@pankod/refine-chakra";

return (
  <Refine
    //...
    notificationProvider={notificationProvider()}
  />
);
```

  </TabItem>
</Tabs>

## Creating an `notificationProvider`

We will build a simple `notificationProvider` from scratch to show the logic of how `notificationProvider` methods interact with the app. For this, we will use the [`react-toastify`](https://github.com/fkhadra/react-toastify) package, which is very **popular** in the **React Ecosystem**. If you want to use another notification library, you can use the same approach.

Before we start, we need set up the `react-toastify` requirements.

```tsx
import { Refine } from "@pankod/refine-core";

//highlight-start
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//highlight-end

const App: React.FC = () => {
    return (
        <Refine
            ...
            //highlight-start
            Layout={({ children }) => (
                <div>
                    {children}
                    <ToastContainer />
                </div>
            )}
            //highlight-end
        />
    );
};

export default App;

```

### `open`

**refine** calls this method when it wants to open a notification. It also helps you to get the right notification by sending some parameters to the **refine** open method. For example, `message`, `description`, etc...

Here we open a **notification** with [`react-toastify`](https://github.com/fkhadra/react-toastify).

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

In case the notification is called repeatedly with the same `key`, let's update the previous notification instead of creating a new one.

`toast.isActive(key)` returns `true` if the notification is still active. So we can check if the notification is already active and update it instead of creating a new one.

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

Now, let's create a custom notification when the mutation mode is `undoable`. In this case, **refine** sends notification's type as `progress` as well as the `cancelMutation` and `undoableTimeout`.

`undoableTimeout` decreases by 1 every second until it reaches 0. When it reaches 0, the notification is closed. `open` method is called again with the same `key` each countdown. So, the notification should be updated with the new `undoableTimeout` value.

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

> **Note**: We add `closeButton` and `autoClose` for progress notifications are not closable by default. Because, when progress is done, the progress notification to be updated should be closeable.

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

</p>
</details>

:::tip
`open` method will be accessible via [`useNotification`](/core/docs/3.xx.xx/api-reference/core/hooks/useNotification/) hook.

```tsx
import { useNotification } from "@pankod/refine-core";

const { open } = useNotification();

open?.({
  type: "success",
  message: "Hey",
  description: "I <3 Refine",
  key: "unique-id",
});
```

:::

### `close`

**refine** calls this method when it wants to close a notification. **refine** pass the `key` of the notification to the `close` method. So, we can handle the notification close logic with this `key`.

```tsx
import { toast } from "react-toastify";

const notificationProvider: NotificationProvider = {
  //...
  close: (key) => toast.dismiss(key),
};
```

:::tip
`close` method will be accessible via [`useNotification`](/core/docs/3.xx.xx/api-reference/core/hooks/useNotification/) hook.

```tsx
import { useNotification } from "@pankod/refine-core";

const { close } = useNotification();

close?.("displayed-notification-key");
```

:::

## Example

<CodeSandboxExample path="with-react-toastify" />
