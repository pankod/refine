import { useResourceParams, useGetToPath } from "@refinedev/core";
import React, { type PropsWithChildren } from "react";
import { Navigate } from "react-router";

type NavigateToResourceProps = PropsWithChildren<{
  resource?: string;
  fallbackTo?: string;
  meta?: Record<string, unknown>;
}>;

export const NavigateToResource: React.FC<NavigateToResourceProps> = ({
  resource: resourceProp,
  fallbackTo,
  meta,
}) => {
  const getToPath = useGetToPath();
  const { resource, resources } = useResourceParams({
    resource: resourceProp,
  });

  const toResource = resource || resources.find((r) => r.list);

  if (toResource) {
    const path = getToPath({
      resource: toResource,
      action: "list",
      meta,
    });

    if (path) {
      return <Navigate to={path} />;
    }

    return null;
  }

  if (fallbackTo) {
    console.warn(`No resource is found. navigation to ${fallbackTo}.`);
    return <Navigate to={fallbackTo} />;
  }

  console.warn(
    'No resource and "fallbackTo" is found. No navigation will be made.',
  );
  return null;
};
