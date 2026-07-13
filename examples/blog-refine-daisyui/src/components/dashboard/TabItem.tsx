import React from "react";

type TTabItem = {
  label: string;
  isActive: boolean;
  clickHandler: () => void;
};
export const TabItem = ({ label, isActive, clickHandler }: TTabItem) => {
  return (
    <a
      className={`text-l font-bold tab tab-bordered${
        isActive ? " tab-active" : ""
      }`}
      onClick={clickHandler}
    >
      {label}
    </a>
  );
};
