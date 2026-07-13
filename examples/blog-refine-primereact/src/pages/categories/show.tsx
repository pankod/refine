import { useBack, useShow } from "@refinedev/core";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

import type { ICategory } from "../../interfaces";

export const CategoryShow = () => {
  const goBack = useBack();

  const { query: queryResult } = useShow<ICategory>();
  const category = queryResult?.data?.data;

  return (
    <Card
      className="shadow-1"
      title={
        <div className="flex align-items-center">
          <Button
            onClick={goBack}
            icon="pi pi-arrow-left"
            className="mr-1"
            text
            severity="secondary"
          />
          <span>Category Details</span>
        </div>
      }
    >
      <h3>Id</h3>
      <span>{category?.id}</span>
      <h3>Title</h3>
      <span>{category?.title}</span>
    </Card>
  );
};
