---
title: "UI Library Integration | Refine v4 Compatibility"
display_title: "UI Libraries"
sidebar_label: "UI Libraries"
description: "Understand how Refine v4 integrates with Ant Design, MUI, Mantine, and more. Learn the logic behind headless vs. UI-bound development."
---

Refine's UI library integrations enhance the core functionality by exposing hooks and components, offering prebuilt UI elements with minimal additional, library-specific logic. Refine offers seamless integration with popular UI libraries, allowing you to choose the one that suits your needs. These integrations don't constrain your application's logic. While they provide advantages, you can still create, extend, or mix components independently.

The headless architecture offers the freedom to utilize any UI library or create custom UI integrations. It encapsulates application logic within hooks, helpers, and logical components, making them UI-agnostic and highly composable.

## Available Integrations

Refine has out of the box support for the four libraries that are widely used in the React ecosystem. Each of these has their own composition of components and hooks that are designed to be used seamlessly with little to no effort.

These integrations are made to provide solutions for common use cases such as menus, layouts, action buttons, tables, forms and more while providing a consistent design language with the UI library. Rather than a constraint, these integrations are designed as helpers and extensions to the core functionalities of Refine and the UI libraries.

- [Ant Design with `@refinedev/antd`](/core/docs/ui-integrations/ant-design/introduction)
- [Material UI with `@refinedev/mui`](/core/docs/ui-integrations/material-ui/introduction)
- [Chakra UI with `@refinedev/chakra-ui`](/core/docs/ui-integrations/chakra-ui/introduction)
- [Mantine with `@refinedev/mantine`](/core/docs/ui-integrations/mantine/introduction)

## Prebuilt Components

Refine's UI integration packages exposes prebuilt components that are designed to be used with the UI libraries. These components are compositions of the Refine's functionalities and the UI libraries' components. Since their implementation is based on the UI libraries, they are easy to customize and extend to fit your needs.

### Layouts and Menus

Layouts and menus are one of the common elements of an application, this is why we're providing layout and menu components for the supported UI libraries. While these components are also a composition of the Refine's core functionalities, they fit well with the design language of the UI libraries and provide a seamless integration.

These components are designed to fit the most common needs of an application with a flexibility to customize them to fit your needs. For example, a `<Sider>` component is available in all of the UI integrations which includes a navigation menu with a multi-level support, an authorization check for menu items and a logout button which leverages the `useLogout` hook of refine.

As an addition to the layouts, there is also `<Breadcrumb />` component that is designed to be used with the layouts which offers a breadcrumb navigation for the views.

### Buttons

Refine's UI integrations offer variety of buttons that are built using the appropriate components of the UI libraries and includes many logical functionalities such as authorization checks, confirmation dialogs, loading states, invalidation, navigation and more.

The list of buttons that are available in the UI integrations are:

- `<CreateButton />`
- `<EditButton />`
- `<ListButton />`
- `<ShowButton />`
- `<CloneButton />`
- `<DeleteButton />`
- `<SaveButton />`
- `<RefreshButton />`
- `<ImportButton />`
- `<ExportButton />`

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks.

The list of views that are available in the UI integrations are:

- `<List />`
- `<Show />`
- `<Edit />`
- `<Create />`

### Fields

Field components can be used to render values with appropriate design and format of the UI libraries. These components are built on top of respective components of the UI library and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- `<BooleanField />`
- `<DateField />`
- `<EmailField />`
- `<FileField />`
- `<ImageField />`
- `<MarkdownField />`
- `<NumberField />`
- `<TagsField />`
- `<TextField />`
- `<UrlField />`

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine.

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

### Error Pages

UI integrations of Refine also provides an `<ErrorPage />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

## Customization

While the exported components from the UI integrations mostly accept the props of the underlying UI components, there are cases where you might want to customize these components to fit your needs on both logical and visual level. In these cases, you can use couple of different approaches to achieve your goal, from the most simple to the most complex, here are the options you have:

### Using the props

In many of these components, you'll be able to pass props to override or extend the existing styling and logic. While this is the most simple approach, it might not be enough for some cases. For example, if you want to hide the `<EditButton />` instead of disabling it depending on the user's authorization, you can pass the `accessControl` prop to the component.

```tsx title="edit.tsx"
import { EditButton } from "@refinedev/antd";

<EditButton
  accessControl={{
    hideIfUnauthorized: true,
  }}
/>;
```

### Using the Refine options

Refine has the ability to change some configurations of the components and hooks globally through the `<Refine>` component. This will let the user to change the default logical and visual approaches made in the UI components. For example, we can change the buttons' visibility based on the authorization status through `<Refine>` component. This will effect all of the buttons in the application just by changing it in one place.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

<Refine
    accessControlProvider={{
        can: async ({ resource, action, params }) => { ... },
        options: {
            buttons: {
                hideIfUnauthorized: true,
            },
        },
    }}
/>
```

[To learn more about the options, check out the `<Refine>` component documentation.](/core/docs/core/refine-component)

### Using the `swizzle` command

Refine's CLI has this command called `swizzle` which lets you export the components of the UI integrations and use them in your application. This will let you to change the components in a granular level and use them in your application. You can also use this command to export the `<EditButton />` and change its logic to hide instead of disabling it.

```bash
> npm run refine swizzle

Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/antd

Which component do you want to swizzle?

Buttons
 ◯ CreateButton
 ◯ ShowButton
❯◉ EditButton
Pages
 ◯ ErrorPage
 ◯ AuthPage

(Move up and down to reveal more choices)
```

[To learn more about the `swizzle` command, check out the CLI documentation.](/core/docs/packages/list-of-packages)

> While `swizzle` provides a way to customize the components, it's a one time operation and it may be hard to maintain the changes and keep track of the new features in the future. Swizzling a component will detach it from the related package and it will be your responsibility to keep it up to date.

## Notifications <GuideBadge id="guides-concepts/notifications/" />

One of the most important parts of an application is the notifications and the visual feedbacks. Refine has this built-in notification integration that works automatically when it's needed in cases such as when a request fails or when a form is submitted.

While this integration is not coupled with the UI integrations, it will be a wise choice to use the one that is provided by the UI libraries for a consistent design language. This is why Refine's UI integrations also provides a `notificationProvider` to be used with the notification integration of refine.

Using of the prebuilt notification providers are optional and can be customized, extended or even swapped with a custom implementation if needed.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/mantine";

const App = () => (
  <Refine
    // highlight-next-line
    notificationProvider={useNotificationProvider}
    /* ... */
  >
    {/* ... */}
  </Refine>
);
```

## Custom Implementations

While there are integrations for the popular UI libraries, every app has its own needs and requirements. This is why Refine is designed in a way that it can be used with any UI library or even without one. This is also true for the UI integrations, you can create your own custom UI integration for your needs.

If you've decided to create your own custom UI integration, the source code of the existing UI integrations will be a good starting point for you. You can check out the source code of the UI integrations from the [GitHub repository](https://github.com/refinedev/refine)
