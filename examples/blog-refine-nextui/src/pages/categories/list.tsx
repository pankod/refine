import {
  useTable,
  getDefaultFilter,
  useNavigation,
  useDelete,
  type CrudSort,
} from "@refinedev/core";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Button,
  useDisclosure,
  type SortDescriptor,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import {
  TrashIcon,
  EyeIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import type { IProduct } from "../../interfaces";

import { DeleteModal } from "../../components/modal";
import { useState, useCallback } from "react";

const columns = [
  { header: "Id", key: "id", sortable: true },
  { header: "Name", key: "title", sortable: true },
  { header: "Actions", key: "actions", sortable: false },
];

export const CategoryList = () => {
  const {
    tableQuery: tableQueryResult,
    pageCount,
    currentPage: current,
    pageSize,
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
  const { mutate: deleteCategory } = useDelete();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteItemId, setDeleteItemId] = useState<null | number>(null);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const categories = tableQueryResult?.data?.data ?? [];

  const renderCell = useCallback((columnKey: string, item: IProduct) => {
    if (columnKey === "actions") {
      return (
        <TableCell>
          <div className="flex gap-4 items-center justify-end">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="default"
              aria-label="Edit"
              className="rounded-full"
              onPress={() => {
                edit("categories", item.id);
              }}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              color="default"
              size="sm"
              aria-label="View"
              className="rounded-full"
              onPress={() => {
                show("categories", item.id);
              }}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              color="danger"
              size="md"
              aria-label="Delete"
              className="rounded-full"
              onPress={() => {
                setDeleteItemId(item.id);
                onOpen();
              }}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      );
    }

    return <TableCell>{(item as any)[columnKey]}</TableCell>;
  }, []);

  return (
    <>
      <Table
        isStriped
        aria-label="Products table"
        sortDescriptor={sortDescriptor}
        onSortChange={(e) => {
          const sorter: CrudSort = {
            order: e.direction === "ascending" ? "asc" : "desc",
            field: e.column as string,
          };

          setSorters([sorter]);
          setSortDescriptor(e);
        }}
        topContent={
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3">
              <h1 className="font-bold">Categories</h1>
              <Button
                color="primary"
                variant="bordered"
                startContent={<PlusIcon className="h-4 w-4" />}
                onPress={() => {
                  create("categories");
                }}
              >
                Create Category
              </Button>
            </div>
            <div className="flex justify-end items-center">
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
                {[5, 10].map((rowsPerPage) => {
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
          {(column) => {
            if (column.key === "actions") {
              return (
                <TableColumn
                  allowsSorting={column.sortable}
                  key={column.key}
                  className="text-end pr-16"
                >
                  {column.header}
                </TableColumn>
              );
            }
            return (
              <TableColumn allowsSorting={column.sortable} key={column.key}>
                {column.header}
              </TableColumn>
            );
          }}
        </TableHeader>
        {categories.length ? (
          <TableBody items={categories}>
            {(item) => {
              return (
                <TableRow key={item.id}>
                  {(columnKey) => {
                    return renderCell(columnKey as string, item as IProduct);
                  }}
                </TableRow>
              );
            }}
          </TableBody>
        ) : (
          <TableBody emptyContent={"Loading...data"}>{[]}</TableBody>
        )}
      </Table>
      {isOpen ? (
        <DeleteModal
          isOpen={isOpen}
          onDelete={() =>
            deleteCategory({
              resource: "categories",
              id: deleteItemId as number,
            })
          }
          onOpenChange={onOpenChange}
          warningMessage={`You are about to delete category with id ${deleteItemId} from the database. This action is irreversible.`}
        />
      ) : null}
    </>
  );
};
