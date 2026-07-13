---
title: Announcing the Release of Refine v4!
description: This release includes several new features that are designed to enhance the developer experience.
slug: refine-v4-announcement
authors: necati
category: "Announcement"
tags: []
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-03-13-refine-v4-announcement%2Frefinev4.png
hide_table_of_contents: false
featured_image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-03-13-refine-v4-announcement%2Ffeatured.png
---

We are thrilled to announce that the **Refine v4** is now officially released!

After a year since the release of v3, we have addressed the most requested and questioned areas by the community. **Refine v4** features better developer experience, and new functionalities to simplify the work of developers. It has also been designed to make Refine accessible on all platforms that support React, and to ensure that it can be seamlessly integrated into new and existing projects.

Throughout the development process, we have carefully analyzed feedback, discussions, and questions raised by the community to enhance the framework. We value ongoing feedback and requests, as they will help us to continue improving and evolving refine.

We would like to express our gratitude to our community for their support in bringing Refine this far! Please feel free to share your requests for Refine v5 with us:)

In this article, we will discuss some of the most significant changes, and we encourage developers to [refer to our comprehensive guide](https://refine.dev/core/docs/migration-guide/3x-to-4x/) to help them migrate their applications.

## What is new in v4?

**Refine v4** includes several new features that are designed to enhance the developer experience. We have introduced abstractions and techniques that make it easier for developers to manage concerns such as data management, routing, authorization, layouts, and more, without limiting the functionality of other tools and libraries they may prefer to use.

One of the best things about v4 is that it provides **100% backward** compatibility, so users can update to the latest version with confidence that their applications will continue to function as expected.

Thanks to full codemod support, the entire upgrade process will be automatically updated when you migrate your Refine project to v4.

## New NPM organization

Refine has recently migrated to a new NPM organization and will be using `@refinedev` as the new NPM organization going forward. As a result of this migration, all of our package names have been updated accordingly.

:::success Thanks to codemod support 🎉

With complete codemod support, updating package names will be effortless when migrating your Refine project to v4.

:::

### Package Name Changes

The following package names have been changed:

 <details>
<summary>Show the table </summary>
<p>

| Old                            | New                        |
| ------------------------------ | -------------------------- |
| @pankod/refine-core            | @refinedev/core            |
| @pankod/refine-cli             | @refinedev/cli             |
| @pankod/refine-inferencer      | @refinedev/inferencer      |
| @pankod/refine-antd            | @refinedev/antd            |
| @pankod/refine-mui             | @refinedev/mui             |
| @pankod/refine-mantine         | @refinedev/mantine         |
| @pankod/refine-chakra-ui       | @refinedev/chakra-ui       |
| @pankod/refine-react-hook-form | @refinedev/react-hook-form |
| @pankod/refine-react-table     | @refinedev/react-table     |
| @pankod/refine-react-router-v6 | @refinedev/react-router-v6 |
| @pankod/refine-nextjs-router   | @refinedev/nextjs-router   |
| @pankod/refine-remix           | @refinedev/remix           |
| @pankod/refine-strapi-v4       | @refinedev/strapi-v4       |
| @pankod/refine-simple-rest     | @refinedev/simple-rest     |
| @pankod/refine-appwrite        | @refinedev/appwrite        |
| @pankod/refine-supabase        | @refinedev/supabase        |
| @pankod/refine-airtable        | @refinedev/airtable        |
| @pankod/refine-hasura          | @refinedev/hasura          |
| @pankod/refine-graphql         | @refinedev/graphql         |
| @pankod/refine-medusa          | @refinedev/medusa          |
| @pankod/refine-nestjsx-crud    | @refinedev/nestjsx-crud    |
| @pankod/refine-ably            | @refinedev/ably            |
| @pankod/refine-kbar            | @refinedev/kbar            |

</p>
</details>

## Bring your own router

Routes is now completely detached from refine.

We have made significant changes to the [`routerProvider`](https://refine.dev/core/docs/api-reference/core/providers/router-provider/) and route handling to improve flexibility and provide unlimited customization options, in response to requests from our community.

We have simplified the `routerProvider` to act solely as a link between Refine and the router, eliminating the need for a specific way of defining routes. This means that Refine will meet enterprise-grade requirements, and users can integrate Refine into their existing projects without needing to modify their current routes or application structure.

With its flexible structure, Refine now has enterprise-grade router support for Next.js, and Remix platforms, providing a seamless experience for developers. This is also a promising sign that Refine will soon provide support for React Native.

[Refer to new enterprise-grade router provider migration guide to React Router v6, Next.js, Remix routers. ](https://refine.dev/core/docs/migration-guide/router-provider/#motivation-behind-the-changes)

## Enterprise-grade routing

We now offer top-notch support for routes for [`resources`](https://refine.dev/core/docs/guides-concepts/general-concepts/#resource-concept). With this new feature, you have complete freedom to create routes that can be tailored to meet the specific needs of your advanced and enterprise use cases. There are no limits or restrictions, so you can create routes that truly fit your unique requirements.

Changes to the `resources` prop in Refine v4 have made it possible for the prop to act as a connection point between your app and API, rather than being mandatory for the router to work. As a result, your router can work without resources, and your resources can work without a router.

In Refine v4, you can define your actions (`list`, `create`, `edit`, `show`, `clone`) as paths instead of components. This will allow you to define custom routes for actions and take advantage of the full potential of your router without being restricted to the routes created automatically.

```tsx
resources={[
    {
        name: "products",
        list: "/:tenantId/products",
        show: "/:tenantId/products/:id",
        edit: "/:tenantId/products/:id/edit",
        create: "/:tenantId/products/create",
    }
]}
```

As you can see, the new enterprise-grade routing structure allows for effortless handling of multi-tenant structures.

## Reduced bundle size

To improve performance and optimize bundle size, we have removed re-exported packages from refine.

While re-exporting can offer advantages such as allowing packages to be used without being loaded, it can also lead to issues with bundle size.

In response to feedback from the community, we made this change as bundle size has become increasingly important for React-based frameworks like Refine that support various CRUD applications with the help of Remix and Next.js.

Removing re-exported packages enables you to achieve the same bundle size as a vanilla React project.

### How it works?

For example the `@refinedev/antd` and package exports have been removed and updated as described in the migration guide.

```diff
- import { useTable, SaveButton, Button, Form, Input } from "@pankod/refine-antd";

+ import { useTable, SaveButton } from "@refinedev/antd";
+ import { Button, Form, Input } from "antd";
```

The following packages are affected:

- @refinedev/antd
- @refinedev/mui
- @refinedev/chakra-ui
- @refinedev/mantine
- @refinedev/react-hook-form
- @refinedev/react-table

Thanks to full codemod support, imports and exports will be automatically updated when you migrate your Refine project to v4.

[You can find more details on the migration guide](https://refine.dev/core/docs/migration-guide/3x-to-4x).

### New Auth Provider

Refine v4 introduces a common interface for the [`authProvider`](https://refine.dev/core/docs/authentication/auth-provider/) methods to improve transparency for developers and facilitate better understanding and debugging. Previously, developers had to resolve the `authProvider` methods upon success and reject them upon failure.

However, this method had its limitations as rejected promises are typically associated with errors or exceptional situations, which could cause confusion for developers and impede the debugging process, especially for non-failure cases like incorrect login credentials.

With the latest update, `authProvider` methods in Refine v4 will always return a resolved promise containing an object with a success key. This key indicates whether the operation was successful or not. In case of failure, an optional error key carrying an Error object can be used to notify users. This enhancement to the `authProvider` interface makes it easier for developers to manage authentication operations and streamline the debugging process.

[Refer to Auth Provider Migration Guide for all implemented updates.](https://refine.dev/core/docs/migration-guide/auth-provider/)

## 🪄 Migrating your project automatically with refine-codemod ✨

We are putting an end to the developer effort that would take hours.

As the Refine team, we use many open-source projects and we are sensitive to breaking changes and version upgrades, which can be challenging. Therefore, for four versions, we have been managing all changes with codemod, and we are delighted about it!

[Refer to Migration guide for details.](https://refine.dev/core/docs/migration-guide/3x-to-4x/#-migrating-your-project-automatically-with-refine-codemod--recommended)

`@refinedev/codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x.`

```
npx @refinedev/codemod@latest refine3-to-refine4
```

The process is complete, and your project now uses `refine@4.x.x.` 🚀

## Changelog

The following Refine packages includes component and hook updates. You can view the details on migration guide by clicking to each one.

- [@refinedev/core](https://github.com/refinedev/refine/blob/main/packages/core/CHANGELOG.md)
- [@refinedev/antd](https://github.com/refinedev/refine/blob/main/packages/antd/CHANGELOG.md)
- [@refinedev/mui](https://github.com/refinedev/refine/blob/main/packages/mui/CHANGELOG.md)
- [@refinedev/mantine](https://github.com/refinedev/refine/blob/main/packages/mantine/CHANGELOG.md)
- [@refinedev/chakra-ui](https://github.com/refinedev/refine/blob/main/packages/chakra-ui/CHANGELOG.md)
- [@refinedev/react-table](https://github.com/refinedev/refine/blob/main/packages/react-table/CHANGELOG.md)
- [@refinedev/react-hook-form](https://github.com/refinedev/refine/blob/main/packages/react-hook-form/CHANGELOG.md)
- [@refinedev/react-router-v6](https://github.com/refinedev/refine/blob/main/packages/react-router-v6/CHANGELOG.md)
- [@refinedev/nextjs-router](https://github.com/refinedev/refine/blob/main/packages/nextjs-router/CHANGELOG.md)
- [@refinedev/remix](https://github.com/refinedev/refine/blob/main/packages/remix/CHANGELOG.md)

## Conclusion

Based on the updates mentioned, it is evident that Refine is continuously improving to provide a better experience for developers.

Thanks to the new enterprise-grade routing structure, you now have access to an unlimited structure for routing in your apps.

In addition, the new common interface for `authProvider` methods allows for easy understanding and debugging without any confusion for developers. Furthermore, the removal of re-exported packages has optimized the bundle size, a critical concern for modern web development.

The support for full codemod provides an effortless upgrade experience for projects. These updates reflect Refine's commitment to listening to its community and enhancing its performance.

We extend our gratitude to our community for supporting us throughout this journey, and we hope that Refine v4 will continue to be a valuable tool for developers worldwide.

If you appreciate Refine and want to see it continue to grow, please don't forget to [give us a star on GitHub](https://github.com/refinedev/refine). Every star counts!⭐

Also, don't forget to join our [community Discord](https://discord.gg/refine) for support and feedback on the latest release.

[To learn more about the new features and changes in Refine v4, check out the full migration guide on GitHub.](https://refine.dev/core/docs/migration-guide/3x-to-4x/)
