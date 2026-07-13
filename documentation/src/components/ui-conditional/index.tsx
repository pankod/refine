import React from "react";
import type { PreferredUIPackage } from "../../context/TutorialUIPackageContext/index";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";

type Props = {
  is?: PreferredUIPackage;
  children: React.ReactNode;
};

const UIConditional: React.FC<React.PropsWithChildren<Props>> = ({
  is,
  children,
}) => {
  const { current } = useTutorialUIPackage();

  if (is && current === is) {
    return <>{children}</>;
  }

  return null;
};

export default UIConditional;
