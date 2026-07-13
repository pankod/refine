import { Shipping, Addresses, Payment } from "@components";
import { useCartContext } from "@lib/context";
import clsx from "clsx";

export const CheckoutForm = ({ className }: { className?: string }) => {
  const { cart } = useCartContext();

  if (!cart?.id) {
    return null;
  }

  return (
    <div
      className={clsx(
        className,
        "flex",
        "flex-col",
        "w-full",
        "gap-6 lg:gap-8",
      )}
    >
      <Addresses />
      <Shipping cart={cart} />
      <Payment />
    </div>
  );
};
