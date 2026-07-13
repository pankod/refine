import React, { type PropsWithChildren } from "react";

import { Cross } from "@components/icons";
import { UserNav } from "@components/common/UserNav";

import s from "./SidebarLayout.module.css";
import clsx from "clsx";

interface SidebarLayoutProps {
  handleClose: () => void;
  title?: string;
}

export const SidebarLayout: React.FC<PropsWithChildren<SidebarLayoutProps>> = ({
  children,
  handleClose,
  title,
}) => {
  return (
    <div className={s.root}>
      <header className={clsx(s.header, "p-6", "border-b border-b-gray-light")}>
        {title ? (
          <div className={clsx("text-2xl", "font-bold", "text-gray-darkest")}>
            {title}
          </div>
        ) : null}
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center transition duration-150 ease-in-out focus:outline-none"
          >
            <Cross className="hover:text-accent-3 h-6 w-6 text-gray-dark" />
          </button>
        )}
      </header>
      <div className={s.container}>{children}</div>
    </div>
  );
};
