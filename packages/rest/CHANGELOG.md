# @refinedev/rest

## 2.1.2

### Patch Changes

- [#7398](https://github.com/refinedev/refine/pull/7398) [`fb3ae57a0c303aabdbc0e76f247d56e74afb4764`](https://github.com/refinedev/refine/commit/fb3ae57a0c303aabdbc0e76f247d56e74afb4764) Thanks [@armorbreak001](https://github.com/armorbreak001)! - feat: expose stringifyOptions in createDataProvider (fixes #7360)

## 2.1.1

### Patch Changes

- [#7204](https://github.com/refinedev/refine/pull/7204) [`794ea5c815738f9b701e668538a07224f3263cd0`](https://github.com/refinedev/refine/commit/794ea5c815738f9b701e668538a07224f3263cd0) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix(rest): add missing transformError to deleteOne and custom methods.

## 2.1.0

### Minor Changes

- [#7196](https://github.com/refinedev/refine/pull/7196) [`9217c8596b368bca668dbea9493c0076c57f1d31`](https://github.com/refinedev/refine/commit/9217c8596b368bca668dbea9493c0076c57f1d31) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - fix(rest): make `getMany` method optional in data provider

  The `getMany` method is no longer provided by default. Previously, a default implementation was included, but it has been removed to make the method truly optional. Users who need the `getMany` functionality must now explicitly define it in their data provider configuration.

## 2.0.3

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 2.0.2

### Patch Changes

- [#7049](https://github.com/refinedev/refine/pull/7049) [`f36f0a6cca47013365d32c261416e8558d41b265`](https://github.com/refinedev/refine/commit/f36f0a6cca47013365d32c261416e8558d41b265) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `getMany` method now returns the complete response body

  Previously, `getMany` method was returning `body.records` which assumed a specific response structure. Now it returns the complete response body directly, providing more flexibility for different API response formats.

## 2.0.1

### Patch Changes

- [#7047](https://github.com/refinedev/refine/pull/7047) [`f1085a350344fb5264099fc46123a8b05944154b`](https://github.com/refinedev/refine/commit/f1085a350344fb5264099fc46123a8b05944154b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `getMany` `mapResponse` return value is wrong.

  Now `getMany` properly handles both array and object response formats by checking if the response is an array and returning the appropriate data structure.
