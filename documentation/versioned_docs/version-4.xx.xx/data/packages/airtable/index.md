---
title: "Airtable Data Provider Guide | Refine v4 React CRUD"
display_title: "Airtable"
sidebar_label: "Airtable"
description: "Connect Refine v4 to Airtable effortlessly. Learn to configure the Airtable data provider for seamless React-based admin panel development."
source: https://github.com/refinedev/refine/tree/main/packages/airtable
swizzle: true
---

Refine provides a data provider for [Airtable](https://airtable.com/), a spreadsheet-database hybrid, to build CRUD applications.

:::simple Good to know

- `@refinedev/airtable` uses API Tokens to authenticate requests. Personal access tokens of Airtable is currently not supported.
- This integration uses [Airtable.js](https://github.com/Airtable/airtable.js) to handle the requests.
- To learn more about data fetching in Refine, check out the [Data Fetching](/core/docs/guides-concepts/data-fetching) guide.

:::

## Installation

<InstallPackagesCommand args="@refinedev/airtable"/>

## Usage

First, we'll obtain the `API_TOKEN` and `BASE_ID` from our Airtable account. Then, we'll pass these values to the `dataProvider` function.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider from "@refinedev/airtable";

const App = () => (
  <Refine
    // highlight-next-line
    dataProvider={dataProvider("<API_TOKEN>", "<BASE_ID>")}
  >
    {/* ... */}
  </Refine>
);
```

## Example

<CodeSandboxExample path="data-provider-airtable" />
