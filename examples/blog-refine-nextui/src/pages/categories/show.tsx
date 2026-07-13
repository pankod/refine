import { useBack, useShow } from "@refinedev/core";
import type { ICategory } from "../../interfaces";
import { Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export const CategoryShow = () => {
  const goBack = useBack();

  const { query: queryResult } = useShow<ICategory>();

  const category = queryResult?.data?.data;

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
            aria-label="Go to categories page"
          >
            <ArrowLongLeftIcon width={16} />
          </Button>

          <h1 className="text-lg font-bold">Show Category</h1>
        </div>
        <CardBody>
          <CardHeader className="text-lg font-bold p-5">
            <h2>Category details</h2>
          </CardHeader>
          <CardBody>
            {category?.cover ? (
              <Image src={category.cover} width={300} alt={category.title} />
            ) : null}
            <h2 className="text-base font-medium mt-3">Id</h2>
            <p>{category?.id ?? 0}</p>
            <h2 className="text-base font-medium mt-3">Title</h2>
            <p>{category?.title ?? ""}</p>
          </CardBody>
        </CardBody>
      </Card>
    </div>
  );
};
