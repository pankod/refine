---
title: "Auto Save Indicator Component | Components in Refine v5"
display_title: "<AutoSaveIndicator />"
sidebar_label: "<AutoSaveIndicator />"
description: "Implement Auto Save Indicator in Refine v5. Learn the key steps. Learn best practices for auto-save and status for real-world React admin panels."
source: packages/core/src/components/autoSaveIndicator/index.tsx
---

Refine's forms provide a built-in auto-save feature. This allows you to automatically save the form when the user makes changes to the form which can be useful for forms that are long or complex and the user may not want to lose their progress.

The `<AutoSaveIndicator />` component is a utility component that can be used to show a visual indicator to the user about the auto-save status of the form.

:::simple Good to know

- Refine's core [`useForm`](/core/docs/data/hooks/use-form/) hook does not automatically trigger the auto-save feature. You need to manually trigger the `onFinishAutoSave` function returned from the `useForm` hook to trigger the auto-save feature.

- Extended implementations of Refine's `useForm` such as; [`@refinedev/antd`'s `useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/), [`@refinedev/react-hook-form`'s `useForm`](/core/docs/packages/react-hook-form/use-form/) and [`@refinedev/mantine`'s `useForm`](/core/docs/ui-integrations/mantine/hooks/use-form/) automatically trigger the auto-save feature when a form value changes.

- The `<AutoSaveIndicator />` component is only designed to display a visual feedback to the user about the auto-save status of the form. It does not contain any logic to trigger the auto-save feature.

- To learn more about the auto-save feature check out [Auto Save section in Forms guide](/core/docs/guides-concepts/forms/#auto-save)

:::

## Usage

Usage is as simple as spreading the `autoSaveProps` object returned from the [`useForm`](/core/docs/data/hooks/use-form/) hook into the `<AutoSaveIndicator />` component. It will automatically determine the auto-save status and display the appropriate indicator.

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/core";

const EditPage = () => {
  const { autoSaveProps } = useForm({
    autoSave: {
      enabled: true,
    },
  });

  console.log(autoSaveProps);
  /*
    {
      status: "success",  // "loading" | "error" | "idle" | "success"
      error: null,        // HttpError | null
      data: { ... },      // UpdateResponse | undefined,
    }
  */

  return (
    <div>
      {/* highlight-start */}
      {/* We'll pass the autoSaveProps from useForm's response to the <AutoSaveIndicator /> component. */}
      <AutoSaveIndicator {...autoSaveProps} />
      {/* highlight-end */}
      <form
      // ...
      >
        {/* ... */}
      </form>
    </div>
  );
};
```

Example below shows the `<AutoSaveIndicator />` component in action.

import Usage from "./usage.tsx";

<Usage />

### Customizing the indicator

The `<AutoSaveIndicator />` component accepts an `elements` prop which can be used to customize the indicator for each status.

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/core";

const EditPage = () => {
  const { autoSaveProps } = useForm({
    autoSave: {
      enabled: true,
    },
  });

  return (
    <div>
      <AutoSaveIndicator
        {...autoSaveProps}
        // highlight-start
        elements={{
          loading: <span>saving...</span>,
          error: <span>auto save error.</span>,
          idle: <span>waiting for changes.</span>,
          success: <span>saved.</span>,
        }}
        // highlight-end
      />
      {/* ... */}
    </div>
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/AutoSaveIndicator" elements-type={'Partial<Record<"loading" \\| "error" \\| "idle" \\| "success", ReactNode>>'} />
