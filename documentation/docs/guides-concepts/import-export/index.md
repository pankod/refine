---
title: "Import Export Guide | Guides Concepts in Refine v5"
display_title: "Import - Export"
sidebar_label: "Import - Export"
description: "Set up Import Export in Refine v5. Learn best practices. Learn data for real-world React admin panels. Learn with code examples."
---

# CSV Import - Export

import UseExportExample from "./use-export";
import UseImportExample from "./use-import";

Importing and exporting data are essential tasks for managing information in data extensive applications. With `CSV` export and import, we can speed up the process of data entry and data migration.

Refine provides [`useImport`](/core/docs/core/hooks/utilities/use-import/) and [`useExport`](/core/docs/core/hooks/utilities/use-export/) hooks for both bulk importing and exporting data, making it easy to move large datasets between your application and external sources.

## Import

`useImport` hook allows you to import data from a `CSV` file. For each row in the file, it calls the `create` or `createMany` method of your data provider according to your configuration.

Internally, it uses [Papa Parse][papaparse] to parse the file contents.

<UseImportExample />

You can use the following `CSV` file to test the import feature.

```csv title="products.csv"
name,material,description,price,category
"Test Product 1","Test Material 1","Test Description 1","100","{""id"":1}"
"Test Product 2","Test Material 2","Test Description 2","200","{""id"":2}"
"Test Product 3","Test Material 3","Test Description 3","300","{""id"":3}"
```

Refine also provides `<ImportButton />`. It's compatible with `useImport` hook to easily handle the import process.

- [Ant Design](/core/docs/ui-integrations/ant-design/components/buttons/import-button/)
- [Material UI](/core/docs/ui-integrations/material-ui/components/buttons/import-button/)
- [Mantine](/core/docs/ui-integrations/mantine/components/buttons/import-button/)
- [Chakra UI](/core/docs/ui-integrations/chakra-ui/components/buttons/import-button/)

## Export

`useExport` hook allows you to export data as a `CSV` file. It calls the `getList` method of your data provider and downloads the data as a `CSV` file.

Internally, it uses [Papa Parse][papaparse] to create the `CSV` file.

> 🚨 The download feature for `CSV` files does not function within an iframe (live-previews). You can copy the code and run it in your own project to see it in action.

<UseExportExample />

Refine also provides `<ExportButton />`. It's compatible with `useExport` hook to easily handle the export process.

- [Ant Design](/core/docs/ui-integrations/ant-design/components/buttons/export-button/)
- [Material UI](/core/docs/ui-integrations/material-ui/components/buttons/export-button/)
- [Mantine](/core/docs/ui-integrations/mantine/components/buttons/export-button/)
- [Chakra UI](/core/docs/ui-integrations/chakra-ui/components/buttons/export-button/)

[papaparse]: https://www.papaparse.com/
