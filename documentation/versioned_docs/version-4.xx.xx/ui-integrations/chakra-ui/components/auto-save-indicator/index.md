---
title: "Chakra UI AutoSaveIndicator | Refine v4 UX"
display_title: "<AutoSaveIndicator />"
sidebar_label: "<AutoSaveIndicator />"
description: "Enhance your forms with real-time feedback. Learn how to use the Chakra UI AutoSaveIndicator for background data saving in Refine v4."
source: packages/chakra-ui/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from Refine for **Chakra UI** can be used to communicate auto-save status to the user.

:::simple Good to know

This component is an extended version of the [`<AutoSaveIndicator>`](/core/docs/core/components/auto-save-indicator) component from Refine's core package. It provides a set of elements which align with Chakra UI's components and styling.

:::

## Usage

Simple usage is as follows:

```tsx
import { AutoSaveIndicator, useForm } from "@refinedev/chakra-ui";

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

<PropsTable module="@refinedev/chakra-ui/AutoSaveIndicator" />
