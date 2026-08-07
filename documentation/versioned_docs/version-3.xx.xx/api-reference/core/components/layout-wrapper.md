---
id: layout-wrapper
title: <LayoutWrapper>
---

## Overview

`<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in [`<Refine>`][refine] component. It is the default layout used in resource pages. It can be used in [custom pages][custom pages] to use global layout.

This component accepts layout customizations to further customize the layout parameters (`Title`, `Sider`, `Header`, `Footer`, `Layout`, `OffLayoutArea`) defined in [`<Refine>`][refine] component.

## Usage

`<LayoutWrapper>` can be used inside custom pages to use global layout with all its customizations.

An example use in a custom page may look like this:

```tsx title="App.tsx"
// highlight-next-line
import { Refine, Authenticated, LayoutWrapper } from "@pankod/refine-core";

import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const AuthenticatedPostReview = () => {
  return (
    <Authenticated>
      <LayoutWrapper Sider={() => <></>}>
        <PostReview />
      </LayoutWrapper>
    </Authenticated>
  );
};
// highlight-end

const App: React.FC = () => {
  return (
    <Refine
      // highlight-start
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            exact: true,
            component: AuthenticatedPostReview,
            path: "/authenticated-page",
          },
        ] as typeof routerProvider.routes,
      }}
      // highlight-end
      dataProvider={dataProvider(API_URL)}
      resources={[{ name: "posts", list: PostList }]}
    />
  );
};

export default App;
```

In this example, we hide the left sider only for this page. The rest should look same as resource pages.

## API Reference

### Properties

<PropsTable
    module="@pankod/refine-core/LayoutWrapper"
    Sider-description="[Custom sider to use](/core/docs/3.xx.xx/api-reference/core/components/refine-config#sider)"
    Header-description="[Custom header to use](/core/docs/3.xx.xx/api-reference/core/components/refine-config#header)"
    Title-description="[Custom title to use](/core/docs/3.xx.xx/api-reference/core/components/refine-config#title)"
    Footer-description="[Custom footer to use](/core/docs/3.xx.xx/api-reference/core/components/refine-config#footer)"
    OffLayoutArea-description="[Custom off layout area to use](/core/docs/3.xx.xx/api-reference/core/components/refine-config#offlayoutarea)"
/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine][refine]>** component.

[refine]: ./refine-config
[custom pages]: /core/docs/3.xx.xx/advanced-tutorials/custom-pages
