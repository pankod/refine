import React from "react";
import {
  type PreferredUIPackage,
  availableUIPackages,
  UIPackageIcons,
} from "../../context/TutorialUIPackageContext/index";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";
import styles from "./styles.module.css";
import clsx from "clsx";

type CardProps = {
  name: string;
  title?: string;
  selected?: boolean;
  onClick?: () => void;
};

const Card = ({ name, title, selected, onClick }: CardProps) => {
  const Icon = UIPackageIcons[name];
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "not-prose",
        "w-[112px] h-[112px]",
        "2xl:w-[138px] 2xl:h-[140px]",
        "flex flex-col",
        "py-4",
        "rounded-lg",
        "justify-center",
        "items-center",
        "gap-2",
        "shadow-lg",
        "border-2 dark:border-gray-700 border-gray-200",
        selected && "dark:border-refine-blue border-refine-blue",
        selected && "ring-4 ring-refine-blue ring-opacity-50",
      )}
    >
      <div className={clsx("max-w-[48px] max-h-[48px]")}>
        <Icon
          className={clsx("w-full h-full", "text-gray-400 dark:text-gray-600")}
          withBrandColor={selected}
        />
      </div>
      {title && (
        <span
          className={clsx(
            selected && "text-gray-900 dark:text-gray-0",
            !selected && "text-gray-500 dark:text-gray-600",
          )}
        >
          {title}
        </span>
      )}
    </button>
  );
};

const names: Record<PreferredUIPackage, string> = {
  headless: "Headless",
  antd: "Ant Design",
  mui: "Material UI",
  mantine: "Mantine",
  "chakra-ui": "Chakra UI",
};

export const SelectTutorialFramework = ({ small, ...props }) => {
  const { preferred, setPreferred } = useTutorialUIPackage();

  return (
    <div {...props}>
      <div className={clsx(styles.cards, small && styles.cardsSmall)}>
        {availableUIPackages.map((uiPackage) => (
          <Card
            key={uiPackage}
            title={small ? undefined : names[uiPackage]}
            name={uiPackage}
            selected={preferred === uiPackage}
            onClick={() => setPreferred(uiPackage)}
          />
        ))}
      </div>
    </div>
  );
};
