import { RouterContext } from "@contexts/router";
import React, { useContext } from "react";
import type {
  ParseFunction,
  ParseResponse,
} from "../../../contexts/router/types";

type UseParseType = () => <
  TParams extends Record<string, any> = Record<string, any>,
>() => ParseResponse<TParams>;

export const useParse: UseParseType = () => {
  const routerContext = useContext(RouterContext);

  const useParse = React.useMemo(
    () =>
      routerContext?.parse ??
      (() =>
        (() => {
          return {};
        }) as ParseFunction),
    [routerContext?.parse],
  );

  const parse = useParse();

  return parse as ReturnType<UseParseType>;
};
