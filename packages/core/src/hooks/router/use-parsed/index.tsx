import React from "react";
import { useParse } from "../use-parse";

export const useParsed = <
  TParams extends Record<string, any> = Record<string, any>,
>() => {
  const parse = useParse();

  const parsed = React.useMemo(() => parse<TParams>(), [parse]);

  return parsed;
};
