---
id: adding-sort-and-filters
title: 5. Adding Sort and Filters
tutorial:
  order: 0
  prev: 3.xx.xx/tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
  next: false
---

In the previous [Adding List Page](/core/docs/3.xx.xx/tutorial/adding-crud-pages/antd/index) section, we have displayed blog posts data in a table. Now we will learn how to add sorting and filtering to the table to user can have more control over the data.

## Adding Sorting

We will use `<Table.Column/>`'s `sorter` prop to add sorting to the table.

1. Open `src/pages/blog-posts/list.tsx` file.

2. Add `sorter` prop to the `<Table.Column/>` component of the `id` column.

   ```tsx
   <Table.Column
     dataIndex="id"
     title="Id"
     //highlight-next-line
     sorter
   />
   ```

   Now, you can sort the data by `id` on the table.

3. If you want to add multiple sorting capabilities to the table, you can add `sorter` prop by priority. For example, if you want to sort the data by `id` and `name` on the table, you can add `sorter` prop as below:

   ```tsx
   <Table.Column
       dataIndex="id"
       title="Id"
       //highlight-next-line
       sorter
   />
   <Table.Column
       dataIndex="id"
       title="Name"
       //highlight-next-line
       sorter={{ multiple: 1 }}
   />
   ```

   Now, the data will be sorted by `id` first and then by `name`.

## Adding Filters

We will use `<Table.Column/>`'s `filterDropdown` prop and `<FilterDropdown/>` component to add filters to the table.

`<FilterDropdown/>` component is a wrapper component. It serves as a bridge between its child input and **refine**'s `useTable` hook. It provides the necessary props to the child input and handles the logic of filtering the data. It also provides a filter and clear button to make the filtering process easier.

[Refer to the `<FilterDropdown/>` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/antd/components/filter-dropdown/)

Also, to get more information about the `filterDropdown` prop, you can refer to the [**Ant Design**'s `<Table/>` documentation](https://ant.design/components/table#components-table-demo-custom-filter-panel).

In this tutorial, we will add filters capabilities to the `category` column. To do this, we will use `<Select/>` component from **Ant Design** as the child input of `<FilterDropdown/>` component. So, we will also use `useSelect` hook to get the necessary props like `options` for `<Select/>` component.

[Refer to the **Ant Desing** `<Select/>` documentation for more information &#8594](https://ant.design/components/select)

[Refer to the `useSelect` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useSelect/)

1. Open `src/pages/blog-posts/list.tsx` file and import the following components and hooks like below.

   ```tsx
   import { FilterDropdown, Select, useSelect } from "@pankod/refine-antd";
   ```

2. Call `useSelect` hook with `categories` resource to fill the `<Select/>` component with category options.

   ```tsx
   const { selectProps: categorySelectProps } = useSelect({
     resource: "categories",
   });
   ```

3. Then, follow the steps below:

   1. Add `filterDropdown` prop to the `<Table.Column/>` component of the `category` column.
   2. Add the `<FilterDropdown/>` component as the return value of the prop. Then, pass the `props` to the `<FilterDropdown/>` component.
   3. Add the `<Select/>` component as the child of `<FilterDropdown/>` component. Then, pass the `categorySelectProps` to the `<Select/>` component.
      <br />
      <br />

   ```tsx
   <Table.Column
     dataIndex={["category", "id"]}
     title="category"
     render={(value) => {
       if (isLoading) {
         return <TextField value="Loading..." />;
       }

       return (
         <TextField
           value={categoriesData?.data.find((item) => item.id === value)?.title}
         />
       );
     }}
     //highlight-start
     filterDropdown={(props) => (
       <FilterDropdown {...props}>
         <Select
           style={{ minWidth: 200 }}
           mode="multiple"
           placeholder="Select Category"
           {...categorySelectProps}
         />
       </FilterDropdown>
     )}
     //highlight-end
   />
   ```

Now, you can search and filter the data by category on the table.

<br/>
<br/>

<Checklist>

<ChecklistItem id="add-search-and-filters-antd">
I added search and filters to the table.
</ChecklistItem>

</Checklist>
