import React from "react";
import clsx from "clsx";

import Link from "@docusaurus/Link";

import { useDoc } from "@docusaurus/theme-common/internal";

import { TriangleDownIcon } from "./icons/triangle-down";
import { CommonCircleChevronLeft } from "./common-circle-chevron-left";
import { useTutorialParameters } from "../context/tutorial-parameter-context";
import {
  type DocElement,
  findUnitByItemId,
  getNext,
  getPathFromId,
  getPrevious,
  getTitleFromId,
  populateParametrizedId,
  tutorialData,
  useTutorialDocs,
} from "./tutorial-utils";
import { useTutorialVisits } from "../context/tutorial-visit-context";

export const HEADER_HEIGHT = 65;

const NavigationCheckEmpty = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect
      width={15}
      height={15}
      fill="none"
      x={4.5}
      y={4.5}
      stroke="currentColor"
      rx={7.5}
    />
  </svg>
);

const NavigationCheckFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    className={clsx(props.className, "fill-refine-tutorial-green")}
  >
    <rect width={16} height={16} x={4} y={4} fill="currentFill" rx={8} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      fill="none"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 12 2 2 4-4"
    />
  </svg>
);

const NavigationDropdown = () => {
  const currentDoc = useDoc() as DocElement;
  const tutorialDocs = useTutorialDocs();
  const { parameters: params, settled } = useTutorialParameters();
  const { visited, setVisited } = useTutorialVisits();

  const currentUnit = settled
    ? findUnitByItemId(currentDoc.metadata.id, params)
    : undefined;

  const parameterPopulatedUnits = settled
    ? tutorialData.units.map((unit) => {
        return {
          ...unit,
          items: unit.items.map((item) => populateParametrizedId(item, params)),
        };
      })
    : [];

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  React.useEffect(() => {
    if (!visited[currentDoc.metadata.id]?.visited) {
      const timeout = setTimeout(() => {
        setVisited(currentDoc.metadata.id);
      }, 10 * 1000);

      return () => clearTimeout(timeout);
    }

    return () => 0;
  }, [currentDoc?.metadata?.id, visited]);

  const isUnitVisited = (unit: string) => {
    return parameterPopulatedUnits
      .find((u) => u.id === unit)
      ?.items.every((item) => visited[item]?.visited);
  };

  return (
    <div className={clsx("flex-1", "relative", "flex", "max-w-[384px]")}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={clsx(
          "appearance-none",
          "border-none",
          "outline-none",
          "flex-1",
          "py-2 tutorial-md:py-2.5",
          "pl-4 tutorial-md:pl-6",
          "pr-3",
          "bg-zinc-100 dark:bg-zinc-800",
          "flex",
          "gap-2",
          "items-center",
          "justify-start",
          "rounded",
        )}
      >
        <div
          className={clsx(
            "h-4 tutorial-md:h-5",
            "flex-1",
            "text-xs tutorial-md:text-sm",
            "leading-4 tutorial-md:leading-5",
            "text-zinc-900 dark:text-white",
            "relative",
          )}
        >
          <div
            className={clsx(
              "max-w-full",
              "w-full",
              "text-ellipsis",
              "whitespace-nowrap",
              "overflow-hidden",
              "absolute",
              "inset-0",
              "text-left",
              "select-none",
            )}
          >
            {currentUnit ? (
              <span>
                <span className={clsx("font-normal")}>
                  {currentUnit?.title}
                </span>
                <span className={clsx("text-zinc-400")}>{" / "}</span>
                <span className={clsx("font-semibold")}>
                  {currentDoc.metadata.title}
                </span>
              </span>
            ) : null}
          </div>
        </div>
        <div
          className={clsx(
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-center",
            "text-zinc-400",
          )}
        >
          <TriangleDownIcon className="w-4 h-4" />
        </div>
      </button>
      <div
        ref={dropdownRef}
        className={clsx(
          "overflow-scroll",
          "scrollbar-hidden",
          "absolute",
          "top-full",
          !dropdownOpen
            ? "opacity-0 max-h-0 -translate-y-8"
            : "opacity-100 max-h-[calc(100dvh-104px-64px-8px)] tutorial-sm:max-h-[calc(100dvh-55px-64px-8px)] tutorial-md:max-h-[calc(100dvh-60px-57px-8px)] translate-y-2",
          "transition-all ease-in-out duration-200",
          "shadow",
          "w-full",
          "h-fit",
          "bg-zinc-100 dark:bg-zinc-800",
          "rounded-[20px]",
        )}
      >
        <div className={clsx("inline")}>
          <div
            className={clsx(
              "py-8",
              "text-sm",
              "leading-6",
              "flex",
              "flex-col",
              "gap-8",
            )}
          >
            {parameterPopulatedUnits.map((unit) => {
              return (
                <div
                  key={unit.id}
                  className={clsx("flex", "flex-col", "gap-0")}
                >
                  <div
                    className={clsx(
                      "py-1",
                      "px-4",
                      "flex",
                      "items-center",
                      "gap-1",
                    )}
                  >
                    {isUnitVisited(unit.id) ? (
                      <NavigationCheckFilled className="text-zinc-100 dark:text-zinc-800" />
                    ) : (
                      <NavigationCheckEmpty className="text-zinc-400" />
                    )}
                    <span
                      className={clsx(
                        "font-semibold",
                        !isUnitVisited(unit.id) &&
                          "text-zinc-900 dark:text-white",
                        isUnitVisited(unit.id) && "text-zinc-400",
                      )}
                    >
                      {unit.title}
                    </span>
                  </div>
                  {unit.items.map((item) => {
                    return (
                      <Link
                        key={item}
                        to={getPathFromId(item, tutorialDocs)}
                        className={clsx(
                          "py-1",
                          "pl-8 pr-4",
                          "flex",
                          item === currentDoc.metadata.id &&
                            "bg-zinc-200 dark:bg-zinc-700",
                          "items-center",
                          "gap-1",
                          "text-zinc-900 dark:text-white",
                          "no-underline",
                          "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                        )}
                      >
                        {visited[item]?.visited ? (
                          <NavigationCheckFilled className="text-zinc-100 dark:text-zinc-800" />
                        ) : (
                          <NavigationCheckEmpty className="text-zinc-400" />
                        )}
                        <span
                          className={clsx(
                            !visited[item]?.visited &&
                              "text-zinc-900 dark:text-white",
                            visited[item]?.visited && "text-zinc-400",
                          )}
                        >
                          {getTitleFromId(item, tutorialDocs)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TutorialNavigation = () => {
  const currentDoc = useDoc() as DocElement;
  const tutorialDocs = useTutorialDocs();
  const { parameters: params, settled } = useTutorialParameters();

  const nextId = settled ? getNext(currentDoc.metadata.id, params) : undefined;
  const previousId = settled
    ? getPrevious(currentDoc.metadata.id, params)
    : undefined;

  const nextDoc =
    settled && nextId
      ? getPathFromId(populateParametrizedId(nextId, params), tutorialDocs)
      : undefined;

  const previousDoc =
    settled && previousId
      ? getPathFromId(populateParametrizedId(previousId, params), tutorialDocs)
      : undefined;

  return (
    <div
      className={clsx(
        "flex",
        "flex-1",
        "items-center",
        "justify-start",
        "max-w-[464px]",
        "gap-2",
      )}
    >
      <Link
        to={previousDoc}
        id="previous-doc-button"
        onClick={previousDoc ? undefined : (e) => e.preventDefault()}
        className={clsx(
          previousDoc ? "opacity-100" : "opacity-50",
          previousDoc ? "cursor-pointer" : "cursor-not-allowed",
          "p-2 tutorial-md:p-2.5",
          "text-zinc-400",
          "hover:text-zinc-400",
          "bg-zinc-100 dark:bg-zinc-800",
          "rounded",
        )}
      >
        <CommonCircleChevronLeft className="w-4 h-4 tutorial-md:w-5 tutorial-md:h-5" />
      </Link>
      <NavigationDropdown />
      <Link
        to={nextDoc}
        id="next-doc-button"
        onClick={nextDoc ? undefined : (e) => e.preventDefault()}
        className={clsx(
          nextDoc ? "opacity-100" : "opacity-50",
          nextDoc ? "cursor-pointer" : "cursor-not-allowed",
          "p-2 tutorial-md:p-2.5",
          "text-zinc-400",
          "hover:text-zinc-400",
          "bg-zinc-100 dark:bg-zinc-800",
          "rounded",
        )}
      >
        <CommonCircleChevronLeft className="rotate-180 w-4 h-4 tutorial-md:w-5 tutorial-md:h-5" />
      </Link>
    </div>
  );
};
