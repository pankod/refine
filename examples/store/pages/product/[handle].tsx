import React from "react";
import clsx from "clsx";
import { useList, type GetListResponse } from "@refinedev/core";
import type { GetServerSideProps } from "next";
import { dataProvider } from "@refinedev/medusa";
import type { Product, ProductOption, ProductVariant } from "@medusajs/medusa";

import {
  getProductVariant,
  selectDefaultOptionFromProduct,
} from "@components/product/helpers";
import { SERVER_API_URL } from "src/contants";
import { useProductPrice } from "@lib/hooks";
import { ProductSlider } from "@components/product/product-slider";
import { ProductOptionPicker } from "@components/product/product-option-picker";
import { ButtonAddToCart } from "@components/ui/button-add-to-cart";
import { useCartContext, useUI } from "@lib/context";

type Props = {
  initialData?: GetListResponse<Product>;
  handle?: string;
};

const ProductShow: React.FC<Props> = ({ initialData, handle }) => {
  const { addItem } = useCartContext();
  const { openSidebar, setSidebarView } = useUI();

  const {
    result: {
      data: [record] = [],
    } = {},
  } = useList<Product>({
    resource: "products",

    queryOptions: {
      initialData,
    },

    filters: [
      {
        field: "handle",
        operator: "eq",
        value: handle,
      },
    ],
  });

  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, string | null>
  >({});

  React.useEffect(() => {
    selectDefaultOptionFromProduct(record, setSelectedOptions);
  }, [record]);

  const variant: ProductVariant | undefined = getProductVariant(
    record,
    selectedOptions,
  );
  const price = useProductPrice({ id: record.id, variantId: variant?.id });

  const selectedPrice = price.variantPrice || price.cheapestPrice || null;

  const [isAdding, setIsAdding] = React.useState(false);

  const onAdd = React.useCallback(async () => {
    if (variant) {
      setIsAdding(true);
      await addItem?.({
        variantId: variant.id,
        quantity: 1,
      });

      setIsAdding(false);

      setSidebarView("CART_VIEW");
      openSidebar();
    }
  }, [variant]);

  return (
    <div
      className={clsx(
        "w-full",
        "flex",
        "flex-col",
        "md:flex-row",
        "items-center",
        "md:items-start",
        "justify-center",
        "gap-12",
      )}
    >
      <div
        className={clsx(
          "flex",
          "flex-col",
          "max-w-[608px]",
          "flex-shrink-1",
          "w-full",
        )}
      >
        <ProductSlider product={record} />
      </div>
      <div className={clsx("py-12", "flex", "flex-col", "gap-8", "flex-1")}>
        <div className={clsx("flex", "flex-col", "gap-2")}>
          <h1
            className={clsx(
              "font-semibold",
              "text-[32px]",
              "leading-[40px]",
              "text-gray-darkest",
              "capitalize",
            )}
          >
            {record.title}
          </h1>
          <p
            className={clsx(
              "font-semibold",
              "text-xl",
              "text-gray-darker",
              "min-h-7",
            )}
          >
            {selectedPrice?.calculated_price}
          </p>
        </div>
        <p
          className={clsx("text-base", "font-normal", "text-gray-darkest")}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: record.description || "",
          }}
        />
        {record.options.map((opt: ProductOption) => (
          <ProductOptionPicker
            key={opt.id}
            option={opt}
            active={selectedOptions[opt.title.toLowerCase()]}
            setActive={(val) => {
              setSelectedOptions((selectedOptions) => {
                return {
                  ...selectedOptions,
                  [opt.title.toLowerCase()]: val,
                };
              });
            }}
          />
        ))}
        {variant && (
          <ButtonAddToCart
            className="w-full self-start md:w-auto"
            aria-label="Add to Cart"
            loading={isAdding}
            onClick={async () => {
              if (isAdding) return;
              if (variant.inventory_quantity === 0) return;
              onAdd();
            }}
            disabled={variant.inventory_quantity === 0}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { query } = context;

  const handle = query.handle as string | undefined;

  if (!handle) {
    return {
      notFound: true,
    };
  }

  try {
    const medusaDataProvider = dataProvider(SERVER_API_URL);

    const data = await medusaDataProvider.getList<Product>({
      resource: "products",
      filters: [
        {
          field: "handle",
          operator: "eq",
          value: handle,
        },
      ],
    });

    context.res.setHeader(
      "Cache-Control",
      // cache for 12 hours
      // serve stale content while revalidating for 24 hours
      `public, s-maxage=${60 * 60 * 12}, stale-while-revalidate=${
        60 * 60 * 24
      }`,
    );

    return {
      props: {
        initialData: data,
        handle,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ProductShow;
