import { useTabs } from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";
import clsx from "clsx";
import React, { cloneElement } from "react";
import { findSelectedTab, getChildTabs, useTabListLogic } from "./common-tabs";

function BlogTabList({ className, selectedValue, selectValue, tabValues }) {
  const { handleKeydown, handleTabChange, setTabRef } = useTabListLogic({
    selectedValue,
    selectValue,
    tabValues,
  });

  return (
    <div>
      <ul
        role="tablist"
        aria-orientation="horizontal"
        className={clsx(
          className,
          "!my-0",
          "list-none",
          "m-0 p-0",
          "flex flex-nowrap gap-1",
          "items-center",
          "h-12",
          "overflow-x-auto overflow-y-hidden scrollbar-hidden",
          "px-3",
          "rounded-tl-xl rounded-tr-xl",
          "bg-zinc-100 dark:bg-zinc-800",
          "border-b dark:border-none",
          "border-zinc-200 dark:border-transparent",
        )}
      >
        {tabValues.map(({ value, label, attributes }, index) => {
          const isSelected = selectedValue === value;

          return (
            <li
              role="tab"
              tabIndex={selectedValue === value ? 0 : -1}
              aria-selected={selectedValue === value}
              key={value}
              ref={setTabRef(index)}
              onKeyDown={handleKeydown}
              onClick={handleTabChange}
              {...attributes}
              className={clsx(
                "blog-tab-item",
                "relative",
                "h-12",
                "flex",
                "items-center",
                "cursor-pointer",
                "group/blog-tab-item",
                isSelected && "z-10",
                !isSelected && "hover:z-[11]",
                isSelected && "active",
              )}
            >
              <div
                className={clsx(
                  "relative",
                  "h-10",
                  "flex",
                  "items-center",
                  "cursor-pointer",
                )}
              >
                {/* Curved border effect for active tab */}
                {isSelected && <div className="blog-tab-item-border" />}
                <div
                  className={clsx(
                    "h-8",
                    "flex",
                    "items-center",
                    "gap-2",
                    "rounded-sm",
                    "px-2",
                    "mx-1",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",

                    !isSelected &&
                      "hover:bg-zinc-200 dark:hover:bg-zinc-900/50",
                    !isSelected && "hover:text-zinc-700 dark:hover:text-white",
                    !isSelected && "text-zinc-500 dark:text-zinc-400",
                    isSelected && "text-zinc-900 dark:text-white",
                    "z-[2]",
                    isSelected && "-translate-y-[0.5px] dark:translate-y-0",
                  )}
                >
                  <div
                    title={label ?? value}
                    className={clsx(
                      "text-xs",
                      "tracking-[-0.006em]",
                      "break-keep",
                      "whitespace-nowrap",
                      "max-w-28",
                      "overflow-hidden",
                      "text-ellipsis",
                    )}
                  >
                    {label ?? value}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BlogTabContent({ lazy, children, selectedValue }) {
  const childTabs = getChildTabs(children);

  if (lazy) {
    const selectedTabItem = findSelectedTab(childTabs, selectedValue);
    if (!selectedTabItem) {
      return null;
    }
    return cloneElement(selectedTabItem, {
      className: clsx(
        selectedTabItem.props.className ?? [],
        "blog-tab-content",
      ),
    });
  }

  return (
    <div>
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
          className: clsx(
            tabItem.props.className ?? [],
            "blog-tab-content",
            "rounded-xl",
          ),
        }),
      )}
    </div>
  );
}

function BlogTabsComponent(props) {
  const tabs = useTabs(props);
  const { className } = props;

  return (
    <div
      className={clsx(
        "blog-tabs",
        "mb-6",
        "bg-white",
        "blog-content-bleed",
        "dark:bg-zinc-900",
        "border",
        "border-zinc-200",
        "dark:border-zinc-700",
        "rounded-xl",
        className,
      )}
    >
      <BlogTabList {...props} {...tabs} />
      <BlogTabContent {...props} {...tabs} />
    </div>
  );
}

export default function BlogTabs(props: any) {
  const isBrowser = useIsBrowser();

  return (
    <BlogTabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}
    />
  );
}
