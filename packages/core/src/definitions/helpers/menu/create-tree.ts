import type { IResourceItem } from "../../../contexts/resource/types";
import { getParentResource } from "../router";
import { createResourceKey } from "./create-resource-key";

export type Tree = {
  item: IResourceItem;
  children: { [key: string]: Tree };
};

export type FlatTreeItem = IResourceItem & {
  key: string;
  children: FlatTreeItem[];
};

export const createTree = (resources: IResourceItem[]): FlatTreeItem[] => {
  const root: Tree = {
    item: {
      name: "__root__",
    },
    children: {},
  };

  resources.forEach((resource) => {
    const parents: IResourceItem[] = [];

    let currentParent = getParentResource(resource, resources);
    while (currentParent) {
      parents.push(currentParent);
      currentParent = getParentResource(currentParent, resources);
    }
    parents.reverse();

    let currentTree = root;

    parents.forEach((parent) => {
      const key = parent.identifier ?? parent.name;

      if (!currentTree.children[key]) {
        currentTree.children[key] = {
          item: parent,
          children: {},
        };
      }
      currentTree = currentTree.children[key];
    });

    const key = resource.identifier ?? resource.name;

    if (!currentTree.children[key]) {
      currentTree.children[key] = {
        item: resource,
        children: {},
      };
    }
  });

  const flatten = (tree: Tree): FlatTreeItem[] => {
    const items: FlatTreeItem[] = [];

    Object.keys(tree.children).forEach((key) => {
      const itemKey = createResourceKey(tree.children[key].item, resources);
      const item: FlatTreeItem = {
        ...tree.children[key].item,
        key: itemKey,
        children: flatten(tree.children[key]),
      };
      items.push(item);
    });

    return items;
  };

  return flatten(root);
};
