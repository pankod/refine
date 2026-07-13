import { useMetaContext } from "@contexts/metaContext";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { useParsed } from "@hooks/router";

import type { MetaQuery } from "../../contexts/data/types";
import type { IResourceItem } from "../../contexts/resource/types";

/**
 * Hook that returns a function to get meta.
 * The meta is a combination of the resource meta, hook meta, query params and metaContext value.
 * @internal
 */
export const useMeta = () => {
  const { params } = useParsed();

  const metaContext = useMetaContext();

  const getMetaFn = ({
    resource,
    meta: metaFromProp,
  }: {
    resource?: IResourceItem;
    meta?: MetaQuery;
  } = {}) => {
    const { meta } = sanitizeResource(resource) ?? { meta: {} };

    // this fields came from the query params and should be removed from the meta because they are not part of the meta.
    const {
      filters: _filters,
      sorters: _sorters,
      currentPage: _currentPage,
      pageSize: _pageSize,
      ...additionalParams
    } = params ?? {};

    const result: Record<string, unknown> = {
      ...meta,
      ...additionalParams,
      ...metaFromProp,
    };

    // when MultiTenancyProvider from "@refinedev-ee/multi-tenancy" is provided, we need to add tenantId to the meta
    if (metaContext?.tenantId) {
      result["tenantId"] = metaContext.tenantId;
    }

    return result;
  };

  return getMetaFn;
};
