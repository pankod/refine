import { pickResource } from "@definitions/helpers/pick-resource";
import { getActionRoutesFromResource } from "@definitions/helpers/router";
import { composeRoute } from "@definitions/helpers/router/compose-route";
import { useResourceParams } from "@hooks";
import { useGo } from "@hooks/router/use-go";
import { useParsed } from "@hooks/router/use-parsed";

import type { BaseKey, MetaQuery } from "../../contexts/data/types";
import type { IResourceItem } from "../../contexts/resource/types";

export type HistoryType = "push" | "replace";

/**
 * `refine` uses {@link https://reactrouter.com/api/hooks/useNavigate `React Router`} and comes with all redirects out of the box.
 * It allows you to manage your routing operations in refine.
 * Using this hook, you can manage all the routing operations of your application very easily.
 *
 * @internal This is an internal hook of refine. Do not use it directly.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation} for more details.
 */
export const useNavigation = () => {
  const { resources } = useResourceParams();
  const parsed = useParsed();
  const go = useGo();

  const handleUrl = (url: string, type: HistoryType = "push") => {
    go({ to: url, type });
  };

  const createUrl = (
    resource: string | IResourceItem,
    meta: MetaQuery = {},
  ) => {
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const createActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "create")?.route;

    if (!createActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(createActionRoute, resourceItem?.meta, parsed, meta),
      type: "path",
      query: meta.query,
    }) as string;
  };

  const editUrl = (
    resource: string | IResourceItem,
    id: BaseKey,
    meta: MetaQuery = {},
  ) => {
    const encodedId = encodeURIComponent(id);
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const editActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "edit")?.route;

    if (!editActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(editActionRoute, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      }),
      type: "path",
      query: meta.query,
    }) as string;
  };

  const cloneUrl = (
    resource: string | IResourceItem,
    id: BaseKey,
    meta: MetaQuery = {},
  ) => {
    const encodedId = encodeURIComponent(id);
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const cloneActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "clone")?.route;

    if (!cloneActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(cloneActionRoute, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      }),
      type: "path",
      query: meta.query,
    }) as string;
  };

  const showUrl = (
    resource: string | IResourceItem,
    id: BaseKey,
    meta: MetaQuery = {},
  ) => {
    const encodedId = encodeURIComponent(id);
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const showActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "show")?.route;

    if (!showActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(showActionRoute, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      }),
      type: "path",
      query: meta.query,
    }) as string;
  };

  const listUrl = (resource: string | IResourceItem, meta: MetaQuery = {}) => {
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const listActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "list")?.route;

    if (!listActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(listActionRoute, resourceItem?.meta, parsed, meta),
      type: "path",
      query: meta.query,
    }) as string;
  };

  const create = (
    resource: string | IResourceItem,
    type: HistoryType = "push",
    meta: MetaQuery = {},
  ) => {
    handleUrl(createUrl(resource, meta), type);
  };

  const edit = (
    resource: string | IResourceItem,
    id: BaseKey,
    type: HistoryType = "push",
    meta: MetaQuery = {},
  ) => {
    handleUrl(editUrl(resource, id, meta), type);
  };

  const clone = (
    resource: string | IResourceItem,
    id: BaseKey,
    type: HistoryType = "push",
    meta: MetaQuery = {},
  ) => {
    handleUrl(cloneUrl(resource, id, meta), type);
  };

  const show = (
    resource: string | IResourceItem,
    id: BaseKey,
    type: HistoryType = "push",
    meta: MetaQuery = {},
  ) => {
    handleUrl(showUrl(resource, id, meta), type);
  };

  const list = (
    resource: string | IResourceItem,
    type: HistoryType = "push",
    meta: MetaQuery = {},
  ) => {
    handleUrl(listUrl(resource, meta), type);
  };

  return {
    create,
    createUrl,
    edit,
    editUrl,
    clone,
    cloneUrl,
    show,
    showUrl,
    list,
    listUrl,
  };
};
