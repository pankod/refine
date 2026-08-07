import {
  type GoConfig,
  type RouterProvider,
  ResourceContext,
  matchResourceFromRoute,
  type ParseResponse,
  QS_PARSE_DEPTH,
} from "@refinedev/core";
import { useRouter } from "next/router";
import NextLink from "next/link";
import qs from "qs";
import React, { type ComponentProps, useContext } from "react";
import { paramsFromCurrentPath } from "../common/params-from-current-path";
import { convertToNumberIfPossible } from "src/common/convert-to-number-if-possible";

export const stringifyConfig = {
  addQueryPrefix: true,
  skipNulls: true,
  arrayFormat: "indices" as const,
  encode: false,
  encodeValuesOnly: true,
};

export const routerProvider: RouterProvider = {
  go: () => {
    const { push, replace, asPath: pathname } = useRouter();

    const fn = React.useCallback(
      ({
        to,
        type,
        query,
        options: { keepQuery, keepHash } = {},
        hash,
      }: GoConfig) => {
        let urlHash = "";

        if (keepHash && typeof document !== "undefined") {
          urlHash = document.location.hash;
        }

        if (hash) {
          urlHash = `#${hash.replace(/^#/, "")}`;
        }

        const urlQuery = {
          ...(keepQuery
            ? qs.parse(pathname.split("?")[1], {
                ignoreQueryPrefix: true,
                depth: QS_PARSE_DEPTH,
              })
            : {}),
          ...query,
        };

        if (urlQuery.to) {
          urlQuery.to = encodeURIComponent(`${urlQuery.to}`);
        }

        const cleanPathname = pathname.split("?")[0].split("#")[0];

        const urlTo = to || cleanPathname;

        const hasUrlHash = urlHash.length > 1;
        const hasUrlQuery = Object.keys(urlQuery).length > 0;

        const fullPath = `${urlTo}${
          hasUrlQuery ? qs.stringify(urlQuery, stringifyConfig) : ""
        }${hasUrlHash ? urlHash : ""}`;

        if (type === "path") {
          return fullPath;
        }

        if (type === "replace") {
          replace(fullPath, undefined, {
            shallow: typeof to === "undefined",
          });
        } else {
          push(fullPath);
        }

        return undefined;
      },
      [pathname, push, replace],
    );

    return fn;
  },
  back: () => {
    const { back } = useRouter();

    return back;
  },
  parse: () => {
    const { query, asPath: pathname, isReady } = useRouter();
    const resourceContext = useContext(ResourceContext as any) || {};
    const resources = (resourceContext as any)?.resources || [];

    const cleanPathname = pathname.split("?")[0].split("#")[0];

    const { resource, action, matchedRoute } = React.useMemo(() => {
      return matchResourceFromRoute(cleanPathname, resources);
    }, [cleanPathname, resources]);

    const inferredParams =
      matchedRoute && cleanPathname && isReady
        ? paramsFromCurrentPath(cleanPathname, matchedRoute)
        : {};

    const inferredId = inferredParams.id;

    const parsedParams = React.useMemo(() => {
      const searchParams = pathname.split("?")[1];
      return qs.parse(searchParams, {
        ignoreQueryPrefix: true,
        depth: QS_PARSE_DEPTH,
      });
    }, [pathname]);

    const fn = React.useCallback(() => {
      const parsedQuery = qs.parse(query as Record<string, string>, {
        ignoreQueryPrefix: true,
        depth: QS_PARSE_DEPTH,
      });
      const combinedParams = {
        ...inferredParams,
        ...parsedQuery,
        ...parsedParams,
      };

      const response: ParseResponse = {
        ...(resource && { resource }),
        ...(action && { action }),
        ...(inferredId && { id: decodeURIComponent(inferredId) }),
        ...(query?.id && { id: decodeURIComponent(`${query?.id}`) }),
        pathname: cleanPathname,
        params: {
          ...combinedParams,
          currentPage: convertToNumberIfPossible(
            combinedParams.currentPage as string,
          ) as number | undefined,
          pageSize: convertToNumberIfPossible(
            combinedParams.pageSize as string,
          ) as number | undefined,
          to: combinedParams.to
            ? decodeURIComponent(combinedParams.to as string)
            : undefined,
        },
      };

      return response;
    }, [
      pathname,
      query,
      resource,
      action,
      inferredParams,
      inferredId,
      parsedParams,
    ]);

    return fn;
  },
  Link: React.forwardRef<
    HTMLAnchorElement,
    React.PropsWithChildren<{ to: string; [prop: string]: any }>
  >(function RefineLink({ to, ...props }, ref) {
    return React.createElement(NextLink as any, { href: to, ...props, ref });
  }),
};
