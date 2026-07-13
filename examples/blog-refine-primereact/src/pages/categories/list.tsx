import {
  useTable,
  getDefaultFilter,
  useNavigation,
  useDelete,
} from "@refinedev/core";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";

import type { ICategory } from "../../interfaces";

export const CategoryList = () => {
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
  } = useTable({
    pagination: {
      pageSize: 5,
    },
  });
  const { edit, show, create } = useNavigation();
  const { mutate: deleteProduct } = useDelete();

  const categories = tableQueryResult?.data?.data;

  const confirmDeleteProduct = (id: number) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteProduct({
          resource: "categories",
          id,
        });
      },
    });
  };

  const actionBodyTemplate = (rowData: ICategory) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => edit("categories", rowData.id)}
        />
        <Button
          icon="pi pi-eye"
          rounded
          text
          severity="secondary"
          onClick={() => show("categories", rowData.id)}
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
          <span className="p-card-title">Categories</span>
          <Button
            icon="pi pi-plus"
            label="Create"
            onClick={() => create("categories")}
          />
        </div>
      }
    >
      <DataTable
        value={categories}
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
        <Column
          field="id"
          header="Id"
          sortable
          style={{ minWidth: "1rem", width: "10rem" }}
        />
        <Column
          field="title"
          header="Name"
          style={{ minWidth: "12rem" }}
          sortable
        />
        <Column
          body={actionBodyTemplate}
          header="Actions"
          align="center"
          style={{ minWidth: "10rem", width: "10rem" }}
        />
      </DataTable>
    </Card>
  );
};
