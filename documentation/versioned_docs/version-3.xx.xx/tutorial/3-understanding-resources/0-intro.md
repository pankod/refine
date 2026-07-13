---
id: index
title: Resources
tutorial:
  order: 0
  prev: false
  next: 3.xx.xx/tutorial/adding-crud-pages/{preferredUI}/index
---

:::info Remember

<UIConditional is="antd">

In the [Unit 2.4](/core/docs/3.xx.xx/tutorial/getting-started/antd/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="chakra-ui">

In the [Unit 2.4](/core/docs/3.xx.xx/tutorial/getting-started/chakra-ui/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="headless">

In the [Unit 2.4](/core/docs/3.xx.xx/tutorial/getting-started/headless/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="mantine">

In the [Unit 2.4](/core/docs/3.xx.xx/tutorial/getting-started/mantine/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="mui">

In the [Unit 2.4](/core/docs/3.xx.xx/tutorial/getting-started/mui/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

:::

Before we start, let's understand what is `<Refine/>` component.

The `<Refine/>` is the starting point of the **refine** app. It is a wrapper component that provides the context to the **refine** components and hooks. It is used to configure the highest level settings of the app.

In order to initialize the app, the `dataProvider` and `routerProvider` props must be provided. Additionally, it also has other props such as `resources`, `authProvider`, `i18nProvider`, `Layout` etc. These props allow for the configuration of different aspects of the app, including data management, routing, authentication, localization, layout etc.

[Refer to the `<Refine/>` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/components/refine-config/)

In the context of a CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. For example, a resource could be a user account, a blog post, a blog post in an online store, or any other piece of data that can be managed by the CRUD app.

To add a `resource` to our app, we need use `resources` prop of `<Refine/>` component. This prop accepts an array of objects. Each object represents a resource.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      //highlight-start
      resources={[
        {
          name: "blog_posts",
          list: () => <div>Blog Posts List Page</div>,
          show: <div>Blog Post Detail Page</div>,
          create: <div>Blog Post Create Page</div>,
          edit: <div>Blog Post Edit Page</div>,
        },
      ]}
      //highlight-end
    />
  );
};

export default App;
```

In the above example, we have added a `resource` with name `blog_posts`. This resource will have 5 pages that assigned to `list`, `show`, `create`, and `edit` properties. **refine** link the pages with routes for us.

When we define `create`, clone page will be generated automatically. We can access these pages by visiting the following routes:

- `/blog-posts` - Blog Post List Page
- `/blog-posts/show/:id` - Blog Post Detail Page
- `/blog-posts/create` - Blog Post Create Page
- `/blog-posts/clone/:id` - Blog Post Clone Page
- `/blog-posts/edit/:id` - Blog Post Edit Page

:::tip

When using the **refine** hooks and components in the created pages, the `name` property of the `resource` will be passed to the `dataProvider` functions, by default.

:::

## Learn More

Learn more about [resources](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#resources) in the API reference.

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add a resource to the app.
</ChecklistItem>

</Checklist>
