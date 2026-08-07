---
title: How to Build Internal Tools with Low-Code in React Using Refine CORE
description: A step-by-step guide to building low-code internal tools and admin apps using the React-based Refine CORE framework and its core features.
slug: low-code-internal-tools-react
authors: ozgur
category: "How To Build"
tags: [react, admin-panel, tech-industry]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-01-07-internal-tools/internal-tools-blog-banner.png
hide_table_of_contents: false
---

Let's be honest, building internal tools isn't glamorous work. Every company needs admin panels, dashboards, and data management systems, but nobody wants to spend weeks setting up authentication, CRUD operations, forms, and state management for the hundredth time. We've solved these problems already, yet here we are rebuilding them for every new project.

Low-code promises to fix this. And for internal tools? It actually makes sense. These apps don't need fancy animations or pixel-perfect designs—they need to work reliably and ship fast. The real challenge is finding a low-code solution that won't lock you into some proprietary platform or completely screw you over when you need something custom (which you will).

That's why Refine CORE hits different. It's open-source React that gives you the speed of low-code platforms but keeps you in control. You're still writing React and TypeScript. You can use whatever UI library you want. Any backend API works. And when you need custom logic? You just write React, no fighting the framework or finding workarounds.

<!--truncate-->

## What You'll Build

This guide walks you through building a complete admin panel with Refine CORE, demonstrating how to go from zero to production-ready internal tool in under an hour. You'll see how the framework handles the repetitive aspects—data fetching, routing, forms, and notifications—while keeping your code clean and customizable.

## Getting Started: Initialize Your Project

The fastest way to start a Refine CORE project is using the official CLI. It sets up a complete project structure with TypeScript support, modern build tools, and example pages to help you get started immediately.

Open your terminal and run:

```bash
npm create refine-app@latest
```

The CLI will guide you through several configuration options. For this tutorial, select the following:

