import React from "react";
import {
  type IResourceComponentsProps,
  useNavigation,
  useMany,
  type GetManyResponse,
} from "@refinedev/core";

import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { LucideEdit, LucideEye } from "lucide-react";

interface ICategory {
  id: number;
  title: string;
}

interface IBlogPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: {
    id: number;
  };
}

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const { create, edit, show } = useNavigation();

  const columns = React.useMemo<ColumnDef<IBlogPost>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse<ICategory>;
          };
          const category = meta.categoryData?.data?.find(
            (item: ICategory) => item.id === getValue(),
          );

          return category?.title ?? "";
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row flex-nowrap gap-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  show("blog_posts", getValue() as string);
                }}
              >
                <LucideEye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  edit("blog_posts", getValue() as string);
                }}
              >
                <LucideEdit size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const tableProps = useTable({
    columns,
    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
  });

  const tableData = tableProps?.refineCore?.tableQueryResult?.data;
  const catList =
    tableData?.data?.map((item: IBlogPost) => item?.category?.id) ?? [];

  const { result: categoryData } = useMany({
    resource: "categories",
    ids: catList,
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  tableProps?.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <div className="p-2">
      <div className="flex justify-between items-center my-2 mx-2">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
          Blog Posts
        </h1>
        <div className="p-2">
          <Button onClick={() => create("blog_posts")}>Create</Button>
        </div>
      </div>
      <DataTable {...tableProps} />
    </div>
  );
};
