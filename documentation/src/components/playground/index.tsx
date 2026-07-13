import clsx from "clsx";
import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

export const Playground = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { colorMode } = useColorMode();

  const sendColorMode = React.useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        {
          type: "colorMode",
          colorMode,
        },
        "*",
      );
    }
  }, [colorMode]);

  React.useEffect(() => {
    // when color mode changes, post a message to the iframe
    // to update its color mode
    sendColorMode();
  }, [sendColorMode]);

  return (
    <div
      className={clsx(
        "pb-6",
        "widening-start:-mx-4",
        "content-4xl:ml-0 content-4xl:mr-0",
      )}
    >
      <iframe
        ref={iframeRef}
        onLoad={() => {
          setTimeout(sendColorMode, 300);
        }}
        title="React Scaffolder"
        src="https://refine.new/doc-form"
        className={clsx(
          "w-full",
          "h-auto",
          "border-none",
          "rounded-lg",
          "min-h-[870px] max-h-[870px]",
          "content-xm:min-h-[532px] content-xm:max-h-[532px]",
          "content-xl-safe:min-h-[572px] content-xl-safe:max-h-[572px]",
          "max-w-screen-doc-form-lg",
          "mx-auto",
        )}
      />
    </div>
  );
};
