import React from "react";
import { CommonShowSourcePrompt } from "../../refine-theme/common-show-source-prompt";

type Props = {
  path: string;
};

const ExampleSourcePrompt: React.FC<Props> = ({ path }) => {
  const REPO_TREE_URL = "https://github.com/refinedev/refine/tree";

  const SOURCE_URL = `${REPO_TREE_URL}/main/examples/${path}`;

  return <CommonShowSourcePrompt path={SOURCE_URL} />;
};

export default ExampleSourcePrompt;
