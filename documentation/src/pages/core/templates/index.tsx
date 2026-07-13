import Head from "@docusaurus/Head";
import {
  Antd,
  Appwrite,
  Chakra,
  Graphql,
  Headless,
  Mantine,
  Medusa,
  Mui,
  RestWithoutText,
  Strapi,
  Supabase,
} from "@site/src/assets/integration-icons";
import { CommonDrawer } from "@site/src/refine-theme/common-drawer";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { LandingFooter } from "@site/src/refine-theme/landing-footer";
import { TemplatesFilterButton } from "@site/src/refine-theme/templates-filter-button";
import {
  type Filters,
  TemplatesFilters,
} from "@site/src/refine-theme/templates-filters";
import { TemplatesHero } from "@site/src/refine-theme/templates-hero";
import { TemplatesList } from "@site/src/refine-theme/templates-list";
import { TemplateEdition } from "@site/src/types/integrations";
import clsx from "clsx";
import React, { type SVGProps } from "react";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@site/src/components/breadcrumbs";
import {
  TEMPLATE_BACKENDS,
  TEMPLATE_UI_FRAMEWORKS,
} from "../../../../plugins/templates";

type TemplatesPageFilters = {
  edition?: Filters["edition"];
  uiFramework?: Filters["uiFramework"][number];
  backend?: Filters["backend"][number];
};

