---
id: mui-custom-layout
title: Layout
swizzle: true
---

You can create custom layouts using [`<Refine>`][refine] and [`<LayoutWrapper>`][layoutwrapper] components.

Both of these components can accept the listed props for customization. [`<Refine>`][refine] being for global customization and the [`<LayoutWrapper>`][layoutwrapper] being for local.

- [`Layout`][layout]
- [`Sider`][sider]
- [`Footer`][footer]
- [`Header`][header]
- [`OffLayoutArea`][offlayoutarea]
- [`Title`][title]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Creating a Custom Layout

Let's start with creating a `<CustomLayout/>` component using `LayoutProps` from `@pankod/refine-core` with the following code:

```tsx title="src/components/layout.tsx"
import React from "react";
import { LayoutProps } from "@pankod/refine-core";
// highlight-next-line
import {
  Sider as DefaultSider,
  Header as DefaultHeader,
  Box,
} from "@pankod/refine-mui";

export const CustomLayout: React.FC<LayoutProps> = ({
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <Box display="flex" flexDirection="row">
      <SiderToRender />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
```

We can now pass `CustomLayout` as `Layout` prop to `<Refine/>`:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import { ReadyPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList } from "pages/posts";
// highlight-next-line
import { CustomLayout } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      // highlight-start
      Layout={CustomLayout}
      // highlight-end
      ReadyPage={ReadyPage}
      // ...
    />
  );
};

export default App;
```

After this, `<Refine/>` will use the `CustomLayout` instead of it's default `Layout` component.

```tsx live previewOnly disableScroll
import React from "react";
import { Refine, LayoutProps } from "@pankod/refine-core";
import {
  ReadyPage,
  Sider as DefaultSider,
  Header as DefaultHeader,
  Box,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  TextField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  {
    field: "title",
    headerName: "Title",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "slug",
    headerName: "Slug",
    minWidth: 100,
    flex: 1,
  },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}

const Wrapper = ({ children }) => {
  return (
    <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
      <RefineMui.CssBaseline />
      <RefineMui.GlobalStyles
        styles={{ html: { WebkitFontSmoothing: "auto" } }}
      />
      {children}
    </RefineMui.ThemeProvider>
  );
};

const CustomLayout: React.FC<LayoutProps> = ({
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <Box display="flex" flexDirection="row">
      <SiderToRender />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      Layout={CustomLayout}
      ReadyPage={ReadyPage}
      resources={[
        {
          name: "posts",
          list: PostsList,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

:::info
This example demonstrated how to configure a global layout. To learn how to use global layout in custom pages and make local modifications per page, [refer to the `<LayoutWrapper>` docs. &#8594][layoutwrapper]
:::

[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[layout]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#layout
[sider]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#sider
[footer]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#footer
[header]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#header
[offlayoutarea]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#offlayoutarea
[title]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#title
[layoutwrapper]: /core/docs/3.xx.xx/api-reference/core/components/layout-wrapper
[custom page example]: /advanced-tutorials/custom-pages
[custom page example code]: /core/docs/examples/customization/topMenulayout
[antdlayout]: https://ant.design/components/layout/
[usemenu]: /core/docs/3.xx.xx/api-reference/core/hooks/ui/useMenu
[usetitle]: /core/docs/3.xx.xx/api-reference/core/hooks/refine/useTitle
