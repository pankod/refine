import type { Region } from "@medusajs/medusa";
import cn from "clsx";
import { formatAmount } from "medusa-react";

import { getPercentageDiff } from "@lib/getPercentageDiff";
import type { CalculatedVariant } from "src/types/medusa";

type LineItemPriceProps = {
  variant: CalculatedVariant;
  region: Region;
  quantity: number;
  style?: "default" | "tight";
};

export const LineItemPrice: React.FC<LineItemPriceProps> = ({
  variant,
  region,
  quantity,
  style = "default",
}) => {
  const hasReducedPrice = variant.calculated_price < variant.original_price;

  return (
    <div className="flex flex-col text-right text-gray-700">
      <span
        className={cn("text-base-regular", {
          "text-rose-600": hasReducedPrice,
        })}
      >
        {formatAmount({
          amount: variant.calculated_price * quantity,
          region: region,
          includeTaxes: false,
        })}
      </span>
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-gray-500">Original: </span>
            )}
            <span className="line-through">
              {formatAmount({
                amount: variant.original_price * quantity,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-rose-600">
              -
              {getPercentageDiff(
                variant.original_price,
                variant.calculated_price,
              )}
              %
            </span>
          )}
        </>
      )}
    </div>
  );
};
