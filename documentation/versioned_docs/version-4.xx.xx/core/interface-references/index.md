---
title: "Core Interfaces Reference | Refine v4"
display_title: "Interface References"
sidebar_label: "Interface References"
description: "Explore all core TypeScript interfaces in Refine v4. Learn how interfaces define data flow, auth logic, resources, and provider integrations."
---

### CrudFilters

```tsx
type CrudFilters = CrudFilter[];
```

### CrudFilter

```tsx
type CrudFilter = LogicalFilter | ConditionalFilter;
```

### LogicalFilter

```tsx
type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, "or" | "and">;
  value: any;
};
```

### ConditionalFilter

```tsx
type ConditionalFilter = {
  key?: string;
  operator: Extract<CrudOperators, "or" | "and">;
  value: (LogicalFilter | ConditionalFilter)[];
};
```

### CrudOperators

```tsx
type CrudOperators =
  | "eq" // Equal
  | "ne" // Not equal
  | "lt" // Less than
  | "gt" // Greater than
  | "lte" // Less than or equal to
  | "gte" // Greater than or equal to
  | "in" // Included in an array
  | "nin" // Not included in an array
  | "ina" // Column contains every element in an array
  | "nina" // Column doesn't contain every element in an array
  | "contains" // Contains
  | "ncontains" // Doesn't contain
  | "containss" // Contains, case sensitive
  | "ncontainss" // Doesn't contain, case sensitive
  | "between" // Between
  | "nbetween" // Not between
  | "null" // Is null
  | "nnull" // Is not null
  | "startswith" // Starts with
  | "nstartswith" // Doesn't start with
  | "startswiths" // Starts with, case sensitive
  | "nstartswiths" // Doesn't start with, case sensitive
  | "endswith" // Ends with
  | "nendswith" // Doesn't end with
  | "endswiths" // Ends with, case sensitive
  | "nendswiths" // Doesn't end with, case sensitive
  | "or" // Logical OR
  | "and"; // Logical AND
```

### CrudSorting

```tsx
type CrudSorting = CrudSort[];
```

### CrudSort

```tsx
type CrudSort = {
  field: string;
  order:
    | "asc" // Ascending order
    | "desc"; // Descending order
};
```

### Pagination

```tsx
type Pagination = {
  current?: number; // Initial page index
  pageSize?: number; // Initial number of items per page
  mode?: "client" | "server" | "off"; // Whether to use server side pagination or not.
};
```

### BaseKey

```tsx
type BaseKey = string | number;
```

### BaseRecord

```tsx
type BaseRecord = {
  id?: BaseKey;
  [key: string]: any;
};
```

### HttpError

```tsx
type HttpError = {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
  [key: string]: any;
};
```

### ValidationErrors

```tsx
type ValidationErrors = {
  [field: string]:
    | string // Single error message
    | string[] // Multiple error messages
    | boolean // `true` if there is an error
    | { key: string; message: string }; // Error message with a translation key and a default message
};
```

### MutationMode

```tsx
type MutationMode = "pessimistic" | "optimistic" | "undoable";
```

### UseImportInputPropsType

```tsx
type UseImportInputPropsType = {
  type: "file";
  accept: string; // ".cvs"
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
```

### SuccessErrorNotification

```tsx
type SuccessErrorNotification<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
> = {
  successNotification?:
    | OpenNotificationParams
    | false
    | ((
        data?: TData,
        values?: TVariables,
        resource?: string,
      ) => OpenNotificationParams | false);
  errorNotification?:
    | OpenNotificationParams
    | false
    | ((
        error?: TError,
        values?: TVariables,
        resource?: string,
      ) => OpenNotificationParams | false);
};
```

### OpenNotificationParams

```tsx
type OpenNotificationParams = {
  key?: string; // The key of the notification, used to manage the notification state.
  message: string; // The title of the notification.
  type: "success" | "error" | "progress"; // The type of the notification.
  description?: string; // The description of the notification.
  cancelMutation?: () => void; // If the notification is undoable, the function to call when the user clicks on the undo button.
  undoableTimeout?: number; // If the notification is undoable, the timeout in milliseconds after which the notification will be automatically closed.
};
```

### MetaQuery

```tsx
type MetaQuery = {
  queryContext?: Omit<QueryFunctionContext, "meta">;
  [key: string]: any;
} & QueryBuilderOptions &
  GraphQLQueryOptions;
```

