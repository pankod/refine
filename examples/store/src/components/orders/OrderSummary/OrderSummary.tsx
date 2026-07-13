import type { Order } from "@medusajs/medusa";
import clsx from "clsx";
import { formatAmount } from "medusa-react";

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const getAmount = (amount: number) => {
    return formatAmount({
      amount,
      region: order.region,
      includeTaxes: false,
    });
  };

  const values = [
    {
      label: "Subtotal",
      value: getAmount(order.subtotal),
    },
    ...(order.discount_total
      ? [{ label: "Discount", value: `-${getAmount(order.discount_total)}` }]
      : []),
    ...(order.gift_card_total
      ? [{ label: "Gift card", value: `-${getAmount(order.gift_card_total)}` }]
      : []),
    { label: "Shipping", value: getAmount(order.shipping_total) },
    { label: "Taxes", value: getAmount(order.tax_total ?? 0) },
  ];

  return (
    <div className={clsx()}>
      <div
        className={clsx(
          "py-4",
          "font-semibold",
          "text-base",
          "text-gray-darkest",
          "border-b",
          "border-b-gray-normal",
        )}
      >
        Order Summary
      </div>
      <div className={clsx("py-4", "flex", "flex-col", "w-full")}>
        {values.map((v) => (
          <div
            className={clsx(
              "flex",
              "items-center",
              "justify-between",
              "w-full",
              "py-2",
            )}
          >
            <div
              className={clsx(
                "flex-1",
                "text-base",
                "font-normal",
                "text-right",
                "text-gray-darkest",
              )}
            >
              {`${v.label}:`}
            </div>
            <div
              className={clsx(
                "flex-shrink-0",
                "w-[120px]",
                "text-right",
                "text-base",
                "font-normal",
                "text-gray-darkest",
              )}
            >
              {v.value}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-normal h-px w-full" />
      <div
        className={clsx(
          "pt-4",
          "pb-4",
          "flex",
          "items-center",
          "justify-center",
        )}
      >
        <div
          className={clsx(
            "flex-1",
            "text-base",
            "font-semibold",
            "text-right",
            "text-gray-darkest",
          )}
        >
          TOTAL:
        </div>
        <div
          className={clsx(
            "flex-shrink-0",
            "w-[120px]",
            "text-right",
            "text-base",
            "font-semibold",
            "text-gray-darkest",
          )}
        >
          {getAmount(order.total)}
        </div>
      </div>
    </div>
  );
};
