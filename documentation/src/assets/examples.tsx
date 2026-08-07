import { PageIcon } from "@site/src/refine-theme/icons/page";
import { ShareIcon } from "@site/src/refine-theme/icons/share";
import React from "react";
import type { Examples } from "../types/examples";

export const SHOW_CASES: Examples = [
  {
    title: "Refine CRM Application",
    description:
      "Comprehensive CRM App developed using Refine, Ant Design and GraphQL. It includes features like authentication, a dashboard, and over 10 CRUD interfaces ranging from charts and sales kanban boards to user administration.",
    image: "/examples/crm-banner.jpg",
    image2x: "/examples/crm-banner.jpg",
    buttons: [
      {
        text: "Demo",
        link: "https://example.crm.refine.dev/",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source: "https://github.com/refinedev/refine/tree/main/examples/app-crm",
  },
  {
    title: "B2B Internal tool with Ant Design",
    description:
      "Complete admin panel example built with Ant Design. Features authentication, dashboard and 10+ CRUD screens from orders to user management.",
    image: "/examples/antd-finefoods.jpg",
    image2x: "/examples/antd-finefoods2x.jpg",
    buttons: [
      {
        text: "Demo",
        link: "https://example.admin.refine.dev",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source:
      "https://github.com/refinedev/refine/tree/main/examples/finefoods-antd",
  },
  {
    title: "B2B Admin Panel with Material UI",
    description:
      "Complete admin panel example built with Material UI. Features authentication, dashboard and 10+ CRUD screens from orders to user management.",
    image: "/examples/mui-finefoods.jpg",
    image2x: "/examples/mui-finefoods2x.jpg",
    buttons: [
      {
        text: "Demo",
        link: "https://example.mui.admin.refine.dev",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source:
      "https://github.com/refinedev/refine/tree/main/examples/finefoods-material-ui",
  },
];

export const EXAMPLES: Examples = [
  {
    title: "Realworld Example",
    description: `"The mother of all demo apps" - Exemplary fullstack Medium.com clone powered by <strong>Refine</strong>!`,
    image: "/examples/real-world.jpg",
    image2x: "/examples/real-world2x.jpg",
    buttons: [
      {
        text: "Demo",
        link: "https://refine-real-world.netlify.app/",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source: "https://github.com/refinedev/real-world-example",
  },
  {
    title: "Finefoods Storefront",
    description:
      "Headless storefront example built with Tailwind CSS. Features product listings and a simple shopping cart. Supports SSR with NextJS.",
    image: "/examples/food-delivery.jpg",
    image2x: "/examples/food-delivery2x.jpg",
    buttons: [
      {
        text: "Demo",
        link: "https://example.refine.dev",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source:
      "https://github.com/refinedev/refine/tree/main/examples/finefoods-client",
  },
  {
    title: "Win95 Style Admin Panel",
    description:
      "With <strong>Refine</strong>'s headless feature, you can include any UI in your project and take full advantage of all its features without worrying about compatibility.",
    image: "/examples/win95.jpg",
    image2x: "/examples/win952x.jpg",
    buttons: [
      {
        text: "Blog",
        link: "https://refine.dev/blog/awesome-react-windows95-ui-with-refine",
        icon: (props) => <PageIcon {...props} />,
      },
      {
        text: "Demo",
        link: "https://win95.refine.dev",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source: "https://github.com/refinedev/refine/tree/main/examples/blog-win95",
  },
  {
    title: "Invoice Generator App",
    description:
      "You can develop any web application or admin panel you want in a very short time with <strong>Refine</strong> like an invoice app.",
    image: "/examples/invoice-generator.jpg",
    image2x: "/examples/invoice-generator2x.jpg",
    buttons: [
      {
        text: "Blog",
        link: "https://refine.dev/core/week-of-refine-strapi/",
        icon: (props) => <PageIcon {...props} />,
      },
      {
        text: "Demo",
        link: "https://invoice-generator.refine.dev",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source:
      "https://github.com/refinedev/refine/tree/main/examples/refine-week-invoice-generator",
  },
  {
    title: "Refine Pixels!",
    description:
      "Our internal hackathon winner by  Ali Emir Şen. He used Supabase as a db and real-time API and it worked in perfect harmony with <strong>Refine</strong>.",
    image: "/examples/refine-pixels.jpg",
    image2x: "/examples/refine-pixels2x.jpg",
    buttons: [
      {
        text: "Blog",
        link: "https://refine.dev/core/week-of-refine-supabase/",
        icon: (props) => <PageIcon {...props} />,
      },
      {
        text: "Demo",
        link: "https://pixels.refine.dev/",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source: "https://github.com/refinedev/refine/tree/main/examples/pixels",
    isExternal: true,
  },
  {
    title: "Multi-Tenancy Example with Strapi",
    description:
      "Cake House application using <strong>Refine</strong> and Strapi-v4 and AppWrite.",
    image: "/examples/multi-tenancy-strapi.jpg",
    image2x: "/examples/multi-tenancy-strapi2x.jpg",
    buttons: [
      {
        text: "Blog",
        link: "https://refine.dev/docs/guides-concepts/multitenancy",
        icon: (props) => <PageIcon {...props} />,
      },
      {
        text: "Demo",
        link: "https://multi-tenancy-strapi.refine.dev",
        icon: (props) => <ShareIcon {...props} />,
      },
    ],
    source:
      "https://github.com/refinedev/refine/tree/main/examples/multi-tenancy-strapi",
  },
];
