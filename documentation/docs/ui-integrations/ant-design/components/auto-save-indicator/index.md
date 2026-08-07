---
title: "Ant Design Auto Save Indicator Component | UI Component in Refine v5"
display_title: "<AutoSaveIndicator />"
sidebar_label: "<AutoSaveIndicator />"
description: "Explore how to integrate Auto Save Indicator in Refine v5. Learn integration patterns for elements and request for polished admin UIs. Learn with code examples."
source: packages/antd/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from Refine for **Ant Design** can be used to communicate auto-save status to the user.

:::simple Good to know

This component is an extended version of the [`<AutoSaveIndicator>`](/core/docs/core/components/auto-save-indicator/) component from Refine's core package. It provides a set of elements which align with Ant Design's components and styling.

:::

## Usage

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/antd";

const MyComponent = () => {
  const { autoSaveProps } = useForm({
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
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

  return <AutoSaveIndicator {...autoSaveProps} />;
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/AutoSaveIndicator" />
