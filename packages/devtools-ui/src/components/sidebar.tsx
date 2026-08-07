import React from "react";
import clsx from "clsx";

import { OverviewIcon } from "./icons/overview";
import { MonitorIcon } from "./icons/monitor";
// import { ResourceViewerIcon } from "./icons/resource-viewer";
// import { PackageOverviewIcon } from "./icons/package-overview";
// import { OptionsIcon } from "./icons/options";
import { PlaygroundIcon } from "./icons/playground";
import { InferencerPreviewIcon } from "./icons/inferencer-preview";
// import { SnippetsIcon } from "./icons/snippets";
import { ChatbotIcon } from "./icons/chatbot";
// import { TicketIcon } from "./icons/ticket";
// import { SettingsIcon } from "./icons/settings";

import { NavLink, useLocation } from "react-router";
import { HiddenItemsBgIcon } from "./icons/hidden-items-bg";
import { ActiveItemBackground } from "./active-item-background";

const SidebarItem = ({
  item: { icon, path, soon, label: itemLabel },
  index,
  separator,
  active,
  hideLabel,
}: {
  item: (typeof items)[number];
  separator?: boolean;
  index: number;
  active?: boolean;
  hideLabel?: boolean;
}) => {
  const timeoutRef = React.useRef<number | null>(null);
  const [hover, setHover] = React.useState(false);
  const Icon = icon ?? React.Fragment;

  const Element = soon ? "div" : NavLink;

  const label = itemLabel;

  return (
    <React.Fragment key={index}>
      <Element
        to={path ?? "/"}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = window.setTimeout(() => {
            setHover(true);
          }, 150);
        }}
        onMouseLeave={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = window.setTimeout(() => {
            setHover(false);
          }, 150);
        }}
        className={clsx(
          "re-relative",
          "re-flex-shrink-0",
          "re-w-10",
          "re-h-10",
          active ? "re-text-alt-cyan" : "re-text-gray-500",
          !active && "hover:re-text-alt-cyan",
          "re-transition-colors",
          "re-duration-200",
          "re-ease-in-out",
          "re-flex",
          "re-justify-center",
          "re-gap-4",
          "re-items-center",
          "re-group",
        )}
      >
        <ActiveItemBackground active={active} />
        <Icon className={clsx("re-z-[1]", soon && "re-opacity-50")} />
        {soon && (
          <div
            className={clsx(
              "re-select-none",
              "re-absolute",
              "re-h-[11px]",
              "re-bottom-[-2.5px]",
              "re-right-[4.5px]",
              "re-text-[7px]",
              "re-leading-[7px]",
              "re-z-[2]",
              "re",
              "re-text-center",
              "re-font-semibold",
              "re-text-alt-cyan",
              "re-bg-alt-cyan",
              "re-bg-opacity-10",
              "re-border",
              "re-border-opacity-20",
              "re-border-alt-cyan",
              "re-py-px",
              "re-px-1",
              "re-rounded-lg",
            )}
          >
            SOON
          </div>
        )}
        {!hideLabel && (
          <div
            className={clsx(
              "re-transition-transform",
              !hover && "re-scale-y-0 re--translate-x-6",
              hover && "re-scale-y-100 re-translate-x-0",
              "re-absolute",
              "re-left-[42px]",
              "re-top-0",
              "re-h-full",
              "re-flex",
              "re-items-center",
              "re-justify-center",
              "re-text-sm",
              "re-break-keep",
              "re-whitespace-nowrap",
              "re-z-[2]",
            )}
          >
            <div
              className={clsx(
                "re-px-2",
                "re-py-1",
                "re-border",
                "re-border-gray-600",
                "re-bg-gray-700",
                "re-shadow-md",
                "re-rounded",
                "re-text-gray-0",
              )}
            >
              {label}
            </div>
          </div>
        )}
      </Element>
      {separator && (
        <div
          className={clsx(
            "re-w-full",
            "re-h-0",
            "re--mt-1",
            "re--mb-[5px]",
            "re-border-b",
            "re-border-b-gray-600",
          )}
        />
      )}
    </React.Fragment>
  );
};

