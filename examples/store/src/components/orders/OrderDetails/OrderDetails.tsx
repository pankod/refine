import type { Order } from "@medusajs/medusa";
import clsx from "clsx";

interface OrderDetailsProps {
  order: Order;
  showStatus?: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  showStatus,
}) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0);

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ");

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  return (
    <div className={clsx("pt-6", "border-y", "border-y-gray-normal")}>
      <span className={clsx("font-normal", "text-base", "text-gray-darkest")}>
        Thank you, your order was successfully placed!
      </span>
      <h1
        className={clsx(
          "font-semibold",
          "text-3xl",
          "uppercase",
          "pt-4 pb-7",
          "flex",
          "flex-col",
          "lg:flex-row",
          "lg:items-end",
          "gap-2",
        )}
      >
        #{order.display_id}
        <span
          className={clsx("text-base", "font-normal", "text-gray-darker")}
        >{`(${order.id.split("order_")[1]})`}</span>
      </h1>
      <div
        className={clsx(
          "text-base",
          "text-gray-darkest",
          "py-4",
          "flex",
          "items-center",
          "gap-4",
          "border-t border-t-gray-normal",
        )}
      >
        <span>{new Date(order.created_at).toDateString()}</span>
        <span>/</span>
        <span>{`${items} ${items !== 1 ? "items" : "item"}`}</span>
        {showStatus && (
          <>
            <span
              className={clsx(
                "rounded-3xl",
                "border border-gray-normal",
                "py-0",
                "px-3",
                "-my-px",
              )}
            >
              {formatStatus(order.fulfillment_status)}
            </span>
            <span
              className={clsx(
                "rounded-3xl",
                "border border-gray-normal",
                "py-0",
                "px-3",
                "-my-px",
              )}
            >
              {formatStatus(order.payment_status)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
