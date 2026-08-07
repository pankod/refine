import {
  type GoConfig,
  type RouterProvider,
  ResourceContext,
  matchResourceFromRoute,
  type ParseResponse,
  QS_PARSE_DEPTH,
} from "@refinedev/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
    const { push, replace } = useRouter();
    const pathname = usePathname();
    const searchParamsObj = useSearchParams();

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
            ? qs.parse(searchParamsObj.toString(), {
                ignoreQueryPrefix: true,
                depth: QS_PARSE_DEPTH,
              })
            : {}),
          ...query,
        };

        if (urlQuery.to) {
          urlQuery.to = encodeURIComponent(`${urlQuery.to}`);
        }

        const cleanPathname = pathname?.split("?")[0].split("#")[0] ?? "";

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
          replace(fullPath);
        } else {
          push(fullPath);
        }

        return undefined;
      },
      [searchParamsObj, push, replace],
    );

    return fn;
  },
  back: () => {
    const { back } = useRouter();

    return back;
  },
  parse: () => {
    const pathname = usePathname();
    const searchParamsObj = useSearchParams();
    const { resources } = useContext(ResourceContext);

    const { resource, action, matchedRoute } = React.useMemo(() => {
      if (!pathname) return { found: false };
      return matchResourceFromRoute(pathname, resources);
    }, [pathname, resources]);

    const inferredParams =
      matchedRoute && pathname
        ? paramsFromCurrentPath(pathname, matchedRoute)
        : {};

    const inferredId = inferredParams.id;

    const parsedParams = React.useMemo(() => {
      const searchParams = searchParamsObj.toString();
      return qs.parse(searchParams, {
        ignoreQueryPrefix: true,
        depth: QS_PARSE_DEPTH,
      });
    }, [searchParamsObj]);

    const fn = React.useCallback(() => {
      const combinedParams = {
        ...inferredParams,
        ...parsedParams,
      };

      const response: ParseResponse = {
        ...(resource && { resource }),
        ...(action && { action }),
        ...(inferredId && { id: decodeURIComponent(inferredId) }),
        pathname: pathname ? pathname : undefined,
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
    }, [pathname, parsedParams, inferredParams, inferredId, resource, action]);

    return fn;
  },
  Link: React.forwardRef<
    HTMLAnchorElement,
    ComponentProps<NonNullable<RouterProvider["Link"]>>
  >(function RefineLink({ to, ...props }, ref) {
    return <NextLink href={to} {...props} ref={ref} />;
  }),
};
