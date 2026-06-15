---
"@refinedev/rest": patch
---

fix(rest): type `update.buildHeaders` params with `UpdateParams<any>`

The `update.buildHeaders` option in `createDataProvider` was typed as `BuildHeaders<UpdateParams>`, which resolves `variables` to the default `{}` instead of `any`. This was inconsistent with every other `update` option (`getEndpoint`, `buildQueryParams`, `buildBodyParams`, `mapResponse`, `transformError`) and with the default implementation, all of which use `UpdateParams<any>`. As a result, a custom `update.buildHeaders` callback could not read fields off `params.variables` without a type error. Aligned the type with the rest of the `update` options.
