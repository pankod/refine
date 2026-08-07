import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  type SortDescriptor,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { useTable, getDefaultFilter, type CrudSort } from "@refinedev/core";
import type { IOrder } from "../../interfaces";
import { useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const columns = [
  { header: "Id", key: "id", sortable: true },
  { header: "Amount", key: "amount", sortable: true },
  { header: "Ordered By", key: "user", sortable: true },
  { header: "Gender", key: "gender", sortable: true },
  { header: "Tel", key: "gsm", sortable: false },
  { header: "Delivery Address", key: "adress", sortable: true },
  { header: "Delivery Status", key: "status", sortable: true },
  { header: "Created At", key: "createdAt", sortable: false },
];

export const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
};

const getChipColor = (status: number) => {
  // Order is Pending
  if (status === 1) return "default";
  // Order is Ready
  if (status === 2) return "secondary";
  // Order is on its way
  if (status === 3) return "primary";
  // Order has been delivered
  if (status === 4) return "success";
  // Order has been cancelled
  if (status === 5) return "danger";
  // Status is unknown
  return "warning";
};

export const RecentSalesTable = () => {
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

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const orders = tableQueryResult?.data?.data ?? [];

  const getCellContents = useCallback((columnKey: string, item: IOrder) => {
    if (columnKey === "id") return item.id;
    if (columnKey === "amount") return formatCurrency(item.amount);
    if (columnKey === "user") return item.user.fullName;
    if (columnKey === "gender") return item.user.gender;
    if (columnKey === "gsm") return item.user.gsm;
    if (columnKey === "adress") return item.adress.text;
    if (columnKey === "createdAt") return formatDateTime(item.createdAt);
    if (columnKey === "status")
      return (
        <Chip color={getChipColor(item.status.id)}>{item.status.text}</Chip>
      );
    return "";
  }, []);

  return (
    <Table
      isStriped
      aria-label="Oders table"
      sortDescriptor={sortDescriptor}
      onSortChange={(e) => {
        const sorter: CrudSort = {
          order: e.direction === "ascending" ? "asc" : "desc",
          field: `${e.column}`,
        };

        switch (e.column) {
          case "user":
            sorter.field = "user.fullName";
            break;
          case "gender":
            sorter.field = "user.gender";
            break;
          case "gsm":
            sorter.field = "user.gsm";
            break;
          case "adress":
            sorter.field = "adress.text";
            break;
          case "status":
            sorter.field = "status.text";
            break;
          default:
            break;
        }
        setSorters([sorter]);
        setSortDescriptor(e);
      }}
      topContent={
        <div className="flex justify-between gap-3">
          <h2 className="font-bold whitespace-nowrap">Recent sales</h2>
          <Input
            isClearable
            className="w-full sm:max-w-[20%]"
            placeholder="Search"
            startContent={<MagnifyingGlassIcon width={12} />}
            value={getDefaultFilter("q", filters)}
            onClear={() => {
              setCurrent(1);
              setFilters([], "replace");
            }}
            onValueChange={(value) => {
              if (!value.trim()) {
                setCurrent(1);
                setFilters([], "replace");
                return;
              }

              setCurrent(1);
              setFilters([
                {
                  field: "q",
                  value: value,
                  operator: "contains",
                },
              ]);
            }}
          />
        </div>
      }
      bottomContent={
        <div className="flex w-full gap-2 justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={current}
            total={pageCount}
            onChange={(page) => setCurrent(page)}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                Rows per page
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select number of rows per page"
              variant="flat"
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={[`${pageSize}`]}
              onSelectionChange={(rows) => {
                setPageSize(+(rows as Set<string>).values().next().value);
              }}
            >
              {[5, 10, 25, 50].map((rowsPerPage) => {
                return (
                  <DropdownItem
                    key={`${rowsPerPage}`}
                  >{`${rowsPerPage}`}</DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn allowsSorting={column.sortable} key={column.key}>
            {column.header}
          </TableColumn>
        )}
      </TableHeader>
      {orders.length ? (
        <TableBody items={orders}>
          {(item) => {
            return (
              <TableRow key={item.id}>
                {(columnKey) => {
                  return (
                    <TableCell>
                      {getCellContents(columnKey as string, item)}
                    </TableCell>
                  );
                }}
              </TableRow>
            );
          }}
        </TableBody>
      ) : (
        <TableBody emptyContent={"Loading..."}>{[]}</TableBody>
      )}
    </Table>
  );
};
