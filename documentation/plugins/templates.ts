import type { Plugin } from "@docusaurus/types";

export const TEMPLATE_UI_FRAMEWORKS = [
  "Ant Design",
  "Material UI",
  "Headless",
  "Chakra UI",
  "Mantine",
];

export const TEMPLATE_BACKENDS = [
  "Supabase",
  "Rest API",
  "GraphQL",
  "Strapi",
  "Appwrite",
  "Medusa",
];

// Convert filter labels to URL slugs. Example: "Ant Design" -> "ant-design" "Strapi V4 " -> "strapi-v4".
export const toSlug = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export default async function RefineTemplates(): Promise<Plugin> {
  return {
    name: "docusaurus-plugin-refine-templates",
    contentLoaded: async (args: any) => {
      const { content, actions } = args;
      const { addRoute, createData } = actions;

      await Promise.all(
        (content as typeof templates).map(async (data) => {
          // Persist per-template data so the detail page can read it at build time.
          const json = await createData(
            `templates-${data.slug}.json`,
            JSON.stringify(data, null, 2),
          );

          // Detail pages live at /core/templates/<slug>.
          addRoute({
            path: `/core/templates/${data.slug}`,
            component: "@site/src/components/templates-detail-page/index",
            exact: true,
            modules: {
              content: json,
            },
          });
        }),
      );

      // Filtered list routes for UI framework and UI+backend combos.
      for (const uiFramework of TEMPLATE_UI_FRAMEWORKS) {
        const hasUiTemplates = (content as typeof templates).some(
          (t) => t.uiFramework === uiFramework,
        );
        if (!hasUiTemplates) {
          continue;
        }

        const uiSlug = toSlug(uiFramework);
        const uiJson = await createData(
          `templates-filter-${uiSlug}.json`,
          JSON.stringify({ uiFramework }, null, 2),
        );

        // UI-only filter page at /core/templates/<ui>.
        addRoute({
          path: `/core/templates/${uiSlug}`,
          component: "@site/src/components/templates-filtered-page/index",
          exact: true,
          modules: {
            filters: uiJson,
          },
        });

        for (const backend of TEMPLATE_BACKENDS) {
          const hasComboTemplates = (content as typeof templates).some(
            (t) => t.uiFramework === uiFramework && t.dataProvider === backend,
          );
          if (!hasComboTemplates) {
            continue;
          }

          const backendSlug = toSlug(backend);
          const comboJson = await createData(
            `templates-filter-${uiSlug}-${backendSlug}.json`,
            JSON.stringify({ uiFramework, backend }, null, 2),
          );

          // UI + backend filter page at /core/templates/<ui>/<backend>.
          addRoute({
            path: `/core/templates/${uiSlug}/${backendSlug}`,
            component: "@site/src/components/templates-filtered-page/index",
            exact: true,
            modules: {
              filters: comboJson,
            },
          });
        }
      }
    },
    loadContent: async () => {
      return templates;
    },
  };
}

