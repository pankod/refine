---
title: "Quickstart | Getting Started in Refine v5"
display_title: "Quick Start Guide"
sidebar_label: "Quick Start Guide"
description: "Implement Quickstart in Refine v5. Learn the key steps. Explore best practices for project and scaffolder for real-world React admin panels."
displayed_sidebar: mainSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Playground } from "@site/src/components/playground";

**Refine** works on any environment that can run **React** (incl. _Vite, Next.js, Remix, and CRA(Legacy)_ etc.)

Although you could take the time to manually set up your environment and install the **Refine** packages afterwards, the optimal way to get started with **Refine** is using the [Browser-based Scaffolder](https://refine.dev/?playground=true) and **CLI-based Scaffolder**.

## Using CLI

Use `create-refine-app` to quickly bootstrap a new **Refine** project with lots of options to fit your needs.

```sh
npm create refine-app@latest
```

<figure>
   <img className="w-full rounded-lg border border-solid border-zinc-200 dark:border-zinc-700" src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/refine-vite-mui-rest-auth-screenshot.webp" alt="Example result" />
    <figcaption className="text-center">A Refine app created with CLI using Vite + Material UI + REST API + Custom Auth Provider</figcaption>
</figure>

## Using Browser

Refine's browser-based scaffolder has the same set of options as the CLI-based scaffolder. It is a great way to set up a new project and have a preview of how it looks before you download it.

<Playground />

## Next Steps

👉 Jump to [Tutorials](/core/tutorial) and continue your work to turn your example project into a full-blown CRUD application! 🚀

👉 See [real-life examples](/core/templates) built using **Refine**

👉 Check out the [General Concepts](/core/docs/guides-concepts/general-concepts/) and [Data Fetching](/core/docs/guides-concepts/data-fetching/) guides to start learning Refine.
