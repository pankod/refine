---
id: adding-sort-and-filters
title: 6. Adding Sort and Filters
tutorial:
  order: 0
  prev: 3.xx.xx/tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
  next: false
---

In the previous [Adding List Page](/core/docs/3.xx.xx/tutorial/adding-crud-pages/headless/index) section, we have displayed blog posts data in a table. Now we will learn how to add sorting and filtering to the table to user can have more control over the data.

## Sort and Filters

The `@pankod/refine-react-table` package based on the [**Tanstack Table**](https://tanstack.com/table/v8) package. So, we can add sorting and filtering features to our table as suggested in the **Tanstack Table** documentation.

[Refer to the **@pankod/refine-react-table** `useTable` documentation for more information &#8594](/core/docs/3.xx.xx/packages/documentation/react-table/)

**Tanstack Table** keeps the `sorting` and `filters` states in the `useTable` hook. When we change the these states, the `useTable` hook will automatically fetch the data and update the table with the new data.

:::info
Under the hood, `sorting` and `filters` states of **Tanstack Table** are converted to the `CrudSorting` and `CrudFilter` types of **refine**. So, when you change the **Tanstack Table**'s `sorting` or `filters` state, `useTable` hook will pass the converted params to the `getList` method of the `dataProvider`.
:::

Since `@pankod/refine-react-table` provides a headless solution, there are many ways to handle filtering and sorting. In this tutorial, we will show basic examples of how to add sorting and filtering to the table.

## Adding Sorting

Let's add sorting to the table. We will add a clickable column header to the table. When the user clicks on the column header, the table will be sorted by the column.

1. Open the `src/pages/blog-posts/list.tsx` file on your editor.

2. Replace the `<thead/>` element with the following code:

   ```tsx title="src/pages/blog-posts/list.tsx"
   <thead>
     {getHeaderGroups().map((headerGroup) => (
       <tr key={headerGroup.id}>
         {headerGroup.headers.map((header) => (
           <th key={header.id}>
             //highlight-next-line
             <div onClick={header.column.getToggleSortingHandler()}>
               {!header.isPlaceholder &&
                 flexRender(
                   header.column.columnDef.header,
                   header.getContext(),
                 )}
               //highlight-start
               {{
                 asc: " 🔼",
                 desc: " 🔽",
               }[header.column.getIsSorted() as string] ?? null}
               //highlight-end
             </div>
           </th>
         ))}
       </tr>
     ))}
   </thead>
   ```

   In the above code, we have added a `onClick` event to the column header. When the user clicks on the column header, the `getToggleSortingHandler` method of the column will be called. This method will toggle the sorting state of the column.

   We have also added a arrow icon to the column header. The arrow icon will be displayed based on the sorting state of the column. If the column is not sorted, no icon will be displayed. If the column is sorted in ascending order, the `🔼` icon will be displayed. If the column is sorted in descending order, the `🔽` icon will be displayed.

<details>
  <summary><strong>How can I disable sorting for a specific column?</strong></summary>

You can disable sorting for a specific column by setting the `enableSorting` property of the column to `false` in the column definition like below.

```tsx
{
    title: "Category",
    dataIndex: "category",
    //highlight-next-line
    enableSorting: false,
},
```

</details>

## Adding Filters

Let's add filters to the table. We will add a basic text input to the table header. When the user types in the input, the table will be filtered by the input value of the column.

1. Open the `src/pages/blog-posts/list.tsx` file on your editor.

2. Change the filter operator for columns to "contains" by changing the `meta` property of the column definition like below:

   ```tsx
   {
       id: "title",
       accessorKey: "title",
       header: "Title",
       //highlight-start
       meta: {
           filterOperator: "contains",
       },
       //highlight-end
   },
   {
       id: "content",
       accessorKey: "content",
       header: "Content",
       //highlight-start
       meta: {
           filterOperator: "contains",
       },
       //highlight-end
   },
   ```

   By default, the `filterOperator` is set to "eq". So, we have changed the `filterOperator` to "contains" for specific columns.

3. Disable filtering for the "Action" column by setting the `enableFiltering` property of the column to `false` in the column definition like below:

   ```tsx
   {
       id: "actions",
       accessorKey: "id",
       header: "Actions",
       //highlight-next-line
       enableColumnFilter: false,
       cell: function render({ getValue }) {
           return (
               <div
                   style={{
                       display: "flex",
                       flexDirection: "row",
                       flexWrap: "wrap",
                       gap: "4px",
                   }}
               >
                   <button
                       onClick={() => {
                           show("blog_posts", getValue() as string);
                       }}
                   >
                       Show
                   </button>
                   <button
                       onClick={() => {
                           edit("blog_posts", getValue() as string);
                       }}
                   >
                       Edit
                   </button>
               </div>
           );
       },
   },
   ```

4. Replace the `<thead/>` element with the following code:

   ```tsx
   <thead>
     {getHeaderGroups().map((headerGroup) => (
       <tr key={headerGroup.id}>
         {headerGroup.headers.map((header) => (
           <th key={header.id}>
             <div onClick={header.column.getToggleSortingHandler()}>
               {!header.isPlaceholder &&
                 flexRender(
                   header.column.columnDef.header,
                   header.getContext(),
                 )}
               {{
                 asc: " 🔼",
                 desc: " 🔽",
               }[header.column.getIsSorted() as string] ?? null}
             </div>
             //highlight-start
             <div>
               {header.column.getCanFilter() && (
                 <input
                   value={header.column.getFilterValue() as string}
                   onChange={(e) => {
                     header.column.setFilterValue(e.target.value);
                   }}
                   placeholder={`Search ${header.column.columnDef.header}`}
                 />
               )}
             </div>
             //highlight-end
           </th>
         ))}
       </tr>
     ))}
   </thead>
   ```

   In the above code, we have added a basic text input to the column header. When the user types in the input, the `setFilterValue` method of the column will be called. This method will set the filter value of the column.

   Previous step, we have also added a `enableColumnFilter` property to the column definition. This property will be used to determine whether the column should have a filter input or not by calling the `getCanFilter` method of the column.

<details>
  <summary><strong>How can I change the filter operator?</strong></summary>

By default, filter operator is "eq" for columns. You can change the filter operator by passing the `filterOperator` property to the `meta` in column definition. For example, you can change the filter operator to "eq" like below:

```tsx
{
    title: "Category",
    dataIndex: "category",
    //highlight-start
    meta: {
        filterOperator: "eq",
    },
    //highlight-end
},
```

</details>

<details>
  <summary><strong>How can I disable filtering for a specific column?</strong></summary>

You can disable filtering for a specific column by setting the `enableColumnFilter` property of the column to `false` in the column definition like below.

```tsx
{
    title: "Category",
    dataIndex: "category",
    //highlight-next-line
    enableColumnFilter: false,
},
```

</details>

<br />
<br />

<Checklist>

<ChecklistItem id="add-search-and-filters-headless">
I added search and filters to the table.
</ChecklistItem>

</Checklist>