- **Project template:** `refine-vite` (provides fast development with Vite and hot module replacement)
- **Project name:** `refine-demo` (or choose your preferred name)
- **Backend service:** `data-provider-custom-json-rest` (REST API data provider)
- **UI Framework:** `shadcn` (modern, accessible component library built on Radix UI)
- **Example pages:** `shadcn-example` (includes pre-built blog posts and categories pages)
- **Authentication logic:** `none` (we'll keep it simple for now)
- **Package manager:** `npm` (or use your preference: yarn, pnpm)

![Refine CLI selection interface](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-01-07-internal-tools/refine-cli.png)

Within seconds, the CLI creates a complete project structure with all necessary dependencies, configuration files, and example code. This includes a fully configured development environment with TypeScript, Tailwind CSS, and React Router v7.

Once the initialization completes, navigate to your project directory and install the dependencies:

```bash
cd refine-demo
npm install
```

## Understanding Your Project Structure

Before running the application, let's explore what Refine CORE has generated. The project follows a clean, organized structure designed for scalability.

The `src` directory contains your application code. Inside, you'll find `App.tsx`, which serves as the main configuration file where Refine CORE is initialized with providers and resources. The `components` folder houses two important subdirectories: `refine-ui` contains Refine CORE-specific components like data tables, action buttons, and layout components, while `ui` includes base shadcn/ui components for building your interface.

The `pages` directory contains the CRUD pages for your resources. By default, you'll see folders for blog posts and categories, each containing list, create, edit, and show pages. Finally, the `providers` folder includes your data provider configuration and API constants.

This structure separates concerns effectively—configuration lives in `App.tsx`, reusable components in `components`, page-specific logic in `pages`, and API communication logic in `providers`. As your application grows, this organization keeps your codebase maintainable.

## Exploring the Core Configuration

Open `src/App.tsx` to see how Refine CORE is configured. The `Refine` component wraps your application and accepts several key props that define how your admin panel operates.

The `dataProvider` handles all communication with your backend API. Refine CORE automatically translates method calls like creating, reading, updating, and deleting records into appropriate HTTP requests. The `notificationProvider` manages success and error messages, displaying toast notifications when operations complete. The `routerProvider` integrates with React Router to handle navigation and URL synchronization.

Perhaps most importantly, the `resources` array defines your data entities. Each resource object specifies a name (matching your API endpoint), routes for list, create, edit, and show pages, and metadata like delete permissions. Refine CORE uses this configuration to generate routes automatically and provide context to hooks throughout your application.

The options object includes helpful features like `syncWithLocation`, which keeps URL parameters in sync with table filters and pagination, and `warnWhenUnsavedChanges`, which prevents users from accidentally losing form data.

```tsx title="App.tsx"
<Refine
  dataProvider={dataProvider}
  notificationProvider={useNotificationProvider()}
  routerProvider={routerProvider}
  // highlight-start
  resources={[
    {
      name: "blog_posts",
      list: "/blog-posts",
      create: "/blog-posts/create",
      edit: "/blog-posts/edit/:id",
      show: "/blog-posts/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "categories",
      list: "/categories",
      create: "/categories/create",
      edit: "/categories/edit/:id",
      show: "/categories/show/:id",
      meta: {
        canDelete: true,
      },
    },
  ]}
  // highlight-end
  options={{
    syncWithLocation: true,
    warnWhenUnsavedChanges: true,
  }}
>
  {/* Routes configuration */}
</Refine>
```

## Working with the Data Provider

The data provider is Refine CORE's abstraction for API communication. Open `src/providers/data.ts` to see how it's configured. By default, it uses Refine's fake REST API for testing, but you can easily switch to your own backend by changing the `API_URL` constant.

What makes this powerful is that Refine CORE's hooks automatically use the data provider under the hood. When you call `useTable` in a list page, it invokes the data provider's `getList` method. When you submit a form, hooks like `useCreate` or `useUpdate` call the corresponding data provider methods. This abstraction means you can switch backend services without changing your component code.

The data provider handles pagination, sorting, filtering, and relationships automatically. It parses URL parameters, transforms them into API requests, and normalizes responses. If your API has a different structure, you can customize the data provider methods to match your specific requirements.

## Building Your First CRUD Pages

Let's examine how Refine CORE generates fully functional CRUD pages with minimal code. Navigate to `src/pages/blog-posts/list.tsx` to see the list page implementation.

The list page uses the `useTable` hook from `@refinedev/react-table`, which handles data fetching, pagination, sorting, and filtering automatically. It integrates with TanStack Table (formerly React Table) to provide a powerful, headless table solution. The hook returns everything you need to build a fully functional data table.

```typescript
import { useTable } from "@refinedev/react-table";

const { getHeaderGroups, getRowModel } = useTable({
  columns,
});
```

This replaces dozens of lines you'd typically write for state management, API calls, loading states, and error handling. The table automatically updates when you interact with it—sorting columns, navigating pages, or applying filters all work without additional code.

![Blog posts list page with data table](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-01-07-internal-tools/refine-list.png)

The create and edit pages are equally impressive. Open `src/pages/blog-posts/create.tsx` to see form handling in action. The `useForm` hook from Refine CORE integrates with React Hook Form to provide validation, submission handling, and error management.

```typescript
const {
  refineCore: { onFinish, formLoading },
  handleSubmit,
  control,
} = useForm();
```

Forms automatically populate with existing data in edit mode, validate fields before submission, display error messages, and show loading states during API calls. Success and error notifications appear automatically when operations complete. You can add field-level validation using React Hook Form's built-in validators or integrate libraries like Zod for schema validation.

![Create/Edit form with validation](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-01-07-internal-tools/refine-edit.png)

The show page displays detailed record information using the `useShow` hook, which fetches a single record and provides loading and error states. All these pages follow consistent patterns, making it easy to add new resources or customize existing ones.

## Running Your Admin Panel

Start the development server to see your admin panel in action:

```bash
npm run dev
```

The application launches at `http://localhost:5173` (or another port if 5173 is occupied). You'll see a modern interface with a collapsible sidebar, header with theme toggle, and breadcrumb navigation.

The sidebar displays navigation links for your resources—Blog Posts and Categories. Click "Blog Posts" to view the list page, showing paginated data from Refine's fake REST API. Try clicking column headers to sort, using the search box to filter results, or navigating between pages.

Click the "Create" button to open the creation form. Fill in the fields—title, content, status, and category—then submit. You'll see a success notification, and the list updates automatically to include your new record. The edit button opens a pre-populated form where you can modify existing records. The show button displays detailed information in a read-only view.

![Success notification toast](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-01-07-internal-tools/refine-toast-notification.png)

Every interaction feels smooth and professional. Loading states appear during API calls, errors display helpful messages, and the interface remains responsive throughout. This level of polish typically requires significant development effort, but Refine CORE provides it automatically.

## Understanding the Power of Refine CORE Hooks

What makes Refine CORE truly powerful is its collection of hooks that abstract complex functionality into simple, reusable patterns. These hooks handle data fetching, form management, authentication, and more, all while integrating seamlessly with React Query for caching and optimistic updates.

Data hooks like `useList`, `useOne`, `useCreate`, `useUpdate`, and `useDelete` provide a consistent API for all CRUD operations. They automatically handle loading states, error management, and cache invalidation. When you create a new record, Refine CORE invalidates the list query to fetch fresh data. When you delete a record, it can show an undo notification that reverses the operation if needed.

Table hooks like `useTable` and `useDataGrid` manage complex table state including pagination, sorting, filtering, and selection. They synchronize with the URL so users can bookmark or share specific table views. Form hooks like `useForm` integrate with popular form libraries, providing validation, submission handling, and dirty state tracking.

The `useNavigation` hook provides programmatic navigation with type-safe routes. The `useNotification` hook displays toast messages for success, error, info, and warning scenarios. These hooks work together to create a cohesive development experience where common patterns are solved once and reused everywhere.

## Key Features You Get Out of the Box

Let's appreciate what Refine CORE provides without additional configuration. Your admin panel includes comprehensive CRUD operations for all resources with proper error handling and loading states. The data table supports sorting by any column, filtering by multiple fields, and pagination with configurable page sizes.

Form handling includes validation with helpful error messages, support for different input types, and relationship management for connected resources. The notification system shows success messages when operations complete, error messages when they fail, and supports custom notification types. The responsive layout adapts to mobile devices with a collapsible sidebar and optimized touch interactions.

![Responsive mobile view](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-01-07-internal-tools/refine-mobile.png)

Dark mode support comes built-in with shadcn/ui, allowing users to toggle between light and dark themes. The interface persists their preference across sessions. Routing synchronizes with the URL, making the application bookmarkable and shareable. The breadcrumb navigation shows the current location and provides quick navigation to parent pages.

Perhaps most impressively, Refine CORE includes developer tools for debugging. Press the icon at the bottom to open the Refine Devtools panel, which displays your resources, providers, and active queries. This transparency makes it easy to understand what's happening in your application and debug issues quickly.

## Customization and Flexibility

While Refine CORE provides excellent defaults, you're never locked in. Every component, hook, and provider is fully customizable. Need to add custom business logic to your forms? Simply add it in the `onFinish` handler. Want a different UI library? Refine CORE works with headless hooks that connect to any UI framework.

You can override individual data provider methods to handle special cases in your API. You can create custom hooks that combine multiple Refine CORE hooks for complex workflows. You can build completely custom pages that don't follow CRUD patterns while still using Refine CORE's infrastructure for authentication, routing, and data fetching.

The shadcn/ui components are just React components you can modify directly. They're not packaged in a node module—they live in your `components/ui` directory where you can customize them freely. This approach gives you the benefits of a component library with the flexibility of custom code.

## Connecting to Your Real Backend

When you're ready to connect to your actual backend API, simply update the `API_URL` constant in `src/providers/constants.ts`. If your API follows REST conventions, it should work immediately. If your API has a different structure, you can customize the data provider methods in `src/providers/data.ts`.

For GraphQL backends, install Refine CORE's GraphQL data provider. For Strapi, Supabase, or other specific backends, Refine CORE provides dedicated data providers that handle their unique requirements. The framework supports REST, GraphQL, tRPC, and any custom protocol you need.

## FAQ

**What is low-code development?**
Low-code development uses frameworks and tools that automate repetitive tasks like CRUD operations, forms, and authentication. Instead of writing everything from scratch, you configure pre-built components and focus on business logic. Refine CORE brings this approach to React development.

**Is Refine CORE actually free?**
Yes, Refine CORE is completely open-source under the MIT license. You can use it for commercial projects, modify it, and there are no hidden fees or premium tiers for core functionality.

**Can I use Refine CORE with my existing backend?**
Absolutely. Refine CORE works with any REST API, GraphQL endpoint, or custom backend. Just configure the data provider to match your API structure, and you're good to go.

**What UI libraries work with Refine CORE?**
Refine CORE supports Ant Design, Material UI, Mantine, Chakra UI, and shadcn/ui out of the box. You can also use it headless with any React component library or build your own UI from scratch.

**How long does it take to build an admin panel with Refine CORE?**
A basic admin panel with CRUD operations can be up and running in under an hour. More complex applications with custom workflows might take a few days, but you're still saving weeks compared to building from scratch.

**Do I need to know React to use Refine CORE?**
Yes, Refine CORE is a React framework, so you need React knowledge. But if you know React, you already know how to customize Refine CORE—there's no proprietary syntax or special concepts to learn.

**Can I customize the generated pages?**
Everything is customizable. The generated pages are just React components in your codebase. You can modify them, replace them entirely, or build custom pages that don't follow any pattern.

## Conclusion

This guide has shown you how to build internal tools with low code using Refine CORE, demonstrating that low-code doesn't have to mean low flexibility. By providing intelligent defaults and powerful abstractions, this React low-code framework reduces the time from project initialization to production-ready admin panel from weeks to hours—all while keeping your codebase clean, maintainable, and fully customizable.

You now have a complete admin panel featuring full CRUD operations, sortable and filterable data tables, validated forms with error handling, automatic notifications, responsive layouts with dark mode support, and all the infrastructure needed to scale to complex applications.

Whether you're building admin panels, internal dashboards, B2B applications, or customer portals, Refine CORE's low-code approach accelerates development without sacrificing the control and flexibility that professional applications demand. The framework grows with your needs, supporting advanced features like access control, audit logging, real-time updates, and internationalization when you need them.

Ready to start building? Check out the [Refine CORE documentation](https://refine.dev/core/docs) for advanced topics, explore the [Refine low-code examples](https://refine.dev/core/templates) for real-world use cases, and join the [community](https://discord.gg/refine) to connect with other developers building with Refine.
