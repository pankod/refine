import React from "react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

import { finalFiles as initialFiles } from "@site/tutorial/next-steps/cli/react-router/ant-design/sandpack";
import { dependencies } from "@site/tutorial/next-steps/intro/ant-design/sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

export const SelectorButtonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    className="inline"
    {...props}
  >
    <path
      fill="#0FBDBD"
      fillRule="evenodd"
      d="M9 1a1 1 0 0 0-2 0v2.1A5.006 5.006 0 0 0 3.1 7H1a1 1 0 0 0 0 2h2.1A5.006 5.006 0 0 0 7 12.9V15a1 1 0 1 0 2 0v-2.1A5.006 5.006 0 0 0 12.9 9H15a1 1 0 1 0 0-2h-2.1A5.006 5.006 0 0 0 9 3.1V1Zm2 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
      clipRule="evenodd"
    />
  </svg>
);

// updates

// actions

// files

export const finalFiles = initialFiles;
