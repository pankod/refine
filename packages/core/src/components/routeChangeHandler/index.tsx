import { useEffect, useContext } from "react";
import { useActiveAuthProvider } from "@definitions/index";
import { RouterContext } from "../../contexts/router";

export const RouteChangeHandler: React.FC = () => {
  const routerContext = useContext(RouterContext);
  const authProvider = useActiveAuthProvider();
  const parse = routerContext.parse?.();
  const pathname = parse?.()?.pathname || "";

  useEffect(() => {
    authProvider?.check?.().catch(() => false);
  }, [pathname]);

  return null;
};
