import React from "react";
import { Admonition as RefineAdmonition } from "@site/src/refine-theme/common-admonition";

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) &&
      item.props?.mdxType === "mdxAdmonitionTitle",
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest,
  };
}
function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(
    props.children,
  );
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}

const AdmonitionBase = (props) => {
  const { children, type, title } = processAdmonitionProps(props);
  return (
    <RefineAdmonition type={type} title={title}>
      {children}
    </RefineAdmonition>
  );
};

export default function AdmonitionWrapper(props) {
  if (props.type === "info-tip") {
    return <AdmonitionBase {...props} />;
  }
  if (props.type === "additional") {
    return <AdmonitionBase {...props} type="note" title="ADDITIONAL INFO" />;
  }
  if (props.type === "sourcecode") {
    return (
      <AdmonitionBase
        {...props}
        icon={<GithubIcon />}
        title={
          <a href={props.path} target="_blank" style={{ marginLeft: "4px" }}>
            VIEW SOURCE CODE &#8594;
          </a>
        }
        titleProps={{ style: { marginBottom: "-4px" } }}
      >
        {props.children}
      </AdmonitionBase>
    );
  }
  if (props.type === "create-example") {
    return (
      <AdmonitionBase
        {...props}
        type="caution"
        icon={<TerminalIcon />}
        title={<span style={{ marginLeft: "4px" }}>RUN IN YOUR LOCAL</span>}
      >
        {props.children}
      </AdmonitionBase>
    );
  }
  return (
    <>
      <AdmonitionBase {...props} />
    </>
  );
}
