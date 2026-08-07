import clsx from "clsx";
import React from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = React.PropsWithChildren<{}>;

export const Layout = ({ children }: Props) => {
  return (
    <div
      id="re-devtools-ui-layout"
      className={clsx("re-bg-gray-900", "re-flex", "re-flex-col", "re-h-full")}
    >
      <Header />
      <div
        className={clsx(
          "re-flex",
          "re-flex-1",
          "re-w-full",
          "re-h-full",
          "re-overflow-hidden",
          "re-h-[calc(100vh-36px-8px-8px-1px)]",
        )}
      >
        <Sidebar />
        <div
          className={clsx(
            "re-flex-1",
            "re-px-4",
            "re-pt-4",
            "md:re-px-6",
            "md:re-pt-6",
            "lg:re-px-8",
            "lg:re-pt-8",
            "re-flex",
            "re-flex-col",
            "re-pb-0",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
