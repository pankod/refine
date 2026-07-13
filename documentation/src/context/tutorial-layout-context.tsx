import React from "react";

export const TutorialLayoutContext = React.createContext<{
  contentPercentage: number;
  editorPercenage: number;
  setContentPercentage: (percentage: number) => void;
  setEditorPercentage: (percentage: number) => void;
}>({
  contentPercentage: 45,
  editorPercenage: 50,
  setContentPercentage: () => 0,
  setEditorPercentage: () => 0,
});

export const TutorialLayoutProvider: React.FC = ({ children }) => {
  const [contentPercentage, _setContentPercentage] = React.useState(() => {
    if (typeof window === "undefined") return 45;
    const storedValue = localStorage.getItem(
      "refine-tutorial-content-percentage",
    );
    if (storedValue) {
      const parsedValue = Number(storedValue);
      if (parsedValue >= 30 && parsedValue <= 70) {
        return parsedValue;
      }
    }
    return 45;
  });
  const [editorPercenage, _setEditorPercentage] = React.useState(() => {
    if (typeof window === "undefined") return 50;

    const storedValue = localStorage.getItem(
      "refine-tutorial-editor-percenage",
    );
    if (storedValue) {
      const parsedValue = Number(storedValue);
      if (parsedValue >= 30 && parsedValue <= 70) {
        return parsedValue;
      }
    }
    return 50;
  });

  const setContentPercentage = React.useCallback((percentage: number) => {
    _setContentPercentage(percentage);
    localStorage.setItem(
      "refine-tutorial-content-percentage",
      percentage.toString(),
    );
  }, []);

  const setEditorPercentage = React.useCallback((percentage: number) => {
    _setEditorPercentage(percentage);
    localStorage.setItem(
      "refine-tutorial-editor-percenage",
      percentage.toString(),
    );
  }, []);

  return (
    <TutorialLayoutContext.Provider
      value={{
        contentPercentage,
        editorPercenage,
        setContentPercentage,
        setEditorPercentage,
      }}
    >
      {children}
    </TutorialLayoutContext.Provider>
  );
};

export const useTutorialLayout = () => {
  return React.useContext(TutorialLayoutContext);
};
