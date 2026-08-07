import { Button } from "@/components/ui/button";
import {
  type IResourceComponentsProps,
  useNavigation,
  useResourceParams,
  useShow,
} from "@refinedev/core";
import { ChevronLeft, EditIcon, ListIcon } from "lucide-react";
import React from "react";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const { edit, list } = useNavigation();
  const { id } = useResourceParams();
  const { query: queryResult } = useShow({});
  const { data } = queryResult;

  const record = data?.data;

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex justify-items-start items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => list("categories")}>
            <ChevronLeft />
          </Button>
          <h1 className="4xl font-bold">Category Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => list("categories")}
          >
            <ListIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => edit("categories", id ?? "")}
          >
            <EditIcon />
          </Button>
        </div>
      </div>
      <div className="mt-6 p-4">
        <p className="font-bold">ID - {record?.id ?? ""}</p>
        <p className="capitalize mt-3">{record?.title}</p>
      </div>
    </div>
  );
};
