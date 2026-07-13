import React from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
  PageMetadata,
} from "@docusaurus/theme-common";
import {
  docVersionSearchTag,
  DocsVersionProvider,
  useDocRouteMetadata,
} from "@docusaurus/theme-common/internal";
import TutorialPageLayout from "@theme/TutorialPage/Layout";
import NotFound from "@theme/NotFound";
import SearchMetadata from "@theme/SearchMetadata";

function DocPageMetadata(props) {
  const { versionMetadata } = props;
  return (
    <>
      <SearchMetadata
        version={versionMetadata.version}
        tag={docVersionSearchTag(
          versionMetadata.pluginId,
          versionMetadata.version,
        )}
      />
      <PageMetadata>
        {versionMetadata.noIndex && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </PageMetadata>
    </>
  );
}

export default function TutorialPage(props) {
  const { versionMetadata } = props;

  const currentDocRouteMetadata = useDocRouteMetadata(props);

  if (!currentDocRouteMetadata) {
    return <NotFound />;
  }

  const { docElement } = currentDocRouteMetadata;

  return (
    <>
      <DocPageMetadata {...props} />
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage,
          props.versionMetadata.className,
        )}
      >
        {/* Pass parameter contexts here */}
        <DocsVersionProvider version={versionMetadata}>
          <TutorialPageLayout>{docElement}</TutorialPageLayout>
        </DocsVersionProvider>
      </HtmlClassNameProvider>
    </>
  );
}
