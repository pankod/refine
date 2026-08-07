---
title: "MUI AutoSaveIndicator | Refine v4 UX Feedback"
display_title: "<AutoSaveIndicator />"
sidebar_label: "<AutoSaveIndicator />"
description: "Show real-time feedback for background saves in MUI. Learn how to use the AutoSaveIndicator for a better form experience in Refine v4."
source: packages/antd/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from Refine for **Material UI** can be used to communicate auto-save status to the user.

:::simple Good to know

This component is an extended version of the [`<AutoSaveIndicator>`](/core/docs/core/components/auto-save-indicator) component from Refine's core package. It provides a set of elements which align with Material UI's components and styling.

:::

## Usage

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/mui";

const MyComponent = () => {
  const {
    refineCore: { autoSaveProps },
  } = useForm({
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

<PropsTable module="@refinedev/mui/AutoSaveIndicator" />
