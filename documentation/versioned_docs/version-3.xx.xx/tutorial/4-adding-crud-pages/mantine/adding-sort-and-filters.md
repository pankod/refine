---
id: adding-sort-and-filters
title: 6. Adding Sort and Filters
tutorial:
  order: 0
  prev: 3.xx.xx/tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
  next: false
---

In the previous [Adding List Page](/core/docs/3.xx.xx/tutorial/adding-crud-pages/mantine/index) section, we have displayed blog posts data in a table. Now we will learn how to add sorting and filtering to the table to user can have more control over the data.

## Sort and Filters

The `@pankod/refine-react-table` package based on the [**Tanstack Table**](https://tanstack.com/table/v8) package. So, we can add sorting and filtering features to our table as suggested in the **Tanstack Table** documentation.

[Refer to the **@pankod/refine-react-table** `useTable` documentation for more information &#8594](/core/docs/3.xx.xx/packages/documentation/react-table/)

**Tanstack Table** keeps the `sorting` and `filters` states in the `useTable` hook. When we change the these states, the `useTable` hook will automatically fetch the data and update the table with the new data.

:::info
Under the hood, `sorting` and `filters` states of **Tanstack Table** are converted to the `CrudSorting` and `CrudFilter` types of **refine**. So, when you change the **Tanstack Table**'s `sorting` or `filters` state, `useTable` hook will pass the converted params to the `getList` method of the `dataProvider`.
:::

Since `@pankod/refine-react-table` provides a headless solution, there are many ways to handle filtering and sorting. In this tutorial, we will show basic examples of how to add sorting and filtering to the table.

## Adding Sorting

Let's create a `<ColumnSorter/>` component to use in our table header. This component will be responsible for changing the sorting state of the table.

```tsx title="src/components/table/ColumnSorter.tsx"
import { ActionIcon } from "@pankod/refine-mantine";
import { IconChevronDown, IconSelector, IconChevronUp } from "@tabler/icons";
import type { Column } from "@pankod/refine-react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
  column,
}) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <ActionIcon size="xs" onClick={column.getToggleSortingHandler()}>
      {!sorted && <IconSelector size={18} />}
      {sorted === "asc" && <IconChevronDown size={18} />}
      {sorted === "desc" && <IconChevronUp size={18} />}
    </ActionIcon>
  );
};
```

`<ColumnSorter/>` is a simple component that renders a button. When the user clicks on the button, the `column.getToggleSortingHandler()` method will be called. This method will change the sorting state of the table.

In addition, we are using the `column.getCanSort()` method to check if the column is sortable. If the column is not sortable, we will not render the `<ColumnSorter/>` component.

Lastly, If the column is sorted, we will render the `IconChevronDown` icon. Otherwise, we will render the `IconSelector` icon.

:::tip
In this example, we are using the `@tabler/icons` package for icons. You can use any icon library you want.
:::

<br />

Now, we can use `<ColumnSorter/>` in our table header.

1. Import the `<ColumnSorter/>` component.

   ```tsx title="src/pages/blog-posts/list.tsx"
   import { ColumnSorter } from "../../components/table/ColumnSorter";
   ```

2. Add the `<ColumnSorter/>` component to the `<th/>` as a child like below.

   ```tsx title="src/pages/blog-posts/list.tsx"
   <thead>
     {getHeaderGroups().map((headerGroup) => (
       <tr key={headerGroup.id}>
         {headerGroup.headers.map((header) => (
           <th key={header.id}>
             {!header.isPlaceholder &&
               flexRender(header.column.columnDef.header, header.getContext())}
             //highlight-next-line
             <ColumnSorter column={header.column} />
           </th>
         ))}
       </tr>
     ))}
   </thead>
   ```

3. Disable sorting for the `actions` column by setting the `enableSorting` property of the column to `false` in the column definition like below:

   ```tsx title="src/pages/blog-posts/list.tsx"
   {
       id: "actions",
       accessorKey: "id",
       header: "Actions",
       //highlight-next-line
       enableSorting: false,
   },
   ```

Now, we can sort the table by clicking on the sort button in the table header.

<details>
  <summary><strong>How can I disable sorting for a specific column?</strong></summary>

You can disable sorting for a specific column by setting the `enableSorting` property of the column to `false` in the column definition like below.

```tsx
{
    id: "name",
    accessorKey: "name",
    header: "Name",
    //highlight-next-line
    enableSorting: false,
},
```

</details>

## Adding Filters

Let's create a `<ColumnFilter/>` component to use in our table header. This component will be responsible for changing the filters state of the table.

```tsx title="src/components/table/ColumnFilter.tsx"
import React, { useState } from "react";
import {
  TextInput,
  Menu,
  ActionIcon,
  Stack,
  Group,
} from "@pankod/refine-mantine";
import { IconFilter, IconX, IconCheck } from "@tabler/icons";
import type { Column } from "@pankod/refine-react-table";

export const ColumnFilter: React.FC<{ column: Column<any, any> }> = ({
  column,
}) => {
  const [state, setState] = useState(null as null | { value: any });

  if (!column.getCanFilter()) {
    return null;
  }

  const open = () =>
    setState({
      value: column.getFilterValue(),
    });

  const close = () => setState(null);

  const change = (value: any) => setState({ value });

  const clear = () => {
    column.setFilterValue(undefined);
    close();
  };

  const save = () => {
    if (!state) return;
    column.setFilterValue(state.value);
    close();
  };

  const renderFilterElement = () => {
    const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

    if (!FilterComponent && !!state) {
      return (
        <TextInput
          autoComplete="off"
          value={state.value}
          onChange={(e) => change(e.target.value)}
        />
      );
    }

    return <FilterComponent value={state?.value} onChange={change} />;
  };

  return (
    <Menu
      opened={!!state}
      position="bottom"
      withArrow
      transition="scale-y"
      shadow="xl"
      onClose={close}
      width="256px"
      withinPortal
    >
      <Menu.Target>
        <ActionIcon
          size="xs"
          onClick={open}
          variant={column.getIsFiltered() ? "light" : "transparent"}
          color={column.getIsFiltered() ? "primary" : "gray"}
        >
          <IconFilter size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {!!state && (
          <Stack p="xs" spacing="xs">
            {renderFilterElement()}
            <Group position="right" spacing={6} noWrap>
              <ActionIcon
                size="md"
                color="gray"
                variant="outline"
                onClick={clear}
              >
                <IconX size={18} />
              </ActionIcon>
              <ActionIcon
                size="md"
                onClick={save}
                color="primary"
                variant="outline"
              >
                <IconCheck size={18} />
              </ActionIcon>
            </Group>
          </Stack>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
```

`<ColumnFilter/>` is a component that renders a button. When the user clicks on the button, the menu will be opened. In the menu, we are rendering the filter element of the column. By default, we are rendering an `<Input/>` component. However, you can render any component you want.

Filter element is a component that renders an input element. When the user changes the value of the input element, the filter value of the column will be changed.

`<ColumnFilter/>` also contains a clear and apply button. When the user clicks on the clear button, the filter value of the column will be cleared. When the user clicks on the apply button, the filter value of the column will be set.

Now, we can use `<ColumnFilter/>` in our table header.

1. Import the `<ColumnFilter/>` component.

   ```tsx title="src/pages/blog-posts/list.tsx"
   import { ColumnFilter } from "../../components/table/ColumnFilter";
   ```

2. Add the `<ColumnFilter/>` component to the `<th/>` as a child like below.

   ```tsx title="src/pages/blog-posts/list.tsx"
   <thead>
     {getHeaderGroups().map((headerGroup) => (
       <tr key={headerGroup.id}>
         {headerGroup.headers.map((header) => (
           <th key={header.id}>
             {!header.isPlaceholder &&
               flexRender(header.column.columnDef.header, header.getContext())}
             <ColumnSorter column={header.column} />
             //highlight-next-line
             <ColumnFilter column={header.column} />
           </th>
         ))}
       </tr>
     ))}
   </thead>
   ```

3. Change the filter operator for columns to "contains" by changing the `meta` property of the column definition like below:

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

4. Disable filtering for the "actions" column by setting the `enableColumnFilter` property of the column to `false` in the column definition like below:

   ```tsx
   {
       id: "actions",
       accessorKey: "id",
       header: "Actions",
       //highlight-next-line
       enableColumnFilter: false,
       ...
   },
   ```

Now, we can filter the table by clicking on the filter button in the table header.

<br/>

<details>
  <summary><strong>How can I use custom filter element?</strong></summary>

If you want to use a custom filter element, you can pass it to the `filterElement` property of the `meta` in column definition. For example, you can pass a `<Select/>` component like below:

```tsx
{
    id: "category",
    header: "Category",
    accessorKey: "category.id",
    meta: {
        filterElement: (props) => <Select {...props} />,
    },
},
```

In the props, the filter element will receive the `value` and `onChange` props. You can use these props to change the filter value of the column.

</details>

<details>
  <summary><strong>How can I change the filter operator?</strong></summary>

By default, filter operator is "eq" for columns. You can change the filter operator by passing the `filterOperator` property to the `meta` in column definition. For example, you can change the filter operator to "contains" like below:

```tsx
{
    id: "description",
    header: "Description",
    accessorKey: "description",
    //highlight-start
    meta: {
        filterOperator: "contains",
    },
    //highlight-end
},
```

</details>

<details>
  <summary><strong>How can I disable filtering for a specific column?</strong></summary>

You can disable filtering for a specific column by setting the `enableColumnFilter` property of the column to `false` in the column definition like below:

```tsx
{
    id: "category",
    header: "Category",
    accessorKey: "category.id",
    //highlight-next-line
    enableColumnFilter: false,
},
```

</details>

<br />
<br />

<Checklist>

<ChecklistItem id="add-search-and-filters-mantine">
I added search and filters to the table
</ChecklistItem>

</Checklist>
