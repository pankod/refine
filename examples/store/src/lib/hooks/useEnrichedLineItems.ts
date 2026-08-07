import { useMemo } from "react";
import { type CrudFilters, useList, useOne } from "@refinedev/core";
import type { Cart, LineItem, Product } from "@medusajs/medusa";
import omit from "lodash/omit";

/**
 * A hook that returns an array of enriched line items.
 * If you pass an array of line items, it will return those line items with enriched data.
 * Otherwise it will return the line items from the current cart.
 */
export const useEnrichedLineItems = (
  lineItems?: LineItem[],
  cartId?: string,
) => {
  const { result: cartData } = useOne<{ cart: Cart }>({
    // eslint-disable-next-line
    id: cartId!,
    resource: "carts",
    queryOptions: {
      enabled: !!cartId,
    },
  });
  const cart = cartData?.cart;

  const filters = useMemo<CrudFilters>(() => {
    if (lineItems) {
      return [
        {
          field: "id",
          operator: "eq",
          value: lineItems.map((lineItem) => lineItem.variant.product_id),
        },
        {
          field: "cart_id",
          operator: "eq",
          value: cartId,
        },
      ];
    }

    return [
      {
        field: "id",
        operator: "eq",
        value: cart?.items.map((lineItem) => lineItem.variant.product_id),
      },
      {
        field: "cart_id",
        operator: "eq",
        value: cart?.id,
      },
    ];
  }, [lineItems, cart?.items, cart?.id, cartId]);

  const { result: productData } = useList<Product>({
    resource: "products",

    queryOptions: {
      enabled: !!lineItems || !!cart?.items?.length,
      keepPreviousData: true,
    },

    filters,
  });
  const products = productData?.data;

  // We enrich the line items with the product and variant information
  const items = useMemo(() => {
    const currItems = lineItems || cart?.items;

    if (!currItems?.length || !products) {
      return [];
    }

    const enrichedItems: Omit<LineItem, "beforeInsert">[] = [];

    for (const item of currItems) {
      const product = products.find((p) => p.id === item.variant.product_id);

      if (!product) {
        enrichedItems.push(item);
        return;
      }

      const variant = product.variants.find((v) => v.id === item.variant_id);

      if (!variant) {
        enrichedItems.push(item);
        return;
      }
      enrichedItems.push({
        ...item,
        variant: {
          ...variant,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          product: omit(product, "variants"),
        },
      });
    }

    return enrichedItems;
  }, [cart?.items, lineItems, products]);

  return items;
};
