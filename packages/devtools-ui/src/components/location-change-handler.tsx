import React from "react";
import { useLocation } from "react-router";
import { setLastLocation } from "src/utils/last-location";

export const LocationChangeHandler = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      setLastLocation(pathname);
    }
  }, [pathname]);

  return null;
};
