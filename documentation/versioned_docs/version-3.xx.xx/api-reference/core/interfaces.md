---
id: interfaceReferences
title: Interface References
---

## CrudFilters

[`CrudFilter[]`](#crudfilter)

### CrudFilter

| Key      | Type                              |
| -------- | --------------------------------- |
| field    | `string`                          |
| operator | [`CrudOperators`](#crudoperators) |
| value    | `any`                             |

#### CrudOperators

```ts
"eq" |
  "ne" |
  "lt" |
  "gt" |
  "lte" |
  "gte" |
  "in" |
  "nin" |
  "contains" |
  "ncontains" |
  "containss" |
  "ncontainss" |
  "between" |
  "nbetween" |
  "null" |
  "nnull" |
  "startswith" |
  "nstartswith" |
  "startswiths" |
  "nstartswiths" |
  "endswith" |
  "nendswith" |
  "endswiths" |
  "nendswiths";
```

| Type             | Description                        |
| ---------------- | ---------------------------------- |
| `"eq"`           | Equal                              |
| `"ne"`           | Not equal                          |
| `"lt"`           | Less than                          |
| `"gt"`           | Greater than                       |
| `"lte"`          | Less than or equal to              |
| `"gte"`          | Greater than or equal to           |
| `"in"`           | Included in an array               |
| `"nin"`          | Not included in an array           |
| `"contains"`     | Contains                           |
| `"ncontains"`    | Doesn't contain                    |
| `"containss"`    | Contains, case sensitive           |
| `"ncontainss"`   | Doesn't contain, case sensitive    |
| `"between"`      | Between                            |
| `"nbetween"`     | Doesn't between                    |
| `"null"`         | Is null                            |
| `"nnull"`        | Is not null                        |
| `"startswith"`   | Starts with                        |
| `"nstartswith"`  | Doesn't start with                 |
| `"startswiths"`  | Starts with, case sensitive        |
| `"nstartswiths"` | Doesn't start with, case sensitive |
| `"endswith"`     | Ends with                          |
| `"nendswith"`    | Doesn't end with                   |
| `"endswiths"`    | Ends with, case sensitive          |
| `"nendswiths"`   | Doesn't end with, case sensitive   |

## CrudSorting

[`CrudSort[]`](#crudsort)

### CrudSort

| Key   | Type                 |
| ----- | -------------------- |
| field | `string`             |
| order | `"asc"` \| ` "desc"` |

| `order` type | Description      |
| ------------ | ---------------- |
| `"asc"`      | Ascending order  |
| `"desc"`     | Descending order |

## SortOrder

```ts
"desc" | "asc" | "null";
```

## Pagination

| Key      | Type     |
| -------- | -------- |
| current  | `number` |
| pageSize | `number` |

## BaseKey

| Type                 |
| -------------------- |
| `string` \| `number` |

## BaseRecord

| Key             | Type                  |
| --------------- | --------------------- |
| id?             | [`BaseKey`](#basekey) |
| `[key: string]` | `any`                 |

## HttpError

| Key        | Type     |
| ---------- | -------- |
| message    | `string` |
| statusCode | `number` |

## Delete Button Props

ButtonProps

| Key           | Type                                                     |
| ------------- | -------------------------------------------------------- |
| resourceName? | `string`                                                 |
| recordItemId? | [`BaseKey`](#basekey)                                    |
| onSuccess?    | `<TData = BaseRecord>(value: { data: TData; }) => void;` |
| mutationMode? | [`MutationMode`](#mutationmode)                          |
| hideText?     | `boolean`                                                |

## MutationMode

```ts
"pessimistic" | "optimistic" | "undoable";
```

## UploadedFile

| Key     | Type                                                                 |
| ------- | -------------------------------------------------------------------- |
| uid     | `string`                                                             |
| name    | `string`                                                             |
| url     | `string`                                                             |
| type    | `string`                                                             |
| size    | `number`                                                             |
| percent | `number`                                                             |
| status  | `"error"` \| `"success"` \| `"done" `\| `"uploading"` \| `"removed"` |

## UseImportInputPropsType

| Key      | Type                                                   |
| -------- | ------------------------------------------------------ |
| type     | `"file"`                                               |
| accept   | `".cvs"`                                               |
| onChange | `(event: React.ChangeEvent<HTMLInputElement>) => void` |

## SuccessErrorNotification

| Key                 | Type                                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| successNotification | `(data?: TData, values?: TVariables, resource?: string) => NotificationProperties` \| [Notification Properties](https://ant.design/components/notification/#API) \| `false`   |
| errorNotification   | `(error?: TError, values?: TVariables, resource?: string) => NotificationProperties` \| [Notification Properties](https://ant.design/components/notification/#API) \| `false` |

## MetaDataQuery

| Key           | Type                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| [k: string]   | `any`                                                                                                                |
| operation?    | `string`                                                                                                             |
| fields?       | `Array<string` \| `object` \| [NestedField](#nestedfield)>                                                           |
| variables?    | [VariableOptions](#variableoptions)                                                                                  |
| queryContext? | [Omit<QueryFunctionContext, "meta">](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext) |

### NestedField

| Key       | Type                                                       |
| --------- | ---------------------------------------------------------- |
| operation | `string`                                                   |
| variables | [VariableOptions[]](#querybuilderoptions)                  |
| fields    | `Array<string` \| `object` \| [NestedField](#nestedfield)> |

### QueryBuilderOptions

| Key       | Type                                         |
| --------- | -------------------------------------------- |
| operation | `string`                                     |
| variables | [VariableOptions](#variableoptions)          |
| fields    | `Array<string` \| `object` \| `NestedField>` |

### VariableOptions

| Key         | Type     |
| ----------- | -------- |
| type?       | `string` |
| name?       | `string` |
| value?      | `any`    |
| list?       | `bool`   |
| required?   | `bool`   |
| [k: string] | `any`    |

## PromptProps

| Key          | Type                          |
| ------------ | ----------------------------- |
| message      | `string`                      |
| when?        | `boolean`                     |
| setWarnWhen? | `(warnWhen: boolean) => void` |

## CanParams

| Key      | Type                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------ |
| resource | `string`                                                                                               |
| action   | `string`                                                                                               |
| params?  | { `resource`?: [IResourceItem](#resourceitemprops), `id`?: [BaseKey](#basekey), `[key: string]: any` } |

## CanReturnType

| Key     | Type      |
| ------- | --------- |
| can     | `boolean` |
| reason? | `string`  |

## LiveEvent

| Key     | Type                                                           |
| ------- | -------------------------------------------------------------- |
| channel | `string`                                                       |
| type    | `"deleted"` \| `"updated"` \| `"created"` \| "`*`" \| `string` |
| payload | `{ids?: BaseKey[]; [x: string]: any; }`                        |
| date    | `Date`                                                         |

## LiveModeProps

| Key          | Type                                    |
| ------------ | --------------------------------------- |
| liveMode?    | `"auto"` \| `"manual"` \| `"off"`       |
| liveParams?  | `{ids?: BaseKey[]; [x: string]: any; }` |
| onLiveEvent? | `(event: LiveEvent) => void`            |

## OptionsProps

| Key               | Type     |
| ----------------- | -------- |
| label?            | `string` |
| route?            | `string` |
| dataProviderName? | `string` |
| [key: string]     | `any`    |

## ResourceItemProps

| Key         | Type        |
| ----------- | ----------- |
| name        | `string`    |
| label ?     | `string`    |
| route?      | `string`    |
| icon?       | `ReactNode` |
| canCreate?  | `boolean`   |
| canEdit?    | `boolean`   |
| canShow?    | `boolean`   |
| canDelete?  | `boolean`   |
| options?    | `object`    |
| parentName? | `string`    |

## SyncWithLocationParams

| Key         | Type                                      |
| ----------- | ----------------------------------------- |
| pagination? | `{ current?: number; pageSize?: number }` |
| sorter?     | [`CrudSorting`](#crudsorting)             |
| filters?    | [`CrudSCrudFiltersorting`](#crudfilters)  |

## Open Notification Params

| Key              | Type                                     |
| ---------------- | ---------------------------------------- |
| key?             | `string`                                 |
| type             | `"success"` \| `"error"` \| `"progress"` |
| message          | `string`                                 |
| description?     | `string`                                 |
| cancelMutation?  | `() => void`                             |
| undoableTimeout? | `number`                                 |

## Close Notification Params

| Key | Type     |
| --- | -------- |
| key | `string` |
