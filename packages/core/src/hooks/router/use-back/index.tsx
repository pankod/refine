import { RouterContext } from "@contexts/router";
import React, { useContext } from "react";

export const useBack = () => {
  const routerContext = useContext(RouterContext);

  const useBack = React.useMemo(
    () => routerContext?.back ?? (() => () => undefined),
    [routerContext?.back],
  );

  const back = useBack();

  return back;
};
