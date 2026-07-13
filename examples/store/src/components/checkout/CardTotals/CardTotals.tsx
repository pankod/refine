import React from "react";
import type { Cart } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";
import clsx from "clsx";

interface CartTotalsProps {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

export const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = cart;

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    });
  };

  const values = [
    {
      label: "Subtotal",
      value: getAmount(subtotal),
    },
    ...(discount_total
      ? [{ label: "Discount", value: `-${getAmount(discount_total)}` }]
      : []),
    ...(gift_card_total
      ? [{ label: "Gift card", value: `-${getAmount(gift_card_total)}` }]
      : []),
    { label: "Shipping", value: getAmount(shipping_total) },
    { label: "Taxes", value: getAmount(tax_total) },
  ];

  return (
    <div className={clsx()}>
      <div className={clsx("py-2", "flex", "flex-col", "w-full")}>
        {values.map((v) => (
          <div
            key={v.label}
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
          "pb-10",
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
          {getAmount(total)}
        </div>
      </div>
    </div>
  );
};
