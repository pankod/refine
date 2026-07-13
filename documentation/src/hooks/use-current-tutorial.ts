// @ts-expect-error no types
import { useDoc } from "@docusaurus/theme-common/internal";
// @ts-expect-error no types
import { useDocsVersion } from "@docusaurus/theme-common/internal";

import useTutorialPagination from "./use-tutorial-pagination";

// import { Doc } from "@docusaurus/types";
import { availableUIPackages } from "../context/TutorialUIPackageContext/index";
import { useTutorialConfig } from "./use-tutorial-config";
import { useTutorialUIPackage } from "./use-tutorial-ui-package";

type DocItem = {
  id: string;
  title: string;
};

const TUTORIAL_ID_PREFIX = "tutorial/";

// tutorial doc id structure is tutorial/<unit>/<tutorial-id>

export const useCurrentTutorial = () => {
  const currentDoc = useDoc();
  const { docs } = useDocsVersion();

  const {
    frontMatter,
    metadata: { id: currentId },
  } = currentDoc;

  const {
    tutorial: { units: unitsConfig },
  } = useTutorialConfig();

  const { current: currentUIPackage } = useTutorialUIPackage();

  const filterNotPreferred = (doc: DocItem) => {
    const splitted = doc.id.split("/");

    const unwantedPackages = availableUIPackages.filter(
      (el) => el !== currentUIPackage,
    );

    return !splitted.find((el) => unwantedPackages.includes(el as any));
  };

  const isTutorial = !!(frontMatter as any)?.tutorial;

  const unit = currentId.split("/")[1];

  const pagination = useTutorialPagination(currentDoc as any);

  const allTutorialDocs = Object.entries<DocItem>(docs).filter(([key]) =>
    key.startsWith(TUTORIAL_ID_PREFIX),
  );

  const separatedByUnit = allTutorialDocs.reduce(
    (acc, [key, value]) => {
      const unit = key.split("/")[1];

      if (unit.startsWith("partial-")) {
        return acc;
      }

      if (!acc[unit]) {
        acc[unit] = [];
      }

      acc[unit].push(value);

      return acc;
    },
    {} as Record<string, DocItem[]>,
  );

  const unitsArray = Object.entries(separatedByUnit)
    .map(([key, value]) => ({
      unit: key,
      no: unitsConfig[key]?.no,
      title: unitsConfig[key].label,
      ...(key === unit && isTutorial && { current: true }),
      docs: value
        .map((el) => ({
          ...el,
          ...(el.id === currentId && isTutorial && { current: true }),
        }))
        .filter(filterNotPreferred),
    }))
    .sort((a, b) => a?.no - b?.no);

  return isTutorial
    ? {
        id: currentId,
        isTutorial,
        unit,
        pagination,
        units: unitsArray,
      }
    : undefined;
};
