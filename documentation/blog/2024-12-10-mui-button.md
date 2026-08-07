---
title: Material UI button in React
description: A complete guide on using Material UI button in a React app
slug: mui-button-in-react
authors: doro_onome
category: "Ecosystem / Integrations"
tags: [material-ui, react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/social.png
hide_table_of_contents: false
last_update: 2024-12-10
---

**This article was last updated on December 10, 2024, to include new sections on Accessibility, Button Animations, and Performance Optimization for Material UI Buttons.**

## Introduction

TL DR:

Briefly, the Material Button is one of the keys in the Material UI user interface through which a React library will allow users or any end user to perform particular actions or make such decisions just with taps or clicks. The variants are available mainly in three forms:
• Text Button: A low-emphasis button for actions like “Cancel.”
• Contained Button: A high-emphasis button with a filled background. It is used for the most important actions, such as those labeled “Submit.”
• Outlined Button: A medium-emphasis button with a border; this is often used for secondary actions.

Material-UI provides a customizable button with various color and size options, icons, and even loading indicators for asynchronous actions.

Material UI is a dynamic React library because it provides numerous component infrastructures for responsive web design. One such essential component is the `Button`.

In this article, we will deeply explore the Material UI `Button` component, its variants, and the different ways it can be used in a React application.

## What is Material UI

Material UI is a React component library that is open source and based on Google's Material Design. It includes a comprehensive set of UI tools to assist developers in building and maintaining React applications, as well as effectively importing components into various parts of their projects. More developers have incorporated Material UI into their projects over the years because it makes the web design process much easier and faster.

The categories of components that Material UI can provide you include Layout components, Navigation components, Input components, and Data Display components. The `Button` is enlisted among the `Input` components.

Install the Material UI library into your project as part of your `package.json` dependencies with the following command:

Use npm
`npm install @mui/material @emotion/react @emotion/styled`

Use yarn
`npm install @mui/material @emotion/react @emotion/styled`

## Getting Started with the Material UI Button component

The Material UI `Button` component provides developers with the tools that are needed to allow users perform actions and make decisions with a single tap/click. Buttons represent actions that users can take.
They are typically placed throughout your user interface in forms, navigation bars, cards, modal popups e.t.c.

The **Material UI Button** component typically comes in three variants:

- Text Button(The default variant)
- Contained Button
- Outlined Button

Here’s an illustration of how you can apply these Material UI Button variants in your React application:

```tsx
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const BasicButtons = () => {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </div>
  );
};

export default BasicButtons;
```

Here’s what they look like:

<br />

 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/button1.png" alt="Text, contained, and outlined button variants" />

### Material UI Button Colors

You can use the `color` prop to apply a color to Material UI buttons from the theme palette.

```tsx
<Button color="secondary">Secondary color theme</Button>
<Button variant="contained" color="success">
    Success color theme
</Button>
<Button variant="outlined" color="error">
    Error color theme
</Button>
```

### Material UI Button Sizes

You can customize the size of Material UI buttons with the `size` prop:

```tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ButtonSizes = () => {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <Button size="small">Small Text Button</Button>
        <Button size="medium">Medium Text Button</Button>
        <Button size="large">Large Text Button</Button>
      </div>
      <div>
        <Button variant="outlined" size="small">
          Small Outlined Button
        </Button>
        <Button variant="outlined" size="medium">
          Medium Outlined Button
        </Button>
        <Button variant="outlined" size="large">
          Large Outlined Button
        </Button>
      </div>
      <div>
        <Button variant="contained" size="small">
          Small Contained Button
        </Button>
        <Button variant="contained" size="medium">
          Medium Contained Button
        </Button>
        <Button variant="contained" size="large">
          Large Contained Button
        </Button>
      </div>
    </Box>
  );
};

export default ButtonSizes;
```

Here’s the result:

<br />
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/buttonSize.png" alt="Button sizes across variants" />

## How to use Material UI Button Component in your React project

### Text Button

Text buttons are typically used for less visible actions, such as those found in dialogs and cards. Text buttons in cards help to keep the focus on the card content.

Here’s a simple illustration of the Material UI Text Button

```tsx
<Button>Primary</Button>
<Button disabled>Disabled Text</Button>
<Button href="#text-buttons">Link Button</Button>
```

<br />
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/textButton.png" alt="Material UI text button examples" />

<br />

This is the default state for the **Material UI Button** component so you do not necessarily have to define this particular variant prop when calling the `Button` component.

### Contained Button

Contained Buttons are high-emphasis buttons that can be identified by their elevation and fill. They indicate the primary actions of your apps. To use a contained button, you need to set the variant `contained` when calling the Material UI `Button` component.

Here’s an example:

```tsx
<Button variant="contained">Contained Button</Button>
<Button variant="contained" disabled>
    Disabled Contained Button
</Button>
<Button variant="contained" href="#contained-buttons">
    Link Contained Button
</Button>
```

<br />
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/containedButton.png" alt="Material UI contained button examples" />

### Outlined Button

Outlined buttons are medium-emphasis buttons that contain actions that are crucial but not the primary action in your app. Additionally, outlined buttons can be used as a higher emphasis alternative to text buttons or a lower emphasis alternative to contained buttons.

You can use Outlined **Material UI button** by specifying the `outlined` prop when calling the `Button` component.

```tsx
<Button variant="outlined">Primary Outlined Button</Button>
<Button variant="outlined" disabled>
    Disabled Outlined Button
</Button>
<Button variant="outlined" href="#outlined-buttons">
    Link Outlined Button
</Button>
```

<br />
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/outlinedButton.png" alt="Material UI outlined button examples" />

### IconButton

An Icon button is a button represented by an icon set to perform a particular action. Icon buttons are typically found in app bars and toolbars. Icons are also appropriate for toggle buttons that allow for the selection or deselection of a single option, such as adding or removing a star from an item.

To include an icon button in your React app, import and use the `IconButton` component. Then you can use whatever icon you want from Material UI.

Here’s a simple illustration:

```tsx
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CameraIcon from "@mui/icons-material/Camera";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const IconButtons = () => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="camera">
        <CameraIcon />
      </IconButton>
      <IconButton aria-label="delete" disabled color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="cancel">
        <CancelIcon />
      </IconButton>
      <IconButton color="primary" aria-label="attach email">
        <AttachEmailIcon />
      </IconButton>
    </Stack>
  );
};

export default IconButtons;
```

Here’s the result:

<br />
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/IconButton.png" alt="Material UI icon button examples" />

### Loading Button

Loading buttons are buttons that can display the loading status of actions in your React apps and disable interactions. To use the `LoadingButton` component, you have to first install the Material UI `lab` dependency with the following command:

```
npm i @mui/lab
```

Now, you can import the `LoadingButton` component from the Material UI `lab` dependency and use it in whatever manner you please. You can customize your `LoadingButton` components by adding a `loading` prop which shows that the button is loading in your app’s UI. You can also set a `loadingIndicator` prop as well.

Here’s a simple illustration of how to use the `LoadingButton` component in your React app:

```tsx
import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";

const LoadingButtons = () => {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Save
      </LoadingButton>
    </Stack>
  );
};

export default LoadingButtons;
```

Here’s the result:
<br />
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/loadingButton.gif" alt="Material UI loading button states" />

### Icon and Label Buttons

Since we are more likely to recognize logos than plain text, you might occasionally want to add icons to certain buttons to improve the user experience of the application. When the `icon` component is assigned to the `startIcon` or `endIcon` props, the icon is aligned to the label's left or right.

Here’s a simple illustration:

```tsx
import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

const IconLabelButtons = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<AddIcon />}>
        Add
      </Button>
      <Button variant="contained" endIcon={<DeleteIcon />}>
        Remove
      </Button>
    </Stack>
  );
};
export default IconLabelButtons;
```

<br />
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/labelButton.png" alt="Material UI icon and label buttons" />

### Performance Optimization for Material UI Buttons

Performance optimization is essential for larger applications to ensure smooth and responsive user experiences. Material UI provides several strategies to reduce app load and improve speed.

### Import Only What You Need

Instead of importing the entire Material UI library, import only the specific components you use. This minimizes the bundle size.

```javascript
// Import only the Button component
import Button from "@mui/material/Button";
```

### Use React.memo

Prevent unnecessary re-renders by wrapping your button components with React.memo. This ensures that the button re-renders only when its props change.

```javascript
import React from "react";

const MyButton = React.memo(({ onClick, label }) => {
  return <Button onClick={onClick}>{label}</Button>;
});

export default MyButton;
```

### Lazy Loading

For larger applications, load components only when they are needed using React’s lazy feature. This helps reduce the initial load time.

```javascript
import React, { Suspense } from "react";

const LazyButton = React.lazy(() => import("@mui/material/Button"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyButton>Click Me</LazyButton>
  </Suspense>
);
```

Benefits:

- Reduced Bundle Size: Importing only required components lowers the size of your application.
- Improved Rendering Efficiency: Using React.memo prevents unnecessary updates, keeping the UI responsive.
- Faster Load Times: Lazy loading ensures that components are loaded on-demand, optimizing resource usage.

## Creating a Calculator UI with light and dark mode using React Material UI Button Component

**Material UI Buttons** can be used for a variety of purposes in your React application. You can use them to take actions, switch directories and execute specific commands in your app. We can showcase some of their uses and function in a Calculator UI with light and dark mode toggling features.

The app will have two components:
The Navbar component
The Main component

### The Navbar Component

This component simply holds the light and dark mode toggler. To achieve this, we will make use of the `ToggleOn` and `ToggleOff` icon buttons.

Here’s the code for the Navbar component:

```tsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const Navbar = () => {
  return (
    <>
      <nav>
        <p>Light</p>
        <div>
          {darkMode ? (
            <IconButton>
              <ToggleOnIcon
                sx={{ fontSize: 50 }}
                onClick={handleToggle}
                className={darkMode ? "toggle-light" : "toggle-dark"}
              />
            </IconButton>
          ) : (
            <IconButton>
              <ToggleOffIcon
                sx={{ fontSize: 50 }}
                onClick={handleToggle}
                className={darkMode ? "toggle-light" : "toggle-dark"}
              />
            </IconButton>
          )}
        </div>
        <p>Dark</p>
      </nav>
    </>
  );
};

export default Navbar;
```

The code above showcases the use of Material UI toggle buttons to create an adequate light and dark mode toggle theme.

Here’s the result:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/navbar.gif" alt="Light and dark mode toggle buttons" />

## Advance Material UI Buttons

### Accessibility (Making Buttons More User-Friendly)

Accessibility is key to creating inclusive and user-friendly applications. Material UI buttons can be made more accessible by using props such as `aria-label`, `aria-hidden`, or `role`. These attributes make sure proper functionality for screen readers and keyboard navigation.

```jsx
<Button aria-label="Save File">Save</Button>
<Button aria-hidden="true">Hidden Button</Button>
```

Adding these small details makes your application usable for everyone, including users with disabilities.

### Button Animations

Animations can enhance the interactivity of buttons and improve the overall user experience. Material UI allows you to easily implement animations for hover, focus, or click effects.

```jsx
<Button
  variant="contained"
  sx={{
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.2s ease-in-out",
    },
  }}
>
  Hover Me
</Button>
```

This example adds a smooth zoom effect when the button is hovered over. For more advanced animations, you can use Material UI’s built-in Fade or Grow components.

Example with Fade:

```jsx
<Fade in={true}>
  <Button>Animated Button</Button>
</Fade>
```

These features make your buttons more engaging and visually appealing.

### The Main Component

This component houses the Calculator’s grid system with all its buttons imported from Material UI.

Here’s the code:

```tsx
import React from "react";
import Button from "@mui/material/Button";

const Main = () => {
  const buttonTexts = [
    "DEL",
    "÷",
    1,
    2,
    3,
    "*",
    4,
    5,
    6,
    "+",
    7,
    8,
    9,
    "-",
    ".",
    0,
  ];

  return (
    <main>
      <div class="calculator-grid">
        <div class="output">
          <div data-previous-operand class="previous-operand"></div>
          <div data-current-operand class="current-operand"></div>
        </div>
        <Button class="span-two" variant="contained">
          AC
        </Button>
        {buttonTexts.map((buttonText) => (
          <Button variant="contained">{buttonText}</Button>
        ))}
        <Button variant="contained" class="span-two">
          =
        </Button>
      </div>
    </main>
  );
};

export default Main;
```

Here’s the result:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/mainComponent.png" alt="Calculator button grid built with MUI" />

<br/>

You can toggle light and dark mode in the `App.js` like this:

```tsx
import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";

function App() {
  const [darkMode, setDarkMode] = useState("false");

  const handleToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className={darkMode ? "dark" : "App"}>
      <Navbar handleToggle={handleToggle} darkMode={darkMode} />
      <Main />
    </div>
  );
}

export default App;
```

Here’s what our final app looks like:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-05-mui-button/final.gif" alt="Final MUI button interaction demo" />

## Conclusion

This article covered **Material UI Buttons** and their applications in different areas of a React application. We also explored a possible use case in a calculator user interface with light and dark mode themes. You can access the source code on my [GitHub Repo](https://github.com/Nomzy-kush/Calculator-UI-with-Light-and-Dark-mode-React-MUI).
You can also see the deployed application [here](https://calculator-ui-with-light-and-dark-mode-react-mui.vercel.app/).
