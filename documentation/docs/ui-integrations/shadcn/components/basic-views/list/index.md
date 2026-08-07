---
title: "shadcn/ui List Component | UI Component in Refine v5"
display_title: "List"
sidebar_label: "List"
description: "Implement List in Refine v5. Learn the key steps. Learn integrate Radix UI, Tailwind CSS for polished admin UIs. See practical code samples."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/views/list-view.tsx
---

`<ListView />` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

The `ListView` component is designed for displaying a list of records with automatic resource detection, breadcrumb navigation, and an optional create button.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

This will install all view components including `ListView`.

## Usage

```tsx
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostListPage() {
  const isLoading = false; // or true, based on your data fetching state
  const error = null; // or object, based on your data fetching state

  if (error) {
    return (
      <ListView>
        <ListViewHeader />
        {/* Error content */}
      </ListView>
    );
  }

  return (
    <ListView>
      <ListViewHeader />
      <LoadingOverlay loading={isLoading}>
        {/* Record content (e.g., DataTable) */}
      </LoadingOverlay>
    </ListView>
  );
}
```

## Features

- **Resource Integration**: Automatic resource detection and title generation
- **Breadcrumb Navigation**: Built-in breadcrumb component
- **Optional Create Button**: `CreateButton` (from `buttons` package) is displayed based on resource definition or `canCreate` prop

## API Reference

### ListView Properties

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

### ListViewHeader Properties

| Prop               | Type      | Default          | Description                                          |
| ------------------ | --------- | ---------------- | ---------------------------------------------------- |
| `resource`         | `string`  | Current resource | Override the resource name for title and actions     |
| `title`            | `string`  | Auto-generated   | Custom title for the header                          |
| `hideBreadcrumb`   | `boolean` | `false`          | Set to `true` to hide the breadcrumb                 |
| `wrapperClassName` | `string`  | -                | CSS classes for the header's main wrapper div        |
| `headerClassName`  | `string`  | -                | CSS classes for the div containing title and actions |
| `canCreate`        | `boolean` | Resource default | Manually control visibility of the create button     |

## Advanced Usage

### Custom Title and Actions

```tsx
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { Button } from "@/components/ui/button";

export default function PostListPage() {
  return (
    <ListView>
      <ListViewHeader title="My Custom Posts List" canCreate={false} />
      {/* Your list content */}
    </ListView>
  );
}
```

### Hide Breadcrumb

```tsx
<ListViewHeader hideBreadcrumb={true} />
```

### Custom CSS Classes

```tsx
<ListView className="my-custom-list">
  <ListViewHeader
    wrapperClassName="custom-header-wrapper"
    headerClassName="custom-header-content"
  />
</ListView>
```
