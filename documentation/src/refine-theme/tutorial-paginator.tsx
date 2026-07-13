import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { ArrowLeftIcon } from "./icons/arrow-left";
import { ArrowRightIcon } from "./icons/arrow-right";

import { useDoc } from "@docusaurus/theme-common/internal";
import {
  type DocElement,
  getNext,
  getPathFromId,
  getPrevious,
  populateParametrizedId,
  useTutorialDocs,
} from "./tutorial-utils";
import { useTutorialParameters } from "../context/tutorial-parameter-context";

const TutorialPaginatorBase = (props) => {
  const { previous, next } = props;

  return (
    <div
      className={clsx(
        "flex flex-col-reverse",
        "landing-sm:grid landing-sm:grid-cols-2",
        "gap-4 2xl:gap-8",
        "w-full",
      )}
    >
      {previous && (
        <Link
          href={previous.permalink}
          className={clsx(
            "group",
            "flex-1",
            "p-4",
            "rounded-lg",
            "border border-zinc-300 dark:border-zinc-600",
            "hover:bg-zinc-100 hover:dark:bg-zinc-700",
            "hover:no-underline",
          )}
        >
          <div className="flex-1 flex items-start justify-center flex-col gap-2 text-left">
            <div
              className={clsx(
                "flex items-center gap-2",
                "text-base",
                "text-zinc-800 dark:text-zinc-100",
              )}
            >
              <span
                className={clsx("flex items-center justify-center", "w-6 h-6")}
              >
                <ArrowLeftIcon className="text-zinc-400 dark:text-zinc-500" />
              </span>
              Previous
            </div>
            <span
              className={clsx(
                "text-base",
                "text-refine-react-light-link dark:text-refine-react-dark-link",
                "ml-8",
              )}
            >
              {previous.title}
            </span>
          </div>
        </Link>
      )}
      {next && (
        <Link
          href={next.permalink}
          className={clsx(
            "group",
            "flex-1",
            "p-4",
            "rounded-lg",
            "border border-zinc-300 dark:border-zinc-600",
            "hover:bg-zinc-100 hover:dark:bg-zinc-700",
            "hover:no-underline",
            !previous && "tutorial-sm:col-start-2",
          )}
        >
          <div className="flex-1 flex items-end justify-center flex-col gap-2 text-right">
            <div
              className={clsx(
                "flex items-center gap-2",
                "text-base",
                "text-zinc-800 dark:text-zinc-100",
              )}
            >
              Next
              <span
                className={clsx("flex items-center justify-center", "w-6 h-6")}
              >
                <ArrowRightIcon className="text-zinc-400 dark:text-zinc-500" />
              </span>
            </div>

            <span
              className={clsx(
                "text-base",
                "text-refine-react-light-link dark:text-refine-react-dark-link",
                "mr-8",
              )}
            >
              {next.title}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export const TutorialPaginator = () => {
  const currentDoc = useDoc() as DocElement;
  const tutorialDocs = useTutorialDocs();
  const { parameters: params, settled } = useTutorialParameters();

  const nextIdRaw = settled
    ? getNext(currentDoc.metadata.id, params)
    : undefined;
  const previousIdRaw = settled
    ? getPrevious(currentDoc.metadata.id, params)
    : undefined;

  const nextId = nextIdRaw
    ? populateParametrizedId(nextIdRaw, params)
    : undefined;
  const previousId = previousIdRaw
    ? populateParametrizedId(previousIdRaw, params)
    : undefined;

  const nextPath =
    settled && nextId ? getPathFromId(nextId, tutorialDocs) : undefined;

  const previousPath =
    settled && previousId ? getPathFromId(previousId, tutorialDocs) : undefined;

  const nextTitle = settled && nextId ? tutorialDocs[nextId]?.title : undefined;
  const previousTitle =
    settled && previousId ? tutorialDocs[previousId]?.title : undefined;

  return (
    <TutorialPaginatorBase
      previous={
        previousPath && previousTitle
          ? {
              title: previousTitle,
              permalink: previousPath,
            }
          : undefined
      }
      next={
        nextPath && nextTitle
          ? {
              title: nextTitle,
              permalink: nextPath,
            }
          : undefined
      }
    />
  );
};
