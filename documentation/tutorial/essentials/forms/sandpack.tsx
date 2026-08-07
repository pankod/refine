import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../intro/sandpack";
import { finalFiles as initialFiles } from "../data-fetching/listing-data/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showFiles={true}
      dependencies={dependencies}
      files={files}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const StylesCssCode = /* css */ `
body {
    font-family: sans-serif;
    -webkit-font-smoothing: auto;
    -moz-font-smoothing: auto;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: auto;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}

form input,
form textarea,
form button,
form select {
    display: block;
    margin-bottom: 12px;
}
`.trim();

const DataProviderWithCreateMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  create: async ({ resource, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}\`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.currentPage - 1) * pagination.pageSize);
      params.append("_end", pagination.currentPage * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(\`\${API_URL}/\${resource}?\${params.toString()}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseCreateProductFormTsxCode = /* tsx */ `
export const CreateProduct = () => {
    return <h1>hello world!</h1>;
};
`.trim();

const AppTsxWithCreateProductCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* <ListProducts /> */}
      <CreateProduct />
    </Refine>
  );
}
`.trim();

const CreateProductFormWithFieldsTsxCode = /* tsx */ `
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({ action: "create", resource: "products" });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category ID</label>
      <input type="number" id="category" name="category" />

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const CreateProductFormWithPriceUpdateTsxCode = /* tsx */ `
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({ action: "create", resource: "products" });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
        ...data,
        price: Number(data.price).toFixed(2),
        category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category ID</label>
      <input type="number" id="category" name="category" />

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const CreateProductFormWithCategoryRelationTsxCode = /* tsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "products",
  });

  const { options } = useSelect({
    resource: "categories",
    // optionLabel: "title", // Default value is "title" so we don't need to provide it.
    // optionValue: "id", // Default value is "id" so we don't need to provide it.
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const AppTsxWithEditProductCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      <EditProduct />
      {/* <ListProducts /> */}
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const RefactorEditProductTsxWithFormCode = /* tsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutation, query } = useForm({
    action: "edit",
    resource: "products",
    id: "123"
  });

  const record = query.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={record?.description}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        pattern="\\d*\.?\\d*"
        defaultValue={record?.price}
      />

      <label htmlFor="material">Material</label>
      <input
        type="text"
        id="material"
        name="material"
        defaultValue={record?.material}
      />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}
            selected={record?.category.id == option.value}
            >
            {option.label}
          </option>
        ))}
      </select>

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

// actions

export const AddCreateMethod = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.ts",
          DataProviderWithCreateMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.ts");
      }}
    />
  );
};

export const CreateCreateProductFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      name="src/pages/products/create.tsx"
      onClick={() => {
        sandpack.addFile({
          "src/pages/products/create.tsx": {
            code: BaseCreateProductFormTsxCode,
          },
        });
        sandpack.openFile("/src/pages/products/create.tsx");
        sandpack.setActiveFile("/src/pages/products/create.tsx");
      }}
    />
  );
};

export const AddCreateProductToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithCreateProductCode);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddUseFormToCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.tsx",
          CreateProductFormWithFieldsTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/create.tsx");
      }}
    />
  );
};

export const AddPriceUpdateToCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.tsx",
          CreateProductFormWithPriceUpdateTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/create.tsx");
      }}
    />
  );
};

export const AddCategoryRelationToCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.tsx",
          CreateProductFormWithCategoryRelationTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/create.tsx");
      }}
    />
  );
};

export const MountEditProductInAppTsx = () => {
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

export const RefactorToUseFormInEditProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/edit.tsx",
          RefactorEditProductTsxWithFormCode,
        );
        sandpack.setActiveFile("/src/pages/products/edit.tsx");
      }}
    />
  );
};

// files

export const files = {
  ...initialFiles,
  "styles.css": {
    code: StylesCssCode,
    hidden: true,
  },
};

export const finalFiles = {
  ...removeActiveFromFiles(files),
  "src/App.tsx": {
    code: AppTsxWithEditProductCode,
  },
  "src/providers/data-provider.ts": {
    code: DataProviderWithCreateMethodTsCode,
  },
  "src/pages/products/edit.tsx": {
    code: RefactorEditProductTsxWithFormCode,
    active: true,
  },
  "src/pages/products/create.tsx": {
    code: CreateProductFormWithCategoryRelationTsxCode,
  },
};
