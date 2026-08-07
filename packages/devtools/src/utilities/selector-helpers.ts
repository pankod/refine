import {
  getElementFromFiber,
  getFiberFromElement,
  getFirstFiberHasName,
  getFirstStateNodeFiber,
  getNameFromFiber,
  getParentOfFiber,
} from "@aliemir/dom-to-fiber-utils";

type Fiber = Exclude<ReturnType<typeof getFiberFromElement>, null>;

export type SelectableElement = {
  element: HTMLElement;
  name: string;
};

const getChildOfFiber = (fiber: Fiber | null) => {
  if (!fiber) {
    return null;
  }

  return fiber.child;
};

const getFirstHTMLElementFromFiberByChild = (fiber: Fiber | null) => {
  let child = fiber;

  while (child) {
    const element = getElementFromFiber(child);
    if (element && element instanceof HTMLElement) {
      return element;
    }

    child = getChildOfFiber(child) as Fiber;
  }

  return null;
};

const getFirstHTMLElementFromFiberByParent = (fiber: Fiber | null) => {
  let parent = fiber;

  while (parent) {
    const element = getElementFromFiber(parent);
    if (element && element instanceof HTMLElement) {
      return element;
    }

    parent = getParentOfFiber(parent) as Fiber;
  }

  return null;
};

const getFirstHTMLElementFromFiber = (
  fiber: Fiber | null,
): [element: HTMLElement, "child" | "parent" | "body"] => {
  let element = getFirstHTMLElementFromFiberByChild(fiber);

  if (element) {
    return [element, "child"];
  }

  element = getFirstHTMLElementFromFiberByParent(fiber);

  if (element) {
    return [element, "parent"];
  }

  return [document.body, "body"];
};

const selectFiber = (start: Fiber | null, activeTraceItems: string[]) => {
  let fiber = start;
  let firstParentOfNodeWithName: Fiber | null = null;
  let fiberWithStateNode: Fiber | null = null;

  let acceptedName = false;

  while (!acceptedName && fiber) {
    // Get the first fiber node that has a name (look up the tree)
    firstParentOfNodeWithName = getFirstFiberHasName(fiber);
    // Get the first fiber node that has a state node (look up the tree)
    fiberWithStateNode = getFirstStateNodeFiber(firstParentOfNodeWithName);
    acceptedName = activeTraceItems.includes(
      getNameFromFiber(firstParentOfNodeWithName) ?? "",
    );
    if (!acceptedName) {
      fiber = getParentOfFiber(fiber);
    }
  }

  if (fiberWithStateNode && firstParentOfNodeWithName) {
    return {
      stateNode: fiberWithStateNode,
      nameFiber: firstParentOfNodeWithName,
    };
  }
  return {
    stateNode: null,
    nameFiber: null,
  };
};

export const filterInvisibleNodes = (nodes: SelectableElement[]) => {
  return nodes.filter(
    (item) => item.element.offsetWidth > 0 && item.element.offsetHeight > 0,
  );
};

export const getUniqueNodes = (nodes: SelectableElement[]) => {
  const uniques: SelectableElement[] = [];

  nodes.forEach((node) => {
    const isElementExist = uniques.find(
      (item) => item.element === node.element && item.name === node.name,
    );
    if (!isElementExist) {
      uniques.push(node);
    }
  });

  return uniques;
};

export const traverseDom = (
  node: HTMLElement | null,
  activeTraceItems: string[],
): SelectableElement[] => {
  if (!node) {
    return [];
  }

  const items: SelectableElement[] = [];

  const fiber = getFiberFromElement(node);
  const targetFiber = selectFiber(fiber, activeTraceItems);

  if (targetFiber.nameFiber) {
    const [element] = getFirstHTMLElementFromFiber(targetFiber.nameFiber);
    const name = getNameFromFiber(targetFiber.nameFiber);
    if (element && name) {
      items.push({
        element,
        name,
      });
    }
  }

  for (let i = 0; i < (node?.children?.length ?? 0); i++) {
    items.push(
      ...traverseDom(node.children[i] as HTMLElement, activeTraceItems),
    );
  }

  return items;
};
