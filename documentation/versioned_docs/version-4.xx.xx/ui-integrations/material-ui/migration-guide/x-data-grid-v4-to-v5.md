---
title: "MUI X Data Grid v4 to v5 Migration | Refine v4"
display_title: "Migration Guide for MUI X Data Grid from v4 to v5"
description: "Documentation on migrating MUI X Data Grid in your Refine v4 app. Learn how to handle breaking changes in table management and data display."
sidebar_label: X Data Grid v4 to v5
---

Material UI released a new major version for `@mui/x-data-grid` package as v6. This document will guide you through the migration process for the Refine related parts. While this document won't cover all the changes, it will help you get started with the migration process.

:::simple Official Migration Guide

Check out the official [MUI X Migration Guide for `DataGrid`](https://mui.com/x/migration/migration-data-grid-v5/) for detailed information and all the changes.

You can also check out the [Introducing MUI X v6.0.0](https://mui.com/blog/mui-x-v6) blog post for more information about the new version.

:::

The changes in the `DataGrid` API are included in the `@refinedev/mui`'s latest version (`v5`). With this release, we've updated the peer dependency of `@mui/x-data-grid` to `^6.6.0`.

## Required Changes

The changes listed below are required to use `@mui/x-data-grid` with Refine. It doesn't cover all the changes in the `DataGrid` API. To see all the changes, please follow the [official migration guide for MUI X](https://mui.com/x/migration/migration-data-grid-v5/).

### Updating the packages

To use `@mui/x-data-grid` with version 6, [`@refinedev/mui`](https://github.com/refinedev/refine/tree/master/packages/mui) must be updated to `5.x.x` as well.

Since there are some changes in the return values of the `useDataGrid` and the common usage of the `DataGrid` component with TypeScript, we've also released a major release to [`@refinedev/inferencer`](https://github.com/refinedev/refine/tree/master/packages/inferencer) package. If you're using the Inferencer package, you'll need to update it to `4.x.x` as well.

### useDataGrid

We've updated the `useDataGrid` hook to return `paginationModel` and `onPaginationModelChange` instead of `page`, `pageSize`, `onPageChange` and `onPageSizeChange`. If you've modified these props, you'll need to update them to use the new API.

```diff title="posts/list.tsx"
const PostList = () => {
const { dataGridProps } = useDataGrid();
-   const { page, pageSize, onPageChange, onPageSizeChange, ...restDataGridProps } = dataGridProps;
+   const { paginationModel, onPaginationModelChange, ...restDataGridProps } = dataGridProps;

    /* ... */
    /* Your changes to use the new values */
    /* ... */

    return (
        <DataGrid
            {...restDataGridProps}
-          page={page}
-          pageSize={pageSize}
-          onPageChange={onPageChange}
-          onPageSizeChange={onPageSizeChange}
+          paginationModel={paginationModel}
+          onPaginationModelChange={onPaginationModelChange}
        />
    );
}
```

### `GridColumns` to `GridColDef[]`

While updating our Material UI examples, we've encountered this issue and thought it deserves a mention here. When defining the `columns` for the `<DataGrid>`, we've used `GridColumns` type, with the changes in `@mui/x-data-grid`'s last version, this type is removed and should be replaced with `GridColDef` array.

```diff title="posts/list.tsx"
import React from "react";
import { List, useDataGrid } from "@refinedev/mui";

- import { DataGrid, GridColumns } from "@mui/x-data-grid";
+ import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

-   const columns = React.useMemo<GridColumns<IPost>>(
+   const columns = React.useMemo<GridColDef<IPost>[]>(
        () => [/* ... */],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns}  />
        </List>
    );
};
```
