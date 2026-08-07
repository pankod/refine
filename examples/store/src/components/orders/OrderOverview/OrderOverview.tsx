import Link from "next/link";
import { useOne } from "@refinedev/core";
import type { Customer } from "@medusajs/medusa";

import { Button, LoadingDots } from "@components";
import { OrderCard } from "../OrderCard";

export const OrderOverview: React.FC = () => {
  const {
    result: customerData,
    query: { isLoading },
  } = useOne<Customer>({
    resource: "customers",
    id: "me/orders",
  });

  const orders = customerData?.orders || [];

  if (isLoading) {
    return (
      <div className="flex w-full justify-center pt-12 text-gray-900">
        <LoadingDots />
      </div>
    );
  }

  if (orders?.length > 0) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-accent-2 border-b pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <Link href="/" passHref>
          <Button>Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
};
