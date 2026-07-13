import React from "react";

export type ChecklistStore = {
  [tutorialId: string]: {
    [checkId: string]: boolean;
  };
};

const LOCALSTORAGE_KEY = "tutorial-checklist-store";

export const TutorialChecklistContext = React.createContext<{
  store: ChecklistStore;
  toggle: (tutorialId: string, checkId: string, status?: boolean) => void;
}>({
  store: {},
  toggle: () => undefined,
});

export const TutorialChecklistProvider: React.FC<React.PropsWithChildren<{}>> =
  ({ children }) => {
    const [store, setStore] = React.useState<ChecklistStore>(() => {
      if (typeof window !== "undefined") {
        const rawValue = localStorage.getItem(LOCALSTORAGE_KEY);
        if (rawValue) {
          try {
            const parsed = JSON.parse(rawValue);
            if (typeof parsed === "object") {
              return parsed;
            }
          } catch (e) {
            return {};
          }
        }
      }
      return {};
    });

    const toggle = React.useCallback(
      (tutorialId: string, checkId: string, status?: boolean) => {
        setStore((prevStore) => {
          const newStore = { ...prevStore };

          if (!newStore[tutorialId]) {
            newStore[tutorialId] = {};
          }

          newStore[tutorialId][checkId] =
            status ?? !newStore[tutorialId][checkId];

          return newStore;
        });
      },
      [],
    );

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(store));
      }
    }, [store]);

    return (
      <TutorialChecklistContext.Provider value={{ store, toggle }}>
        {children}
      </TutorialChecklistContext.Provider>
    );
  };
