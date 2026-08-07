import type { IntegrationsType } from "../types/integrations";
import {
  Ably,
  Airtable,
  Antd,
  Appwrite,
  Chakra,
  Directus,
  Dp,
  Elide,
  ElideGraphql,
  EntRefine,
  Firebase,
  Graphql,
  Hasura,
  HookForm,
  Hygraph,
  JSONApi,
  Kbar,
  Mantine,
  Medusa,
  Mui,
  Nest,
  NestQuery,
  Nextjs,
  React,
  Remix,
  Rest,
  Sanity,
  SQLite,
  Strapi,
  Supabase,
  UseGenerated,
  Kinde,
  PocketBase,
  ShadCnUI,
  PostgREST,
  Chakrav3,
} from "./integration-icons";

export const integrations: IntegrationsType = {
  "ui-framework-packages": [
    {
      name: "Material UI",
      icon: Mui,
      description:
        "<strong>Material UI</strong> Framework support. 20+ framework-specific hooks and  components  incl. DataGrid (+ Pro), AutoComplete, Menu, Layout, Notification and CRUD components.",
      url: "https://www.npmjs.com/package/@refinedev/mui",
      status: "stable",
    },
    {
      name: "Ant Design",
      icon: Antd,
      description:
        "<strong>Ant Design</strong> System UI Framework support. 20+ framework-specific <strong>hooks</strong> and  <strong>components</strong> incl. Table, Form, Select, Menu, Layout, Notification and CRUD components.",
      url: "https://www.npmjs.com/package/@refinedev/antd",
      status: "stable",
    },
    {
      name: "Chakra UI",
      icon: Chakra,
      description:
        " <strong>Chakra UI</strong> Framework support. 20+ framework-specific components incl. Layout, Feedback, and CRUD components.",
      url: "https://www.npmjs.com/package/@refinedev/chakra-ui",
      status: "stable",
    },
    {
      name: "Mantine UI",
      icon: Mantine,
      description:
        " <strong>Mantine UI</strong> Framework support. 20+ framework-specific hooks and components incl. Table, Form, AutoComplete, Menu, Layout, Notification and CRUD components.",
      url: "https://www.npmjs.com/package/@refinedev/mantine",
      status: "stable",
    },
  ],
  "data-provider-packages": [
    {
      name: "REST API",
      icon: Rest,
      description: "Connect any custom <strong>REST API</strong> backend.",
      url: "https://www.npmjs.com/package/@refinedev/simple-rest",
      status: "stable",
    },
    {
      name: "GraphQL",
      icon: Graphql,
      description: "Connect any custom <strong>GraphQL</strong> backend.",
      url: "https://www.npmjs.com/package/@refinedev/graphql",
      status: "stable",
    },
    {
      name: "NestJsX CRUD",
      icon: Nest,
      description:
        "Consume <strong>REST API's</strong> built with <strong>NestJs</strong>.",
      url: "https://www.npmjs.com/package/@refinedev/nestjsx-crud",
      status: "stable",
    },
    {
      name: "Strapi",
      icon: Strapi,
      description:
        "<strong>Strapi</strong> connector for <strong>v4 REST API</strong>.",
      url: "https://www.npmjs.com/package/@refinedev/strapi",
      status: "stable",
    },
    {
      name: "Supabase",
      icon: Supabase,
      description:
        "<strong>Supabase</strong> data provider. Supports <strong>Supabase Realtime</strong> for <strong>live/realtime</strong> projects.",
      url: "https://www.npmjs.com/package/@refinedev/supabase",
      status: "stable",
    },
    {
      name: "Hasura GraphQL",
      icon: Hasura,
      description:
        "<strong>Hasura GraphQL</strong> data provider. Supports <strong>GraphQL Subscriptions</strong> for <strong>live/realtime</strong> projects.",
      url: "https://www.npmjs.com/package/@refinedev/hasura",
      status: "stable",
    },
    {
      name: "Nestjs-Query",
      icon: NestQuery,
      description:
        "Consume <strong>GraphQL API's</strong> built with <strong>Nestjs-Query</strong>.",
      url: "https://www.npmjs.com/package/@refinedev/nestjs-query",
      status: "stable",
    },
    {
      name: "Appwrite",
      icon: Appwrite,
      description:
        " Appwrite data provider. Supports <strong>Appwrite Realtime</strong> for <strong>live/realtime</strong> projects.",
      url: "https://www.npmjs.com/package/@refinedev/appwrite",
      status: "stable",
    },
    {
      name: "Airtable",
      icon: Airtable,
      description: "Use <strong>Airtable</strong> as backend service.",
      url: "https://www.npmjs.com/package/@refinedev/airtable",
      status: "stable",
    },
    {
      name: "Medusa",
      icon: Medusa,
      description:
        "<strong>Medusa</strong> connector for your e-commerce projects.",
      url: "https://www.npmjs.com/package/@refinedev/medusa",
      status: "stable",
    },
  ],
  "community-ui-framework-packages": [
    {
      name: "Chakra UI v3",
      icon: Chakrav3,
      description:
        " <strong>Chakra UI v3</strong> Framework support. 20+ framework-specific components incl. Layout, Feedback, and CRUD components.",
      url: "https://www.npmjs.com/package/@ffimnsr/refine-chakra-ui-v3",
      status: "stable",
      contributors: [
        {
          name: "ffimnsr",
          url: "https://github.com/ffimnsr",
        },
      ],
    },
  ],
  "community-data-provider-packages": [
    {
      name: "Directus Data Provider",
      icon: Directus,
      description:
        "Connector for backends created with <strong>Directus</strong>",
      url: "https://www.npmjs.com/package/@tspvivek/refine-directus",
      status: "stable",
      contributors: [
        {
          name: "tspvivek",
          url: "https://github.com/tspvivek",
        },
      ],
    },
    {
      name: "Firebase Data Provider",
      icon: Firebase,
      description: "Support for <strong>Firebase</strong> services.",
      url: "https://www.npmjs.com/package/refine-firebase",
      status: "stable",
      contributors: [
        {
          name: "rturan29",
          url: "https://github.com/resulturan",
        },
      ],
    },
    {
      name: "Hygraph Data Provider",
      icon: Hygraph,
      description:
        "Connector for backends created with <strong>Hygraph</strong> (GraphQL)",
      url: "https://github.com/acomagu/refine-hygraph",
      status: "stable",
      contributors: [
        {
          name: "acomagu",
          url: "https://github.com/acomagu",
        },
      ],
    },
    {
      name: "Sanity Data Provider",
      icon: Sanity,
      description:
        "Connector for backends created with <strong>Sanity</strong>",
      url: "https://github.com/hirenf14/refine-sanity",
      status: "stable",
      contributors: [
        {
          name: "hirenf14",
          url: "https://github.com/hirenf14/refine-sanity",
        },
      ],
    },
    {
      name: "Elide Data Provider",
      icon: Elide,
      description: "Connector for backends created with <strong>Elide</strong>",
      url: "https://github.com/chirdeeptomar/refine-elide-rest",
      status: "stable",
      contributors: [
        {
          name: "chirdeeptomar",
          url: "https://github.com/chirdeeptomar",
        },
      ],
    },
    {
      name: "Elide GraphQL Data Provider",
      icon: ElideGraphql,
      description:
        "Connector for GraphQL backends created with <strong>Elide</strong>",
      url: "https://github.com/chirdeeptomar/refine-elide-graphql",
      status: "stable",
      contributors: [
        {
          name: "chirdeeptomar",
          url: "https://github.com/chirdeeptomar",
        },
      ],
    },
    {
      name: "Ent refine",
      icon: EntRefine,
      description:
        "A library that generates fully customizable UI based on Entgo ORM and GraphQL API with Refine.",
      url: "https://github.com/diazoxide/entrefine",
      status: "stable",
      contributors: [
        {
          name: "diazoxide",
          url: "https://github.com/diazoxide",
        },
      ],
    },
    {
      name: "useGenerated Data Provider",
      icon: UseGenerated,
      description:
        "Connector for backends created with <strong>useGenerated</strong> (GraphQL)",
      url: "https://github.com/usegen/refine-use-generated",
      status: "stable",
      contributors: [
        {
          name: "usegen",
          url: "https://github.com/usegen",
        },
      ],
    },
    {
      name: "SQLite Data Provider",
      icon: SQLite,
      description:
        "Connector for backends created with <strong>SQLite</strong>",
      url: "https://github.com/mateusabelli/refine-sqlite",
      status: "stable",
      contributors: [
        {
          name: "mateusabelli",
          url: "https://github.com/mateusabelli",
        },
      ],
    },
    {
      name: "JSON:API Data Provider",
      icon: JSONApi,
      description:
        "Connector for backends created with <strong>JSON:API</strong>",
      url: "https://github.com/mahirmahdi/refine-jsonapi",
      status: "stable",
      contributors: [
        {
          name: "mahirmahdi",
          url: "https://github.com/mahirmahdi",
        },
      ],
    },
    {
      name: "PocketBase Data Provider",
      icon: PocketBase,
      description:
        "Connector for backends created with <strong>PocketBase</strong>",
      url: "https://github.com/kruschid/refine-pocketbase",
      status: "stable",
      contributors: [
        {
          name: "kruschid",
          url: "https://github.com/kruschid",
        },
      ],
    },
    {
      name: "PostgREST Data Provider",
      icon: PostgREST,
      description:
        "Connector for backends created with <strong>PostgREST</strong>",
      url: "https://github.com/ffimnsr/refine-postgrest-ts",
      status: "stable",
      contributors: [
        {
          name: "ffimnsr",
          url: "https://github.com/ffimnsr",
        },
      ],
    },
  ],
  frameworks: [
    {
      name: "Next.js",
      icon: Nextjs,
      description: "Router Provider for <strong>Next.js</strong>",
      url: "https://www.npmjs.com/package/@refinedev/nextjs-router",
      status: "stable",
    },
    {
      name: "Remix",
      icon: Remix,
      description: "Router Provider for <strong>Remix</strong>",
      url: "https://www.npmjs.com/package/@refinedev/remix-router",
      status: "stable",
    },
  ],
  integrations: [
    {
      name: "React Table",
      icon: React,
      description:
        "<strong>React Table</strong> integration. Powerful tables & datagrids for your <strong>headless</strong> projects.",
      url: "https://www.npmjs.com/package/@refinedev/react-table",
      status: "stable",
    },
    {
      name: "React Hook Form",
      icon: HookForm,
      description:
        "<strong>React Hook Form</strong> integration. Extensible forms and validation for your projects.",
      url: "https://www.npmjs.com/package/@refinedev/react-hook-form",
      status: "stable",
    },
    {
      name: "kbar interface",
      icon: Kbar,
      description: "Add command / crtrl+k interfaces to your project.",
      url: "https://www.npmjs.com/package/@refinedev/kbar",
      status: "stable",
    },
  ],
  "live-providers": [
    {
      name: "Ably Live Provider",
      icon: Ably,
      description:
        "<strong>Ably</strong> support for for <strong>live/realtime</strong> projects.",
      url: "https://www.npmjs.com/package/@refinedev/ably",
      status: "stable",
    },
  ],
  "community-packages": [
    {
      name: "DP Customizer",
      icon: Dp,
      description: " Mix & match different data providers",
      url: "https://www.npmjs.com/package/data-provider-customizer",
      status: "stable",
      contributors: [
        {
          name: "umutzd",
          url: "https://github.com/umutzd",
        },
      ],
    },
    {
      name: "Kinde Auth Provider",
      icon: Kinde,
      description:
        "Auth provider for Refine to integrate <strong>Kinde</strong> authentication",
      url: "https://github.com/hirenf14/refine-auth-kinde-react",
      status: "stable",
      contributors: [
        {
          name: "hirenf14",
          url: "https://github.com/hirenf14/refine-auth-kinde-react",
        },
      ],
    },
    {
      name: "Shadcn UI",
      icon: ShadCnUI,
      description:
        "<strong>Shadcn UI</strong> integration. Table, Form, Layout, Notification and CRUD components.",
      url: "https://npmjs.com/package/@ferdiunal/refine-shadcn",
      status: "stable",
      contributors: [
        {
          name: "ferdiunal",
          url: "https://github.com/ferdiunal",
        },
      ],
    },
  ],
};
