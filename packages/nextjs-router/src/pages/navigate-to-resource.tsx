import { useResourceParams, useGetToPath } from "@refinedev/core";
import React from "react";
import { useRouter } from "next/router";

type NavigateToResourceProps = {
  resource?: string;
  meta?: Record<string, unknown>;
};

export const NavigateToResource = ({
  resource: resourceProp,
  meta,
}: NavigateToResourceProps) => {
  const ran = React.useRef(false);
  const { replace } = useRouter();
  const getToPath = useGetToPath();
  const { resource, resources } = useResourceParams({ resource: resourceProp });

  const toResource = React.useMemo(
    () => resource || resources.find((r) => r.list),
    [resource, resources],
  );

  React.useEffect(() => {
    if (toResource) {
      if (!ran.current) {
        const path = getToPath({
          resource: toResource,
          action: "list",
          meta,
        });

        if (path) {
          replace(path);
        }
        ran.current = true;
      }
    }
  }, [toResource, replace, meta, getToPath]);

  return null;
};
