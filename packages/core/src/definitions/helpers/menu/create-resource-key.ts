import type { IResourceItem } from "../../../contexts/resource/types";
import {
  getParentResource,
  removeLeadingTrailingSlashes,
} from "../../helpers/router";

export const createResourceKey = (
  resource: IResourceItem,
  resources: IResourceItem[],
) => {
  const parents: IResourceItem[] = [];

  let currentParentResource = getParentResource(resource, resources);
  while (currentParentResource) {
    parents.push(currentParentResource);
    currentParentResource = getParentResource(currentParentResource, resources);
  }
  parents.reverse();

  const key = [...parents, resource]
    .map((r) => removeLeadingTrailingSlashes(r.identifier ?? r.name))
    .join("/");

  return `/${key.replace(/^\//, "")}`;
};
