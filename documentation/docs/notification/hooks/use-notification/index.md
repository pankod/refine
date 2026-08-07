---
title: "useNotification Hook | Best Practices for Notifications in Refine v5"
display_title: "useNotification"
sidebar_label: "useNotification"
description: "Explore how to use the useNotification hook in Refine v5. Explore best practices for open and undoable for real-world React admin panels."
source: https://github.com/refinedev/refine/blob/main/packages/core/src/hooks/notification/useNotification/index.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BasicUsageLivePreview from "./basic-usage-live-preview.md";

`useNotification` can be used to `open` or `close` notification at any time. It returns the `open` and `close` method from [`notificationProvider`](/core/docs/notification/notification-provider/) under the hood.

## Usage

Here is a basic example of how to use `useNotification` hook.

 <BasicUsageLivePreview/>

## Properties

### open

You can call this method to open a new notification box.

```tsx
const { open } = useNotification();

open?.({
  type: "success",
  message: "Success",
  description: "This is a success message",
});
```

> For more information, refer to the [`Open Notification Params` interface→](/core/docs/core/interface-references#open-notification-params)

### close

You can close a notification with a `key`.

```tsx
const { close } = useNotification();

close?.("notification-key");
```

You must pass a `key` to the `open` method. This key is used to close the notification.

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
    // when undo button is clicked, run this callback
  },
});
```

## API Reference

### Return Values

| Property | Description               | Type                                                                                        |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| open     | Open Notification Params  | [`Open Notification Params`](/core/docs/core/interface-references#open-notification-params) |
| close    | Close Notification Params | `(key: string) => void;`                                                                    |
