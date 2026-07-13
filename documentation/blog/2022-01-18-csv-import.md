---
title: How to Import CSV File with React
description: In this guide, I will show you how to import CSV files using React and JavaScript.
slug: how-to-import-csv
authors: melih
category: "Ecosystem / Integrations"
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **Refine**. Although we plan to update it with the latest version of **Refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **Refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/core/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

In this guide, we will learn how to import any CSV file received from the user with React. Our application will consist of two parts. We will create a form for the user to select a file. Next, we will do some operations with JavaScript to be able to view this CSV file. Let's start with our example.

<!--truncate-->

## Example

First, let's create a [Form](https://tr.reactjs.org/docs/forms.html) in React so that the user can upload a CSV file.

```tsx title="App.js"
function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        //highlight-start
        <input type={"file"} accept={".csv"} />
        //highlight-end
        <button>IMPORT CSV</button>
      </form>
    </div>
  );
}
```

We created a simple form and our input items. With the accept feature of the input element, we specify that the format of the file can only be CSV. Now, let's load and read the CSV file selected by the user with [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).

```tsx
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  );
}
```

Here, once the user-selected file has been successfully uploaded, we can process and display the file. Now let's load a sample CSV file and see it output on our console.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-01-18-csv-import/console.avif" alt="CSV import console output" />
<br />

As you can see, we can now read a selected CSV file. We can convert this file, which we read as a plain text type, into an Array of Object with JavaScript and place it inside a Table element.

```tsx
function App() {
 import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
....
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-01-18-csv-import/overview.avif" alt="CSV import overview screen" />
<br />

We formatted the CSV file that came in plain text format, using Javascript [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) and [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) methods, and created two separate array. Then we converted Header and Rows arrays to Array of Object format as Key, Value.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/csv-import-example-hw3ne?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="csv-import-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## How to CSV Import with Refine?

The CSV import with **Refine** is very simple and out-of-the-box feature. How to use it is explained step by step in the guide and example.

[Refer to the **Refine** CSV import guide for more information. →](https://refine.dev/core/docs/guides-and-concepts/import-export/csv-import/)

[View Source](https://github.com/refinedev/refine/blob/main/examples/import-export-antd/src/pages/posts/list.tsx#L32)

## Refine CSV Import Usage

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-01-18-csv-import/importing.avif" alt="CSV file import in progress" />
<br />

Importing CSV files is simple and fast using the [`useImport`](https://refine.dev/core/docs/core/hooks/import-export/useImport/) hook and [`ImportButton`](https://refine.dev/core/docs/ui-frameworks/antd/components/buttons/import-button/) provided by **Refine**.

```tsx
import {
  List,
  Table,
  useTable,
  //highlight-start
  useImport,
  ImportButton,
  //highlight-end
} from "@refinedev/antd";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  //highlight-start
  const importProps = useImport<IPostFile>();
  //highlight-end

  return (
    <List
      pageHeaderProps={{
        //highlight-start
        extra: <ImportButton {...importProps} />,
        //highlight-end
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="status" title="Status" />
      </Table>
    </List>
  );
};

interface IPostFile {
  title: string;
  categoryId: string;
}
interface IPost {
  id: string;
  title: string;
  status: string;
}
```

You can also divide the data into chunk with the `batchSize` option while performing the insertion process.

[Refer to the **Refine** CSV Import API References for more information. →](https://refine.dev/core/docs/core/hooks/import-export/useImport/#api-reference)

## Example

<iframe src="https://codesandbox.io/embed/refine-import-export-example-4nneu?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-import-export-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
