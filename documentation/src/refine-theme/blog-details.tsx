import clsx from "clsx";
import React from "react";
import { Details as DetailsGeneric } from "@docusaurus/theme-common/Details";

const hasCodeClass = (className?: string) =>
  /\blanguage-[\w-]+\b/.test(className ?? "");

const normalizeCodeFenceTitle = (value?: string) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const unwrapped = trimmed.match(/^(['"])(.*)\1$/)?.[2] ?? trimmed;
  return unwrapped.trim() || undefined;
};

const extractCodeFenceTitle = (metaString?: string, titleProp?: string) => {
  const normalizedTitleProp = normalizeCodeFenceTitle(titleProp);
  if (normalizedTitleProp) {
    return normalizedTitleProp;
  }

  if (typeof metaString !== "string") {
    return undefined;
  }

  const match = metaString.match(
    /(?:^|\s)title=(?:"([^"]+)"|'([^']+)'|([^\s]+))/,
  );

  return normalizeCodeFenceTitle(match?.[1] || match?.[2] || match?.[3]);
};

const findFirstCodeTitle = (node: React.ReactNode): string | undefined => {
  const items = React.Children.toArray(node);

  for (const item of items) {
    if (!React.isValidElement(item)) {
      continue;
    }

    const isCodeNode =
      item.props?.mdxType === "pre" ||
      (typeof item.type === "string" && item.type === "pre") ||
      hasCodeClass(item.props?.className) ||
      typeof item.props?.metastring === "string";

    const title = isCodeNode
      ? extractCodeFenceTitle(item.props?.metastring, item.props?.title)
      : undefined;

    if (title) {
      return title;
    }

    const nestedTitle = findFirstCodeTitle(item.props?.children);
    if (nestedTitle) {
      return nestedTitle;
    }
  }

  return undefined;
};

export const BlogDetails = (props: any) => {
  const items = React.Children.toArray(props.children);

  const summary = items.find(
    (item) => React.isValidElement(item) && item.props?.mdxType === "summary",
  );

  const contentItems = items.filter((item) => item !== summary);
  const codeTitle = findFirstCodeTitle(contentItems);
  const hasCode = hasCodeClass(props.className) || Boolean(codeTitle);

  const summaryWithVariant =
    summary && React.isValidElement(summary)
      ? React.cloneElement(summary, {
          codeTitle,
        })
      : summary;

  return (
    <DetailsGeneric
      {...props}
      className={clsx(
        props.className,
        "refine-details",
        "blog-details",
        "mb-4",
      )}
      data-has-code-title={codeTitle ? "true" : undefined}
      summary={summaryWithVariant}
    >
      <div className={clsx("blog-details-content", !hasCode && "p-4")}>
        {contentItems}
      </div>
    </DetailsGeneric>
  );
};

export default BlogDetails;
