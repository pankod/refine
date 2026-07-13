import Link from "next/link";
import type { LineItem, Region } from "@medusajs/medusa";

import { CalculatedVariant } from "src/types/medusa";
import { useEnrichedLineItems } from "@lib/hooks";
import { LineItemOptions, LineItemPrice, Thumbnail } from "@components/common";
import { SkeletonLineItem } from "@components/skeletons";
import clsx from "clsx";
import { CheckoutCartItem } from "@components/cart";

interface ItemsProps {
  items: LineItem[];
  region: Region;
  cartId: string;
}

export const Items: React.FC<ItemsProps> = ({ cartId, items, region }) => {
  const enrichedItems = useEnrichedLineItems(items, cartId);

  return (
    <div
      className={clsx("border-t", "border-t-gray-normal", "flex", "flex-col")}
    >
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return <CheckoutCartItem item={item as LineItem} />;
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />;
          })}
    </div>
  );
};
