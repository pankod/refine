import React from "react";

import Tabs from "@site/src/refine-theme/common-tabs";
import TabItem from "@docusaurus/theme-classic/lib/theme/TabItem";
import { CodeBlock } from "@site/src/theme/CodeBlock/base";
import ReactMarkdown from "react-markdown";

export const CreateRefineAppCommand = ({ args }: { args?: string }) => {
  const argsString = args ? `${args}` : "";

  const commands = {
    npm: `npm create refine-app@latest  ${
      argsString ? `-- ${argsString}` : ""
    }`,
    pnpm: `pnpm create refine-app@latest ${argsString}`,
    yarn: `yarn create refine-app@latest ${argsString}`,
  };

  return (
    <Tabs>
      <TabItem value="npm" label="npm" default>
        <CodeBlock className="language-bash">{commands.npm}</CodeBlock>
      </TabItem>
      <TabItem value="pnpm" label="pnpm">
        <CodeBlock className="language-bash">{commands.pnpm}</CodeBlock>
      </TabItem>
      <TabItem value="yarn" label="yarn">
        <CodeBlock className="language-bash">{commands.yarn}</CodeBlock>
        <ReactMarkdown>{"> Only supports yarn@1 version."}</ReactMarkdown>
      </TabItem>
    </Tabs>
  );
};
