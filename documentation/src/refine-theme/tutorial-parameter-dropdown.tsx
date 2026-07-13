import clsx from "clsx";
import React, { type SVGProps } from "react";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";
import { Menu, Transition } from "@headlessui/react";

import { useHistory } from "@docusaurus/router";

/* @ts-expect-error Imports through webpack aliases does not work */
import data from "@tutorial-navigation/tutorial-navigation-data.json";
import { useDoc } from "@docusaurus/theme-common/internal";

import { useTutorialParameters } from "../context/tutorial-parameter-context";
import { NewBadgePurple } from "./icons/new-badge-purple";
import { NewBadgeShinyBlue } from "./icons/new-badge-shiny-blue";

type DocElement = {
  frontMatter: Record<string, unknown>;
  metadata: {
    frontMatter: Record<string, unknown>;
    id: string;
    permalink: string;
    slug: string;
    title: string;
  };
};

type Tutorial = {
  label: string;
  defaultParameters: Record<string, string>;
  parameterOptions: Record<
    string,
    Array<{
      label: string;
      value: string;
      status?: "coming-soon";
    }>
  >;
  units: Array<{
    title: string;
    id: string;
    items: Array<string>;
  }>;
};

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
  label: string;
  parameter: string;
};

export const TutorialParameterDropdown = ({
  label,
  parameter,
  className,
}: Props) => {
  const { parameters, options, setParameters } = useTutorialParameters();
  const { replace } = useHistory();
  const {
    metadata: { permalink },
  } = useDoc() as DocElement;

  return (
    <div className={className}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={clsx(
                "appearance-none",
                "focus:outline-none",
                "flex-shrink-0",
                "py-2.5",
                "pl-4 pr-3",
                "rounded-[40px]",
                "border border-solid",
                "border-zinc-300 dark:border-zinc-700",
                "text-xs",
                "tutorial-lg:text-sm",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
              )}
            >
              <div className={clsx("select-none", "whitespace-nowrap")}>
                <span
                  className={clsx("text-zinc-500 dark:text-zinc-400")}
                >{`${label}: `}</span>
                <span className="text-zinc-800 dark:text-zinc-100">
                  {options[parameter].find(
                    (el) => el.value === parameters?.[parameter],
                  )?.label ?? "Unknown"}
                </span>
              </div>
              <TriangleDownIcon className={clsx("w-4 h-4", "text-zinc-400")} />
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
                  "text-zinc-100 dark:text-zinc-800",
                )}
              />
              <Menu.Items
                static
                className={clsx(
                  "absolute right-0 top-2 origin-bottom-right",
                  "flex flex-col gap-2",
                  "w-auto",
                  "p-2",
                  "bg-zinc-100 dark:bg-zinc-800",
                  "rounded-lg",
                )}
              >
                {options[parameter].map((option) => {
                  return (
                    <Menu.Item key={option.value}>
                      {() => {
                        const isActive =
                          parameters?.[parameter] === option.value;

                        return (
                          <button
                            type="button"
                            disabled={option.status === "coming-soon"}
                            title={
                              option.status === "coming-soon"
                                ? "This option is coming soon!"
                                : ""
                            }
                            onClick={() => {
                              replace(
                                permalink.replace(
                                  parameters?.[parameter],
                                  option.value,
                                ),
                              );
                              setParameters({
                                ...(parameters ?? {}),
                                [parameter]: option.value,
                              });
                            }}
                            className={clsx(
                              "px-2 py-1",
                              "rounded-[4px]",
                              "no-underline",
                              {
                                "text-zinc-900 dark:text-zinc-100": isActive,
                                "bg-zinc-200 dark:bg-zinc-700": isActive,
                                "text-zinc-800 dark:text-zinc-200": !isActive,
                                "hover:bg-zinc-200 hover:dark:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100":
                                  !isActive,
                              },
                              option.status === "coming-soon" && [
                                "flex",
                                "items-center",
                                "justify-between",
                              ],
                            )}
                          >
                            <span
                              className={clsx(
                                option.status === "coming-soon" && "opacity-50",
                              )}
                            >
                              {option.label}
                            </span>
                            {option.status === "coming-soon" && (
                              <span
                                className={clsx(
                                  "w-min",
                                  "break-keep",
                                  "whitespace-nowrap",
                                  "inline-flex",
                                  "justify-center",
                                  "items-center",
                                  "translate-x-1.5",
                                  "py-0.5",
                                  "px-1",
                                  "border border-refine-orange",
                                  "rounded-[8px]",
                                  "text-refine-orange",
                                  "text-[8px]",
                                  "leading-[9px]",
                                  "font-semibold",
                                  "uppercase",
                                )}
                              >
                                soon
                              </span>
                            )}
                          </button>
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
