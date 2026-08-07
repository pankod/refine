import type { UseQueryOptions } from "@tanstack/react-query";

import type { BaseKey } from "../data/types";
import type { IResourceItem } from "../resource/types";
import type { MakeOptional } from "../../definitions/types/index";

type ITreeResource = IResourceItem & {
  key?: string;
  children: ITreeResource[];
};

export type CanResponse = {
  can: boolean;
  reason?: string;
  [key: string]: unknown;
};

export type CanParams = {
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
   * @type {
   *   resource?: [IResourceItem](https://refine.dev/docs/api-reference/core/interfaceReferences/#canparams),
   *   id?: [BaseKey](https://refine.dev/docs/api-reference/core/interfaceReferences/#basekey), [key: string]: any
   * }
   */
  params?: {
    resource?: IResourceItem & { children?: ITreeResource[] };
    id?: BaseKey;
    [key: string]: any;
  };
};

export type CanReturnType = {
  can: boolean;
  reason?: string;
};

export type CanFunction = ({
  resource,
  action,
  params,
}: CanParams) => Promise<CanReturnType>;

type AccessControlOptions = {
  buttons?: {
    enableAccessControl?: boolean;
    hideIfUnauthorized?: boolean;
  };
  queryOptions?: MakeOptional<
    UseQueryOptions<CanReturnType>,
    "queryFn" | "queryKey"
  >;
};

export interface IAccessControlContext {
  can?: CanFunction;
  options?: AccessControlOptions;
}

export type IAccessControlContextReturnType = {
  can?: CanFunction;
  options: {
    buttons: {
      enableAccessControl: boolean;
      hideIfUnauthorized: boolean;
    };
    queryOptions?: MakeOptional<
      UseQueryOptions<CanReturnType>,
      "queryFn" | "queryKey"
    >;
  };
};

export type AccessControlProvider = {
  can: CanFunction;
  options?: AccessControlOptions;
};
