# A Minimal CRUD app with refine and Sanity

<br/>

<div align="center" style="margin: 30px;">

![Edit Image](https://refine.ams3.cdn.digitaloceanspaces.com/example-readmes/sanity-data-provider/cover.png "Cover Image")

</div>

<br/>

This example shows how to integrate your [Sanity](https://www.sanity.io/) CMS with [refine](https://github.com/refinedev/refine) app using the [Sanity Data Provider](https://github.com/hirenf14/refine-sanity).

You can use this template to create your own **refine** app with Sanity CMS.

## About

[Sanity](https://www.sanity.io/) is the modern headless CMS that uses structured content to endlessly re-use content across any channel. It lets you use your content many times across different places. Plus, it easily connects with any third-party technology, data source, and front end framework.

[refine](https://refine.dev/) is a React meta-framework for building enterprise B2B app like such as internal tools, dashboards, admin panels, and storefronts. It comes with a core package that segregates app concerns like data handling, authentication, access control, etc., into React contexts.

In this example, we build a simple app that consumes Sanity backend and performs CRUD operations.

<br/>

![List Image](https://refine.ams3.cdn.digitaloceanspaces.com/example-readmes/sanity-data-provider/list.png "Cover Image")

## Fetching Sanity Data

To fetch data from Sanity, we registered the Sanity data provider in the `dataProvider` of the `App.tsx` file.

A data provider serves as a foundational data layer for your application, handling HTTP requests and encapsulating the data retrieval process. refine leverages data hooks to seamlessly utilize the methods provided by these requests. This ensures efficient data management within your app.

Refer to docs for more information on [data providers](https://refine.dev/docs/tutorial/understanding-dataprovider/index/#what-is-data-provider).

If you want to integrate Sanity Data provider in your app from scratch, you can follow the steps below.

### Install refine-sanity data provider package

```bash
npm install @sanity/client refine-sanity
```

### Register Sanity dashboard in refine app

```tsx
import dataProvider from "refine-sanity";
import { createClient } from "@sanity/client";

const client = createClient({
  token: "EDITOR_SANITY_ACCESS_TOKEN",
  projectId: "SANITY_PROJECT_ID",
  dataset: "SANITY_DATASET",
});

const App = () => {
  return (
    <Refine
      dataProvider={dataProvider(client)}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

After this step, we can use refine data hooks to [interacting with data](https://refine.dev/docs/tutorial/understanding-dataprovider/index/#how-are-data-provider-methods-used-in-the-app) from Sanity.

```tsx
import { useTable } from "@refinedev/antd";

const { tableProps, filters, sorters } = useTable<IPost>({
      ...
});
```

## Try this example on your local

Run the following command to get this example app.

```bash
npm create refine-app@latest -- --example data-provider-sanity
```

## Try this example on CodeSandbox

<br/>

[![Open data-provider-sanity example from refine](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/data-provider-sanity?view=preview&theme=dark&codemirror=1)

## Resources

- [Refer to Sanity docs](https://www.sanity.io/docs/getting-started-with-sanity).
- [Refer to refine tutorial](https://refine.dev/docs/tutorial/introduction/index/).
- [Refer to refine-sanity data provider package](https://www.npmjs.com/package/refine-sanity).
