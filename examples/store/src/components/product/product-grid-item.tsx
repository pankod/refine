import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/legacy/image";
import type { Product } from "@medusajs/medusa";

import { PLACEHOLDER_IMAGE_SRC } from "src/contants";
import { currencySymbolFromCode } from "@components/product/helpers";

type Props = {
  product?: Product;
};

export const ProductGridItem = ({ product }: Props) => {
  const { amount, currency_code } = product?.variants?.[0].prices?.[0] ?? {};

  const price = `${currencySymbolFromCode(currency_code ?? "USD")}${(
    amount / 100
  ).toFixed(2)}`;

  return (
    <Link
      onClick={product ? undefined : (event) => event.preventDefault()}
      href={`/product/${product?.handle}`}
    >
      <div
        className={clsx(
          "aspect-[9/10]",
          "bg-gray-lighter",
          "relative",
          "rounded-3xl",
          "transition-colors",
          "duration-200",
          "ease-in-out",
          "overflow-hidden",
        )}
      >
        <Image
          src={
            product?.images[0]?.url.replace(
              "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
              "/",
            ) || PLACEHOLDER_IMAGE_SRC
          }
          alt={product?.title || "Product Image"}
          priority={false}
          className={clsx(
            "transition-transform",
            "duration-200",
            "ease-in-out",
            "object-cover",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          layout="fill"
        />
      </div>
      <div className={clsx("p-4", "flex", "flex-col")}>
        <div
          className={clsx(
            "text-base",
            "text-gray-darkest",
            "font-normal",
            "text-nowrap",
            "overflow-hidden",
            "text-ellipsis",
            "overflow-ellipsis",
            "capitalize",
          )}
        >
          {product?.title}
        </div>
        <div className={clsx("text-base", "text-gray-darker", "font-normal")}>
          {price}
        </div>
      </div>
    </Link>
  );
};
