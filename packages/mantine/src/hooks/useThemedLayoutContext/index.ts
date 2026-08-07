import { useContext } from "react";

import { ThemedLayoutContext } from "../../contexts";
import type { IThemedLayoutContext } from "../../contexts/themedLayoutContext/IThemedLayoutContext";

export type UseThemedLayoutContextType = IThemedLayoutContext;

export const useThemedLayoutContext = (): UseThemedLayoutContextType => {
  const {
    mobileSiderOpen,
    siderCollapsed,
    setMobileSiderOpen,
    setSiderCollapsed,
  } = useContext(ThemedLayoutContext);

  return {
    mobileSiderOpen,
    siderCollapsed,
    setMobileSiderOpen,
    setSiderCollapsed,
  };
};
