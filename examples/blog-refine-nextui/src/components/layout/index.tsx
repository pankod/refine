import type { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-2 mb-2">
      <Menu />
      <div>
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
