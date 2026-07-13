import type { ProductVariant } from "@medusajs/medusa";

export type CalculatedVariant = ProductVariant & {
  calculated_price: number;
  calculated_price_type: "sale" | "default";
  original_price: number;
};