### GraphQLQueryOptions

```tsx
import type { DocumentNode } from "graphql";

type GraphQLQueryOptions = {
  gqlQuery?: DocumentNode;
  gqlMutation?: DocumentNode;
  gqlVariables?: {
    [key: string]: any;
  };
};
```

### QueryFunctionContext

Context to be passed to the query function. Refer to [Query Function Context](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext) for more information.

### QueryBuilderOptions

```tsx
type QueryBuilderOptions = {
  operation?: string;
  fields?: Array<string | object | NestedField>;
  variables?: VariableOptions;
};
```

### NestedField

```tsx
type NestedField = {
  operation: string;
  variables: QueryBuilderOptions[];
  fields: Array<string | object | NestedField>;
};
```

### VariableOptions

```tsx
type VariableOptions = {
  type?: string;
  name?: string;
  value: any;
  list?: boolean;
  required?: boolean;
  [key: string]: any;
};
```

### CanParams

```tsx
type CanParams = {
  resource: string; // Resource name
  action: string; // Intended action name
  params?: {
    resource?: IResourceItem; // Resource item if can be determined
    id?: BaseKey; // Id of the record if the check is for a specific record
    [key: string]: unknown;
  };
};
```

### CanResponse

```tsx
type CanResponse = {
  can: boolean;
  reason?: string;
  [key: string]: unknown;
};
```

### DataProvider

```tsx
type DataProvider {
    getList: <TData extends BaseRecord = BaseRecord>(
        params: GetListParams,
    ) => Promise<GetListResponse<TData>>;

    getMany?: <TData extends BaseRecord = BaseRecord>(
        params: GetManyParams,
    ) => Promise<GetManyResponse<TData>>;

    getOne: <TData extends BaseRecord = BaseRecord>(
        params: GetOneParams,
    ) => Promise<GetOneResponse<TData>>;

    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: CreateParams<TVariables>,
    ) => Promise<CreateResponse<TData>>;

    createMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: CreateManyParams<TVariables>,
    ) => Promise<CreateManyResponse<TData>>;

    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: UpdateParams<TVariables>,
    ) => Promise<UpdateResponse<TData>>;

    updateMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: UpdateManyParams<TVariables>,
    ) => Promise<UpdateManyResponse<TData>>;

    deleteOne: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: DeleteOneParams<TVariables>,
    ) => Promise<DeleteOneResponse<TData>>;

    deleteMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        params: DeleteManyParams<TVariables>,
    ) => Promise<DeleteManyResponse<TData>>;

    getApiUrl: () => string;

    custom?: <
        TData extends BaseRecord = BaseRecord,
        TQuery = unknown,
        TPayload = unknown,
    >(
        params: CustomParams<TQuery, TPayload>,
    ) => Promise<CustomResponse<TData>>;
};
```

### LiveEvent

```tsx
type LiveEvent = {
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
```

### LiveModeProps

```tsx
type LiveModeProps = {
  liveMode?: "auto" | "manual" | "off";
  onLiveEvent?: (event: LiveEvent) => void;
  liveParams?: {
    ids?: BaseKey[];
    [key: string]: any;
  };
};
```

### ResourceProps

```tsx
type ResourceProps = {
  name: string;
  identifier?: string;
  meta?: ResourceMeta;
};
```

### ResourceMeta

```tsx
type ResourceMeta = {
  label?: string; // Label of the resource, can be used to pretty print the resource name.
  hide?: boolean; // Whether to hide the resource from the menus or not. Used by the <Sider /> components.
  dataProviderName?: string; // Dedicated data provider name for the resource.
  parent?: string; // To nest a resource under another resource.
  canDelete?: boolean; // To determine if the resource has ability to delete or not.
  audit?: ResourceAuditLogPermissions[]; // To permit the audit log for actions on the resource.
  icon?: ReactNode; // Icon of the resource, used in the menus and breadcrumbs
  [key: string]: any;
};
```

### ResourceAuditLogPermissions

```tsx
type ResourceAuditLogPermissions = "create" | "update" | "delete" | string;
```

### SyncWithLocationParams

```tsx
type SyncWithLocationParams = {
  pagination: { current?: number; pageSize?: number };
  sorters: CrudSorting;
  filters: CrudFilters;
};
```
