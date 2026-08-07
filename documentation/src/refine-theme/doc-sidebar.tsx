import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import {
  isActiveSidebarItem,
  isSamePath,
  useDocsSidebar,
} from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import React from "react";
import { HEADER_HEIGHT } from "./doc-header";
import { ChevronDownIcon } from "./icons/chevron-down";
import { DashIcon } from "./icons/dash";

const SIDEBAR_WIDTH = 240;

const componentRegexp = /<([A-Z][a-z]+)\s?\/>/gi;

type Variant = "desktop" | "mobile";

type SidebarCategoryItem = {
  collapsible: boolean;
  collapsed: boolean;
  type: "category";
  href?: string;
  label: string;
  items: SidebarItem[];
  className?: string;
  customProps?: Record<string, unknown>;
};

type SidebarLinkItem = {
  type: "link";
  label: string;
  href: string;
  docId: string;
  className?: string;
  customProps?: Record<string, unknown>;
};

type SidebarHtmlItem = {
  type: "html";
  content: string;
  value: string;
  className?: string;
  customProps?: Record<string, unknown>;
};

type SidebarItem = SidebarCategoryItem | SidebarLinkItem | SidebarHtmlItem;

type SidebarType = {
  name: string;
  items: SidebarItem[];
};

const SidebarCategory = ({
  item,
  path,
  line,
  variant,
  onLinkClick,
  deferred,
}: {
  item: SidebarCategoryItem;
  path: string;
  line?: boolean;
  variant: Variant;
  onLinkClick?: () => void;
  deferred?: boolean;
}) => {
  const location = useLocation();
  const isHeader = item.className?.includes("category-as-header");
  const isActive = isActiveSidebarItem(item, path);

  const isSame = isSamePath(item.href, path);

  const { collapsible } = item;

  const defaultCollapsed = isHeader || isActive ? false : item.collapsed;

  const [collapsed, setCollapsed] = React.useState(
    collapsible === false ? false : defaultCollapsed,
  );

  const [settled, setSettled] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSettled(true);
    }, 210);

    return () => {
      clearTimeout(timeout);
    };
  }, [collapsed]);

  const toggle = () => {
    if (collapsible !== false) {
      setCollapsed(!collapsed);
      setSettled(false);
    }
  };

  React.useEffect(() => {
    // find <a> elements with href attribute value equal to the current path
    const activeLink = document.querySelector(
      `#refine-docs-sidebar a[href="${location.pathname}"]`,
    );
    if (!activeLink) return;

    // get sidebar
    const sidebar = document.querySelector("#refine-docs-sidebar");
    if (!sidebar) return;

    // scroll to active link in the sidebar
    sidebar.scrollTo({
      top: activeLink.getBoundingClientRect().top - 200,
      behavior: "smooth",
    });
  }, []);

  const Comp = "button";

  return (
    <div
      className={clsx(
        !line && "pl-0",
        line && "pl-2",
        line && "ml-[12px]",
        "relative",
      )}
    >
      <Comp
        type="button"
        onClick={isHeader ? undefined : toggle}
        aria-expanded={collapsible ? !collapsed : undefined}
        className={clsx(
          isHeader && "cursor-default",
          "w-full",
          "min-h-[28px]",
          "rounded-md",
          "border-0",
          "appearance-none",
          "focus:outline-none",
          !isHeader && "text-zinc-400 dark:text-zinc-300",
          isHeader && "text-zinc-500 dark:text-zinc-400",
          isHeader && "font-semibold",
          !isHeader && "hover:bg-zinc-200 dark:hover:bg-[#303035]",
          "font-normal",
          "flex items-center",
          isHeader ? "pt-2 pb-4" : "py-2",
          "pr-2",
          isHeader && "pl-2",
          !isHeader && "pl-0.5",
          isHeader ? "text-base" : "text-sm",
          "relative",
          !isHeader && "group",
          "transition-colors duration-200 ease-in-out",
          !isHeader && "no-underline",
        )}
      >
        {!isHeader && (
          <ChevronDownIcon
            className={clsx(
              "opacity-70",
              isActive
                ? "text-zinc-500 dark:text-zinc-400"
                : "text-zinc-500 dark:text-zinc-400",
              "h-5 w-5",
              "flex-shrink-0",
              "z-[1]",
              "transition-transform duration-200 ease-in-out",
              "group-hover:text-zinc-600 dark:group-hover:text-zinc-300",
              {
                "-rotate-90 transform": collapsed,
              },
            )}
          />
        )}
        <span className="z-[1] text-zinc-600 dark:text-zinc-300">
          {item.label}
        </span>
        <div
          className={clsx(
            "absolute",
            "rounded-md",
            "transition-opacity",
            "duration-200 ease-in-out",
            "top-0",
            {
              "group-hover:bg-zinc-200 dark:group-hover:bg-[#303035]":
                !isActive && !isSame,
              "right-0": variant === "desktop",
              "-left-2": variant === "mobile",
            },
            "h-full",
          )}
          style={{
            width:
              variant === "desktop"
                ? `calc(${SIDEBAR_WIDTH}px - 32px)`
                : "calc(100% + 16px)",
          }}
        />
      </Comp>
      {line && (
        <div className="z-[1] absolute left-0 top-1/2 -translate-y-1/2 border-l border-l-zinc-300 dark:border-l-zinc-600 h-full w-px" />
      )}
      <div
        className={clsx(
          collapsed && "max-h-0 opacity-0",
          collapsed && "overflow-hidden",
          !collapsed && "opacity-100",
          !collapsed && !settled && "max-h-screen",
          !collapsed && settled && "max-h-max",
          "flex",
          "flex-col",
        )}
      >
        {
          // if category is collapsed, don't render items for performance reasons
          (deferred ? !collapsed : true) &&
            renderItems({
              items: item?.items ?? [],
              path: path,
              line: !isHeader,
              fromHeader: isHeader,
              variant,
              onLinkClick,
              deferred,
            })
        }
      </div>
    </div>
  );
};

