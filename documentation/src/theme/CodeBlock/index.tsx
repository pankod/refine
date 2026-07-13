import React from "react";
import { CodeBlock } from "./base";
import { LivePreview } from "../../components/live-preview";
import { LivePreviewShared } from "../../components/live-preview-shared";
import { LivePreviewSharedCss } from "../../components/live-preview-shared-css";

export default function CodeBlockWrapper(
  props: JSX.IntrinsicAttributes & {
    live?: boolean;
    shared?: boolean;
    className?: string;
  },
): JSX.Element {
  if (props.live && props.live && props.className?.includes("language-css")) {
    return <LivePreviewSharedCss {...props} />;
  }
  if (props.shared && props.live) {
    return <LivePreviewShared {...props} />;
  }
  if (props.live) {
    return <LivePreview {...props} />;
  }

  return <CodeBlock {...(props as any)} />;
}
