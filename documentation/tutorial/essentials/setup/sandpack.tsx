import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

import { files, dependencies } from "../intro/sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack previewOnly dependencies={dependencies} files={files}>
      {children}
    </TutorialSandpack>
  );
};

export { files } from "../intro/sandpack";
