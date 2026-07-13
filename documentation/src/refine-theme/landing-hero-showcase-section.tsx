import React from "react";
import clsx from "clsx";
import { ShowcaseWrapper } from "../components/landing/showcase-wrapper";
import { LandingSectionCtaButton } from "./landing-section-cta-button";
import { CircleChevronRight } from "lucide-react";

export const LandingHeroShowcaseSection = () => {
  const [activeApp, setActiveApp] = React.useState(apps[0]);

  const ShowcaseComponent = React.useMemo(() => {
    return activeApp.showcase;
  }, [activeApp.name]);

  return (
    <div
      className={clsx(
        "bg-zinc-800",
        "flex",
        "flex-col",
        "w-full",
        "rounded-2.5xl",
        "relative",
        "group/showcase",
        "landing-lg:overflow-hidden",
      )}
    >
      <div className={clsx("flex", "w-full", "gap-2")}>
        <div
          className={clsx(
            "rounded-t-2.5xl",
            "overflow-y-auto",
            "flex",
            "w-full",
            "gap-2",
            "scrollbar-hidden",
            "snap snap-x snap-mandatory",
            "snap-mandatory",
            "bg-zinc-800",
            "p-2.5",
          )}
        >
          <div
            className={clsx(
              "flex",
              "w-auto",
              "landing-lg:w-full",
              "items-center",
              "justify-start",
              "gap-2",
              "relative",
              "bg-zinc-900",
              "rounded-lg",
              "p-1",
            )}
          >
            <div
              className={clsx(
                "hidden landing-sm:block",
                "flex-1",
                "absolute",
                "left-1",
                "top-1",
                "transition-transform",
                "duration-150",
                "ease-out",
                "bg-zinc-700",
                "rounded-md",
                "shadow-[inset_0_1px_0_0_rgb(82_82_91)]",
              )}
              style={{
                width: "calc((100% - (3 * 8px) - 8px) / 4)",
                height: "calc(100% - 8px)",
                minWidth: "244px",
                transform: `translateX(calc((100% + 8px) * ${apps.findIndex(
                  (f) => f.name === activeApp.name,
                )})) translateZ(0px)`,
              }}
            />
            {apps.map((app, index) => (
              <button
                key={app.name}
                type="button"
                onClick={(event) => {
                  setActiveApp(app);
                  // if index i >= 2
                  // then scroll to the right
                  event.currentTarget.parentElement?.parentElement?.scrollTo({
                    left: index >= 2 ? index * (244 + 8) : 0,
                    behavior: "smooth",
                  });
                }}
                className={clsx(
                  "cursor-pointer",
                  "z-[1]",
                  "snap-start",
                  "appearance-none",
                  "focus:outline-none",
                  "border-none",
                  "flex-1",
                  "break-keep",
                  "whitespace-nowrap",
                  "landing-sm:min-w-[244px]",
                  "py-2.5",
                  "px-4",
                  "transition-colors",
                  "ease-in-out",
                  "duration-150",
                  activeApp.name !== app.name && "bg-transparent",
                  activeApp.name === app.name && "bg-zinc-800",
                  activeApp.name !== app.name && "text-zinc-400",
                  activeApp.name === app.name && "text-white",
                  "landing-sm:bg-transparent",
                  "landing-sm:bg-transparent",
                  "transition-colors",
                  "duration-150",
                  "ease-out",
                  "text-xs",
                  "landing-sm:text-sm",
                  activeApp.name !== app.name && "hover:bg-zinc-800",
                  activeApp.name !== app.name && "hover:text-white",
                )}
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx("overflow-hidden", "relative", "group/showcase-inner")}
      >
        <div
          className={clsx(
            "w-full",
            "h-auto",
            "aspect-[1168/736]",
            "transition-colors",
            "duration-150",
            "ease-in-out",
            activeApp.dark ? "bg-zinc-900" : "bg-white",
          )}
        />
        <ShowcaseComponent
          className={clsx(
            "animate-showcase-reveal",
            "absolute",
            "left-0",
            "top-0",
            "w-full",
            "overflow-hidden",
          )}
        />
        <div
          key={activeApp.name}
          className={clsx(
            "hidden",
            "landing-lg:block",
            "landing-lg:opacity-0",
            "landing-lg:translate-y-24",
            "landing-lg:group-hover/showcase-inner:opacity-100 landing-lg:group-hover/showcase-inner:translate-y-0",
            "duration-300",
            "ease-in-out",
            "transition-[opacity,transform,background-color,color]",
            "absolute",
            "left-0",
            "bottom-0",
            "right-0",
            "w-full",
            "h-24",
            "opacity-0",
            activeApp.dark &&
              "bg-[linear-gradient(0deg,_#14141F_30%,_transparent_90%,_transparent_100%)]",
            !activeApp.dark &&
              "bg-[linear-gradient(0deg,_#FFFFFF_30%,_transparent_90%,_transparent_100%)]",
          )}
        />
        <div
          className={clsx(
            "flex",
            "items-center",
            "justify-center",
            "landing-lg:-mb-4",
          )}
        >
          <a
            href={activeApp.link}
            target="_blank"
            rel="noopener"
            className={clsx(
              "hidden",
              "landing-lg:flex",
              "landing-lg:opacity-0",
              "landing-lg:translate-y-8",
              "landing-lg:group-hover/showcase-inner:opacity-100 landing-lg:group-hover/showcase-inner:translate-y-0",
              "duration-150",
              "delay-75",
              "ease-in-out",
              "transition-all",
              "landing-lg:mt-[-144px]",
              "hover:no-underline",
              "z-[3]",
              "py-2 landing-sm:py-4",
              "pl-4 pr-4 landing-sm:pl-6 landing-sm:pr-4",
              "rounded-2xl",
              "items-center",
              "justify-center",
              "gap-2",
              "bg-[#3A261A]",
              "bg-opacity-10",
              "landing-lg:bg-opacity-100",
              "text-orange-400",
              "landing-lg:text-orange-400",
              "hover:brightness-125",
              "landing-lg:hover:scale-105 landing-lg:hover:brightness-100",
              " hover:text-orange-400",
              "landing-lg:hover:text-orange-400",
              "landing-lg:border-8 landing-lg:border-solid",
              activeApp.dark
                ? "landing-lg:border-zinc-900"
                : "landing-lg:border-white",
            )}
          >
            <span
              className={clsx("text-xs landing-sm:text-base", "font-semibold")}
            >
              {activeApp.label}
            </span>
            {/* @ts-expect-error - lucide-react icon react 17 compatibility issues */}
            <CircleChevronRight />
          </a>
        </div>
      </div>
      <div
        className={clsx(
          "p-2.5",
          "flex",
          "items-center",
          "justify-center",
          "landing-lg:hidden",
        )}
      >
        <LandingSectionCtaButton to={activeApp.link}>
          {activeApp.label}
        </LandingSectionCtaButton>
      </div>
    </div>
  );
};

const ShowcaseCRM = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/base-render.png"
      highlights={[
        {
          x: 224,
          y: 88,
          width: 296,
          height: 136,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/number_of_companies.png",
          codePosition: "right",
          code: `
                                import { useList } from "@refinedev/core";

                                const { result: { total } } = useList({
                                    resource: "companies"
                                });
                                `,
        },
        {
          x: 12,
          y: 88,
          width: 200,
          height: 376,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/sidebar_navigation.png",
          codePosition: "right",
          code: `
                    import { useMenu } from "@refinedev/core";
                    import { Link } from "react-router";

                    const { menuItems } = useMenu();

                    return menuItems.map((item) => (
                        <Link to={item.route}>
                            {item.icon}
                            {item.label}
                        </Link>
                    ));
                                `,
        },
        {
          x: 224,
          y: 240,
          width: 296,
          height: 472,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/upcoming_events.png",
          codePosition: "right",
          code: `
                    import { useList } from "@refinedev/core";

                    const { result: { data } } = useList({
                        resource: "events",
                        sorters: [
                            { field: "start_date", order: "asc" },
                        ],
                    });
                                `,
        },
        {
          x: 536,
          y: 240,
          width: 608,
          height: 472,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/latest_activities.png",
          codePosition: "left",
          code: `
                    import { useTable } from "@refinedev/core";

                    const { data } = useTable({
                        resource: "activities",
                        pagination: {
                            currentPage: 1,
                            pageSize: 5,
                        },
                    });
                                `,
        },
        {
          x: 456,
          y: 16,
          width: 256,
          height: 32,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/search_bar.png",
          codePosition: "bottom",
          code: `
                    import { RefineKbar } from "@refinedev/kbar";

                    <RefineKbar />
                                `,
        },
        {
          x: 1120,
          y: 16,
          width: 32,
          height: 32,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/user_avatar.png",
          codePosition: "left",
          code: `
                    import { useGetIdentity } from "@refinedev/core";

                    const { data: identity } = useGetIdentity();
                                `,
        },
      ]}
    />
  );
};

