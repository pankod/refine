import React from "react";

type Status = {
  visited: boolean;
};

type TutorialVisitContextType = {
  visited: Record<string, Status | undefined>;
  setVisited: (id: string, status?: boolean) => void;
};

export const TutorialVisitContext =
  React.createContext<TutorialVisitContextType>({
    visited: {},
    setVisited: () => 0,
  });

export const TUTORIAL_VISIT_LOCAL_STORAGE_KEY = "tutorial-visits";

export const TutorialVisitProvider: React.FC = ({ children }) => {
  const [visited, _setVisited] = React.useState<
    TutorialVisitContextType["visited"]
  >({});

  React.useEffect(() => {
    // read from local storage
    try {
      const storedVisits = localStorage.getItem(
        TUTORIAL_VISIT_LOCAL_STORAGE_KEY,
      );

      if (storedVisits) {
        _setVisited(JSON.parse(storedVisits));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setVisited = React.useCallback((id: string, status = true) => {
    _setVisited((p) => {
      const next = {
        ...p,
        [id]: {
          visited: status,
        },
      };
      try {
        localStorage.setItem(
          TUTORIAL_VISIT_LOCAL_STORAGE_KEY,
          JSON.stringify(next),
        );
      } catch (e) {
        console.error(e);
      }

      return next;
    });
  }, []);

  return (
    <TutorialVisitContext.Provider value={{ visited, setVisited }}>
      {children}
    </TutorialVisitContext.Provider>
  );
};

export const useTutorialVisits = () => {
  const ctx = React.useContext(TutorialVisitContext);

  return ctx;
};
