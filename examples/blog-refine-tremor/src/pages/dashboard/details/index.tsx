import React from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Button,
  Flex,
  TextInput,
  Icon,
  type DeltaType,
  BadgeDelta,
  Select,
  SelectItem,
} from "@tremor/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const formatCurrency = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatDate = Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "medium",
});

const getDeltaType = (status: number): DeltaType => {
  // Order is Pending or Ready
  if (status === 1 || status === 2) return "unchanged";
  // Order is on its way
  if (status === 3) return "moderateIncrease";
  // Order has been delivered
  if (status === 4) return "increase";
  // Order has been cancelled
  if (status === 5) return "decrease";
  // Status is unknown
  return "decrease";
};

export const Details = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "No.",
        enableColumnFilter: false,
      },
      {
        id: "amount",
        accessorKey: "amount",
        cell: ({ getValue }) => formatCurrency.format(+getValue<any>()),
        header: "Amount",
        enableColumnFilter: false,
      },
      {
        id: "fullName",
        accessorKey: "fullName",
        header: "Ordered By",
        meta: {
          filterOperator: "contains",
        },
      },

      {
        id: "gender",
        accessorKey: "gender",
        header: "Gender",
        enableColumnFilter: false,
      },
      {
        id: "gsm",
        accessorKey: "gsm",
        header: "Tel",
        enableColumnFilter: false,
      },
      {
        id: "address",
        accessorKey: "address",
        header: "Delivery Address",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        accessorKey: "status",
        cell: function render({ row, getValue }) {
          const deltaType = getDeltaType(row?.original?.statusId ?? 0);
          return (
            <BadgeDelta deltaType={deltaType}>{getValue<any>()}</BadgeDelta>
          );
        },
        header: "Delivery Status",
        enableColumnFilter: false,
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return formatDate.format(new Date(getValue<any>()));
        },
        enableColumnFilter: false,
      },
    ],
    [],
  );

  const {
    reactTable: {
      getHeaderGroups,
      getRowModel,
      getState,
      setPageIndex,
      getCanPreviousPage,
      getPageCount,
      getCanNextPage,
      nextPage,
      previousPage,
      setPageSize,
    },

    refineCore: {
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,

    refineCoreProps: {
      dataProviderName: "metrics",
      resource: "orders",

      filters: {
        mode: "off",
      },

      queryOptions: {
        select(data) {
          const retrievedData = data.data;
          const transformedData = [];
          for (const dataObj of retrievedData) {
            const {
              id,
              amount,
              orderNumber,
              createdAt,
              user: { fullName, gender, gsm },
              adress,
              status,
            } = dataObj;

            transformedData.push({
              id,
              amount: `${amount}`,
              orderNumber,
              createdAt,
              fullName,
              gender,
              gsm,
              address: adress?.text,
              status: status?.text,
              statusId: status?.id,
            });
          }

          return { data: transformedData, total: data.total };
        },
      },
    },
  });

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-0.5" alignItems="center">
        <Title>Customer Orders</Title>
        <Icon
          icon={InformationCircleIcon}
          variant="simple"
          tooltip="Shows customer orders"
        />
      </Flex>

      <Table>
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell key={header.id}>
                  {!header.isPlaceholder && (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanFilter() ? (
                        <TextInput
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          placeholder={`Enter ${header.column.id}`}
                          onChange={(e) => {
                            const { value } = e.target;
                            header.column.setFilterValue(value);
                          }}
                        />
                      ) : null}
                    </>
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Flex
        className="mt-2  flex-wrap gap-2"
        justifyContent="between"
        alignItems="center"
      >
        <Flex className="w-4/8 flex-wrap gap-2">
          <Button
            size="xs"
            icon={ChevronDoubleLeftIcon}
            iconPosition="left"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          >
            First Page
          </Button>
          <Button
            size="xs"
            icon={ChevronLeftIcon}
            iconPosition="left"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            Previous Page
          </Button>
          <Button
            size="xs"
            icon={ChevronRightIcon}
            iconPosition="right"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            Next Page
          </Button>
          <Button
            size="xs"
            icon={ChevronDoubleRightIcon}
            iconPosition="right"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          >
            Last Page
          </Button>
        </Flex>
        <Text className="w-1/8">
          Page {getState().pagination.pageIndex + 1} of {getPageCount()}{" "}
        </Text>
        <TextInput
          type="text"
          placeholder="Enter Page"
          className="w-1/8 max-w-xs"
          defaultValue={`${getState().pagination.pageIndex + 1}`}
          onChange={(e) => {
            const { value } = e.target;
            if (Number.isNaN(Number(value))) {
              return;
            }
            const page = value ? Number(value) - 1 : 0;
            setPageIndex(page);
          }}
        />

        <Select
          className="w-2/8"
          onValueChange={(value) => setPageSize(Number(value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </Select>
      </Flex>
    </Card>
  );
};
