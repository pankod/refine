import React from "react";
import { CodeBlock } from "../theme/CodeBlock/base";
import { TerminalIcon } from "./icons/terminal";

type Props = {
  path: string;
};

export const CommonRunLocalPrompt = ({ path }: Props) => {
  return (
    <CodeBlock
      language="bash"
      title="Run on your local"
      icon={<TerminalIcon />}
    >
      {`npm create refine-app@latest -- --example ${path}`}
    </CodeBlock>
  );
};
