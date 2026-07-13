import { RefineContext } from "@contexts/refine";
import React from "react";

export const useRefineOptions = () => {
  const { options } = React.useContext(RefineContext);

  return options;
};
