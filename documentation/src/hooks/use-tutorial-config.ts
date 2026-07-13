import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

type TutorialConfig = {
  tutorial: {
    path_prefix: string;
    units: Record<string, { no: number; label: string }>;
  };
};

export const useTutorialConfig = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { tutorial } = customFields;

  return tutorial as TutorialConfig;
};
