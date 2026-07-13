import React from "react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

import { finalFiles as initialFiles } from "@site/tutorial/ui-libraries/authentication/material-ui/react-router/sandpack";
import { dependencies as initialDependencies } from "@site/tutorial/ui-libraries/intro/material-ui/react-router/sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// files

export const dependencies = {
  ...initialDependencies,
  "@refinedev/inferencer": "latest",
};

export const finalFiles = initialFiles;
