---
title: "useDataProvider Hook | Refine v4"
display_title: "useDataProvider"
sidebar_label: "useDataProvider"
description: "Learn how to directly access and use the active data provider instance in Refine v4 for advanced data operations and custom logic."
source: packages/core/src/data/hooks/useDataProvider.tsx
---

`useDataProvider` is a React hook that returns the `dataProvider` which is passed to [`<Refine>`][Refine] component.

It is useful when you have multiple data providers and you want to access one of them.

## Usage

Let's say we have two data providers:

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const App = () => (
  <Refine
    dataProvider={{
      default: dataProvider("API_URL"),
      second: dataProvider("SECOND_API_URL"),
    }}
  >
    {/* ... */}
  </Refine>
);
```

Now we can access the data providers with the `useDataProvider` hook:

```tsx
import { useDataProvider } from "@refinedev/core";

const dataProvider = useDataProvider();

const defaultDataProvider = dataProvider(); // return default data provider
const secondDataProvider = dataProvider("second"); // return second data provider
```

## API Reference

### Properties

| Property         | Description                                      | Type     | Default   |
| ---------------- | ------------------------------------------------ | -------- | --------- |
| dataProviderName | The name of the data provider you want to access | `string` | `default` |

### Return value

| Description   | Type                                             |
| ------------- | ------------------------------------------------ |
| Data Provider | [`Data Provider`](/core/docs/data/data-provider) |

[Refine]: /core/docs/core/refine-component
[data provider]: /core/docs/data/data-provider