const templates = [
  {
    slug: "crm-application",
    title: "CRM Application",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-refine-crm.png",
    ],
    imageAlt:
      "CRM application dashboard showing sales pipeline, kanban board, and customer management interface",
    runOnYourLocalPath: null,
    edition: "Enterprise",
    liveDemo: "https://example.crm.refine.dev/",
    github: null,
    reactPlatform: "Vite",
    uiFramework: "Ant Design",
    dataProvider: "Nestjs-query",
    authProvider: "Custom",
    description: `
This CRM app example, built with Refine, demonstrates a complete solution for enterprise-level CRM internal tool needs. It has a wide range of functionalities for real-use cases, which are extensively utilized by enterprise companies.

The app connected to GraphQL API through Refine's Nestjs-query data provider, and its user interface is developed using Ant Design, which Refine offers built-in UI framework support.

We built this template to demonstrate how the Refine framework simplifies and speeds up development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques.


### Key Features:


- **Dashboard**: Overview of CRM activities, key metrics, and customer interactions.
- **Calendar**: Manage appointments and events.
- **Scrumboard-Project Kanban**: Streamline project management and task tracking.
- **Sales Pipeline**: Visualize sales stages and track lead conversions.
- **Companies**: Organize business contacts with detailed profiles.
- **Contacts**: Efficient management of individual customer interactions.
- **Quotes**: Create, send, and manage customer quotes.
- **Administration**: Customize CRM settings, user roles, and permissions.


This CRM app template can be used in for various app requirements like B2B applications, internal tools, admin panel, dashboard. Such as:

- Human Resource Management (HRM) Tools
- IT Service Management (ITSM) Tools
- Network Monitoring Tools
- Risk Management Tools
- Customer Support Tools
- Financial Planning Systems
- Customer Analytics Tools
- Inventory Management Systems,
- Sales and Marketing Tools,
- Supply Chain Management Tools
- Retail Management Systems
- Business Intelligence Tools
- Electronic Health Record (EHR) Systems
- Patient Management Systems
- Health Information Exchange (HIE) Systems
- Pharmacy Management Systems
`,
  },
  {
    slug: "hr-application",
    title: "HR Management App Example",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-refine-hr.png",
    ],
    imageAlt:
      "HR management application showing employee directory, leave management, and organizational hierarchy",
    runOnYourLocalPath: null,
    github: null,
    liveDemo: "https://hr.refine.dev",
    reactPlatform: "Vite",
    uiFramework: "Material UI",
    dataProvider: "Nestjsx-CRUD",
    edition: "Enterprise",
    authProvider: "Custom",
    description: `Demonstrating Refine's Capabilities for Building Enterprise-Level HR Management App

This HR management app, built with Refine, is an example designed to showcase the framework’s flexibility and power in creating enterprise-level internal tools like managing employee information, leave requests, polls, and more.

While not a product, this template demonstrates how quickly and efficiently similar complex apps can be developed using Refine, serving as both a learning resource and inspiration for building your own applications.

### Enterprise Needs in Focus

Our HR app example is designed for enterprise companies needs, which is why its source code is only available to Refine enterprise users.

Even if you don’t have access to the HR app's source code, you can still explore the capabilities of Refine through our other complete app examples.

### Key Features:

- **Leave Management**: Track and assign annual, sick, and casual leave, with options for requesting time off via a calendar interface.
- **Employee Directory**: Visualize organizational hierarchies and manage employee details with ease.
- **Expense Management**: Submit and manage expense requests for travel, training, meals, and more.
- **Polls and Surveys**: Conduct employee surveys and collect valuable insights on benefits and company policies.
- **Calendar Integration**: View and manage time off and upcoming events in an easy-to-use calendar format.
- **Notifications**: Receive real-time notifications on leave approvals, expense status, and important company announcements.

### Suitable for Internal HR Tool-Oriented Needs

This HR app template can be used in for various app requirements like B2B applications, internal tools, admin panel, dashboard. Such as:

- **Recruitment and Applicant Tracking Systems (ATS)**
- **Employee Engagement Platforms**
- **Compensation and Benefits Management Tools**
- **Workforce Planning and Time Tracking Solutions**
- **Compliance Management Systems**
- **Employee Self-Service Portals**
- **Succession Planning Tools**
- **Employee Wellness and Assistance Programs**
- **HR Analytics and Reporting Tools**
- **Performance Review and Incentive Management Systems**
- **Training and Development Management**
- **Onboarding and Offboarding Solutions**
- **Payroll Management Tools**

By using this app as a starting point, companies can build a customized HR platform that suits their specific internal processes, speeding up development and reducing the complexity of building from scratch.
`,
  },
  {
    slug: "next-js-tailwind",
    title: "E-Commerce Application Storefront",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-storefront.png",
    ],
    imageAlt:
      "E-commerce storefront with product listings, shopping cart, and modern Tailwind CSS design",
    runOnYourLocalPath: "finefoods-client",
    edition: "Community",
    liveDemo: "https://example.refine.dev/",
    github:
      "https://github.com/refinedev/refine/tree/main/examples/finefoods-client",
    reactPlatform: "Next.js",
    uiFramework: "Headless",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `

This is a template that can serve as an example for building React-based storefronts, admin panels, or internal tools using Refine. Implemented popular tools like Tailwind CSS and Next.js, which are highly demanded by the community.

### Key Features:

- With Refine's headless approach, we demonstrated how to apply a style of your choice, such as Tailwind CSS.
- SSR support with Next.js. Refine supports SSR with Next.js and Remix. You can use this template as a starter point for Next.js-powered Refine apps.
- REST API implementation

The source code is also open-source; feel free to use or inspect it to discover how to Refine works with any custom designs & UI library and supports SSR with Next.js.`,
  },
  {
    slug: "react-admin-panel",
    title: "B2B Admin Panel with Material UI",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-finefoods-material-ui.png",
    ],
    imageAlt:
      "Food delivery admin panel with Material UI showing orders dashboard, analytics charts, and order management",
    runOnYourLocalPath: "finefoods-material-ui",
    edition: "Community",
    liveDemo: "https://example.mui.admin.refine.dev",
    github:
      "https://github.com/refinedev/refine/tree/main/examples/finefoods-material-ui",
    reactPlatform: "Vite",
    uiFramework: "Material UI",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
