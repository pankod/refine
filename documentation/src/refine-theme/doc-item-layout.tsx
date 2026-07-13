import { useDoc, useDocsVersion } from "@docusaurus/theme-common/internal";
import DocItemContent from "@theme/DocItem/Content";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import clsx from "clsx";
import React from "react";
import { useDocTOCwithTutorial } from "../components/tutorial-toc/index";
import { useCurrentTutorial } from "../hooks/use-current-tutorial";
import { DocBreadcrumbs } from "./doc-breadcrumbs";
import { SourceCodeBadge } from "./doc-sourcecode-badge";
import { SwizzleBadge } from "./doc-swizzle-badge";
import { DocTOC } from "./doc-toc";
import { DocTOCMobile } from "./doc-toc-mobile";
import { DocVersionBadge } from "./doc-version-badge";
import { FULL_WIDTH_TABLE_VARIABLE_NAME } from "./common-table";

export const DocItemLayout = ({ children }) => {
  const docTOC = useDocTOCwithTutorial();
  const tutorial = useCurrentTutorial();
  const {
    frontMatter: { swizzle, source },
  } = useDoc();
  const { badge, label } = useDocsVersion();
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
          "px-4 sm:px-0 py-4 sm:py-14",
          "relative",
          "w-full",
        )}
      >
        <div className={clsx("max-w-screen-content w-full")}>
          <DocVersionBanner />
          <div className={clsx("flex flex-col", "mb-6 sm:mb-10")}>
            {tutorial?.isTutorial ? null : <DocBreadcrumbs />}
            <div className={clsx("flex", "flex-row", "gap-2", "items-center")}>
              {badge && <DocVersionBadge version={label} />}
              {swizzle && <SwizzleBadge />}
              {source && <SourceCodeBadge path={source} />}
            </div>
          </div>
          {tutorial?.isTutorial ? (
            <div className={clsx("my-4", "xl:hidden block")}>
              {docTOC.tutorialTOC}
            </div>
          ) : (
            <DocTOCMobile />
          )}
          <div className={clsx("refine-prose")}>
            <DocItemContent>{children}</DocItemContent>
          </div>
          <DocItemFooter />
        </div>
        <div className={clsx("max-w-screen-content", "w-full")}>
          <DocItemPaginator />
        </div>
      </div>
      {tutorial?.isTutorial ? (
        <div
          className={clsx(
            "mt-16",
            "hidden xl:block",
            "sticky top-[120px]",
            "w-[280px]",
            "px-3",
          )}
        >
          {docTOC.tutorialTOC}
        </div>
      ) : (
        <DocTOC />
      )}
    </>
  );
};
