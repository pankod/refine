import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies } from "../../intro/react-router/sandpack";
import { finalFiles as initialFiles } from "../../redirects/react-router/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const ListProductsWithSyncWithLocation = /* tsx */ `
import { useTable, useMany, useNavigation } from "@refinedev/core";

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
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const { show, edit } = useNavigation();

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
  };

  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
      sorter === "desc"
        ? []
        : [
            {
              field,
              order: sorter === "asc" ? "desc" : "asc",
            },
          ],
    );
  };

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
            <th>Category</th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
            <th>Actions</th>
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
              <td>
                <button
                  type="button"
                  onClick={() => show("protected-products", product.id)}
                >
                  Show
                </button>
                <button
                  type="button"
                  onClick={() => edit("protected-products", product.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {currentPage - 1 > 0 && (
            <span onClick={() => onPage(currentPage - 1)}>{currentPage - 1}</span>
          )}
          <span className="currentPage">{currentPage}</span>
          {currentPage + 1 <= pageCount && (
            <span onClick={() => onPage(currentPage + 1)}>{currentPage + 1}</span>
          )}
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

export const AddLocationSyncToListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.tsx",
          ListProductsWithSyncWithLocation,
        );
        sandpack.setActiveFile("/src/pages/products/list.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/pages/products/list.tsx": {
    code: ListProductsWithSyncWithLocation,
    active: true,
  },
};
