---
title: "shadcn/ui Show Component | UI Component in Refine v5"
display_title: "Show"
sidebar_label: "Show"
description: "Set up Show in Refine v5. Learn best practices. Learn integration patterns for Radix UI, Tailwind CSS for polished admin UIs. Explore with code snippets."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/views/show-view.tsx
---

`<ShowView />` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

The `ShowView` component is designed for displaying detailed information about a single record with automatic navigation, resource integration, breadcrumb navigation, and action buttons.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

This will install all view components including `ShowView`.

## Usage

```tsx
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostShowPage() {
  const isLoading = false; // or true, based on your data fetching state
  const error = null; // or object, based on your data fetching state

  if (error) {
    return (
      <ShowView>
        <ShowViewHeader />
        {/* Error content */}
      </ShowView>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <LoadingOverlay loading={isLoading}>
        {/* Record content (e.g., Record details) */}
      </LoadingOverlay>
    </ShowView>
  );
}
```

## Features

- **Automatic Navigation**: Back button and List button functionality
- **Resource Integration**: Automatic resource detection and title generation
- **Breadcrumb Navigation**: Built-in breadcrumb component
- **Action Buttons**: Includes `RefreshButton` and `EditButton` (if applicable)

## API Reference

### ShowView Properties

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

### ShowViewHeader Properties

Includes `EditButton` (if resource has an edit page), `ListButton`, and `RefreshButton` by default.

| Prop               | Type      | Default          | Description                                          |
| ------------------ | --------- | ---------------- | ---------------------------------------------------- |
| `resource`         | `string`  | Current resource | Override the resource name for title and actions     |
| `title`            | `string`  | Auto-generated   | Custom title for the header                          |
| `hideBreadcrumb`   | `boolean` | `false`          | Set to `true` to hide the breadcrumb                 |
| `wrapperClassName` | `string`  | -                | CSS classes for the header's main wrapper div        |
| `headerClassName`  | `string`  | -                | CSS classes for the div containing title and actions |

## Advanced Usage

### Custom Title

```tsx
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";

export default function PostShowPage() {
  return (
    <ShowView>
      <ShowViewHeader title="Post Details" />
      {/* Your record details */}
    </ShowView>
  );
}
```

### Hide Breadcrumb

```tsx
<ShowViewHeader hideBreadcrumb={true} />
```

### Custom CSS Classes

```tsx
<ShowView className="my-custom-show">
  <ShowViewHeader
    wrapperClassName="custom-header-wrapper"
    headerClassName="custom-header-content"
  />
</ShowView>
```

### With Data Loading

```tsx
import { useShow } from "@refinedev/core";

export default function PostShowPage() {
  const { result, query } = useShow();
  const { isLoading, error } = query;
  const record = result;

  if (error) {
    return (
      <ShowView>
        <ShowViewHeader />
        <div>Error loading record</div>
      </ShowView>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <LoadingOverlay loading={isLoading}>
        {/* Display your record details */}
        <div>
          <h3>{record?.title}</h3>
          <p>{record?.content}</p>
        </div>
      </LoadingOverlay>
    </ShowView>
  );
}
```

### Display Field Components

```tsx
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { TextField } from "@/components/refine-ui/fields/text-field";
import { DateField } from "@/components/refine-ui/fields/date-field";

export default function PostShowPage() {
  const { result, query } = useShow();
  const { isLoading } = query;
  const record = result;

  return (
    <ShowView>
      <ShowViewHeader />
      <LoadingOverlay loading={isLoading}>
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Title:</label>
            <TextField value={record?.title} />
          </div>
          <div>
            <label className="font-semibold">Created At:</label>
            <DateField value={record?.createdAt} />
          </div>
          <div>
            <label className="font-semibold">Content:</label>
            <TextField value={record?.content} />
          </div>
        </div>
      </LoadingOverlay>
    </ShowView>
  );
}
```