const ShowcaseHR = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/base_render.png"
      highlights={[
        {
          x: 244,
          y: 254,
          width: 520,
          height: 296,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/notifications.png",
          codePosition: "right",
          code: `
                                import { useList } from "@refinedev/core";

                                const { result: { data } } = useList({
                                    resource: "notifications",
                                    liveMode: "auto",
                                    filters: [
                                        {
                                            field: "isRead",
                                            operator: "eq",
                                            value: false
                                        },
                                    ]
                                });
                                `,
        },
        {
          x: 12,
          y: 174,
          width: 204,
          height: 360,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/menu.png",
          codePosition: "right",
          code: `
                import { useMenu, Link, CanAccess } from "@refinedev/core";
                import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

                const Sider = () => {
                  const { menuItems, selectedKey } = useMenu();
                  return (
                      <List>
                        {menuItems.map((item) => (
                          <CanAccess key={item.key} action="list" resource={item.name}>
                            <ListItem>
                              <ListItemButton component={Link} selected={selectedKey === item.key} to={item.route}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.label}</ListItemText>
                              </ListItemButton>
                            </ListItem>
                          </CanAccess>
                        ))}
                      </List>
                  );
                };
            `,
        },
        {
          x: 788,
          y: 254,
          width: 356,
          height: 296,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/poll.png",
          codePosition: "left",
          code: `
                        import { useList } from "@refinedev/core";

                        const { result: { data } } = useList({
                          resource: "polls",
                          filters: [{ field: "status", operator: "eq", value: "active" }],
                          pagination: { currentPage: 1, pageSize: 1 },
                          liveMode: "auto",
                        });
                                `,
        },
        {
          x: 978,
          y: 22,
          width: 166,
          height: 36,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/request-time-off.png",
          codePosition: "left",
          code: `
                    import { CreateButton } from "@refinedev/mui";
                    import { TimeOffIcon } from "@/icons";

                    <CreateButton resource="time-offs" startIcon={<TimeOffIcon />}>
                      Request Time Off
                    </CreateButton>
                                `,
        },
        {
          x: 552,
          y: 78,
          width: 284,
          height: 128,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/sick-leave.png",
          codePosition: "left",
          code: `
                    import { useGetIdentity, useList } from "@refinedev/core";

                    const { data: { employeeId } } = useGetIdentity();

                    const { result: { data } } = useList({
                      resource: "time-offs",
                      pagination: { currentPage: 1, pageSize: 1 },
                      filters: [
                        {
                          field: "employeeId",
                          operator: "eq",
                          value: employeeId,
                        },
                        {
                          field: "status",
                          operator: "eq",
                          value: "approved",
                        },
                        {
                          field: "type",
                          operator: "eq",
                          value: "sick-leave",
                        },
                      ],
                    });
                    const totalSickLeave = data?.total;
                                `,
        },
      ]}
    />
  );
};

