import React from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { PageMetadata } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import ErrorPageContent from "@theme/ErrorPageContent";
import LayoutProvider from "@theme/Layout/Provider";
import SkipToContent from "@theme/SkipToContent";
import { LivePreviewProvider } from "../components/live-preview-context";
import useRouteFavicon from "../hooks/use-route-favicon";
import clsx from "clsx";

type Props = {
  className?: string;
} & Record<string, any>;

export const CommonLayout = (props: Props) => {
  const { children, title, description, className } = props;

  useKeyboardNavigation();
  useRouteFavicon();

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />
      <SkipToContent />
      <div
        className={clsx(
          "main-wrapper",
          "min-h-[100dvh]",
          "flex flex-col",
          "dark:bg-zinc-900 bg-white",
          className,
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          <LivePreviewProvider>{children}</LivePreviewProvider>
        </ErrorBoundary>
      </div>
    </LayoutProvider>
  );
};