This example of a React admin panel, built with Refine, provides a comprehensive solution for the needs of enterprise-level admin panels. It features a full range of functionalities typical in products used by enterprise companies.

The admin panel connects to a REST API using a Simple REST data provider. Its user interface is developed with Material UI, which Refine offers built-in UI framework support.

We built this template to showcase the efficiency and ease of using the Refine framework in development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. As it's ready for production, you can use this template as a foundation to build your own React admin panel or implement it as it is.

The template is open-source, so you can freely use or examine it to understand how Refine works.

### Key Features:

-   **Dashboard**: Get an overview of food ordering activities, track product performance, and view insightful charts.
-   **Orders**: Manage, track, and filter all customer orders.
-   **Users**: Administer customer and courier accounts and data.
-   **Stores**: View and manage the list of participating stores.
-   **Categories**: Categorize and organize menu items and store types.
-   **Couriers**: Monitor and manage courier activity and interactions.
-   **Reviews**: Handle customer feedback, review ratings, and respond to comments.

This admin panel template can be used in for various app requirements like B2B applications, internal tools, admin panel, dashboard. Such as:

- Food Ordering Systems
- Restaurant management Systems
- Portfolio Management Software
- Data Integration Tools
- Healthcare Analytics Software
- Telemedicine Platforms
- Customer Support Tools
- Financial Planning Systems
- Customer Analytics Tools
- Inventory Management Systems
- Workforce Management Systems
- Electronic Health Record (EHR) Systems
- Patient Management Systems
`,
  },
  {
    slug: "react-admin-panel-ant-design",
    title: "B2B Internal tool with Ant Design",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-finefoods-ant-design.png",
    ],
    imageAlt:
      "Food delivery admin panel with Ant Design showing orders list, filters, and detailed order information",
    runOnYourLocalPath: "finefoods-antd",
    edition: "Community",
    liveDemo: "https://example.admin.refine.dev",
    github:
      "https://github.com/refinedev/refine/tree/main/examples/finefoods-antd",
    reactPlatform: "Vite",
    uiFramework: "Ant Design",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
This example of a B2B React admin panel, built with Refine, provides a comprehensive solution for the needs of enterprise-level internal tools. It features a full range of functionalities typical in products used by enterprise companies.

The admin panel connects to a REST API using a Simple REST data provider. Its user interface is developed with Ant Design, which Refine offers built-in UI framework support.

We built this template to showcase the efficiency and ease of using the Refine framework in development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. As it's ready for production, you can use this template as a foundation to build your own React admin panel or implement it as it is.

The template is open-source, so you can freely use or examine it to understand how Refine works.


### Key Features:

- **Dashboard**: Get an overview of food ordering activities, track product performance, and view insightful charts.
- **Orders**: Manage, track, and filter all customer orders.
- **Users**: Administer customer and courier accounts and data.
- **Stores**: View and manage the list of participating stores.
- **Categories**: Categorize and organize menu items and store types.
- **Couriers**: Monitor and manage courier activity and interactions.
- **Reviews**: Handle customer feedback, review ratings, and respond to comments.

This admin panel template can be used in for various app requirements like B2B applications, internal tools, admin panel, dashboard. Such as:

- Food Ordering Systems
- Restaurant management Systems
- Portfolio Management Software
- Data Integration Tools
- Healthcare Analytics Software
- Telemedicine Platforms
- Customer Support Tools
- Financial Planning Systems
- Customer Analytics Tools
- Inventory Management Systems
- Workforce Management Systems
- Electronic Health Record (EHR) Systems
- Patient Management Systems

`,
  },
  {
    slug: "supabase-crud-app",
    title: "Pixels",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-pixels.png",
    ],
    imageAlt:
      "Collaborative pixel canvas application with real-time drawing features powered by Supabase",
    runOnYourLocalPath: "pixels",
    edition: "Community",
    liveDemo: "https://pixels.refine.dev/",
    github: "https://github.com/refinedev/refine/tree/main/examples/pixels",
    tutorial: "https://refine.dev/core/week-of-refine-supabase/",
    reactPlatform: "Vite",
    uiFramework: "Ant Design",
    dataProvider: "Supabase",
    authProvider: "Supabase",
    description: `
This example presents the RefineWeek series - a seven-part quickfire guide to help developers learn the ins and outs of Refine and Supabase's powerful capabilities and get going with Refine within a week.

The source code for this CRUD app is open-source, providing an opportunity for you to use or examine it to gain a deeper understanding of how Refine operates. The CRM application featured in this series utilizes a Supabase API through Refine's Supabase data provider, and its user interface is crafted using Ant Design.

This CRM application consumes a Supabase API through Refine's Supabase data provider, and its user interface is developed using Ant Design, which Refine offers built-in UI framework support.

We built this template to demonstrate how the Refine framework simplifies and speeds up development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques.

### Key Features:

- **Realtime Collaboration Features**: Implements real-time updates using Supabase's Realtime for collaborative canvas drawing.
- **Role-Based Authorization**: Incorporates user role-based authorization with different permissions for editors and admins.
- **Audit Logging**: Implements an audit log for tracking pixel drawing activities in both the client and admin apps.
        `,
  },
  {
    slug: "react-pdf-invoice-generator",
    title: "Invoice Generator - Internal Tool",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-invoice-generator.png",
    ],
    imageAlt:
      "Invoice generator interface showing client management, invoice creation form, and PDF preview",
    runOnYourLocalPath: "invoicer",
    edition: "Community",
    liveDemo: "https://refine-invoicer.netlify.app/",
    github: "https://github.com/refinedev/refine/tree/main/examples/invoicer",
    reactPlatform: "Vite",
    uiFramework: "Ant Design",
    dataProvider: "Strapi",
    authProvider: "Strapi",
    description: `
The Invoicer is a template for an internal tool, integrating Refine, Strapi, and Ant Design technologies. It's designed for users to manage account registrations, client additions, and invoice issuance. A standout feature of this app is its ability to generate PDF invoices, enabling the creation of professional documents.

With its PDF generation feature, this open-source internal tool template is ideal for understanding Refine's capabilities. The app uses Strapi for data management, connecting through a Strapi data provider. Its interface is crafted using Ant Design, supported natively by Refine for a seamless UI experience.

We built this template to showcase the efficiency and ease of using the Refine framework in development along with third-party API management tools. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. Being production-ready, this template can serve as a solid base for developing your own React-based internal tools, or it can be used as-is for immediate implementation.



### Key Features

- **Comprehensive CRUD Operations**: The app supports CRUD functionalities for companies, clients, contacts, missions, and invoices.
- **Authentication and Authorization**: Implements secure user authentication and role-based permissions using Refine's authProvider.
- **PDF Invoice Generation**: Includes the capability to generate and view PDF documents of invoices using the native browser print feature.
        `,
  },
  {
    slug: "win-95-style-admin-panel",
    title: "Win95 Style Admin Panel",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/video-club-win95.png",
    ],
    imageAlt:
      "Retro Windows 95 styled video club admin panel with classic UI elements and nostalgic design",
    runOnYourLocalPath: "win95",
    edition: "Community",
    liveDemo: "https://videoclub.refine.dev",
    github: "https://github.com/refinedev/refine/tree/main/examples/win95",
    reactPlatform: "Vite",
    uiFramework: "Headless",
    dataProvider: "Supabase",
    authProvider: "Supabase",
    description: `
This Fun CRUD app example demonstrates how you can customize the Refine app design for specific needs. It is connected to a Supabase backend through Refine’s Supabase data provider and its user interface is developed using [React95](https://github.com/react95-io/React95).

The source code of the CRUD app is also open-source; feel free to use or inspect it to discover how Refine works along with external UI packages.
        `,
  },
  {
    slug: "react-crud-app",
    title: "Realworld Example",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-realworld.png",
    ],
    imageAlt:
      "RealWorld example application showing article feed, user authentication, and social features",
    runOnYourLocalPath: "real-world-example",
    edition: "Community",
    liveDemo: "https://refine-real-world.netlify.app/",
    github: "https://github.com/refinedev/real-world-example",
    reactPlatform: "Vite",
    uiFramework: "Headless",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