const SidebarHiddenItemsItem = ({
  index,
  hiddenItems,
  active,
}: {
  item: (typeof items)[number];
  hiddenItems: typeof items;
  separator?: boolean;
  index: number;
  active?: boolean;
}) => {
  const timeoutRef = React.useRef<number | null>(null);
  const [hover, setHover] = React.useState(false);

  return (
    <React.Fragment key={index}>
      <div
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = window.setTimeout(() => {
            setHover(true);
          }, 150);
        }}
        onMouseLeave={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = window.setTimeout(() => {
            setHover(false);
          }, 150);
        }}
        className={clsx(
          "re-cursor-pointer",
          "re-relative",
          "re-flex-shrink-0",
          "re-w-10",
          "re-h-10",
          active ? "re-text-alt-cyan" : "re-text-gray-500",
          !active && "hover:re-text-alt-cyan",
          "re-transition-colors",
          "re-duration-200",
          "re-ease-in-out",
          "re-flex",
          "re-justify-center",
          "re-items-center",
          "re-group",
        )}
      >
        <HiddenItemsBgIcon className="re-z-[1] re-text-gray-700 re-w-9 re-h-9" />
        <span
          className={clsx(
            "re-absolute",
            "re-left-0",
            "re-right-0",
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-z-[1]",
            "re-text-gray-300",
            "re-text-sm",
          )}
        >
          +{hiddenItems.length}
        </span>
        <div
          className={clsx(
            "re-transition-transform",
            !hover && "re-scale-x-0 re--translate-x-6",
            hover && "re-scale-x-100 re-translate-x-0",
            "re-absolute",
            "re-left-[42px]",
            "re-bottom-[-2px]",
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-text-sm",
            "re-break-keep",
            "re-whitespace-nowrap",
          )}
        >
          <div
            className={clsx(
              "re-px-3",
              "re-pt-0",
              "re-pb-1",
              "re-border",
              "re-border-gray-600",
              "re-bg-gray-900",
              "re-shadow-md",
              "re-flex",
              "re-items-center",
              "re-gap-2",
              "re-rounded",
            )}
          >
            {hiddenItems.map((item, index) => {
              return (
                <SidebarItem
                  item={item}
                  key={index}
                  index={index}
                  active={false}
                  hideLabel
                />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

type SidebarItemType = {
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
  label: string;
  path?: string;
  section?: string;
  soon?: boolean;
};

const items: SidebarItemType[] = [
  {
    icon: OverviewIcon,
    label: "Overview",
    path: "/overview",
    section: "first",
  },
  {
    icon: MonitorIcon,
    label: "Monitor",
    path: "/monitor",
    section: "first",
  },
  // {
  //     icon: ResourceViewerIcon,
  //     label: "Resource Viewer",
  //     path: "/resource-viewer",
  //     section: "first",
  //     soon: true,
  // },
  // {
  //     icon: OptionsIcon,
  //     label: "Options",
  //     path: "/options",
  //     section: "first",
  //     soon: true,
  // },
  {
    icon: PlaygroundIcon,
    label: "Playground",
    path: "/playground",
    section: "second",
    soon: true,
  },
  {
    icon: InferencerPreviewIcon,
    label: "Inferencer Preview",
    path: "/inferencer-preview",
    section: "second",
    soon: true,
  },
  // {
  //     icon: SnippetsIcon,
  //     label: "Snippets",
  //     path: "/snippets",
  //     section: "second",
  //     soon: true,
  // },
  {
    icon: ChatbotIcon,
    label: "Chatbot",
    path: "/chatbot",
    section: "second",
    soon: true,
  },
  // {
  //     icon: SettingsIcon,
  //     label: "Settings",
  //     path: "/settings",
  //     section: "fourth",
  //     soon: true,
  // },
];

const ITEM_HEIGHT = 40;
const ITEM_GAP = 10;

export const Sidebar = () => {
  const itemContainerRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const [itemsToRender, setItemsToRender] = React.useState<typeof items>([]);
  const [hiddenItems, setHiddenItems] = React.useState<typeof items>([]);

  React.useEffect(() => {
    const handleResize = () => {
      if (!itemContainerRef.current) {
        setItemsToRender([]);
        return;
      }

      const { clientHeight } = itemContainerRef.current;

      const itemCount = Math.floor(clientHeight / (ITEM_HEIGHT + ITEM_GAP));

      const realItemCount =
        itemCount === items.length ? itemCount : itemCount - 1;

      const remainingItemElement = {
        label: "__hidden_elements__",
      };

      setItemsToRender([
        ...items.slice(0, realItemCount),
        ...(realItemCount < items.length ? [remainingItemElement] : []),
      ]);
      setHiddenItems(items.slice(realItemCount));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={clsx(
        "re-flex-shrink-0",
        "re-min-h-full",
        "re-bg-gray-900",
        "re-border-r",
        "re-border-r-gray-700",
        "re-px-1.5",
        "re-pt-2",
        "re-flex",
      )}
    >
      <div
        ref={itemContainerRef}
        className={clsx(
          "re-flex",
          "re-flex-1",
          "re-flex-col",
          "re-gap-2.5",
          "re-w-10",
          "re-flex-shrink-0",
        )}
      >
        {itemsToRender.map((item, index, array) => {
          const nextItemSection = array[index + 1]?.section;
          if (item.label === "__hidden_elements__") {
            return (
              <SidebarHiddenItemsItem
                key={index}
                item={item}
                hiddenItems={hiddenItems}
                index={index}
              />
            );
          }
          return (
            <SidebarItem
              key={index}
              item={item}
              index={index}
              active={pathname === item.path}
              separator={Boolean(
                nextItemSection && nextItemSection !== item.section,
              )}
            />
          );
        })}
      </div>
    </nav>
  );
};
