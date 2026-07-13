import { useBack, useOne, useShow } from "@refinedev/core";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

import type { ICategory, IProduct } from "../../interfaces";

export const ProductShow = () => {
  const goBack = useBack();

  const { query: queryResult } = useShow<IProduct>();
  const product = queryResult?.data?.data;

  const { result: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: product?.category.id,
    queryOptions: {
      enabled: !!product?.category.id,
    },
  });

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
          <span>Product Details</span>
        </div>
      }
    >
      <h3>Name</h3>
      <span>{product?.name}</span>
      <h3>Price</h3>
      <span>$ {product?.price}</span>
      <h3>Category</h3>
      <span>{categoryData?.title ?? "Loading..."}</span>
      <h3>Description</h3>
      <span>{product?.description}</span>
    </Card>
  );
};