const ShowcaseECommerce = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/base_render-2.png"
      highlights={[
        {
          x: 811,
          y: 10,
          width: 108,
          height: 44,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/language-2.png",
          codePosition: "left",
          code: `
                            import { useSetLocale, useGetLocale } from "@refinedev/core";

                            const currentLanguage = useGetLocale();
                            const setLanguage = useSetLocale();

                            const onChange = (language: string) => {
                                setLanguage(language);
                            };
                            `,
        },
        {
          x: 184,
          y: 168,
          width: 616,
          height: 360,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/map-2.png",
          codePosition: "right",
          codeClassName: "!pl-2",
          overlap: true,
          code: `
                            import { useShow } from "@refinedev/core";

                            const { data } = useShow({
                                liveMode: "auto"
                            });

                            return <Map {...data} />;
                            `,
        },
        {
          x: 956,
          y: 92,
          width: 204,
          height: 48,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/actions-2.png",
          codePosition: "left",
          code: `
                    import { useResourceParams, useUpdate } from "@refinedev/core";

                    const { id }  = useResourceParams();
                    const { mutate } = useUpdate();

                    const onReject = () => mutate({
                        resource: “orders”,
                        id,
                        values: {
                            status: “rejected”,
                        },
                    });
                    `,
        },
        {
          x: 8,
          y: 216,
          width: 152,
          height: 120,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/menu-2.png",
          codePosition: "right",
          code: `

                    import { Refine } from "@refinedev/core";

                    <Refine
                        resources={[
                            {
                                name: "stores",
                                meta: { ... },
                            }
                            {
                                name: "products",
                                meta: { parent: "stores" },
                            },
                            {
                                name: "categories",
                                meta: { parent: "stores" },
                            }
                        ]}
                    >
                        ...
                    </Refine>

                    `,
        },
      ]}
    />
  );
};

