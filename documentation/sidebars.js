/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').Sidebars} */
module.exports = {
  mainSidebar: [
    // Getting Started
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: "generated-index",
        slug: "/getting-started",
        description:
          "Start with installation, quickstart, and core concepts for building with Refine.",
      },
      className: "category-as-header",
      items: [
        "getting-started/overview",
        "getting-started/quickstart",
        {
          type: "link",
          href: "/core/tutorial/essentials/intro/",
          label: "Tutorial",
        },
        {
          type: "link",
          href: "https://s.refine.dev/examples",
          label: "Examples",
          customProps: {
            external: true,
          },
        },
        {
          type: "link",
          href: "/core/templates/",
          label: "Templates",
        },
      ],
    },
    // Announcement
    {
      type: "link",
      href: "/core/docs/migration-guide/4x-to-5x/",
      label: "Refine CORE v5 is here!",
      className: "enterprise-badge",
    },
    {
      type: "link",
      href: "/core/docs/ui-integrations/shadcn/introduction/",
      label: "shadcn/ui Integration 🚀",
      className: "shadcn-badge",
    },
    // Guides & Concepts
    {
      type: "category",
      label: "Guides & Concepts",
      link: {
        type: "generated-index",
        slug: "/guides-concepts",
        description:
          "Conceptual guides for data, routing, auth, UI libraries, and best practices in Refine.",
      },
      className: "category-as-header",
      items: [
        "guides-concepts/general-concepts/index",
        "guides-concepts/data-fetching/index",
        "guides-concepts/forms/index",
        "guides-concepts/tables/index",
        "guides-concepts/routing/index",
        "guides-concepts/authentication/index",
        "guides-concepts/authorization/index",
        "guides-concepts/ui-libraries/index",
        "guides-concepts/notifications/index",
        "guides-concepts/realtime/index",
        "guides-concepts/audit-logs/index",
        "guides-concepts/multitenancy/index",
        "guides-concepts/import-export/index",
        "guides-concepts/i18n/index",
        "guides-concepts/usage-with-existing-projects/index",
        "guides-concepts/deployment/index",
        {
          type: "category",
          label: "Advanced Tutorials",
          link: {
            type: "generated-index",
            title:
              "Advanced Refine Tutorials | Workflows & Integrations in Refine v5",
            description:
              "Secure advanced tutorials in Refine v5. Learn best practices. Learn optimize workflows, integrations, and best practices for production-ready workflows.",
            slug: "/advanced-tutorials",
          },
          items: [
            "advanced-tutorials/access-control",
            {
              type: "category",
              label: "Auth",
              link: {
                type: "generated-index",
                slug: "/advanced-tutorials/auth",
                description:
                  "Authentication provider tutorials and integration guidance.",
              },
              items: [
                "advanced-tutorials/auth/auth0",
                "advanced-tutorials/auth/azure-ad",
              ],
            },
            "advanced-tutorials/custom-layout",
            {
              type: "category",
              label: "Data Provider",
              link: {
                type: "generated-index",
                slug: "/advanced-tutorials/data-provider",
                description:
                  "Advanced data provider tutorials and filtering patterns.",
              },
              items: ["advanced-tutorials/data-provider/handling-filters"],
            },
            {
              type: "category",
              label: "Form",
              link: {
                type: "generated-index",
                slug: "/advanced-tutorials/forms",
                description:
                  "Advanced form tutorials, including custom validation patterns.",
              },
              items: ["advanced-tutorials/forms/custom-form-validation"],
            },
            "advanced-tutorials/real-time",
            "advanced-tutorials/multi-level-menu/multi-level-menu",
            "advanced-tutorials/mutation-mode",
            {
              type: "category",
              label: "Search",
              link: { type: "doc", id: "advanced-tutorials/search/search" },
              items: [
                "advanced-tutorials/search/list-search",
                "advanced-tutorials/search/table-search",
              ],
            },
            {
              type: "category",
              label: "Upload",
              link: {
                type: "generated-index",
                slug: "/advanced-tutorials/upload",
                description:
                  "Advanced upload tutorials, including base64 and multipart uploads.",
              },
              items: [
                "advanced-tutorials/upload/base64-upload",
                "advanced-tutorials/upload/multipart-upload",
              ],
            },
            {
              type: "category",
              label: "Web3",
              link: {
                type: "generated-index",
                slug: "/advanced-tutorials/web3",
                description: "Web3 tutorials including Ethereum sign-in flows.",
              },
              items: ["advanced-tutorials/web3/ethereum-signin"],
            },
          ],
        },
        "guides-concepts/development/index",
        "guides-concepts/contributing/index",
        "guides-concepts/faq/index",
      ],
    },
    // Core API
    {
      type: "category",
      label: "Core",
      link: {
        type: "generated-index",
        slug: "/core",
        description:
          "Core APIs, configuration, and interfaces for Refine apps.",
      },
      className: "category-as-header",
      items: [
        {
          type: "doc",
          id: "core/refine-component/index",
          label: "<Refine>",
        },
        "core/interface-references/index",
      ],
    },
    // Data
    {
      type: "category",
      label: "Data",
      link: {
        type: "generated-index",
        slug: "/data",
        description:
          "Data layer docs for providers, hooks, packages, and examples.",
      },
      className: "category-as-header",
      items: [
        "data/data-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/data/hooks",
            description:
              "Data hooks for querying, mutations, invalidation, and providers.",
          },
          items: [
            "data/hooks/use-show/index",
            "data/hooks/use-table/index",
            "data/hooks/use-form/index",
            "data/hooks/use-select/index",
            "data/hooks/use-invalidate/index",
            "data/hooks/use-list/index",
            "data/hooks/use-infinite-list/index",
            "data/hooks/use-one/index",
            "data/hooks/use-many/index",
            "data/hooks/use-create/index",
            "data/hooks/use-create-many/index",
            "data/hooks/use-update/index",
            "data/hooks/use-update-many/index",
            "data/hooks/use-delete/index",
            "data/hooks/use-delete-many/index",
            "data/hooks/use-custom/index",
            "data/hooks/use-custom-mutation/index",
            "data/hooks/use-data-provider/index",
            "data/hooks/use-api-url/index",
          ],
        },
        {
          type: "category",
          label: "Packages",
          link: {
            type: "generated-index",
            slug: "/data/packages",
            description: "Data provider packages and integrations.",
          },
          items: [
            "data/packages/rest-data-provider/index",
            "data/packages/airtable/index",
            "data/packages/appwrite/index",
            "data/packages/graphql/index",
            "data/packages/simple-rest/index",
            "data/packages/strapi-v4/index",
            "data/packages/supabase/index",
            "data/packages/nestjs-query/index",
            "data/packages/nestjsx-crud/index",
            "data/packages/hasura/index",
            "data/packages/community-data-providers/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/data/examples",
            description:
              "Example implementations for different data providers.",
          },
          items: [
            "examples/data-provider/airtable",
            "examples/data-provider/appwrite",
            "examples/data-provider/directus",
            "examples/data-provider/elide",
            "examples/data-provider/hasura",
            "examples/data-provider/multiple",
            "examples/data-provider/nestjsxCrud",
            "examples/data-provider/nestjs-query",
            "examples/data-provider/strapi",
            "examples/data-provider/strapi-v4",
            "examples/data-provider/supabase",
            "examples/data-provider/sanity",
          ],
        },
      ],
    },
    // Router
    {
      type: "category",
      label: "Routing",
      link: {
        type: "generated-index",
        slug: "/routing",
        description:
          "Routing concepts, integrations, components, and hooks in Refine.",
      },
      className: "category-as-header",
      items: [
        "routing/router-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Integrations",
          link: {
            type: "generated-index",
            slug: "/routing/integrations",
            description:
              "Router integrations for React Router, Next.js, and Remix.",
          },
          items: [
            {
              type: "category",
              label: "React Router",
              link: {
                type: "doc",
                id: "routing/integrations/react-router/index",
              },
              items: [
                "routing/integrations/react-router/migration-guide-v6-to-v7",
              ],
            },
            "routing/integrations/next-js/index",
            "routing/integrations/remix/index",
          ],
        },
        {
          type: "category",
          collapsed: false,
          label: "Components",
          link: {
            type: "generated-index",
            slug: "/routing/components",
            description: "Routing UI components and helpers.",
          },
          items: ["routing/components/link/index"],
        },
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/routing/hooks",
            description: "Routing hooks for navigation and link handling.",
          },
          items: [
            "routing/hooks/use-resource-params/index",
            "routing/hooks/use-go/index",
            "routing/hooks/use-back/index",
            "routing/hooks/use-parsed/index",
            "routing/hooks/use-link/index",
            "routing/hooks/use-get-to-path/index",
            "routing/hooks/use-navigation/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/routing/examples",
            description: "Routing examples for Next.js and Remix.",
          },
          items: [
            { type: "html", value: "Next.js" },
            "examples/next-js/nextjs",
            "examples/next-js/auth",
            "examples/next-js/NextAuth-js",
            { type: "html", value: "Remix" },
            "examples/remix/remix-headless",
            "examples/remix/remix-auth",
          ],
        },
      ],
    },
    // Authentication
    {
      type: "category",
      label: "Authentication",
      link: {
        type: "generated-index",
        slug: "/authentication",
        description:
          "Authentication flows, components, hooks, and examples for secure apps.",
      },
      className: "category-as-header",
      items: [
        "authentication/auth-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Components",
          link: {
            type: "generated-index",
            slug: "/authentication/components",
            description: "Authentication UI components and helpers.",
          },
          items: [
            "authentication/components/authenticated/index",
            "authentication/components/auth-page/index",
          ],
        },
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/authentication/hooks",
            description:
              "Authentication hooks for login, permissions, and sessions.",
          },
          items: [
            "authentication/hooks/use-is-authenticated/index",
            "authentication/hooks/use-on-error/index",
            "authentication/hooks/use-get-identity/index",
            "authentication/hooks/use-login/index",
            "authentication/hooks/use-logout/index",
            "authentication/hooks/use-permissions/index",
            "authentication/hooks/use-register/index",
            "authentication/hooks/use-forgot-password/index",
            "authentication/hooks/use-update-password/index",
            "authentication/hooks/use-update-identity/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/authentication/examples",
            description: "Authentication examples for popular providers.",
          },
          items: [
            "examples/authentication/headless",
            "examples/auth-provider/auth0",
            "examples/auth-provider/google-auth",
            "examples/auth-provider/keycloak",
            "examples/auth-provider/kinde",
            "examples/auth-provider/otpLogin",
          ],
        },
      ],
    },
    // Authorization
    {
      type: "category",
      label: "Authorization",
      link: {
        type: "generated-index",
        slug: "/authorization",
        description:
          "Authorization and access control patterns, components, hooks, and examples.",
      },
      className: "category-as-header",
      items: [
        "authorization/access-control-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Components",
          link: {
            type: "generated-index",
            slug: "/authorization/components",
            description: "Authorization components like CanAccess and helpers.",
          },
          items: ["authorization/components/can-access/index"],
        },
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/authorization/hooks",
            description: "Authorization hooks for permission checks.",
          },
          items: ["authorization/hooks/use-can/index"],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/authorization/examples",
            description:
              "Authorization examples using popular access control tools.",
          },
          items: [
            "examples/access-control/casbin",
            "examples/access-control/cerbos",
            "examples/access-control/permify",
          ],
        },
      ],
    },
    // Realtime
    {
      type: "category",
      label: "Realtime",
      link: {
        type: "generated-index",
        slug: "/realtime",
        description:
          "Realtime integrations, hooks, and examples for Refine apps.",
      },
      className: "category-as-header",
      items: [
        "realtime/live-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/realtime/hooks",
            description: "Realtime hooks for publishing and subscriptions.",
          },
          items: [
            "realtime/hooks/use-publish/index",
            "realtime/hooks/use-subscription/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/realtime/examples",
            description: "Realtime examples and provider setups.",
          },
          items: ["examples/live-provider/ably"],
        },
      ],
    },
    // Notification
    {
      type: "category",
      label: "Notification",
      link: {
        type: "generated-index",
        slug: "/notification",
        description: "Notification APIs, hooks, and examples.",
      },
      className: "category-as-header",
      items: [
        "notification/notification-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/notification/hooks",
            description: "Notification hooks for in-app alerts and messages.",
          },
          items: ["notification/hooks/use-notification/index"],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/notification/examples",
            description: "Notification provider examples and setups.",
          },
          items: ["examples/notification-provider/react-toastify"],
        },
      ],
    },
    // i18n
    {
      type: "category",
      label: "I18n",
      link: {
        type: "generated-index",
        slug: "/i18n",
        description: "Internationalization guides, hooks, and examples.",
      },
      className: "category-as-header",
      items: [
        "i18n/i18n-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/i18n/hooks",
            description:
              "Internationalization hooks for translation and locale.",
          },
          items: ["i18n/hooks/use-translation/index"],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/i18n/examples",
            description: "Internationalization examples for Next.js and React.",
          },
          items: ["examples/i18n/i18n-nextjs", "examples/i18n/i18n-react"],
        },
      ],
    },
    // Audit Logs
    {
      type: "category",
      label: "Audit Logs",
      link: {
        type: "generated-index",
        slug: "/audit-logs",
        description: "Audit logging concepts, hooks, and examples.",
      },
      className: "category-as-header",
      items: [
        "audit-logs/audit-log-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          link: {
            type: "generated-index",
            slug: "/audit-logs/hooks",
            description: "Audit log hooks for tracking actions.",
          },
          items: [
            "audit-logs/hooks/use-log/index",
            "audit-logs/hooks/use-log-list/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          link: {
            type: "generated-index",
            slug: "/audit-logs/examples",
            description: "Audit log provider examples and setups.",
          },
          items: [
            "examples/audit-log/audit-log-antd",
            "examples/audit-log/audit-log-provider",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Core Utilities",
      link: {
        type: "generated-index",
        slug: "/core/utilities",
        description: "Utility components and hooks in Refine core.",
      },
      className: "category-as-header",
      items: [
        {
          type: "category",
          label: "Components",
          collapsed: false,
          link: {
            type: "generated-index",
            slug: "/core/utilities/components",
            description: "Utility components for core Refine flows.",
          },
          items: [
            // TODO: add doc
            "core/components/auto-save-indicator/index",
            "core/components/inferencer/index",
          ],
        },
        {
          type: "category",
          label: "Hooks",
          collapsed: false,
          link: {
            type: "generated-index",
            slug: "/core/utilities/hooks",
            description: "Utility hooks for menus, modals, and helpers.",
          },
          items: [
            "core/hooks/utilities/use-modal/index",
            "core/hooks/utilities/use-menu/index",
            "core/hooks/utilities/use-breadcrumb/index",
            "core/hooks/utilities/use-import/index",
            "core/hooks/utilities/use-export/index",
            "core/hooks/utilities/buttons/index",
          ],
        },
      ],
    },
    // UI Integrations
    {
      type: "category",
      label: "UI Integrations",
      link: {
        type: "generated-index",
        slug: "/ui-integrations",
        description:
          "UI framework integrations, components, hooks, and examples.",
      },
      className: "category-as-header",
      items: [
        // shadcn/ui
        {
          type: "category",
          label: "shadcn/ui",
          link: {
            type: "generated-index",
            slug: "/ui-integrations/shadcn",
            description:
              "shadcn/ui integration guides, components, and examples.",
          },
          collapsed: false,
          items: [
            "ui-integrations/shadcn/introduction/index",
            {
              type: "category",
              label: "Components",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/shadcn/components",
                description: "shadcn/ui component guides and reference.",
              },
              items: [
                {
                  type: "category",
                  label: "Basic Views",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/shadcn/components/basic-views",
                    description:
                      "Create, edit, list, and show views with shadcn/ui.",
                  },
                  items: [
                    "ui-integrations/shadcn/components/basic-views/create/index",
                    "ui-integrations/shadcn/components/basic-views/edit/index",
                    "ui-integrations/shadcn/components/basic-views/list/index",
                    "ui-integrations/shadcn/components/basic-views/show/index",
                  ],
                },
                {
                  type: "category",
                  label: "Auth Forms",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/shadcn/components/auth-forms",
                    description:
                      "Authentication form components with shadcn/ui.",
                  },
                  items: [
                    "ui-integrations/shadcn/components/sign-in-form/index",
                    "ui-integrations/shadcn/components/sign-up-form/index",
                    "ui-integrations/shadcn/components/forgot-password/index",
                  ],
                },
                {
                  type: "category",
                  label: "Buttons",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/shadcn/components/buttons",
                    description: "Action buttons built with shadcn/ui.",
                  },
                  items: [
                    "ui-integrations/shadcn/components/buttons/clone-button/index",
                    "ui-integrations/shadcn/components/buttons/create-button/index",
                    "ui-integrations/shadcn/components/buttons/delete-button/index",
                    "ui-integrations/shadcn/components/buttons/edit-button/index",
                    "ui-integrations/shadcn/components/buttons/list-button/index",
                    "ui-integrations/shadcn/components/buttons/refresh-button/index",
                    "ui-integrations/shadcn/components/buttons/show-button/index",
                  ],
                },
                {
                  type: "category",
                  label: "Layout",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/shadcn/components/layout",
                    description: "Layout building blocks with shadcn/ui.",
                  },
                  items: [
                    "ui-integrations/shadcn/components/layout/layout-01/index",
                  ],
                },
                "ui-integrations/shadcn/components/forms/index",
                "ui-integrations/shadcn/components/data-table/index",
                "ui-integrations/shadcn/components/themed-layout/index",
                "ui-integrations/shadcn/components/error-component/index",
                "ui-integrations/shadcn/components/auto-save-indicator/index",
                "ui-integrations/shadcn/components/notification-provider/index",
              ],
            },
          ],
        },
        // Ant Design
        {
          type: "category",
          label: "Ant Design",
          link: {
            type: "generated-index",
            slug: "/ui-integrations/ant-design",
            description:
              "Ant Design integration guides, components, hooks, and examples.",
          },
          collapsed: false,
          // className: "category-as-header",
          items: [
            "ui-integrations/ant-design/introduction/index",
            {
              type: "category",
              label: "Components",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/ant-design/components",
                description: "Ant Design component guides and reference.",
              },
              items: [
                "ui-integrations/ant-design/components/themed-layout/index",
                "ui-integrations/ant-design/components/auth-page/index",
                "ui-integrations/ant-design/components/breadcrumb/index",
                "ui-integrations/ant-design/components/filter-dropdown/index",
                "ui-integrations/ant-design/components/auto-save-indicator/index",
                "ui-integrations/ant-design/components/inferencer/index",
                // "ui-integrations/ant-design/components/custom-inputs/index", // This should be included in the guide
                {
                  type: "category",
                  label: "Basic Views",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/ant-design/components/basic-views",
                    description:
                      "Create, edit, list, and show views with Ant Design.",
                  },
                  items: [
                    "ui-integrations/ant-design/components/basic-views/create/index",
                    "ui-integrations/ant-design/components/basic-views/edit/index",
                    "ui-integrations/ant-design/components/basic-views/list/index",
                    "ui-integrations/ant-design/components/basic-views/show/index",
                  ],
                },
                {
                  type: "category",
                  label: "Buttons",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/ant-design/components/buttons",
                    description: "Action buttons built with Ant Design.",
                  },
                  items: [
                    "ui-integrations/ant-design/components/buttons/clone-button/index",
                    "ui-integrations/ant-design/components/buttons/create-button/index",
                    "ui-integrations/ant-design/components/buttons/delete-button/index",
                    "ui-integrations/ant-design/components/buttons/edit-button/index",
                    "ui-integrations/ant-design/components/buttons/export-button/index",
                    "ui-integrations/ant-design/components/buttons/import-button/index",
                    "ui-integrations/ant-design/components/buttons/list-button/index",
                    "ui-integrations/ant-design/components/buttons/refresh-button/index",
                    "ui-integrations/ant-design/components/buttons/save-button/index",
                    "ui-integrations/ant-design/components/buttons/show-button/index",
                  ],
                },
                {
                  type: "category",
                  label: "Fields",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/ant-design/components/fields",
                    description:
                      "Field components for displaying data with Ant Design.",
                  },
                  items: [
                    "ui-integrations/ant-design/components/fields/boolean-field/index",
                    "ui-integrations/ant-design/components/fields/date-field/index",
                    "ui-integrations/ant-design/components/fields/email-field/index",
                    "ui-integrations/ant-design/components/fields/file-field/index",
                    "ui-integrations/ant-design/components/fields/image-field/index",
                    "ui-integrations/ant-design/components/fields/markdown-field/index",
                    "ui-integrations/ant-design/components/fields/number-field/index",
                    "ui-integrations/ant-design/components/fields/tag-field/index",
                    "ui-integrations/ant-design/components/fields/text-field/index",
                    "ui-integrations/ant-design/components/fields/url-field/index",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Hooks",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/ant-design/hooks",
                description: "Ant Design hooks for tables, forms, and modals.",
              },
              items: [
                "ui-integrations/ant-design/hooks/use-table/index",
                "ui-integrations/ant-design/hooks/use-editable-table/index",
                "ui-integrations/ant-design/hooks/use-simple-list/index",
                "ui-integrations/ant-design/hooks/use-form/index",
                "ui-integrations/ant-design/hooks/use-drawer-form/index",
                "ui-integrations/ant-design/hooks/use-modal-form/index",
                "ui-integrations/ant-design/hooks/use-steps-form/index",
                "ui-integrations/ant-design/hooks/use-select/index",
                "ui-integrations/ant-design/hooks/use-checkbox-group/index",
                "ui-integrations/ant-design/hooks/use-radio-group/index",
                "ui-integrations/ant-design/hooks/use-import/index",
                "ui-integrations/ant-design/hooks/use-modal/index",
                "ui-integrations/ant-design/hooks/use-drawer/index",
              ],
            },
            {
              type: "category",
              label: "Examples",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/ant-design/examples",
                description: "Ant Design examples and integrations.",
              },
              items: [
                "examples/authentication/antd",
                "examples/table/antd/useTable",
                "examples/table/antd/tableFilter",
                "examples/table/antd/useEditableTable",
                "examples/table/antd/advancedTable",
                "examples/table/antd/useUpdateMany",
                "examples/table/antd/useDeleteMany",
                "examples/form/antd/useForm",
                "examples/form/antd/useModalForm",
                "examples/form/antd/useDrawerForm",
                "examples/form/antd/useStepsForm",
                "examples/form/antd/custom-form-validation",
                "examples/form/antd/serverSideFormValidation",
                "examples/upload/antd/base64",
                "examples/upload/antd/multipart",
                "examples/import-export/antd",
                "examples/antd-calendar-example",
                "examples/customization/theme/customThemeAntd",
                "examples/themes/refine-themes-antd",
                "examples/remix/remix-antd",
                "examples/storybook/antd-storybook",
              ],
            },
            "ui-integrations/ant-design/theming/index",
            "ui-integrations/ant-design/migration-guide/index",
          ],
        },
        // Material UI
        {
          type: "category",
          label: "Material UI",
          link: {
            type: "generated-index",
            slug: "/ui-integrations/material-ui",
            description:
              "Material UI integration guides, components, hooks, and examples.",
          },
          collapsed: false,
          // className: "category-as-header",
          items: [
            "ui-integrations/material-ui/introduction/index",
            {
              type: "category",
              label: "Components",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/material-ui/components",
                description: "Material UI component guides and reference.",
              },
              items: [
                "ui-integrations/material-ui/components/themed-layout/index",
                "ui-integrations/material-ui/components/auth-page/index",
                "ui-integrations/material-ui/components/breadcrumb/index",
                "ui-integrations/material-ui/components/auto-save-indicator/index",
                "ui-integrations/material-ui/components/inferencer/index",
                {
                  type: "category",
                  label: "Basic Views",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/material-ui/components/basic-views",
                    description:
                      "Create, edit, list, and show views with Material UI.",
                  },
                  items: [
                    "ui-integrations/material-ui/components/basic-views/create/index",
                    "ui-integrations/material-ui/components/basic-views/edit/index",
                    "ui-integrations/material-ui/components/basic-views/list/index",
                    "ui-integrations/material-ui/components/basic-views/show/index",
                  ],
                },
                {
                  type: "category",
                  label: "Buttons",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/material-ui/components/buttons",
                    description: "Action buttons built with Material UI.",
                  },
                  items: [
                    "ui-integrations/material-ui/components/buttons/clone-button/index",
                    "ui-integrations/material-ui/components/buttons/create-button/index",
                    "ui-integrations/material-ui/components/buttons/delete-button/index",
                    "ui-integrations/material-ui/components/buttons/edit-button/index",
                    "ui-integrations/material-ui/components/buttons/export-button/index",
                    "ui-integrations/material-ui/components/buttons/import-button/index",
                    "ui-integrations/material-ui/components/buttons/list-button/index",
                    "ui-integrations/material-ui/components/buttons/refresh-button/index",
                    "ui-integrations/material-ui/components/buttons/save-button/index",
                    "ui-integrations/material-ui/components/buttons/show-button/index",
                  ],
                },
                {
                  type: "category",
                  label: "Fields",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/material-ui/components/fields",
                    description:
                      "Field components for displaying data with Material UI.",
                  },
                  items: [
                    "ui-integrations/material-ui/components/fields/boolean-field/index",
                    "ui-integrations/material-ui/components/fields/date-field/index",
                    "ui-integrations/material-ui/components/fields/email-field/index",
                    "ui-integrations/material-ui/components/fields/file-field/index",
                    "ui-integrations/material-ui/components/fields/markdown-field/index",
                    "ui-integrations/material-ui/components/fields/number-field/index",
                    "ui-integrations/material-ui/components/fields/tag-field/index",
                    "ui-integrations/material-ui/components/fields/text-field/index",
                    "ui-integrations/material-ui/components/fields/url-field/index",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Hooks",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/material-ui/hooks",
                description: "Material UI hooks for tables and forms.",
              },
              items: [
                "ui-integrations/material-ui/hooks/use-auto-complete/index",
                "ui-integrations/material-ui/hooks/use-data-grid/index",
              ],
            },
            {
              type: "category",
              label: "Examples",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/material-ui/examples",
                description: "Material UI examples and integrations.",
              },
              items: [
                "examples/authentication/mui",
                "examples/table/mui/useDataGrid",
                "examples/table/mui/filter",
                "examples/table/mui/advanced",
                "examples/table/mui/cursor-pagination",
                "examples/table/mui/useUpdateMany",
                "examples/table/mui/useDeleteMany",
                "examples/form/mui/useForm",
                "examples/form/mui/useModalForm",
                "examples/form/mui/useDrawerForm",
                "examples/form/mui/useStepsForm",
                "examples/form/mui/serverSideFormValidation",
                "examples/upload/mui/base64",
                "examples/upload/mui/multipart",
                "examples/import-export/material-ui",
                "examples/customization/theme/customThemeMaterialUI",
                "examples/themes/refine-themes-mui",
                "examples/remix/remix-material-ui",
                "examples/storybook/material-ui-storybook",
              ],
            },
            "ui-integrations/material-ui/theming/index",
            {
              type: "category",
              label: "Migration Guide",
              link: {
                type: "doc",
                id: "ui-integrations/material-ui/migration-guide/index",
              },
              items: [
                "ui-integrations/material-ui/migration-guide/material-ui-v5-to-v6",
                "ui-integrations/material-ui/migration-guide/x-data-grid-v4-to-v5",
              ],
            },
          ],
        },
        // Chakra UI
        {
          type: "category",
          label: "Chakra UI",
          link: {
            type: "generated-index",
            slug: "/ui-integrations/chakra-ui",
            description:
              "Chakra UI integration guides, components, and examples.",
          },
          collapsed: false,
          // className: "category-as-header",
          items: [
            "ui-integrations/chakra-ui/introduction/index",
            {
              type: "category",
              label: "Components",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/chakra-ui/components",
                description: "Chakra UI component guides and reference.",
              },
              items: [
                "ui-integrations/chakra-ui/components/themed-layout/index",
                "ui-integrations/chakra-ui/components/auth-page/index",
                "ui-integrations/chakra-ui/components/breadcrumb/index",
                "ui-integrations/chakra-ui/components/auto-save-indicator/index",
                "ui-integrations/chakra-ui/components/inferencer/index",
                {
                  type: "category",
                  label: "Basic Views",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/chakra-ui/components/basic-views",
                    description:
                      "Create, edit, list, and show views with Chakra UI.",
                  },
                  items: [
                    "ui-integrations/chakra-ui/components/basic-views/create/index",
                    "ui-integrations/chakra-ui/components/basic-views/edit/index",
                    "ui-integrations/chakra-ui/components/basic-views/list/index",
                    "ui-integrations/chakra-ui/components/basic-views/show/index",
                  ],
                },
                {
                  type: "category",
                  label: "Buttons",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/chakra-ui/components/buttons",
                    description: "Action buttons built with Chakra UI.",
                  },
                  items: [
                    "ui-integrations/chakra-ui/components/buttons/clone-button/index",
                    "ui-integrations/chakra-ui/components/buttons/create-button/index",
                    "ui-integrations/chakra-ui/components/buttons/delete-button/index",
                    "ui-integrations/chakra-ui/components/buttons/edit-button/index",
                    "ui-integrations/chakra-ui/components/buttons/export-button/index",
                    "ui-integrations/chakra-ui/components/buttons/import-button/index",
                    "ui-integrations/chakra-ui/components/buttons/list-button/index",
                    "ui-integrations/chakra-ui/components/buttons/refresh-button/index",
                    "ui-integrations/chakra-ui/components/buttons/save-button/index",
                    "ui-integrations/chakra-ui/components/buttons/show-button/index",
                  ],
                },
                {
                  type: "category",
                  label: "Fields",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/chakra-ui/components/fields",
                    description:
                      "Field components for displaying data with Chakra UI.",
                  },
                  items: [
                    "ui-integrations/chakra-ui/components/fields/boolean-field/index",
                    "ui-integrations/chakra-ui/components/fields/date-field/index",
                    "ui-integrations/chakra-ui/components/fields/email-field/index",
                    "ui-integrations/chakra-ui/components/fields/file-field/index",
                    "ui-integrations/chakra-ui/components/fields/markdown-field/index",
                    "ui-integrations/chakra-ui/components/fields/number-field/index",
                    "ui-integrations/chakra-ui/components/fields/tag-field/index",
                    "ui-integrations/chakra-ui/components/fields/text-field/index",
                    "ui-integrations/chakra-ui/components/fields/url-field/index",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Examples",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/chakra-ui/examples",
                description: "Chakra UI examples and integrations.",
              },
              items: [
                "examples/authentication/chakra-ui",
                "examples/table/chakra-ui/basic",
                "examples/table/chakra-ui/advanced-react-table",
                "examples/form/chakra-ui/useForm",
                "examples/form/chakra-ui/useModalForm",
                "examples/form/chakra-ui/useDrawerForm",
                "examples/form/chakra-ui/serverSideFormValidation",
                "examples/upload/chakra-ui/base64",
                "examples/upload/chakra-ui/multipart",
                "examples/customization/theme/customThemeChakraUI",
                "examples/themes/refine-themes-chakra-ui",
              ],
            },
            "ui-integrations/chakra-ui/theming/index",
          ],
        },
        // Mantine
        {
          type: "category",
          label: "Mantine",
          link: {
            type: "generated-index",
            slug: "/ui-integrations/mantine",
            description:
              "Mantine integration guides, components, hooks, and examples.",
          },
          collapsed: false,
          // className: "category-as-header",
          items: [
            "ui-integrations/mantine/introduction/index",
            {
              type: "category",
              label: "Components",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/mantine/components",
                description: "Mantine component guides and reference.",
              },
              items: [
                "ui-integrations/mantine/components/themed-layout/index",
                "ui-integrations/mantine/components/auth-page/index",
                "ui-integrations/mantine/components/breadcrumb/index",
                "ui-integrations/mantine/components/auto-save-indicator/index",
                "ui-integrations/mantine/components/inferencer/index",
                {
                  type: "category",
                  label: "Basic Views",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/mantine/components/basic-views",
                    description:
                      "Create, edit, list, and show views with Mantine.",
                  },
                  items: [
                    "ui-integrations/mantine/components/basic-views/create/index",
                    "ui-integrations/mantine/components/basic-views/edit/index",
                    "ui-integrations/mantine/components/basic-views/list/index",
                    "ui-integrations/mantine/components/basic-views/show/index",
                  ],
                },
                {
                  type: "category",
                  label: "Buttons",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/mantine/components/buttons",
                    description: "Action buttons built with Mantine.",
                  },
                  items: [
                    "ui-integrations/mantine/components/buttons/clone-button/index",
                    "ui-integrations/mantine/components/buttons/create-button/index",
                    "ui-integrations/mantine/components/buttons/delete-button/index",
                    "ui-integrations/mantine/components/buttons/edit-button/index",
                    "ui-integrations/mantine/components/buttons/export-button/index",
                    "ui-integrations/mantine/components/buttons/import-button/index",
                    "ui-integrations/mantine/components/buttons/list-button/index",
                    "ui-integrations/mantine/components/buttons/refresh-button/index",
                    "ui-integrations/mantine/components/buttons/save-button/index",
                    "ui-integrations/mantine/components/buttons/show-button/index",
                  ],
                },
                {
                  type: "category",
                  label: "Fields",
                  link: {
                    type: "generated-index",
                    slug: "/ui-integrations/mantine/components/fields",
                    description:
                      "Field components for displaying data with Mantine.",
                  },
                  items: [
                    "ui-integrations/mantine/components/fields/boolean-field/index",
                    "ui-integrations/mantine/components/fields/date-field/index",
                    "ui-integrations/mantine/components/fields/email-field/index",
                    "ui-integrations/mantine/components/fields/file-field/index",
                    "ui-integrations/mantine/components/fields/markdown-field/index",
                    "ui-integrations/mantine/components/fields/number-field/index",
                    "ui-integrations/mantine/components/fields/tag-field/index",
                    "ui-integrations/mantine/components/fields/text-field/index",
                    "ui-integrations/mantine/components/fields/url-field/index",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Hooks",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/mantine/hooks",
                description: "Mantine hooks for forms and selections.",
              },
              items: [
                "ui-integrations/mantine/hooks/use-form/index",
                "ui-integrations/mantine/hooks/use-drawer-form/index",
                "ui-integrations/mantine/hooks/use-modal-form/index",
                "ui-integrations/mantine/hooks/use-steps-form/index",
                "ui-integrations/mantine/hooks/use-select/index",
              ],
            },
            {
              type: "category",
              label: "Examples",
              link: {
                type: "generated-index",
                slug: "/ui-integrations/mantine/examples",
                description: "Mantine examples and integrations.",
              },
              items: [
                "examples/authentication/mantine",
                "examples/table/mantine/basic",
                "examples/table/mantine/advanced-react-table",
                "examples/form/mantine/useForm",
                "examples/form/mantine/useModalForm",
                "examples/form/mantine/useDrawerForm",
                "examples/form/mantine/useStepsForm",
                "examples/form/mantine/serverSideFormValidation",
                "examples/upload/mantine/base64",
                "examples/upload/mantine/multipart",
                "examples/import-export/mantine",
                "examples/customization/theme/customThemeMantine",
                "examples/themes/refine-themes-mantine",
              ],
            },
            "ui-integrations/mantine/theming/index",
          ],
        },
      ],
    },
    // Packages
    {
      type: "category",
      label: "Packages",
      link: {
        type: "generated-index",
        slug: "/packages",
        description: "Ecosystem packages, guides, and examples.",
      },
      className: "category-as-header",
      items: [
        "packages/list-of-packages/index",
        // React Table
        {
          type: "category",
          label: "React Table",
          link: {
            type: "generated-index",
            slug: "/packages/tanstack-table",
            description: "React Table (TanStack Table) guides and examples.",
          },
          collapsed: false,
          items: [
            "packages/tanstack-table/introduction/index",
            "packages/tanstack-table/use-table/index",
            {
              type: "category",
              label: "Examples",
              link: {
                type: "generated-index",
                slug: "/packages/tanstack-table/examples",
                description: "React Table example implementations.",
              },
              items: [
                "examples/table/tanstack-table/basic-tanstack-table",
                "examples/table/tanstack-table/advanced-tanstack-table",
              ],
            },
          ],
        },
        // React Hook Form
        {
          type: "category",
          label: "React Hook Form",
          link: {
            type: "generated-index",
            slug: "/packages/react-hook-form",
            description: "React Hook Form guides and examples.",
          },
          collapsed: false,
          items: [
            "packages/react-hook-form/introduction/index",
            "packages/react-hook-form/use-form/index",
            "packages/react-hook-form/use-modal-form/index",
            "packages/react-hook-form/use-steps-form/index",
            {
              type: "category",
              label: "Examples",
              link: {
                type: "generated-index",
                slug: "/packages/react-hook-form/examples",
                description: "React Hook Form example implementations.",
              },
              items: [
                "examples/form/react-hook-form/useForm",
                "examples/form/react-hook-form/useModalForm",
                "examples/form/react-hook-form/useStepsForm",
              ],
            },
          ],
        },
        "packages/cli/index",
        // "packages/devtools/index",
        "packages/inferencer/index",
        "packages/command-palette/index",
      ],
    },
    // Enterprise Edition
    {
      type: "category",
      label: "Enterprise Edition",
      link: {
        type: "doc",
        id: "enterprise-edition/index",
      },
      className: "category-as-header",
      items: [
        "enterprise-edition/okta/index",
        "enterprise-edition/devtools/index",
        "enterprise-edition/multitenancy/index",
      ],
    },
    // Migration Guide
    {
      type: "category",
      label: "Migration Guide 🚀",
      link: {
        type: "generated-index",
        slug: "/migration-guide",
        description: "Migration guides for upgrading between Refine versions.",
      },
      className: "category-as-header",
      items: [
        "migration-guide/4x-to-5x",
        "migration-guide/3x-to-4x",
        "migration-guide/auth-provider",
        "migration-guide/router-provider",
      ],
    },
    // Further Readings
    {
      type: "category",
      label: "Further Readings",
      link: {
        type: "generated-index",
        slug: "/further-readings",
        description: "Additional articles, resources, and references.",
      },
      className: "category-as-header",
      items: [
        "further-readings/testing",
        "further-readings/telemetry",
        "further-readings/comparison",
        "further-readings/license",
      ],
    },
  ],
};
