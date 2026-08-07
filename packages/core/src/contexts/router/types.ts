/**
 * @author aliemir
 *
 * Router bindings interface, used to define the router bindings of refine.
 *
 * We're marking of the functions as optional, some features may not work properly but this is intentional.
 * Users can choose to use the router bindings or not, or use their own router bindings.
 * Leaving the control to the user is the best way to go.
 *
 * We're defining the functions as function generators, this is to allow the user to use hooks inside the functions.
 *
 * `go` function is used to navigate to a specific route. We're expecting a `GoConfig` object as the only parameter.
 * Passing `query` as an object, will also let users to stringify the object as they like or ignore it completely or even use a custom logic to handle query strings.
 *
 * `back` function is used to navigate back to the previous route. It doesn't take any parameters.
 * This one is a basic function for the back buttons, absence of this function can also hide the back button,
 * but this depends on the UI package implementations.
 *
 * `parse` function is used to parse the current route, query parameters and other information.
 * We're expecting this function to lead refine to the correct resource, action and id (again, not required but recommended).
 * Also there's `params` property, which is used in data hooks and other places.
 * This property has an interface to match but not restricted to it.
 *
 * Instead of a single `useNavigation` hook,
 * we can separate those functions into three different hooks,
 * `useGo`, `useBack` and `useParsed`
 */

import type { BaseKey, CrudFilter, CrudSort } from "../data/types";
import type { IResourceItem } from "../resource/types";

export type Action = "create" | "edit" | "list" | "show" | "clone";

export type GoConfig = {
  to?: string;
  query?: Record<string, unknown>;
  hash?: string;
  options?: {
    keepQuery?: boolean;
    keepHash?: boolean;
  };
  type?: "push" | "replace" | "path";
};

export type ParsedParams<
  TParams extends Record<string, any> = Record<string, any>,
> = {
  filters?: CrudFilter[];
  sorters?: CrudSort[];
  currentPage?: number;
  pageSize?: number;
} & TParams;

export type ParseResponse<
  TParams extends Record<string, any> = Record<string, any>,
> = {
  params?: ParsedParams<TParams>;
  resource?: IResourceItem;
  id?: BaseKey;
  action?: Action;
  pathname?: string;
};

export type GoFunction = (config: GoConfig) => void | string;

export type BackFunction = () => void;

export type ParseFunction<
  TParams extends Record<string, any> = Record<string, any>,
> = () => ParseResponse<TParams>;

export type RouterProvider = {
  go?: () => GoFunction;
  back?: () => BackFunction;
  parse?: () => ParseFunction;
  Link?: React.ComponentType<
    React.PropsWithChildren<{ to: string; [prop: string]: any }>
  >;
};
