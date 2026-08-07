import React, { type ComponentProps } from "react";
import {
  type GoConfig,
  type ParseResponse,
  type RouterProvider,
  matchResourceFromRoute,
  ResourceContext,
  QS_PARSE_DEPTH,
} from "@refinedev/core";
import { useCallback, useContext } from "react";
import qs from "qs";
import {
  useNavigate,
  useLocation,
  Link,
  matchPath,
  useParams,
} from "react-router";
import { convertToNumberIfPossible } from "./convert-to-number-if-possible";

export const stringifyConfig = {
  addQueryPrefix: true,
  skipNulls: true,
  arrayFormat: "indices" as const,
  encode: false,
  encodeValuesOnly: true,
};

export const routerProvider: RouterProvider = {
  go: () => {
    const { search: existingSearch, hash: existingHash } = useLocation();
    const navigate = useNavigate();

    const fn = useCallback(
      ({
        to,
        type,
        query,
        hash,
        options: { keepQuery, keepHash } = {},
      }: GoConfig) => {
        /** Construct query params */
        const urlQuery = {
          ...(keepQuery &&
            existingSearch &&
            qs.parse(existingSearch, {
              ignoreQueryPrefix: true,
              depth: QS_PARSE_DEPTH,
            })),

          ...query,
        };

        if (urlQuery.to) {
          urlQuery.to = encodeURIComponent(`${urlQuery.to}`);
        }

        const hasUrlQuery = Object.keys(urlQuery).length > 0;

        /** Get hash */
        const urlHash = `#${(hash || (keepHash && existingHash) || "").replace(
          /^#/,
          "",
        )}`;

        const hasUrlHash = urlHash.length > 1;

        const urlTo = to || "";

        const fullPath = `${urlTo}${
          hasUrlQuery ? qs.stringify(urlQuery, stringifyConfig) : ""
        }${hasUrlHash ? urlHash : ""}`;

        if (type === "path") {
          return fullPath;
        }

        /** Navigate to the url */
        navigate(fullPath, {
          replace: type === "replace",
        });

        return;
      },
      [existingHash, existingSearch, navigate],
    );

    return fn;
  },
  back: () => {
    const navigate = useNavigate();

    const fn = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    return fn;
  },
  parse: () => {
    let params = useParams();
    const { pathname, search } = useLocation();
    const { resources } = useContext(ResourceContext);

    const { resource, action, matchedRoute } = React.useMemo(() => {
      return matchResourceFromRoute(pathname, resources);
    }, [resources, pathname]);

    // params is empty when useParams is used in a component that is not a child of a Route
    if (Object.entries(params).length === 0 && matchedRoute) {
      params = matchPath(matchedRoute, pathname)?.params || {};
    }

    const fn = useCallback(() => {
      const parsedSearch = qs.parse(search, {
        ignoreQueryPrefix: true,
        depth: QS_PARSE_DEPTH,
      });

      const combinedParams = {
        ...params,
        ...parsedSearch,
      };

      const response: ParseResponse = {
        ...(resource && { resource }),
        ...(action && { action }),
        ...(params?.id && { id: decodeURIComponent(params.id) }),
        // ...(params?.action && { action: params.action }), // lets see if there is a need for this
        pathname,
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
    }, [pathname, search, params, resource, action]);

    return fn;
  },
  Link: React.forwardRef<
    HTMLAnchorElement,
    ComponentProps<NonNullable<RouterProvider["Link"]>>
  >(function RefineLink(props, ref) {
    return <Link to={props.to} {...props} ref={ref} />;
  }),
};
