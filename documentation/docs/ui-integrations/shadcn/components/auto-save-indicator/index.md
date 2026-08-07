---
title: "shadcn/ui Auto Save Indicator Component | UI Component in Refine v5"
display_title: "<AutoSaveIndicator />"
sidebar_label: "<AutoSaveIndicator />"
description: "Integrate Auto Save Indicator in Refine v5. Learn best practices. Learn integrate Radix UI, Tailwind CSS for polished admin UIs. Explore with code snippets."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/form/auto-save-indicator.tsx
---

When you're editing data in admin panels, users want to know if their changes are being saved. The `<AutoSaveIndicator />` component shows exactly that - it gives your users clear visual feedback about auto-save operations happening in the background.

This component automatically displays different states like "Saving...", "Saved", or error messages with appropriate icons, so users always know what's happening with their data. It's particularly useful in edit forms where you want to reassure users that their work isn't lost.

## Installation

Add the Auto Save Indicator component to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/auto-save-indicator.json
```

This will install the component with its dependencies:

- `@refinedev/core` - For Refine integration
- `lucide-react` - For status icons

## Usage

The most common use case is adding auto-save feedback to your edit forms. Here's how to set it up with React Hook Form:

```tsx
import { useForm } from "@refinedev/react-hook-form";
import { AutoSaveIndicator } from "@/components/refine-ui/form/auto-save-indicator";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";

export default function EditPost() {
  const {
    refineCore: { onFinish, autoSaveProps },
    ...form
  } = useForm({
    refineCoreProps: {
      autoSave: {
        enabled: true,
        debounce: 1000, // Auto-save after 1 second of inactivity
      },
    },
  });

  return (
    <EditView />
      <EditViewHeader
        title="Edit Post"
        actionsSlot={<AutoSaveIndicator {...autoSaveProps} />}
      />
      {/* Your form fields here */}
    </EditView>
  );
}
```

That's it! The indicator will automatically show "Saving..." when the user makes changes, "Saved" when the operation completes, or error messages if something goes wrong.

## Configuring Auto-Save Behavior

You can customize how auto-save works by configuring the `autoSave` options:

```tsx
const {
  refineCore: { autoSaveProps },
  ...form
} = useForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      debounce: 1000, // Wait 1 second after user stops typing
      invalidateOnUnmount: true, // Refresh data when component unmounts
      onMutationSuccess: (data) => {
        // Custom success handler
        console.log("Auto-save successful:", data);
      },
      onMutationError: (error) => {
        // Custom error handler
        console.error("Auto-save failed:", error);
      },
    },
  },
});
```

The `debounce` setting is particularly important - it prevents the component from saving on every keystroke, which would create too many API calls.

## Customizing the Appearance

If you want to change how the status messages look, you can provide custom elements:

```tsx
const customElements = {
  success: <span className="text-green-600">✓ Changes saved</span>,
  error: <span className="text-red-600">⚠ Save failed - try again</span>,
  loading: <span className="text-blue-600">Saving your changes...</span>,
};

<AutoSaveIndicator {...autoSaveProps} elements={customElements} />;
```

This is useful when you want to match your app's specific design language or provide more detailed messaging.

## API Reference

### AutoSaveIndicator

| Prop       | Type                                          | Description                             |
| ---------- | --------------------------------------------- | --------------------------------------- |
| `status`   | `"loading" \| "success" \| "error" \| "idle"` | Current auto-save status                |
| `elements` | `AutoSaveIndicatorElements`                   | Optional custom elements for each state |

The component automatically handles the different status states:

- `loading` - Shows while saving is in progress
- `success` - Briefly displays when save completes
- `error` - Shows when save operation fails
- `idle` - Component is hidden (no active operation)