const EnterpriseEditionItem = ({
  item,
  onClick,
}: {
  item: SidebarLinkItem;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={item.href}
      isNavLink
      onClick={onClick}
      className={clsx(
        "flex-shrink-0",
        "relative",
        "min-h-[28px]",
        "rounded-md",
        "bg-sky-950",
        "text-sky-400",
        "pl-6 pr-3 py-2",
        "text-sm font-normal",
        "flex items-start justify-start",
        "group",
        "transition-colors duration-200 ease-in-out",
        "no-underline",
        item.className,
      )}
    >
      <div className={"flex items-center flex-1"}>
        <span className="z-[1] flex-shrink-0">{item.label}</span>
      </div>
    </Link>
  );
};

const ShadcnItem = ({
  item,
  onClick,
}: {
  item: SidebarLinkItem;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={item.href}
      isNavLink
      onClick={onClick}
      className={clsx(
        "flex-shrink-0",
        "relative",
        "min-h-[28px]",
        "rounded-md",
        "bg-black dark:bg-black",
        "text-white",
        "dark:text-white",
        "pl-6 pr-3 py-2",
        "text-sm font-normal",
        "flex items-start justify-start",
        "group",
        "transition-colors duration-200 ease-in-out",
        "no-underline",
        item.className,
      )}
    >
      <div className={"flex items-center flex-1"}>
        <span className="z-[1] flex-shrink-0">{item.label}</span>
      </div>
    </Link>
  );
};

const ExternalIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <g fill="currentColor">
        <path d="M1 2.65C1 1.739 1.739 1 2.65 1H5.5a.5.5 0 0 0 0-1H2.65A2.65 2.65 0 0 0 0 2.65v6.7A2.65 2.65 0 0 0 2.65 12h6.7A2.65 2.65 0 0 0 12 9.35V6.5a.5.5 0 0 0-1 0v2.85A1.65 1.65 0 0 1 9.35 11h-6.7A1.65 1.65 0 0 1 1 9.35v-6.7Z" />
        <path d="M8.5 0a.5.5 0 0 0 0 1h1.793L5.646 5.646a.5.5 0 1 0 .708.708L11 1.707V3.5a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 10.5 0h-2Z" />
      </g>
    </svg>
  );
};

const SidebarLink = ({
  item,
  path,
  dashed,
  line,
  variant,
  onClick,
}: {
  item: SidebarLinkItem;
  path: string;
  dashed?: boolean;
  line?: boolean;
  variant: Variant;
  onClick?: () => void;
  code?: boolean;
}) => {
  const once = React.useRef(false);
  const ref = React.useRef<HTMLAnchorElement>(null);
  const isActive = isActiveSidebarItem(item, path);
  const isSame = isSamePath(item.href, path);
  const isEnterprise = item.className?.includes("enterprise-badge") || false;
  const isShadcn = item.className?.includes("shadcn-badge") || false;

  React.useEffect(() => {
    if (isActive && !once.current) {
      const sidebarParent = document.querySelector("#refine-docs-sidebar");
      if (sidebarParent && ref.current) {
        sidebarParent.scrollTop =
          ref.current?.offsetTop -
          sidebarParent.clientHeight / 2 +
          ref.current?.clientHeight / 2;
      }
    }
    once.current = true;
  }, [isActive]);

  if (isEnterprise) {
    return <EnterpriseEditionItem item={item} onClick={onClick} />;
  }

  if (isShadcn) {
    return <ShadcnItem item={item} onClick={onClick} />;
  }

  const isComponentLabel = componentRegexp.test(item.label);

  return (
    <Link
      ref={ref}
      href={item.href}
      isNavLink
      onClick={onClick}
      className={clsx(
        "relative",
        "min-h-[28px]",
        !isActive && "text-zinc-600 dark:text-zinc-300",
        !isActive && "hover:text-zinc-600 dark:hover:text-zinc-300",
        isActive && "text-zinc-900 dark:text-white",
        "px-4 py-2",
        "text-sm font-normal",
        "flex items-start justify-start",
        dashed && !line && "pl-0.5",
        // SPACING
        line && dashed && "pl-2",
        line && "ml-[12px]",
        "group",
        "transition-colors duration-200 ease-in-out",
        "no-underline",
        item.className,
      )}
    >
      {dashed && (
        <DashIcon
          className={clsx(
            "z-[1] h-5 w-5 flex-shrink-0",
            "text-zinc-300 dark:text-zinc-600",
            isActive &&
              "text-refine-react-light-link dark:text-refine-react-dark-link text-opacity-50 dark:text-opacity-50",
          )}
        />
      )}
      <div
        className={clsx("flex items-center", isComponentLabel && "break-all")}
      >
        <span className="z-[1]">{item.label}</span>
      </div>
      {item.customProps?.external && (
        <ExternalIcon
          className={clsx("z-[1]", "text-inherit", "w-5 h-5", "p-1", "ml-1")}
        />
      )}
      <div
        className={clsx(
          "absolute",
          "rounded-md",
          "transition-opacity",
          "duration-200 ease-in-out",
          {
            "group-hover:bg-zinc-200 dark:group-hover:bg-[#303035]":
              !isActive && !isSame,
            "bg-zinc-200 dark:bg-zinc-700": isActive && isSame,
            "right-0": variant === "desktop",
            // "-right-2": variant === "mobile",
            "-left-2": variant === "mobile",
          },
          "top-0",
          "h-full",
        )}
        style={{
          width:
            variant === "desktop"
              ? `calc(${SIDEBAR_WIDTH}px - 32px)`
              : "calc(100% + 16px)",
        }}
      />
      {line && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 border-l border-l-zinc-300 dark:border-l-zinc-600 h-full w-px" />
      )}
    </Link>
  );
};

