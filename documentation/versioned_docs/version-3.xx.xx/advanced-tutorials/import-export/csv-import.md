---
id: csv-import
title: CSV Import
---

You can easily import CSV files for any resource by using **refine**'s customizable `useImport` hook, optionally with `<ImportButton>` component. `useImport` hook returns the necessary props for `<ImportButton>` component.

Internally, `useImport` uses [Papa Parse][papa parse] to parse the CSV file contents.

## Usage

We'll use the `useImport` hook and add the `<ImportButton>` with properties returned from `useImport`. When the button gets triggered, it creates the imported resources using [`create`][create] or [`createMany`][createmany] [dataProvider][dataprovider] methods under the hood.

```tsx title="pages/posts/list.tsx"
import { List, useImport, ImportButton } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const importProps = useImport<IPostFile>();

  return (
    <List
      headerProps={{
        extra: <ImportButton {...importProps} />,
      }}
    >
      ...
    </List>
  );
};

interface IPostFile {
  id: number;
  title: string;
  content: string;
  userId: number;
  categoryId: number;
  status: "published" | "draft" | "rejected";
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
  user: { id: number };
}
```

As an example, let's say we have a CSV file like this:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

We need to map the CSV data to the API's data. In our case, we have a `categoryId` and `userId` in CSV. For the API, we need to send the `category` and `user` objects. To do this, we'll use the `mapData` prop of `useImport` hook.

```tsx title="pages/posts/list.tsx"
import { List, useImport, ImportButton } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const importProps = useImport<IPostFile>({
    // highlight-start
    mapData: (item) => {
      return {
        title: item.title,
        content: item.content,
        status: item.status,
        category: {
          id: item.categoryId,
        },
        user: {
          id: item.userId,
        },
      };
    },
    // highlight-end
  });

  return (
    <List
      headerProps={{
        extra: <ImportButton {...importProps} />,
      }}
    >
      ...
    </List>
  );
};

interface IPostFile {
  id: number;
  title: string;
  content: string;
  userId: number;
  categoryId: number;
  status: "published" | "draft" | "rejected";
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
  user: { id: number };
}
```

And it's done. When you click on the button and provide a CSV file of the headers `"title"`,`"content"`,`"status"`,`"categoryId"` and `"userId"`, it should be mapped and imported. Mapped data is the request payload. Either as part of an array or by itself as part of every request. In our example, it fires `POST` request/requests like this:

```json title="POST https://api.fake-rest.refine.dev/posts"
{
  "title": "dummy title 1",
  "content": "dummy content 1",
  "status": "rejected",
  "category": {
    "id": "3"
  },
  "user": {
    "id": "8"
  }
}
```

Depending on the [`batchSize`][batchsize] option, posts can get sent one by one or as batches. By default, all records are sent in one [`createMany`][createmany] call.

## Example

<CodeSandboxExample path="import-export-antd" />

[papa parse]: https://www.papaparse.com/
[batchsize]: /core/docs/3.xx.xx/api-reference/core/hooks/import-export/useImport/#batchsize
[dataprovider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider
[create]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider#create
[createmany]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider#createmany
