import { useCartContext } from "@lib/context";
import { CartTotals, DiscountCode, GiftCard } from "@components";
import clsx from "clsx";
import { CartItems } from "../CartItems";

export const CheckoutSummary = ({ className }: { className?: string }) => {
  const { cart } = useCartContext();

  if (!cart?.id) {
    return null;
  }

  return (
    <div className={className}>
      <div className={clsx()}>
        <h2
          className={clsx(
            "text-2xl",
            "font-semibold",
            "text-gray-darkest",
            "pb-6",
            "border-b",
            "border-b-gray-normal",
          )}
        >
          Order Summary
        </h2>
      </div>
      <div className="flex flex-col">
        <CartItems cart={cart} />
        <DiscountCode cart={cart} />
        <div className="h-px w-full bg-gray-normal" />
        <GiftCard cart={cart} />
        <div className="h-px w-full bg-gray-normal" />
        <CartTotals cart={cart} />
      </div>
    </div>
  );
};
