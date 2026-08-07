---
title: "shadcn/ui ThemedLayout Component | Layout in Refine v5"
display_title: "<ThemeProvider />"
sidebar_label: "<ThemeProvider />"
description: "Build ThemedLayout in Refine v5. Learn the key steps. Learn integrate system and controls for polished admin UIs. Hands-on examples included."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/theme
---

Modern admin dashboards should support both light and dark themes. Users often prefer dark mode for late-night work, while others prefer light mode during the day. This theme system provides everything you need to add theme switching to your Refine app.

The system includes a provider for theme management, toggle buttons for quick switching, and dropdown selectors for explicit theme choice. It automatically saves the user's preference and supports system theme detection.

## Installation

Add the theme system to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/theme-provider.json
```

This installs the complete theme system with light/dark/system theme support.

## Setup

First, wrap your app with the theme provider:

```tsx
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="refine-ui-theme">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

The `defaultTheme="system"` means it will automatically match the user's operating system preference. The theme choice is automatically saved to localStorage so users don't have to re-select their preference.

## Adding Theme Controls

Now you can add theme switching controls to your layout. The most common approach is adding a theme toggle to your header:

```tsx
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { ThemeSelect } from "@/components/refine-ui/theme/theme-select";

function Layout() {
  return (
    <div>
      <header className="flex items-center justify-between p-4">
        <h1>My Admin Dashboard</h1>
        {/* Quick theme toggle button */}
        <ThemeToggle />
      </header>

      {/* Or use a dropdown in user menus */}
      <nav>
        <ThemeSelect />
      </nav>
    </div>
  );
}
```

The `ThemeToggle` cycles through light → dark → system themes with each click. The `ThemeSelect` shows a dropdown with explicit options.

## Custom Theme Control

You can also build custom theme controls using the `useTheme` hook:

```tsx
import { useTheme } from "@/components/refine-ui/theme/theme-provider";

function CustomThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <span>Current: {theme}</span>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
```

## API Reference

### ThemeProvider

| Prop           | Type                            | Default             | Description                       |
| -------------- | ------------------------------- | ------------------- | --------------------------------- |
| `children`     | `ReactNode`                     | -                   | Child components                  |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"`          | Default theme when none is stored |
| `storageKey`   | `string`                        | `"refine-ui-theme"` | localStorage key for persistence  |

### ThemeToggle

Cycling button that switches between themes.

| Prop        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `className` | `string` | Additional CSS classes |

### ThemeSelect

Dropdown menu for theme selection.

### useTheme Hook

| Return Value | Type                                             | Description              |
| ------------ | ------------------------------------------------ | ------------------------ |
| `theme`      | `"light" \| "dark" \| "system"`                  | Current theme            |
| `setTheme`   | `(theme: "light" \| "dark" \| "system") => void` | Function to change theme |
