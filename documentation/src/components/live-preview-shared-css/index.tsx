import React from "react";
import { useLivePreviewContext } from "../live-preview-context";

type SharedPreviewProps = {
  children?: string;
};

/**
 * Live codeblock component
 */
const LivePreviewSharedCssBase = ({
  children,
}: SharedPreviewProps): JSX.Element => {
  const { setSharedCss } = useLivePreviewContext();

  React.useEffect(() => {
    setSharedCss(String(children));

    return () => {
      setSharedCss(undefined);
    };
  }, [children]);

  return null;
};

export const LivePreviewSharedCss = React.memo(
  LivePreviewSharedCssBase,
  (prev, next) => {
    return String(prev.children) === String(next.children);
  },
);
