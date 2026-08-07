import {
  useTable,
  getDefaultFilter,
  useNavigation,
  useDelete,
  useMany,
} from "@refinedev/core";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";

import type { ICategory, IProduct } from "../../interfaces";

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const ProductList = () => {
  const {
    tableQuery: tableQueryResult,
    pageCount,
    currentPage: current,
    pageSize,
    sorters,
    filters,
    setCurrentPage: setCurrent,
    setPageSize,
    setSorters,
    setFilters,
  } = useTable();
  const { edit, show, create } = useNavigation();
  const { mutate: deleteProduct } = useDelete();

  const products = tableQueryResult?.data?.data;

  const { result: categoryData } = useMany<ICategory>({
    resource: "categories",
    ids: products?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!products,
    },
  });

  const confirmDeleteProduct = (id: number) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteProduct({
          resource: "products",
          id,
        });
      },
    });
  };

  const amountBodyTemplate = (rowData: IProduct) => {
    return formatCurrency(rowData.price);
  };

  const categoryBodyTemplate = (rowData: IProduct) => {
    const category = categoryData?.data?.find(
      (item) => item.id === rowData.category?.id,
    );

    return category?.title ?? "Loading...";
  };

  const actionBodyTemplate = (rowData: IProduct) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => edit("products", rowData.id)}
        />
        <Button
          icon="pi pi-eye"
          rounded
          text
          severity="secondary"
          onClick={() => show("products", rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData.id)}
        />
      </>
    );
  };

  const header = (
    <div className="flex justify-content-between">
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        onClick={() => {
          setCurrent(1);
          setFilters([], "replace");
        }}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={getDefaultFilter("q", filters)}
          onChange={(e) => {
            setCurrent(1);
            setFilters([
              {
                field: "q",
                value: e.target.value,
                operator: "contains",
              },
            ]);
          }}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

  return (
    <Card
      className="shadow-1"
      title={
        <div className="flex justify-content-between align-items-center">
          <span className="p-card-title">Products</span>
          <Button
            icon="pi pi-plus"
            label="Create"
            onClick={() => create("products")}
          />
        </div>
      }
    >
      <DataTable
        value={products}
        dataKey="id"
        showGridlines
        lazy
        paginator
        rows={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50]}
        first={current * pageSize - pageSize}
        totalRecords={pageCount * pageSize}
        onPage={(event) => {
          setCurrent((event.page ?? 0) + 1);
          setPageSize(event.rows);
        }}
        onSort={(event) => {
          setSorters([
            {
              field: event.sortField,
              order: event.sortOrder === 1 ? "asc" : "desc",
            },
          ]);
        }}
        sortField={sorters[0]?.field}
        sortOrder={sorters[0]?.order === "asc" ? 1 : -1}
        loading={tableQueryResult?.isLoading}
        header={header}
      >
        <Column field="id" header="Id" sortable style={{ minWidth: "1rem" }} />
        <Column
          field="name"
          header="Name"
          style={{ minWidth: "12rem" }}
          sortable
        />
        <Column
          field="price"
          header="Price"
          body={amountBodyTemplate}
          sortable
        />
        <Column header="Category" body={categoryBodyTemplate} />
        <Column
          field="description"
          header="Description"
          style={{ minWidth: "24rem" }}
        />
        <Column
          body={actionBodyTemplate}
          header="Actions"
          align="center"
          style={{ minWidth: "10rem" }}
        />
      </DataTable>
    </Card>
  );
};
