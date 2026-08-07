---
title: "Chakra UI Auto Save Indicator Component | UI Component in Refine v5"
display_title: "<AutoSaveIndicator />"
sidebar_label: "<AutoSaveIndicator />"
description: "Secure Auto Save Indicator in Refine v5. Learn best practices. Learn integrate accessibility, components for polished admin UIs. Real-world snippets included."
source: packages/chakra-ui/src/components/autoSaveIndicator/index.tsx
---

`<AutoSaveIndicator>` component from Refine for **Chakra UI** can be used to communicate auto-save status to the user.

:::simple Good to know

This component is an extended version of the [`<AutoSaveIndicator>`](/core/docs/core/components/auto-save-indicator/) component from Refine's core package. It provides a set of elements which align with Chakra UI's components and styling.

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
