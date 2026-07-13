---
title: "Refine v4 Documentation | The React Framework for CRUD"
display_title: "Overview"
sidebar_label: "Overview"
description: "Explore official Refine v4 docs. Build enterprise-grade admin panels, dashboards, and internal tools with React faster than ever."
slug: /
displayed_sidebar: mainSidebar
---

## What is Refine?

**Refine** is a React meta-framework for CRUD-heavy web applications. It addresses a wide range of enterprise use cases including internal tools, admin panels, dashboards and B2B apps.

Refine's core hooks and components streamline the development process by offering industry-standard solutions for crucial aspects of a project, including **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

Refine's headless architecture enables the building of highly customizable applications by decoupling business logic from UI and routing. This allows integration with:

- Any custom designs or UI frameworks like [TailwindCSS](https://tailwindcss.com/), along with built-in support for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/).

- Various platforms, including Next.js, Remix, React Native, Electron, etc., by a simple routing interface without the need for additional setup steps.

## Why Refine?

Within the broad spectrum of development approaches, Refine occupies a unique sweet spot between “starting from scratch” with traditional development method and low-code/no-code solutions. With their respective initial pros at the beginning of development, both of the two extreme approaches may present long-term risks:

Despite offering the ultimate level flexibility, “Starting from scratch” method is likely to cause

- Project delays
- Technical debt
- Maintenance problems
- Lack of development and security best practices
- A polluted codebase
- And lack of standardization across teams

Low/no-code solutions address this shortcoming but create a new set of challenges such as

- Vendor lock-in
- Lack of customization & styling options
- Poor developer experience
- And limited support for complex use-cases

Offering the best from both worlds, Refine mitigates all risks of “from scratch” development without compromising from flexibility, agility and open technologies.

## Overview of the Refine structure

import { MUIExample } from './example/mui';

<MUIExample />

<br/>

import { MUISandpack } from './example/sandpack';

<MUISandpack />

## Use cases

**Refine** shines when it comes to _data-intensive_ applications like _admin panels_, _dashboards_ and _internal tools_.

<a href="https://refine.dev/templates/">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/diagram-3.webp" alt="Refine diagram" />
</a>

## Key Features

- Refine Devtools - dive deeper into your app and provide useful insights
- Connectors for **15+ backend services** including [REST API](https://github.com/refinedev/refine/tree/main/packages/simple-rest), [GraphQL](https://github.com/refinedev/refine/tree/main/packages/graphql), [NestJs CRUD](https://github.com/refinedev/refine/tree/main/packages/nestjsx-crud), [Airtable](https://github.com/refinedev/refine/tree/main/packages/airtable), [Strapi](https://github.com/refinedev/refine/tree/main/packages/strapi), [Strapi v4](https://github.com/refinedev/refine/tree/main/packages/strapi-v4), [Supabase](https://github.com/refinedev/refine/tree/main/packages/supabase), [Hasura](https://github.com/refinedev/refine/tree/main/packages/hasura), [Appwrite](https://github.com/refinedev/refine/tree/main/packages/appwrite), [Firebase](https://firebase.google.com/), [Nestjs-Query](https://github.com/refinedev/refine/tree/main/packages/nestjs-query) and [Directus](https://directus.io/).
- SSR support with Next.js & Remix and Advanced routing with any router library of your choice
- Auto-generation of CRUD UIs based on your API data structure
- Perfect state management & mutations with React Query
- Providers for seamless authentication and access control flows
- Out-of-the-box support for live / real-time applications
- Easy audit logs & document versioning

## Community

**Refine** has a very friendly community and we are always happy to help you get started:

- [Join the Discord community!](https://discord.gg/refine) It is the easiest way to get help and ask questions to the community.
- [Join the GitHub Discussions](https://github.com/refinedev/refine/discussions) to ask anything about the Refine project or give feedback; we would love to hear your thoughts!
- [Learn how to contribute to the Refine!](/core/docs/guides-concepts/contributing/)

## Next Steps

👉 Continue with the [Quickstart guide](/core/docs/getting-started/quickstart/) to setup and run your first **Refine** project.

👉 Jump directly to the [Tutorial](/core/tutorial) to learn Refine by building a full-blown CRUD application.
