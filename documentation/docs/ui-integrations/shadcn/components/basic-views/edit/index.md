---
title: "shadcn/ui Edit Component | UI Component in Refine v5"
display_title: "Edit"
sidebar_label: "Edit"
description: "Explore how to integrate Edit in Refine v5. Learn integrate breadcrumb and custom for polished admin UIs. Real-world snippets included."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/views/edit-view.tsx
---

`<EditView />` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

The `EditView` component is designed for building record editing pages with automatic navigation, resource integration, breadcrumb navigation, and refresh functionality.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

This will install all view components including `EditView`.

## Usage

```tsx
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostEditPage() {
  const queryLoading = false; // or true, based on your data fetching state
  const formLoading = false; // or true, based on your form submission state
  const error = null; // or object, based on your data fetching state

  if (error) {
    return (
      <EditView>
        <EditViewHeader />
        {/* Error content */}
      </EditView>
    );
  }

  return (
    <EditView>
      <EditViewHeader />
      <LoadingOverlay loading={queryLoading || formLoading}>
        {/* Record content (e.g., Edit Form) */}
      </LoadingOverlay>
    </EditView>
  );
}
```

## Features

- **Automatic Navigation**: Back button and List button functionality
- **Resource Integration**: Automatic resource detection and title generation
- **Breadcrumb Navigation**: Built-in breadcrumb component
- **Refresh Functionality**: Built-in `RefreshButton` for the current record
- **Loading States**: `LoadingOverlay` can be used to cover both data fetching and form submission loading states

## API Reference

### EditView Properties

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

### EditViewHeader Properties

Includes `RefreshButton` and `ListButton` by default.

| Prop               | Type        | Default          | Description                                          |
| ------------------ | ----------- | ---------------- | ---------------------------------------------------- |
| `resource`         | `string`    | Current resource | Override the resource name for title and actions     |
| `title`            | `string`    | Auto-generated   | Custom title for the header                          |
| `hideBreadcrumb`   | `boolean`   | `false`          | Set to `true` to hide the breadcrumb                 |
| `wrapperClassName` | `string`    | -                | CSS classes for the header's main wrapper div        |
| `headerClassName`  | `string`    | -                | CSS classes for the div containing title and actions |
| `actionsSlot`      | `ReactNode` | -                | Custom actions to render in the header               |

## Advanced Usage

### Custom Title and Actions

```tsx
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { AutoSaveIndicator } from "@/components/refine-ui/form/auto-save-indicator";

export default function PostEditPage() {
  const { autoSaveProps } = useForm({
    refineCoreProps: {
      autoSave: { enabled: true },
    },
  });

  return (
    <EditView>
      <EditViewHeader
        title="Edit Post"
        actionsSlot={<AutoSaveIndicator {...autoSaveProps} />}
      />
      {/* Your edit form */}
    </EditView>
  );
}
```

### Hide Breadcrumb

```tsx
<EditViewHeader hideBreadcrumb={true} />
```

### Custom CSS Classes

```tsx
<EditView className="my-custom-edit">
  <EditViewHeader
    wrapperClassName="custom-header-wrapper"
    headerClassName="custom-header-content"
  />
</EditView>
```

### With Auto-Save Indicator

```tsx
import { useForm } from "@refinedev/react-hook-form";
import { AutoSaveIndicator } from "@/components/refine-ui/form/auto-save-indicator";

export default function PostEditPage() {
  const {
    refineCore: { autoSaveProps, query, formLoading },
  } = useForm({
    refineCoreProps: {
      autoSave: { enabled: true, debounce: 1000 },
    },
  });

  return (
    <EditView>
      <EditViewHeader actionsSlot={<AutoSaveIndicator {...autoSaveProps} />} />
      <LoadingOverlay loading={query.isLoading || formLoading}>
        {/* Your form content */}
      </LoadingOverlay>
    </EditView>
  );
}
```
