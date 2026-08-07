---
id: csv-export
title: CSV Export
---

With **refine**, you can easily add export functionality to your application. By using the [`useExport`][useexport] hook with desired configurations, you can turn any button into an export button. Which resources' records to export can be configured. By default, it is inferred from current route of browser.

Internally, it uses [`export-to-csv`][export-to-csv] to create the `CSV` file.

## Usage

```tsx title="pages/posts/list.tsx"
import { useExport } from "@pankod/refine-core";

interface IPost {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export const PostList: React.FC = () => {
  const { triggerExport } = useExport<IPost>();

  return (
    <div>
      <button onClick={triggerExport}>Export Button</button>
      ...
    </div>
  );
};
```

After this setup is done, when the user clicks the button, download process will initialize.

Manually running the `triggerExport` function is another option.

`useExport` returns two properties: `isLoading: boolean` and `triggerExport: async () => void`. You can use these properties to create your own export button or pass them to the `ExportButton` component.

> [Refer to the useExport docs for more detailed information and export settings. &#8594][useexport]

## Example

<CodeSandboxExample path="import-export-antd" />

[useexport]: /core/docs/3.xx.xx/api-reference/core/hooks/import-export/useExport
[export-to-csv]: https://github.com/alexcaza/export-to-csv
