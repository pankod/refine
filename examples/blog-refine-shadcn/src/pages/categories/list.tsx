import React from "react";
import { type IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucideEye } from "lucide-react";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
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
        id: "actions",
        accessorKey: "id",
        header: () => <h1 className="flex justify-end">Actions</h1>,
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-nowrap justify-end items-center gap-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  show("categories", getValue() as string);
                }}
              >
                <LucideEye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  edit("categories", getValue() as string);
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

  const { edit, show, create } = useNavigation();

  const tableProps = useTable({
    columns,
  });

  tableProps?.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <div className="p-2">
      <div className="flex justify-between items-center m-2">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
          Categories
        </h1>
        <div className="p-2">
          <Button onClick={() => create("categories")}>Create</Button>
        </div>
      </div>
      <DataTable {...tableProps} />
    </div>
  );
};
