import React from "react";
import clsx from "clsx";
import { useTOC } from "./doc-toc";
import { Disclosure, Transition } from "@headlessui/react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const DocTOCMobile = () => {
  const { hasTOC, activeId, toc } = useTOC();

  if (!hasTOC) {
    return null;
  }

  return (
    <div
      className={clsx(
        "xl:hidden block w-full mb-10",
        "max-w-screen-content-sm",
      )}
    >
      <Disclosure>
        {({ open }) => (
          <div
            className={clsx(
              "rounded-lg",
              "border border-zinc-200 dark:border-zinc-700",
              "bg-zinc-50 dark:bg-zinc-950",
            )}
          >
            <Disclosure.Button
              className={clsx("w-full", "flex items-center gap-2", "px-2 py-2")}
            >
              <TriangleDownIcon
                className={clsx(
                  "h-5 w-5",
                  "text-zinc-500",
                  "transition-transform duration-200 ease-in-out",
                  {
                    "transform -rotate-90": !open,
                  },
                )}
              />
              <span
                className={clsx("text-base", "text-zinc-900 dark:text-white")}
              >
                On this page
              </span>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-y-95"
              enterTo="transform opacity-100 scale-y-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-y-100"
              leaveTo="transform opacity-0 scale-y-95"
            >
              <Disclosure.Panel className="h-[328px] rounded-bl-lg rounded-br-lg overflow-auto bg-white dark:bg-zinc-800">
                <ul className="p-4">
                  {toc.map(({ id, value, level }) => {
                    const isActive = activeId === id;

                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={clsx(
                          "refine-toc-item",
                          level === 2 && "pl-4",
                          level === 3 && "pl-6",
                          level === 4 && "pl-8",
                          "py-2 pr-4",
                          isActive && "bg-zinc-200 dark:bg-zinc-700",
                          isActive && "text-zinc-900 dark:text-white",
                          !isActive && "text-zinc-700 dark:text-zinc-300",
                          !isActive &&
                            "hover:bg-zinc-100 dark:hover:bg-[#303035]",
                          "rounded-md",
                          "block",
                          "text-sm",
                          "no-underline hover:no-underline",
                          "transition-colors duration-200 ease-in-out",
                        )}
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
                        dangerouslySetInnerHTML={{
                          __html: value,
                        }}
                      />
                    );
                  })}
                </ul>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};
