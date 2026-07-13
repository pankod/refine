import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

import { dependencies } from "@site/tutorial/essentials/intro/sandpack";
import { finalFiles as initialFiles } from "@site/tutorial/essentials/tables/sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack dependencies={dependencies} files={initialFiles}>
      {children}
    </TutorialSandpack>
  );
};

export { dependencies, initialFiles as finalFiles };
