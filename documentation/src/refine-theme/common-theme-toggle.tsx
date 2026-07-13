import React from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";

import { LightModeIcon } from "./icons/light-mode";
import { DarkModeIcon } from "./icons/dark-mode";

type Props = {
  className?: string;
};

export const CommonThemeToggle = ({ className }: Props) => {
  const { colorMode, setColorMode } = useColorMode();

  const toggle = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      className={clsx(
        "appearance-none",
        "focus:outline-none",
        "relative",
        "w-10 h-10",
        "rounded-lg",
        "text-zinc-500 dark:text-zinc-300",
        "border border-solid border-zinc-200 dark:border-zinc-700",
        "transition-colors",
        "duration-150",
        "ease-in-out",
        "overflow-hidden",
        "flex-shrink-0",
        "group",
        className,
      )}
      onClick={toggle}
    >
      <div
        className={clsx(
          "absolute",
          "w-full h-full",
          "flex items-center justify-center",
          "flex-shrink-0",
          "top-10",
          "translate-y-0",
          "dark:-translate-y-10",
          "duration-200",
          "ease-in-out",
          "transition-transform",
        )}
      >
        <LightModeIcon />
      </div>
      <div
        className={clsx(
          "absolute",
          "w-full h-full",
          "flex items-center justify-center",
          "flex-shrink-0",
          "top-10",
          "-translate-y-10",
          "dark:translate-y-0",
          "duration-200",
          "ease-in-out",
          "transition-transform",
        )}
      >
        <DarkModeIcon />
      </div>
    </button>
  );
};

const themes = [
  { name: "light", icon: LightModeIcon, label: "Light" },
  { name: "dark", icon: DarkModeIcon, label: "Dark" },
];

export const CommonThemeToggleAlt = ({ className }: Props) => {
  const { colorMode, setColorMode } = useColorMode();

  const toggle = (next: string) => {
    setColorMode(next as typeof colorMode);
  };

  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "gap-4",
        "justify-start",
        className,
      )}
    >
      {themes.map(({ name, label, icon: Icon }) => (
        <button
          type="button"
          key={name}
          className={clsx(
            "appearance-none",
            "focus:outline-none",
            "py-1",
            "pl-1.5",
            "pr-3",
            "flex",
            "items-center",
            "justify-center",
            "gap-1",
            "rounded-[40px]",
            "text-gray-400",
            "border border-solid",
            "border-gray-200",
            "dark:border-gray-600",
            colorMode === name && "bg-gray-100 dark:bg-gray-700",
          )}
          onClick={() => toggle(name)}
        >
          <Icon className={clsx("w-4 h-4")} />
          <span className={clsx("text-sm")}>{label}</span>
        </button>
      ))}
    </div>
  );
};
