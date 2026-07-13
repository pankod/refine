import React from "react";
import { Navigate, useLocation } from "react-router";

/**
 * A component that will navigate to the given path with `to` query parameter included with the current location.
 */
export const CatchAllNavigate: React.FC<{ to: string }> = ({ to }) => {
  const { pathname, search } = useLocation();

  const queryValue = `${pathname}${search}`;

  const query =
    queryValue.length > 1 ? `?to=${encodeURIComponent(queryValue)}` : "";

  return <Navigate to={`${to}${query}`} />;
};
