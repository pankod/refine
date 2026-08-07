---
id: swizzle
title: 2. Create Data Provider with Swizzle
tutorial:
  prev: 3.xx.xx/tutorial/understanding-dataprovider/index
  next: 3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider
---

## What is Swizzle?

The [`swizzle`](../../packages/documentation/cli#swizzle) is a command in [`refine-cli`](../../packages/documentation/cli) that allows you to customize the refine's supported components and data providers. It allows you to eject selected files from the **refine** packages and modify depending on your needs.

Instead of starting from scratch, you can use the ejected file code logic as a starting point and make changes to fit your specific needs.

## How to Use Swizzle for Data Provider?

In some cases, refine's built-in data providers are not fully complying with our API needs and you may want to edit the existing data provider logic. In this case, we will use the `swizzle` command to customize the data provider:

1. Run the `swizzle` command in the project directory:

   ```bash
   npm run refine swizzle
   ```

2. Select the data provider package from the list of packages that support `swizzle`. In this tutorial, we will use `@pankod/refine-simple-rest`.

   ```bash
   ? Which package do you want to swizzle?
     Data Provider
   ❯  @pankod/refine-simple-rest
     UI Framework
     @pankod/refine-antd
   ```

The necessary files for this package are copied to the `src/rest-data-provider` folder with `swizzle`.

    ```bash
    Successfully swizzled Data Provider

    Files created:
    - src/rest-data-provider/index.ts
    - src/rest-data-provider/utils/axios.ts
    - src/rest-data-provider/utils/generateFilter.ts
    - src/rest-data-provider/utils/generateSort.ts
    - src/rest-data-provider/utils/mapOperator.ts
    - src/rest-data-provider/utils/index.ts

    Warning:
    You will also need to add axios to your project dependencies.

    Usage

      ╭ App.tsx ─────────────────────────────────────────────────╮
      │                                                          │
      │   import { dataProvider } from "./rest-data-provider";   │
      │                                                          │
      │   const App = () => {                                    │
      │       return (                                           │
      │           <Refine                                        │
      │               dataProvider={dataProvider}                │
      │               /* ... */                                  │
      │           />                                             │
      │       );                                                 │
      │   }                                                      │
      │                                                          │
      ╰──────────────────────────────────────────────────────────╯
    ```

3. To use the generated data provider, we need to import it in the `App.tsx` file and give it as a `dataProvider` prop to the `Refine` component.

Now that you have ejected all the data provider, you can modify and use it according to your API. You'll realize that using the swizzle for creating a data provider is much faster than writing a new data provider from scratch.

<Checklist>

<ChecklistItem id="data-provider-swizzle">
I learned what is swizzle and how to use it.
</ChecklistItem>

</Checklist>
