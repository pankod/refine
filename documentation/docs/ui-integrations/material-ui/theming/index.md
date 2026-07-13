---
title: "Theming Guide | Material Design UI in Refine v5"
display_title: "Theming"
sidebar_label: "Theming"
description: "Integrate Theming in Refine v5. Learn best practices. Explore customization options for Material Design, components for polished admin UIs."
---

Theme specifies the color of the components, the darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc. You can either create your own Theme or use Themes that provide from Refine. Theme provides a way to your app's design to meet them.

> For more information, refer to the [Material UI documentation &#8594](https://mui.com/material-ui/customization/theming/)

## Predefined Themes

If you don't want to use the default Mantine theme, [`RefineThemes`](https://github.com/refinedev/refine/blob/main/packages/mui/src/theme/palette/refinePalette.ts) has predefined themes for you. You can import predefined themes from the `@refinedev/mui` package.

```ts
// light themes
const { Blue, Purple, Magenta, Red, Orange, Yellow } = RefineThemes;

// dark themes
const { BlueDark, PurpleDark, MagentaDark, RedDark, OrangeDark, YellowDark } =
  RefineThemes;
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/mui";

import { ThemeProvider } from "@mui/material/styles";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <Refine
      /* ... */
      >
        <ThemedLayout>{/* ... */}</ThemedLayout>
      </Refine>
    </ThemeProvider>
  );
};
```

[You can see how themes change the look of the application in this example.](/core/docs/examples/themes/refine-themes-mui/)

## Theme Provider

The [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) component is a simple wrapper around React's Context API that allows you to inject a Theme object into your application. By default, Material UI components come with a default Theme. In addition, you can also use the ThemeProvider component to inject a custom theme that you have created yourself. This is a feature that allows for great flexibility in how you design your application.

```tsx title="src/App.tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout, ErrorComponent } from "@refinedev/mui";
// highlight-next-line
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={YOUR_THEME_OBJECT}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
      // highlight-next-line
    </ThemeProvider>
  );
};

export default App;
```

We recommend using [`create refine-app`][create-refine-app] to initialize your Refine projects. It configures the project according to your needs including SSR and Theme with Next.js.

## Passing the Theme to ThemeProvider

In order to use the theme in your app, you just have one choice: pass it on!

If you don't wrap your app with [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) and theme, it looks like this when using the Material UI default:

```tsx live previewOnly disableScroll
import { Refine } from "@refinedev/core";
import { ThemedLayout, ErrorComponent } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { SampleList, SampleCreate, SampleEdit } from "pages/samples";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "samples",
              list: "/samples",
              create: "/samples/create",
              edit: "/samples/edit/:id",
            },
          ]}
        >
          <Routes>
            <Route index element={<NavigateToResource />} />
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="samples">
                <Route index element={<SampleList />} />
                <Route path="create" element={<SampleCreate />} />
                <Route path="edit/:id" element={<SampleEdit />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </>
  );
};

render(<App />);
```

In our example, we will be using `RefineThemes`.

The design will change to match the `RefineThemes.Blue`, so you can enjoy these amazing interfaces without any hassle!

```tsx live
setInitialRoutes(["/samples"]);
// visible-block-start
import { Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  // highlight-next-line
  RefineThemes,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { SampleList, SampleCreate, SampleEdit } from "pages/samples";

const App: React.FC = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "samples",
              list: "/samples",
              create: "/samples/create",
              edit: "/samples/edit/:id",
              show: "/samples/show/:id",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="samples">
                <Route index element={<SampleList />} />
                <Route path="create" element={<SampleCreate />} />
                <Route path="edit/:id" element={<SampleEdit />} />
                <Route path="show/:id" element={<SampleShow />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ThemeProvider>
  );
};
// visible-block-end

render(<App />);
```

## Overriding Variables

The best way to customize your theme is by changing the configuration variables. These sections cover some of those most important options, like [`palette`](https://mui.com/material-ui/customization/palette/) and [`typography`](https://mui.com/material-ui/customization/typography/)!

```tsx title="src/App.tsx"
import { RefineThemes } from "@refinedev/mui";
import { createTheme } from "@mui/material/styles";

const overriddenLightTheme = createTheme({
  ...RefineThemes.Blue,
  // highlight-start
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      main: "#44d0c7",
    },
    secondary: {
      main: "#2f82f1",
    },
  },
  // highlight-end
});
```

Get a designer's opinion anyway - you'll be happy with the end result!

When we easy-override our `RefineThemes`, it's going to look like this:

```tsx live previewOnly disableScroll
setInitialRoutes(["/samples"]);
// visible-block-start
import { Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  // highlight-next-line
  RefineThemes,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { SampleList } from "./pages/samples";

const overriddenLightTheme = {
  ...RefineThemes.Blue,
  // highlight-start
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      main: "#44d0c7",
    },
    secondary: {
      main: "#2f82f1",
    },
  },
  // highlight-end
};

const App: React.FC = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={overriddenLightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="samples">
                <Route index element={<SampleList />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ThemeProvider>
  );
};
// visible-block-end

render(<App />);
```

You can also change the Default Font Family.

```tsx title="src/App.tsx"
import { RefineThemes } from "@refinedev/mui";
import { TypographyVariantsOptions, createTheme } from "@mui/material/styles";

const typography: TypographyVariantsOptions = {
  fontFamily: [
    "Montserrat",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
};

const overriddenLightTheme = createTheme({
  ...RefineThemes.Blue,
  typography: {
    ...typographyOptions,
  },
});
```

> Refer to the [Material UI documentation for more information about Material UI Theme Configuration Variables. &#8594](https://mui.com/material-ui/customization/theming/)

If you are overriding the `fontFamily` in typography, you can add the `<link>` tags in your `index.html` like the following:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    // highlight-start
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    // highlight-end
    <title>Refine adding font family example</title>
  </head>

  <body>
    ...
  </body>
</html>
```

## Create Custom Theme

With the help of Refine's themes, you can customize your site in a matter of minutes. Alternatively, there is also an option to create a custom theme with the [`createTheme()`](https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme) method so you can create a custom theme with the configuration variables and use it in the whole application.

You can use the `responsiveFontSizes()` helper to make Typography font sizes in your theme automated.

For more information, you can review [`responsiveFontSizes()`](https://mui.com/material-ui/customization/typography/#responsive-font-sizes) in the mui document.

```tsx live
setInitialRoutes(["/samples"]);
// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, ErrorComponent } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
// highlight-next-line
import { createTheme, responsiveFontSizes } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { SampleList } from "./pages/samples";

// highlight-start
let customTheme = createTheme({
  palette: {
    primary: {
      main: "#330f49",
    },
    secondary: {
      main: "#45d0c8",
    },
  },
});
// highlight-end

// highlight-start
customTheme = responsiveFontSizes(customTheme);
// highlight-end

const App: React.FC = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="samples">
                <Route index element={<SampleList />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ThemeProvider>
  );
};
// visible-block-end

render(<App />);
```

### Create Theme with Custom Variables

Creating a theme with default variables is easy and we can see it in the example above. You can also create your theme with custom variables, you can check it out our example

```tsx title="src/App.tsx"
const customTheme = createTheme({
  customVariable: {
    custom: "#330f49",
  },
});
```

You need to use [`module augmentation`](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) for the theme to accept your custom values.

```ts title="src/interfaces/theme.d.ts"
import "@refinedev/mui";

export interface CustomTheme {
  customVariable: {
    custom: string;
  };
}

declare module "@mui/material/styles" {
  interface Theme extends import("@mui/material/styles").Theme, CustomTheme {}
  interface ThemeOptions
    extends import("@mui/material/styles").ThemeOptions,
      CustomTheme {}
}
```

You can see an example of how to [`create your own theme with custom variables`](https://github.com/refinedev/refine/blob/main/examples/finefoods-material-ui/src/theme.ts) and its [`interface`](https://github.com/refinedev/refine/blob/main/examples/finefoods-material-ui/src/interfaces/theme.d.ts) by accessing the links.

## Dark Mode

You might prefer to use dark mode in your applications. If you want to add dark mode to your application, you can easily use [`useMediaQuery`](https://mui.com/material-ui/react-use-media-query/) to set your color mode or dynamic toggle to switch your mode by using a context. This will help you maintain a consistent look and feel throughout your app.

### System Preference

With the [`useMediaQuery`](https://mui.com/material-ui/react-use-media-query/) hook, you can query a user's preference for light or dark mode and then adjust your site accordingly. This will make things easier on those who prefer darker colors as it simplifies their experience by eliminating any confusion about what browser they are using!
For example:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { ThemedLayout, ErrorComponent, RefineThemes } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
// highlight-next-line
import { useMediaQuery } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import {
  SampleList,
  SampleCreate,
  SampleEdit,
  SampleShow,
} from "pages/samples";

const App: React.FC = () => {
  // highlight-next-line
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    // highlight-next-line
    <ThemeProvider
      theme={prefersDarkMode ? RefineThemes.BlueDark : RefineThemes.Blue}
    >
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "samples",
              list: "/samples",
              create: "/samples/create",
              edit: "/samples/edit/:id",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="samples">
                <Route index element={<SampleList />} />
                <Route path="create" element={<SampleCreate />} />
                <Route path="edit/:id" element={<SampleEdit />} />
                <Route path="show/:id" element={<SampleShow />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
```

### Dark Mode Toggle

Control the Dark Mode with just one click! We prepared an example that shows how you can manage to toggle Dark Mode with help of a context in your Header component, which is given as a prop to Refine.

<details>
  <summary>Dark Mode Toggle Code Example</summary>
  <div>
    <details>
      <summary>
       ColorModeContext
      </summary>
           <p>

```tsx title="src/contexts/index.tsx"
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material";
import { RefineThemes } from "@refinedev/mui";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider
        theme={mode === "light" ? RefineThemes.Blue : RefineThemes.BlueDark}
      >
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
```

</p>
    </details>
    <details>
      <summary>
       App.tsx
      </summary>
     <p>

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import { CssBaseline, AppBar, IconButton, Box, Stack } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

import {
  SampleList,
  SampleCreate,
  SampleEdit,
  SampleShow,
} from "pages/samples";

import { ColorModeContextProvider, ColorModeContext } from "./contexts";

const Header = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  return (
    <AppBar color="default" position="sticky">
      <Stack width="100%" direction="row" justifyContent="end">
        <Box marginRight="20px">
          <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Box>
      </Stack>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
              {
                name: "samples",
                list: "/samples",
                create: "/samples/create",
                edit: "/samples/edit/:id",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  // highlight-next-line
                  <ThemedLayout Header={Header}>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path="samples">
                  <Route index element={<SampleList />} />
                  <Route path="create" element={<SampleCreate />} />
                  <Route path="edit/:id" element={<SampleEdit />} />
                  <Route path="show/:id" element={<SampleShow />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </BrowserRouter>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
};

export default App;
```

</p>
    </details>
  </div>
</details>

[You can use this CodeSandbox link to access this example &#8594](https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/customization-theme-material-ui/?view=preview&theme=dark&codemirror=1)

```tsx live previewOnly previewHeight=450px disableScroll
setInitialRoutes(["/samples"]);
// visible-block-start
import { Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import { CssBaseline, AppBar, IconButton, Box, Stack } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

import {
  SampleList,
  SampleCreate,
  SampleEdit,
  SampleShow,
} from "pages/samples";

import { ColorModeContextProvider, ColorModeContext } from "./contexts";

const Header = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  return (
    <AppBar position="sticky">
      <Stack width="100%" direction="row" justifyContent="end">
        <Box marginRight="20px" sx={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "12px" }}>click to toggle the theme →</div>
          <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Box>
      </Stack>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
              {
                name: "samples",
                list: "/samples",
                create: "/samples/create",
                edit: "/samples/edit/:id",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout Header={Header}>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path="samples">
                  <Route index element={<SampleList />} />
                  <Route path="create" element={<SampleCreate />} />
                  <Route path="edit/:id" element={<SampleEdit />} />
                  <Route path="show/:id" element={<SampleShow />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </BrowserRouter>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
};
// visible-block-end
render(<App />);
```

## Notification Snackbars compatible with Theme

We use the [`notistack`](https://iamhosseindhv.com/notistack) library for notifications in our Material UI package provides an elegant way to engage with your users.
The main motivation for us to use the Notistack was that while the Notistack provider ( `<SnackbarProvider>` ) is a child of our ThemeProvider, it works in harmony with the theme.

We provide [`<RefineSnackbarProvider>`](https://github.com/refinedev/refine/blob/main/packages/mui/src/providers/refineSnackbarProvider/index.tsx) that extended `<SnackbarProvider>` with theme style. You have to wrap `<Refine>` with [`<RefineSnackbarProvider>`](https://github.com/refinedev/refine/blob/main/packages/mui/src/providers/refineSnackbarProvider/index.tsx) and also pass the `notificationProvider` as props.

```tsx live
setInitialRoutes(["/samples"]);
// visible-block-start
import { Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
  // highlight-start
  RefineSnackbarProvider,
  useNotificationProvider,
  // highlight-end
} from "@refinedev/mui";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import {
  SampleList,
  SampleCreate,
  SampleEdit,
  SampleShow,
} from "pages/samples";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      {/* highlight-next-line */}
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "samples",
                list: "/samples",
                create: "/samples/create",
                edit: "/samples/edit/:id",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path="samples">
                  <Route index element={<SampleList />} />
                  <Route path="create" element={<SampleCreate />} />
                  <Route path="edit/:id" element={<SampleEdit />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </BrowserRouter>
        {/* highlight-next-line */}
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};
// visible-block-end

render(<App />);
```

If you want to use `notistack` snackbars with the default style, simply wrap `<Refine>` in `<SnackbarProvider>`.

If you want to customize the default layout elements provided with `@refinedev/mui` package, check out the [Custom ThemedLayout](/core/docs/advanced-tutorials/custom-layout/) tutorial.

[create-refine-app]: /core/docs/getting-started/quickstart

```tsx live shared
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  Create,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  MarkdownField,
  Show,
  DateField,
  NumberField,
  TextFieldComponent,
  Edit,
  useAutocomplete,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { useMany, useShow, useOne } from "@refinedev/core";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <MuiMaterial.ThemeProvider
        theme={
          mode === "light"
            ? RefineMui.RefineThemes.Blue
            : RefineMui.RefineThemes.BlueDark
        }
      >
        {children}
      </MuiMaterial.ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const SampleList = () => {
  const { dataGridProps } = useDataGrid();

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "category",
        headerName: "Category",
        valueGetter: ({ row }) => {
          const value = row?.category?.id;

          return value;
        },
        minWidth: 300,
        display: "flex",
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 250,
        display: "flex",
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData?.data],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

const SampleShow = () => {
  const { result: record, query } = useShow();
  const { isLoading } = query;

  const {
    result: category,
    query: { isLoading: categoryIsLoading },
  } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <MuiMaterial.Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextFieldComponent value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        <MarkdownField value={record?.content} />
        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        {categoryIsLoading ? <>Loading...</> : <>{category?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
      </MuiMaterial.Stack>
    </Show>
  );
};

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = query?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: samplesData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <MuiMaterial.Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
          type="number"
          label="Id"
          name="id"
          disabled
        />
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
          type="text"
          label="Title"
          name="title"
        />
        <TextField
          {...register("content", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.content}
          helperText={(errors as any)?.content?.message}
          margin="normal"
          fullWidth
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
          multiline
          label="Content"
          name="content"
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString(),
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.category?.id}
                  helperText={(errors as any)?.category?.id?.message}
                  required
                />
              )}
            />
          )}
        />
      </MuiMaterial.Box>
    </Edit>
  );
};

const SampleCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <MuiMaterial.Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
          type="text"
          label="Title"
          name="title"
        />
        <TextField
          {...register("content", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.content}
          helperText={(errors as any)?.content?.message}
          margin="normal"
          fullWidth
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
          multiline
          label="Content"
          name="content"
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString(),
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.category?.id}
                  helperText={(errors as any)?.category?.id?.message}
                  required
                />
              )}
            />
          )}
        />
      </MuiMaterial.Box>
    </Create>
  );
};
```
