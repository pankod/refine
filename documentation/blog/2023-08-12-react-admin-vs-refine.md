---
title: React-admin vs Refine CORE - Which React Framework is Best for B2B Apps?
description: We'll compare the architectural structures of two web development frameworks - Refine CORE and React-admin.
slug: react-admin-vs-refine
authors: ali_emir
category: "Alternatives"
tags: [react, admin-panel, comparison]
hide_table_of_contents: false
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-12-react-admin-vs-refine/social-2.png
---

## Introduction

In this article, we compare the architectural structures of two web development frameworks: **Refine CORE** and **React-admin**. Both frameworks simplify the development process and offer features for building any type of CRUD apps like internal tools and admin panels.

**Update (February 2026):** Refine CORE has released **v5**, which brings React 19 support, TanStack Query v5 integration, and significant performance improvements. This comparison has been updated to reflect the latest capabilities of Refine CORE v5.

While code examples could help illustrate our points, directly comparing code might not give an accurate picture. During the app development process, developers write code with a particular purpose and design in mind, which renders our intervention unnecessary in this aspect. Also, the code you write in Refine closely resembles regular vanilla React code and doesn't deviate significantly from its configuration.

This is why you won't find explicit code examples. Refine's philosophy fully embraces this approach, ensuring that the maximum point of customization is achieved.

Refine doesn't focus on problems that have already been solved; instead, it centers around tackling the unresolved ones. On the contrary, Refine’s philosophy is to provide the best developer experience for any use case without interfering the developer’s way of doing things but providing critical solutions for the common problems.

If we were to summarize the comparison with an analogy, if you think Refine as Lego Technique, then React-admin would be like Lego Duplo.

Whether you are an experienced developer seeking a powerful and adaptable framework or a newcomer venturing into web development, this article aims to equip you with the knowledge to make an informed decision.

## About Refine CORE

Refine CORE is an open-source framework built on React, aimed at streamlining and accelerating web application development specifically .

With the start of the Refine CORE project in 2021, it received significant interest from the open-source community. As a result, it continued to evolve and grow in a consistently community-driven manner.

This traction from the open-source community led to the establishment of Refine Corp in the US in 2022. The company was dedicated to further developing the project with a skilled team of 10 individuals. Shortly after its inception, Refine Corp received pre-seed investment from 500 Global VC.

The seed round, supported by investors such as Senovo, 500 Emerging Europe, Palmdrive Capital, 8vdx, STONKS, in addition to influential angel investors like David J. Phillips and Theo Brown, advances our efforts in bringing Refine CORE to the forefront of enterprise adoption.

In 2023, Refine CORE also backed by YCombinator, solidifying its position as a promising venture.

With over 32K+ monthly active developers using it and an impressive 27K+ GitHub stars earned in just a year and a half, Refine CORE has gained significant popularity within the developer community.