type TemplatesPageProps = {
  initialFilters?: TemplatesPageFilters;
  breadcrumbItems?: BreadcrumbItem[];
  hideEditions?: boolean;
  showFilters?: boolean;
  showBreadcrumbs?: boolean;
};

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  initialFilters,
  breadcrumbItems,
  hideEditions = false,
  showFilters = true,
  showBreadcrumbs = false,
}) => {
  const title = "Refine | Open-source Retool for Enterprise";

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);

  const resolvedInitialFilters = React.useMemo<Filters>(() => {
    return {
      edition: initialFilters?.edition ?? TemplateEdition.All,
      uiFramework: initialFilters?.uiFramework
        ? [initialFilters.uiFramework]
        : [],
      backend: initialFilters?.backend ? [initialFilters.backend] : [],
    };
  }, [
    initialFilters?.backend,
    initialFilters?.edition,
    initialFilters?.uiFramework,
  ]);

  const [filters, setFilters] = React.useState<Filters>(resolvedInitialFilters);

  React.useEffect(() => {
    setFilters(resolvedInitialFilters);
  }, [resolvedInitialFilters]);

  const dataFiltered = React.useMemo(() => {
    const byEdition =
      filters.edition === "All"
        ? dataTemplates
        : dataTemplates.filter((item) => item.edition === filters.edition);

    const matchesUI = (item: (typeof dataTemplates)[number]) => {
      if (!filters.uiFramework.length) {
        return true;
      }
      return item.integrations.some((integration) =>
        filters.uiFramework.includes(integration.label),
      );
    };

    const matchesBackend = (item: (typeof dataTemplates)[number]) => {
      if (!filters.backend.length) {
        return true;
      }
      return item.integrations.some((integration) =>
        filters.backend.includes(integration.label),
      );
    };

    return byEdition.filter((item) => matchesUI(item) && matchesBackend(item));
  }, [filters]);

  const handleFilterChange = (
    filter: string | TemplateEdition,
    field: keyof typeof filters,
  ) => {
    setFilters((prev) => {
      if (field === "edition") {
        return {
          ...prev,
          [field]: filter as TemplateEdition,
        };
      }

      const hasFilter = prev[field].includes(filter);
      if (hasFilter) {
        return {
          ...prev,
          [field]: prev[field].filter((item) => item !== filter),
        };
      }

      return {
        ...prev,
        [field]: [...prev[field], filter],
      };
    });
  };

  const fallbackBreadcrumbItems = React.useMemo<BreadcrumbItem[]>(
    () => [
      { label: "Home", href: "/core/" },
      { label: "Templates", href: "/core/templates/" },
    ],
    [],
  );
  const resolvedBreadcrumbItems = breadcrumbItems ?? fallbackBreadcrumbItems;

  return (
    <>
      <Head>
        <html data-active-page="index" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link
          rel="preload"
          href="https://refine.new/embed-form"
          as="document"
        />
      </Head>
      <CommonLayout
        className="!bg-zinc-900"
        description="Open-source React framework for building enterprise-grade admin panels, internal tools, and B2B apps. Headless, flexible, and production-ready."
      >
        <div>
          <CommonHeader showThemeToggle={false} className="dark" />
          <div
            className={clsx(
              "flex flex-col",
              "pb-12 landing-sm:pb-16 landing-md:pb-20",
              "px-2 landing-sm:px-0",
              "dark",
            )}
          >
            <div
              className={clsx(
                "w-full",
                "mx-auto",
                "px-2 landing-sm:px-8 landing-md:px-0",
                "pt-0",
                "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-full",
              )}
            >
              <TemplatesHero />
              {showFilters && (
                <TemplatesFilterButton
                  className={clsx("flex landing-md:hidden", "my-4 mb-2")}
                  onClick={() => {
                    setIsFilterDrawerOpen(true);
                  }}
                />
              )}
            </div>
            {showBreadcrumbs && (
              <div
                className={clsx(
                  "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                  "items-start",
                  "mx-auto",
                )}
              >
                <Breadcrumbs
                  items={resolvedBreadcrumbItems}
                  showJsonLd={false}
                  className={clsx("mb-4", "px-0 landing-md:px-2")}
                />
              </div>
            )}
            <div
              className={clsx(
                "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                "flex",
                "items-start",
                showFilters ? "gap-8" : "gap-0",
                "mx-auto",
                "relative",
                "not-prose",
              )}
            >
              {showFilters && (
                <div
                  className={clsx(
                    "hidden landing-md:flex",
                    "flex-col",
                    "not-prose",
                    "sticky top-24 left-0",
                  )}
                >
                  <h3
                    className={clsx(
                      "text-base",
                      "font-semibold",
                      "text-zinc-900",
                      "pl-3",
                    )}
                  >
                    Filter templates
                  </h3>
                  <TemplatesFilters
                    svgId={"sider"}
                    showEdition={!hideEditions}
                    onEditionChange={(edition) => {
                      handleFilterChange(edition, "edition");
                    }}
                    onBackendChange={(backend) => {
                      handleFilterChange(backend, "backend");
                    }}
                    onUIFrameworkChange={(uiFramework) => {
                      handleFilterChange(uiFramework, "uiFramework");
                    }}
                    className={clsx("min-w-[164px]", "mt-5")}
                    selected={filters}
                    data={dataFilters}
                  />
                </div>
              )}
              <TemplatesList
                data={dataFiltered}
                breadcrumbItems={breadcrumbItems}
              />
            </div>
          </div>
          <LandingFooter />
        </div>
        {showFilters && (
          <CommonDrawer
            onClose={() => setIsFilterDrawerOpen(false)}
            open={isFilterDrawerOpen}
            title="Filter Templates"
            variant="templates"
          >
            <div className={clsx("flex", "flex-col", "not-prose")}>
              <TemplatesFilters
                svgId={"drawer"}
                showEdition={!hideEditions}
                onEditionChange={(edition) => {
                  handleFilterChange(edition, "edition");
                }}
                onBackendChange={(backend) => {
                  handleFilterChange(backend, "backend");
                }}
                onUIFrameworkChange={(uiFramework) => {
                  handleFilterChange(uiFramework, "uiFramework");
                }}
                className={clsx("min-w-[180px]")}
                selected={filters}
                data={dataFilters}
              />
            </div>
          </CommonDrawer>
        )}
      </CommonLayout>
    </>
  );
};

type Integration = {
  uiFrameworks: {
    label: "Ant Design" | "Material UI" | "Headless" | "Chakra UI" | "Mantine";
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  };
  backends: {
    label:
      | "Supabase"
      | "Rest API"
      | "GraphQL"
      | "Strapi"
      | "Appwrite"
      | "Medusa";
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  };
};

const uiFrameworkIcons: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  "Ant Design": Antd,
  "Material UI": Mui,
  Headless,
  "Chakra UI": Chakra,
  Mantine,
};

const backendIcons: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  Supabase,
  "Rest API": RestWithoutText,
  GraphQL: Graphql,
  Strapi,
  Appwrite,
  Medusa,
};

