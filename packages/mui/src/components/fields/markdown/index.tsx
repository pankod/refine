import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import type { MarkdownFieldProps } from "../types";

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/fields/markdown} for more details.
 */
export const MarkdownField: React.FC<MarkdownFieldProps> = ({ value = "" }) => {
  // There's an issue related with the type inconsistency of the `remark-gfm` and `remark-rehype` packages, we need to cast the `gfm` as any. (https://github.com/orgs/rehypejs/discussions/63)
  return (
    <ReactMarkdown
      remarkPlugins={[gfm] as unknown as ReactMarkdown.PluggableList}
    >
      {value}
    </ReactMarkdown>
  );
};
