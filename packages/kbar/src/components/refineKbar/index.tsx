import React, { useContext } from "react";

import { RefineKbarPropsContext } from "./../../index";
import { useRefineKbar } from "../../hooks";
import { CommandBar } from "../";

export const RefineKbar: React.FC<{
  commandBarProps?: React.ComponentProps<typeof CommandBar>;
}> = ({ commandBarProps }) => {
  const context = useContext(RefineKbarPropsContext);
  useRefineKbar();
  const props = { ...context, ...commandBarProps };

  return <CommandBar {...props} />;
};
