import clsx from "clsx";
import React, { type SVGProps } from "react";
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import { Menu, Transition } from "@headlessui/react";
import Link from "@docusaurus/Link";
import useVersionLinks from "../hooks/use-version-links";
import { ChevronDownIcon } from "lucide-react";

const Triangle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 0a1 1 0 0 1 .78.375l3.1 3.874A2 2 0 0 0 15.442 5H19a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3.558a2 2 0 0 0 1.562-.75L9.22.374A1 1 0 0 1 10 0Z"
      clipRule="evenodd"
    />
  </svg>
);

type Props = {
  className?: string;
  wrapperClassName?: string;
};

export const DocVersionDropdown = ({ className, wrapperClassName }: Props) => {
  const docContext = useActiveDocContext(undefined);
  const { links } = useVersionLinks();

  return (
    <div className={wrapperClassName}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={clsx(
                "appearance-none",
                "focus:outline-none",
                "border border-solid border-zinc-200 dark:border-zinc-700",
                "rounded-lg",
                "px-2.5",
                "h-10",
                "bg-white dark:bg-zinc-800",
                "lg:bg-transparent lg:dark:bg-transparent",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
                "select-none",
                "text-zinc-500 dark:text-zinc-300",
                "font-medium",
                className,
              )}
            >
              <span
                className={clsx(
                  "text-sm",
                  "text-zinc-500 dark:text-zinc-300",
                  "tracking-[-0.007em]",
                  "block",
                )}
              >
                {docContext.activeVersion.label}
              </span>
              {/* @ts-expect-error - lucide-react has issues with react 17 */}
              <ChevronDownIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
            </Menu.Button>

            <Transition
              show={open}
              className="relative z-10"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Triangle
                className={clsx(
                  "absolute right-[11px] top-1 origin-bottom-right",
                  "text-white dark:text-[#202023]",
                )}
              />
              <Menu.Items
                static
                className={clsx(
                  "absolute right-0 top-2 origin-bottom-right",
                  "flex flex-col gap-2",
                  "w-[112px]",
                  "p-2",
                  "bg-white dark:bg-[#202023]",
                  "rounded-lg",
                  "border border-zinc-200 dark:border-zinc-700",
                )}
              >
                {links.map((version) => {
                  return (
                    <Menu.Item key={version.label}>
                      {() => {
                        const isActive =
                          version.label === docContext.activeVersion.label;
                        return (
                          <Link
                            to={version.to}
                            className={clsx(
                              "px-2 py-1",
                              "rounded",
                              "no-underline",
                              {
                                "text-white hover:text-white": isActive,
                                "bg-orange-600": isActive,
                                "text-zinc-700 dark:text-zinc-300": !isActive,
                                "hover:bg-zinc-100 hover:dark:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300":
                                  !isActive,
                              },
                            )}
                          >
                            {version.label}
                          </Link>
                        );
                      }}
                    </Menu.Item>
                  );
                })}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
