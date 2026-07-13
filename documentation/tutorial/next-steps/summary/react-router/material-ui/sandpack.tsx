import React from "react";
import { Fireworks } from "fireworks-js";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

import { finalFiles as initialFiles } from "@site/tutorial/next-steps/devtools/react-router/material-ui/sandpack";
import { dependencies } from "@site/tutorial/next-steps/intro/material-ui/sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showFireworks, setShowFireworks] = React.useState(true);

  React.useEffect(() => {
    setShowFireworks(true);

    const fireworks = new Fireworks(ref.currentPage, {
      intensity: 38,
      explosion: 8,
    });

    fireworks.start();

    const timeout = setTimeout(() => {
      setShowFireworks(false);
      setTimeout(() => {
        fireworks.pause();
        fireworks.clear();
        fireworks.stop();
      }, 500);
    }, 8000);

    return () => {
      setShowFireworks(false);
      setTimeout(() => {
        fireworks.pause();
        fireworks.clear();
        fireworks.stop();
      }, 500);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <TutorialSandpack
        showNavigator
        dependencies={dependencies}
        files={initialFiles}
        finalFiles={finalFiles}
        previewOnly
      >
        {children}
      </TutorialSandpack>
      <div
        ref={ref}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 99999,
          pointerEvents: "none",
          opacity: showFireworks ? 1 : 0,
          transition: "opacity 500ms ease-in-out",
        }}
      />
    </>
  );
};

export const finalFiles = initialFiles;
