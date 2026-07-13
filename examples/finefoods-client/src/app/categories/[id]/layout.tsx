import { CategoriesNavLinks } from "@/components/categories";
import { ProductsTableSkeleton } from "@/components/products/table";
import { dataProvider } from "@/providers/data-provider/server";
import type { Category } from "@/types";
import type { GetListResponse } from "@refinedev/core";
import { type PropsWithChildren, Suspense } from "react";

type Props = {
  params: { id: string };
};

export default async function Layout({
  children,
  params,
}: PropsWithChildren<Props>) {
  const { categories } = await getData();

  return (
    <div className="container pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-7xl lg:leading-[80px] font-bold text-white">
            Delight
            <div>in every bite!</div>
          </h1>
          <h2 className="text-xl lg:text-3xl lg:leading-10 text-white mt-2">
            Delivering happiness,{" "}
            <span className="underline whitespace-nowrap">on time.</span>
          </h2>
        </div>
        <img
          className="aspect-[444/384] w-[222px] lg:w-[444px]"
          src="/images/plate.png"
          alt="Plate with pasta"
        />
      </div>
      <div className="bg-white rounded-t-[36px] rounded-b-[20px]">
        <CategoriesNavLinks
          categories={categories}
          selectedCategoryId={params.id}
        />
        <Suspense fallback={<ProductsTableSkeleton />}>{children}</Suspense>
      </div>
    </div>
  );
}

async function getData() {
  try {
    const categoriesData: GetListResponse<Category> =
      await dataProvider.getList({
        resource: "categories",
        pagination: {
          mode: "off",
        },
      });

    return {
      categories: categoriesData,
    };
  } catch (error) {
    return {
      categories: {
        total: 0,
        data: [],
      },
    };
  }
}
