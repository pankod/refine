import clsx from "clsx";
import React from "react";
import TutorialItemContent from "./tutorial-item-content";

import { FULL_WIDTH_TABLE_VARIABLE_NAME } from "./common-table";
import { TutorialParameterDropdown } from "./tutorial-parameter-dropdown";
import { TutorialPaginator } from "./tutorial-paginator";
import { DocSurveyWidget } from "./doc-survey-widget";

export const TutorialDocumentLayout = ({ children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      const width = containerElement.getBoundingClientRect().width;
      containerElement.style.setProperty(
        `--${FULL_WIDTH_TABLE_VARIABLE_NAME}`,
        `${width}px`,
      );
    }

    // on resize, recompute the full width table variable
    const handleResize = () => {
      const width = containerElement.getBoundingClientRect().width;
      containerElement.style.setProperty(
        `--${FULL_WIDTH_TABLE_VARIABLE_NAME}`,
        `${width}px`,
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(
          "flex-1",
          "flex flex-col",
          "items-center justify-start",
          "px-4 sm:px-0 py-0",
          "relative",
          "w-full",
        )}
      >
        <div
          className={clsx("max-w-screen-content-2xl w-full", "mb-12", "mt-4")}
        >
          <div className={clsx("flex flex-col", "mb-6 tutorial-sm:mb-10")}>
            <div
              className={clsx(
                "flex",
                "tutorial-lg:hidden",
                "flex-row",
                "gap-2",
                "items-center",
                "flex-wrap",
              )}
            >
              <TutorialParameterDropdown
                label="Routing"
                parameter="routerSelection"
              />
              <TutorialParameterDropdown
                label="UI Framework"
                parameter="uiSelection"
              />
            </div>
          </div>
          <div className={clsx("refine-prose")}>
            <TutorialItemContent>{children}</TutorialItemContent>
            <DocSurveyWidget className={clsx("not-prose", "mx-auto", "mt-4")} />
          </div>
        </div>
        <div className={clsx("max-w-screen-content-2xl", "w-full")}>
          <TutorialPaginator />
        </div>
      </div>
    </>
  );
};
