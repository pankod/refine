import type { BaseKey } from "../data/types";

export type ILog<TData = any> = {
  id: BaseKey;
  createdAt: string;
  author?: Record<number | string, any>;
  name?: string;
  data: TData;
  previousData: TData;
  resource: string;
  action: string;
  meta?: Record<number | string, any>;
};

export type ILogData<TData = any> = ILog<TData>[];

export type LogParams = {
  resource: string;
  action: string;
  data?: any;
  author?: {
    name?: string;
    [key: string]: any;
  };
  previousData?: any;
  meta: Record<number | string, any>;
};

export type IAuditLogContext = {
  create?: (params: LogParams) => Promise<any>;
  get?: (params: {
    resource: string;
    action?: string;
    meta?: Record<number | string, any>;
    author?: Record<number | string, any>;
  }) => Promise<any>;
  update?: (params: {
    id: BaseKey;
    name: string;
    [key: string]: any;
  }) => Promise<any>;
};

export type AuditLogProvider = Required<IAuditLogContext>;
