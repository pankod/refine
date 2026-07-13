import Link from "next/link";
import { useMemo } from "react";
import type { Order } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";

import { Button, Thumbnail } from "@components";

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">;
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items.length;
  }, [order]);

  return (
    <div className="bg-primary flex flex-col">
      <div className="text-large-semi mb-1 uppercase">#{order.display_id}</div>
      <div className="text-small-regular divide-accent-2 text-primary flex items-center divide-x">
        <span className="pr-2">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="text-primary pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="small:grid-cols-4 my-4 grid grid-cols-2 gap-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div key={i.id} className="flex flex-col gap-y-2">
              <Thumbnail
                thumbnail={order.items[0].thumbnail}
                images={[]}
                size="full"
              />
              <div className="text-small-regular flex items-center text-gray-700">
                <span className="font-semibold text-gray-900">{i.title}</span>
                <span className="ml-2">x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="text-small-regular">+ {numberOfLines - 4}</span>
            <span className="text-small-regular">more</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Link
          href={{
            pathname: "/order/details/[id]",
            query: { id: order.id },
          }}
        >
          <Button>See details</Button>
        </Link>
      </div>
    </div>
  );
};