const ShowcaseDevOps = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      dark
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/base_render.png"
      highlights={[
        {
          x: 264,
          y: 16,
          width: 392,
          height: 704,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/table.png",
          codePosition: "right",
          code: `
                        import { useTable } from "@refinedev/react-table";

                        const columns = [
                            {
                                id: "name",
                                header: "Name",
                                accessorKey: "name",
                            },
                            {
                                id: "cpu",
                                header: "CPU(cores)",
                                accessorKey: "cpu",
                            },
                            // ...
                        ];

                        const table = useTable({
                            columns,
                            refineCoreProps: {
                                liveMode: "auto",
                            }
                        });
                        `,
        },
        {
          x: 656,
          y: 16,
          width: 496,
          height: 55,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/actions.png",
          codePosition: "left",
          code: `
                        import { useDelete, useResourceParams } from "@refinedev/core";

                        const { id } = useResourceParams();
                        const { mutate } = useDelete();

                        const onDelete = () => {
                            mutate({
                                resource: "pods",
                                id,
                            });
                        }
                        `,
        },
        {
          x: 656,
          y: 71,
          width: 496,
          height: 649,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/form.png",
          codePosition: "left",
          code: `
                        import { useModalForm } from "@refinedev/react-hook-form";

                        useModalForm({
                            refineCoreProps: {
                                resource: “pods”,
                                liveMode: “manual”,
                                queryMeta: {
                                    populate: [
                                        "labels",
                                        "conditions",
                                    ],
                                },
                            }
                        });
                        `,
        },
      ]}
    />
  );
};

const apps = [
  {
    name: "CRM Application",
    link: "https://example.crm.refine.dev",
    showcase: ShowcaseCRM,
    label: "See live demo",
  },
  {
    name: "E-Commerce Application",
    link: "https://example.admin.refine.dev",
    showcase: ShowcaseECommerce,
    label: "See live demo",
  },
  {
    name: "HR Application",
    link: "https://refine.dev/templates",
    showcase: ShowcaseHR,
    label: "Templates",
  },
  {
    name: "DevOps Dashboard",
    link: "https://refine.dev/templates",
    showcase: ShowcaseDevOps,
    dark: true,
    label: "Templates",
  },
];
