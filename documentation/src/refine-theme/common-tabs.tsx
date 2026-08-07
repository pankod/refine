import { useTabs } from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";
import clsx from "clsx";
import React, { cloneElement } from "react";
import { useScrollPositionBlocker } from "@docusaurus/theme-common/internal";
function TabList({
  className,
  block,
  selectedValue,
  selectValue,
  tabValues,
  wrapContent = true,
  smallTabs = false,
}) {
  const { handleKeydown, handleTabChange, setTabRef } = useTabListLogic({
    selectedValue,
    selectValue,
    tabValues,
  });

  return (
    <div
      className={clsx(
        "bg-zinc-200 dark:bg-zinc-800",
        "p-1",
        "rounded-tl-xl rounded-tr-xl",
        !wrapContent && "rounded-bl-xl rounded-br-xl",
      )}
    >
      <ul
        role="tablist"
        aria-orientation="horizontal"
        className={clsx(
          className,
          "!my-0",
          "flex-wrap",
          "list-none",
          "m-0 mb-0 mt-0",
          "px-1",
          "flex gap-1",
          "items-center",
          "rounded-lg",
          "h-10",
          "bg-zinc-50 dark:bg-zinc-950",
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
                "h-8",
                "!my-0",
                "mx-0 mt-0",
                "px-2 py-1.5",
                "flex items-center justify-center",
                "min-w-[70px]",
                "rounded",
                "cursor-pointer",
                "transition-all duration-200 ease-in-out",
                "select-none",
                smallTabs && "!text-xs",
                !smallTabs && "!text-base",
                isSelected && "text-zinc-900 dark:text-white",
                !isSelected && "text-zinc-500 dark:text-zinc-400",
                isSelected && "bg-zinc-200 dark:bg-zinc-700",
                isSelected &&
                  "[box-shadow:0px_-1px_0px_0px_rgb(212_212_216)_inset] dark:[box-shadow:0px_1px_0px_0px_rgb(82_82_91)_inset]",
                !isSelected && "hover:bg-zinc-200/80 hover:dark:bg-zinc-700/80",
              )}
            >
              {label ?? value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TabContent({ lazy, children, selectedValue, smallTabs, wrapContent }) {
  const childTabs = getChildTabs(children);

  if (lazy) {
    const selectedTabItem = findSelectedTab(childTabs, selectedValue);
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return cloneElement(selectedTabItem, {
      className: "refine-tab-content",
    });
  }

  return (
    <div className={clsx("px-1 pb-1")}>
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
          className: clsx(tabItem.props.className ?? [], "refine-tab-content"),
        }),
      )}
    </div>
  );
}

function TabsComponent(props) {
  const tabs = useTabs(props);

  const { wrapContent = true } = props;

  return (
    <div
      className={clsx(
        "tabs-container",
        "rounded-xl",
        wrapContent && "bg-zinc-200 dark:bg-zinc-800",
        "mb-6",
        "refine-wider-container",
      )}
    >
      <TabList {...props} {...tabs} />
      <TabContent {...props} {...tabs} />
    </div>
  );
}

export default function CommonTabs(props) {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}
    />
  );
}

export const getChildTabs = (children: any) =>
  (Array.isArray(children) ? children : [children]).filter(Boolean);

export const findSelectedTab = (childTabs: any[], selectedValue: any) =>
  childTabs.find((tabItem) => tabItem.props.value === selectedValue);

export const useTabListLogic = ({
  selectedValue,
  selectValue,
  tabValues,
}: any) => {
  const tabRefs = React.useRef<any[]>([]);
  const { blockElementScrollPositionUntilNextRender } =
    useScrollPositionBlocker();

  const setTabRef = React.useCallback(
    (index: number) => (element: any) => {
      tabRefs.current[index] = element;
    },
    [],
  );

  const handleTabChange = React.useCallback(
    (event: any) => {
      const newTab = event.currentTarget;
      const newTabIndex = tabRefs.current.indexOf(newTab);
      const newTabValue = tabValues[newTabIndex]?.value;

      if (newTabValue && newTabValue !== selectedValue) {
        blockElementScrollPositionUntilNextRender(newTab);
        selectValue(newTabValue);
      }
    },
    [
      blockElementScrollPositionUntilNextRender,
      selectedValue,
      selectValue,
      tabValues,
    ],
  );

  const handleKeydown = React.useCallback(
    (event: any) => {
      const currentIndex = tabRefs.current.indexOf(event.currentTarget);
      let focusElement = null;

      switch (event.key) {
        case "Enter": {
          handleTabChange(event);
          break;
        }
        case "ArrowRight": {
          const nextTab = currentIndex + 1;
          focusElement = tabRefs.current[nextTab] ?? tabRefs.current[0];
          break;
        }
        case "ArrowLeft": {
          const prevTab = currentIndex - 1;
          focusElement =
            tabRefs.current[prevTab] ??
            tabRefs.current[tabRefs.current.length - 1];
          break;
        }
        default:
          break;
      }

      focusElement?.focus();
    },
    [handleTabChange],
  );

  return {
    handleKeydown,
    handleTabChange,
    setTabRef,
  };
};
