import type { PropsWithChildren } from "react";

import { Menu } from "../menu";
import { Breadcrumb } from "../breadcrumb";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen surface-ground">
      <Menu />
      <div className="p-3">
        <Breadcrumb />
        {children}
      </div>
    </div>
  );
};