const SidebarHtml = ({
  item,
  line,
}: {
  item: SidebarHtmlItem;
  path: string;
  line?: boolean;
  variant: Variant;
  dashed?: boolean;
  code?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "relative",
        "text-xs",
        "flex items-start justify-start",
        "px-0.5 py-1",
        // SPACING
        line && "pl-2",
        line && "ml-[12px]",
        "group",
        "transition-colors duration-200 ease-in-out",
        "no-underline",
        "text-zinc-500 dark:text-zinc-400",
        "after:content-['']",
        "after:w-[calc(100%)]",
        "after:h-px",
        "after:bg-zinc-300",
        "dark:after:bg-zinc-600",
        "after:absolute",
        "after:left-0",
        "after:top-1/2",
        "after:-translate-y-1/2",
      )}
    >
      {line && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 border-l border-l-zinc-300 dark:border-l-zinc-600 h-full w-px" />
      )}
      <span
        className={clsx(
          "z-[1]",
          "-ml-1",
          "px-1",
          "bg-zinc-50",
          "dark:bg-zinc-900",
        )}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
        dangerouslySetInnerHTML={{ __html: item.value }}
      />
    </div>
  );
};

type RenderItemConfig = {
  items: SidebarItem[];
  path: string;
  root?: boolean;
  line?: boolean;
  fromHeader?: boolean;
  variant: Variant;
  onLinkClick?: () => void;
  deferred?: boolean;
  level?: number;
};

const renderItems = ({
  items = [],
  path,

  root,
  line,
  variant,
  onLinkClick,
  deferred,
}: RenderItemConfig) => {
  const hasCategory = items?.some((item) => item.type === "category");
  const isDashed = !root && hasCategory;

  return (
    items?.map((item, index) => {
      switch (item.type) {
        case "category":
          return (
            <SidebarCategory
              key={`${item.label}:${item.href}:${item.type}`}
              item={item}
              path={path}
              line={!!line}
              variant={variant}
              onLinkClick={onLinkClick}
              deferred={deferred}
            />
          );
        case "html":
          return (
            <SidebarHtml
              key={`${item.type}:${item.value}`}
              item={item}
              path={path}
              line={!!line}
              variant={variant}
            />
          );
        case "link":
          return (
            <SidebarLink
              key={`${item.label}:${item.href}:${item.type}`}
              item={item}
              path={path}
              dashed={isDashed}
              line={!!line}
              variant={variant}
              onClick={onLinkClick}
            />
          );
        default:
          return null;
      }
    }) ?? []
  );
};

export const DocSidebar = () => {
  const sidebar = useDocsSidebar() as SidebarType;
  const { pathname } = useLocation();

  return (
    <div
      id="refine-docs-sidebar"
      className={clsx(
        "hidden lg:block",
        "sticky",
        "left-0",
        "overflow-auto",
        "w-full",
        "rounded-tr-xl",
        "bg-zinc-50 dark:bg-[#27272A80]",
      )}
      style={{
        maxWidth: `${SIDEBAR_WIDTH}px`,
        top: `${HEADER_HEIGHT + 4}px`,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      <div className={clsx("px-4", "py-4", "flex flex-col gap-6")}>
        {renderItems({
          items: sidebar?.items,
          path: pathname,
          root: true,
          variant: "desktop",
        })}
      </div>
    </div>
  );
};

type UseSidebarItemsProps = {
  variant: Variant;
  onLinkClick?: () => void;
  deferred?: boolean;
};

export const useSidebarItems = ({
  variant,
  onLinkClick,
  deferred,
}: UseSidebarItemsProps) => {
  const sidebar = useDocsSidebar() as SidebarType;
  const { pathname } = useLocation();

  return {
    items: renderItems({
      items: sidebar?.items,
      path: pathname,
      root: true,
      variant,
      onLinkClick,
      deferred,
    }),
  };
};
