---
"@refinedev/react-router": patch
"@refinedev/remix-router": patch
"@refinedev/nextjs-router": patch
---

fix(router): do not convert non-finite values in `convertToNumberIfPossible`

`convertToNumberIfPossible` guarded conversions with `` `${num}` === value ``, which is meant to only convert strings that round-trip cleanly through `Number()`. The guard had a hole: `Number("NaN")`, `Number("Infinity")` and `Number("-Infinity")` produce non-finite numbers whose string form (`"NaN"`, `"Infinity"`, `"-Infinity"`) matches the input, so those strings were returned as the JS values `NaN`/`Infinity`/`-Infinity`.

This function feeds the `currentPage` and `pageSize` pagination params parsed from the URL and the result is typed as `number | undefined`. A URL such as `?currentPage=NaN` therefore yielded `currentPage: NaN` instead of leaving it as a string, producing a non-finite "page number" that is neither a valid index nor `undefined` (and serializes to `null`). Added a `Number.isFinite(num)` check so only finite numeric strings are converted; all other inputs (including `"007"`, `"1e3"`, `"NaN"`, `"Infinity"`) are left untouched.
