import { useTable, getDefaultFilter } from "@refinedev/core";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import type { IOrder, IOrderStatus } from "../../../interfaces";

export const RecentSales = () => {
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
  } = useTable<IOrder>({
    resource: "orders",

    pagination: {
      pageSize: 5,
    },
  });

  const orders = tableQueryResult?.data?.data;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const formatDateTime = (value: string) => {
    return new Date(value).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const getSeverity = (status: IOrderStatus["text"]) => {
    switch (status) {
      case "Cancelled":
        return "danger";

      case "Ready":
        return "success";

      case "On The Way":
        return "info";

      case "Pending":
        return "warning";

      case "Delivered":
        return null;
    }
  };

  const amountBodyTemplate = (rowData: IOrder) => {
    return formatCurrency(rowData.amount);
  };

  const statusBodyTemplate = (rowData: IOrder) => {
    return (
      <Tag
        value={rowData.status.text}
        severity={getSeverity(rowData.status.text)}
      />
    );
  };

  const dateBodyTemplate = (rowData: IOrder) => {
    return formatDateTime(rowData.createdAt);
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
    <Card className="shadow-1" title="Recent Sales">
      <DataTable
        value={orders}
        dataKey="id"
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
        <Column field="id" header="Id" sortable style={{ minWidth: "2rem" }} />
        <Column
          field="amount"
          header="Amount"
          body={amountBodyTemplate}
          sortable
        />
        <Column
          field="user.fullName"
          header="Ordered By"
          style={{ minWidth: "10rem" }}
          sortable
        />
        <Column field="user.gender" header="Gender" sortable />
        <Column
          field="user.gsm"
          header="Tel"
          align="center"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="adress.text"
          header="Delivery Address"
          style={{ minWidth: "16rem" }}
        />
        <Column
          field="status.text"
          header="Delivery Status"
          body={statusBodyTemplate}
          align="center"
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="createdAt"
          header="Created At"
          body={dateBodyTemplate}
          align="center"
          sortable
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </Card>
  );
};
