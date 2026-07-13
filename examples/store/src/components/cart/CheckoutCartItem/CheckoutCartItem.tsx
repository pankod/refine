import Image from "next/legacy/image";
import Link from "next/link";
import cn, { clsx } from "clsx";
import type { LineItem } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";

import { useCartContext, useUI } from "@lib/context";

import s from "./CheckoutCartItem.module.css";

const placeholderImg = "/product-img-placeholder.svg";

interface CartItemProps {
  item: LineItem;
}

export const CheckoutCartItem: React.FC<CartItemProps> = ({ item }) => {
  const { cart } = useCartContext();

  const { closeSidebarIfPresent } = useUI();

  if (!cart) {
    return null;
  }

  const getAmount = (amount: number | undefined | null) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
    });
  };

  return (
    <li
      className={cn(
        s.root,
        "pb-0",
        "!border-t-0",
        "border-solid",
        "border-b border-b-gray-normal",
      )}
    >
      <div className="flex flex-row space-x-4 py-6">
        <div
          className={clsx(
            "flex-shrink-0",
            "relative z-0 h-20 w-[72px] cursor-pointer",
            "border-gray-normal border border-solid",
            "rounded-lg",
          )}
        >
          <Link
            href={{
              pathname: "/product/[handle]",
              query: { handle: item.variant.product.handle },
            }}
          >
            <Image
              onClick={() => closeSidebarIfPresent()}
              className={clsx(
                "bg-gray-lighter",
                "h-20 w-[72px]",
                "rounded-lg",
                "object-contain",
                "object-center",
              )}
              width={72}
              height={80}
              src={item.variant.product.thumbnail || placeholderImg}
              alt={item.variant.product.title || "Product Image"}
              unoptimized
            />
          </Link>
        </div>
        <div
          className={clsx(
            "flex",
            "flex-1",
            "items-start",
            "justify-center",
            "max-w-full",
            "pt-2",
          )}
        >
          <div className={clsx("flex-1", "flex", "flex-col", "gap-4")}>
            <div
              className={clsx(
                "text-nowrap",
                "text-ellipsis",
                "overflow-hidden",
                "text-base",
                "text-gray-darkest",
                "font-normal",
                "max-w-[232px]",
              )}
            >
              {item.title}
              {" / "}
              {item.variant.title}
            </div>
            <div className={clsx("text-gray-darker", "text-base")}>
              {`Quantity: ${item.quantity}`}
            </div>
          </div>
          <div
            className={clsx(
              "flex-shrink-0",
              "font-medium",
              "text-base",
              "text-gray-darker",
            )}
          >
            {getAmount(item.total)}
          </div>
        </div>
      </div>
    </li>
  );
};
