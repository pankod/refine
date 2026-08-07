---
id: mui-custom-theme
title: Theme
---

Theme specifies the color of the components, the darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc. You can either create your own Theme or use Themes that provide from Refine. There are two types of Themes: [`LightTheme`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/theme/index.ts#L16) and [`DarkTheme`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/theme/index.ts#L46). [`LightTheme`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/theme/index.ts#L16) tend to have dark text on a light background, while [`DarkTheme`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/theme/index.ts#L46) have light text on a dark background. Theme provides a way to your app's design to meet them.

[Refer to the Material UI documentation for more information about Material UI Theming. &#8594](https://mui.com/material-ui/customization/theming/)

## Theme Provider

The [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) component is a simple wrapper around React's Context API that allows you to inject a Theme object into your application. By default, Material UI components come with a default Theme. In addition, you can also use the ThemeProvider component to inject a custom theme that you have created yourself. This is a feature that allows for great flexibility in how you design your application.

```tsx title="src/App.tsx
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  // highlight-next-line
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={YOUR_THEME_OBJECT}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        ReadyPage={ReadyPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "posts",
            list: PostsList,
            create: PostCreate,
            edit: PostEdit,
          },
        ]}
      />
      // highlight-next-line
    </ThemeProvider>
  );
};

export default App;
```

:::tip
We recommend using [`create refine-app`][create-refine-app] to initialize your Refine projects. It configures the project according to your needs including SSR and Theme with Next.js.
:::

## Passing the Theme to ThemeProvider

In order to use the theme in your app, you just have one choice: pass it on! Refine provide two types of themes [`LightTheme`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/theme/index.ts#L16) and [`DarkTheme`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/theme/index.ts#L46).

If you don't wrap your app with [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) and theme, it looks like this when using the Material UI default:

```tsx live previewOnly disableScroll
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        ReadyPage={ReadyPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "samples",
            list: SampleList,
            create: SampleCreate,
            edit: SampleEdit,
            show: SampleShow,
          },
        ]}
      />
    </>
  );
};

render(<App />);
```

In our example, we will be using LightTheme.

The design will change to match the `LightTheme`, so you can enjoy these amazing interfaces without any hassle!

```tsx live
// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  // highlight-next-line
  LightTheme,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const App: React.FC = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        ReadyPage={ReadyPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "samples",
            list: SampleList,
            create: SampleCreate,
            edit: SampleEdit,
            show: SampleShow,
          },
        ]}
      />
    </ThemeProvider>
  );
};
// visible-block-end

render(<App />);
```

## Overriding Variables

The best way to customize your theme is by changing the configuration variables. These sections cover some of those most important options, like [`palette`](https://mui.com/material-ui/customization/palette/) and [`typography`](https://mui.com/material-ui/customization/typography/)!

```tsx title="src/App.tsx"
import { LightTheme } from "@pankod/refine-mui";

const overridedLightTheme = {
  ...LightTheme,
  // highlight-start
  palette: {
    ...LightTheme.palette,
    primary: {
      main: "#44d0c7",
    },
    secondary: {
      main: "#2f82f1",
    },
  },
  // highlight-end
};
```

:::tip
Get a designer's opinion anyway - you'll be happy with the end result!
:::

When we easy-override our LightTheme, it's going to look like this:

```tsx live previewOnly disableScroll
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  // highlight-next-line
  LightTheme,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const overridedLightTheme = {
  ...LightTheme,
  // highlight-start
  palette: {
    ...LightTheme.palette,
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
    <ThemeProvider theme={overridedLightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        ReadyPage={ReadyPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "samples",
            list: SampleList,
          },
        ]}
      />
    </ThemeProvider>
  );
};

render(<App />);
```

You can also change the Default Font Family. Refine uses the [`Montserrat`](https://fonts.google.com/specimen/Montserrat) font family by default and you can change it like this:

```tsx title="src/App.tsx"
import {
  LightTheme,
  // highlight-next-line
  TypographyVariantsOptions,
} from "@pankod/refine-mui";

// highlight-start
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
// highlight-end

const overridedLightTheme = {
  ...LightTheme,
  // highlight-start
  ...typography,
  // highlight-end
};
```

[Refer to the Material UI documentation for more information about Material UI Theme Configuration Variables. &#8594](https://mui.com/material-ui/customization/theming/)

:::info
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
    <title>refine adding font family example</title>
  </head>

  <body>
    ...
  </body>
</html>
```

:::

## Create Custom Theme

With the help of Refine's themes, you can customize your site in a matter of minutes. Alternatively, there is also an option to create a custom theme with the [`createTheme()`](https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme) method so you can create a custom theme with the configuration variables and use it in the whole application.

:::tip
You can use the responsiveFontSizes() helper to make Typography font sizes in your theme automated.
For more information, you can review [`responsiveFontSizes()`](https://mui.com/material-ui/customization/typography/#responsive-font-sizes) in the mui document.
:::

```tsx live
// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  // highlight-next-line
  createTheme,
  // highlight-next-line
  responsiveFontSizes,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

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
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        ReadyPage={ReadyPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "samples",
            list: SampleList,
          },
        ]}
      />
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
import "@pankod/refine-mui";

export interface CustomTheme {
  customVariable: {
    custom: string;
  };
}

declare module "@pankod/refine-mui" {
  interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
  interface ThemeOptions
    extends import("@pankod/refine-mui").ThemeOptions,
      CustomTheme {}
}
```

You can see an example of how to [`create your own theme with custom variables`](https://github.com/refinedev/refine/blob/v3/examples/finefoods-material-ui/src/theme.ts) and its [`interface`](https://github.com/refinedev/refine/blob/v3/examples/finefoods-material-ui/src/interfaces/theme.d.ts) by accessing the links.

## Dark Mode

You might prefer to use dark mode in your applications. If you want to add dark mode to your application, you can easily use [`useMediaQuery`](https://mui.com/material-ui/react-use-media-query/) to set your color mode or dynamic toggle to switch your mode by using a context. This will help you maintain a consistent look and feel throughout your app.

### System Preference

With the [`useMediaQuery`](https://mui.com/material-ui/react-use-media-query/) hook, you can query a user's preference for light or dark mode and then adjust your site accordingly. This will make things easier on those who prefer darker colors as it simplifies their experience by eliminating any confusion about what browser they are using!
For example:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  // highlight-next-line
  useMediaQuery,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

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
    <ThemeProvider theme={prefersDarkMode ? DarkTheme : LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        ReadyPage={ReadyPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "samples",
            list: SampleList,
            create: SampleCreate,
            edit: SampleEdit,
            show: SampleShow,
          },
        ]}
      />
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
import { ThemeProvider } from "@pankod/refine-mui";
import { DarkTheme, LightTheme } from "@pankod/refine-mui";

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
      <ThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
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
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  CssBaseline,
  RefineSnackbarProvider,
  useNotificationProvider,
  AppBar,
  IconButton,
  Box,
  Stack,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { LightModeOutlines, DarkModeOutlined } from "./icons";

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
        <Refine
          notificationProvider={useNotificationProvider}
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          ReadyPage={ReadyPage}
          Layout={Layout}
          catchAll={<ErrorComponent />}
          Header={Header}
          resources={[
            {
              name: "samples",
              list: SampleList,
              create: SampleCreate,
              edit: SampleEdit,
              show: SampleShow,
            },
          ]}
        />
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

[You can use this CodeSandbox link to access this example. &#8594](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/customization-theme-material-ui/?view=preview&theme=dark&codemirror=1)

```tsx live previewOnly previewHeight=450px disableScroll
// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  CssBaseline,
  RefineSnackbarProvider,
  useNotificationProvider,
  AppBar,
  IconButton,
  Box,
  Stack,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { LightModeOutlines, DarkModeOutlined } from "./icons";

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
        <Refine
          notificationProvider={useNotificationProvider}
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          ReadyPage={ReadyPage}
          Layout={Layout}
          catchAll={<ErrorComponent />}
          Header={Header}
          resources={[
            {
              name: "samples",
              list: SampleList,
              create: SampleCreate,
              edit: SampleEdit,
              show: SampleShow,
            },
          ]}
        />
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

We provide [`<RefineSnackbarProvider>`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/providers/refineSnackbarProvider/index.tsx) that extended `<SnackbarProvider>` with theme style. You have to wrap Refine with [`<RefineSnackbarProvider>`](https://github.com/refinedev/refine/blob/v3/packages/mui/src/providers/refineSnackbarProvider/index.tsx) and also pass the `notificationProvider` as props.

```tsx live
// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  LightTheme,
  // highlight-start
  RefineSnackbarProvider,
  useNotificationProvider,
  // highlight-end
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      {/* highlight-next-line */}
      <RefineSnackbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
          ReadyPage={ReadyPage}
          Layout={Layout}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "samples",
              list: SampleList,
              edit: SampleEdit,
              create: SampleCreate,
              show: SampleShow,
            },
          ]}
        />
        {/* highlight-next-line */}
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};
// visible-block-end

render(<App />);
```

:::tip
If you want to use notistack snackbars with the default style, simply wrap Refine in `<SnackbarProvider>`.
:::

[create-refine-app]: /core/docs/3.xx.xx/getting-started/quickstart/

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
  DataGrid,
  GridColumns,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  MarkdownField,
  Show,
  Typography,
  DateField,
  NumberField,
  TextFieldComponent,
  Edit,
  useAutocomplete,
  TextField,
  Autocomplete,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { useMany, useShow, useOne } from "@pankod/refine-core";

const LightModeOutlined = (props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="white" {...props}>
      <path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
    </svg>
  );
};

const DarkModeOutlined = (props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path>
    </svg>
  );
};

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
      <RefineMui.ThemeProvider
        theme={mode === "light" ? RefineMui.LightTheme : RefineMui.DarkTheme}
      >
        {children}
      </RefineMui.ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const SampleList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColumns<any>>(
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
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
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
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

const SampleShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <RefineMui.Stack gap={1}>
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
        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
      </RefineMui.Stack>
    </Show>
  );
};

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = queryResult?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: samplesData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <RefineMui.Box
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
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
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
      </RefineMui.Box>
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
      <RefineMui.Box
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
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
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
      </RefineMui.Box>
    </Create>
  );
};
```
