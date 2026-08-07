---
title: Data Fetching
---

import { Sandpack, FocusOnDataProviderFile, AddDataProviderToRefine } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be learning about the basics of data fetching in Refine. `<Refine />` component accepts a [`dataProvider`](/core/docs/core/refine-component/#dataprovider-) prop which is used to handle all the data fetching and mutation operations with a simple interface. While Refine supports many data providers out of the box, for sake of this tutorial, we'll be creating our own data provider and connecting it to a [fake REST API](https://api.fake-rest.refine.dev/).

To learn more about the supported data providers, refer to the [Supported Data Providers](/core/docs/guides-concepts/data-fetching/#supported-data-providers) section in the Data Fetching guide.

## Creating a Data Provider

We'll be implementing each method one-by-one, ensuring thorough coverage of all details. We'll use `fetch` for API requests, but you're free to choose any library.

First, we'll create a `src/providers/data-provider.ts` file in our project, which will contain all the methods we need to implement for our data provider.

To see an empty data provider, <FocusOnDataProviderFile>check out the `src/providers/data-provider.ts`</FocusOnDataProviderFile> in the right panel.

Then, we'll pass our data provider to `<Refine />` component in `src/App.tsx` file with the `dataProvider` prop.

Update your `src/App.tsx` file by adding the following lines:

```tsx
import { Refine, WelcomePage } from "@refinedev/core";

// highlight-next-line
import { dataProvider } from "./providers/data-provider";

export default function App(): JSX.Element {
  return (
    // highlight-next-line
    <Refine dataProvider={dataProvider}>
      <WelcomePage />
    </Refine>
  );
}
```

<AddDataProviderToRefine />

:::tip

It's also possible to use multiple data providers with Refine. You can learn more about it in the [Multiple Data Providers](/core/docs/guides-concepts/data-fetching/#multiple-data-providers) section of the Data Fetching guide.

:::

In the next step, we'll be learning about the fetching a record using Refine's `useOne` hook, and also about implementing the `getOne` method in our data provider.

</Sandpack>
