import React from "react";

import { useLocation } from "@docusaurus/router";
import { tutorialData } from "../refine-theme/tutorial-utils";

type TutorialParameterContextType = {
  parameters?: Record<string, string>;
  options: Record<
    string,
    Array<{ label: string; value: string; status?: "coming-soon" }> | undefined
  >;
  settled: boolean;
  setParameters: (parameters: Record<string, string>) => void;
};

export const TutorialParameterContext =
  React.createContext<TutorialParameterContextType>({
    parameters: {},
    options: {},
    settled: false,
    setParameters: () => 0,
  });

export const TUTORIAL_PARAMETER_LOCAL_STORAGE_KEY = "tutorial-parameters";

const getCurrentParameterFromDocumentId = (
  id: string,
  options: (typeof tutorialData.parameterOptions)[string],
) => {
  for (const option of options) {
    if (id.includes(`/${option.value}`)) {
      return option.value;
    }
  }
  return undefined;
};

const getCurrentParametersFromDocumentId = (id: string) => {
  const parameters: Record<string, string> = {};
  for (const [key, options] of Object.entries(tutorialData.parameterOptions)) {
    const currentParameter = getCurrentParameterFromDocumentId(id, options);
    if (currentParameter) {
      parameters[key] = currentParameter;
    }
  }
  return parameters;
};

const useCurrentParameters = () => {
  const { pathname } = useLocation();

  const currentParameters = React.useMemo(
    () => getCurrentParametersFromDocumentId(pathname),
    [pathname],
  );

  return currentParameters;
};

export const TutorialParameterProvider: React.FC = ({ children }) => {
  const [parameters, _setParameters] = React.useState<
    Record<string, string> | undefined
  >(undefined);
  const [settled, setSettled] = React.useState(false);
  const currentParameters = useCurrentParameters();

  const setParameters = React.useCallback((next: Record<string, string>) => {
    _setParameters((p) => {
      try {
        localStorage.setItem(
          TUTORIAL_PARAMETER_LOCAL_STORAGE_KEY,
          JSON.stringify({ ...p, ...next }),
        );
      } catch (e) {
        console.error(e);
      }

      return { ...p, ...next };
    });
  }, []);

  React.useEffect(() => {
    try {
      const storedParameters = localStorage.getItem(
        TUTORIAL_PARAMETER_LOCAL_STORAGE_KEY,
      );

      if (storedParameters) {
        setParameters({
          ...tutorialData.defaultParameters,
          ...JSON.parse(storedParameters),
          ...currentParameters,
        });
      } else {
        setParameters({
          ...tutorialData.defaultParameters,
          ...currentParameters,
        });
      }
    } catch (e) {
      setParameters({
        ...tutorialData.defaultParameters,
        ...currentParameters,
      });
    }

    setSettled(true);
  }, []);

  return (
    <TutorialParameterContext.Provider
      value={{
        parameters,
        setParameters,
        settled,
        options: tutorialData.parameterOptions,
      }}
    >
      {children}
    </TutorialParameterContext.Provider>
  );
};

export const useTutorialParameters = () => {
  const ctx = React.useContext(TutorialParameterContext);

  return ctx;
};