According to [OSS Insight data](https://ossinsight.io/collections/react-framework/), since the beginning of 2023, it has consistently ranked in the top three of trending React frameworks and web frameworks.

Continuing to reinforce its commitment to open source, Refine CORE remains committed to progress, continually developing new features, organizing hackathons, and presenting widely-used examples during Refine Weeks. Additionally, with its enterprise edition, Refine CORE effectively meets the professional requirements of developers and offers comprehensive support.

Refine CORE community interaction has significaly higher pace than react-admin.

## About react-admin

React-admin is an open-source frontend framework developed by Marmelabs, an agency based in France, founded in 2010. The project started in 2016. React-admin offers an enterprise package for professional features and support.

The framework aims to speed up the process of building administration interfaces and dashboards for web applications. It provides developers with pre-built components with one UI library to create admin panels with various features, potentially reducing development time and effort. As of now, it has gained 23,500 GitHub stars and is utilized by more than 10,000 companies throughout its 7-year journey.

It is specifically tailored for data-intensive applications like admin panels, dashboards, and internal tools and any CRUD apps.

## Architecture

Refine CORE is based on hooks and atomic components, which makes it highly customizable and extensible. It also provides a set of built-in components that can be used out of the box. It has a headless architecture, which means you're not limited to using the built-in UI integrations but it provides built-in UI integrations for the most popular libraries such as Material UI, Ant Design, Chakra UI, and Mantine.

Refer to [section](https://hackmd.io/n6H-yTk4TwqUREz6RVyeQw?both#Differences-in-supported-UI-frameworks-between-refine-and-react-admin) for the differences in supported UI frameworks between Refine CORE and react-admin.

React-admin is component based and only supports Material UI. While you're good to go with the most basic cases, it lacks the extensibility and customizability that Refine CORE provides with its hook based approach.

Refine CORE provides simple interfaces for users to integrate to their use cases, this is not just limited to UI integrations but also data providers, routing, authentication, authorization and more.

### Refine CORE's advantages on architecture

The headless approach of Refine CORE makes it possible to use it with any UI library and implementation. It enables endless possibilities for customization and extensibility. This possibilities is not limiting encapsulation and Refine CORE is still able to provide complex logic and features out of the box with no extra effort but also provides the ability to customize and extend these features with no hassle and annoying workarounds.

JavaScript community is evolving rapidly and new libraries and approaches are being introduced every day. Refine CORE is aware of the fact that there will be better solutions for the problems of today and tomorrow and it is designed to be flexible and extensible to adapt to these changes with ease.

While not enforcing users to a single way of doing things, Refine CORE's approach is to empower the other libraries and approaches and provide interfaces for them to work together.

For example, if you're using Next.js or Remix, you won't be missing any of the features they offer, on the contrary, you'll be able to use them with Refine CORE and get the best of both worlds.

## Bundle Size and Performance

While both frameworks have taken the necessary steps for the performance measures, Refine CORE stands out with its headless architecture and separated packages which makes a huge difference in bundle size. Refine CORE's flexible architecture also makes it possible to adapt to any performance measures and follow industry standards with ease.

### Bundle Size

For example, if you're using `react-admin`, you're dealing with a bundle size of `~1.2MB` minified and `315.9KB` minified + gzipped.

On the other hand, Refine CORE's core package (`@refinedev/core`) only `200KB` minified and `~57KB` minified + gzipped. To make it a fair comparison, let's also add `@refinedev/mui` UI package to the equation, which is `~250KB` minified and `69KB` minified + gzipped.

Even with the UI package, Refine CORE bundle size is still more than 50% smaller than react-admin.

**Measurements from Bundlephobia**

- [`@refinedev/core`](https://bundlephobia.com/package/@refinedev/core@4.34.0)
- [`@refinedev/mui`](https://bundlephobia.com/package/@refinedev/mui@5.10.0)
- [`@refinedev/antd`](https://bundlephobia.com/package/@refinedev/antd@5.31.0)
- [`@refinedev/chakra-ui`](https://bundlephobia.com/package/@refinedev/chakra-ui@2.23.0)
- [`@refinedev/mantine`](https://bundlephobia.com/package/@refinedev/mantine@2.24.0)
- [`react-admin`](https://bundlephobia.com/package/react-admin@4.12.2)

### Performance

- Data fetching without blocking the rendering
- SWR (Stale While Revalidate) support out of the box.
- Query caching and deduplication

**While some of these features are also available in react-admin, Refine CORE's ability to tweak and customize these features makes it possible to customize for any use case and Refine CORE's flexible nature makes it possible to adopt any performance related standards and measures both for your project and the framework itself with constant development.**

## Headless Architecture

This unique approach enables Refine CORE to seamlessly integrate with any UI framework, regardless of whether it comes with built-in integration or not. As new UI libraries emerge, you can trust Refine CORE's compatibility without hesitation.

In contrast, react-admin lacks a headless architecture and is tightly coupled to Material UI. On the other hand, Refine CORE can smoothly adapt to any UI library and even includes pre-built UI integrations for the most popular options.

While React-admin's component-based architecture brings numerous components, this can hinder extensibility and customization. Users might find their options limited to these components, some of which are exclusively available in an enterprise edition behind a paywall. This contrasts with Refine CORE's more open approach to development

### Headless in Routing

Just as it is mentioned in the previous sections, Refine CORE is not limited to a single routing method or library. It provides a simple routing interface with built-in integrations for the most popular libraries out of the box and it can easily be integrated with any routers or the built-in integrations can be customized to fit your needs.

This makes it possible to use Refine CORE in any platform you want. It can be used in React Native, Electron, Next.js, Remix etc. without requiring any extra steps for the setup.

## Routing and SSR (Server Side Rendering)

### Routing

This is one of the unique features of Refine CORE that makes it possible to use any of the advantages and the approaches offered by the routing framework or the library without any limitations or workarounds.

You won't be missing any of the features that React Router, Next.js or Remix offers, on the contrary, you'll be able to use them with Refine CORE and get the best of both worlds.

Refine CORE won't interfere with your routing method or library, it will only provide the necessary interfaces for you to integrate with Refine CORE and use it with ease.This makes it possible to use Refine CORE in any platform you want. It can be used in React Native, Electron, Next.js, Remix etc. without requiring any extra steps for the setup.

This flexibility and adaptability is not possible with React-admin since it is tightly coupled with react router and interferes with the routing system.

### Server Side Rendering

Server Side Rendering or Static Site Generation is a great way to improve the initial load time of your application and improve the SEO. While react-admin does not support such methods with integration with their data providers, Refine CORE enables you to use any data provider with any SSR method you prefer.

The difference between the two frameworks starts with the handling of the routing system. react-admin uses `react-router` for routing and it is tightly coupled with the framework. On the other hand, Refine CORE has a simple routing interface that can easily be implemented with any routers. It also provides built-in routing integrations for the most popular libraries such as `react-router`, Next.js and Remix.

Like it's mentioned in the previous section, Refine CORE can be used in any platform you want with any routing method you prefer. It can even be used with React Native and Electron.

While SSR and custom routing frameworks are an option with Refine CORE, react-admin does not provide such support for them.

React-admin's way of Next.js integration is actually a workaround and it is not a real integration considering the fact that it needs to be rendered in a route with `react-router` and rather than providing a way to use Next.js features, it actually prevents you from using them properly.

**Examples**

Check out these basic examples from Refine CORE's documentation:

- [Refine CORE + next.js](https://github.com/refinedev/refine/tree/main/examples/with-nextjs)
- [Refine CORE + remix](https://github.com/refinedev/refine/tree/main/examples/with-remix-antd)
- [Refine CORE + React Native](https://github.com/abdellah711/refinenative) (Community Package ❤️)

## Multitenancy

Refine CORE's routing integration allows users to define nested paths with additional parameters and use them in their data providers out of the box. This also comes with the ability to define meta values for resources. This functionality is complemented by the capacity to define meta values for resources, facilitating the creation of multitenant applications in a straightforward manner.

In contrast, react-admin lacks these out-of-the-box capabilities.

You can define such routes like the following and combine these routes with the access control to create multitenant applications.:

- `/admin/:tenantId/posts`
- `/admin/:tenantId/posts/:id`

The `tenantId` parameter will be available in the data provider and you can use it while interacting with your backend.

These small features lead to a huge difference in the development experience, you won't be needing any workarounds or hacks to make Refine CORE work for your case. On the contrary, Refine CORE's philosophy is to provide the best developer experience for any use case without interfering the developer's way of doing things but providing critical solutions for the common problems.

**Examples**

Check out the following example of multitenant app built with Refine CORE:

- [Multitenancy with Refine CORE + Strapi](/core/docs/guides-concepts/multitenancy/)

## Differences in supported UI frameworks between Refine CORE and react-admin,

### Refine CORE has built-in support for four UI Frameworks:

Refine CORE comes with a wide array of ready-made integrations for popular UI frameworks, including [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience. This out-of-the-box support offers developers the convenience of building any type of CRUD app like internal tools and admin panels with their preferred UI libraries without the need for extensive manual configurations.

As we mentioned before, Refine CORE is headless by default, which means developers can implement any UI framework or use custom CSS to style their apps. This nature provides unparalleled flexibility, making it easy to integrate popular CSS frameworks like [TailwindCSS](https://tailwindcss.com/) seamlessly.

For example, with Refine CORE's [PrimeReact](https://primereact.org/) UI library [example](https://refine.dev/blog/building-react-admin-panel-with-primereact-and-refine/), we showed how effortlessly integrate external UI libraries and tailor the apps to their exact requirements. This level of customization enables developers to craft apps that align perfectly with their design preferences and project needs.

### React-admin's Limitations:

#### Supporting Only Material-UI:

In contrast, react-admin only supports Material UI. While Material-UI is a robust and feature-rich library, being confined to a single UI framework may restrict developers' design choices and flexibility. Developers who prefer working with other UI frameworks may face challenges in integrating their preferred components seamlessly.

#### No Headless Architecture:

Moreover, react-admin lacks a headless architecture, which limits the freedom to incorporate custom CSS or integrate third-party CSS libraries without workarounds. This may be a drawback for developers who seek to create unique and distinct internal tools that diverge from Material UI's predefined styles.

#### Many Features are Behind a Paywall:

Another limitation of react-admin is that many features are behind a paywall. Many of the free features offered by Refine CORE such as realtime support, custom form layouts or even multi level menu support is only available in the enterprise edition, which may be a deal-breaker for developers who seek to build apps without paying for additional features.

## Unique Refine CORE Features: Differentiating From React-admin

Refine CORE sets itself apart with a host of unique features that are not completely found in react-admin. From the powerful KBAR command palette to the advanced access control options, Refine CORE offers developers a comprehensive toolkit for creating efficient and customized applications.

1. **Headless**

This architecture enables endless possibilities for implementations, customizations and extensibility without limiting the user's way of doing things.

2. **Using in existing projects**

Refine CORE's philosophy to be a companion for the developer not only comes when you start a new project but also when you need to integrate it to an existing project. Refine CORE integrates with the UI libraries, authentication and routing but it does not interfere with them and is actually detached from them. This makes it possible to integrate Refine CORE to an existing project without needing to change anything in your project or tackle with any conflicts.

You can do incremental adoption of Refine CORE to your project and start using it for the parts you need or just use it for the parts you need and keep using your existing libraries for the other parts. This is as simple as adding a `<Refine>` component to your project.

3. **Routing Flexibility**

While React Router, Next.js, Remix, and any other routing library can be seamlessly integrated with Refine CORE, React Router is the only routing library supported by react-admin.

Refer to [this](#routing) section for details.

4. **Real SSR Support**

The SSR methods provided by your framework can be used with Refine CORE without any issues and limitations. On the other hand, react-admin does not have a real SSR support.

Refer to this [section](#server-side-rendering) for details.

5. **Advanced Access Control Provider:**

While both react-admin and Refine CORE offer access control features, Refine CORE takes it a step further with additional options like LDAP (Lightweight Directory Access Protocol), ACL (Access Control List), and ABAC (Attribute-Based Access Control).

6. **Multitenancy Support:**

Refine CORE provides built-in support for [multitenancy](/core/docs/guides-concepts/multitenancy/), allowing developers to create applications that serve multiple tenants with separate data and settings.

Refer to [this](#multitenancy) section for details.

7. **KBAR - Command Palette:**

Refine CORE comes with a powerful feature called [KBAR](https://refine.dev/core/docs/packages/documentation/command-palette/), which is a command palette that enables users to execute various actions using keyboard shortcuts. With KBAR, users can quickly search for and execute commands, significantly enhancing the overall user experience and productivity.

8. **Notification Provider:**

In Refine CORE, developers have access to a [Notification Provider](https://refine.dev/core/docs/api-reference/core/providers/notification-provider) that allows them to send notifications to users within the application. This feature is essential for providing timely updates, alerts, and messages, enhancing communication and user engagement.

## Common Features: Free in Refine CORE, Requires enterprise package in react-admin

Refine CORE offers a range of powerful features that are available for free. In contrast, some of these features require purchasing the enterprise package in react-admin. Let's explore the key features that differentiate the two frameworks:

| Feature                            | Refine CORE | react-admin |
| ---------------------------------- | ----------- | ----------- |
| RBAC (Role-Based Access Control)\* | ✅          | 🟡          |
| Real-time\*\*                      | ✅          | 🟡          |
| Breadcrumb                         | ✅          | 🟡          |
| Audit Log                          | ✅          | 🟡          |
| Editable Table                     | ✅          | 🟡          |
| Markdown                           | ✅          | 🟡          |
| Multi Level Menu                   | ✅          | 🟡          |
| Modal Form                         | ✅          | 🟡          |
| Step Form                          | ✅          | 🟡          |
| AutoSave                           | ✅          | 🟡          |
| Calendar\*\*\*                     | ✅          | 🟡          |

✅ Indicates that the feature is available in Refine CORE for free,
🟡 Indicates that the same feature is available in react-admin but requires the purchase of an Enterprise Package.

\*Refine CORE takes it a step further with additional options like LDAP (Lightweight Directory Access Protocol), ACL (Access Control List), and ABAC (Attribute-Based Access Control) for free to use.

\*\*In Refine CORE, the real-time feature offers two modes: auto and manual, giving developers flexibility in how they handle real-time updates. However, react-admin does not have such modes, and real-time updates may need to be handled differently.

\*\*\*Since Refine CORE has hook-base architecture and with a seamless integration with any UI framework., you can effortlessly use any Calendar components from any UI frameworks.

## Refine CORE App Scaffolder: Simplify Your Project Setup

Refine CORE's approach of being a companion for the developer starts at the project creation phase. Refine CORE has two type of app scaffolder:

The Browser-based and CLI tool let's you create a new Refine CORE application in just 15 seconds by making step-by-step selections directly in your browser and allows 720 different combinations, each tailored to your specific project needs:

- React platform (Vite.js, Next.js or Remix),
- UI framework ( Ant Design, Material UI, Mantine, and Chakra UI, or Headless structure option),
- Backend service (REST API, Supabase, Strapi, NestJS, Appwrite, Airtable or Hasura),
- Authentication provider (Google Auth, Keycloak, Auth0, Supabase, Appwrite, Strapi, Custom Auth).

Check out the [Refine CORE's website](https://refine.dev/#playground) to see the app scaffolder in action.

For the CLI-based scaffolder, with `npm create refine-app@latest` command you can choose all features like above and create Refine CORE apps easily too.

The generated application comes with fully working authentication, CRUD operation components, and pages with fully functional code. You can download the complete project code and use as a starting point for your project.

React-admin only provides a basic project scaffolder CLI with small set of options to choose from.

## CLI

Command line tools are crucial for improved developer experience. At the project creation phase, both Refine CORE and react-admin provides a CLI tool to scaffold the project. As it is mentioned in the previous section, Refine CORE's app scaffolder is available on both command line and web interface. It also provides many customization options for you to start, you can customize your UI library, data provider, routing method and authentication method easily.

React-admin's CLI tool (create-react-admin) only offers a basic project scaffolder with no customization options.

App scaffolder is not the only CLI tool that Refine CORE provides. It also provides a CLI tool for generating resources, running development commands, checking and updating Refine CORE package versions and ability to export built-in Refine CORE components to customize them.

Here's the main features of the `@refinedev/cli`:

### Check and Update Refine CORE Packages

You can use the `check-updates` command to check if there are any updates for the Refine CORE packages you're using. It will list the packages that have newer versions and you can update them with the `update` command. The check will also done automatically when you start your development server or build your application.

### Creating Resources

You can use the `create-resource` command to create a new resource in your project. It will ask you the resource name and the desired actions for the resource. It will create the resource definition in the `resources` prop of the `<Refine>` component. You can always customize your resources after they're created or create them manually but this little helper will save you some time.

### Swizzling Built-in Components

Sometimes you may need to customize the functionality of the built-in components of Refine CORE or use them as a starting point for your own components and extend them. In such cases, you can use the `swizzle` command to export the built-in components of Refine CORE and customize them as you need. This command will show you the installed packages and available components in them for you to export, after you select the package and the component, the source code will be exported to your project.

While there are many options to customize the built-in components through props, this command will give you the ability to customize the components as you wish or use them as a starting point for your own components.

You'll just need to run the `refine swizzle` command, follow the instructions and you'll be able to customize the built-in components of refine.

React-admin does not provide such features and lacks the extensibility that Refine CORE provides.

## Refine CORE Devtools

Refine CORE has it's own devtools that you can use to manage your Refine CORE packages, get insights about your queries and mutations and explore additional information about your app's components, their interactions, and their impact on data flow.

You can dive deeper into your application inner workings with Refine CORE's devtools. Gain invaluable insights into your queries and mutations, allowing you to fine-tune your data operations for optimal performance. The X-Ray feature offers a unique perspective, enabling you to explore additional information about your app's components, their interactions, and their impact on data flow.

Whenever you need to manage your Refine CORE packages, devtools allowing you to review, install, and update packages effortlessly.

More info on Refine CORE devtools can be found [here](https://github.com/refinedev/refine/blob/main/packages/devtools/README.md).

## Customization

Like it's mentioned in the previous sections, Refine CORE's approach is to be a companion for the developers and provide the best developer experience for any use case. It provides many customization options for you to customize your project as you wish.

This approach is supported by the flexibility of the framework. You won't have to worry about the custom styling or the complex logic you need to implement, Refine CORE will be there to help you for any use case you have without limiting you to a specific way of doing things or forcing you to use a specific library or method just to fit in the framework. Instead, it will not interfere with the libraries or frameworks you use along with it and let you use them and their advantages to the fullest.

Refine CORE's target is to make you develop your app both if it is a simple app or a complex one without making you feel like you're hacking the framework or using workarounds to make it work for your case. You won't feel like you're going off the road when you need some customization in the styling or in the logic of your app.

React-admin's nature is to provide a way of doing things without giving you the flexibility to customize it for your case. For custom needs you'll need to use workarounds or hacks to make it work for your case.

## Backward Compatibility

Both Refine CORE and react-admin are in active development and are in their version 4. While Refine CORE is a relatively new framework, it does not mean that it is not providing backward compatibility. On the contrary, it provides backward compatibility for the major versions and provides migration guides and tools for migrating to the newer versions with ease.

Refine CORE offered seamless migration from each major version to the next one from the beginning. The major changes are all covered in codemods and can be applied with a single command.

We know that many developers don't have time to migrate their projects to the newer versions or even if they do, they might not have the time to switch and adapt to the new features and ways of doing things. That's why we're providing the backward compatibility and migration tools to make the transition as smooth as possible.

When migrating to a new major version, you can be sure that your project will continue to work as it is without a missing feature or a broken integration. You will have the time to switch to the new features gradually and benefit from them.

### Ease of Migration

On the other hand, react-admin's migration guide for v3 to v4 is a one large document that takes 94 pages.

It's a huge document that covers all the changes and breaking changes in the new version. It's not a surprise that many developers are still using the v3 version of react-admin. In case you're wondering; we've saved the react-admin's migration guide as a PDF file and you can check it out [here](https://refine.ams3.cdn.digitaloceanspaces.com/website/static/react-admin-upgrading-to-v4-book.pdf)

In Refine CORE's case, the migration from v3 to v4 can be done with a single command and it will take care of all the changes for you.

```bash
npx @refinedev/codemod@latest refine3-to-refine4
```

 <div className="centered-image">
  <img  width="600px" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-12-react-admin-vs-refine/code-mod.gif"  alt="Refine vs React Admin code modification demo" />
</div>

<br/>

And you're done!

## Documentation and and Learning Resources

When it comes to documentation, Refine CORE has more useful resources.

**Extensive Documentation**: refine's documentation is a treasure trove of information, providing comprehensive guidance for every aspect of the framework.

**Real-Use Case Examples**: With a library of over 200 real-use case examples, Refine CORE's documentation makes it easy to understand how to implement various features.

**Live Code Previews**: Interactive live code previews allow you to experiment and see the results in real-time, enhancing your understanding.

**Tutorials for Multiple UI Options**: refine offers tutorials for five UI options, you can learn and implement the framework with your preferred UI library.

**Example App Tutorials**: Step-by-step example app tutorials help you build practical applications, demonstrating Refine CORE's capabilities in real-world scenarios.

**Advanced Integration Guides**: refine's guides enable smooth integration with other tools and platforms, amplifying its utility in your projects.

**RefineWeek Tutorial Series**: The RefineWeek initiative brings you a week-long tutorial series, collaborating with prominent open-source projects like Strapi and Supabase. Dive into hands-on experiences that showcase Refine CORE's potential in building complete CRUD applications.

**Technical Blog**: refine's technical blog is a valuable resource for staying updated on Refine CORE, front-end trends, and web development insights. Gain deep insights into complex concepts, emerging trends, and practical tips.

## Community Engagement

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-12-react-admin-vs-refine/star-history-2.png"  alt="GitHub star history comparison" />
</div>

<br/>

Refine CORE quickly gained favor and attention from the community. Despite being just 2 years old since its inception, Refine CORE boasts a larger community compared to react-admin, which has been in the ecosystem for 7 years.

Refine CORE achieved the same number of GitHub stars that React-admin achieved in 5 years, but in a much shorter span of 2 years.

As of the time of writing this article, Refine CORE has over 4000 members in its Community Discord, whereas React-admin has over 1000.

Additionally, Refine CORE organized two world-wide online hackathons, which were open to broad participation in collaboration with popular open-source companies. These hackathons attracted the interest of more than 1000 participants from all over the world.

[Refine Hackathon #1](https://refine.dev/blog/refine-hackathon/)
[Refine Hackathon #2](https://refine.dev/blog/refine-hackathon-2/)

## Enterprise features

Refine CORE empowers the advancement of a frontend stack solution into a comprehensive enterprise-level feature set.

Both Refine CORE and React-admin offer open-source versions with additional enterprise features available for more advanced needs.

Refine CORE's open-source edition provides nearly all the features found in react-admin's enterprise package, completely free of charge.

On the other hand, React-admin does not have the exclusive enterprise features that Refine CORE offers.

Take a look into some of Refine CORE's exclusive enterprise features that are not available in react-admin:

- Identity Provider
- Identity Management
- Social Sign-in
- Multi-Factor Authentication
- OpenID/SAML Support
- 3rd Party Integrations
- +30 Directory Synchronization
- Stream to SIEM Providers
- ACL Provider
- Secure Deployments
- VPN-less Remote Access
- Anomaly Detection

You can find more detail about Refine enterprise features [here](https://refine.dev/pricing/)

## Conclusion

When choosing between the two, developers should consider their specific project requirements, scalability needs, and desired level of customization.

To sum it up:

- Refine CORE is not only an open-core solution but also a performance-driven framework with it's architecture.
- Its headless nature keeps your project well within the realm of vanilla React, making integration seamless.This architecture ensures that your project remains firmly rooted in vanilla React, simplifying integration.
- One of the most important aspect is that Refine CORE empowers you with free enterprise-level features, similar to those found in react-admin's enterprise package, without any additional financial commitment.

From our point of view, this combination of capabilities, coupled with its user-friendly nature and and remarkably small bundle size positions Refine CORE as an perfect choice for web developers.

In the end, the choice between Refine CORE and React-admin comes down to individual preferences and project constraints. Whichever framework developers choose, they can rest assured that both options will help create robust and efficient web applications.

## Bonus Section - Key Features: A Concise Overview for the Curious Minds

Both frameworks provide many useful features and common cases that you may need in your project. Let's take a look at some of those features provided by Refine CORE:

### Sorting and Filtering

Refine CORE provides a simple and easy to use interface for sorting and filtering your data. In the list hooks such as `useList` or its derivatives like `useTable` or `useSelect` etc. you can provide the `sorters` and `filters` properties to provide the sorting and filtering functionality to your data.

#### Sorting

Sorting is done by providing the `sorters` property to the list hooks. It accepts an array of objects with the `field` and `order` properties. The `field` property is the name of the field you want to sort and the `order` property is the order of the sorting. It can be either `asc` or `desc`. Depending on the data provider you're using, you can define multiple sorters to sort your data by multiple fields.

```tsx
import { useList } from "@refinedev/core";

const MyComponent = () => {
  const { result } = useList({
    resource: "posts",
    sorters: [
      {
        field: "title",
        order: "asc",
      },
    ],
  });
};
```

#### Filtering

Filtering is done by providing the `filters` property to the list hooks. It accepts an array of objects with the `field`, `operator` and `value` properties. The `field` property is the name of the field you want to filter, the `operator` property is the operator you want to use for filtering and the `value` property is the value you want to filter by. Depending on the data provider you're using, you can define multiple filters including conditional filters like `and` and `or` to filter your data by multiple fields.

**Tip**: refine supports 20+ operators for filtering your data. Their availability depends on the data provider you're using.

```tsx
import { useList } from "@refinedev/core";

const MyComponent = () => {
  const { result } = useList({
    resource: "posts",
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "refine",
      },
      {
        field: "status",
        operator: "eq",
        value: "published",
      },
    ],
  });
};
```

React-admin provides similar sorting and filtering features but lacks the customization and composability that Refine CORE provides.

Check out the [Sorting and Filtering](https://refine.dev/core/docs/tutorial/adding-crud-pages/mui/adding-sort-and-filters/) guide for more information on Refine CORE's sorting and filtering features.

### Realtime

Refine CORE provides a realtime feature that allows you to subscribe to the changes in the data and update the UI accordingly and also publish the changes to the server to notify subscribers. This feature can be used through the `liveProvider` prop of the `<Refine>` component. It provides a simple interface to integrate with and also provides built-in support for many providers. The realtime updates can work with the data hooks of Refine CORE without any additional configuration.

Similar to Refine CORE, react-admin also provides a realtime feature behind a paywall of their enterprise edition. However, it still lacks the customization and composability that Refine CORE provides.

Here's an example of using [Ably](https://refine.dev/docs/3.xx.xx/examples/live-provider/ably/) with Refine CORE:

```tsx
// highlight-next-line
import { liveProvider, Ably } from "@refinedev/ably";

const ablyClient = new Ably.Realtime("your-api-key");

const App = () => {
  return (
    <Refine
      // highlight-start
      liveProvider={liveProvider(ablyClient)}
      options={{ liveMode: "auto" }}
      // highlight-end
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

Check out the [Realtime](https://refine.dev/core/docs/advanced-tutorials/real-time/) documentation for more information about Refine CORE's realtime features.

### Undoable mode

Depending on your use case, the way you mutate the data and how you want to handle the mutations for the user may differ. For example, you may want the mutations to be applied immediately or you may want to give the user the ability to undo the mutations. Refine CORE provides multiple mutation modes for you to choose from, `optimistic`, `pessimistic` and `undoable`. You can either set one for the whole application or set it for each mutation separately.

#### `optimistic` mode

In the `optimistic` mode, the mutations are applied immediately and the UI is updated accordingly. This will give the users more snappy experience by not waiting for the actual response from the server and applying the changes immediately to the necessary records in the resource. After the mutation is completed, the UI will be updated with the actual response from the server.

#### `pessimistic` mode

In the `pessimistic` mode, the mutations are applied after the response from the server is received. This will give the users a more consistent experience by waiting for the actual response from the server and applying the changes after the response is received. This method is useful when you need to make sure that the mutation is applied to the server before updating the UI.

#### `undoable` mode

In the `undoable` mode, the mutations are applied immediately and the UI is updated accordingly. This will give the users more snappy experience by not waiting for the actual response from the server and applying the changes immediately to the necessary records in the resource. In an addition to the `optimistic` mode, the `undoable` mode provides the ability to undo the mutations by showing a notification to the user with a customizable countdown. After the countdown is finished, the mutation will be applied to the server and the UI will be updated accordingly. If the user clicks the undo button, the mutation will be reverted and the UI will be updated accordingly.

You may want to use one of these modes for your application or use different modes for different mutations. These modes can be set and used with no additional configuration through `<Refine>` component or through data hooks of refine.

React-admin also provides the same `undoable` mode for the mutations.

Here's an example of using the `undoable` mode with Refine CORE:

```tsx
import { useUpdate } from "@refinedev/core";

const MyComponent = () => {
  const { mutate: updatePost } = useUpdate<Post>();

  const onClick = () => {
    updatePost({
      /* ... */
      mutationMode: "undoable",
    });
  };
};
```

Check out the [Mutation Modes](https://refine.dev/core/docs/advanced-tutorials/mutation-mode/) documentation for more information about Refine CORE's mutation modes.

### GraphQL

GraphQL implementation is the one of the strengths of refine. Refine CORE's GraphQL data provider package uses `gql-query-builder` and `graphql-request` under the hood and gives the user the ability to construct custom queries and mutations for their needs. This will allow users to define their own queries and mutations just by passing the necessary fields, operations and variables to the data hooks of refine.

On the other hand, react-admin **does not** offer a meaningful GraphQL support. By saying that, we mean that react-admin's way of using GraphQL is a limiting one and doesn't allow the user to define their own queries and mutations properly. Limiting the freedom of GraphQL and forcing it to work like any other REST API doesn't seem like a proper support for GraphQL.

**Tip**: refine provides multiple data providers for GraphQL. Other than the `@refinedev/graphql` package, you can also use the `@refinedev/hasura`, or `@refinedev/nestjs-query` packages to integrate with your GraphQL API or use one of them as a reference to create your own data provider.

**Tip**: refine also supports realtime updates with GraphQL subscriptions using `liveProvider`.

Here's an example of using the `@refinedev/graphql` package with Refine CORE:

```tsx
import { Refine } from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/graphql";

const client = new GraphQLClient("API_URL");

const App = () => {
  return (
    <Refine
      dataProvider={dataProvider(client)}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

Let's have a look at how you can use the `useList` hook with GraphQL:

```tsx
import { useList } from "@refinedev/core";

const MyComponent = () => {
  const { result, query } = useList<IPost>({
    resource: "posts",
    meta: {
      fields: [
        "id",
        "title",
        {
          category: ["title"],
        },
      ],
    },
  });
};
```

If you need sorting and filtering, you will be able to use them just like the other data providers:

```tsx
import { useList } from "@refinedev/core";

const MyComponent = () => {
  const { result, query } = useList<IPost>({
    resource: "posts",
    sorters: [
      {
        field: "id",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "foo",
      },
    ],
  });
};
```

Check out the [GraphQL](https://refine.dev/core/docs/packages/documentation/data-providers/graphql/) documentation for more information about Refine CORE's GraphQL implementation.

### Forms

Forms are one of the most essential features of a web framework with a claim of simplifying the development process of data intensive applications. Yet, other than basic forms, react-admin does not provide any support for complex forms and form layouts unless you're using the enterprise edition.

Features such as modal forms or stepper forms are only available in the enterprise edition of react-admin.

On the other hand, Refine CORE provides a built-in support for complex forms and form layouts without forcing the user to use a specific UI library. You can build modal forms, stepper forms and have features such as auto-save with no additional configuration.

### CSV Import/Export

Refine CORE's core package provides `useImport` and `useExport` hooks that can be used to import and export CSV files. These hooks can be used with no additional configuration and have built-in complementary components in the Refine CORE's UI integration packages; `<ImportButton>` and `<ExportButton>`.

#### Export

Refine CORE's `useExport` hook will let you define your resource and options like sorting, filtering, pagination and also lets you modify the data before exporting it just like using the `useList` hook.

```tsx
import { useExport } from "@refinedev/core";

const MyComponent = () => {
  const { triggerExport } = useExport<IPost>();

  return <button onClick={triggerExport}>Export Button</button>;
};
```

#### Import

The other side of the CSV import/export feature is the import. Refine CORE's `useImport` hook will let you import CSV files, parse them and save them to your data provider in batches. It also provides a way to modify the data before saving it to the data provider.

```tsx
import { useImport } from "@refinedev/core";

export const MyComponent = () => {
  const { inputProps } = useImport<IPostFile>();

  return <input {...inputProps} />;
};
```

In React-admin, you'll be able to export the data to a CSV file but there's no built-in way to import CSV files.

Check out the [CSV Import & Export](/core/docs/guides-concepts/import-export/) documentation for more information about Refine CORE's import/export features.

### Access Control

Access control is a broad topic with lots of advanced solutions that provide different sets of features.

Refine CORE provides an agnostic API via the `accessControlProvider` to manage access control throughout your app, which allows you to integrate different methods, such as `RBAC`, `ABAC`, `ACL`, etc., and libraries, such as [Casbin](https://casbin.org/), [CASL](https://casl.js.org/v5/en/), [Cerbos](https://cerbos.dev/) and [AccessControl.js](https://onury.io/accesscontrol/).

**Tip**: refine comes with a built-in `CanAccess` component that can be used complementarily with the `accessControlProvider` to manage access control in your app with ease. Still, you can use the `useCan` hook for any custom use case you may have.

Many of the Refine CORE's built-in components comes with access control support out of the box. For example, the `<EditButton>` component of the UI integration packages will be hidden or disabled if the user does not have access to edit the record.

Here's a basic implementation of the `accessControlProvider` in `<Refine>` component:

```tsx
const App = () => {
  return (
    <Refine
      accessControlProvider={{
        can: async ({
          resource,
          action,
          params,
        }: CanParams): Promise<CanReturnType> => {
          return { can: true };
        },
      }}
    >
      {/* ... */}
    </Refine>
  );
};
```

And here's an example of using the `CanAccess` component:

```tsx
<CanAccess
  resource="posts"
  action="edit"
  params={{ id: 1 }}
  fallback={<CustomFallback />}
>
  <YourComponent />
</CanAccess>
```

**Tip**: Just like many other components and hooks in Refine CORE, `<CanAccess>` component is aware of the resource, action and params with the help of the router integration out of the box. This means that you don't need to pass these props to the component if you are using it in a defined resource route.

React-admin's access control is coupled with the `authProvider` which may not always be the case.

Check out the [Access Control](https://refine.dev/core/docs/advanced-tutorials/access-control/) documentation for more information about Refine CORE's access control and authorization features.

### Server Side Validation

Server side validation is a common requirement for many applications. Refine CORE provides a way to validate the data on the server side and show the errors to the user. This validation can be combined with the client side validation to provide a better user experience. To make it work with Refine CORE out of the box, you just need to return the errors in the mutation response with the expected format;

```tsx
type HttpError = {
  statusCode: number;
  message: string;
  errors: {
    [field: string]:
      | string
      | string[]
      | boolean
      | { key: string; message: string };
  };
};
```

This structure will let you show errors in the form fields with out of the box i18n support.

**Tip**: If you want to handle the errors and the mapping yourself, you can always opt-out of the built-in error handling feature and override the error handling logic in the `useForm` hooks and extensions.

React-admin also provides a similar feature but it does not have the i18n support out of the box.

Check out the [Server Side Validation](https://refine.dev/core/docs/guides-concepts/forms/#server-side-validation-) documentation for more information about Refine CORE's server side validation features.

### Auto Save

In some cases, you may want to save the data automatically when the user changes the field in a form to make sure that no data is lost even if the user forgets to save the data. Refine CORE provides a way to do this with the `autoSave` prop of its form hooks. This feature has a complementary component in the UI integration packages; `<AutoSaveIndicator>`.

**Tip**: Auto save feature is customizable, you can change the debounce period, attach callbacks to the save event and also modify the data before sending it to the server.

Here's an example usage of the `autoSave` prop with the `useForm` hook:

```tsx
import { useForm } from "@refinedev/react-hook-form";
import { AutoSaveIndicator } from "@refinedev/mui";

consy MyComponent = () => {
    const { refineCore: { autoSaveProps } } = useForm({
        refineCoreProps: {
            autoSave: {
                enabled: true,
                debounce: 2000,
            },
        }
    });

    return (
        <>
        /* ... */
        <AutoSaveIndicator {...autoSaveProps}/>
        </>
    )
}
```

The `<AutoSaveIndicator>` components will give you a visual feedback about the auto save status out of the box.

React-admin offers this feature in its enterprise package but it does not have the styling and modification options that Refine CORE provides. Furthermore, this feature is available for free in Refine CORE, while it requires the purchase of an enterprise package in React-admin.

Check out the [Auto Save](https://refine.dev/core/docs/api-reference/core/hooks/useForm/#autosave)
