import React, { useEffect } from "react";
import type { UseQueryOptions } from "@tanstack/react-query";

import { useCan, useResourceParams } from "@hooks";

import type { CanReturnType } from "../../contexts/accessControl/types";
import type { BaseKey } from "../../contexts/data/types";
import type { IResourceItem } from "../../contexts/resource/types";

type ITreeResource = IResourceItem & {
  key?: string;
  children: ITreeResource[];
};

type CanParams = {
  resource?: IResourceItem & { children?: ITreeResource[] };
  id?: BaseKey;
  [key: string]: any;
};

type OnUnauthorizedProps = {
  resource?: string;
  reason?: string;
  action: string;
  params: CanParams;
};

type CanAccessBaseProps = {
  /**
   * Resource name for API data interactions
   */
  resource?: string;
  /**
   * Intended action on resource
   */
  action: string;
  /**
   * Parameters associated with the resource
   * @type { resource?: [IResourceItem](https://refine.dev/docs/api-reference/core/interfaceReferences/#canparams), id?: [BaseKey](https://refine.dev/docs/api-reference/core/interfaceReferences/#basekey), [key: string]: any }
   */
  params?: CanParams;
  /**
   * Content to show if access control returns `false`
   */
  fallback?: React.ReactNode;
  /**
   * Callback function to be called if access control returns `can: false`
   */
  onUnauthorized?: (props: OnUnauthorizedProps) => void;
  children: React.ReactNode;
  queryOptions?: Omit<
    UseQueryOptions<CanReturnType>,
    "queryKey" | "queryFn"
  > & {
    queryKey?: UseQueryOptions<CanReturnType>["queryKey"];
    queryFn?: UseQueryOptions<CanReturnType>["queryFn"];
  };
};

type CanAccessWithoutParamsProps = {
  [key in Exclude<
    keyof CanAccessBaseProps,
    "fallback" | "children"
  >]?: undefined;
} & {
  [key in "fallback" | "children"]?: CanAccessBaseProps[key];
};

export type CanAccessProps = CanAccessBaseProps | CanAccessWithoutParamsProps;

export const CanAccess: React.FC<CanAccessProps> = ({
  resource: resourceFromProp,
  action: actionFromProp,
  params: paramsFromProp,
  fallback,
  onUnauthorized,
  children,
  queryOptions: componentQueryOptions,
  ...rest
}) => {
  const {
    id,
    resource,
    action: fallbackAction = "",
  } = useResourceParams({
    resource: resourceFromProp,
    id: paramsFromProp?.id,
  });

  const action = actionFromProp ?? fallbackAction;

  const params = paramsFromProp ?? {
    id,
    resource,
  };

  const { data } = useCan({
    resource: resource?.name,
    action,
    params,
    queryOptions: componentQueryOptions,
  });

  useEffect(() => {
    if (onUnauthorized && data?.can === false) {
      onUnauthorized({
        resource: resource?.name,
        action,
        reason: data?.reason,
        params,
      });
    }
  }, [data?.can]);

  if (data?.can) {
    if (React.isValidElement(children)) {
      const Children = React.cloneElement(children, rest);
      return Children;
    }

    return <>{children}</>;
  }

  if (data?.can === false) {
    return <>{fallback ?? null}</>;
  }

  return null;
};
