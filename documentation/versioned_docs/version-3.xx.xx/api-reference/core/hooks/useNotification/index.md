---
title: useNotification
siderbar_label: useNotification
source: https://github.com/refinedev/refine/blob/v3/packages/core/src/hooks/notification/useNotification/index.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BasicUsageLivePreview from "./basic-usage-live-preview.md";

It can be used to `open` or `close` notification at any time. It returns the `open` and `close` method from [`notificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) under the hood.

## Basic Usage

Here is a basic example of how to use `useNotification` hook.

```tsx
const { open, close } = useNotification();

// open notification
open?.({
  type: "success",
  message: "Success",
  description: "This is a success message",
});

// close notification
close?.("notification-key");
```

## Properties

### `open`

You can call this method to open a new notification box.

```tsx
const { open } = useNotification();

open?.({
  type: "success",
  message: "Success",
  description: "This is a success message",
});
```

> [Refer to the `Open Notification Params` interface for more information →](/core/docs/3.xx.xx/api-reference/core/interfaceReferences/#open-notification-params)

### `close`

You can close a notification with a `key`.

```tsx
const { close } = useNotification();

close?.("notification-key");
```

> [Refer to the `Close Notification Params` interface for more information →](/core/docs/3.xx.xx/api-reference/core/interfaceReferences/#close-notification-params)

:::info
You must pass a `key` to the `open` method. This key is used to close the notification.
:::

## FAQ

### How to use a undoable notification?

It should be `type=progress` to show undoable notifications. A function can then be triggered.

```tsx
const { open } = useNotification();

open?.({
  type: "progress",
  message: "Progress",
  undoableTimeout: 5,
  cancelMutation: () => {
    // when undo button is clicked run this callback
  },
});
```

## API Reference

### Return Values

| Property | Description               | Type                                                                                                                |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| open     | Open Notification Params  | [`Open Notification Params`](/core/docs/3.xx.xx/api-reference/core/interfaceReferences/#open-notification-params)   |
| close    | Close Notification Params | [`Close Notification Params`](/core/docs/3.xx.xx/api-reference/core/interfaceReferences/#close-notification-params) |