const dataFilters = {
  editions: [
    {
      label: "All",
      icon: null,
    },
    {
      label: "Enterprise",
      icon: null,
    },
    {
      label: TemplateEdition.Community,
      icon: null,
    },
  ],
  uiFrameworks: TEMPLATE_UI_FRAMEWORKS.map((label) => ({
    label,
    icon: (props: SVGProps<SVGSVGElement>) => {
      const Icon = uiFrameworkIcons[label];
      return Icon ? <Icon width={16} height={16} {...props} /> : null;
    },
  })),
  backends: TEMPLATE_BACKENDS.map((label) => ({
    label,
    icon: (props: SVGProps<SVGSVGElement>) => {
      const Icon = backendIcons[label];
      return Icon ? <Icon width={16} height={16} {...props} /> : null;
    },
  })),
};

const dataTemplates: {
  title: string;
  description: string;
  image: string;
  to: string;
  edition: TemplateEdition;
  integrations: (Integration["uiFrameworks"] | Integration["backends"])[];
}[] = [
  {
    to: "/core/templates/crm-application",
    title: "CRM Application",
    description:
      "A comprehensive CRM app built using Refine, Ant Design, and GraphQL. It includes authentication, a dashboard, and over 10 CRUD interfaces, ranging from charts and sales kanban boards to user administration.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-crm.jpg",
    edition: TemplateEdition.Enterprise,
    integrations: [
      {
        label: "Ant Design",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "GraphQL",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Graphql width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/hr-application",
    title: "HR Management App Example",
    description:
      "HR management app example built with Refine, demonstrating how quickly enterprise-level tools can be developed. This template features leave management, employee directory, and expense tracking.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-hr.png",
    edition: TemplateEdition.Enterprise,
    integrations: [
      {
        label: "Material UI",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/multitenancy-strapi",
    title: "Multitenancy App with Strapi",
    description:
      "Implementing multitenancy architecture in Refine applications.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/multitenancy-strapi.jpg",
    edition: TemplateEdition.Enterprise,
    integrations: [
      {
        label: "Ant Design",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Strapi",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Strapi width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/next-js-tailwind",
    title: "E-Commerce Application Storefront",
    description:
      "A Headless storefront example built with Refine and Tailwind CSS. Features product listings and a simple shopping cart. Supports SSR with NextJS.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-storefront.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Headless",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Headless width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/react-admin-panel",
    title: "B2B Admin Panel with Material UI",
    description:
      "A comprehensive Admin panel template built using Refine and Material UI demonstrating a food ordering system. It includes features such as authentication, a dashboard, and over 10 CRUD interfaces, ranging from orders to user management.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-material-ui.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Material UI",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Mui width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/react-admin-panel-ant-design",
    title: "B2B Internal tool with Ant Design",
    description:
      "A comprehensive Admin panel template built using Refine and Ant design demonstrating a food ordering system. It includes features such as authentication, a dashboard, and over 10 CRUD interfaces, ranging from orders to user management.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-ant-design.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Ant Design",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/supabase-crud-app",
    title: "Pixels",
    description:
      "It is a funny app built with Refine and Supabase, along with a Realtime feature.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/pixels.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Ant Design",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Supabase",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Supabase width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/react-pdf-invoice-generator",
    title: "Invoice Generator - Internal Tool",
    description:
      "The Internal Tool template features a PDF Invoice Generator along with CRUD functionalities.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/invoicer.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Ant Design",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Strapi",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Strapi width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/win-95-style-admin-panel",
    title: "Win95 Style Admin Panel",
    description:
      "With the headless architecture of Refine, you have the flexibility to implement any custom design!",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/video-club.png",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Headless",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Headless width={16} height={16} {...props} />
        ),
      },
      {
        label: "Supabase",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Supabase width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/react-crud-app",
    title: "Realworld Example",
    description: `"The mother of all demo apps" - Exemplary fullstack Medium.com clone powered by Refine!`,
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/realworld.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Headless",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Headless width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/ant-design-template",
    title: "Generic Internal Tool Template with Ant Design",
    description:
      "Complete internal tool template built with Ant Design. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/ant-design-template.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Ant Design",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/material-ui-template",
    title: "Generic Internal Tool Template with Material UI",
    description:
      "Complete internal tool template built with Material UI. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/material-ui-template.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Material UI",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Mui width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/chakra-ui-template",
    title: "Generic Internal Tool Template with Chakra UI",
    description:
      "Complete internal tool template built with Chakra UI. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/chakra-ui-template.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Chakra UI",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Chakra width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/core/templates/mantine-template",
    title: "Generic Internal Tool Template with Mantine",
    description:
      "Complete internal tool template built with Mantine. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/mantine-template.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Mantine",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Mantine width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
];

const Templates: React.FC = () => <TemplatesPage />;

export default Templates;
