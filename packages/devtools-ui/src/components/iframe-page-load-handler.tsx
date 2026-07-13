import React from "react";

export const IframePageLoadHandler = () => {
  // send message to the parent window to notify that the iframe is loaded
  React.useEffect(() => {
    window.parent.postMessage({ type: "refine-devtools-iframe-loaded" }, "*");
  }, []);

  return null;
};
