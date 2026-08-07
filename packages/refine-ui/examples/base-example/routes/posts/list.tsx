import { useEffect, useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { type GetManyResponse, useList, useMany } from "@refinedev/core";
import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/registry/new-york/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/registry/new-york/refine-ui/data-table/data-table-sorter";
import {
  DataTableFilterDropdownText,
  DataTableFilterCombobox,
  DataTableFilterDropdownDateRangePicker,
  DataTableFilterDropdownDateSinglePicker,
  DataTableFilterDropdownNumeric,
} from "@/registry/new-york/refine-ui/data-table/data-table-filter";
import { EditButton } from "@/registry/new-york/refine-ui/buttons/edit";
import { DeleteButton } from "@/registry/new-york/refine-ui/buttons/delete";
import {
  ListViewHeader,
  ListView,
} from "@/registry/new-york/refine-ui/views/list-view";
import { ShowButton } from "@/registry/new-york/refine-ui/buttons/show";
import { cn } from "@/lib/utils";
import type { Post, Category, Tag } from "../../types/resources";
import { Badge } from "@/registry/new-york/ui/badge";

export function PostsListPage() {
  // fetch all categories to use in the combobox filter
  const { result } = useList<Category>({
    resource: "categories",
    pagination: {
      currentPage: 1,
      pageSize: 999,
    },
  });
  const categories = result?.data ?? [];

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 96,
        header: ({ column, table }) => {
          return (
            <div className="flex items-center gap-1">
              <span>ID</span>
              <div>
                <DataTableSorter column={column} />
                <DataTableFilterDropdownNumeric
                  defaultOperator="eq"
                  column={column}
                  table={table}
                  placeholder="Filter by ID"
                />
              </div>
            </div>
          );
        },
      },
      {
        id: "title",
        accessorKey: "title",
        size: 300,
        header: ({ column, table }) => {
          // Added table prop for filter
          return (
            <div className="flex items-center gap-1">
              <span>Title</span>
              <div>
                <DataTableFilterDropdownText
                  defaultOperator="contains"
                  column={column}
                  table={table} // Pass table instance
                  placeholder="Filter by title"
                />
              </div>
            </div>
          );
        },
      },
      {
        id: "description",
        header: "Description",
        accessorKey: "content",
        size: 400,
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        id: "category.id",
        accessorKey: "category.id", // Ensure this matches your data structure
        size: 200,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Category</span>
              <DataTableFilterCombobox
                column={column}
                defaultOperator="in"
                multiple={true}
                options={categories.map((item) => ({
                  label: item.title,
                  value: item.id.toString(),
                }))}
              />
            </div>
          );
        },
        cell: ({ getValue }) => {
          const categoryId = getValue<number>();
          const category = categories.find((item) => item.id === categoryId);
          return category?.title || "-";
        },
      },
      {
        id: "tags",
        accessorKey: "tags",
        size: 200,
        header: "Tags",
        cell: ({ getValue, table }) => {
          const meta = table.options.meta as {
            tagsData: GetManyResponse<Tag> | undefined;
            tagsIsLoading: boolean;
          };
          const tags = meta?.tagsData?.data ?? [];
          const tagsByPost = tags.filter((tag) =>
            getValue<number[]>().includes(tag.id),
          );

          return (
            <div className="flex flex-wrap gap-2">
              {tagsByPost.map((tag) => (
                <Badge key={tag.id}>{tag.title}</Badge>
              ))}
            </div>
          );
        },
      },
      {
        id: "status",
        accessorKey: "status",
        size: 100,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Status</span>
              <DataTableFilterCombobox
                column={column}
                defaultOperator="in"
                multiple={true}
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                  { label: "Rejected", value: "rejected" },
                ]}
              />
            </div>
          );
        },
        cell: ({ getValue }) => {
          const status = getValue<string>();
          const variantMap = {
            published: "default",
            draft: "outline",
            rejected: "destructive",
          };
          return (
            <Badge
              variant={variantMap[status as keyof typeof variantMap] as any}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        size: 220,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Created At</span>
              <DataTableFilterDropdownDateRangePicker
                column={column}
                formatDateRange={(dateRange) => {
                  if (!dateRange?.from || !dateRange?.to) {
                    return undefined;
                  }
                  return [
                    dateRange.from.toISOString(),
                    dateRange.to.toISOString(),
                  ];
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          return <div>{row.original.createdAt}</div>;
        },
      },
      {
        id: "updatedAt", // If you have an updatedAt field
        accessorKey: "updatedAt", // Change to updatedAt if available
        size: 220,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Updated At</span>
              <DataTableFilterDropdownDateSinglePicker
                column={column}
                defaultOperator="eq"
                formatDate={(date) => {
                  if (!date) return undefined;
                  return date.toISOString().split("T")[0];
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          return <div>{row.original.createdAt}</div>;
        },
      },
      {
        id: "actions",
        size: 84,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => {
          return (
            <div
              className={cn("flex", "w-full", "items-center", "justify-center")}
            >
              Actions
            </div>
          );
        },
        cell: ({ row }) => {
          const post = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex",
                    "size-8",
                    "border",
                    "rounded-full",
                    "text-muted-foreground",
                    "data-[state=open]:bg-muted",
                    "data-[state=open]:text-foreground",
                    "mx-auto",
                  )}
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="flex flex-col gap-2 p-2"
              >
                <ShowButton
                  variant="ghost"
                  size="sm"
                  className="w-full items-center justify-start"
                  resource="posts"
                  recordItemId={post.id}
                />
                <EditButton
                  variant="ghost"
                  size="sm"
                  className="w-full items-center justify-start"
                  resource="posts"
                  recordItemId={post.id}
                />
                <DeleteButton
                  // add key for each button for popover to work
                  key={post.id}
                  size="sm"
                  className="w-full items-center justify-start"
                  resource="posts"
                  recordItemId={post.id}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [categories],
  );

  const table = useTable<Post>({
    refineCoreProps: {
      // Pass Refine core props for filtering, sorting, pagination
    },
    columns,
    // TanStack Table options can be passed here
    initialState: {
      columnPinning: {
        left: [],
        right: ["actions"], // Pin actions column to the right
      },
    },
  });

  const tableData = table.refineCore.tableQuery.data;

  // get all tag ids from the table data to fetch all tags. we will use this to get relational data
  const tagIds = useMemo(() => {
    return (
      tableData?.data?.flatMap((post) => post.tags.map((tag) => tag)) ?? []
    );
  }, [tableData]);

  // fetch all tags available in the table data
  const {
    result: { data: tagsData },
    query: { isLoading: tagsIsLoading },
  } = useMany<Tag>({
    resource: "tags",
    ids: tagIds,
    queryOptions: {
      enabled: tagIds.length > 0,
    },
  });

  // set the tags data to the table meta to handle relations
  useEffect(() => {
    table.reactTable.setOptions((prev) => ({
      ...prev,
      meta: { ...prev.meta, tagsData: tagsData, tagsIsLoading: tagsIsLoading },
    }));
  }, [table, tagsData, tagsIsLoading]);

  return (
    <ListView>
      <ListViewHeader />
      <DataTable table={table} />
    </ListView>
  );
}
