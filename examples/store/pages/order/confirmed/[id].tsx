import { useRouter } from "next/router";
import { useOne } from "@refinedev/core";
import type { Order } from "@medusajs/medusa";

import { IS_BROWSER } from "src/contants";
import { SEO } from "@components/common";
import { OrderCompletedTemplate } from "@components/orders/OrderCompletedTemplate";
import { SkeletonOrderConfirmed } from "@components/skeletons";
import clsx from "clsx";
import { LoadingDots } from "@components/ui";

const Confirmed: React.FC = () => {
  const router = useRouter();

  const id = typeof router.query?.id === "string" ? router.query.id : "";

  const {
    isSuccess,
    result,
    isError,
    query: { isLoading },
  } = useOne<{ order: Order }>({
    resource: "orders",
    id,
    queryOptions: {
      enabled: !!id,
      staleTime: Number.POSITIVE_INFINITY,
    },
  });

  if (isLoading) {
    return (
      <>
        <div
          className={clsx(
            "flex",
            "lg:hidden",
            "items-center",
            "justify-center",
            "py-40",
            "text-gray-darkest",
          )}
        >
          <LoadingDots />
        </div>
        <div className={clsx("hidden", "lg:block")}>
          <SkeletonOrderConfirmed />
        </div>
      </>
    );
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404");
    }
    return (
      <>
        <div
          className={clsx(
            "flex",
            "lg:hidden",
            "items-center",
            "justify-center",
            "py-40",
            "text-gray-darkest",
          )}
        >
          <LoadingDots />
        </div>
        <div className={clsx("hidden", "lg:block")}>
          <SkeletonOrderConfirmed />
        </div>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <SEO
          title="Order Confirmed"
          description="You purchase was successful"
        />

        <OrderCompletedTemplate order={data.data.order} />
      </>
    );
  }

  return <></>;
};

export default Confirmed;
