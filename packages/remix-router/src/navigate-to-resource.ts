import { useResourceParams, useGetToPath } from "@refinedev/core";
import React, { type PropsWithChildren } from "react";
import { useNavigate } from "@remix-run/react";

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
  const ran = React.useRef(false);
  const navigate = useNavigate();
  const getToPath = useGetToPath();
  const { resource, resources } = useResourceParams({ resource: resourceProp });

  const toResource = resource || resources.find((r) => r.list);

  React.useEffect(() => {
    if (toResource) {
      if (!ran.current) {
        const path = getToPath({
          resource: toResource,
          action: "list",
          meta,
        });

        if (path) {
          navigate(path, { replace: true });
        }
        ran.current = true;
      }
    } else if (fallbackTo) {
      console.warn(`No resource is found. navigation to ${fallbackTo}.`);
      navigate(fallbackTo, { replace: true });
      ran.current = true;
    }
  }, [toResource, meta, navigate, getToPath]);

  return null;
};
