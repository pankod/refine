import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies } from "../intro/sandpack";
import { finalFiles as initialFiles } from "../forms/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
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

table th {
  font-weight: 600;
}

table, th, td {
  border: 0px solid;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 14px;
}

table th, table td {
  padding: 5px;
  text-align: left;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.pagination div {
  display: flex;
  gap: 6px;
  align-items: center;
}

.pagination span {
  cursor: pointer;
}

.pagination .currentPage {
  font-weight: bold;
  cursor: default;
}

`.trim();

const AppTsxWithListProductsTsxCode = /* tsx */ `
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
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const ListProductsWithUseTableTsxCode = /* tsx */ `
import { useTable } from "@refinedev/core";

export const ListProducts = () => {
  const { result, tableQuery: { isLoading } } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category?.id}</td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
`.trim();

const ListProductsWithUseTableAndUseManyTsxCode = /* tsx */ `
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { result: categories } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
`.trim();

const DataProviderWithGetManyMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetch(
      \`\${API_URL}/\${resource}?\${params.toString()}\`,
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
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
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const DataProviderWithTotalInGetListMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
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

    const total = Number(response.headers.get("x-total-count"));

    return {
        data,
        total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetch(
      \`\${API_URL}/\${resource}?\${params.toString()}\`,
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
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
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const ListProductsWithPaginationTsxCode = /* tsx */ `
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
    currentPage,
    setCurrentPage,
    pageCount,
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { result: categories } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {currentPage - 1 > 0 && <span onClick={() => onPage(currentPage - 1)}>{currentPage - 1}</span>}
          <span className="currentPage">{currentPage}</span>
          {currentPage + 1 <= pageCount && <span onClick={() => onPage(currentPage + 1)}>{currentPage + 1}</span>}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};
`.trim();

const ListProductsWithHeaderSortersTsxCode = /* tsx */ `
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
    currentPage,
    setCurrentPage,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { result: categories } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPage = (page: number) => {
    setCurrentPage(page);
  };

  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  }

  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
        sorter === "desc" ? [] : [
        {
            field,
            order: sorter === "asc" ? "desc" : "asc",
        },
        ]
    );
  }

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id")]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name")]}
            </th>
            <th>
              Category
            </th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {currentPage - 1 > 0 && <span onClick={() => onPage(currentPage - 1)}>{currentPage - 1}</span>}
          <span className="currentPage">{currentPage}</span>
          {currentPage + 1 <= pageCount && <span onClick={() => onPage(currentPage + 1)}>{currentPage + 1}</span>}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};
`.trim();

// actions

export const MountListProductsInAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/App.tsx", AppTsxWithListProductsTsxCode);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const RefactorToUseTableInListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.tsx",
          ListProductsWithUseTableTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.tsx");
      }}
    />
  );
};

export const AddRelationHandlingToUseTableInListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.tsx",
          ListProductsWithUseTableAndUseManyTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.tsx");
      }}
    />
  );
};

export const AddGetManyMethodToDataProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.ts",
          DataProviderWithGetManyMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.ts");
      }}
    />
  );
};

export const AddTotalToGetListMethodInDataProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.ts",
          DataProviderWithTotalInGetListMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.ts");
      }}
    />
  );
};

export const AddPaginationToUseTableInListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.tsx",
          ListProductsWithPaginationTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.tsx");
      }}
    />
  );
};

export const AddHeaderSortersToUseTableInListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.tsx",
          ListProductsWithHeaderSortersTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.tsx");
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
    code: AppTsxWithListProductsTsxCode,
  },
  "src/providers/data-provider.ts": {
    code: DataProviderWithTotalInGetListMethodTsCode,
  },
  "src/pages/products/list.tsx": {
    code: ListProductsWithHeaderSortersTsxCode,
    active: true,
  },
};
