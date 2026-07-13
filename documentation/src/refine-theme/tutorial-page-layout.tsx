import React from "react";
import { TutorialParameterProvider } from "../context/tutorial-parameter-context";
import { TutorialVisitProvider } from "../context/tutorial-visit-context";
import { TutorialLayoutProvider } from "../context/tutorial-layout-context";

type Props = React.PropsWithChildren<{}>;

export const TutorialPageLayout = ({ children }: Props) => {
  return (
    <TutorialLayoutProvider>
      <TutorialVisitProvider>
        <TutorialParameterProvider>{children}</TutorialParameterProvider>
      </TutorialVisitProvider>
    </TutorialLayoutProvider>
  );
};
