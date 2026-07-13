import React from "react";
import { useTutorialParameters } from "../context/tutorial-parameter-context";

type Props = {
  children?: React.ReactNode;
  parameter: string;
  value: string;
};

export const TutorialConditional = ({ parameter, value, children }: Props) => {
  const { parameters } = useTutorialParameters();

  if (parameters?.[parameter] === value) {
    return <>{children}</>;
  }

  return null;
};
