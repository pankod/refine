import React, { type ReactNode, useState } from "react";

import type { IThemedLayoutContext } from "./IThemedLayoutContext";

export const ThemedLayoutContext = React.createContext<IThemedLayoutContext>({
  siderCollapsed: false,
  mobileSiderOpen: false,
  setSiderCollapsed: () => undefined,
  setMobileSiderOpen: () => undefined,
});

export const ThemedLayoutContextProvider: React.FC<{
  children: ReactNode;
  initialSiderCollapsed?: boolean;
  onSiderCollapsed?: (collapsed: boolean) => void;
}> = ({ children, initialSiderCollapsed, onSiderCollapsed }) => {
  const [siderCollapsed, setSiderCollapsedState] = useState(
    initialSiderCollapsed ?? false,
  );
  const [mobileSiderOpen, setMobileSiderOpen] = useState(false);

  const setSiderCollapsed = (collapsed: boolean) => {
    setSiderCollapsedState(collapsed);
    if (onSiderCollapsed) {
      onSiderCollapsed(collapsed);
    }
  };

  return (
    <ThemedLayoutContext.Provider
      value={{
        siderCollapsed,
        mobileSiderOpen,
        setSiderCollapsed,
        setMobileSiderOpen,
      }}
    >
      {children}
    </ThemedLayoutContext.Provider>
  );
};
