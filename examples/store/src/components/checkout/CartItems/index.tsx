import { CheckoutCartItem } from "@components/cart";
import type { Cart } from "@medusajs/medusa";
import clsx from "clsx";
import React from "react";

type Props = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
};

export const CartItems = ({ cart }: Props) => {
  return (
    <ul className={clsx()}>
      {cart.items.map((item) => (
        <CheckoutCartItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
