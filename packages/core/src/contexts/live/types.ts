import type {
  BaseKey,
  CrudFilter,
  CrudSort,
  MetaQuery,
  Pagination,
} from "../data/types";

export type LiveEvent = {
  channel: string;
  type: "deleted" | "updated" | "created" | "*" | string;
  payload: {
    ids?: BaseKey[];
    [x: string]: any;
  };
  date: Date;
  meta?: MetaQuery & {
    dataProviderName?: string;
  };
};

export type LiveModeProps = {
  /**
   * Whether to update data automatically ("auto") or not ("manual") if a related live event is received. The "off" value is used to avoid creating a subscription.
   * @type  [`"auto" | "manual" | "off"`](/docs/api-reference/core/providers/live-provider/#livemode)
   * @default `"off"`
   */
  liveMode?: "auto" | "manual" | "off";
  /**
   * Callback to handle all related live events of this hook.
   * @type [`(event: LiveEvent) => void`](/docs/api-reference/core/interfaceReferences/#livemodeprops)
   * @default `undefined`
   */
  onLiveEvent?: (event: LiveEvent) => void;
  /**
   * Params to pass to liveProvider's subscribe method if liveMode is enabled.
   * @type [`{ ids?: BaseKey[]; [key: string]: any; }`](/docs/api-reference/core/interfaceReferences/#livemodeprops)
   * @default `undefined`
   */
  liveParams?: {
    ids?: BaseKey[];
    [key: string]: any;
  };
};

export type ILiveModeContextProvider = LiveModeProps;

export type LiveListParams = {
  resource?: string;
  pagination?: Pagination;
  hasPagination?: boolean;
  sorters?: CrudSort[];
  filters?: CrudFilter[];
  meta?: MetaQuery;
};

export type LiveOneParams = {
  resource?: string;
  id?: BaseKey;
};

export type LiveManyParams = {
  resource?: string;
  ids?: BaseKey[];
};

export type LiveCommonParams = {
  subscriptionType?: "useList" | "useOne" | "useMany";
  [key: string]: unknown;
};

type LiveSubscribeOptions = {
  channel: string;
  types: Array<LiveEvent["type"]>;
  callback: (event: LiveEvent) => void;
  params?: LiveCommonParams & LiveListParams & LiveOneParams & LiveManyParams;
  meta?: MetaQuery & { dataProviderName?: string };
};

export type LiveProvider = {
  publish?: (event: LiveEvent) => void;
  subscribe: (options: LiveSubscribeOptions) => any;
  unsubscribe: (subscription: any) => void;
};

export type ILiveContext = {
  liveProvider?: LiveProvider;
};
