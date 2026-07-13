import type { ProductOptionValue, ProductVariant } from "@medusajs/medusa";

interface LineItemOptionsProps {
  variant: ProductVariant;
}

export const LineItemOptions: React.FC<LineItemOptionsProps> = ({
  variant,
}) => {
  return (
    <div className="text-small-regular text-primary">
      {variant.options.map((option) => {
        const optionName =
          variant.product.options.find(
            (opt: ProductOptionValue) => opt.id === option.option_id,
          )?.title || "Option";
        return (
          <div key={option.id}>
            <span>
              {optionName}: {option.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};
