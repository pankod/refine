import type { IResourceItem } from "../../../contexts/resource/types";

/**
 * Remove all properties that are non-serializable from a resource object.
 */
export const sanitizeResource = (
  resource?: Partial<IResourceItem> &
    Required<Pick<IResourceItem, "name">> & { children?: unknown } & Record<
      string,
      any
    >,
):
  | (Partial<IResourceItem> & Required<Pick<IResourceItem, "name">>)
  | undefined => {
  if (!resource) {
    return undefined;
  }

  const {
    list,
    edit,
    create,
    show,
    clone,
    children,
    meta,
    icon,
    ...restResource
  } = resource;

  const { icon: _metaIcon, ...restMeta } = meta ?? {};

  return {
    ...restResource,
    ...(meta ? { meta: restMeta } : {}),
  };
};
