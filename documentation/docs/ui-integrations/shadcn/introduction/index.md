---
title: "Introduction Guide | Radix UI in Refine v5"
display_title: "Refine + shadcn/ui"
sidebar_label: "Refine + shadcn/ui"
description: "Build Introduction in Refine v5. Learn the key steps. Learn integration patterns for Radix UI, Tailwind CSS for polished admin UIs."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui
---

Refine provides an integration with [shadcn/ui](https://ui.shadcn.com/) components through a registry system. This integration offers a collection of pre-built components that seamlessly work with Refine's features while maintaining shadcn/ui's design principles and accessibility standards.

Unlike traditional package installations, shadcn/ui components are added to your project's source code, giving you full control over styling and customization.

## Key Features

- **🎨 Full Source Code Access**: [shadcn/ui components](https://ui.shadcn.com/docs) are copied directly into your project, giving you complete control over styling, behavior, and structure without package dependencies.

- **♿ Accessibility First**: Built on [Radix UI primitives](https://www.radix-ui.com/primitives) with [WAI-ARIA](https://www.w3.org/WAI/ARIA/) standards, ensuring robust accessibility support including keyboard navigation and screen reader compatibility.

- **🔧 Deep Refine Integration**: Seamlessly works with [Refine's data hooks](https://refine.dev/core/docs/data/hooks/use-list/), authentication, routing, and form handling - less boilerplate, more productivity.

- **📱 Responsive Design**: Built with [Tailwind CSS](https://ui.shadcn.com/docs/components) and mobile-first principles, components automatically adapt to any screen size.

- **🌙 Advanced Theming**: Full light/dark theme support using [CSS custom properties](https://ui.shadcn.com/docs/theming) with flexible customization options.

- **🌍 Internationalization**: Built-in support for Refine's [i18n system](https://refine.dev/core/docs/i18n/i18n-provider/) with RTL languages, localization, and proper formatting.

## Installation

The easiest way to get started is by using Refine's CLI to scaffold a new project with shadcn/ui:

```bash
npm create refine-app@latest my-app -- --preset vite-shadcn
```

### Manual Setup

If you want to add shadcn/ui to an existing Refine project:

1. **Install shadcn/ui in your project**

   Follow the shadcn/ui installation guide based on the React framework you're using with Refine:

   - [Vite](https://ui.shadcn.com/docs/installation/vite)
   - [Next.js](https://ui.shadcn.com/docs/installation/next)

2. **Add Refine-specific components from the registry:**

```bash
npx shadcn@latest add https://ui.refine.dev/r/auto-save-indicator.json
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

## Usage

Refine's shadcn/ui components are designed to work seamlessly with Refine's data hooks and provide common UI patterns needed in admin panels and data-heavy applications.

Here's a simple example showing how to create a data table with sorting, filtering, and pagination using the `DataTable` component:

```tsx
import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";

type Post = {
  id: number;
  title: string;
};

export default function PostList() {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <span>ID</span>
            <DataTableSorter column={column} />
          </div>
        ),
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column, table }) => (
          <div className="flex items-center gap-1">
            <span>Title</span>
            <div>
              <DataTableFilterDropdownText
                defaultOperator="contains"
                column={column}
                table={table}
                placeholder="Filter by title"
              />
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useTable<Post>({
    columns,
    refineCoreProps: {
      resource: "posts",
    },
  });

  return (
    <ListView>
      <ListViewHeader title="Posts" />
      <DataTable table={table} />
    </ListView>
  );
}
```

## Refine Component Registry

Refine provides a growing collection of components through the shadcn/ui registry system. Each component can be installed individually:

### Form Components

- **[Forms](/core/docs/ui-integrations/shadcn/components/forms/)** - Complete form building guide with validation
- **[Auto Save Indicator](/core/docs/ui-integrations/shadcn/components/auto-save-indicator/)** - Visual feedback for auto-save operations

### Data Components

- **[Data Table](/core/docs/ui-integrations/shadcn/components/data-table/)** - Advanced data table with sorting, filtering, and pagination

### Authentication Components

- **[Sign In Form](/core/docs/ui-integrations/shadcn/components/sign-in-form/)** - Ready-to-use sign-in form with validation
- **[Sign Up Form](/core/docs/ui-integrations/shadcn/components/sign-up-form/)** - Ready-to-use sign-up form with validation
- **[Forgot Password](/core/docs/ui-integrations/shadcn/components/forgot-password/)** - Password reset form component

### Layout Components

- **[Layout 01](/core/docs/ui-integrations/shadcn/components/layout/layout-01/)** - Complete application layout with sidebar navigation, header and light/dark theme support.
- **[Theme Provider](/core/docs/ui-integrations/shadcn/components/themed-layout/)** - Theme provider with light/dark theme support.

### View Components

- **[Create View](/core/docs/ui-integrations/shadcn/components/basic-views/create/)** - Create page layout with navigation and breadcrumb
- **[Edit View](/core/docs/ui-integrations/shadcn/components/basic-views/edit/)** - Edit page layout with navigation and breadcrumb
- **[List View](/core/docs/ui-integrations/shadcn/components/basic-views/list/)** - List page layout with navigation and breadcrumb
- **[Show View](/core/docs/ui-integrations/shadcn/components/basic-views/show/)** - Detail page layout with navigation and breadcrumb

### Button Components

- **[Create Button](/core/docs/ui-integrations/shadcn/components/buttons/create-button/)** - Navigation button to create pages
- **[Edit Button](/core/docs/ui-integrations/shadcn/components/buttons/edit-button/)** - Navigation button to edit pages
- **[Delete Button](/core/docs/ui-integrations/shadcn/components/buttons/delete-button/)** - Button with delete confirmation dialog
- **[Show Button](/core/docs/ui-integrations/shadcn/components/buttons/show-button/)** - Navigation button to show pages
- **[List Button](/core/docs/ui-integrations/shadcn/components/buttons/list-button/)** - Navigation button to list pages
- **[Clone Button](/core/docs/ui-integrations/shadcn/components/buttons/clone-button/)** - Button to clone/duplicate records
- **[Refresh Button](/core/docs/ui-integrations/shadcn/components/buttons/refresh-button/)** - Button to refresh data

### Utility Components

- **[Error Component](/core/docs/ui-integrations/shadcn/components/error-component/)** - Error boundary and error display component
- **[Notification Provider](/core/docs/ui-integrations/shadcn/components/notification-provider/)** - Toast notification system

## Styling and Theming

Since components are added to your source code, you have complete control over styling. The components use [shadcn/ui's theming system](https://ui.shadcn.com/docs/theming) based on CSS variables, making it easy to customize colors, spacing, and appearance.

### CSS Variables

The theme system uses HSL color values defined as CSS custom properties. These variables are automatically generated during the `shadcn init` process and can be found in your `globals.css` file:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --muted: 217.2 32.6% 17.5%;
  --accent: 217.2 32.6% 17.5%;
  --destructive: 0 62.8% 30.6%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Theme Customization

You can customize your theme in several ways:

1. **Manual Editing**: Modify the CSS variables in your `globals.css` file directly
2. **Theme Generator**: Use the [shadcn/ui theme editor](https://ui.shadcn.com/themes) to generate custom themes
3. **Interactive Editor**: Try the [TweakCN Theme Editor](https://tweakcn.com/editor/theme) for a visual approach to theme creation

### Adding Custom Themes

To add additional themes beyond light and dark:

```css
[data-theme="blue"] {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... other variables */
}

[data-theme="green"] {
  --primary: 142.1 76.2% 36.3%;
  --primary-foreground: 355.7 100% 97.3%;
  /* ... other variables */
}
```

For more detailed theming options, refer to the [shadcn/ui theming documentation](https://ui.shadcn.com/docs/theming).
