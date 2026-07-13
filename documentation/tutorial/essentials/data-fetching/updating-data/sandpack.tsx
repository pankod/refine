import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../../intro/sandpack";
import { finalFiles as initialFiles } from "../fetching-data/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const DataProviderWithUpdateMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getApiUrl: () => API_URL,
  getList: () => { throw new Error("Not implemented"); },
  create: () => { throw new Error("Not implemented"); },
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseEditProductTsxCode = /* tsx */ `
import { useOne } from "@refinedev/core";

export const EditProduct = () => {
  const { result, query: { isLoading } } = useOne({ resource: "products", id: 123 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Product name: {result?.name}</div>
      <div>Product price: \${result?.price}</div>
    </div>
  );
};
`.trim();

const EditProductWithUseUpdateTsxCode = /* tsx */ `
import { useOne, useUpdate } from "@refinedev/core";

export const EditProduct = () => {
  const { result, query: { isLoading } } = useOne({ resource: "products", id: 123 });
  const { mutate, mutation: { isPending: isUpdating } } = useUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePrice = async () => {
    await mutate({
      resource: "products",
      id: 123,
      values: {
        price: Math.floor(Math.random() * 100),
      },
    });
  };

  return (
    <div>
      <div>Product name: {result?.name}</div>
      <div>Product price: \${result?.price}</div>
      <button onClick={updatePrice}>Update Price</button>
    </div>
  );
};
`.trim();

const AppTsxWithEditProductCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
// highlight-next-line
import { EditProduct } from "./pages/products/edit";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* highlight-next-line */}
      <EditProduct />
    </Refine>
  );
}
`.trim();

// actions

export const AddUpdateMethod = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.ts",
          DataProviderWithUpdateMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.ts");
      }}
    />
  );
};

export const CreateEditProductFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "src/pages/products/edit.tsx": {
            code: BaseEditProductTsxCode,
          },
        });
        sandpack.openFile("/src/pages/products/edit.tsx");
        sandpack.setActiveFile("/src/pages/products/edit.tsx");
      }}
      name="src/pages/products/edit.tsx"
    />
  );
};

export const AddUseUpdateToEditProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/edit.tsx",
          EditProductWithUseUpdateTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/edit.tsx");
      }}
    />
  );
};

export const AddEditProductToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithEditProductCode);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithEditProductCode,
  },
  "src/providers/data-provider.ts": {
    code: DataProviderWithUpdateMethodTsCode,
  },
  "src/pages/products/edit.tsx": {
    code: EditProductWithUseUpdateTsxCode,
    active: true,
  },
};
