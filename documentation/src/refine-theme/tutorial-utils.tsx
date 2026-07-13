import { usePluginData } from "@docusaurus/useGlobalData";
/* @ts-expect-error Imports through webpack aliases does not work */
import data from "@tutorial-navigation/tutorial-navigation-data.json";

/* @ts-expect-error `/internal` is not directly exported but required in this case */
import { useDocsVersion } from "@docusaurus/theme-common/internal";

export const HEADER_HEIGHT = 65;

export type DocElement = {
  frontMatter: Record<string, unknown>;
  metadata: {
    frontMatter: Record<string, unknown>;
    id: string;
    permalink: string;
    slug: string;
    title: string;
  };
};

export type Tutorial = {
  label: string;
  defaultParameters: Record<string, string>;
  parameterOptions: Record<
    string,
    Array<{
      label: string;
      value: string;
      status?: "coming-soon";
    }>
  >;
  units: Array<{
    title: string;
    id: string;
    items: Array<string>;
  }>;
};

export const tutorialData: Tutorial = data as Tutorial;

export type TutorialDocItem = {
  id: string;
  path: string;
  title: string;
};

export const populateParametrizedId = (
  id: string,
  parameters: Record<string, string>,
) => {
  const idParts = id.split("/");
  const populatedIdParts = idParts.map((part) => {
    if (part.startsWith(":")) {
      const paramName = part.slice(1);
      return parameters[paramName];
    }
    return part;
  });
  return populatedIdParts.join("/");
};

export const findUnitByItemId = (
  itemId: string,
  parameters: Record<string, string>,
) => {
  for (const unit of tutorialData.units) {
    for (const item of unit.items) {
      if (itemId === populateParametrizedId(item, parameters)) {
        return unit;
      }
    }
  }
};

export const getNext = (itemId: string, parameters: Record<string, string>) => {
  let found = false;
  for (const unit of tutorialData.units) {
    for (const item of unit.items) {
      if (found) {
        return item;
      }
      if (populateParametrizedId(item, parameters) === itemId) {
        found = true;
      }
    }
  }
};

export const getPrevious = (
  itemId: string,
  parameters: Record<string, string>,
) => {
  let previous = null;
  for (const unit of tutorialData.units) {
    for (const item of unit.items) {
      if (populateParametrizedId(item, parameters) === itemId) {
        return previous;
      }
      previous = item;
    }
  }
};

export const useTutorialDocs = () => {
  const { docs } = useDocsVersion();
  const { versions } = usePluginData(
    "docusaurus-plugin-content-docs",
    "tutorial",
  ) as any;

  const tutorialDocs = versions[0].docs;

  for (const doc of tutorialDocs) {
    doc.title = docs[doc.id].title;
  }

  return Object.fromEntries(tutorialDocs.map((doc) => [doc.id, doc])) as Record<
    string,
    TutorialDocItem
  >;
};

export const getPathFromId = (
  id: string,
  items: Record<string, TutorialDocItem>,
) => {
  const item = items[id];
  if (!item) {
    throw new Error(`Cannot find item with id ${id}`);
  }
  return item.path;
};

export const getTitleFromId = (
  id: string,
  docs: Record<string, TutorialDocItem>,
) => {
  const doc = docs[id];
  if (!doc) {
    throw new Error(`Cannot find doc with id ${id}`);
  }
  return doc.title;
};
