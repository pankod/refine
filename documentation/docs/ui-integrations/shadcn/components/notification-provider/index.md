---
title: "shadcn/ui Notification Provider Component | Notifications in Refine v5"
display_title: "Notification Provider"
sidebar_label: "Notification Provider"
description: "Integrate Notification Provider in Refine v5. Learn best practices. Explore customization options for notifications for polished admin UIs."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/notification/use-notification-provider.tsx
---

Admin dashboards need to show feedback when users perform actions - whether it's successfully saving data, handling errors, or allowing users to undo operations. The notification provider gives you a complete toast notification system that integrates seamlessly with Refine's data operations.

Built on [Sonner](https://ui.shadcn.com/docs/components/sonner), it automatically handles notifications for CRUD operations and supports undoable actions where users can reverse operations like deletions.

## Installation

Add the notification system to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
```

This installs the notification provider with the `sonner` toast library.

## Setup

Configure the notification provider in your app root:

```tsx
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { Toaster } from "@/components/refine-ui/notification/toaster";

function App() {
  return (
    <>
      <Refine
        notificationProvider={useNotificationProvider}
        // ... other props
      >
        {/* Your app content */}
      </Refine>
      <Toaster />
    </>
  );
}
```

That's it! Refine will now automatically show notifications when users create, update, or delete data. You'll see success messages when operations complete and error messages when something goes wrong.

## Manual Notifications

You can also trigger notifications manually in your components:

```tsx
import { useNotification } from "@refinedev/core";

export function MyComponent() {
  const { open } = useNotification();

  const handleCustomAction = () => {
    // Show success notification
    open?.({
      type: "success",
      message: "Profile updated",
      description: "Your profile changes have been saved successfully",
    });
  };

  const handleError = () => {
    // Show error notification
    open?.({
      type: "error",
      message: "Upload failed",
      description: "The file could not be uploaded. Please try again.",
    });
  };

  return (
    <div>
      <button onClick={handleCustomAction}>Update Profile</button>
      <button onClick={handleError}>Simulate Error</button>
    </div>
  );
}
```

## Undoable Actions

For destructive actions like deletions, you can show notifications that allow users to undo the operation:

```tsx
const handleDelete = (id: string) => {
  open?.({
    type: "progress",
    message: "Post deleted",
    description: "The post has been moved to trash",
    undoableTimeout: 5, // Show undo button for 5 seconds
    cancelMutation: () => {
      // This runs if user clicks undo
      console.log("Restoring post...");
    },
  });
};
```

This is particularly useful for delete operations where you want to give users a chance to recover their data.

## API Reference

### useNotificationProvider

Returns notification functions for the Refine context.

### Toaster

The toast container component that displays notifications.

| Prop       | Type                            | Description                                         |
| ---------- | ------------------------------- | --------------------------------------------------- |
| `position` | `ToasterPosition`               | Position of toasts on screen (default: "top-right") |
| `theme`    | `"light" \| "dark" \| "system"` | Theme for toast styling                             |

### Notification Options

| Prop              | Type                                 | Description                                      |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| `type`            | `"success" \| "error" \| "progress"` | Type of notification                             |
| `message`         | `string`                             | Main notification message                        |
| `description`     | `string`                             | Additional details                               |
| `undoableTimeout` | `number`                             | Seconds to show undo button (progress type only) |
| `cancelMutation`  | `() => void`                         | Function to call when undo is clicked            |
