import { usePrismTheme, useThemeConfig } from "@docusaurus/theme-common";
import {
  containsLineNumbers,
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
  useCodeWordWrap,
} from "@docusaurus/theme-common/internal";
import Line from "@theme/CodeBlock/Line";
import clsx from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import React from "react";
import { CommonCodeBlockContainer } from "./common-codeblock-container";
import { CommonCopyButton } from "./common-copy-button";
import { CommonWordWrapButton } from "./common-wordwrap-button";
import { isCurrentBlogRoute } from "../utils/is-blog-route";

const DefaultDocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    viewBox="0 0 12 14"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11 4.994V11.6A1.4 1.4 0 0 1 9.6 13H2.4A1.4 1.4 0 0 1 1 11.6V2.4A1.4 1.4 0 0 1 2.4 1h4.606a1.4 1.4 0 0 1 .99.41l2.594 2.594a1.4 1.4 0 0 1 .41.99ZM0 2.4A2.4 2.4 0 0 1 2.4 0h4.606a2.4 2.4 0 0 1 1.697.703l2.594 2.594A2.4 2.4 0 0 1 12 4.994V11.6A2.4 2.4 0 0 1 9.6 14H2.4A2.4 2.4 0 0 1 0 11.6V2.4ZM3.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z"
      clipRule="evenodd"
    />
  </svg>
);

const CodeBlockTitle = ({
  children,
  icon = <DefaultDocumentIcon />,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const isBlog = isCurrentBlogRoute();

  return (
    <div
      className={clsx(
        "py-3",
        "px-4",
        "text-xs",
        "flex items-center",
        "gap-2",
        !isBlog && "bg-zinc-200 dark:bg-zinc-800",
        !isBlog && "text-zinc-900",
        !isBlog && "dark:text-white",
        !isBlog && "rounded-tl-xl",
        !isBlog && "rounded-tr-xl",
        isBlog && "border-b border-zinc-200 dark:border-transparent",
        isBlog && "text-zinc-700",
        isBlog && "dark:text-white",
        isBlog && "bg-zinc-100 dark:bg-zinc-800",
        isBlog && "rounded-tl-lg",
        isBlog && "rounded-tr-lg",
      )}
    >
      {icon}
      {children}
    </div>
  );
};

export const CodeBlockString = ({
  children,
  className: blockClassName = "",
  metastring,
  title: titleProp,
  showLineNumbers: showLineNumbersProp,
  language: languageProp,
  icon,
  style,
}) => {
  const isBlog = isCurrentBlogRoute();

  const {
    prism: { defaultLanguage, magicComments },
  } = useThemeConfig();
  const language =
    languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage;
  const prismTheme = usePrismTheme();
  const wordWrap = useCodeWordWrap();
  // We still parse the metastring in case we want to support more syntax in the
  // future. Note that MDX doesn't strip quotes when parsing metastring:
  // "title=\"xyz\"" => title: "\"xyz\""
  const title = parseCodeBlockTitle(metastring) || titleProp;

  const { lineClassNames, code } = parseLines(children, {
    metastring,
    language,
    magicComments,
  });

  const showLineNumbers =
    showLineNumbersProp ?? containsLineNumbers(metastring);

  return (
    <CommonCodeBlockContainer
      as="div"
      className={clsx(
        "refine-common-code-block",
        language && `language-${language}`,
        !isBlog && "rounded-xl",
        isBlog && "rounded-lg",
        "bg-refine-react-light-code",
        "dark:bg-refine-react-dark-code",
        "mb-6",
        "relative",
        !isBlog && "refine-wider-container",
      )}
      style={style}
    >
      {title && <CodeBlockTitle icon={icon}>{title}</CodeBlockTitle>}
      <div className={clsx("relative", "pt-4", "pb-0", "not-prose")}>
        <Highlight
          {...defaultProps}
          theme={prismTheme}
          code={code}
          language={language ?? "text"}
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre
              tabIndex={0}
              ref={wordWrap.codeBlockRef}
              className={clsx(
                className,
                "bg-transparent",
                "!mt-0",
                "!mb-0",
                "m-0",
                "px-0",
                "pt-0",
                "font-jetBrains-mono",
                "pb-3",
              )}
            >
              <code
                className={clsx(
                  "font-[inherit]",
                  "bg-transparent",
                  "inline-block",
                  "min-w-full",
                )}
              >
                {tokens.map((line, i) => (
                  <Line
                    key={i}
                    line={line}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                    classNames={clsx(
                      lineClassNames[i],
                      "px-4",
                      "text-xs sm:text-sm 2xl:text-sm",
                    )}
                    showLineNumbers={showLineNumbers}
                  />
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
      <div
        className={clsx(
          "absolute",
          title ? "top-14 right-4" : "top-3 right-3",
          "flex items-center gap-2",
        )}
      >
        {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
          <CommonWordWrapButton
            onClick={wordWrap.toggle}
            isEnabled={wordWrap.isEnabled}
          />
        )}
        <CommonCopyButton className={clsx()} code={code} />
      </div>
    </CommonCodeBlockContainer>
  );
};