This RealWorld app template displays a comprehensive full-stack application created using Refine, including features like CRUD operations, user authentication, routing, and pagination, among others.

The RealWorld example standard, often called the "Mother of All Demo Apps," is a specification for building full-stack applications that demonstrate real-world usage of various frontend and backend technologies. This standard provides consistent requirements for creating functionally equivalent applications across different technology stacks.

This RealWorld example aims to demonstrate the practical use of Refine in building standards and real-world applications, providing a more authentic and useful example than the usual "to-do list" demonstrations.

Since the source code of this RealWorld app is open-source, you have the freedom to use or explore it to gain insights into the workings of Refine and its integration with Next.js and Tailwind CSS.


### Key Features
- Authenticate users via JWT (login/register pages + logout button on settings page)
- CRUD users (sign up & settings page - no deleting required)
- CRUD Articles
- CRUD Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users
`,
  },
  {
    slug: "multitenancy-strapi",
    title: "Multitenancy App with Strapi",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-multitenancy-strapi.webp",
    ],
    imageAlt:
      "Multi-tenant application dashboard with store selection, product management, and Strapi integration",
    runOnYourLocalPath: null,
    edition: "Enterprise",
    liveDemo: "https://multi-tenancy-strapi.refine.dev",
    github: null,
    tutorial: "https://refine.dev/docs/guides-concepts/multitenancy/",
    reactPlatform: "Vite",
    uiFramework: "Ant Design",
    dataProvider: "Strapi",
    authProvider: "Strapi",
    description: `
