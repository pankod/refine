import React from "react";
import clsx from "clsx";
import { DocProvider } from "@docusaurus/theme-common/internal";
import DocItemMetadata from "@theme/DocItem/Metadata";
import TutorialItemLayout from "@theme/TutorialItem/Layout";

import { TutorialHeader } from "./tutorial-header";
import { TutorialFooter } from "./tutorial-footer";

export const TutorialItem = (props) => {
  const MDXComponent = props.content;

  return (
    <DocProvider content={props.content}>
      <TutorialHeader />
      <div
        className={clsx(
          "flex items-start justify-start",
          "w-full flex-1",
          "flex-col",
          "mx-auto",
        )}
      >
        <DocItemMetadata />
        <TutorialItemLayout>
          <MDXComponent />
        </TutorialItemLayout>
      </div>
      <TutorialFooter />
    </DocProvider>
  );
};
