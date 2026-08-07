---
title: "Refine v4 Comparison | Refine vs. Other Frameworks"
display_title: "Comparison | Refine vs React-Admin vs AdminBro vs Retool vs Redwood"
description: "How does Refine compare to other React frameworks? Explore a detailed comparison of features, performance, and developer experience."
sidebar_label: Comparison
---

:::note

This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) using the "Edit this page" link at the bottom of this page.

:::

- ✅ &nbsp;1st-class, built-in, and ready to use with no added configuration or code
- 🟡 &nbsp;Supported, but as an unofficial 3rd party or community library/contribution
- 🔶 &nbsp;Supported and documented, but requires extra user-code to implement
- 🛑 &nbsp;Not officially supported or documented.

| Features                             | Refine                                                                                             | React-Admin                                | AdminBro                         | Retool              | Redwood                                               |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------- | ------------------- | ----------------------------------------------------- |
| GitHub Stars                         | [![][stars-refine]][gh-refine]                                                                     | [![][stars-react-admin]][gh-react-admin]   | [![][stars-adminjs]][gh-adminjs] | -                   | [![][stars-redwood]][gh-redwood]                      |
| Bundle Size                          | [![][bp-refine]][bpl-refine]                                                                       | [![][bp-react-admin]][bpl-react-admin]     | [![][bp-adminjs]][bpl-adminjs]   | -                   | [![][bp-redwood]][bpl-redwood]                        |
| Pricing                              | Open Source                                                                                        | Open Source / Enterprise Edition           | Open Source                      | SaaS                | Open Source                                           |
| Platform                             | React                                                                                              | React                                      | Node.js - React                  | Cloud / Self-hosted | React - Node                                          |
| Supported UI Frameworks              | **Ant Design, Material UI, Tailwind, Mantine, Chakra UI, anything...**                             | Material UI                                | Own UIs                          | Own UIs             | Tailwind, Chakra, Mantine, WindiCSS and custom styles |
| Headless                             | **Yes**                                                                                            | No                                         | No                               | No                  | No                                                    |
| Access Control                       | **RBAC, ACL, ABAC, etc.**                                                                          | RBAC                                       | RBAC                             | RBAC                | RBAC                                                  |
| SSR Support                          | **Yes** Next.js & Remix                                                                            | No                                         | No                               | No                  | No                                                    |
| Live/Realtime                        | Yes with two mode `auto` and `manual`                                                              | Yes - just Immediately(Enterprise Edition) | No                               | No                  | Yes, with api/webhooks                                |
| Audit Log                            | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | No                               | Yes                 | Yes                                                   |
| State Management                     | React Query                                                                                        | React Query                                | Redux                            | -                   | Apollo GraphQL                                        |
| Routing                              | React Router, Next.js, Remix or Any Routing Library                                                | React Router                               | React Router                     | -                   | @redwoodjs/router                                     |
| Devtools                             | Yes - [Refine Devtools](https://github.com/refinedev/refine/blob/main/packages/devtools/README.md) | No                                         | No                               | No                  | Storybook, Pino, Jest                                 |
| Command Palette[\*][command-palette] | ✅                                                                                                 | 🛑                                         | 🛑                               | 🛑                  | 🛑                                                    |
| Own Advanced Tutorial Examples       | Yes - **110+** Examples                                                                            | Yes - Few Examples                         | No                               | No                  | Yes, Divided in Chapters                              |
| Architecture                         | **Hooks Based**                                                                                    | Component Based                            | Hooks Based                      | -                   | Component Based                                       |
| Dynamic Multi-level Menus            | **Yes**                                                                                            | No                                         | No                               | -                   | No                                                    |
| Project Creator CLI                  | ✅                                                                                                 | 🛑                                         | 🛑                               | 🛑                  | ✅                                                    |
| Project CLI                          | ✅                                                                                                 | 🛑                                         | 🛑                               | 🛑                  | ✅                                                    |
| Auth Provider                        | ✅                                                                                                 | ✅                                         | ✅                               | ✅                  | ✅                                                    |
| Data Provider                        | ✅                                                                                                 | ✅                                         | 🔶                               | ✅                  | ✅                                                    |
| i18n                                 | ✅                                                                                                 | ✅                                         | ✅                               | -                   | ✅                                                    |
| Router Provider                      | ✅                                                                                                 | 🛑                                         | 🛑                               | -                   | ✅                                                    |
| Notification Provider                | ✅                                                                                                 | 🛑                                         | 🛑                               | -                   | ✅                                                    |
| GraphQL Support                      | ✅                                                                                                 | 🔶                                         | 🟡                               | ✅                  | ✅                                                    |
| Customization                        | ✅                                                                                                 | 🔶                                         | 🔶                               | 🛑                  | 🔶                                                    |
| Basic Form                           | ✅                                                                                                 | ✅                                         | ✅                               | ✅                  | ✅                                                    |
| Editable Table                       | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | ✅                                                    |
| Tree Select                          | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🛑                               | 🛑                  | 🛑                                                    |
| Markdown                             | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | 🔶                                                    |
| Calendar                             | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | 🛑                                                    |
| Caching                              | ✅                                                                                                 | ✅                                         | 🛑                               | 🛑                  | ✅                                                    |
| API Caching                          | ✅                                                                                                 | 🛑                                         | 🛑                               | 🛑                  | ✅                                                    |
| Multi Level Menu                     | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🟡                               | ✅                  | 🛑                                                    |
| Typescript                           | ✅                                                                                                 | ✅                                         | ✅                               | -                   | ✅                                                    |
| Modal Form                           | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | ✅                                                    |
| Drawer Form                          | ✅                                                                                                 | 🔶                                         | 🛑                               | 🛑                  | 🛑                                                    |
| Step Form                            | ✅                                                                                                 | ✅ &nbsp;Enterprise Edition                | 🛑                               | 🛑                  | 🛑                                                    |
| Theming                              | ✅                                                                                                 | ✅                                         | 🔶                               | ✅                  | 🔶                                                    |
| CSV Import/Export                    | ✅                                                                                                 | 🟡                                         | 🟡                               | ✅                  | 🛑                                                    |

<!-- -->

[stars-refine]: https://img.shields.io/github/stars/refinedev/refine?label=%F0%9F%8C%9F
[gh-refine]: https://github.com/refinedev/refine
[bpl-refine]: https://bundlephobia.com/result?p=@refinedev/core
[bp-refine]: https://badgen.net/bundlephobia/minzip/@refinedev/core?label=💾
[command-palette]: https://github.com/refinedev/refine/tree/main/examples/command-palette-kbar

<!-- -->

[stars-react-admin]: https://img.shields.io/github/stars/marmelab/react-admin?label=%F0%9F%8C%9F
[gh-react-admin]: https://github.com/marmelab/react-admin
[bpl-react-admin]: https://bundlephobia.com/result?p=react-admin
[bp-react-admin]: https://badgen.net/bundlephobia/minzip/react-admin?label=💾

<!-- -->

[adminjs]: https://adminbro.com/index.html
[stars-adminjs]: https://img.shields.io/github/stars/SoftwareBrothers/adminjs?label=%F0%9F%8C%9F
[gh-adminjs]: https://github.com/SoftwareBrothers/adminjs
[bpl-adminjs]: https://bundlephobia.com/result?p=admin-bro
[bp-adminjs]: https://badgen.net/bundlephobia/minzip/admin-bro?label=💾

<!-- -->

[stars-redwood]: https://img.shields.io/github/stars/redwoodjs/redwood?label=%F0%9F%8C%9F
[gh-redwood]: https://github.com/redwoodjs/redwood
[bpl-redwood]: https://bundlephobia.com/result?p=@redwoodjs/core
[bp-redwood]: https://badgen.net/bundlephobia/minzip/@redwoodjs/core?label=💾
