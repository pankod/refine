import React from "react";
import type { GetListParams, GetListResponse } from "@refinedev/core";
import { dataProvider } from "@/providers/data-provider/server";
import type { Product } from "@/types";
import { ProductsTable } from "@/components/products/table";

type CategoryShowPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CategoryShowPage({
  params,
  searchParams,
}: CategoryShowPageProps) {
  const { products } = await getData({
    categoryId: params.id,
    productPaginationOptions: {
      currentPage: searchParams.currentPage
        ? Number(searchParams.currentPage as string)
        : 1,
    },
  });

  return (
    <ProductsTable
      refineCoreProps={{
        queryOptions: {
          initialData: products,
        },
        filters: {
          permanent: [
            {
              field: "category.id",
              operator: "eq",
              value: params.id,
            },
          ],
        },
      }}
    />
  );
}

type GetDataProps = {
  categoryId: string;
  productPaginationOptions?: GetListParams["pagination"];
};

async function getData(props: GetDataProps) {
  try {
    const productData: GetListResponse<Product> = await dataProvider.getList({
      resource: "products",
      pagination: {
        pageSize: 6,
        ...props.productPaginationOptions,
      },
      filters: [
        {
          field: "category.id",
          operator: "eq",
          value: props.categoryId,
        },
      ],
    });

    return {
      products: productData,
    };
  } catch (error) {
    return {
      products: {
        total: 0,
        data: [],
      },
    };
  }
}
