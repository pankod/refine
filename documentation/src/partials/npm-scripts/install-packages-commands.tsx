import React, { type FC, type PropsWithChildren } from "react";

import Tabs from "@site/src/refine-theme/common-tabs";
import { CodeBlock } from "@site/src/theme/CodeBlock/base";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TabItem from "@theme/TabItem";

type Props = {
  args?: string;
};

export const InstallPackagesCommand: FC<PropsWithChildren<Props>> = ({
  args,
  children,
}) => {
  const commands = {
    npm: `npm i ${args}`,
    pnpm: `pnpm add ${args}`,
    yarn: `yarn add ${args}`,
  };

  return (
    <Tabs wrapContent={true}>
      <TabItem value="npm" label="npm" default>
        <CodeBlock className="language-bash">{commands.npm}</CodeBlock>
        {children}
      </TabItem>
      <TabItem value="pnpm" label="pnpm">
        <CodeBlock className="language-bash">{commands.pnpm}</CodeBlock>
        {children}
      </TabItem>
      <TabItem value="yarn" label="yarn">
        <CodeBlock className="language-bash">{commands.yarn}</CodeBlock>
        {children}
      </TabItem>
    </Tabs>
  );
};
