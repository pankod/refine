import React from "react";
import { TutorialUIPackageContext } from "../context/TutorialUIPackageContext/index";

export const useTutorialUIPackage = () => {
  const value = React.useContext(TutorialUIPackageContext);

  return value;
};