Multitenancy is a design approach where a single software instance on a server provides services to multiple clients at the same time. This CRUD app template is an excellent example of implementing multitenant architecture in Refine applications. It connects to a Strapi API using a Strapi data provider and features a user interface developed with Ant Design, which is natively supported by Refine.

This template was developed to demonstrate how the Refine framework can simplify and expedite the development of apps with enterprise-level needs. It's a valuable resource that offers insights into Refine's best practices and modern development techniques.

The source code of this multitenancy app is open-source, allowing you to use or inspect it to see how Refine can fulfill enterprise-grade application requirements.
        `,
  },
  {
    slug: "ant-design-template",
    title: "Internal tool template with Ant Design ",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-ant-design-template.png",
    ],
    imageAlt:
      "Generic internal tool template with Ant Design showing authentication screens and CRUD operations",
    runOnYourLocalPath: "auth-antd",
    edition: "Community",
    liveDemo:
      "https://codesandbox.io/p/sandbox/github/refinedev/refine/tree/main/examples/auth-antd",
    github: "https://github.com/refinedev/refine/tree/main/examples/auth-antd",
    tutorial: "https://refine.dev/core/tutorial",
    reactPlatform: "Vite",
    uiFramework: "Ant Design",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
Complete internal tool template built with Material UI. Features authentication and CRUD screens.
        `,
  },
  {
    slug: "material-ui-template",
    title: "Generic Internal Tool Template with Material UI",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-material-ui-template.png",
    ],
    imageAlt:
      "Generic internal tool template with Material UI showing login page and data table interface",
    runOnYourLocalPath: "auth-material-ui",
    edition: "Community",
    liveDemo:
      "https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/auth-material-ui",
    github:
      "https://github.com/refinedev/refine/tree/main/examples/auth-material-ui",
    tutorial: "https://refine.dev/core/tutorial",
    reactPlatform: "Vite",
    uiFramework: "Material UI",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
Complete internal tool template built with Material UI. Features authentication and CRUD screens.
        `,
  },
  {
    slug: "mantine-template",
    title: "Generic Internal Tool Template with Mantine",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-mantine-template.png",
    ],
    imageAlt:
      "Generic internal tool template with Mantine UI showing clean design with authentication and data management",
    runOnYourLocalPath: "auth-mantine",
    edition: "Community",
    liveDemo:
      "https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/auth-mantine",
    github:
      "https://github.com/refinedev/refine/tree/main/examples/auth-mantine",
    tutorial: "https://refine.dev/core/tutorial",
    reactPlatform: "Vite",
    uiFramework: "Mantine",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
Complete internal tool template built with Mantine. Features authentication and CRUD screens.
        `,
  },
  {
    slug: "chakra-ui-template",
    title: "Generic Internal Tool Template with Chakra UI",
    images: [
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-chakra-ui-template.png",
    ],
    imageAlt:
      "Generic admin panel template with Chakra UI showing authentication screens and CRUD functionality",
    runOnYourLocalPath: "auth-chakra-ui",
    edition: "Community",
    liveDemo:
      "https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/auth-chakra-ui",
    github:
      "https://github.com/refinedev/refine/tree/main/examples/auth-chakra-ui",
    tutorial: "https://refine.dev/core/tutorial",
    reactPlatform: "Vite",
    uiFramework: "Chakra UI",
    dataProvider: "Rest API",
    authProvider: "Custom",
    description: `
Complete admin panel template built with Chakra UI. Features authentication and CRUD screens.
        `,
  },
];
