import { useBack, useOne, useShow } from "@refinedev/core";
import type { ICategory, IProduct } from "../../interfaces";
import { Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
    <div className="my-3">
      <Card className="rounded-none">
        <div className="flex items-center px-5">
          <Button
            onClick={goBack}
            className="m-1"
            color="primary"
            variant="light"
            isIconOnly
            aria-label="Go to products page"
          >
            <ArrowLongLeftIcon width={16} />
          </Button>

          <h1 className="text-lg font-bold">Show product</h1>
        </div>
        <CardBody>
          <CardHeader className="text-lg font-bold p-5">
            <h2>Product details</h2>
          </CardHeader>
          <CardBody>
            {product?.images?.length ? (
              <Image
                src={product.images[0].url}
                width={300}
                alt={product.name}
              />
            ) : null}
            <h2 className="text-base font-medium mt-3">Name</h2>
            <p>{product?.name}</p>
            <h2 className="text-base font-medium mt-3">Price</h2>
            <p>{currencyFormatter.format(product?.price ?? 0)}</p>
            <h2 className="text-base font-medium mt-3">Category</h2>
            <p>{categoryData?.title}</p>
            <h2 className="text-base font-medium mt-3">Description</h2>
            <p>{product?.description}</p>
          </CardBody>
        </CardBody>
      </Card>
    </div>
  );
};
