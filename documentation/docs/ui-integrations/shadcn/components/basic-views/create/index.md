---
title: "shadcn/ui Create Component | UI Component in Refine v5"
display_title: "Create"
sidebar_label: "Create"
description: "Secure Create in Refine v5. Learn best practices. Learn integrate breadcrumb and title for polished admin UIs. Learn with code examples."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/views/create-view.tsx
---

`<CreateView />` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

The `CreateView` component is designed for building record creation pages with automatic navigation, resource integration, and breadcrumb navigation.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

This will install all view components including `CreateView`.

## Usage

```tsx
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostCreatePage() {
  const formLoading = false; // or true, based on your form submission state

  return (
    <CreateView>
      <CreateViewHeader />
      <LoadingOverlay loading={formLoading}>
        {/* Record content (e.g., Create Form) */}
      </LoadingOverlay>
    </CreateView>
  );
}
```

## Features

- **Automatic Navigation**: Back button functionality via `useBack()` hook
- **Resource Integration**: Automatic resource detection and title generation
- **Breadcrumb Navigation**: Built-in breadcrumb component

## API Reference

### CreateView Properties

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

### CreateViewHeader Properties

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
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";

export default function PostCreatePage() {
  return (
    <CreateView>
      <CreateViewHeader title="Add New Post" />
      {/* Your create form */}
    </CreateView>
  );
}
```

### Hide Breadcrumb

```tsx
<CreateViewHeader hideBreadcrumb={true} />
```

### Custom CSS Classes

```tsx
<CreateView className="my-custom-create">
  <CreateViewHeader
    wrapperClassName="custom-header-wrapper"
    headerClassName="custom-header-content"
  />
</CreateView>
```

### With Form Loading State

```tsx
import { useForm } from "@refinedev/react-hook-form";

export default function PostCreatePage() {
  const {
    refineCore: { formLoading },
  } = useForm();

  return (
    <CreateView>
      <CreateViewHeader />
      <LoadingOverlay loading={formLoading}>
        {/* Your form content */}
      </LoadingOverlay>
    </CreateView>
  );
}
```
