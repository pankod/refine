---
title: "shadcn/ui Delete Button Component | Security & Actions in Refine v5"
display_title: "Delete"
sidebar_label: "Delete"
description: "Set up Delete Button in Refine v5. Learn best practices. Learn integrate Radix UI, Tailwind CSS for polished admin UIs. Hands-on examples included."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/buttons/delete.tsx
---

`<DeleteButton>` uses shadcn/ui's [`<Button>`](https://ui.shadcn.com/docs/components/button) and [`<Popover>`](https://ui.shadcn.com/docs/components/popover) components.

When you try to delete something, a popover shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/data/hooks/use-delete/) method provided by your [`dataProvider`](/core/docs/data/data-provider/).

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
```

This will add all button components including `DeleteButton`.

## Usage

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const PostList = () => {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];

  return (
    <Table>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>
              <DeleteButton resource="posts" recordItemId={post.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

## Properties

### recordItemId

`recordItemId` allows us to manage which record will be deleted. By default, the `recordItemId` is inferred from the route params.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton resource="posts" recordItemId="123" />;
};
```

### resource

`resource` is used to determine which resource the record belongs to. By default, the resource is inferred from the current route.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton resource="categories" recordItemId="123" />;
};
```

### onSuccess

`onSuccess` callback allows you to do something after the deletion is successful.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return (
    <DeleteButton
      recordItemId="123"
      onSuccess={(value) => {
        console.log("Record deleted successfully", value);
      }}
    />
  );
};
```

### confirmTitle

You can change the confirmation dialog title with the `confirmTitle` prop.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton recordItemId="123" confirmTitle="Delete this post?" />;
};
```

### confirmOkText

You can change the confirmation dialog's "Delete" button text with the `confirmOkText` prop.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton recordItemId="123" confirmOkText="Yes, delete it" />;
};
```

### confirmCancelText

You can change the confirmation dialog's "Cancel" button text with the `confirmCancelText` prop.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton recordItemId="123" confirmCancelText="No, keep it" />;
};
```

### meta

It is used to pass additional parameters to the `delete` method of your [`dataProvider`](/core/docs/data/data-provider/).

```tsx
const MyComponent = () => {
  return <DeleteButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton recordItemId="123" hideText={true} />;
};
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/).

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return (
    <DeleteButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### successNotification

You can customize or disable the success notification that appears after successful deletion.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return (
    <DeleteButton
      recordItemId="123"
      successNotification={{
        message: "Post deleted successfully!",
        description: "The post has been removed from your blog.",
        type: "success",
      }}
    />
  );
};
```

Set to `false` to disable:

```tsx
<DeleteButton recordItemId="123" successNotification={false} />
```

### errorNotification

You can customize or disable the error notification that appears when deletion fails.

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return (
    <DeleteButton
      recordItemId="123"
      errorNotification={{
        message: "Failed to delete post",
        description: "Please try again later.",
        type: "error",
      }}
    />
  );
};
```

Set to `false` to disable:

```tsx
<DeleteButton recordItemId="123" errorNotification={false} />
```

### children

It is used to change the text of the button. By default, the text is "Delete".

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

const MyComponent = () => {
  return <DeleteButton recordItemId="123">Remove</DeleteButton>;
};
```

## API Reference

### Properties

| Property              | Type                                                  | Default                                        | Description                                                                                                             |
| --------------------- | ----------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `recordItemId`        | `BaseKey` (string or number)                          | Inferred from route params                     | The ID of the record to delete                                                                                          |
| `resource`            | `string`                                              | Inferred from route                            | The resource name or identifier                                                                                         |
| `onSuccess`           | `(value: any) => void`                                | -                                              | Callback function invoked after successful deletion                                                                     |
| `confirmTitle`        | `string`                                              | "Are you sure?"                                | Title for the confirmation popover                                                                                      |
| `confirmOkText`       | `string`                                              | "Delete"                                       | Text for the confirm button in the popover                                                                              |
| `confirmCancelText`   | `string`                                              | "Cancel"                                       | Text for the cancel button in the popover                                                                               |
| `successNotification` | `string \| false \| object`                           | Default message                                | Notification message on successful deletion. Set to `false` to disable                                                  |
| `errorNotification`   | `string \| false \| object`                           | Default message                                | Notification message on error. Set to `false` to disable                                                                |
| `meta`                | `Record<string, unknown>`                             | -                                              | Additional metadata to pass to the `delete` method                                                                      |
| `hideText`            | `boolean`                                             | `false`                                        | If true, only the icon will be shown                                                                                    |
| `accessControl`       | `{ enabled?: boolean; hideIfUnauthorized?: boolean }` | `{ enabled: true, hideIfUnauthorized: false }` | Configures access control behavior                                                                                      |
| `children`            | `ReactNode`                                           | Default text & icon                            | Custom content for the button                                                                                           |
| `...rest`             | `React.ComponentProps<typeof Button>`                 | -                                              | Other props are passed to the underlying shadcn/ui `Button` component (e.g., `variant`, `size`, `className`, `onClick`) |

:::info External Props
It also accepts all props of shadcn/ui [Button](https://ui.shadcn.com/docs/components/button).
:::
