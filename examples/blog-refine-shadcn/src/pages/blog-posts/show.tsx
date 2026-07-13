import React from "react";
import {
  type IResourceComponentsProps,
  useNavigation,
  useOne,
  useResourceParams,
  useShow,
} from "@refinedev/core";

import { Button } from "@/components/ui/button";
import { ChevronLeft, EditIcon, ListIcon } from "lucide-react";

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  const { edit, list } = useNavigation();
  const { id } = useResourceParams();
  const { query: queryResult } = useShow({
    meta: {
      populate: ["category"],
    },
  });
  const { data } = queryResult;

  const record = data?.data;

  return (
    <div style={{ padding: "16px" }}>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => list("blog_posts")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">{record?.title}</h1>
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => list("blog_posts")}
          >
            <ListIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => edit("blog_posts", id ?? "")}
          >
            <EditIcon />
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <div className="p-4">
          <p>{record?.content}</p>
        </div>
      </div>
    </div>
  );
};
