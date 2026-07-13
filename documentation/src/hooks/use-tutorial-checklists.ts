import React from "react";

import { TutorialChecklistContext } from "../context/TutorialChecklistContext";

type TutorialChecklist = {
  id: string;
  unit: string;
  title: string;
  checklist: Array<{ id: string; index: number }>;
};

type TutorialChecklistData = {
  items: Array<TutorialChecklist>;
};

type MergedTutorialChecklist = Omit<TutorialChecklist, "checklist"> & {
  checklist: Array<{
    id: string;
    checked: boolean;
  }>;
};

export const getTutorialsByUnit = (
  unit: string,
  items: MergedTutorialChecklist[],
) => {
  return items.filter((item) => item.unit === unit);
};

export const getTutorialChecklistById = (
  id: string,
  items: MergedTutorialChecklist[],
) => {
  return items.find((item) => item.id === id);
};

export const isTutorialChecklistComplete = (
  id: string,
  items: MergedTutorialChecklist[],
) => {
  const item = getTutorialChecklistById(id, items);

  if (!item) {
    return false;
  }

  return item.checklist.every((checklistItem) => checklistItem.checked);
};

export function useTutorialChecklists() {
  const { store, toggle } = React.useContext(TutorialChecklistContext);

  const merged = React.useMemo(() => {
    return (
      ({ items: [] } as TutorialChecklistData)?.items.map((item) => {
        const { id } = item;

        return {
          ...item,
          checklist: item.checklist
            .map((checklistItem) => {
              return {
                ...checklistItem,
                checked: store[id]?.[checklistItem.id] ?? false,
              };
            })
            .sort((a, b) => a.index - b.index),
        };
      }) ?? []
    );
  }, [store]);

  return {
    items: merged,
    toggle,
  };
}
