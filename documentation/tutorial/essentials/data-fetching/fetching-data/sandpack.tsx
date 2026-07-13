import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../../intro/sandpack";
import { finalFiles as initialFiles } from "../intro/sandpack";
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

const DataProviderWithGetOneMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getApiUrl: () => API_URL,
  update: () => { throw new Error("Not implemented"); },
  getList: () => { throw new Error("Not implemented"); },
  create: () => { throw new Error("Not implemented"); },
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseShowProductTsxCode = /* tsx */ `
export const ShowProduct = () => {
    return <h1>Hello world!</h1>;
};
`.trim();

const ShowProductWithUseOneTsxCode = /* tsx */ `
import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
    const { result, query: { isLoading } } = useOne({ resource: "products", id: 123 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Product name: { result?.name }</div>;
};
`.trim();

const AppTsxWithShowProductCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
        <ShowProduct />
    </Refine>
  );
}
`.trim();

// actions

export const AddGetOneMethod = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.ts",
          DataProviderWithGetOneMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.ts");
      }}
    />
  );
};

export const CreateShowProductFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "/src/pages/products/show.tsx": {
            code: BaseShowProductTsxCode,
          },
        });
        sandpack.openFile("/src/pages/products/show.tsx");
        sandpack.setActiveFile("/src/pages/products/show.tsx");
      }}
      name="src/pages/products/show.tsx"
    />
  );
};

export const AddUseOneToShowProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/pages/products/show.tsx",
          ShowProductWithUseOneTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/show.tsx");
      }}
    />
  );
};

export const AddShowProductToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithShowProductCode);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithShowProductCode,
  },
  "src/providers/data-provider.ts": {
    code: DataProviderWithGetOneMethodTsCode,
  },
  "src/pages/products/show.tsx": {
    code: ShowProductWithUseOneTsxCode,
    active: true,
  },
};
